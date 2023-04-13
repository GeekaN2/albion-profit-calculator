import { ActionTree } from 'vuex'
import axios from 'axios'
import { FeaturesState, Server } from './typeDefs'
import { RootState } from '../typeDefs';

const baseUrl = process.env.BASE_URL;

export const actions: ActionTree<FeaturesState, RootState> = {
    async FETCH_SERVERS({ commit, state }) {
        await axios
            .get(`${baseUrl}servers`)
            .then(response => {
                const servers: Server[] = response.data;

                commit('SET_SERVERS', servers);
                
                if (state.currentServerId) {
                    return;
                } 

                const localStorageServerId = localStorage.getItem(`current-server-id`);

                
                if (localStorageServerId && servers.find(({ id }) => id === localStorageServerId)) {
                    commit('SET_CURRENT_SERVER_ID', localStorageServerId);
                } else if (servers.length > 0) {
                    commit('SET_CURRENT_SERVER_ID', servers?.[0]?.id);
                }
            });
    }
}
