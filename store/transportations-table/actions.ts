import { ActionTree } from 'vuex'
import axios from 'axios'
import { TransportationsState } from './typeDefs'

const baseUrl = process.env.BASE_URL;

export const actions: ActionTree<TransportationsState, {}> = {
  /**
   * Fetch json files data. Set recipes of items and tree structure of items
   * 
   * @param commit - vuex commit
   */
  async FETCH_STATE({ commit }) {
    commit('SET_STATE');
  },

  /**
   * Update table
   */
  async UPDATE_TABLE({ commit, state }) {
    const settings = state.settings;
    const count = 20;
    const skip = state.settings.skip;

    await axios
      .get(`${baseUrl}transportations/sort?from=${settings.locationFrom}&to=${settings.locationTo}&count=${count}&skip=${skip}`)
      .then(response => {
        const data = response.data;

        commit('ADD_ITEMS_DATA', data);
        commit('UPDATE_SKIP', skip + count);
      });
  },

  /**
   * Get items data
   * 
   * @param param0 
   */
  async GET_ITEMS({ commit, state }) {
    const settings = state.settings;
    const count = 20;
    const skip = 0;

    await axios
      .get(`${baseUrl}transportations/sort?from=${settings.locationFrom}&to=${settings.locationTo}&count=${count}&skip=${skip}&sort=${settings.backendSorting.join(',')}`)
      .then(response => {
        const data = response.data;

        commit('UPDATE_ITEMS_DATA', data);
        commit('UPDATE_SKIP', count);
      });
  },
}