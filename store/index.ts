import Vuex, { StoreOptions } from 'vuex';
import treeModule from './profit-tree';
import transportationsModule from './transportations-table';
import transmutationsModule from './transmutations';
import refiningModule from './refining';
import adminPanelModule from './admin-panel';
import featuresModule from './features';
import foodAndPotionsModule from './food-and-potions';
import artifactFoundryModule from './artifact-foundry';
import { RootState } from './typeDefs';

const store: StoreOptions<RootState> ={
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

    /**
     * Food and potions
     */
    foodAndPotions: foodAndPotionsModule,

    /**
     * Admin panel module
     */
    adminPanel: adminPanelModule,

    /**
     * Artifacts melding and salvaging
     */
    artifactFoundry: artifactFoundryModule,

    /**
     * Some global features
     */
    features: featuresModule,
  }
};

export default () => new Vuex.Store<{}>(store);