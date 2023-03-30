import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters'
import Vuex, { Module } from 'vuex';
import Vue from 'vue'
import clonedeep from 'lodash.clonedeep';
import { ArtifactFoundryState, FragmentType, LoadingStatus } from './typeDefs';
import { RootState } from '../typeDefs';

Vue.use(Vuex);

const cities = {
  'Caerleon': [],
  'Bridgewatch': [],
  'Fort Sterling': [],
  'Lymhurst': [],
  'Martlock': [],
  'Thetford': [],
  'Brecilien': [],
}

const fragments: { [key in FragmentType ]: string[]} = {
  'RUNE': [],
  'SOUL': [],
  'RELIC': [],
  'SHARD_AVALONIAN': []
};

const artifactFoundryModule: Module<ArtifactFoundryState, RootState>  = {
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
    currentFragmentType: {},
  }),
  getters,
  actions,
  mutations
}

export default artifactFoundryModule;
