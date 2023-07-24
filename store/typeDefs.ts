import { AdminPanelState } from "./admin-panel/typeDefs";
import { ArtifactFoundryState } from "./artifact-foundry/typeDefs";
import { FeaturesState } from "./features/typeDefs";
import { FoodAndPotionsState } from "./food-and-potions/typeDefs";
import { TreeState } from "./profit-tree/typeDefs";
import { RefiningState } from "./refining/typeDefs";
import { TransmutationsState } from "./transmutations/typeDefs";
import { TransportationsState } from "./transportations-table/typeDefs";

export interface RootState {
  tree: TreeState;
  refining: RefiningState;
  artifactFoundry: ArtifactFoundryState;
  foodAndPotions: FoodAndPotionsState;
  transmutations: TransmutationsState;
  transportations: TransportationsState;
  adminPanel: AdminPanelState;
  features: FeaturesState;
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