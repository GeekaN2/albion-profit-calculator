import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters'
import Vuex from 'vuex';
import Vue from 'vue'
import clonedeep from 'lodash.clonedeep';

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
    prices: clonedeep(Object.assign(cities, {'Black Market': {}})),
    recipes: {},
    settings: {
      cities: {
        sellItems: "Caerleon",
        craftItems: "Caerleon",
        resourcesFirstLocation: "Caerleon",
        resourcesSecondLocation: 'Caerleon',
        artefacts: "Caerleon",
        journals: "Caerleon"
      }
    },
    settingsBackup: {},
    features: {},
    currentItemInfo: {},
    resources: clonedeep(cities),
    artefacts: clonedeep(cities),
    journals: clonedeep(cities),
    averageData: clonedeep(cities)
  }),
  getters,
  actions,
  mutations
}

export default treeModule;