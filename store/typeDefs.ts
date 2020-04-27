export interface Prices {
    [key: string]: {
        [key: string]: {
            minPrice: number
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
    }
}