import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters'
import Vuex from 'vuex';
import Vue from 'vue'

Vue.use(Vuex);

const cities = {
  'Caerleon': {},
  'Bridgewatch': {},
  'Fort Sterling': {},
  'Lymhurst': {},
  'Martlock': {},
  'Thetford': {},
}

const treeModule = {
  state: {
    tree: [],
    prices: JSON.parse(JSON.stringify(Object.assign(cities, {'Black Market': {}}))),
    settings: {},
  },
  getters,
  actions,
  mutations
}

export default treeModule;