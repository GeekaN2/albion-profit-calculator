import { MutationTree } from 'vuex'
import { RefiningState } from './typeDefs'
import { ResponseModel, SettingsWithItem, ItemInfo } from './typeDefs'
import { getRawResourceNameByMaterial } from '../utils';
import Vue from 'vue';

export const mutations: MutationTree<RefiningState> = {
  /**
   * Set json files data into state
   * 
   * @param state - vuex state
   */
  SET_STATE(state) {
    state.settings = {
      fee: 10,
      useMiltipleCities: false,
      cities: {
        sellMaterials: 'Caerleon',
        refiningResources: 'Caerleon',
        buyMaterials: 'Caerleon',
        buyRawResources: 'Caerleon'
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
   * Set information about selected material
   * 
   * @param state - vuex state
   * @param itemInfo - material info
   */
  SET_ITEM_INFO(state, itemInfo: ItemInfo) {
    state.currentItemInfo = itemInfo;
  },

  /**
   * Set raw resources prices to state
   * 
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings 
   */
  SET_RAW_RESOURCES(state, { data, settingsWithItem }: { data: ResponseModel[], settingsWithItem: SettingsWithItem}) {
    const itemName = getRawResourceNameByMaterial(settingsWithItem.currentItemInfo.name);
    const location = settingsWithItem.settings.cities.buyRawResources;

    Vue.set(state.rawResources[location], itemName, data);
  },

  /**
   * Set material prices where we sell them
   * 
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings 
   */
  SET_SELL_MATERIALS(state, { data, settingsWithItem }: { data: ResponseModel[], settingsWithItem: SettingsWithItem}) {
    const itemName = settingsWithItem.currentItemInfo.name;
    const location = settingsWithItem.settings.cities.sellMaterials;

    Vue.set(state.materials[location], itemName, data);
  },

  /**
   * Set material prices where we buy them
   * 
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings 
   */
  SET_BUY_MATERIALS(state, { data, settingsWithItem }: { data: ResponseModel[], settingsWithItem: SettingsWithItem}) {
    const itemName = settingsWithItem.currentItemInfo.name;
    const location = settingsWithItem.settings.cities.buyMaterials;

    Vue.set(state.materials[location], itemName, data);
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