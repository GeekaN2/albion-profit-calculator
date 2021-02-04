import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters'
import Vuex, { Module } from 'vuex';
import Vue from 'vue'
import clonedeep from 'lodash.clonedeep';
import { RefiningState } from './typeDefs';

Vue.use(Vuex);

const cities = {
  'Caerleon': {},
  'Bridgewatch': {},
  'Fort Sterling': {},
  'Lymhurst': {},
  'Martlock': {},
  'Thetford': {},
}

const refiningModule :Module<RefiningState, {}>  = {
  namespaced: true,
  state: () => ({
    rawResources: clonedeep(cities),
    materials: clonedeep(cities),
    settings: {
      fee: 10,
      useMiltipleCities: false,
      cities: {
        sellMaterials: 'Caerleon',
        refiningResources: 'Caerleon',
        buyMaterials: 'Caerleon',
        buyRawResources: 'Caerleon'
      }
    },
    currentItemInfo: {
      name: ''
    },
    features: {
      loadingText: 'calculated'
    }
  }),
  getters,
  actions,
  mutations
}

export default refiningModule;