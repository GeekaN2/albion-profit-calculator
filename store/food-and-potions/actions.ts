import axios from 'axios';
import { ActionTree } from 'vuex'
import { isObjectEmpty } from '../utils';
import { ConsumableItem } from './models';
import { FoodAndPotionsState, LoadingStatus, SettingsWithItemTiers } from './typeDefs'
import { RootState } from '../typeDefs';

const baseUrl = process.env.BASE_URL;

export const actions: ActionTree<FoodAndPotionsState, RootState> = {
  /**
   * Check all prices of items, resources, artefactsa and journals
   * If there are no prices, then download them
   * 
   * @param data - selected item info
   */
  async CHECK_ALL({ commit, dispatch, state, getters }, currentItemTiers: string[]) {
    // set current item info
    if (currentItemTiers) {
      commit('SET_CURRENT_ITEM_TIERS', currentItemTiers);
    }

    // Don't send a requests if some one is already in progress
    // Send a requests if we need to load the next item since itemInfo was modified to the end of the previous request
    if (!(state.features.loadingStatus === LoadingStatus.CALCULATED ||
      state.features.loadingStatus === LoadingStatus.SOMETHING_CHANGED)) {
      return;
    }

    const settings = state.settings;
    const settingsWithItemTiers: SettingsWithItemTiers = {
      currentItemTiers: currentItemTiers || state.currentItemTiers,
      settings
    }

    if (!settingsWithItemTiers.currentItemTiers) {
      return;
    }

    if (getters.getItems.length === 0) {
      await dispatch('FETCH_ITEM_PRICES', settingsWithItemTiers);
    }

    if (getters.getResources.length !== getters.getResourcesNeeded.length) {
      await dispatch('FETCH_RESOURCE_PRICES', settingsWithItemTiers);
    }
    
    if (getters.getAverageData.length === 0) {
      await dispatch('FETCH_AVERAGE_DATA', settingsWithItemTiers);
    }

    /**
     * Send a request if something is changed
     */
    const currentItemChanged = state.currentItemTiers?.some((item, index) => item !== settingsWithItemTiers.currentItemTiers[index]);
    const settingsChanged = state.settings != settings;

    if (currentItemChanged || settingsChanged) {
      commit('SET_LOADING_STATUS', LoadingStatus.SOMETHING_CHANGED);

      dispatch('CHECK_ALL');
    } else {
      commit('SET_LOADING_STATUS', LoadingStatus.CALCULATED);
    }
  },

  async LOAD_FOOD_AND_POTIONS_TREE_ITEMS({ commit }) {
    const { data }: { data: ConsumableItem[] } = await axios.get('/jsonAutomatic/foodAndPotionsTreeItems.json');

    data.sort((item1, item2) => item1['@uniquename'] > item2['@uniquename'] ? 1 :
      item1['@uniquename'] < item2['@uniquename'] ? -1 : 0
    );

    commit('SET_FIELD', {
      fieldName: 'foodAndPotionsTreeItems',
      fieldValue: data,
    });
  },

  async LOAD_FOOD_AND_POTIONS_TREE({ commit }) {
    const { data } = await axios.get("/json/foodAndPotionsTree.json");

    commit('SET_FIELD', {
      fieldName: 'foodAndPotionsTree',
      fieldValue: data,
    });
  },

  /**
   * Fetch item prices
   * 
   * @param commit - vuex commit
   * @param state - vuex state
   * @param settingsWithItemTiers - сonvenient item data and settings
   */
  async FETCH_ITEM_PRICES({ commit, getters, rootState }, settingsWithItemTiers: SettingsWithItemTiers) {
    commit('SET_LOADING_STATUS', LoadingStatus.LOADING_ITEMS);

    const allNames = getters.getItemNamesWithSubtiers();
    const location = settingsWithItemTiers.settings.cities.sellItems;
    const serverId = rootState.features.currentServerId;

    await axios
      .get(`${baseUrl}data?items=${allNames}&locations=${location}&qualities=1&serverId=${serverId}`)
      .then(response => {
        const data = response.data;

        commit('SET_ITEM_PRICES', { data, settingsWithItemTiers });
      });
  },

  /**
   * Fetch resource prices
   * 
   * @param commit - vuex commit
   * @param state - vuex state
   * @param settingsWithItemTiers - сonvenient item data and settings
   */
  async FETCH_RESOURCE_PRICES({ commit, getters, rootState }, settingsWithItemTiers: SettingsWithItemTiers) {
    commit('SET_LOADING_STATUS', LoadingStatus.LOADING_RESOURCES);

    const allNames = getters.getResourcesNeeded;
    const location = settingsWithItemTiers.settings.cities.buyResources;
    const serverId = rootState.features.currentServerId;

    await axios
      .get(`${baseUrl}data?items=${allNames}&locations=${location}&qualities=1&serverId=${serverId}`)
      .then(response => {
        const data = response.data;

        commit('SET_RESOURCE_PRICES', { data, settingsWithItemTiers });
      });
  },

  /**
 * Update a part of state
 * 
 * @param partOfState - part of the state to reset: items, resources, artifacts or journals
 */
  async UPDATE_STATE({ dispatch, commit, state }, partOfState: string) {
    const currentItemTiers = state.currentItemTiers

    const settingsWithItem: SettingsWithItemTiers = {
      currentItemTiers,
      settings: state.settings
    }

    if (!currentItemTiers) {
      return;
    }

    switch (partOfState) {
      case 'item-prices':
        await dispatch('FETCH_ITEM_PRICES', settingsWithItem);

        break;
      case 'resource-prices':
        await dispatch('FETCH_RESOURCE_PRICES', settingsWithItem);
        break;
    }

    commit('SET_LOADING_STATUS', LoadingStatus.SOMETHING_CHANGED);

    await dispatch('CHECK_ALL');
  },

  /**
   * Fetch average data for items
   */
  async FETCH_AVERAGE_DATA({ commit, getters, rootState }, settingsWithItemTiers: SettingsWithItemTiers) {
    commit('SET_LOADING_STATUS', 'averageData');

    const allNames = getters.getItemNamesWithSubtiers();
    const location = settingsWithItemTiers.settings.cities.sellItems;
    const baseURL = process.env.BASE_URL;
    const serverId = rootState.features.currentServerId;

    await axios
      .get(`${baseURL}average_data?items=${allNames}&locations=${location}&serverId=${serverId}`)
      .then(response => {
        const data = response.data;

        commit('SET_AVERAGE_DATA', { data, settingsWithItemTiers });
      });
  },
}