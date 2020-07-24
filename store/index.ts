import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import axios from 'axios'
import { TreeState } from './typeDefs'
import treeModule from './profit-tree';

const store: StoreOptions<TreeState> ={
  modules: {
    /**
     * Profit tree module
     */
    tree: treeModule
  }
};

export default () => new Vuex.Store<TreeState>(store);