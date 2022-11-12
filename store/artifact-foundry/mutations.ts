import { MutationTree } from 'vuex'
import { AlbionCities, ArtifactFoundryState, AverageDataForItem, BranchCells, ExtendedCell, ItemGroup, ItemInfo, LoadingStatus, Settings, SettingsWithItem } from './typeDefs'
import Vue from 'vue';
import { ResponseModel } from '../typeDefs';
import cloneDeep from 'lodash.clonedeep';

const cities = {
  'Caerleon': [],
  'Bridgewatch': [],
  'Fort Sterling': [],
  'Lymhurst': [],
  'Martlock': [],
  'Thetford': [],
}

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

  SET_EXTENDED_CELL(state, { branch, tier }: ExtendedCell) {
    Vue.set(state, 'extendedCell', {
      branch,
      tier
    });
  },

  SET_ARTIFACT_PRICE(state, { itemId, price, locationAction }: { itemId: string, price: number, locationAction: 'sell' | 'buy' }) {
    const city = locationAction === 'sell' ? state.settings.cities.sellArtifacts : state.settings.cities.buyArtifacts;
    const artifact = state.artifacts[city].find((artifact) => artifact.itemId === itemId);

    if (artifact) {
      artifact.sellPriceMin = price;
    }
  },

  SET_SORTED_CELL_ARTIFACTS(state, items: ResponseModel[]) {
    Vue.set(state.artifacts, state.settings.cities.sellArtifacts, items);
  },


  UPDATE_ITEM_BY_ITEM_NAME(state, {
    itemName,
    item,
    itemGroup,
  }: {
    itemName: string;
    item: ResponseModel,
    itemGroup: ItemGroup
  }) {
    const cities = state.settings.cities;
    let city = cities[itemGroup];

    let items: ResponseModel[] = [];

    switch (itemGroup) {
      case 'buyArtifacts':
      case 'sellArtifacts':
        items = state.artifacts[city]; break;
      case 'buyFragments':
      case 'sellFragments':
        items = state.fragments[city]; break;
    }

    const storeItemIndex = items.findIndex((item) => item.itemId === itemName);

    if (storeItemIndex != -1) {
      Vue.set(items, storeItemIndex, item);
    }
  },

  UPDATE_USE_MULTIPLE_CITIES(state, useMultipleCities: boolean) {
    state.settings.useMultipleCities = useMultipleCities;
  },

  SET_CITIES(state, prop: {  [key in keyof Settings['cities']]?: AlbionCities }) {
    Object.assign(state.settings.cities, prop);
  },

  DROP_FRAGMENTS(state) {
    state.fragments = cloneDeep(cities);
  },

  DROP_ARTIFACTS(state) {
    state.artifacts = cloneDeep(cities);
  },
}