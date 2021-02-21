import { ActionTree } from 'vuex'
import axios from 'axios'
import { FeaturesState } from './typeDefs'
import { RootState } from '../typeDefs';

const baseUrl = process.env.BASE_URL;

export const actions: ActionTree<FeaturesState, RootState> = {}
