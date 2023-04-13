import { ActionTree } from 'vuex'
import axios from 'axios'
import { TransportationsState } from './typeDefs'
import { RootState } from '../typeDefs';

const baseUrl = process.env.BASE_URL;

export const actions: ActionTree<TransportationsState, RootState> = {
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
  async UPDATE_TABLE({ commit, state, rootState }) {
    const settings = state.settings;
    const count = 20;
    const skip = state.settings.skip;

    if (state.features.transportationsStatus === 'loading') {
      return;
    }

    commit('UPDATE_TRANSPORTATIONS_STATUS', 'loading');
  
    const serverId = rootState.features.currentServerId;

    await axios
      .get(`${baseUrl}transportations/sort?from=${settings.locationFrom}&to=${settings.locationTo}&count=${count}&skip=${skip}&sort=${settings.backendSorting.join(',')}&serverId=${serverId}`)
      .then(response => {
        const data = response.data;

        commit('ADD_ITEMS_DATA', data);
        commit('UPDATE_SKIP', skip + count);
      });

    commit('UPDATE_TRANSPORTATIONS_STATUS', 'success');
  },

  /**
   * Get items data
   * 
   * @param param0 
   */
  async GET_ITEMS({ commit, state, rootState }) {
    const settings = state.settings;
    const count = 20;
    const skip = 0;
    const serverId = rootState.features.currentServerId;


    await axios
      .get(`${baseUrl}transportations/sort?from=${settings.locationFrom}&to=${settings.locationTo}&count=${count}&skip=${skip}&sort=${settings.backendSorting.join(',')}&serverId=${serverId}`)
      .then(response => {
        const data = response.data;

        commit('UPDATE_ITEMS_DATA', data);
        commit('UPDATE_SKIP', count);
      });
  },
}