import { MutationTree } from 'vuex'
import { TransmutationsState, ItemInfo, Settings, ResponseModel, SettingsWithItem } from './typeDefs'
import Vue from 'vue';

export const mutations: MutationTree<TransmutationsState> = {
  /**
   * Set json files data into state
   *
   * @param state - vuex state
   */
  SET_STATE(state) {
    state.settings = {
      gameItemFee: 75000,
      lastGlobalDiscount: 0.95,
      isCalibrated: false,
      fee: 800,
      showTransmutationWays: false,
      cities: {
        buyResourcesLocation: 'Caerleon',
        sellResourcesLocation: 'Caerleon'
      }
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
  SET_SELL_ITEM_PRICES(state, { data, settingsWithItem }: { data: ResponseModel[], settingsWithItem: SettingsWithItem}) {
    const itemName = settingsWithItem.currentItemInfo.name;
    const location = settingsWithItem.settings.cities.sellResourcesLocation;

    Vue.set(state.prices[location], itemName, data);
  },

  /**
   * Set item prices to state
   *
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings
   */
  SET_BUY_ITEM_PRICES(state, { data, settingsWithItem }: { data: ResponseModel[], settingsWithItem: SettingsWithItem}) {
    const itemName = settingsWithItem.currentItemInfo.name;
    const location = settingsWithItem.settings.cities.buyResourcesLocation;

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

  /**
   * Update fee
   *
   * @param state - vuex state
   * @param fee - fee
   */
  UPDATE_FEE(state, fee: number) {
    state.settings.fee = fee;
  },

  UPDATE_GAME_ITEM_FEE(state, gameItemFee: number) {
    state.settings.gameItemFee = gameItemFee;
  },

  /**
   * Update resource prices locations
   *
   * @param state - vuex state
   * @param fee - fee
   */
  UPDATE_CITIES(state, cities: Settings['cities']) {
    state.settings.cities = cities;
  },

  UPDATE_SHOW_TRANSMUTATION_WAYS(state, showTransmutationWays: boolean) {
    state.settings.showTransmutationWays = showTransmutationWays;
  },

  UPDATE_IS_CALIBRATED(state, isCalibrated: boolean) {
    state.settings.isCalibrated = isCalibrated;
  },

  UPDATE_SET_LAST_GLOBAL_DISCOUNT(state, lastGlobalDiscount: number) {
    state.settings.lastGlobalDiscount = lastGlobalDiscount;
  },

  UPDATE_ITEM_BY_ITEM_NAME(state, { itemName, item, location }: { itemName: string; item: ResponseModel, location: 'sell' | 'buy' }) {
    const currentItemInfo = state.currentItemInfo;
    const { buyResourcesLocation, sellResourcesLocation } = state.settings.cities;

    const city = location === 'sell' ? sellResourcesLocation : buyResourcesLocation;
    const resources = state.prices[city][currentItemInfo.name];
    const storeResourceIndex = resources.findIndex((resource) => resource.itemId === itemName);

    if (storeResourceIndex != -1) {
      Vue.set(resources, storeResourceIndex, item);
    }
  }
}
