import Vuex, { StoreOptions } from 'vuex';
import treeModule from './profit-tree';
import transportationsModule from './transportations-table';
import transmutationsModule from './transmutations';
import refiningModule from './refining';

const store: StoreOptions<{}> ={
  state: () => ({}),
  modules: {
    /**
     * Profit tree module
     */
    tree: treeModule,

    /**
     * Table with resource refining
     */
    refining: refiningModule,

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