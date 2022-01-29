import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters'
import Vuex, { Module } from 'vuex';
import Vue from 'vue'
import clonedeep from 'lodash.clonedeep';
import { FoodAndPotionsState, LoadingStatus } from './typeDefs';
import { RootState } from '../typeDefs';
import { ConsumableItem } from './models';
import axios from 'axios';

Vue.use(Vuex);

const cities = {
  'Caerleon': [],
  'Bridgewatch': [],
  'Fort Sterling': [],
  'Lymhurst': [],
  'Martlock': [],
  'Thetford': [],
}

const refiningModule: Module<FoodAndPotionsState, RootState>  = {
  namespaced: true,
  state: () => ({
    items: clonedeep(cities),
    resources: clonedeep(cities),
    averageData: clonedeep(cities),
    foodAndPotionsTreeItems: [],
    foodAndPotionsTree: [],
    settings: {
      useFocus: false,
      fee: 800,
      useOwnPercentage: false,
      returnPercentage: 15.2,
      useMultipleCities: false,
      showAverageItems: false,
      cities: {
        buyResources: 'Caerleon',
        craftItems: 'Caerleon',
        sellItems: 'Caerleon'
      }
    },
    features: {
      loadingStatus: LoadingStatus.CALCULATED,
    },
    currentItemTiers: [],
  }),
  getters,
  actions,
  mutations
}

export default refiningModule;
