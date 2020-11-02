import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters'
import Vuex from 'vuex';
import Vue from 'vue'

Vue.use(Vuex);

const transportationsModule = {
  namespaced: true,
  state: {
    items: [],
    settings: {},
  },
  getters,
  actions,
  mutations
}

export default transportationsModule;