import Vue from 'vue'
import Vuex, {StoreOptions} from 'vuex'
import axios from 'axios'
import {RootState} from './typeDefs'
import treeModule from './profit-tree';

const store: StoreOptions<RootState> ={
  modules: {
    tree: treeModule
  }
};

export default () => new Vuex.Store<RootState>(store);