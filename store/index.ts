import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import axios from 'axios';
import { RootState } from './typeDefs';
import treeModule from './profit-tree';
import transportationsModule from './transportations-table';
import { TreeState } from './profit-tree/typeDefs';

const store: StoreOptions<TreeState> ={
  modules: {
    /**
     * Profit tree module
     */
    tree: treeModule,
    transportations: transportationsModule
  }
};

export default () => new Vuex.Store<TreeState>(store);