import { GetterTree } from 'vuex'
import { generateSubtiersUpTo, lowerBoundForObjects } from '../utils';
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

  // getTreeItemsData: (state, getters) => {
  //   const itemNames = getters.getItemNamesWithSubtiers();
  //   const treeItems = state.foodAndPotionsTreeItems;
  //   const filteredItems = treeItems.filter((item) => {
  //     return itemNames.includes(item['@uniquename']);
  //   });

  //   return filteredItems;
  // },

  getResourcesNeeded: (state, getters) => {
    const namesWithSubtiers: string[] = getters.getItemNamesWithSubtiers(state.currentItemTiers)

    const allCraftResources = namesWithSubtiers.map(itemName => {
      const craftingRequirement: ConsumableItem["craftingrequirements"] = getters.getItemCraftingRequirements(itemName);
      
      return craftingRequirement.craftresource;
    }).flat();

    const resourceNames = allCraftResources.map(resource => resource['@uniquename']);

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

  getItemDumpData: (state) => (itemName: string): ConsumableItem | null => {
    const items = state.foodAndPotionsTreeItems;

    const item = lowerBoundForObjects<ConsumableItem>(items, '@uniquename', itemName);

    return item;
  },

  getItemCraftingRequirements: (state, getters) => (itemName: string): ConsumableItem["craftingrequirements"] => {
    const isEnchantment = itemName.includes('@');

    if (isEnchantment) {
      const itemDumpData: ConsumableItem = getters.getItemDumpData(itemName.slice(0, itemName.lastIndexOf('@')));

      const enchantmentLevel = Number(itemName.slice(-1));
      const enchantment = itemDumpData.enchantments.enchantment;

      if (Array.isArray(enchantment)) {
        return enchantment[enchantmentLevel - 1].craftingrequirements;
      } else {
        return enchantment.craftingrequirements;
      }
    }

    const itemDumpData: ConsumableItem = getters.getItemDumpData(itemName);

    return itemDumpData.craftingrequirements;
  }
}