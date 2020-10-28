import { MutationTree } from 'vuex'
import { normalizedPriceAndDate, normalizeItem } from '../utils'
import { ResponseModel, TreeState, Item, Settings, ItemInfo, JournalsItem, AverageDataResponse, AverageDataForItem, SettingsWithItem, Resources } from '../typeDefs'
import Vue from 'vue';

export const mutations: MutationTree<TreeState> = {
  /**
   * Set json files data into state
   * 
   * @param state - vuex state
   * @param tree - tree structure of items
   * @param recipes - recipes of all items
   */
  SET_STATE(state, { tree, recipes }) {
    state.tree = tree;
    state.recipes = recipes;
    state.features = {
      loadingText: 'calculated'
    };
    state.settings = {
      useJournals: false,
      useFocus: false,
      showAverageItems: false,
      useAveragePrice: false,
      craftFee: 10,
      cities: {
        sellItems: "Caerleon",
        craftItems: "Caerleon",
        resourcesFirstLocation: "Caerleon",
        resourcesSecondLocation: 'Caerleon',
        artefacts: "Caerleon",
        journals: "Caerleon"
      }
    };
    state.currentItemInfo = {
      name: '',
      parent: '',
      root: '',
      artefactLevel: ''
    }
  },
}