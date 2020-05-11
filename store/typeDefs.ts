/**
 * Main item model
 */
export interface Item {
    price: number,
    date: string, 
    marketFee?: number
}

/**
 * city -> all_item_prices
 */
export interface Prices {
    [key: string]: {
        [key: string]: {
            [key: string]: Item
        }
    }
}

export interface ResponseModel {
    buy_price_max: number
    buy_price_max_date: string
    buy_price_min: number
    buy_price_min_date: string
    city: string
    item_id: string
    quality: number
    sell_price_max: number
    sell_price_max_date: string
    sell_price_min: number
    sell_price_min_date: string
}

export interface RootState {
    tree: any;
    prices: Prices
    resources: Resources;
    artefacts: Artefacts;
    recipes: Recipes;
    journals: Journals;
}

/**
 * city -> all_resources
 */
export interface Resources {
    [key: string]: {
        [key: string]: {
            price: number,
            date: string
        }
    }
}

/**
 * city -> item -> artefacts
 */
export interface Artefacts {
    [key: string]: {
        [key: string]: {
            [key: string]: {
                price: number,
                date: string
            }
        }
    }
}

/**
 * item -> resources for crafting
 */
export interface Recipes {
    [key: string]: {
        PLANKS?: number
        METALBAR?: number;
        CLOTH?: number;
        LEATHER?: number;
    }
}

/**
 * city -> ROOT_specialization -> journal
 */
export interface Journals {
    [key: string]: {
        [key: string]: {
            [key: string]: {
                buyPrice: number,
                sellPrice: number,
                date: string,
                marketFee?: number
            }
        }
    }
}