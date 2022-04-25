import { MutationTree } from 'vuex'
import { AdminPanelState, User } from './typeDefs'

export const mutations: MutationTree<AdminPanelState> = {
  /**
   * Set state
   * 
   * @param state - vuex state
   */
  SET_STATE(state) {
    state.roles = [];
    state.users = [];
  },

  /**
   * Set roles
   * 
   * @param state - vuex state
   * @param roles - possible user roles
   */
  SET_ROLES(state, roles) {
    state.roles = roles;
  },

  /**
   * Set users
   * 
   * @param state - vuex state
   * @param users - all users
   */
  SET_USERS(state, users: User[]) {
    state.users = users;
  },

  /**
   * Set users
   * 
   * @param state - vuex state
   */
  UPDATE_USER_ROLE(state, { nickname, role }: { nickname: string, role: string }) {
    state.users = state.users.map(user => user.nickname != nickname ? user : Object.assign(user, { role: role || user.role }));
  },

  /**
   * Update user role
   * 
   * @param state - vuex state
   */
  ALLOW_RESET_PASSWORD(state, { nickname }: { nickname: string, role: string }) {
    state.users = state.users.map(user => user.nickname != nickname ? user : Object.assign(user, { resetPassword: true }));
  }
}