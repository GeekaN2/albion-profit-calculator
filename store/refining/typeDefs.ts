/**
 * Vuex root state
 */
export interface RefiningState {
  rawResources: Prices;
  materials: Prices;
  settings: Settings;
  currentItemInfo: ItemInfo;
  features: Features;
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
 * Refining settings
 */
export interface Settings {
  useFocus: boolean;
  fee: number;
  useOwnPercentage: boolean;
  returnPercentage: number;
  useMultipleCities: boolean;
  cities: {
    sellMaterials: string;
    refiningResources: string;
    buyRawResources: string;
    buyMaterials: string;
  }
}

/**
 * Possible cities to update them in settings
 */
export interface OneOfCitiesProp {
  sellMaterials?: string;
  refiningResources?: string;
  buyRawResources?: string;
  buyMaterials?: string;
}

/**
 * Information about the selected item
 */
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

/**
 * Various features
 */
export interface Features {
  loadingText: 'calculated' | 'something changed';
}
