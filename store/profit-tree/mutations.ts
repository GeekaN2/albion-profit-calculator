import {MutationTree} from 'vuex'
import {normalizedPriceAndDate} from '../utils'
import {ResponseModel, RootState, Item} from '../typeDefs'

export const mutations: MutationTree<RootState> = {
  /**
   * Set json files data into state
   */
  SET_STATE(state, { tree, recipes }) {
    state.tree = tree;
    state.recipes = recipes;
  },

  /**
   * 
   * @param state - vuex state
   * @param baseItem - t4 item of the section: T4_SHOES_PLATE_SET1 etc.
   * @param location - selected city
   * @param data - api response
   */
  SET_ITEM_PRICE(state, { baseItem, location, data }) {

    if (!state.prices[baseItem]) {
      state.prices[baseItem] = {};
    }
    state.prices[baseItem][location] = {};

    data.forEach((item: ResponseModel) => {
      if (!state.prices[baseItem][location][item.item_id]) {
        state.prices[baseItem][location][item.item_id] = {
          price: 0,
          date: '',
          marketFee: 3
        };
      }

      const currentPrice = state.prices[baseItem][location][item.item_id];
      let newPrice: Item = normalizedPriceAndDate(item);
      newPrice = newPrice.price >= currentPrice.price ? newPrice : currentPrice;
      state.prices[baseItem][location][item.item_id] = newPrice;
    });
  },

  /**
   * Set resource prices to state
   * @param state - vuex state
   * @param data - api response
   */
  SET_RESOURCE_PRICES(state, data) {
    data.forEach((resource: ResponseModel) => {
      state.resources[resource.city][resource.item_id] = {
        price: resource.sell_price_min,
        date: resource.sell_price_min_date
      }
    })
  },

  /**
   * Set artefact prices for current location and item
   * @param state - vuex state
   * @param data - api response
   * @param itemName - t4 item name: T4_SHOES_PLATE_SET1 etc.
   */
  SET_ARTEFACT_PRICES(state, { data, itemName }) {
    data.forEach((artefact: ResponseModel) => {
      if (!state.artefacts[artefact.city][itemName]) {
        state.artefacts[artefact.city][itemName] = {};
      }

      state.artefacts[artefact.city][itemName][artefact.item_id] = {
        price: artefact.sell_price_min,
        date: artefact.sell_price_min_date
      }
    })
  },

  /**
   * 
   * @param state 
   * @param data - api response
   * @param root - journal branch: 'ROOT_WARRIOR' etc. 
   */
  SET_JOURNAL_PRICES(state, { data, root }) {
    data.forEach((journal: ResponseModel) => {
      const journalName = journal.item_id.slice(0, journal.item_id.lastIndexOf('_'));

      if (!state.journals[journal.city][root]) {
        state.journals[journal.city][root] = {};
      }

      if (!state.journals[journal.city][root][journalName]) {
        state.journals[journal.city][root][journalName] = {
          buyPrice: 0,
          sellPrice: 0,
          date: '',
          marketFee: 4.5
        }
      }

      if (journal.item_id.slice(-5) == 'EMPTY') {
        state.journals[journal.city][root][journalName].buyPrice = journal.sell_price_min;
        state.journals[journal.city][root][journalName].date = journal.sell_price_min_date;
      } else {
        const normalizedJournal = normalizedPriceAndDate(journal);
        state.journals[journal.city][root][journalName].sellPrice = normalizedJournal.price;
        state.journals[journal.city][root][journalName].date = normalizedJournal.date;
        state.journals[journal.city][root][journalName].marketFee = normalizedJournal.marketFee;
      }
    })
  }
}