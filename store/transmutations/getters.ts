import { GetterTree } from 'vuex'
import { TransmutationsState, ResponseModel } from './typeDefs'
import { normalizeItemBySellPriceMin } from '../utils'

export const getters: GetterTree<TransmutationsState, {}> = {
  /**
   * Get t4-t8 item prices
   * 
   * @param state - vuex state
   */
  sellItemPrices: (state: TransmutationsState) => {
    const itemName = state.currentItemInfo.name;
    const city = state.settings.cities.sellResourcesLocation;
    let prices = state.prices[city][itemName] || [];
    let normalized: {[key: string]: ResponseModel} = {};

    prices.forEach(item => normalized[item.itemId] = item);
    
    return normalized;
  },

  /**
   * Get t4-t8 item prices
   * 
   * @param state - vuex state
   */
  buyItemPrices: (state: TransmutationsState) => {
    const itemName = state.currentItemInfo.name;
    const city = state.settings.cities.buyResourcesLocation;
    let prices = state.prices[city][itemName] || [];
    let normalized: {[key: string]: ResponseModel} = {};

    prices.forEach(item => normalized[item.itemId] = item);
    
    return normalized;
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