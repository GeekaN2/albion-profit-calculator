<template>
  <div>
    <template v-if="!settings.showTransmutationWays || baseItemName == 'ROCK'">
      <div class="item-table">
        <div
          v-for="subtier in (baseItemName != 'ROCK' ? 4 : 1)"
          :key="subtier"
        >
          <ItemRow 
            :class="`subtier${subtier - 1}`"
            :row="getRowFirst(subtier - 1)" 
          />
        </div>
      </div>
      <div 
        v-if="baseItemName != 'ROCK'"
        class="item-table"
      >
        <div
          v-for="subtier in 4"
          :key="subtier"
        >
          <ItemRow 
            :class="`subtier${subtier - 1}`"
            :row="getRowSecond(subtier - 1)" 
          />
        </div>
      </div>
    </template>
    <div
      v-else
      class="ways-table"
    >
      <template v-for="(row, index) in getBestWaysToTransmute">
        <LongWayTransmutationRow 
          :key="index"
          :transmutation-row-data="row"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import ItemRow from './ItemRow';
import LongWayTransmutationRow from './LongWayTransmutationRow';

export default {
  name: "Table",
  components: {
    ItemRow,
    LongWayTransmutationRow
  },
  data() {
    return {
      resources: ["ORE", "HIDE", "FIBER", "WOOD", "ROCK"],
      values: [
        [4, 5.4, 8, 12.8, 25.6],
        [12, 10.62, 16, 25.6, 51.2],
        [24, 21.36, 32, 51.2, 102],
        [48, 42.66, 64, 102.4, 204]
      ],
      transCostPrevTierFormula: [
        [0, 375, 600, 1200, 5000],
        [0, 750, 1200, 2500, 10200],
        [0, 2100, 3200, 5100, 20400],
        [0, 8400, 12800, 20400, 40800]
      ],
      /**
       * It's a bit weird but rocks only have prev tier formula
       */
      rockTransCost: [0, 1000, 2400, 4800, 12500]
    };
  },
  computed: {
    ...mapGetters({
      sellItems: 'transmutations/sellItemPrices',
      buyItems: 'transmutations/buyItemPrices',
      getItemName: 'transmutations/getItemName',
      loadingText: 'transmutations/loadingText'
    }),

    ...mapState({
      settings: state => state.transmutations.settings,
      baseItemName: state => state.transmutations.currentItemInfo.name
    }),

    /**
     * Get all possible ways of transmutations and sort by the profit percentage
     */
    getBestWaysToTransmute() {
      let bestWays = [];
      // Started item, can't be T8.3
      for (let tier = 4; tier <= 8; tier++) {
        for (let subtier = 0; subtier <= 3 && !(tier == 8 && subtier == 3); subtier++) {
          let allWays = this.getAllTransmuteWays(tier, subtier);

          bestWays.push(...allWays);
        }
      }

      bestWays.sort((row1, row2) => row1.profitPercentage < row2.profitPercentage);

      return bestWays;
    },
  },
  methods: {
    /**
     * Get item value for item tier and subtier
     * 
     * @param {number} tier - item tier
     * @param {number} subtier - item subtier
     */
    getValue(tier, subtier) {
      return this.values[subtier][tier - 4];
    },

    /**
     * Getting item trans cost by previous tier recipe
     * needed for calcuation of transmutation fee
     * 
     * @param {number} tier - item tier
     * @param {number} subtier - item subtier
     */
    getItemTransCostPrevTierFormula(tier, subtier) {
      if (this.baseItemName == 'ROCK') {
        return this.rockTransCost[tier - 4];
      }

      return this.getValue(tier, subtier) * 200;
    },

    /**
     * Getting item transmutation cost by previous subtier recipe
     * needed for calcuation of transmutation fee
     * 
     * @param {number} tier - item tier
     * @param {number} subtier - item subtier
     */
    getItemTransCostPrevSubtierFormula(tier, subtier) {
      const subtierMultilier = [0, 3, 2, 1];
      return this.getValue(tier, subtier) * (subtier * 50 - !(subtier % 2) * 25) * subtierMultilier[subtier];
    },

    /**
     * Calculate transmutation fee for given item name
     * 
     * @param {string} itemName - item name
     * @param {function(tier, subtier): number} formula - function to get transmutation cost
     * @returns transmutation fee
     */
    getTransmutationFee(itemName, formula) {
      const tier = Number(itemName.slice(1, 2));
      const subtier = Number(itemName.slice(-1)) || 0;
      const itemTransCost = formula(tier, subtier);
      const goldPrice = this.settings.gold;
      const value = this.getValue(tier, subtier);
      const fee = this.settings.fee;

      const transmutationCost = itemTransCost - (itemTransCost * (3000 - goldPrice) / 3000) + (value * fee / 20);

      return transmutationCost;
    },

    /**
     * Prev tier row
     */
    getRowFirst(subtier) {
      let row = [];

      for (let tier = 4; tier <= 8; tier++) {
        const itemName = `T${tier}_${this.baseItemName}` + 
          (subtier == 0 ? '' : `_LEVEL${subtier}@${subtier}`);

        if (tier == 4) {
          row.push({
            name: itemName,
            price: 0,
            fee: 0,
            marketFee: 4.5,
            profit: 0,
            percentageProfit: 0,
            date: '',
            key: 0
          });

          continue;
        }
        
        const item = this.sellItems[itemName];
        const price =  Math.floor(item.sellPriceMin * (0.955));
        const fee = Math.floor(this.getTransmutationFee(itemName, this.getItemTransCostPrevTierFormula));
        const materialName = `T${tier - 1}_${this.baseItemName}` + 
          (subtier == 0 ? '' : `_LEVEL${subtier}@${subtier}`);
        const material = this.buyItems[materialName];
        const outcome = fee + material.sellPriceMin
        const profit = price == 0 ? 0 : price - outcome;
        const percentageProfit = price == 0 ? 0 : profit / outcome * 100;

        row.push({
          name: itemName,
          price,
          fee: -fee,
          marketFee: 4.5,
          profit,
          percentageProfit,
          date: item.sellPriceMinDate,
          materialName,
          materialPrice: -material.sellPriceMin,
          materialDate: material.sellPriceMinDate,
          key: 0
        });
      }

      return row;
    },

    /**
     * Prev subtier row
     */
    getRowSecond(subtier) {
      let row = [];

      for (let tier = 4; tier <= 8; tier++) {
        const itemName = `T${tier}_${this.baseItemName}` + 
          (subtier == 0 ? '' : `_LEVEL${subtier}@${subtier}`);

        if (subtier == 0) {
          row.push({
            name: itemName,
            price: 0,
            fee: 0,
            marketFee: 4.5,
            profit: 0,
            percentageProfit: 0,
            date: '',
            key: 1,
          });

          continue;
        }
        
        const item = this.sellItems[itemName];
        const price =  Math.floor(item.sellPriceMin * (0.955));
        const fee = Math.floor(this.getTransmutationFee(itemName, this.getItemTransCostPrevSubtierFormula));
        const materialName = `T${tier}_${this.baseItemName}` + 
        (subtier - 1 <= 0 ? '' : `_LEVEL${subtier - 1}@${subtier - 1}`);
        const material = this.buyItems[materialName];
        const outcome = fee + material.sellPriceMin
        const profit = price == 0 ? 0 : price - outcome;
        const percentageProfit = price == 0 ? 0 : profit / outcome * 100;

        row.push({
          name: itemName,
          price,
          fee: -fee,
          marketFee: 4.5, 
          profit,
          percentageProfit,
          date: item.sellPriceMinDate,
          materialName,
          materialPrice: -material.sellPriceMin,
          materialDate: material.sellPriceMinDate,
          key: 1
        });
      }

      return row;
    },

    /**
     * Calculate all the best ways from the item of the current tier 
     * and subtier to all the others above the tier or subtier
     */
    getAllTransmuteWays(tier, subtier) {
      let cells = [];
      let bestWays = [];
      
      for (let s = subtier; s <= 3; s++) {
        cells[s] = [];

        for (let t = tier; t <= 8; t++) {
          cells[s][t] = {};
        }
      }

      for (let t = tier; t <= 8; t++) {
        for (let s = subtier; s <= 3; s++) {
          let itemName = this.getItemName(t, s);

          if (t == tier && s == subtier) {
            cells[s][t] = {
              transmutationFee: 0,
              prevTier: 0,
              pervSubtier: 0,
            }

            continue;
          }

          let prevTierFee = 0;
          let prevSubtierFee = 0;

          if (t - 1 >= tier) {
            prevTierFee = cells[s][t - 1].transmutationFee + this.getTransmutationFee(itemName, this.getItemTransCostPrevTierFormula);
          }

          if (s - 1 >= subtier) {
            prevSubtierFee = cells[s - 1][t].transmutationFee + this.getTransmutationFee(itemName, this.getItemTransCostPrevSubtierFormula);
          }

          cells[s][t].cost = 0;

          if (prevTierFee < prevSubtierFee && prevTierFee != 0 || prevSubtierFee == 0) {
            cells[s][t] = {
              transmutationFee: prevTierFee,
              prevTier: t - 1,
              prevSubtier: s
            }
          } else {
            cells[s][t] = {
              transmutationFee: prevSubtierFee,
              prevTier: t,
              prevSubtier: s - 1
            }
          }
        }
      }

      let getBuyCost = ([tier, subtier]) => this.buyItems[this.getItemName(tier, subtier)].sellPriceMin;
      let getSellCost = ([tier, subtier]) => this.sellItems[this.getItemName(tier, subtier)].sellPriceMin;

      for (let t = tier; t <= 8; t++) {
        for (let s = subtier; s <= 3; s++) {
          if (t == tier && s == subtier) {
            continue;
          }

          const recoveredWay = this.recoverWay(cells, t, s);
          const transmutationFee = cells[s][t].transmutationFee;
          const income = getSellCost(recoveredWay[recoveredWay.length - 1]) * (1 - 4.5 / 100);
          const outcome = getBuyCost(recoveredWay[0]) + transmutationFee;
          const profit = income - outcome;
          const profitPercentage = profit / outcome * 100;

          bestWays.push({
            profit,
            profitPercentage,
            fee: transmutationFee,
            way: recoveredWay
          });
        }
      }
  
      return bestWays;
    },

    /**
     * Return recovered transmute way
     */
    recoverWay(cells, toTier, toSubtier) {
      let path = [];
      let tier = toTier, subtier = toSubtier;

      while (tier != 0) {
        let { prevTier, prevSubtier } = cells[subtier][tier];

        path.push([tier, subtier]);
        tier = prevTier;
        subtier = prevSubtier;
      }
      
      return path.reverse();
    }
  },
};
</script>

<style scoped lang="scss">
.item-table {
  padding: 0 10px;
  margin: 20px auto;
  display: grid;
  max-width: 650px;
  width: 100%;
  font-size: 1em;
}

.ways-table {
  max-width: 720px;
  margin: 20px auto;
}
</style>