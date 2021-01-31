/**
 * Main item model
 */
export interface Item {
  itemId: string;
  locationFrom: string;
  locationTo: string;
  priceFrom: number;
  priceTo: number;
  dateFrom: Date;
  dateTo: Date;
  marketFee: number;
  qualityFrom: number;
  qualityTo: number;
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
 * Vuex root state
 */
export interface TransportationsState {
  items: Item[];
  settings: Settings;
}

/**
 * Tree settings
 */
export interface Settings {
  locationFrom: string;
  locationTo: string;
  skip: number;
  useHeuristicSort: boolean;
}