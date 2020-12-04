import { MutationTree } from 'vuex'
import { normalizedPriceAndDate, normalizeItem } from '../utils'
import { TransportationsState, Item } from './typeDefs'
import Vue from 'vue';

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
      useHeuristicSort: false
    }
  },

  /**
   * Remove old items and add new ones
   * 
   * @param state - vuex state
   * @param data - items to add
   */
  UPDATE_ITEMS_DATA(state, data: Item[]) {
    state.items = [];
    
    data.forEach(item => {
      state.items.push(item);
    });
  },

  /**
   * Add items after old items
   * 
   * @param state - vuex state
   * @param data - items to add
   */
  ADD_ITEMS_DATA(state, data: Item[]) {
    data.forEach(item => {
      state.items.push(item);
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
   * @param useHeuristicSort - use a heuristic algorithm to sort items or not
   */
  USE_HEURISTIC_SORT(state, useHeuristicSort: boolean) {
    state.settings.useHeuristicSort = useHeuristicSort;
  }
}