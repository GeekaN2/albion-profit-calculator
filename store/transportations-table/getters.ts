import { GetterTree } from 'vuex'
import { TransportationsState } from './typeDefs'
import { isArtifactItem } from '../utils'

export const getters: GetterTree<TransportationsState, {}> = {
  /**
   * Get price for current item
   * 
   * @param state - vuex state
   * @param itemId - full item name
   * @param city - item location
   */
  getItem2: (state: TransportationsState) => ({ itemId }: { itemId: string }) => {
    let item = state.items.find(item => item.itemId == itemId) || {};

    return item;
  },

  /**
   * Get all items
   */
  getItems2: (state: TransportationsState) => {
    return state.items || {};
  }
}