import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {createStringOfAllTiers, createStringOfAllResources, createStringOfAllArtefacts} from './utils'
import {Prices, ItemModel, RootState, Resources, Artefacts} from './typeDefs'

Vue.use(Vuex)

const cities = {
  'Caerleon': {},
  'Bridgewatch': {},
  'Fort Sterling': {},
  'Lymhurst': {},
  'Martlock': {},
  'Thetford': {},
}
const store = () => new Vuex.Store({
  state: {
    tree: [],
    prices: {},
    resources: cities,
    artefacts: cities
  } as RootState,
  actions: {
    async FETCH_STATE({commit}){
      const tree = await axios.get('/json/tree.json');
      const recipes = await axios.get('/json/recipes.json');
      commit('SET_STATE', {
        'tree': tree.data
      });
    },
    /**
     * 
     * @param itemName - name of item's group
     * @param location - city or Black Market 
     */
    async FETCH_ITEM_PRICE({commit, state, dispatch}, {itemName, location}) {
      const prices: Prices = state.prices[itemName];

      if (!prices || !prices[location]) {
        const allNames: string = createStringOfAllTiers(itemName);
        const artefacts = ['UNDEAD', 'KEEPER', 'HELL', 'MORGANA'];

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
    }
  },
  mutations: {
    SET_STATE(state, {tree}) {
      console.log(tree);
      state.tree = tree;
    },
    /**
     * 
     * @param state - vuex state
     * @param baseItem - t4 item of the section
     * @param location - selected city
     * @param data - api response
     */
    SET_ITEM_PRICE(state, {baseItem, location, data}) {

      if (!state.prices[baseItem]) {
        state.prices[baseItem] = {};
      }
      state.prices[baseItem][location] = {};

      data.forEach((item: ItemModel) => {
          if (!state.prices[baseItem][location][item.item_id]) {
            state.prices[baseItem][location][item.item_id] = {
              price: 0
            };
          }
          const currentPrice = state.prices[baseItem][location][item.item_id].price;
          // choose the minimun no zero price
          const minPrice = currentPrice == 0 ? item.sell_price_min : Math.min(currentPrice, item.sell_price_min);
          
          state.prices[baseItem][location][item.item_id].price = minPrice;
      });
    },

    /**
     * Set resource prices to state
     * @param state - vuex state
     * @param data - api response
     */
    SET_RESOURCE_PRICES(state, data) {
      data.forEach((resource: ItemModel) => {
        state.resources[resource.city][resource.item_id] = {
          price: resource.sell_price_min
        }
      })
    },
    /**
     * Set artefact prices for current location and item
     * @param state - vuex state
     * @param data - api response
     */
    SET_ARTEFACT_PRICES(state, {data, itemName}) {
      data.forEach((artefact: ItemModel) => {
        if (!state.artefacts[artefact.city][itemName]){
          state.artefacts[artefact.city][itemName] = {};
        }

        state.artefacts[artefact.city][itemName][artefact.item_id] = {
          price: artefact.sell_price_min
        }
      })
    }
  }
});

export default store;