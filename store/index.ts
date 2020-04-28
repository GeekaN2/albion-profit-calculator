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
    tree: [{
      name: 'ROOT',
      children: [
        {
          name: 'ROOT_BLACKSMITH',
          children: [{  
            name: 'T4_SHOES_PLATE_SET1',
            children: [{
              name: 'T4_SHOES_PLATE_SET1',
            }, {
              name: 'T4_SHOES_PLATE_SET2'
            }, {
              name: 'T4_SHOES_PLATE_SET3'
            }, {
              name: 'T4_SHOES_PLATE_UNDEAD'
            }, {
              name: 'T4_SHOES_PLATE_HELL'
            }, {
              name: 'T4_SHOES_PLATE_KEEPER'
            }, {
              name: 'T4_SHOES_PLATE_AVALON'
            }]
          }, {
            name: 'T4_ARMOR_PLATE_SET1',
            children: [{
              name: 'T4_ARMOR_PLATE_SET1',
            }, {
              name: 'T4_ARMOR_PLATE_SET2'
            }, {
              name: 'T4_ARMOR_PLATE_SET3'
            }, {
              name: 'T4_ARMOR_PLATE_UNDEAD'
            }, {
              name: 'T4_ARMOR_PLATE_HELL'
            }, {
              name: 'T4_ARMOR_PLATE_KEEPER'
            }, {
              name: 'T4_ARMOR_PLATE_AVALON'
            }]
          }, {
            name: 'T4_HEAD_PLATE_SET1',
            children: [{
              name: 'T4_HEAD_PLATE_SET1',
            }, {
              name: 'T4_HEAD_PLATE_SET2'
            }, {
              name: 'T4_HEAD_PLATE_SET3'
            }, {
              name: 'T4_HEAD_PLATE_UNDEAD'
            }, {
              name: 'T4_HEAD_PLATE_HELL'
            }, {
              name: 'T4_HEAD_PLATE_KEEPER'
            }, {
              name: 'T4_HEAD_PLATE_AVALON'
            }]
          }, {
            name: 'T4_MAIN_SWORD',
            children: [{
              name: 'T4_MAIN_SWORD',
            }, {
              name: 'T4_2H_CLAYMORE'
            }, {
              name: 'T4_2H_DUALSWORD'
            }, {
              name: 'T4_MAIN_SCIMITAR_MORGANA'
            }, {
              name: 'T4_2H_CLEAVER_HELL'
            }, {
              name: 'T4_2H_DUALSCIMITAR_UNDEAD'
            }]
          }, {
            name: 'T4_MAIN_AXE',
            children: [{
              name: 'T4_MAIN_AXE',
            }, {
              name: 'T4_2H_AXE'
            }, {
              name: 'T4_2H_HALBERD'
            }, {
              name: 'T4_2H_HALBERD_MORGANA'
            }, {
              name: 'T4_2H_SCYTHE_HELL'
            }, {
              name: 'T4_2H_DUALAXE_KEEPER'
            }]
          }, {
            name: 'T4_MAIN_MACE',
            children: [{
              name: 'T4_MAIN_MACE',
            }, {
              name: 'T4_2H_MACE'
            }, {
              name: 'T4_2H_FLAIL'
            }, {
              name: 'T4_MAIN_ROCKMACE_KEEPER'
            }, {
              name: 'T4_MAIN_MACE_HELL'
            }, {
              name: 'T4_2H_MACE_MORGANA'
            }]
          }, {
            name: 'T4_MAIN_HAMMER',
            children: [{
              name: 'T4_MAIN_HAMMER',
            }, {
              name: 'T4_2H_POLEHAMMER'
            }, {
              name: 'T4_2H_HAMMER'
            }, {
              name: 'T4_2H_HAMMER_UNDEAD'
            }, {
              name: 'T4_2H_DUALHAMMER_HELL'
            }, {
              name: 'T4_2H_RAM_KEEPER'
            }]
          }, {
            name: 'T4_2H_CROSSBOW',
            children: [{
              name: 'T4_2H_CROSSBOW',
            }, {
              name: 'T4_2H_CROSSBOWLARGE'
            }, {
              name: 'T4_MAIN_1HCROSSBOW'
            }, {
              name: 'T4_2H_REPEATINGCROSSBOW_UNDEAD'
            }, {
              name: 'T4_2H_DUALCROSSBOW_HELL'
            }, {
              name: 'T4_2H_CROSSBOWLARGE_MORGANA'
            }]
          }, {
            name: 'T4_OFF_SHIELD',
            children: [{
              name: 'T4_OFF_SHIELD',
            }, {
              name: 'T4_OFF_TOWERSHIELD_UNDEAD'
            }, {
              name: 'T4_OFF_SHIELD_HELL'
            }, {
              name: 'T4_OFF_SPIKEDSHIELD_MORGANA'
            }]
          }]
        }, {
          name: 'ROOT_HUNTER',
          children: [{
            name: 'T4_SHOES_LEATHER_SET1',
            children: [{
              name: 'T4_SHOES_LEATHER_SET1',
            }, {
              name: 'T4_SHOES_LEATHER_SET2'
            }, {
              name: 'T4_SHOES_LEATHER_SET3'
            }, {
              name: 'T4_SHOES_LEATHER_MORGANA'
            }, {
              name: 'T4_SHOES_LEATHER_HELL'
            }, {
              name: 'T4_SHOES_LEATHER_UNDEAD'
            }, {
              name: 'T4_SHOES_LEATHER_AVALON'
            }],
          }, {
            name: 'T4_ARMOR_LEATHER_SET1',
            children: [{
              name: 'T4_ARMOR_LEATHER_SET1',
            }, {
              name: 'T4_ARMOR_LEATHER_SET2'
            }, {
              name: 'T4_ARMOR_LEATHER_SET3'
            }, {
              name: 'T4_ARMOR_LEATHER_MORGANA'
            }, {
              name: 'T4_ARMOR_LEATHER_HELL'
            }, {
              name: 'T4_ARMOR_LEATHER_UNDEAD'
            }, {
              name: 'T4_ARMOR_LEATHER_AVALON'
            }],
          }, {
            name: 'T4_HEAD_LEATHER_SET1',
            children: [{
              name: 'T4_HEAD_LEATHER_SET1',
            }, {
              name: 'T4_HEAD_LEATHER_SET2'
            }, {
              name: 'T4_HEAD_LEATHER_SET3'
            }, {
              name: 'T4_HEAD_LEATHER_MORGANA'
            }, {
              name: 'T4_HEAD_LEATHER_HELL'
            }, {
              name: 'T4_HEAD_LEATHER_UNDEAD'
            }, {
              name: 'T4_HEAD_LEATHER_AVALON'
            }],
          },  {
            name: 'T4_2H_BOW',
            children: [{
              name: 'T4_2H_BOW',
            }, {
              name: 'T4_2H_WARBOW'
            }, {
              name: 'T4_2H_LONGBOW'
            }, {
              name: 'T4_2H_LONGBOW_UNDEAD'
            }, {
              name: 'T4_2H_BOW_HELL'
            }, {
              name: 'T4_2H_BOW_KEEPER'
            }],
          }, {
            name: 'T4_MAIN_SPEAR',
            children: [{
              name: 'T4_MAIN_SPEAR',
            }, {
              name: 'T4_2H_SPEAR'
            }, {
              name: 'T4_2H_GLAIVE'
            }, {
              name: 'T4_MAIN_SPEAR_KEEPER'
            }, {
              name: 'T4_2H_HARPOON_HELL'
            }, {
              name: 'T4_2H_TRIDENT_UNDEAD'
            }],
          }, {
            name: 'T4_MAIN_NATURESTAFF',
            children: [{
              name: 'T4_MAIN_NATURESTAFF',
            }, {
              name: 'T4_2H_NATURESTAFF'
            }, {
              name: 'T4_2H_WILDSTAFF'
            }, {
              name: 'T4_MAIN_NATURESTAFF_KEEPER'
            }, {
              name: 'T4_2H_NATURESTAFF_HELL'
            }, {
              name: 'T4_2H_NATURESTAFF_KEEPER'
            }],
          }, {
            name: 'T4_MAIN_DAGGER',
            children: [{
              name: 'T4_MAIN_DAGGER',
            }, {
              name: 'T4_2H_DAGGERPAIR'
            }, {
              name: 'T4_2H_CLAWPAIR'
            }, {
              name: 'T4_MAIN_RAPIER_MORGANA'
            }, {
              name: 'T4_2H_IRONGAUNTLETS_HELL'
            }, {
              name: 'T4_2H_DUALSICKLE_UNDEAD'
            }],
          },  {
            name: 'T4_2H_QUARTERSTAFF',
            children: [{
              name: 'T4_2H_QUARTERSTAFF',
            }, {
              name: 'T4_2H_IRONCLADEDSTAFF'
            }, {
              name: 'T4_2H_DOUBLEBLADEDSTAFF'
            }, {
              name: 'T4_2H_COMBATSTAFF_MORGANA'
            }, {
              name: 'T4_2H_TWINSCYTHE_HELL'
            }, {
              name: 'T4_2H_ROCKSTAFF_KEEPER'
            }],
          }, {
            name: 'T4_OFF_TORCH',
            children: [{
              name: 'T4_OFF_TORCH',
            }, {
              name: 'T4_OFF_HORN_KEEPER'
            }, {
              name: 'T4_OFF_JESTERCANE_HELL'
            }, {
              name: 'T4_OFF_LAMP_UNDEAD'
            }],
          }]
        }, {
          name: 'ROOT_MAGE',
          children: [{
            name: 'T4_SHOES_CLOTH_SET1',
            children: [{
              name: 'T4_SHOES_CLOTH_SET1'
            }, {
              name: 'T4_SHOES_CLOTH_SET2'
            }, {
              name: 'T4_SHOES_CLOTH_SET3'
            }, {
              name: 'T4_SHOES_CLOTH_KEEPER'
            }, {
              name: 'T4_SHOES_CLOTH_HELL'
            }, {
              name: 'T4_SHOES_CLOTH_MORGANA'
            }, {
              name: 'T4_SHOES_CLOTH_AVALON'
            }],
          }, {
            name: 'T4_ARMOR_CLOTH_SET1',
            children: [{
              name: 'T4_ARMOR_CLOTH_SET1'
            }, {
              name: 'T4_ARMOR_CLOTH_SET2'
            }, {
              name: 'T4_ARMOR_CLOTH_SET3'
            }, {
              name: 'T4_ARMOR_CLOTH_KEEPER'
            }, {
              name: 'T4_ARMOR_CLOTH_HELL'
            }, {
              name: 'T4_ARMOR_CLOTH_MORGANA'
            }, {
              name: 'T4_ARMOR_CLOTH_AVALON'
            }],
          }, {
            name: 'T4_HEAD_CLOTH_SET1',
            children: [{
              name: 'T4_HEAD_CLOTH_SET1'
            }, {
              name: 'T4_HEAD_CLOTH_SET2'
            }, {
              name: 'T4_HEAD_CLOTH_SET3'
            }, {
              name: 'T4_HEAD_CLOTH_KEEPER'
            }, {
              name: 'T4_HEAD_CLOTH_HELL'
            }, {
              name: 'T4_HEAD_CLOTH_MORGANA'
            }, {
              name: 'T4_HEAD_CLOTH_AVALON'
            }],
          }, {
            name: 'T4_MAIN_FIRESTAFF',
            children: [{
              name: 'T4_MAIN_FIRESTAFF',
            }, {
              name: 'T4_2H_FIRESTAFF',
            }, {
              name: 'T4_2H_INFERNOSTAFF',
            }, {
              name: 'T4_MAIN_FIRESTAFF_KEEPER',
            }, {
              name: 'T4_2H_FIRESTAFF_HELL',
            }, {
              name: 'T4_2H_INFERNOSTAFF_MORGANA',
            }, ],
          }, {
            name: 'T4_MAIN_HOLYSTAFF',
            children: [{
              name: 'T4_MAIN_HOLYSTAFF'
            }, {
              name: 'T4_2H_HOLYSTAFF'
            }, {
              name: 'T4_2H_DIVINESTAFF'
            }, {
              name: 'T4_MAIN_HOLYSTAFF_MORGANA'
            }, {
              name: 'T4_2H_HOLYSTAFF_HELL'
            }, {
              name: 'T4_2H_HOLYSTAFF_UNDEAD'
            }],
          }, {
            name: 'T4_MAIN_ARCANESTAFF',
            children: [{
              name: 'T4_MAIN_ARCANESTAFF'
            }, {
              name: 'T4_2H_ARCANESTAFF'
            }, {
              name: 'T4_2H_ENIGMATICSTAFF'
            }, {
              name: 'T4_MAIN_ARCANESTAFF_UNDEAD'
            }, {
              name: 'T4_2H_ARCANESTAFF_HELL'
            }, {
              name: 'T4_2H_ENIGMATICORB_MORGANA'
            }],
          }, {
            name: 'T4_MAIN_FROSTSTAFF',
            children: [{
              name: 'T4_MAIN_FROSTSTAFF'
            }, {
              name: 'T4_2H_FROSTSTAFF'
            }, {
              name: 'T4_2H_GLACIALSTAFF'
            }, {
              name: 'T4_MAIN_FROSTSTAFF_KEEPER'
            }, {
              name: 'T4_2H_ICEGAUNTLETS_HELL'
            }, {
              name: 'T4_2H_ICECRYSTAL_UNDEAD'
            }],
          }, {
            name: 'T4_MAIN_CURSEDSTAFF',
            children: [{
              name: 'T4_MAIN_CURSEDSTAFF'
            }, {
              name: 'T4_2H_CURSEDSTAFF'
            }, {
              name: 'T4_2H_DEMONICSTAFF'
            }, {
              name: 'T4_MAIN_CURSEDSTAFF_UNDEAD'
            }, {
              name: 'T4_2H_SKULLORB_HELL'
            }, {
              name: 'T4_2H_CURSEDSTAFF_MORGANA'
            }],
          }, {
            name: 'T4_OFF_BOOK',
            children: [{
              name: 'T4_OFF_BOOK'
            }, {
              name: 'T4_OFF_ORB_MORGANA'
            }, {
              name: 'T4_OFF_DEMONSKULL_HELL'
            }, {
              name: 'T4_OFF_TOTEM_KEEPER'
            }],
          }]
        }, {
          name: 'ROOT_LOCKSMITH',
          children: [{
            name: 'T4_2H_TOOL_SICKLE',
            children: [{
              name: 'T4_2H_TOOL_SICKLE',
            }, {
              name: 'T4_SHOES_GATHERER_FIBER'
            }, {
              name: 'T4_ARMOR_GATHERER_FIBER'
            }, {
              name: 'T4_HEAD_GATHERER_FIBER'
            }, {
              name: 'T4_BACKPACK_GATHERER_FIBER'
            }]
          }, {
            name: 'T4_2H_TOOL_KNIFE',
            children: [{
              name: 'T4_2H_TOOL_KNIFE',
            }, {
              name: 'T4_SHOES_GATHERER_HIDE'
            }, {
              name: 'T4_ARMOR_GATHERER_HIDE'
            }, {
              name: 'T4_HEAD_GATHERER_HIDE'
            }, {
              name: 'T4_BACKPACK_GATHERER_HIDE'
            }]
          }, {
            name: 'T4_2H_TOOL_PICK',
            children: [{
              name: 'T4_2H_TOOL_PICK',
            }, {
              name: 'T4_SHOES_GATHERER_ORE'
            }, {
              name: 'T4_ARMOR_GATHERER_ORE'
            }, {
              name: 'T4_HEAD_GATHERER_ORE'
            }, {
              name: 'T4_BACKPACK_GATHERER_ORE'
            }]
          }, {
            name: 'T4_2H_TOOL_HAMMER',
            children: [{
              name: 'T4_2H_TOOL_HAMMER',
            }, {
              name: 'T4_SHOES_GATHERER_ROCK'
            }, {
              name: 'T4_ARMOR_GATHERER_ROCK'
            }, {
              name: 'T4_HEAD_GATHERER_ROCK'
            }, {
              name: 'T4_BACKPACK_GATHERER_ROCK'
            }]
          }, {
            name: 'T4_2H_TOOL_AXE',
            children: [{
              name: 'T4_2H_TOOL_AXE',
            }, {
              name: 'T4_SHOES_GATHERER_WOOD'
            }, {
              name: 'T4_ARMOR_GATHERER_WOOD'
            }, {
              name: 'T4_HEAD_GATHERER_WOOD'
            }, {
              name: 'T4_BACKPACK_GATHERER_WOOD'
            }]
          }, {
            name: 'T4_2H_TOOL_FISHINGROD',
            children: [{
              name: 'T4_2H_TOOL_FISHINGROD',
            }, {
              name: 'T4_SHOES_GATHERER_FISH'
            }, {
              name: 'T4_ARMOR_GATHERER_FISH'
            }, {
              name: 'T4_HEAD_GATHERER_FISH'
            }, {
              name: 'T4_BACKPACK_GATHERER_FISH'
            }]
          }, {
            name: 'T4_CAPE'
          }, {
            name: 'T4_BAG'
          }, {
            name: 'T4_2H_TOOL_SIEGEHAMMER'
          }]
        }
      ],
    }],
    prices: {},
    resources: cities,
    artefacts: cities
  } as RootState,
  actions: {
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
    /**
     * 
     * @param state - vuex state
     * @param baseItem - t4 item of the section
     * @param location - selected city
     * @param data - api response
     */
    SET_ITEM_PRICE(state, {baseItem, location, data}) {
      console.log(data);

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