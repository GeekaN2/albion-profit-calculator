import { ResponseModel, Item } from './typeDefs'

/**
 * Creates a string to request for items of all tiers and subtiers
 * 
 * @param itemName - item name: T4_2H_NATURESTAFF_KEEPER etc.
 */
export function createStringOfAllItems(itemName: string): string {
  let allNames = '';

  for (let tier = 4; tier <= 8; tier++) {
    for (let subtier = 0; subtier <= 3; subtier++) {
      allNames = allNames + `T${tier}` + itemName.slice(2) + (subtier != 0 ? `@${subtier}` : '') + ',';
    }
  }

  return allNames.slice(0, -1);
}

/**
 * Creates a string to request for materials of all tiers and subtiers
 * 
 * @param resource - basic resource: PLANKS, CLOTH etc.
 * @returns string with all tiers and subtiers for materials
 */
export function createStringOfAllResources(resource: string): string {
  let allNames = '';

  for (let tier = 4; tier <= 8; tier++) {
    for (let subtier = 0; subtier <= 3; subtier++) {
      allNames = allNames + `T${tier}_` + resource + (subtier != 0 ? `_LEVEL${subtier}@${subtier}` : '') + ',';
    }
  }

  return allNames.slice(0, -1);
}

/**
 * Creates a string to request for artefacts of all tiers
 * 
 * @param itemName - artefact item name: T4_2H_NATURESTAFF_KEEPER etc.
 * @returns string with all tiers for artefacts
 */
export function createStringOfAllArtefacts(itemName: string) {
  let allNames = '';

  if (itemName.includes('ROYAL')) {
    for (let tier = 4; tier <= 8; tier++) {
      allNames = allNames + `QUESTITEM_TOKEN_ROYAL_T${tier},`;
    }

    return allNames.slice(0, -1);
  }

  if (itemName.includes('INSIGHT')) {
    for (let tier = 4; tier <= 8; tier++) {
      allNames = allNames + `T${tier}_RANDOM_DUNGEON_SOLO_TOKEN_1,`;
    }

    return allNames.slice(0, -1);
  }

  for (let tier = 4; tier <= 8; tier++) {
    allNames = allNames + `T${tier}_ARTEFACT${itemName.slice(2)},`;
  }

  return allNames.slice(0, -1);
}

/**
 * Creates a string to request for empty and full journals of all tiers and subtiers
 * 
 * @param root - journals branch: ROOT_WARRIOR etc.
 * @returns string with all tiers and subtiers for empty and full journals
 */
export function createStringOfAllJournals(root: string): string {
  let allNames = '';

  for (let tier = 4; tier <= 8; tier++) {
    allNames = allNames + `T${tier}_JOURNAL_${root.slice(5)}_EMPTY,`;
    allNames = allNames + `T${tier}_JOURNAL_${root.slice(5)}_FULL,`;
  }

  return allNames.slice(0, -1);
}

/**
 * Minimum price from sales orders or maximum price from purchase orders
 * 
 * @param {ResponseModel} item 
 */
export function normalizedPriceAndDate(item: ResponseModel): Item {
  if (item.sell_price_min != 0 && item.buy_price_max == 0) {
    return {
      price: item.sell_price_min,
      date: item.sell_price_min_date,
      marketFee: 4.5
    }
  }

  if (item.sell_price_min == 0 && item.buy_price_max != 0) {
    return {
      price: item.buy_price_max,
      date: item.buy_price_max_date,
      marketFee: 3
    }
  }

  if (item.sell_price_min == 0 && item.buy_price_max == 0) {
    return {
      price: 0,
      date: item.sell_price_min_date,
      marketFee: 3
    }
  }

  // You can still compare prices with fee,
  // but the difference isn't so significant

  return {
    price: item.sell_price_min,
    date: item.sell_price_min_date,
    marketFee: 4.5
  }
}

/**
 * Checking an object for emptiness
 * 
 * @param obj - any object
 */
export function isObjectEmpty(obj: object): boolean {
  return JSON.stringify(obj) == "{}";
}

/**
 * Looking for an artifact substring in an item name
 * 
 * @param itemName - item name: T4_ARTEFACT_HEAD_CLOTH_HELL etc.
 */
export function isArtefactItem(itemName: string): boolean {
  const artefacts = ['UNDEAD', 'KEEPER', 'HELL', 'MORGANA', 'AVALON', 'ROYAL', "INSIGHT"];

  if (!itemName) {
    return false;
  }
  
  return artefacts.some(artefact => itemName.includes(artefact));
}