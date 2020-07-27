/**
 * Main item model
 */
export interface Item {
  price: number,
  date: string,
  marketFee?: number
}

/**
 * city -> all_item_prices
 */
export interface Prices {
  [key: string]: {
    [key: string]: {
      [key: string]: Item
    }
  }
}

/**
 * Response model for albion data api
 */
export interface ResponseModel {
  buy_price_max: number
  buy_price_max_date: string
  buy_price_min: number
  buy_price_min_date: string
  city: string
  item_id: string
  quality: number
  sell_price_max: number
  sell_price_max_date: string
  sell_price_min: number
  sell_price_min_date: string
}

/**
 * Vuex root state
 */
export interface TreeState {
  tree: any;
  prices: Prices
  recipes: Recipes;
  settings: Settings;
  features: Features;
  currentItemInfo: ItemInfo;
  resources: Resources;
  artefacts: Artefacts;
  journals: Journals;
}

/**
 * city -> all_resources
 */
export interface Resources {
  [key: string]: {
    [key: string]: {
      price: number,
      date: string
    }
  }
}

/**
 * city -> item -> artefacts
 */
export interface Artefacts {
  [key: string]: {
    [key: string]: {
      [key: string]: {
        price: number,
        date: string
      }
    }
  }
}

/**
 * item -> resources for crafting
 */
export interface Recipes {
  [key: string]: {
    PLANKS?: number
    METALBAR?: number;
    CLOTH?: number;
    LEATHER?: number;
  }
}

/**
 * city -> ROOT_specialization -> journal
 */
export interface Journals {
  [key: string]: {
    [key: string]: {
      [key: string]: JournalsItem
    }
  }
}

export interface JournalsItem {
  buyPrice: number,
  sellPrice: number,
  date: string,
  marketFee?: number
}

/**
 * Tree settings
 */
export interface Settings {
  useJournals: boolean,
  useFocus: boolean,
  craftFee: number,
  cities: {
    items: string,
    resources: string,
    artefacts: string,
    journals: string
  }
}

export interface Features {
  loadingText: string
}

export interface ItemInfo {
  name: string;
  parent: string;
  root: string;
  artefactLevel: string;
}