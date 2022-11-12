export interface RootState {
  
}

export interface ProfitTreeItem {
  name: string;
  children?: ProfitTreeItem[];
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