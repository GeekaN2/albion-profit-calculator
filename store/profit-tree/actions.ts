import { ActionTree } from 'vuex'
import axios from 'axios'
import { createStringOfAllItems, createStringOfAllResources, createStringOfAllArtifacts, createStringOfAllJournals, isObjectEmpty } from '../utils'
import { TreeState, ItemInfo, SettingsWithItem } from '../typeDefs'
import { isArtifactItem } from '../utils'

const baseUrl = process.env.BASE_URL;

export const actions: ActionTree<TreeState, {}> = {
  /**
   * Fetch json files data. Set recipes of items and tree structure of items
   * 
   * @param commit - vuex commit
   */
  async FETCH_STATE({ commit }) {
    const tree = await axios.get('/json/tree.json');
    const recipes = await axios.get('/json/recipes.json');

    commit('SET_STATE', {
      'tree': tree.data,
      'recipes': recipes.data
    });
  },

  /**
   * Check all prices of items, resources, artefactsa and journals
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
    if (!(state.features.loadingText == 'calculated' || state.features.loadingText == 'something changed')) {
      return;
    }    

    const currentItemInfo = state.currentItemInfo;
    const settings = state.settings;
    const settingsWithItem: SettingsWithItem = {
      currentItemInfo,
      settings
    }

    if (!currentItemInfo.name) {
      return;
    }

    if (isObjectEmpty(getters.getItems)) {
      await dispatch('FETCH_ITEM_PRICES', settingsWithItem);
    }

    if (isObjectEmpty(getters.getFirstResources) || isObjectEmpty(getters.getSecondResources)) {
      await dispatch('FETCH_RESOURCE_PRICES', settingsWithItem);
    }

    if (isArtifactItem(currentItemInfo.name) && isObjectEmpty(getters.getArtefacts)) {
      await dispatch('FETCH_ARTEFACT_PRICES', settingsWithItem);
    }

    if ((state.settings.showAverageItems || state.settings.useAveragePrice) && isObjectEmpty(getters.getAverageData)) {
      await dispatch('FETCH_AVERAGE_DATA', settingsWithItem);
    }

    if (
      state.settings.useJournals &&
      isObjectEmpty(getters.getJournals) &&
      state.currentItemInfo.root.slice(0, 5) == 'ROOT_'
    ) {
      await dispatch('FETCH_JOURNAL_PRICES', { currentItemInfo, settings });
    }

    // Send a request if something is changed
    if (state.currentItemInfo != currentItemInfo || state.settings != settings) {
      commit('SET_LOADING_TEXT', 'something changed');
      
      dispatch('CHECK_ALL');
    } else {
      commit('SET_LOADING_TEXT', 'calculated');
    }
  },

  /**
   * Update a part of state
   * 
   * @param partOfState - part of the state to reset: items, resources, artifacts or journals
   */
  async UPDATE_STATE({ dispatch, commit, state }, partOfState: string) {
    const itemName = state.currentItemInfo.name;

    const settingsWithItem: SettingsWithItem = {
      currentItemInfo: state.currentItemInfo,
      settings: state.settings
    }

    if (!itemName) {
      return;
    }

    switch (partOfState) {
      case 'items':
        await dispatch('FETCH_ITEM_PRICES', settingsWithItem);
        break;
      case 'resources':
        await dispatch('FETCH_RESOURCE_PRICES', settingsWithItem);
        break;
      case 'artifacts':
        await dispatch('FETCH_ARTEFACT_PRICES', settingsWithItem);
        break;
      case 'journals':
        await dispatch('FETCH_JOURNAL_PRICES', settingsWithItem);
        break;
    }

    commit('SET_LOADING_TEXT', 'something changed');

    await dispatch('CHECK_ALL');
  },

  /**
   * Fetch item prices
   * 
   * @param commit - vuex commit
   * @param state - vuex state
   * @param {SettingsWithItem} settingsWithItem - сonvenient item data and settings
   */
  async FETCH_ITEM_PRICES({ commit }, settingsWithItem) {
    commit('SET_LOADING_TEXT', 'items');

    const itemName = settingsWithItem.currentItemInfo.name;
    const allNames = createStringOfAllItems(itemName);
    const location = settingsWithItem.settings.cities.sellItems;

    await axios
      .get(`${baseUrl}data?items=${allNames}&locations=${location}&qualities=1,2,3`)
      .then(response => {
        const data = response.data;

        commit('SET_ITEM_PRICES', { data, settingsWithItem });
      });
  },

  /**
   * Fetch resource prices for current item with all tiers and subtiers
   * 
   * @param commit - vuex commit
   * @param state - vuex state
   */
  async FETCH_RESOURCE_PRICES({ commit, state }, settingsWithItem) {
    commit('SET_LOADING_TEXT', 'resources');

    const resources = ['CLOTH', 'LEATHER', 'PLANKS', 'METALBAR'];
    let locations = new Set();
    locations.add(settingsWithItem.settings.cities.resourcesFirstLocation);
    locations.add(settingsWithItem.settings.cities.resourcesSecondLocation);

    let allNames = resources.reduce((acc, resource) => {
      acc = acc + createStringOfAllResources(resource) + ',';

      return acc;
    }, '').slice(0, -1);

    await axios
      .get(`${baseUrl}data?items=${allNames}&locations=${Array.from(locations).join(',')}`)
      .then(response => {
        const data = response.data;

        commit('SET_RESOURCE_PRICES', { data, settingsWithItem });
      });
  },

  /**
   * Fetch t4-t8 artifacts for current item 
   * 
   * @param commit - vuex commit 
   * @param state - vuex state
   */
  async FETCH_ARTEFACT_PRICES({ commit, state }, settingsWithItem) {
    commit('SET_LOADING_TEXT', 'artefacts');

    const itemName = settingsWithItem.currentItemInfo.name;
    let allNames = createStringOfAllArtifacts(itemName);
    const location = settingsWithItem.settings.cities.artefacts;

    await axios
      .get(`${baseUrl}data?items=${allNames}&locations=${location}`)
      .then(response => {
        const data = response.data;

        commit('SET_ARTEFACT_PRICES', { data, settingsWithItem });
      });
  },

  /**
   * Fetch t4-t8 empty and full journal prices
   * 
   * @param commit - vuex commit 
   * @param state - vuex state
   */
  async FETCH_JOURNAL_PRICES({ commit, state }, settingsWithItem) {
    commit('SET_LOADING_TEXT', 'journals');

    let allNames = createStringOfAllJournals(state.currentItemInfo.root);
    const location = settingsWithItem.settings.cities.journals;

    await axios
      .get(`${baseUrl}data?items=${allNames}&locations=${location}`)
      .then(response => {
        const data = response.data;

        commit('SET_JOURNAL_PRICES', { data, settingsWithItem })
      });
  },

  /**
   * Fetch average data for items
   */
  async FETCH_AVERAGE_DATA({ commit, state }, settingsWithItem) {
    commit('SET_LOADING_TEXT', 'averageData');

    const itemName = settingsWithItem.currentItemInfo.name;
    const allNames = createStringOfAllItems(itemName);
    const location = settingsWithItem.settings.cities.sellItems;
    const baseURL = process.env.BASE_URL;

    await axios
      .get(`${baseURL}average_data?items=${allNames}&locations=${location}`)
      .then(response => {
        const data = response.data;

        commit('SET_AVERAGE_DATA', { data, settingsWithItem });
      });
  }
}