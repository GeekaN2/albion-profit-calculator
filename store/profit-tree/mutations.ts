import { MutationTree } from 'vuex'
import { normalizedPriceAndDate } from '../utils'
import { ResponseModel, TreeState, Item, Settings, ItemInfo, JournalsItem } from '../typeDefs'
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
      loadingText: ''
    };
    state.settings = {
      useJournals: false,
      useFocus: false,
      craftFee: 10,
      cities: {
        items: "Caerleon",
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
   */
  SET_ITEM_PRICES(state, data) {
    const itemName = state.currentItemInfo.name;
    const location = state.settings.cities.items;
    let newPrices: {[key: string]: Item} = {};

    data.forEach((item: ResponseModel) => {
      if (!newPrices[item.item_id]) {
        newPrices[item.item_id] = {
          price: 0,
          date: '',
          marketFee: 3
        };
      }
      
      const currentPrice = newPrices[item.item_id];

      let newPrice: Item = normalizedPriceAndDate(item);

      newPrice = newPrice.price >= currentPrice.price ? newPrice : currentPrice;
      newPrices[item.item_id] = newPrice;
    });

    Vue.set(state.prices[location], itemName, newPrices);
  },

  /**
   * Set resource prices to state
   * 
   * @param state - vuex state
   * @param data - api response
   */
  SET_RESOURCE_PRICES(state, data) {
    const city = state.settings.cities.resources;
    let newPrices: {[key: string]: Item} = {};

    data.forEach((resource: ResponseModel) => {
      newPrices[resource.item_id] = {
        price: resource.sell_price_min,
        date: resource.sell_price_min_date
      }
    });

    Vue.set(state.resources, city, newPrices);
  },

  /**
   * Set artefact prices for current location and item
   * 
   * @param state - vuex state
   * @param data - api response
   */
  SET_ARTEFACT_PRICES(state, data) {
    const itemName = state.currentItemInfo.name;
    const city = state.settings.cities.artefacts;
    let newPrices: {[key: string]: Item} = {};

    data.forEach((artefact: ResponseModel) => {
      newPrices[artefact.item_id] = {
        price: artefact.sell_price_min,
        date: artefact.sell_price_min_date
      }
    });

    Vue.set(state.artefacts[city], itemName, newPrices);
  },

  /**
   * Set prices of full and empty journals
   * 
   * @param state - vuex state
   * @param data - api response
   */
  SET_JOURNAL_PRICES(state, data) {
    const city = state.settings.cities.journals;
    const root = state.currentItemInfo.root;
    const newPrices: {[key: string]: JournalsItem } = {};
    
    data.forEach((journal: ResponseModel) => {
      const journalName = journal.item_id.slice(0, journal.item_id.lastIndexOf('_'));

      if (!newPrices[journalName]) {
        newPrices[journalName] = {
          buyPrice: 0,
          sellPrice: 0,
          date: '',
          marketFee: 4.5
        }
      }

      if (journal.item_id.slice(-5) == 'EMPTY') {
        newPrices[journalName].buyPrice = journal.sell_price_min;
        newPrices[journalName].date = journal.sell_price_min_date;
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
   * Set cities
   */
  SET_CITIES(state, cities: Settings["cities"]) {
    state.settings.cities = cities;
  },

  /**
   * Set loading text
   * 
   * @param state 
   * @param loadingText 
   */
  SET_LOADING_TEXT(state, loadingText: string) {
    state.features.loadingText = loadingText;
  },

  SET_ITEM_INFO(state, itemInfo: ItemInfo){
    state.currentItemInfo = itemInfo;
  },

  UPDATE_USE_FOCUS(state, useFocus: boolean) {
    state.settings.useFocus = useFocus;
  },

  UPDATE_USE_JOURNALS(state, useJournals: boolean) {
    state.settings.useJournals = useJournals;
  },

  UPDATE_CRAFT_FEE(state, craftFee: number) {
    state.settings.craftFee = craftFee;
  }
}