import { ActionTree } from 'vuex'
import axios from 'axios'
import { AdminPanelState } from './typeDefs'

const baseUrl = process.env.BASE_URL;

export const actions: ActionTree<AdminPanelState, {}> = {
  /**
   * Update profit tree settings for the user in the db
   * 
   * @param token - authorization token with Bearer
   */
  async GET_ROLES({ commit }, token) {
    const roles = await axios.get(`${baseUrl}admin/roles`, {
      headers: {
        Authorization: token
      }
    });

    commit('SET_ROLES', roles.data);
  },

  /**
   * Update profit tree settings for the user in the db
   * 
   * @param token - authorization token with Bearer
   */
  async GET_USERS({ commit }, token) {
    const users = await axios.get(`${baseUrl}admin/users`, {
      headers: {
        Authorization: token
      }
    });

    commit('SET_USERS', users.data);
  },

  /**
   * Update user role
   * 
   * @param nickname - user nickname
   * @param role - user role to set
   * @param token - admin auth token
   */
  async UPDATE_ROLE({ commit }, { nickname, role, token }) {
    const response = await axios.post(`${baseUrl}admin/change-role`, {
      nickname,
      role
    }, {
      headers: {
        Authorization: token
      }
    });

    commit('UPDATE_USER_ROLE', {
      nickname,
      role: response.data.role
    });

    return response.data.message || response.data;
  }
}