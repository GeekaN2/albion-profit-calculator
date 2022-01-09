import { GetterTree } from 'vuex'
import { generateSubtiersUpTo } from '../utils';
import { FoodAndPotionsState } from './typeDefs';
import axios from 'axios';
import { ConsumableItem, CraftResource } from './models';

export const getters: GetterTree<FoodAndPotionsState, {}> = {
  getAllItemNamesWithSubtiers: (state) => (itemName: string): string[] => {
    const allNames: string[] = [];

    if (itemName.includes('POTION')) {
      allNames.push(...generateSubtiersUpTo(itemName, 1));
    } else if (itemName.includes('MEAL')) {
      allNames.push(...generateSubtiersUpTo(itemName, 3));
    } else {
      allNames.push(itemName);
    }

    return allNames;
  },

  /**
   * Get artefact
   * 
   * @param state - vuex state
   */
  getItemNamesWithSubtiers: (state) => (itemNames?: string[]): string[] => {
    const baseNames = itemNames || state.currentItemTiers;
    const allNames: string[] = [];

    baseNames.forEach((baseName) => {
      if (baseName.includes('POTION')) {
        allNames.push(...generateSubtiersUpTo(baseName, 1));

        return;
      }

      if (baseName.includes('MEAL')) {
        allNames.push(...generateSubtiersUpTo(baseName, 3));

        return;
      }

      allNames.push(baseName);
    });

    return allNames;
  },

  getTreeItemsData: (state, getters) => {
    const itemNames = getters.getItemNamesWithSubtiers();
    const treeItems = state.foodAndPotionsTreeItems;
    const filteredItems = treeItems.filter((item) => {
      return itemNames.includes(item['@uniquename']);
    });

    return filteredItems;
  },

  getResourcesNeeded: (state, getters) => {
    const currentItemsData: ConsumableItem[] = getters.getTreeItemsData;

    const resources: CraftResource[] = [];

    currentItemsData.forEach((item) => {
      resources.push(...item.craftingrequirements.craftresource);
    });

    const resourceNames: CraftResource['@uniquename'][] = resources.map((resource) => resource['@uniquename']);

    return [...new Set(resourceNames)];
  },

  /**
   * Get items data for selected city
   * 
   * @param state - vuex state
   */
  getItems: (state) => {
    const city = state.settings.cities.sellItems;
    const items = state.items[city] || {};

    return items;
  },

  /**
   * Get resources data for selected city
   * 
   * @param state - vuex state
   */
  getResources: (state) => {
    const city = state.settings.cities.buyResources;
    const resources = state.resources[city] || {};

    return resources;
  },
}