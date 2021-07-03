/**
 * Vuex root state
 */
export interface TreeState {
  tree: any;
  prices: Prices;
  recipes: Recipes;
  settings: Settings;
  settingsBackup: Settings;
  features: Features;
  currentItemInfo: ItemInfo;
  resources: Resources;
  artefacts: Artefacts;
  journals: Journals;
  hearts: Hearts;
  averageData: AverageData;
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
  sellPriceMin: number;
  sellPriceMinDate: string;
  buyPriceMax: number;
  buyPriceMaxDate: string;
}

/**
 * city -> all_resources
 */
export interface Resources {
  [key: string]: {
    [key: string]: {
      price: number;
      date: string;
    }
  }
}

/**
 * city -> heart name
 */
export interface Hearts {
  [key: string]: {
    [key: string]: {
      price: number;
      date: string;
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
    PLANKS?: number;
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
      [key: string]: Item;
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
  useMultipleCities: boolean;
  showAverageItems: boolean;
  useAveragePrice: boolean;
  useExpertMode: boolean;
  returnPercentage: number;
  craftFee: number;
  cities: Cities,
  expert: {
    useOwnPercentage: boolean;
    useMinPricesNormalization: boolean;
    qualities: Number[];
  }
}

/**
 * Cities in settings
 */
export interface Cities {
  sellItems: string;
  craftItems: string;
  resourcesFirstLocation: string;
  resourcesSecondLocation: string;
  artefacts: string;
  journals: string;
  hearts: string;
}

/**
 * Payload to update cities
 */
export interface OneOfCitiesProp {
  sellItems?: string;
  craftItems?: string;
  resourcesFirstLocation?: string;
  resourcesSecondLocation?: string;
  artefacts?: string;
  journals?: string;
}

/**
 * Various features
 */
export interface Features {
  /**
   * Loading text in loading bar
   */
  loadingText: string;
}

/**
 * Information about an item
 */
export interface ItemInfo {
  name: string;
  parent: string;
  root: string;
  artefactLevel: string;
}

/**
 * Average data api response model
 */
export interface AverageDataResponse {
  itemName: string;
  location: string;
  averageItems: number;
  averagePrice: number;
  firstCheckDate: string;
  lastCheckDate: string;
}

/**
 * Item average data
 */
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