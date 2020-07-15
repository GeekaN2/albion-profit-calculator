import {ActionTree} from 'vuex'
import axios from 'axios'
import {createStringOfAllTiers, createStringOfAllResources, createStringOfAllArtefacts, createStringOfAllJournals} from '../utils'
import {RootState,} from '../typeDefs'

export const actions: ActionTree<RootState, {}> = {
  async FETCH_STATE({commit}){
    const tree = await axios.get('/json/tree.json');
    const recipes = await axios.get('/json/recipes.json');
    commit('SET_STATE', {
      'tree': tree.data,
      'recipes': recipes.data
    });
  },

  /**
   * 
   * @param itemName - name of item's group
   * @param location - city or Black Market 
   */
  async FETCH_ITEM_PRICE({commit, state, dispatch}, {itemName, location}: {itemName: string, location: string}) {
    const allNames: string = createStringOfAllTiers(itemName);
    const artefacts = ['UNDEAD', 'KEEPER', 'HELL', 'MORGANA', 'AVALON'];

    await axios
      .get(`https://www.albion-online-data.com/api/v2/stats/prices/${allNames}?locations=${location}&qualities=1,2,3`)
      .then(response => {
        const data = response.data;
        
        commit('SET_ITEM_PRICE', {
          'baseItem': itemName,
          'location': location,
          'data': data
        });
      });

    if (artefacts.some(artefact => itemName.search(artefact) != -1)){
      await dispatch('FETCH_ARTEFACT_PRICES', {
        'itemName': itemName,
        'location': location
      })
    }
  },

  /**
   * Fetch price for current item with all tiers and subtiers
   * @param commit - vuex commit
   * @param location - city
   */
  async FETCH_RESOURCE_PRICES({commit}, location) {
    const resources = ['CLOTH', 'LEATHER', 'PLANKS', 'METALBAR'];
    let allNames = resources.reduce((acc, resource) => {
      acc = acc + createStringOfAllResources(resource) + ',';

      return acc;
    }, '').slice(0, -1);

    if (location == 'Black Market') {
      location = 'Caerleon';
    }

    await axios
      .get(`https://www.albion-online-data.com/api/v2/stats/prices/${allNames}?locations=${location}`)
      .then(response => {
        const data = response.data;

        commit('SET_RESOURCE_PRICES', data);
      });
  },

  /**
   * Fetch t4-t8 artifacts for current item 
   * @param commit - vuex commit 
   * @param itemName - current item
   * @param location - city 
   */
  async FETCH_ARTEFACT_PRICES({commit}, {itemName, location}) {
    let allNames = createStringOfAllArtefacts(itemName);

    if (location == 'Black Market') {
      location = 'Caerleon';
    }

    await axios
      .get(`https://www.albion-online-data.com/api/v2/stats/prices/${allNames}?locations=${location}`)
      .then(response => {
        const data = response.data;

        commit('SET_ARTEFACT_PRICES', {
          'data': data,
          'itemName': itemName
        });
      });
  },

  /**
   * Fetch t4-t8 empty and full journal prices
   * 
   * @param commit - vuex commit 
   * @param itemName - current item
   * @param root - journals branch: ROOT_WARRIOR etc. 
   */
  async FETCH_JOURNAL_PRICES({commit}, {location, root}) {
    let allNames = createStringOfAllJournals(root);

    if (location == 'Black Market') {
      location = 'Caerleon';
    }

    await axios
      .get(`https://www.albion-online-data.com/api/v2/stats/prices/${allNames}?locations=${location}`)
      .then(response => {
        const data = response.data;
        
        commit('SET_JOURNAL_PRICES', {
          'data': data,
          'root': root
        })
      });
  }
}