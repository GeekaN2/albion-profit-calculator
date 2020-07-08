import Vue from 'vue'
import Vuex, {StoreOptions} from 'vuex'
import axios from 'axios'
import {RootState} from './typeDefs'
import {actions} from './tree-logic/actions'
import {mutations} from './tree-logic/mutations'

Vue.use(Vuex)

const cities = {
  'Caerleon': {},
  'Bridgewatch': {},
  'Fort Sterling': {},
  'Lymhurst': {},
  'Martlock': {},
  'Thetford': {},
}

const store: StoreOptions<RootState> ={
  state: {
    tree: [],
    prices: {},
    recipes: {},
    resources: JSON.parse(JSON.stringify(cities)),
    artefacts: JSON.parse(JSON.stringify(cities)),
    journals: JSON.parse(JSON.stringify(cities))
  },
  actions,
  mutations
};

export default () => new Vuex.Store<RootState>(store);