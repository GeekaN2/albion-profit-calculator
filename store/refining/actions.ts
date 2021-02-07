import { ActionTree } from 'vuex'
import axios from 'axios'
import { createStringOfAllResources, isObjectEmpty, getRawResourceNameByMaterial } from '../utils'
import { RefiningState, ItemInfo, SettingsWithItem } from './typeDefs'

const baseUrl = process.env.BASE_URL;

export const actions: ActionTree<RefiningState, {}> = {
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

    if (isObjectEmpty(getters.buyRawResources)) {
      await dispatch('FETCH_BUY_RAW_RESOURCES', settingsWithItem);
    }

    if (isObjectEmpty(getters.sellMaterials)) {
      await dispatch('FETCH_SELL_MATERIALS', settingsWithItem);
    }

    if (isObjectEmpty(getters.buyMaterials)) {
      await dispatch('FETCH_BUY_MATERIALS', settingsWithItem);
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
      case 'material-prices':
        await dispatch('FETCH_SELL_MATERIALS', settingsWithItem);

        if (state.settings.cities.sellMaterials != state.settings.cities.buyMaterials) {
          await dispatch('FETCH_BUY_MATERIALS', settingsWithItem);
        }
        
        break;
      case 'resource-prices':
        await dispatch('FETCH_BUY_RAW_RESOURCES', settingsWithItem);
        break;
    }

    commit('SET_LOADING_TEXT', 'something changed');

    await dispatch('CHECK_ALL');
  },

  /**
   * Fetch raw resources prices
   * 
   * @param commit - vuex commit
   * @param state - vuex state
   * @param {SettingsWithItem} settingsWithItem - сonvenient item data and settings
   */
  async FETCH_BUY_RAW_RESOURCES({ commit }, settingsWithItem: SettingsWithItem) {
    commit('SET_LOADING_TEXT', 'resources');

    const itemName = settingsWithItem.currentItemInfo.name;
    const rawResourceName = getRawResourceNameByMaterial(itemName);
    const allNames = createStringOfAllResources(rawResourceName);
    const location = settingsWithItem.settings.cities.buyRawResources;

    await axios
      .get(`${baseUrl}data?items=${allNames}&locations=${location}`)
      .then(response => {
        const data = response.data;

        commit('SET_RAW_RESOURCES', { data, settingsWithItem });
      });
  },

  /**
   * Fetch materials prices
   * 
   * @param commit - vuex commit
   * @param state - vuex state
   * @param {SettingsWithItem} settingsWithItem - сonvenient item data and settings
   */
  async FETCH_SELL_MATERIALS({ commit }, settingsWithItem: SettingsWithItem) {
    commit('SET_LOADING_TEXT', 'materials');

    const itemName = settingsWithItem.currentItemInfo.name;
    const allNames = createStringOfAllResources(itemName, 3);
    const location = settingsWithItem.settings.cities.sellMaterials;

    await axios
      .get(`${baseUrl}data?items=${allNames}&locations=${location}`)
      .then(response => {
        const data = response.data;

        commit('SET_SELL_MATERIALS', { data, settingsWithItem });
      });
  },

  /**
   * Fetch materials prices
   * 
   * @param commit - vuex commit
   * @param state - vuex state
   * @param {SettingsWithItem} settingsWithItem - сonvenient item data and settings
   */
  async FETCH_BUY_MATERIALS({ commit }, settingsWithItem: SettingsWithItem) {
    commit('SET_LOADING_TEXT', 'materials');

    const itemName = settingsWithItem.currentItemInfo.name;
    const allNames = createStringOfAllResources(itemName, 3);
    const location = settingsWithItem.settings.cities.buyMaterials;

    await axios
      .get(`${baseUrl}data?items=${allNames}&locations=${location}`)
      .then(response => {
        const data = response.data;

        commit('SET_BUY_MATERIALS', { data, settingsWithItem });
      });
  },
}