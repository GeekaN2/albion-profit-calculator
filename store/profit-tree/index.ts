import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters'
import Vuex, { Module } from 'vuex';
import Vue from 'vue'
import clonedeep from 'lodash.clonedeep';
import { TreeState, Settings } from './typeDefs';
import { RootState } from '../typeDefs';

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

const settings: Settings = {
  useJournals: false,
  useFocus: false,
  useMultipleCities: false,
  showAverageItems: false,
  useAveragePrice: false,
  useExpertMode: false,
  returnPercentage: 15.2,
  craftFee: 10,
  itemsMultiplier: 1,
  cities: {
    sellItems: "Caerleon",
    craftItems: "Caerleon",
    resourcesFirstLocation: "Caerleon",
    resourcesSecondLocation: 'Caerleon',
    artefacts: "Caerleon",
    journals: "Caerleon",
    hearts: "Caerleon",
  },
  expert: {
    useOwnPercentage: false,
    useMinPricesNormalization: false,
    qualities: [1, 2, 3]
  }
}

const treeModule: Module<TreeState, RootState> = {
  namespaced: true,
  state: () => ({
    tree: [],
    prices: clonedeep(Object.assign(cities, { 'Black Market': {} })),
    recipes: {},
    settings: clonedeep(settings),
    settingsBackup: clonedeep(settings),
    itemsMultiplier: 1,
    features: {
      loadingText: 'calculated'
    },
    currentItemInfo: {
      name: '',
      parent: '',
      root: '',
      artefactLevel: ''
    },
    resources: clonedeep(cities),
    artefacts: clonedeep(cities),
    journals: clonedeep(cities),
    hearts: clonedeep(cities),
    averageData: clonedeep(cities)
  }),
  getters,
  actions,
  mutations
}

export default treeModule;