import axios from 'axios';
import Vue from 'vue';
import { MutationTree } from 'vuex'
import { ResponseModel } from '../typeDefs';
import { FoodAndPotionsState, LoadingStatus, SettingsWithItemTiers } from './typeDefs'

export const mutations: MutationTree<FoodAndPotionsState> = {
  SET_FIELD(state: FoodAndPotionsState, { fieldName, fieldValue }: {
    fieldName: keyof FoodAndPotionsState,
    fieldValue: any
  }): void {
    state[fieldName] = fieldValue;
  },

  /**
   * Set current selected items
   * 
   * @param state - vuex state
   * @param currentItemTiers - selected tiers of item names. Without enchantments
   */
  SET_CURRENT_ITEM_TIERS(state, currentItemTiers: string[]): void {
    state.currentItemTiers = currentItemTiers;
  },

  /**
   * Set loading text
   * 
   * @param state - vuex state
   * @param loadingStatus - progress of the loading
   */
  SET_LOADING_STATUS(state, loadingStatus: LoadingStatus) {
    state.features.loadingStatus = loadingStatus;
  },

  /**
   * Set item prices to state
   * 
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings 
   */
  SET_ITEM_PRICES(state, { data, settingsWithItemTiers }: { data: ResponseModel[]; settingsWithItemTiers: SettingsWithItemTiers }) {
    const location = settingsWithItemTiers.settings.cities.sellItems;

    Vue.set(state.items, location, data);
  },

  /**
   * Set resource prices to state
   * 
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings 
   */
  SET_RESOURCE_PRICES(state, { data, settingsWithItemTiers }: { data: ResponseModel[]; settingsWithItemTiers: SettingsWithItemTiers }) {
    const location = settingsWithItemTiers.settings.cities.buyResources;

    Vue.set(state.resources, location, data);
  },
}