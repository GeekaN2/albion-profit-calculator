import { MutationTree } from 'vuex'
import { TransmutationsState, ItemInfo } from './typeDefs'
import Vue from 'vue';

export const mutations: MutationTree<TransmutationsState> = {
  /**
   * Set json files data into state
   * 
   * @param state - vuex state
   */
  SET_STATE(state) {
    state.settings = {
      fee: 10,
      gold: 2980,
      city: 'Caerleon'
    };
    state.currentItemInfo = {
      name: '',
    };
    state.features = {
      loadingText: 'calculated'
    }
  },

  /**
   * Set item prices to state
   * 
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings 
   */
  SET_ITEM_PRICES(state, { data, settingsWithItem }) {
    const itemName = settingsWithItem.currentItemInfo.name;
    const location = settingsWithItem.settings.city;

    Vue.set(state.prices[location], itemName, data);
  },

  /**
   * Set information about selected resoruce
   * 
   * @param state - vuex state
   * @param resourceName - resource name
   */
  SET_ITEM_INFO(state, itemInfo: ItemInfo) {
    state.currentItemInfo = itemInfo;
  },

  /**
   * Set loading text
   * 
   * @param state - vuex state
   * @param loadingText - text of loading
   */
  SET_LOADING_TEXT(state, loadingText: string) {
    state.features.loadingText = loadingText;
  },
}