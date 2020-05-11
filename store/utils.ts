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

export {
    createStringOfAllTiers, 
    createStringOfAllResources, 
    createStringOfAllArtefacts,
    createStringOfAllJournals,
    normalizedPriceAndDate
};
