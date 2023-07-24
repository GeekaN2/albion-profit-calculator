/**
 * Vuex root state
 */
export interface TransportationsState {
  transportations: Transportation[];
  settings: Settings;
  features: Features;
}

export interface Features {
  transportationsStatus: 'initial' | 'loading' | 'success' | 'error';
}

/**
 * Main item model
 */
export interface Item {
  itemId: string;
  location: number;
  averageItems: number;
  averagePrice: number;
  buyPriceMax: number;
  buyPriceMaxDate: string;
  date: string;
  marketFee: number;
  normalizedPrice: number;
  quality: number;
  sellPriceMin: number;
  sellPriceMinDate: string;
}

export interface Transportation {
  from: Item;
  to: Item;
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
 * Tree settings
 */
export interface Settings {
  locationFrom: string;
  locationTo: string;
  skip: number;
  backendSorting: BackendSorting[];
}

export enum BackendSorting {
  BY_PERCENTAGE_PROFIT = 'BY_PERCENTAGE_PROFIT',
  BY_PROFIT = 'BY_PROFIT',
  BY_LAST_TIME_CHECKED = 'BY_LAST_TIME_CHECKED', 
  // BY_MOUNT_PROFIT = 'BY_MOUNT_PROFIT', 
  BY_PROFIT_VOLUME = 'BY_PROFIT_VOLUME'
}