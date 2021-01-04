import { GetterTree } from 'vuex'
import { TransmutationsState, Item } from './typeDefs'
import { normalizeItemBySellPriceMin } from '../utils'

export const getters: GetterTree<TransmutationsState, {}> = {
  /**
   * Get t4-t8 item prices
   * 
   * @param state - vuex state
   */
  getItems: (state: TransmutationsState) => {
    const itemName = state.currentItemInfo.name;
    const city = state.settings.city;
    let prices = state.prices[city][itemName] || [];
    
    return prices;
  },

  /**
   * Get text of loading
   * 
   * @param state - vuex state
   */
  loadingText: (state: TransmutationsState) => {
    return state.features.loadingText;
  },
}