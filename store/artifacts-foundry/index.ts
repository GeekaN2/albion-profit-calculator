import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters'
import Vuex, { Module } from 'vuex';
import Vue from 'vue'
import clonedeep from 'lodash.clonedeep';
import { ArtifactsFoundryState, FragmentType, LoadingStatus } from './typeDefs';
import { RootState } from '../typeDefs';

Vue.use(Vuex);

const cities = {
  'Caerleon': [],
  'Bridgewatch': [],
  'Fort Sterling': [],
  'Lymhurst': [],
  'Martlock': [],
  'Thetford': [],
}

const fragments: { [key in FragmentType ]: string[]} = {
  'RUNE': [],
  'SOUL': [],
  'RELIC': [],
  'SHARD_AVALONIAN': []
};

const artifactsFoundryModule: Module<ArtifactsFoundryState, RootState>  = {
  namespaced: true,
  state: () => ({
    tree: {
      'WARRIOR_BRANCH': clonedeep(fragments),
      'HUNTER_BRANCH': clonedeep(fragments),
      'MAGE_BRANCH': clonedeep(fragments),
    },
    fragments: clonedeep(cities),
    artifacts: clonedeep(cities),
    averageData: clonedeep(cities),
    settings: {
      useMultipleCities: false,
      cities: {
        buyArtifacts: 'Caerleon',
        sellArtifacts: 'Caerleon',
        sellFragments: 'Caerleon',
        buyFragments: 'Caerleon',
      }
    },
    features: {
      loadingStatus: LoadingStatus.CALCULATED,
    },
    currentItemInfo: {
      name: 'RUNE'
    }
  }),
  getters,
  actions,
  mutations
}

export default artifactsFoundryModule;