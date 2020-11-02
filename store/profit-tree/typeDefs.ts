/**
 * Main item model
 */
export interface Item {
  price: number;
  date: string;
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
  averageData: AverageData;
}

/**
 * city -> all_resources
 */
export interface Resources {
  [key: string]: {
    [key: string]: {
      price: number;
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
        price: number;
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

/**
 * city -> base item name -> item name
 */
export interface AverageData {
  [key: string]: {
    [key: string]: {
      [key: string]: AverageDataForItem
    }
  }
}

export interface JournalsItem {
  buyPrice: number;
  sellPrice: number;
  date: string;
  marketFee?: number;
}

/**
 * Tree settings
 */
export interface Settings {
  useJournals: boolean;
  useFocus: boolean;
  showAverageItems: boolean;
  useAveragePrice: boolean;
  craftFee: number;
  cities: {
    sellItems: string;
    craftItems: string;
    resourcesFirstLocation: string;
    resourcesSecondLocation: string;
    artefacts: string;
    journals: string;
  }
}

export interface Features {
  loadingText: string;
}

export interface ItemInfo {
  name: string;
  parent: string;
  root: string;
  artefactLevel: string;
}

export interface AverageDataResponse {
  itemName: string;
  location: string;
  averageItems: number;
  averagePrice: number;
  firstCheckDate: string;
  lastCheckDate: string;
}

export interface AverageDataForItem {
  averageItems: number;
  averagePrice: number;
  firstCheckDate: string;
  lastCheckDate: string;
}

/**
 * Combined settings and info about item
 * For convenience in actions and mutations
 */
export interface SettingsWithItem {
  currentItemInfo: ItemInfo;
  settings: Settings;
}