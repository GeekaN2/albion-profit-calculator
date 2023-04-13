import { GetterTree } from 'vuex'
import { FeaturesState } from './typeDefs'
import { RootState } from '../typeDefs';

export const getters: GetterTree<FeaturesState, RootState> = {
  /**
   * Get t4-t8 raw resource prices
   * 
   * @param state - vuex state
   */
  allServices: (state: FeaturesState) => {
    return  state.servers;;
  },
}