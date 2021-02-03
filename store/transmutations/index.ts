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

const transmutationModule = {
  namespaced: true,
  state: () => ({
    prices: JSON.parse(JSON.stringify(Object.assign(cities, {'Black Market': {}}))),
    settings: {
      cities: {}
    },
    currentItemInfo: {},
    features: {}
  }),
  getters,
  actions,
  mutations
}

export default transmutationModule;