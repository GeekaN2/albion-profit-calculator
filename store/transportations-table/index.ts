import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters'
import Vuex, { Module } from 'vuex';
import Vue from 'vue'
import { TransportationsState } from './typeDefs';
import { RootState } from '../typeDefs';

Vue.use(Vuex);

const transportationsModule: Module<TransportationsState, RootState> = {
  namespaced: true,
  state: () => ({
    items: [],
    settings: {
      locationFrom: 'Lymhurst',
      locationTo: 'Black Market',
      skip: 0,
      useHeuristicSort: false
    },
  }),
  getters,
  actions,
  mutations
}

export default transportationsModule;