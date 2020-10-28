import { GetterTree } from 'vuex'
import { TreeState } from '../typeDefs'
import { isArtifactItem } from '../utils'

export const getters: GetterTree<TreeState, {}> = {
  /**
   * Get t4-t8 item prices
   * 
   * @param state - vuex state
   */
  getItems: (state: TreeState) => {
    const itemName = state.currentItemInfo.name;
    const city = state.settings.cities.sellItems;
    let prices = state.prices[city][itemName] || {};

    return prices;
  },
}