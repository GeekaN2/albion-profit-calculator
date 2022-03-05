import axios from 'axios';
import Vue from 'vue';
import { MutationTree } from 'vuex'
import { ResponseModel } from '../typeDefs';
import { AverageDataForItem, FoodAndPotionsState, LoadingStatus, Settings, SettingsWithItemTiers } from './typeDefs'

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

  SET_SETTING_FIELD(state, { fieldName, fieldValue }: { fieldName: keyof Settings, fieldValue: Settings[keyof Settings] }) {
    Vue.set(state.settings, fieldName, fieldValue);
  },

  /**
   * Set average data for items
   * 
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings 
   */
  SET_AVERAGE_DATA(state, { data, settingsWithItemTiers }: { data: AverageDataForItem[]; settingsWithItemTiers: SettingsWithItemTiers }) {
    const city = settingsWithItemTiers.settings.cities.sellItems;

    Vue.set(state.averageData, city, data);
  },

  UPDATE_ITEM_BY_ITEM_NAME(state, { itemName, item }: { itemName: string; item: ResponseModel }) {
    const cities = state.settings.cities;
    const items = state.items[cities.sellItems];
    const resources = state.resources[cities.buyResources];
    const storeItemIndex = state.items[cities.sellItems].findIndex((item) => item.itemId === itemName);
    const storeResourceIndex = state.resources[cities.buyResources].findIndex((resource) => resource.itemId === itemName);
    
    if (storeItemIndex != -1) {
      Vue.set(items, storeItemIndex, item);
    }

    if (storeResourceIndex != -1) {
      Vue.set(resources, storeResourceIndex, item);
    }
  }
}