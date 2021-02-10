import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters'
import Vuex, { Module } from 'vuex';
import Vue from 'vue'
import clonedeep from 'lodash.clonedeep';
import { AdminPanelState } from './typeDefs';

Vue.use(Vuex);

const adminPanelModule: Module<AdminPanelState, {}> = {
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