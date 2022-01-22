import { ResponseModel } from "../typeDefs";
import { ConsumableItem } from "./models";

export interface FoodAndPotionsState {
  items: Prices;
  resources: Prices;
  settings: Settings;
  currentItemTiers: string[];
  foodAndPotionsTreeItems: ConsumableItem[];
  features: Features;
}

export type AlbionCities = 'Caerleon' 
  | 'Bridgewatch' 
  | 'Fort Sterling' 
  | 'Lymhurst'
  | 'Martlock'
  | 'Thetford';


export enum LoadingStatus {
  CALCULATED = 'calculated',
  SOMETHING_CHANGED = 'somethingChanged',
  LOADING_ITEMS = 'loadingItems',
}
export interface Features {
  loadingStatus: LoadingStatus;
}


/**
 * city -> array of items data
 */
 export interface Prices {
  [key: string]: ResponseModel[];
}

/**
 * Transmutation settings
 */
 export interface Settings {
  useFocus: boolean;
  fee: number;
  useOwnPercentage: boolean;
  returnPercentage: number;
  useMultipleCities: boolean;
  cities: {
    buyResources: AlbionCities,
    craftItems: AlbionCities,
    sellItems: AlbionCities,
  }
}

export type SettingsWithItemTiers = Pick<FoodAndPotionsState, 'currentItemTiers' | 'settings'>