import { MutationTree } from 'vuex'
import { FeaturesState } from './typeDefs'

export const mutations: MutationTree<FeaturesState> = {
  /**
   * Open modal window
   * 
   * @param state - vuex state
   */
  SHOW_MODAL(state: FeaturesState) {
    state.isModalShown = true;
  },

  /**
   * Hide modal window
   * 
   * @param state - vuex state
   */
  HIDE_MODAL(state: FeaturesState) {
    state.isModalShown = false;
  }
}