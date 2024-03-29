import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters'
import Vuex, { Module } from 'vuex';
import Vue from 'vue'
import { TransmutationsState } from './typeDefs';
import { RootState } from '../typeDefs';
import clonedeep from 'lodash.clonedeep';

Vue.use(Vuex);

const cities = {
  'Caerleon': {},
  'Bridgewatch': {},
  'Fort Sterling': {},
  'Lymhurst': {},
  'Martlock': {},
  'Thetford': {},
  'Brecilien': {},
}

const transmutationModule: Module<TransmutationsState, RootState> = {
  namespaced: true,
  state: () => ({
    prices: clonedeep(Object.assign(cities, {'Black Market': {}})),
    settings: {
      isCalibrated: false,
      lastGlobalDiscount: 0.95,
      gameItemFee: 75000,
      fee: 800,
      showTransmutationWays: false,
      cities: {
        buyResourcesLocation: 'Caerleon',
        sellResourcesLocation: 'Caerleon'
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

export default transmutationModule;
