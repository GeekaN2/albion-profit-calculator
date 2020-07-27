import { GetterTree } from 'vuex'
import { TreeState } from '../typeDefs'
import { getReturnMaterialsPercentage, isArtefactItem } from '../utils'

export const getters: GetterTree<TreeState, {}> = {
  /**
   * Get t4-t8 item prices
   * 
   * @param state - vuex state
   */
  getItems: (state: TreeState) => {
    const itemName = state.currentItemInfo.name;
    const city = state.settings.cities.items;
    const prices = state.prices[city][itemName] || {}

    return prices;
  },

  /**
   * Get artefact
   * 
   * @param state - vuex state
   */
  getArtefacts: (state: TreeState) => {
    const itemName = state.currentItemInfo.name;
    const city = state.settings.cities.artefacts;
    const artefacts = state.artefacts[city][itemName] || {};

    return artefacts;
  },

  /**
   * Get item craft recipe
   * 
   * @param state - vuex state
   */
  getRecipe: (state: TreeState) => {
    const itemName = state.currentItemInfo.name;
    const recipe = state.recipes[itemName];

    return recipe;
  },

  /**
   * Get resource prices for current city
   * 
   * @param state - vuex state
   */
  getResources: (state: TreeState) => {
    const city = state.settings.cities.resources;
    const resources = state.resources[city] || {};

    return resources;
  },

  /**
   * Get journl prices for current city and root
   * 
   * @param state - vuex state
   */
  getJournals: (state: TreeState) => {
    const city = state.settings.cities.journals;
    const root = state.currentItemInfo.root;
    const journals = state.journals[city][root] || {}

    return journals;
  },
  
  /**
   * Get text of loading
   * 
   * @param state - vuex state
   */
  loadingText: (state: TreeState) => {
    return state.features.loadingText;
  },

  returnMaterialPercentage: (state: TreeState) => {
    const parentItem = state.currentItemInfo.parent;
    const city = state.settings.cities.items;
    const useFocus = state.settings.useFocus;

    return getReturnMaterialsPercentage(parentItem, city, useFocus);
  },
  
  /**
   * Is the current item an artifact?
   * 
   * @param state - vuex state
   */
  isArtefactItem: (state: TreeState) => {
    return isArtefactItem(state.currentItemInfo.name);
  }
}