import { GetterTree } from 'vuex'
import { TreeState } from '../typeDefs'
import { getReturnMaterialsPercentage, isArtefactItem } from '../utils'

export const getters: GetterTree<TreeState, {}> = {
  getItems: (state: TreeState) => {
    const itemName = state.currentItemInfo.name;
    const city = state.settings.cities.items;
    const prices = state.prices[city][itemName] || {}

    return prices;
  },

  getArtefacts: (state: TreeState) => {
    const itemName = state.currentItemInfo.name;
    const city = state.settings.cities.artefacts;
    const artefacts = state.artefacts[city][itemName] || {};

    return artefacts;
  },

  getRecipe: (state: TreeState) => {
    const itemName = state.currentItemInfo.name;
    const recipe = state.recipes[itemName];

    return recipe;
  },

  getResources: (state: TreeState) => {
    const city = state.settings.cities.resources;
    const resources = state.resources[city] || {};

    return resources;
  },

  getJournals: (state: TreeState) => {
    const city = state.settings.cities.journals;
    const root = state.currentItemInfo.root;
    const journals = state.journals[city][root] || {}

    return journals;
  },
  
  /**
   * Get text of loading
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

  isArtefactItem: (state: TreeState) => {
    return isArtefactItem(state.currentItemInfo.name);
  }
}