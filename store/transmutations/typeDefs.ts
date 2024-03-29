/**
 * Vuex root state
 */
export interface TransmutationsState {
  prices: Prices;
  settings: Settings;
  currentItemInfo: ItemInfo;
  features: Features;
}

/**
 * Main item model
 */
export interface Item {
  price: number;
  date: string;
  marketFee?: number;
  quality?: number;
}

/**
 * city -> base_item_name -> array of prices
 */
export interface Prices {
  [key: string]: {
    [key: string]: ResponseModel[]
  }
}

/**
 * Response model for albion data api
 */
export interface ResponseModel {
  itemId: string;
  location: string;
  quality: number;
  buyPriceMax: number;
  buyPriceMaxDate: string;
  sellPriceMin: number;
  sellPriceMinDate: string;
}

/**
 * Transmutation settings
 */
export interface Settings {
  gameItemFee: number;
  lastGlobalDiscount: number;
  isCalibrated: boolean;
  fee: number;
  showTransmutationWays: boolean;
  cities: {
    sellResourcesLocation: string;
    buyResourcesLocation: string;
  }
}

export interface ItemInfo {
  name: string;
}

/**
 * Combined settings and info about item
 * For convenience in actions and mutations
 */
export interface SettingsWithItem {
  currentItemInfo: ItemInfo;
  settings: Settings;
}

export interface Features {
  loadingText: string;
}
