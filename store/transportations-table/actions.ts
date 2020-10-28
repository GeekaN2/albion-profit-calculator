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
}