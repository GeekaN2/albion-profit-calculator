import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters'
import Vuex, { Module } from 'vuex';
import Vue from 'vue'
import clonedeep from 'lodash.clonedeep';
import { FoodAndPotionsState } from './typeDefs';
import { RootState } from '../typeDefs';

Vue.use(Vuex);

const cities = {
  'Caerleon': {},
  'Bridgewatch': {},
  'Fort Sterling': {},
  'Lymhurst': {},
  'Martlock': {},
  'Thetford': {},
}

const refiningModule: Module<FoodAndPotionsState, RootState>  = {
  namespaced: true,
  state: () => ({
    items: clonedeep(cities),
    resources: clonedeep(cities),
    settings: {
      useFocus: false,
      fee: 800,
      useOwnPercentage: false,
      returnPercentage: 15.2,
      useMultipleCities: false,
      cities: {
        buyResources: 'Caerleon',
        sellItems: 'Caerleon'
      }
    },
  }),
  getters,
  actions,
  mutations
}

export default refiningModule;
