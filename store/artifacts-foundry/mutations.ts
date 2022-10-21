import { MutationTree } from 'vuex'
import { ArtifactsFoundryState, AverageDataForItem, ItemInfo, LoadingStatus, Settings, SettingsWithItem } from './typeDefs'
import Vue from 'vue';
import { ResponseModel } from '../typeDefs';

export const mutations: MutationTree<ArtifactsFoundryState> = {
  SET_FIELD(state: ArtifactsFoundryState, { fieldName, fieldValue }: {
    fieldName: keyof ArtifactsFoundryState,
    fieldValue: any
  }): void {
    state[fieldName] = fieldValue;
  },

  /**
   * Set loading text
   * 
   * @param state - vuex state
   * @param loadingStatus - progress of the loading
   */
  SET_LOADING_STATUS(state, loadingStatus: LoadingStatus) {
    state.features.loadingStatus = loadingStatus;
  },

  SET_ITEM_INFO(state, itemInfo: ItemInfo) {
    state.currentItemInfo = itemInfo;
  },

  SET_BUY_ARTIFACT_PRICES(state, { data, settingsWithItem }: { data: ResponseModel[]; settingsWithItem: SettingsWithItem }) {
    const location = settingsWithItem.settings.cities.buyArtifacts;
    const sortedData = data.sort(({ itemId: itemId1 }, { itemId: itemId2 }) =>
      itemId1 > itemId2 ? 1 : itemId1 < itemId2 ? -1 : 0
    );

    Vue.set(state.artifacts, location, sortedData);
  },

  SET_SELL_ARTIFACT_PRICES(state, { data, settingsWithItem }: { data: ResponseModel[]; settingsWithItem: SettingsWithItem }) {
    const location = settingsWithItem.settings.cities.sellArtifacts;
    const sortedData = data.sort(({ itemId: itemId1 }, { itemId: itemId2 }) =>
      itemId1 > itemId2 ? 1 : itemId1 < itemId2 ? -1 : 0
    );

    Vue.set(state.artifacts, location, sortedData);
  },

  SET_BUY_FRAGMENT_PRICES(state, { data, settingsWithItem }: { data: ResponseModel[]; settingsWithItem: SettingsWithItem }) {
    const location = settingsWithItem.settings.cities.buyFragments;
    const sortedData = data.sort(({ itemId: itemId1 }, { itemId: itemId2 }) =>
      itemId1 > itemId2 ? 1 : itemId1 < itemId2 ? -1 : 0
    );

    Vue.set(state.fragments, location, sortedData);
  },

  SET_SELL_FRAGMENT_PRICES(state, { data, settingsWithItem }: { data: ResponseModel[]; settingsWithItem: SettingsWithItem }) {
    const location = settingsWithItem.settings.cities.sellFragments;
    const sortedData = data.sort(({ itemId: itemId1 }, { itemId: itemId2 }) =>
      itemId1 > itemId2 ? 1 : itemId1 < itemId2 ? -1 : 0
    );

    Vue.set(state.fragments, location, sortedData);
  },
}