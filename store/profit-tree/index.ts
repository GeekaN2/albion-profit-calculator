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
  namespaced: true,
  state: () => ({
    tree: [],
    prices: JSON.parse(JSON.stringify(Object.assign(cities, {'Black Market': {}}))),
    recipes: {},
    settings: {},
    features: {},
    currentItemInfo: {},
    resources: JSON.parse(JSON.stringify(cities)),
    artefacts: JSON.parse(JSON.stringify(cities)),
    journals: JSON.parse(JSON.stringify(cities)),
    averageData: JSON.parse(JSON.stringify(cities))
  }),
  getters,
  actions,
  mutations
}

export default treeModule;