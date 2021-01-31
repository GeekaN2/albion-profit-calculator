import { TreeState } from './profit-tree/typeDefs';
import { TransportationsState } from './transportations-table/typeDefs';

export interface RootState {
  tree: TreeState;
  transportations: TransportationsState;
}