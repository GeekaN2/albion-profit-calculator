import { MutationTree } from 'vuex'
import { normalizedPriceAndDate } from '../utils'
import { ResponseModel, TreeState, Item, Settings, ItemInfo, JournalsItem, AverageDataResponse, AverageDataForItem, SettingsWithItem } from '../typeDefs'
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
        resources: "Caerleon",
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

  /**
   * Set item prices to state
   * 
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings 
   */
  SET_ITEM_PRICES(state, { data, settingsWithItem }) {
    const itemName = settingsWithItem.currentItemInfo.name;
    const location = settingsWithItem.settings.cities.sellItems;
    let newPrices: { [key: string]: Item } = {};

    data.forEach((item: ResponseModel) => {
      if (!newPrices[item.itemId]) {
        newPrices[item.itemId] = {
          price: 0,
          date: '',
          marketFee: 3
        };
      }

      const currentPrice = newPrices[item.itemId];

      let newPrice: Item = normalizedPriceAndDate(item);

      newPrice = newPrice.price >= currentPrice.price ? newPrice : currentPrice;
      newPrices[item.itemId] = newPrice;
    });

    Vue.set(state.prices[location], itemName, newPrices);
  },

  /**
   * Set resource prices to state
   * 
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings 
   */
  SET_RESOURCE_PRICES(state, { data, settingsWithItem }) {
    const city = settingsWithItem.settings.cities.resources;
    let newPrices: { [key: string]: Item } = {};

    data.forEach((resource: ResponseModel) => {
      newPrices[resource.itemId] = {
        price: resource.sellPriceMin,
        date: resource.sellPriceMinDate
      }
    });

    Vue.set(state.resources, city, newPrices);
  },

  /**
   * Set artefact prices for current location and item
   * 
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings 
   */
  SET_ARTEFACT_PRICES(state, { data, settingsWithItem }) {
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
  SET_JOURNAL_PRICES(state, { data, settingsWithItem }) {
    const city = settingsWithItem.settings.cities.journals;
    const root = settingsWithItem.currentItemInfo.root;
    const newPrices: { [key: string]: JournalsItem } = {};

    data.forEach((journal: ResponseModel) => {
      const journalName = journal.itemId.slice(0, journal.itemId.lastIndexOf('_'));

      if (!newPrices[journalName]) {
        newPrices[journalName] = {
          buyPrice: 0,
          sellPrice: 0,
          date: '',
          marketFee: 4.5
        }
      }

      if (journal.itemId.slice(-5) == 'EMPTY') {
        newPrices[journalName].buyPrice = journal.sellPriceMin;
        newPrices[journalName].date = journal.sellPriceMinDate;
      } else {
        const normalizedJournal = normalizedPriceAndDate(journal);

        newPrices[journalName].sellPrice = normalizedJournal.price;
        newPrices[journalName].date = normalizedJournal.date;
        newPrices[journalName].marketFee = normalizedJournal.marketFee;
      }
    });

    Vue.set(state.journals[city], root, newPrices);
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
  SET_CITIES(state, cities: Settings["cities"]) {
    state.settings.cities = cities;
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
   * @param useFocus - use focus or not
   */
  UPDATE_USE_FOCUS(state, useFocus: boolean) {
    state.settings.useFocus = useFocus;
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
  }
}