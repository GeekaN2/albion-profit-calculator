import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters'
import Vuex, { Module } from 'vuex';
import Vue from 'vue'
import { FeaturesState } from './typeDefs';
import { RootState } from '../typeDefs';

Vue.use(Vuex);

const featuresModule: Module<FeaturesState, RootState> = {
  namespaced: true,
  state: () => ({
    isModalShown: false,
    servers: [],
    currentServerId: '',
  }),
  getters,
  actions,
  mutations
}

export default featuresModule;