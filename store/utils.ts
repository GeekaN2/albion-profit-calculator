import {ResponseModel, Item} from './typeDefs'

function createStringOfAllTiers(itemName: string) {
    let allNames = '';

    for (let tier = 4; tier <= 8; tier++) {
        for (let subtier = 0; subtier <= 3; subtier++) {
            allNames = allNames + `T${tier}` + itemName.slice(2) + (subtier != 0 ? `@${subtier}` : '') + ',';
        }
    }

    return allNames.slice(0, -1);
}

function createStringOfAllResources(resource: string) {
    let allNames = '';

    for (let tier = 4; tier <= 8; tier++) {
        for (let subtier = 0; subtier <= 3; subtier++){
            allNames = allNames + `T${tier}_` + resource + (subtier != 0 ? `_LEVEL${subtier}@${subtier}` : '') + ',';
        }
    }

    return allNames.slice(0, -1);
}

function createStringOfAllArtefacts(itemName: string) {
    let allNames = '';

    for (let tier = 4; tier <= 8; tier++) {
        allNames = allNames + `T${tier}_ARTEFACT${itemName.slice(2)},`;
    }
    return allNames.slice(0, -1);
}

/**
 * 
 * @param {string} root 
 */
function createStringOfAllJournals(root: string) {
    let allNames = '';

    for (let tier = 4; tier <= 8; tier++) {
        allNames = allNames + `T${tier}_JOURNAL_${root.slice(5)}_EMPTY,`;
        allNames = allNames + `T${tier}_JOURNAL_${root.slice(5)}_FULL,`;
    }

    return allNames.slice(0, -1);
}

/**
 * Minimum price from sales orders or maximum price from purchase orders
 * @param {ResponseModel} item 
 */
function normalizedPriceAndDate(item: ResponseModel): Item {
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
 * Returns the percentage of materials returned 
 * for profile cities
 * @param parentItem - branch of specific items e.g. T4_MAIN_FIRESTAFF
 * @param city - current city
 * @returns percentage
 */
function getReturnMaterialsPercentage(parentItem: string, city: string) {
    let returnMaterialsPercentage = 15.2; 

    // Keywords for the category of items that the bonus is assigned to
    const bonus: {[key: string]: string[]} = {
        'Martlock': ['AXE', 'QUARTERSTAFF', 'FROSTSTAFF', 'SHOES_PLATE', 'OFF'],
        'Bridgewatch': ['CROSSBOW', 'DAGGER', 'CURSEDSTAFF', 'ARMOR_PLATE', 'SHOES_CLOTH'],
        'Lymhurst': ['SWORD', 'BOW', 'ARCANESTAFF', 'HEAD_LEATHER', 'SHOES_LEATHER'],
        'Fort Sterling': ['HAMMER', 'SPEAR', 'HOLYSTAFF', 'HEAD_PLATE', 'ARMOR_CLOTH'],
        'Thetford': ['MACE', 'NATURESTAFF', 'FIRESTAFF', 'ARMOR_LEATHER', 'HEAD_CLOTH']
    };

    if (bonus[city]) {
        const categories = bonus[city];
        
        const addBonus = categories.some(keyword => {
            return parentItem.indexOf(keyword) != -1;
        });

        if (addBonus) {
            returnMaterialsPercentage = 24.8;
        }
    }
    return returnMaterialsPercentage;
}

export {
    createStringOfAllTiers, 
    createStringOfAllResources, 
    createStringOfAllArtefacts,
    createStringOfAllJournals,
    normalizedPriceAndDate,
    getReturnMaterialsPercentage
};
