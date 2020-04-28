/**
 * city -> all_item_prices
 */
export interface Prices {
    [key: string]: {
        [key: string]: {
            price: number
        }
    }
}

export interface ItemModel {
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
    prices: {
        [key: string]: Prices
    };
    resources: Resources;
    artefacts: Artefacts;
    recipes: Recipes;
}

/**
 * city -> all_resources
 */
export interface Resources {
    [key: string]: {
        [key: string]: {
            price: number
        }
    }
}

/**
 * city -> all_artefacts
 */
export interface Artefacts {
    [key: string]: {
        [key: string]: {
            [key: string]: {
                price: number
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