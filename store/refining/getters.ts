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
   * Returns the percentage of materials returned 
   * for profile cities
   * 
   * @param state - vuex state
   */
  returnPercentage: (state: RefiningState) => {
    if (state.settings.useOwnPercentage) {
      return state.settings.returnPercentage;
    }

    const itemName = state.currentItemInfo.name;
    const city = state.settings.cities.refiningResources;
    const useFocus = state.settings.useFocus;

    let returnMaterialsPercentage = useFocus ? 43.5 : 15.2;

    // Keywords for the category of items that the bonus is assigned to
    const bonus: { [key: string]: string[] } = {
      'Martlock': ['LEATHER'],
      'Bridgewatch': ['STONEBLOCK'],
      'Lymhurst': ['CLOTH'],
      'Fort Sterling': ['PLANKS'],
      'Thetford': ['METALBAR']
    };

    if (!bonus[city]) {
      return returnMaterialsPercentage;
    }

    const categories = bonus[city];

    let addBonus = categories.some(keyword => itemName.includes(keyword));

    if (addBonus) {
      returnMaterialsPercentage = useFocus ? 53.9 : 36.7;
    }

    return returnMaterialsPercentage;
  },
}