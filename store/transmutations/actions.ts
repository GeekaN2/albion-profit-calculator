import { ActionTree } from 'vuex'
import axios from 'axios'
import { createStringOfAllResources, isObjectEmpty } from '../utils'
import { TransmutationsState, ItemInfo, SettingsWithItem } from './typeDefs'

const baseUrl = process.env.BASE_URL;

export const actions: ActionTree<TransmutationsState, {}> = {
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

    if (getters.getItems.length == 0) {
      await dispatch('FETCH_ITEM_PRICES', settingsWithItem);
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
  async FETCH_ITEM_PRICES({ commit }, settingsWithItem: SettingsWithItem) {
    commit('SET_LOADING_TEXT', 'items');

    const itemName = settingsWithItem.currentItemInfo.name;
    const allNames = createStringOfAllResources(itemName);
    const location = settingsWithItem.settings.city;

    await axios
      .get(`${baseUrl}data?items=${allNames}&locations=${location}`)
      .then(response => {
        const data = response.data;

        commit('SET_ITEM_PRICES', { data, settingsWithItem });
      });
  },
}