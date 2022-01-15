import axios from 'axios';
import { ActionTree } from 'vuex'
import { isObjectEmpty } from '../utils';
import { ConsumableItem } from './models';
import { FoodAndPotionsState, LoadingStatus, SettingsWithItemTiers } from './typeDefs'

const baseUrl = process.env.BASE_URL;

export const actions: ActionTree<FoodAndPotionsState, {}> = {
  /**
   * Check all prices of items, resources, artefactsa and journals
   * If there are no prices, then download them
   * 
   * @param data - selected item info
   */
  async CHECK_ALL({ commit, dispatch, state, getters }, currentItemTiers: string[]) {
    // set current item info
    if (currentItemTiers) {
      commit('SET_CURRENT_ITEM_TIERS', currentItemTiers);
    }

    // Don't send a requests if some one is already in progress
    // Send a requests if we need to load the next item since itemInfo was modified to the end of the previous request
    if (!(state.features.loadingStatus == LoadingStatus.CALCULATED ||
      state.features.loadingStatus === LoadingStatus.SOMETHING_CHANGED)) {
      return;
    }

    const settings = state.settings;
    const settingsWithItemTiers: SettingsWithItemTiers = {
      currentItemTiers,
      settings
    }

    if (isObjectEmpty(getters.getItems)) {
      await dispatch('FETCH_ITEM_PRICES', settingsWithItemTiers);
    }

    if (isObjectEmpty(getters.getResources)) {
      await dispatch('FETCH_RESOURCE_PRICES', settingsWithItemTiers);
    }

    if (!currentItemTiers) {
      return;
    }

    /**
     * Send a request if something is changed
     */
    const currentItemChanged = state.currentItemTiers?.some((item, index) => item !== currentItemTiers[index]);
    const settingsChanged = state.settings != settings;

    if (currentItemChanged || settingsChanged) {
      commit('SET_LOADING_STATUS', LoadingStatus.SOMETHING_CHANGED);

      dispatch('CHECK_ALL');
    } else {
      commit('SET_LOADING_STATUS', LoadingStatus.CALCULATED);
    }
  },

  async LOAD_FOOD_AND_POTIONS_TREE_ITEMS({ commit }) {
    const { data }: {data: ConsumableItem[]} = await axios.get('jsonAutomatic/foodAndPotionsTreeItems.json');

    data.sort((item1, item2) => item1['@uniquename'] > item2['@uniquename'] ? 1 : 
      item1['@uniquename'] < item2['@uniquename'] ? -1 : 0
    );

    commit('SET_FIELD', {
      fieldName: 'foodAndPotionsTreeItems',
      fieldValue: data,
    });
  },

  /**
   * Fetch item prices
   * 
   * @param commit - vuex commit
   * @param state - vuex state
   * @param settingsWithItemTiers - сonvenient item data and settings
   */
  async FETCH_ITEM_PRICES({ commit, getters }, settingsWithItemTiers: SettingsWithItemTiers) {
    commit('SET_LOADING_STATUS', 'items');

    const allNames = getters.getItemNamesWithSubtiers();
    const location = settingsWithItemTiers.settings.cities.sellItems;

    await axios
      .get(`${baseUrl}data?items=${allNames}&locations=${location}&qualities=1`)
      .then(response => {
        const data = response.data;

        commit('SET_ITEM_PRICES', { data, settingsWithItemTiers });
      });
  },

  /**
   * Fetch resource prices
   * 
   * @param commit - vuex commit
   * @param state - vuex state
   * @param settingsWithItemTiers - сonvenient item data and settings
   */
   async FETCH_RESOURCE_PRICES({ commit, getters }, settingsWithItemTiers: SettingsWithItemTiers) {
    commit('SET_LOADING_STATUS', 'resources');

    const allNames = getters.getResourcesNeeded;
    const location = settingsWithItemTiers.settings.cities.buyResources;

    await axios
      .get(`${baseUrl}data?items=${allNames}&locations=${location}&qualities=1`)
      .then(response => {
        const data = response.data;

        commit('SET_RESOURCE_PRICES', { data, settingsWithItemTiers });
      });
  },
}