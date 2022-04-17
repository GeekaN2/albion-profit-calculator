export interface CraftResource {
  /**
   * Other item name, example - "T4_BURDOCK"
   */
  "@uniquename": string;

  /**
   * Number, count of items needed - "24"
   */
  "@count": string;
}

export interface Enchantment {
  "@enchantmentlevel": string;
  "craftingrequirements": ConsumableItem['craftingrequirements'],
  "upgraderequirements": CraftResource[],
  [key: string]: any;
}

export interface ConsumableItem {
  /**
   * Example - "T4_POTION_HEAL"
   */
  "@uniquename": string;

  /**
   * Number, example - "4"
   */
  "@tier": string;
  "craftingrequirements": {

    /**
     * Number, example - "10"
     */
    "@amountcrafted": string;

    /**
     * Number, strange focus constant, example - "210"
     */
    "@craftingfocus": string;
    "craftresource": CraftResource | CraftResource[]
  },
  "enchantments": {
    "enchantment": Enchantment | Enchantment[];
  }
  [key: string]: any;
}