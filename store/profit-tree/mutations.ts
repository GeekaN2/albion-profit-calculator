import { MutationTree } from 'vuex'
import { normalizeItemsByMaxPriceFromMinPrices, getHeartNameByCity } from '../utils'
import { 
  ResponseModel, 
  TreeState, 
  Item, 
  ItemInfo, 
  AverageDataResponse, 
  AverageDataForItem, 
  SettingsWithItem, 
  Resources, 
  OneOfCitiesProp 
} from './typeDefs'
import Vue from 'vue';
import clonedeep from 'lodash.clonedeep';

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
      useMultipleCities: false,
      showAverageItems: false,
      useAveragePrice: false,
      useExpertMode: false,
      returnPercentage: 15.2,
      craftFee: 500,
      cities: {
        sellItems: "Caerleon",
        craftItems: "Caerleon",
        resourcesFirstLocation: "Caerleon",
        resourcesSecondLocation: 'Caerleon',
        artefacts: "Caerleon",
        journals: "Caerleon",
        hearts: "Caerleon",
      },
      expert: {
        useOwnPercentage: false,
        useMinPricesNormalization: false,
        qualities: [1, 2, 3]
      }
    };
    state.settingsBackup = clonedeep(state.settings);
    state.currentItemInfo = {
      name: '',
      parent: '',
      root: '',
      artefactLevel: ''
    }
  },

  /**
   * Set item prices to state
   * 
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings 
   */
  SET_ITEM_PRICES(state, { data, settingsWithItem }:  { data: ResponseModel[]; settingsWithItem: SettingsWithItem }) {
    const itemName = settingsWithItem.currentItemInfo.name;
    const location = settingsWithItem.settings.cities.sellItems;

    Vue.set(state.prices[location], itemName, data);
  },

  /**
   * Set resource prices to state
   * 
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings 
   */
  SET_RESOURCE_PRICES(state, { data, settingsWithItem }:  { data: ResponseModel[]; settingsWithItem: SettingsWithItem }) {
    let newPrices: Resources = {};

    data.forEach((resource: ResponseModel) => {
      if (!newPrices[resource.location]) {
        newPrices[resource.location] = {};
      }
      
      newPrices[resource.location][resource.itemId] = {
        price: resource.sellPriceMin,
        date: resource.sellPriceMinDate
      }
    });

    for (let newPricesCity in newPrices) {
      Vue.set(state.resources, newPricesCity, newPrices[newPricesCity]);
    }
  },

  /**
   * Set artefact prices for current location and item
   * 
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings 
   */
  SET_ARTEFACT_PRICES(state, { data, settingsWithItem }: { data: ResponseModel[]; settingsWithItem: SettingsWithItem }) {
    const itemName = settingsWithItem.currentItemInfo.name;
    const city = settingsWithItem.settings.cities.artefacts;
    let newPrices: { [key: string]: Item } = {};

    data.forEach((artefact: ResponseModel) => {
      newPrices[artefact.itemId] = {
        price: artefact.sellPriceMin,
        date: artefact.sellPriceMinDate
      }
    });

    Vue.set(state.artefacts[city], itemName, newPrices);
  },

  /**
   * Set prices of full and empty journals
   * 
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings 
   */
  SET_JOURNAL_PRICES(state, { data, settingsWithItem }: { data: ResponseModel[]; settingsWithItem: SettingsWithItem }) {
    const city = settingsWithItem.settings.cities.journals;
    const root = settingsWithItem.currentItemInfo.root;

    const journals = normalizeItemsByMaxPriceFromMinPrices(data);

    Vue.set(state.journals[city], root, journals);
  },

  SET_HEARTS_PRICES(state, { data, settingsWithItem }: { data: ResponseModel[]; settingsWithItem: SettingsWithItem }) {
    const city = settingsWithItem.settings.cities.hearts;
    let newPrices: { [key: string]: Item } = {};

    data.forEach((artefact: ResponseModel) => {
      newPrices[artefact.itemId] = {
        price: artefact.sellPriceMin,
        date: artefact.sellPriceMinDate
      }
    });

    Vue.set(state.hearts, city, newPrices);
  },

  /**
   * Set average data for items
   * 
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings 
   */
  SET_AVERAGE_DATA(state, { data, settingsWithItem }: { data: AverageDataResponse[], settingsWithItem: SettingsWithItem }) {
    const city = settingsWithItem.settings.cities.sellItems;
    const itemName = settingsWithItem.currentItemInfo.name;
    const newData: { [key: string]: AverageDataForItem } = {};
    const zeroDate = (new Date(0)).toISOString().slice(0,-5);

    data.forEach((averageData: AverageDataResponse) => {
      if (!newData[averageData.itemName]) {
        newData[averageData.itemName] = {
          averageItems: 0,
          averagePrice: 0,
          firstCheckDate: zeroDate,
          lastCheckDate: zeroDate 
        };
      }

      newData[averageData.itemName] = {
        averageItems: averageData.averageItems,
        averagePrice: averageData.averagePrice,
        firstCheckDate: averageData.firstCheckDate,
        lastCheckDate: averageData.lastCheckDate
      }
    });

    Vue.set(state.averageData[city], itemName, newData);
  },

  /**
   * Set cities
   * 
   * @param state - vuex state
   */
  SET_CITIES(state, prop: OneOfCitiesProp) {
    Object.assign(state.settings.cities, prop);
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
   * Set item info
   * 
   * @param state - vuex state
   * @param itemInfo 
   */
  SET_ITEM_INFO(state, itemInfo: ItemInfo) {
    state.currentItemInfo = itemInfo;
  },

  /**
   * Update useFocus setting
   * 
   * @param state - vuex state
   * @param useJournals - use journals or not
   */
  UPDATE_USE_JOURNALS(state, useJournals: boolean) {
    state.settings.useJournals = useJournals;
  },

  /**
   * Update useFocus setting
   * 
   * @param state - vuex state
   * @param useFocus - use focus or not
   */
  UPDATE_USE_FOCUS(state, useFocus: boolean) {
    state.settings.useFocus = useFocus;
  },

  /**
   * Update useMultipleCities settings
   * 
   * @param state - vuex state
   * @param useMultipleCities - use multiple cities or not
   */
  UPDATE_USE_MULTIPLE_CITIES(state, useMultipleCities: boolean) {
    state.settings.useMultipleCities = useMultipleCities;
  },

  /**
   * Update showAverageItem setting
   * 
   * @param state - vuex state
   * @param showAverageItems - show average data about items or not
   */
  UPDATE_SHOW_AVERAGE_ITEMS(state, showAverageItems: boolean) {
    state.settings.showAverageItems = showAverageItems;
  },

  /**
   * Update showAveragePrice setting
   * 
   * @param state - vuex state
   * @param showAveragePrice - show average data about items or not
   */
  UPDATE_USE_AVERAGE_PRICE(state, useAveragePrice: boolean) {
    state.settings.useAveragePrice = useAveragePrice;
  },

  /**
   * Update craftFee value
   * 
   * @param state - vuex state
   * @param craftFee - update craft fee value
   */
  UPDATE_CRAFT_FEE(state, craftFee: number) {
    state.settings.craftFee = craftFee;
  },

  /**
   * Update setting use expert mode
   * 
   * @param state - vuex state
   * @param useExpertMode - use expert mode or not
   */
  UPDATE_USE_EXPERT_MODE(state, useExpertMode: boolean) {
    state.settings.useExpertMode = useExpertMode;
  },

  /**
   * Update setting use own perentage
   * 
   * @param state - vuex state
   * @param useOwnPercentage - use own return percentage or not
   */
  UPDATE_USE_OWN_PERCENTAGE(state, useOwnPercentage: boolean) {
    state.settings.expert.useOwnPercentage = useOwnPercentage;
  },

  /**
   * Update own return percentage
   * 
   * @param state - vuex state
   * @param returnPercentage - number in percents
   */
  UPDATE_OWN_RETURN_PECENTAGE(state, returnPercentage: number): void {
    state.settings.returnPercentage = returnPercentage;
  },

   /**
   * Set user's price to state
   * 
   * @param state - vuex state
   * @param itemName - name of item
   * @param price - price to update
   */
  UPDATE_FIRST_RESOURCE_ITEM(state, {itemName, price}: {itemName: string, price: number}): void  {
    const location = state.settings.cities.resourcesFirstLocation;

    state.resources[location][itemName].price = price;
  },

  /**
   * Set user's price to state
   * 
   * @param state - vuex state
   * @param itemName - name of item
   * @param price - price to update
   */
  UPDATE_SECOND_RESOURCE_ITEM(state, {itemName, price}: {itemName: string, price: number}): void  {
    const location = state.settings.cities.resourcesSecondLocation;

    state.resources[location][itemName].price = price;
  },

  /**
   * Set user's price to state
   * 
   * @param state - vuex state
   * @param itemName - name of item
   * @param price - price to update
   */
  UPDATE_ARTIFACT(state, {itemName, price}: {itemName: string, price: number}): void  {
    const location = state.settings.cities.artefacts;
    const baseItemName = state.currentItemInfo.name;

    state.artefacts[location][baseItemName][itemName].price = price;
  },

  /**
   * Set users' price to state
   * 
   * @param state - vuex state
   * @param itemName - full name of journal
   * @param price - price to update
   */
  UPDATE_JOURNAL(state, {itemName, price}: {itemName: string, price: number}): void {
    const city = state.settings.cities.journals;
    const root = state.currentItemInfo.root;
    
    state.journals[city][root][itemName].price = price;
  },

  /**
   * Update heart price
   * 
   * @param state - vuex state
   * @param itemName - name of heart
   * @param price - price to update
   */
  UPDATE_HEARTS(state, {itemName, price}: {itemName: string, price: number}): void {
    const city = state.settings.cities.hearts;
    
    state.hearts[city][itemName].price = price;
  },

  /**
   * Change setting to use other normalization or not
   * 
   * @param state - vuex state
   * @param useMinPricesNormalization - use or not
   */
  UPDATE_USE_MIN_PRICES_NORMALIZATION(state, useMinPricesNormalization: boolean): void {
    state.settings.expert.useMinPricesNormalization = useMinPricesNormalization;
  },

  /**
   * Update needed item qualities
   * 
   * @param state - vuex state
   * @param qualities - array of qualities
   */
  UPDATE_QUALITIES(state, qualities: Number[]): void {
    state.settings.expert.qualities = qualities;
  },

  /**
   * Set user settings from the db
   * 
   * @param state - vuex state
   * @param settings - saved user settings
   */
  SET_USER_SETTINGS(state, settings): void {
    const oldSettings = clonedeep(state.settings);

    Object.assign(state.settings, settings);

    // the simplest deep merge
    state.settings.cities = oldSettings.cities;
    Object.assign(state.settings.cities, settings.cities);
    
    state.settingsBackup = clonedeep(state.settings);
  },

  /**
   * Reset settings to user default settings
   * 
   * @param state - vuex state
   */
  RESET_SETTINGS(state): void {
    state.settings = clonedeep(state.settingsBackup);
  }
}