import { MutationTree } from 'vuex'
import { normalizedPriceAndDate, normalizeItem } from '../utils'
import { TransportationsState, Item } from './typeDefs'
import Vue from 'vue';

export const mutations: MutationTree<TransportationsState> = {
  /**
   * Set json files data into state
   * 
   * @param state - vuex state
   * @param tree - tree structure of items
   * @param recipes - recipes of all items
   */
  SET_STATE(state) {
    state.settings = {
      locationFrom: 'Lymhurst',
      locationTo: 'Black Market'
    }
  },

  /**
   * Update items data
   */
  UPDATE_ITEMS_DATA(state, data: Item[]) {
    data.forEach(item => {
      state.items.push(item);
    })
  }
}