import { ActionTree } from 'vuex'
import axios from 'axios'
import { createStringOfAllItems, createStringOfAllResources, createStringOfAllArtefacts, createStringOfAllJournals, isObjectEmpty } from '../utils'
import { TreeState, ItemInfo } from '../typeDefs'
import { isArtefactItem } from '../utils'

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

    const itemName = state.currentItemInfo.name;

    if (!itemName) {
      return;
    }

    if (isObjectEmpty(getters.getItems)) {
      await dispatch('FETCH_ITEM_PRICES');
    }

    if (isObjectEmpty(getters.getResources)) {
      await dispatch('FETCH_RESOURCE_PRICES');
    }

    if (isArtefactItem(itemName) && isObjectEmpty(getters.getArtefacts)) {
      await dispatch('FETCH_ARTEFACT_PRICES');
    }

    if (state.settings.showAverageItems && isObjectEmpty(getters.getAverageData)) {
      await dispatch('FETCH_AVERAGE_DATA');
    }

    if (
      state.settings.useJournals &&
      isObjectEmpty(getters.getJournals) &&
      state.currentItemInfo.root.slice(0, 5) == "ROOT_"
    ) {
      await dispatch('FETCH_JOURNAL_PRICES');
    }

    commit('SET_LOADING_TEXT', 'calculated');
  },

  /**
   * Update a part of state
   * 
   * @param data - items, resources, artifacts or journals
   */
  async UPDATE_STATE({ dispatch, state }, data: string) {
    const itemName = state.currentItemInfo.name;

    if (!itemName) {
      return;
    }

    switch(data) {
      case 'items':
        await dispatch('FETCH_ITEM_PRICES');
        break;
      case 'resources':
        await dispatch('FETCH_RESOURCE_PRICES');
        break;
      case 'artifacts':
        await dispatch('FETCH_ARTEFACT_PRICES');
        break;
      case 'journals':
        await dispatch('FETCH_JOURNAL_PRICES');
        break;
    }

    await dispatch("CHECK_ALL");
  },

  /**
   * Fetch item prices
   * 
   * @param commit - vuex commit
   * @param state - vuex state
   */
  async FETCH_ITEM_PRICES({ commit, state }) {
    commit('SET_LOADING_TEXT', 'items');

    const itemName = state.currentItemInfo.name;
    const allNames: string = createStringOfAllItems(itemName);
    const location = state.settings.cities.sellItems;

    await axios
      .get(`https://www.albion-online-data.com/api/v2/stats/prices/${allNames}?locations=${location}&qualities=1,2,3`)
      .then(response => {
        const data = response.data;

        commit('SET_ITEM_PRICES', data);
      });
  },

  /**
   * Fetch resource prices for current item with all tiers and subtiers
   * 
   * @param commit - vuex commit
   * @param state - vuex state
   */
  async FETCH_RESOURCE_PRICES({ commit, state }) {
    commit('SET_LOADING_TEXT', 'resources');

    const resources = ['CLOTH', 'LEATHER', 'PLANKS', 'METALBAR'];
    const location = state.settings.cities.resources;

    let allNames = resources.reduce((acc, resource) => {
      acc = acc + createStringOfAllResources(resource) + ',';

      return acc;
    }, '').slice(0, -1);

    await axios
      .get(`https://www.albion-online-data.com/api/v2/stats/prices/${allNames}?locations=${location}`)
      .then(response => {
        const data = response.data;

        commit('SET_RESOURCE_PRICES', data);
      });
  },

  /**
   * Fetch t4-t8 artifacts for current item 
   * 
   * @param commit - vuex commit 
   * @param state - vuex state
   */
  async FETCH_ARTEFACT_PRICES({ commit, state }) {
    commit('SET_LOADING_TEXT', 'artefacts');

    const itemName = state.currentItemInfo.name;
    let allNames = createStringOfAllArtefacts(itemName);
    const location = state.settings.cities.artefacts;

    await axios
      .get(`https://www.albion-online-data.com/api/v2/stats/prices/${allNames}?locations=${location}`)
      .then(response => {
        const data = response.data;

        commit('SET_ARTEFACT_PRICES', data);
      });
  },

  /**
   * Fetch t4-t8 empty and full journal prices
   * 
   * @param commit - vuex commit 
   * @param state - vuex state
   */
  async FETCH_JOURNAL_PRICES({ commit, state }) {
    commit('SET_LOADING_TEXT', 'journals');

    let allNames = createStringOfAllJournals(state.currentItemInfo.root);
    const location = state.settings.cities.journals;

    await axios
      .get(`https://www.albion-online-data.com/api/v2/stats/prices/${allNames}?locations=${location}`)
      .then(response => {
        const data = response.data;

        commit('SET_JOURNAL_PRICES', data)
      });
  },

  /**
   * Fetch average data for items
   */
  async FETCH_AVERAGE_DATA({ commit, state }) {
    commit('SET_LOADING_TEXT', 'averageData');

    const itemName = state.currentItemInfo.name;
    const allNames = createStringOfAllItems(itemName);
    const location = state.settings.cities.sellItems;
    const baseURL = process.env.BASE_URL;

    await axios
      .get(`${baseURL}data?items=${allNames}&locations=${location}`)
      .then(response => {
        const data = response.data;

        commit('SET_AVERAGE_DATA', data);
      });
  }
}