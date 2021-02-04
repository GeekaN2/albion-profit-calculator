import { GetterTree } from 'vuex'
import { RefiningState, ResponseModel } from './typeDefs'
import { getRawResourceNameByMaterial } from '../utils'

export const getters: GetterTree<RefiningState, {}> = {
  /**
   * Get t4-t8 raw resource prices
   * 
   * @param state - vuex state
   */
  buyRawResources: (state: RefiningState) => {
    const city = state.settings.cities.buyRawResources;
    const itemName = getRawResourceNameByMaterial(state.currentItemInfo.name);
    let prices = state.rawResources[city][itemName] || [];
    let normalized: {[key: string]: ResponseModel} = {};

    prices.forEach(item => normalized[item.itemId] = item);

    return normalized;
  },
  
  /**
   * Get t4-t8 sell material prices
   * 
   * @param state - vuex state
   */
  sellMaterials: (state: RefiningState) => {
    const city = state.settings.cities.sellMaterials;
    const itemName = state.currentItemInfo.name;
    let prices = state.materials[city][itemName] || [];
    let normalized: {[key: string]: ResponseModel} = {};

    prices.forEach(item => normalized[item.itemId] = item);

    return normalized;
  },

  /**
   * Get t4-t8 buy material prices
   * 
   * @param state - vuex state
   */
  buyMaterials: (state: RefiningState) => {
    const city = state.settings.cities.buyMaterials;
    const itemName = state.currentItemInfo.name;
    let prices = state.materials[city][itemName] || [];
    let normalized: {[key: string]: ResponseModel} = {};

    prices.forEach(item => normalized[item.itemId] = item);

    return normalized;
  },

  /**
   * Get text of loading
   * 
   * @param state - vuex state
   */
  loadingText: (state: RefiningState): string => {
    return state.features.loadingText;
  },

  /**
   * Return percentage
   * 
   * @param state - vuex state
   */
  returnPercentage: (state: RefiningState): number => {
    return 15.2;
  }
}