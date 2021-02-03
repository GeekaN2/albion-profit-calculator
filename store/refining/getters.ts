import { GetterTree } from 'vuex'
import { RefiningState, ResponseModel } from './typeDefs'
import { getRawResourceNameByMaterial } from '../utils'

export const getters: GetterTree<RefiningState, {}> = {
  buyRawResources: (state: RefiningState) => {
    const city = state.settings.cities.buyRawResources;
    const itemName = getRawResourceNameByMaterial(state.currentItemInfo.name);
    let prices = state.rawResources[city][itemName] || [];
    let normalized: {[key: string]: ResponseModel} = {};

    prices.forEach(item => normalized[item.itemId] = item);

    return normalized;
  },
  
  sellMaterials: (state: RefiningState) => {
    const city = state.settings.cities.sellMaterials;
    const itemName = state.currentItemInfo.name;
    let prices = state.materials[city][itemName] || [];
    let normalized: {[key: string]: ResponseModel} = {};

    prices.forEach(item => normalized[item.itemId] = item);

    return normalized;
  },

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
  loadingText: (state: RefiningState) => {
    return state.features.loadingText;
  },
}