import { GetterTree } from 'vuex'
import { TreeState } from '../typeDefs'
import { isArtifactItem } from '../utils'

export const getters: GetterTree<TreeState, {}> = {
  /**
   * Get t4-t8 item prices
   * 
   * @param state - vuex state
   */
  getItems: (state: TreeState) => {
    const itemName = state.currentItemInfo.name;
    const city = state.settings.cities.sellItems;
    let prices = state.prices[city][itemName] || {};

    return prices;
  },

  /**
   * Get artefact
   * 
   * @param state - vuex state
   */
  getArtefacts: (state: TreeState) => {
    const itemName = state.currentItemInfo.name;
    const city = state.settings.cities.artefacts;
    const artefacts = state.artefacts[city][itemName] || {};

    return artefacts;
  },

  /**
   * Get item craft recipe
   * 
   * @param state - vuex state
   */
  getRecipe: (state: TreeState) => {
    const itemName = state.currentItemInfo.name;
    const recipe = state.recipes[itemName] || {};

    return recipe;
  },

  /**
   * Get resource prices for current city
   * 
   * @param state - vuex state
   */
  getFirstResources: (state: TreeState) => {
    const city = state.settings.cities.resourcesFirstLocation;
    const resources = state.resources[city] || {};

    return resources;
  },

  /**
   * Get resource prices for current city
   * 
   * @param state - vuex state
   */
  getSecondResources: (state: TreeState) => {
    const city = state.settings.cities.resourcesSecondLocation;
    const resources = state.resources[city] || {};

    return resources;
  },

  /**
   * Get journl prices for current city and root
   * 
   * @param state - vuex state
   */
  getJournals: (state: TreeState) => {
    const city = state.settings.cities.journals;
    const root = state.currentItemInfo.root;
    const journals = state.journals[city][root] || {}

    return journals;
  },

  /**
   * Get average data: average price and average number of items sold per day
   * 
   * @param state - vuex state
   */
  getAverageData: (state: TreeState) => {
    const city = state.settings.cities.sellItems;
    const itemName = state.currentItemInfo.name;
    const averageData = state.averageData[city][itemName] || {};

    return averageData;
  },

  /**
   * Get text of loading
   * 
   * @param state - vuex state
   */
  loadingText: (state: TreeState) => {
    return state.features.loadingText;
  },

  /**
   * Returns the percentage of materials returned 
   * for profile cities
   */
  returnMaterialPercentage: (state: TreeState) => {
    const parentItem = state.currentItemInfo.parent;
    const itemName = state.currentItemInfo.name;
    const city = state.settings.cities.craftItems;
    const useFocus = state.settings.useFocus;

    let returnMaterialsPercentage = useFocus ? 43.5 : 15.2;

    // Keywords for the category of items that the bonus is assigned to
    const bonus: { [key: string]: string[] } = {
      'Caerleon': ['TOOL'],
      'Martlock': ['AXE', 'QUARTERSTAFF', 'FROSTSTAFF', 'SHOES_PLATE', 'OFF'],
      'Bridgewatch': ['CROSSBOW', 'DAGGER', 'CURSEDSTAFF', 'ARMOR_PLATE', 'SHOES_CLOTH'],
      'Lymhurst': ['SWORD', 'BOW', 'ARCANESTAFF', 'HEAD_LEATHER', 'SHOES_LEATHER'],
      'Fort Sterling': ['HAMMER', 'SPEAR', 'HOLYSTAFF', 'HEAD_PLATE', 'ARMOR_CLOTH'],
      'Thetford': ['MACE', 'NATURESTAFF', 'FIRESTAFF', 'ARMOR_LEATHER', 'HEAD_CLOTH']
    };

    if (!bonus[city]) {
      return returnMaterialsPercentage;
    }

    const categories = bonus[city];

    let addBonus = categories.some(keyword => {
      return parentItem.includes(keyword);
    });

    if (city == 'Caerleon') {
      addBonus = categories.some(keyword => {
        return itemName.includes(keyword);
      });
    }

    if (addBonus) {
      returnMaterialsPercentage = useFocus ? 47.9 : 24.8;
    }

    return returnMaterialsPercentage;
  },

  /**
   * Is the current item an artifact?
   * 
   * @param state - vuex state
   */
  isArtifactItem: (state: TreeState): boolean => {
    return isArtifactItem(state.currentItemInfo.name);
  },

  /**
   * Get an artifact name
   * 
   * @param state - vuex state
   * @param getters - vuex getters
   * @param tier - tier of artifact to return
   * @return artifact name
   */
  getArtifactName: (state: TreeState, getters: GetterTree<TreeState, {}>) => (tier: number): string => {
    if (!getters.isArtifactItem) {
      return '';
    }

    const itemName = state.currentItemInfo.name;
    let artifactName = `T${tier}_ARTEFACT${itemName.slice(2)}`;

    if (itemName.includes('ROYAL')) {
      artifactName = `QUESTITEM_TOKEN_ROYAL_T${tier}`
    } else if (itemName.includes('INSIGHT')) {
      artifactName = `T4_SKILLBOOK_STANDARD`;
    }

    return artifactName;
  }
}