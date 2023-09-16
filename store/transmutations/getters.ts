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
    let normalized: { [key: string]: ResponseModel } = {};

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
    let normalized: { [key: string]: ResponseModel } = {};

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

  /**
   * Get item current item name by tier and subtier
   *
   * @param tier - item tier
   * @param subtier - item subtier
   */
  getItemName: (state: TransmutationsState) => (tier: number, subtier: number) => {
    const baseItemName = state.currentItemInfo.name;

    return `T${tier}_${baseItemName}` +
      (subtier == 0 ? '' : `_LEVEL${subtier}@${subtier}`);
  },

  getItemByName: (state: TransmutationsState) => (itemName: string, location: 'sell' | 'buy'): ResponseModel | undefined => {
    const baseItemName = state.currentItemInfo.name;
    const { buyResourcesLocation, sellResourcesLocation } = state.settings.cities;

    const city = location === 'sell' ? sellResourcesLocation : buyResourcesLocation;
    const item: ResponseModel | undefined = state.prices[city][baseItemName].find(item => item.itemId === itemName);

    return item;
  },

  globalDiscount: (state: TransmutationsState) => {
    if (state.settings.isCalibrated) {
      return state.settings.lastGlobalDiscount;
    }
    // cost for transmutation from t4.3 to t4.4
    const itemTransCost = 79240;

    // tier 4.4
    const itemValue = 128;
    const globalDiscount = (state.settings.gameItemFee - itemValue * state.settings.fee / 100 * 0.1125) / itemTransCost;

    return globalDiscount;
  }
}
