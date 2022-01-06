import { ResponseModel } from "../typeDefs";

export interface FoodAndPotionsState {
  items: Prices;
  resources: Prices;
  settings: Settings;
}

export type AlbionCities = 'Caerleon' 
  | 'Bridgewatch' 
  | 'Fort Sterling' 
  | 'Lymhurst'
  | 'Martlock'
  | 'Thetford';

/**
 * city -> base_item_name -> array of prices
 */
 export interface Prices {
  [key: string]: {
    [key: string]: ResponseModel[]
  }
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
    sellItems: AlbionCities,
  }
}