import { MutationTree } from 'vuex'
import { FeaturesState, Server } from './typeDefs'

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
  },

  SET_SERVERS(state: FeaturesState, servers: Server[]) {
    state.servers = servers;
  },

  SET_CURRENT_SERVER_ID(state: FeaturesState, serverId: Server['id']) {
    state.currentServerId = serverId;
    localStorage.setItem(`current-server-id`, serverId);
  } 
}