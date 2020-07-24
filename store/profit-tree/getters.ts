import { GetterTree } from 'vuex'
import { TreeState } from '../typeDefs'

export const getters: GetterTree<TreeState, {}> = {
  getItems: (state: TreeState) => (item: string, city: string): {} => {
    const prices = state.prices[item][city];

    return prices;
  },

  getResources: (state: TreeState) => (city: string): {} => {
    const resources = state.resources[city];

    return resources;
  },

  getArtefacts: (state: TreeState) => (item: string, city: string): {} => {
    const artefacts = state.artefacts[city][item] || {};

    return artefacts;
  },

  getRecipe: (state: TreeState) => (item: string): {} => {
    const recipe = state.recipes[item];

    return recipe;
  },

  getJournals: (state: TreeState) => (root: string, city: string): {} => {
    const journals = state.journals[city][root];

    return journals;
  }
}