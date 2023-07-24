import axios from 'axios';
import { ActionTree } from 'vuex'
import { ProfitTreeItem, ResponseModel, RootState } from '../typeDefs';
import { ArtifactFoundryState, ArtifactsTree, ItemInfo, LoadingStatus, SettingsWithItem, ArtifactBranch, ArtifactsTreeForCurrentFragment, BranchCells } from './typeDefs';

const baseUrl = process.env.BASE_URL;

export const actions: ActionTree<ArtifactFoundryState, RootState> = {
  /**
 * Check all prices of materials and raw resources
 * If there are no prices, then download them
 * 
 * @param data - selected item info
 */
  async CHECK_ALL({ commit, dispatch, state, getters }, data: ItemInfo) {
    // set current item info
    if (data) {
      commit('SET_ITEM_INFO', data);
    }

    // Don't send a requests if some one is already in progress
    // Send a requests if we need to load the next item since itemInfo was modified to the end of the previous request
    if (!(state.features.loadingStatus === LoadingStatus.CALCULATED || state.features.loadingStatus === LoadingStatus.SOMETHING_CHANGED)) {
      return;
    }

    const currentItemInfo = state.currentFragmentType;
    const settings = state.settings;
    const settingsWithItem: SettingsWithItem = {
      currentItemInfo,
      settings
    }

    if (!currentItemInfo.name) {
      return;
    }

    if (getters.sellFragments.length === 0) {
      await dispatch('FETCH_SELL_FRAGMENT_PRICES', settingsWithItem);
    }

    if (getters.buyFragments.length === 0) {
      await dispatch('FETCH_BUY_FRAGMENT_PRICES', settingsWithItem);
    }

    if (getters.sellArtifacts.length === 0) {
      await dispatch('FETCH_SELL_ARTIFACT_PRICES', settingsWithItem);
    }

    if (getters.buyArtifacts.length === 0) {
      await dispatch('FETCH_BUY_ARTIFACT_PRICES', settingsWithItem);
    }

    // Send a request if something is changed
    if (state.currentFragmentType != currentItemInfo || state.settings != settings) {
      commit('SET_LOADING_STATUS', LoadingStatus.SOMETHING_CHANGED);

      dispatch('CHECK_ALL');
    } else {
      commit('SET_LOADING_STATUS', LoadingStatus.CALCULATED);
    }
  },

  /**
   * Fetch json files data. Set recipes of items and tree structure of items
   * 
   * @param commit - vuex commit
   */
  async FETCH_STATE({ commit }) {
    const tree = await axios.get('/json/profitTreeItemsTree.json');

    const [warriorBranch, hunterBranch, mageBranch] = tree.data as ProfitTreeItem[];

    const areAllChildrenLeafs = (items: ProfitTreeItem[]) => items.every(item => !item.children);
    const getAllLeafNames = (items: ProfitTreeItem[]) => items.map(item => item.name);

    const getArtifactBranch = (branchTree: ProfitTreeItem): ArtifactBranch => {
      const artifactItems: ArtifactBranch = {
        'RUNE': [],
        'SOUL': [],
        'RELIC': [],
        'SHARD_AVALONIAN': [],
      };

      const getAllArtifactLeafs = (treeItem: ProfitTreeItem) => {
        if (treeItem.children && !areAllChildrenLeafs(treeItem.children)) {
          treeItem.children.forEach((item) => getAllArtifactLeafs(item));
        } else if (treeItem.children && treeItem.children.length >= 4 && areAllChildrenLeafs(treeItem.children)) {
          let names = getAllLeafNames(treeItem.children);
          
          // filter fey items
          names = names.filter(item => !item.includes('_FEY'));

          const [rune, soul, relic, avaShard] = names.slice(-4).map(name => 'ARTEFACT_' + name.slice(3));

          artifactItems.RUNE.push(rune);
          artifactItems.SOUL.push(soul);
          artifactItems.RELIC.push(relic);
          artifactItems.SHARD_AVALONIAN.push(avaShard);
        }
      }

      getAllArtifactLeafs(branchTree);

      return artifactItems;
    }

    commit('SET_FIELD', {
      fieldName: 'tree',
      fieldValue: {
        'WARRIOR_BRANCH': getArtifactBranch(warriorBranch),
        'HUNTER_BRANCH': getArtifactBranch(hunterBranch),
        'MAGE_BRANCH': getArtifactBranch(mageBranch),
      } as ArtifactsTree
    });
  },

  /**
   * Update a part of state
   * 
   * @param partOfState - part of the state to reset: artifact-prices | fragment-prices
   */
  async UPDATE_STATE({ dispatch, commit, state }, partOfState: string) {
    const currentItemInfo = state.currentFragmentType;

    const settingsWithItem: SettingsWithItem = {
      currentItemInfo,
      settings: state.settings,
    }

    if (!currentItemInfo.name) {
      return;
    }

    switch (partOfState) {
      case 'artifact-prices':
        commit('DROP_ARTIFACTS');
        await dispatch('FETCH_SELL_ARTIFACT_PRICES', settingsWithItem);

        if (settingsWithItem.settings.cities.sellArtifacts !== settingsWithItem.settings.cities.buyArtifacts) {
          await dispatch('FETCH_BUY_ARTIFACT_PRICES', settingsWithItem);
        }

        break;
      case 'fragment-prices':
        commit('DROP_FRAGMENTS');
        await dispatch('FETCH_BUY_FRAGMENT_PRICES', settingsWithItem);

        if (settingsWithItem.settings.cities.sellFragments !== settingsWithItem.settings.cities.buyFragments) {
          await dispatch('FETCH_SELL_FRAGMENT_PRICES', settingsWithItem);
        }

        break;
    }

    commit('SET_LOADING_STATUS', LoadingStatus.SOMETHING_CHANGED);

    await dispatch('CHECK_ALL');
  },

  async FETCH_SELL_ARTIFACT_PRICES({ commit, getters, rootState }, settingsWithItem: SettingsWithItem) {
    commit('SET_LOADING_STATUS', LoadingStatus.LOADING_ARTIFACTS);

    const allBranches = getters.getArtifactsNeeded as ArtifactsTreeForCurrentFragment;
    const location = settingsWithItem.settings.cities.sellArtifacts;
    const allNames = [...allBranches.WARRIOR_BRANCH, ...allBranches.HUNTER_BRANCH, ...allBranches.MAGE_BRANCH];
    const serverId = rootState.features.currentServerId;
  
    await axios
      .get(`${baseUrl}data?items=${allNames.join(',')}&locations=${location}&qualities=1&serverId=${serverId}`)
      .then(response => {
        const data = response.data;

        commit('SET_SELL_ARTIFACT_PRICES', { data, settingsWithItem });
      });
  },

  async FETCH_BUY_ARTIFACT_PRICES({ commit, getters, rootState }, settingsWithItem: SettingsWithItem) {
    commit('SET_LOADING_STATUS', LoadingStatus.LOADING_ARTIFACTS);

    const allBranches = getters.getArtifactsNeeded as ArtifactsTreeForCurrentFragment;
    const location = settingsWithItem.settings.cities.buyArtifacts;
    const allNames = [...allBranches.WARRIOR_BRANCH, ...allBranches.HUNTER_BRANCH, ...allBranches.MAGE_BRANCH];
    const serverId = rootState.features.currentServerId;

    await axios
      .get(`${baseUrl}data?items=${allNames.join(',')}&locations=${location}&qualities=1&serverId=${serverId}`)
      .then(response => {
        const data = response.data;

        commit('SET_BUY_ARTIFACT_PRICES', { data, settingsWithItem });
      });
  },

  async FETCH_BUY_FRAGMENT_PRICES({ commit, getters, rootState }, settingsWithItem: SettingsWithItem) {
    commit('SET_LOADING_STATUS', LoadingStatus.LOADING_FRAGMENTS);

    const allNames = getters.getFragmentsNeeded as string[];
    const location = settingsWithItem.settings.cities.buyFragments;
    const serverId = rootState.features.currentServerId;

    await axios
      .get(`${baseUrl}data?items=${allNames.join(',')}&locations=${location}&qualities=1&serverId=${serverId}`)
      .then(response => {
        const data = response.data;

        commit('SET_BUY_FRAGMENT_PRICES', { data, settingsWithItem });
      });
  },

  async FETCH_SELL_FRAGMENT_PRICES({ commit, getters, rootState }, settingsWithItem: SettingsWithItem) {
    commit('SET_LOADING_STATUS', LoadingStatus.LOADING_FRAGMENTS);

    const allNames = getters.getFragmentsNeeded as string[];
    const location = settingsWithItem.settings.cities.sellFragments;
    const serverId = rootState.features.currentServerId;

    await axios
      .get(`${baseUrl}data?items=${allNames.join(',')}&locations=${location}&qualities=1&serverId=${serverId}`)
      .then(response => {
        const data = response.data;

        commit('SET_SELL_FRAGMENT_PRICES', { data, settingsWithItem });
      });
  },

  SORT_EXTENDED_CELL_ARTIFACTS({ state, commit, getters }) {
    const branchArtifacts: BranchCells = getters.getCellItems;
    const branchArtifactIds = branchArtifacts.items.map(item => item.item.itemId);
    const city = state.settings.cities.sellArtifacts;
    const sellArtifacts: ResponseModel[] = state.artifacts[city];
    const sortedArtifacts = branchArtifacts.items.sort((item1, item2) => item2.profit - item1.profit);

    const artifactsWithSortedBranch = sellArtifacts
      .filter(artifact => !branchArtifactIds.includes(artifact.itemId))
      .concat(sortedArtifacts.map(({ item }) => item));

    commit('SET_SORTED_CELL_ARTIFACTS', artifactsWithSortedBranch);
  },
}