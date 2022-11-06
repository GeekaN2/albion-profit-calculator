import { MutationTree } from 'vuex'
import { ArtifactFoundryState, AverageDataForItem, BranchCells, ExtendedCell, ItemInfo, LoadingStatus, Settings, SettingsWithItem } from './typeDefs'
import Vue from 'vue';
import { ResponseModel } from '../typeDefs';

export const mutations: MutationTree<ArtifactFoundryState> = {
  SET_FIELD(state: ArtifactFoundryState, { fieldName, fieldValue }: {
    fieldName: keyof ArtifactFoundryState,
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
    state.currentFragmentType = itemInfo;
  },

  SET_BUY_ARTIFACT_PRICES(state, { data, settingsWithItem }: { data: ResponseModel[]; settingsWithItem: SettingsWithItem }) {
    const location = settingsWithItem.settings.cities.buyArtifacts;
    const artifacts = state.artifacts[location];
    const sortedData = data.filter((newArtifactData) => artifacts.every((artifact) => newArtifactData.itemId !== artifact.itemId));

    Vue.set(state.artifacts, location, artifacts.concat(sortedData));
  },

  SET_SELL_ARTIFACT_PRICES(state, { data, settingsWithItem }: { data: ResponseModel[]; settingsWithItem: SettingsWithItem }) {
    const location = settingsWithItem.settings.cities.sellArtifacts;
    const artifacts = state.artifacts[location];
    const sortedData = data.filter((newArtifactData) => artifacts.every((artifact) => newArtifactData.itemId !== artifact.itemId));

    Vue.set(state.artifacts, location, artifacts.concat(sortedData));
  },

  SET_BUY_FRAGMENT_PRICES(state, { data, settingsWithItem }: { data: ResponseModel[]; settingsWithItem: SettingsWithItem }) {
    const location = settingsWithItem.settings.cities.buyFragments;
    const fragments = state.fragments[location];
    const sortedData = data.filter((newFragmentData) => fragments.every((fragment) => newFragmentData.itemId !== fragment.itemId));

    Vue.set(state.fragments, location, fragments.concat(sortedData));
  },

  SET_SELL_FRAGMENT_PRICES(state, { data, settingsWithItem }: { data: ResponseModel[]; settingsWithItem: SettingsWithItem }) {
    const location = settingsWithItem.settings.cities.sellFragments;
    const fragments = state.fragments[location];
    const sortedData = data.filter((newFragmentData) => fragments.every((fragment) => newFragmentData.itemId !== fragment.itemId));

    Vue.set(state.fragments, location, fragments.concat(sortedData));
  },

  SET_EXTENDED_CELL(state, { branch, tier}: ExtendedCell) {
    Vue.set(state, 'extendedCell', {
      branch,
      tier
    });
  },

  SET_ARTIFACT_PRICE(state, { itemId, price, locationAction }: { itemId: string, price: number, locationAction: 'sell' | 'buy'}) {
    const city = locationAction === 'sell' ? state.settings.cities.sellArtifacts : state.settings.cities.buyArtifacts;
    const artifact = state.artifacts[city].find((artifact) => artifact.itemId === itemId);

    if (artifact) {
      artifact.sellPriceMin = price;
    }
  },

  SET_SORTED_CELL_ARTIFACTS(state, items: ResponseModel[]) {
    Vue.set(state.artifacts, state.settings.cities.sellArtifacts, items);
  }
}