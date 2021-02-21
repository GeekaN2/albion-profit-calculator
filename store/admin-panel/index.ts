import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters'
import Vuex, { Module } from 'vuex';
import Vue from 'vue'
import { AdminPanelState } from './typeDefs';
import { RootState } from '../typeDefs';

Vue.use(Vuex);

const adminPanelModule: Module<AdminPanelState, RootState> = {
  namespaced: true,
  state: () => ({
    roles: [],
    users: []
  }),
  getters,
  actions,
  mutations
}

export default adminPanelModule;