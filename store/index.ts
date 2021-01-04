import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import axios from 'axios';
import treeModule from './profit-tree';
import transportationsModule from './transportations-table';
import transmutationsModule from './transmutations';

const store: StoreOptions<{}> ={
  state: {},
  modules: {
    /**
     * Profit tree module
     */
    tree: treeModule,

    /**
     * Transportations table module
     */
    transportations: transportationsModule,
    
    /**
     * Transmutation tables module
     */
    transmutations: transmutationsModule,
  }
};

export default () => new Vuex.Store<{}>(store);