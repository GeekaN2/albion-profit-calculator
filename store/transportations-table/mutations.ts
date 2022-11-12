import { MutationTree } from 'vuex'
import { TransportationsState, Item, Transportation, BackendSorting } from './typeDefs'

export const mutations: MutationTree<TransportationsState> = {
  /**
   * Set json files data into state
   * 
   * @param state - vuex state
   * @param tree - tree structure of items
   * @param recipes - recipes of all items
   */
  SET_STATE(state) {
    state.settings = {
      locationFrom: 'Lymhurst',
      locationTo: 'Black Market',
      skip: 0,
      backendSorting: [BackendSorting.BY_LAST_TIME_CHECKED, BackendSorting.BY_PERCENTAGE_PROFIT],
    }
  },

  /**
   * Remove old items and add new ones
   * 
   * @param state - vuex state
   * @param data - items to add
   */
  UPDATE_ITEMS_DATA(state, data: Transportation[]) {
    state.transportations = [];
    
    data.forEach(transportation => {
      state.transportations.push(transportation);
    });
  },

  /**
   * Add items after old items
   * 
   * @param state - vuex state
   * @param data - items to add
   */
  ADD_ITEMS_DATA(state, data: Transportation[]) {
    data.forEach(transportation => {
      state.transportations.push(transportation);
    });
  },

  /**
   * Update locations
   * 
   * @param state vuex state
   * @param locations - 
   */
  UPDATE_LOCATION(state, locations: { locationFrom: string, locationTo: string }) {
    state.settings.locationFrom = locations.locationFrom;
    state.settings.locationTo = locations.locationTo;
  },

  /**
   * Update skip param
   * 
   * @param state - vuex state
   * @param newSkip - new value of skip setting
   */
  UPDATE_SKIP(state, newSkip: number) {
    state.settings.skip = newSkip;
  },

  /**
   * Use heuristic sort
   * 
   * @param state - vuex state
   * @param backendSorting - used backend sortings
   */
  UDPATE_BACKEND_SORTING(state, backendSorting: BackendSorting[]) {
    state.settings.backendSorting = backendSorting;
  },

  UPDATE_ITEM_PRICE(state, { itemId, direction, price }: { itemId: string; direction: 'from' | 'to', price: number}) {
    const item = state.transportations.find(item => item[direction].itemId === itemId);

    if (item) {
      item[direction].sellPriceMin = price;
    }
  }
}