import { GetterTree } from 'vuex'
import { generateSubtiersUpTo, lowerBoundForObjects } from '../utils';
import { FoodAndPotionsState } from './typeDefs';
import axios from 'axios';
import { ConsumableItem, CraftResource } from './models';
import { ResponseModel } from '../profit-tree/typeDefs';

export const getters: GetterTree<FoodAndPotionsState, {}> = {
  getAllItemNamesWithSubtiers: (state, getters) => (itemName: string): string[] => {
    const allNames: string[] = getters.getItemNamesWithSubtiers([itemName]);

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
      const tier = Number(baseName.slice(1, 2));

      if (baseName.includes('POTION') && tier >= 4) {
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

  getResourcesNeeded: (state, getters): string[] => {
    const namesWithSubtiers: string[] = getters.getItemNamesWithSubtiers(state.currentItemTiers)

    const allCraftResources = namesWithSubtiers.map(itemName => {
      const craftingRequirement: ConsumableItem["craftingrequirements"] = getters.getItemCraftingRequirements(itemName);
      
      return craftingRequirement.craftresource;
    }).flat();

    const resourceNames = allCraftResources.map(resource => resource['@uniquename']);

    return [...new Set(resourceNames)];
  },

  getResourcesNeededForItem: (state, getters) => (itemName: string): string[] => {
    const craftResources: ConsumableItem["craftingrequirements"]['craftresource'] = getters.getItemCraftingRequirements(itemName).craftresource;
    
    const resourceNames = [craftResources].flat().map(resource => resource['@uniquename']);

    return [...new Set(resourceNames)];
  },

  /**
   * Get items data for selected city
   * 
   * @param state - vuex state
   */
  getItems: (state, getters): ResponseModel[] => {
    const city = state.settings.cities.sellItems;
    const itemNames = getters.getItemNamesWithSubtiers(state.currentItemTiers); 
    let items = state.items[city] || [];
    items = items.filter(item => itemNames.includes(item.itemId));

    return items;
  },

  getItem: (state, getters) => (itemName: string): ResponseModel | null => {
    const items: ResponseModel[] = getters.getItems;
    const item: ResponseModel | null = items.find(item => item.itemId === itemName) || null;
    
    return item;
  },

  /**
   * Get resources data for selected city
   * 
   * @param state - vuex state
   */
  getResources: (state, getters): ResponseModel[] => {
    const city = state.settings.cities.buyResources;
    const resourcesNeeded: string[] = getters.getResourcesNeeded;
    let resources = state.resources[city] || [];
    resources = resources.filter(item => resourcesNeeded.includes(item.itemId));

    return resources;
  },

  getResourceByName: (state, getters) => (resourceName: string): ResponseModel | undefined => {
    const resources: ResponseModel[] = getters.getResources;
    const resource = resources.find(resource => resource.itemId === resourceName);

    return resource;
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
      const enchantment = itemDumpData?.enchantments?.enchantment;

      if (Array.isArray(enchantment)) {
        return enchantment[enchantmentLevel - 1].craftingrequirements;
      } else {
        return enchantment.craftingrequirements;
      }
    }

    const itemDumpData: ConsumableItem = getters.getItemDumpData(itemName);

    return itemDumpData.craftingrequirements;
  },

  getReturnPercentage: (state) => {
    const useFocus = state.settings.useFocus;
    const craftItemsCity = state.settings.cities.craftItems;
    let returnMaterialsPercentage = useFocus ? 43.5 : 15.2;
    
    if (craftItemsCity === 'Caerleon') {
      returnMaterialsPercentage = useFocus ? 47.9 : 24.8;
    }

    return returnMaterialsPercentage;
  }
}