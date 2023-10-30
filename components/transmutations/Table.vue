<template>
  <div>
    <template v-if="!settings.showTransmutationWays || baseItemName == 'ROCK'">
      <div class="item-table">
        <ItemRecipe
          :resource-from="'T4_' + baseItemName"
          :resource-to="'T5_' + baseItemName"
        />
        <div
          v-for="subtier in baseItemName != 'ROCK' ? 5 : 1"
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
        <ItemRecipe
          :resource-from="'T4_' + baseItemName"
          :resource-to="'T4_' + baseItemName + '_LEVEL1@1'"
        />
        <div
          v-for="subtier in 5"
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
import { mapGetters, mapState } from "vuex";
import ItemRow from "./ItemRow";
import LongWayTransmutationRow from "./LongWayTransmutationRow";
import ItemRecipe from "./ItemRecipe.vue";
import { MARKET_SELL_ORDER_FEE } from "../../store/constants";

export default {
  name: "Table",
  components: {
    ItemRow,
    LongWayTransmutationRow,
    ItemRecipe,
  },
  data() {
    return {
      resources: ["ORE", "HIDE", "FIBER", "WOOD", "ROCK"],
      values: [
        [4, 5.34, 8, 12.8, 25.6],
        [12, 10.66, 16, 25.6, 51.2],
        [28, 21.34, 32, 51.2, 102.4],
        [60, 42.66, 64, 102.4, 204.8],
        [124, 85.32, 128, 204.8, 409.6],
      ],
      transCostPrevSubtierFormula: [
        [0, 0, 0, 0, 0],
        [1500, 2000, 3000, 4800, 14400],
        [3000, 4000, 6000, 15120, 45360],
        [6000, 8000, 19800, 49896, 149688],
        [24000, 32000, 79200, 199584, 748440],
      ],
      transCostPrevTierFormula: [
        [0, 781, 1250, 2500, 5000],
        [0, 1563, 2500, 5000, 15000],
        [0, 3125, 5000, 15750, 47250],
        [0, 6250, 16500, 51975, 155925],
        [0, 25000, 66000, 207900, 779625],
      ],
      /**
       * It's a bit weird but rocks only have prev tier formula
       */
      rockTransCost: [0, 1070, 2400, 5120, 12800],
    };
  },
  computed: {
    ...mapGetters({
      sellItems: "transmutations/sellItemPrices",
      buyItems: "transmutations/buyItemPrices",
      getItemName: "transmutations/getItemName",
      loadingText: "transmutations/loadingText",
      globalDiscount: "transmutations/globalDiscount",
    }),

    ...mapState({
      settings: (state) => state.transmutations.settings,
      baseItemName: (state) => state.transmutations.currentItemInfo.name,
    }),

    /**
     * Get all possible ways of transmutations and sort by the profit percentage
     */
    getBestWaysToTransmute() {
      let bestWays = [];
      // Started item, can't be T8.4
      for (let tier = 4; tier <= 8; tier++) {
        for (let subtier = 0; subtier <= 4 && !(tier == 8 && subtier == 4); subtier++) {
          let allWays = this.getAllTransmuteWays(tier, subtier);

          bestWays.push(...allWays);
        }
      }

      bestWays.sort((row1, row2) => row2.profitPercentage - row1.profitPercentage);

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
      if (this.baseItemName == "ROCK") {
        return this.rockTransCost[tier - 4];
      }

      return this.transCostPrevTierFormula[subtier][tier - 4];
    },

    /**
     * Getting item transmutation cost by previous subtier recipe
     * needed for calcuation of transmutation fee
     *
     * @param {number} tier - item tier
     * @param {number} subtier - item subtier
     */
    getItemTransCostPrevSubtierFormula(tier, subtier) {
      return this.transCostPrevSubtierFormula[subtier][tier - 4];
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
      const value = this.getValue(tier, subtier);
      const fee = this.settings.fee;

      // previously: 1 - (3000 - goldPrice) / 3000
      // I don't understand where in albion such a constant comes from.
      // Calculations did not converge by a certain factor
      const globalDiscount = this.globalDiscount;

      const transmutationCost =
        itemTransCost * globalDiscount + ((value * fee) / 100) * 0.1125;

      return transmutationCost;
    },

    /**
     * Prev tier row
     */
    getRowFirst(subtier) {
      let row = [];

      for (let tier = 4; tier <= 8; tier++) {
        const itemName =
          `T${tier}_${this.baseItemName}` +
          (subtier == 0 ? "" : `_LEVEL${subtier}@${subtier}`);

        if (tier == 4) {
          row.push({
            name: itemName,
            price: 0,
            fee: 0,
            marketFee: MARKET_SELL_ORDER_FEE,
            profit: 0,
            percentageProfit: 0,
            date: "",
            key: 0,
          });

          continue;
        }

        const item = this.sellItems[itemName];
        const price = Math.floor(
          (item.sellPriceMin * (100 - MARKET_SELL_ORDER_FEE)) / 100
        );
        const fee = Math.floor(
          this.getTransmutationFee(itemName, this.getItemTransCostPrevTierFormula)
        );
        const materialName =
          `T${tier - 1}_${this.baseItemName}` +
          (subtier == 0 ? "" : `_LEVEL${subtier}@${subtier}`);
        const material = this.buyItems[materialName];
        const outcome = fee + material.sellPriceMin;
        const profit = price == 0 ? 0 : price - outcome;
        const percentageProfit = price == 0 ? 0 : (profit / outcome) * 100;

        row.push({
          name: itemName,
          price,
          fee: -fee,
          marketFee: MARKET_SELL_ORDER_FEE,
          profit,
          percentageProfit,
          date: item.sellPriceMinDate,
          materialName,
          materialPrice: -material.sellPriceMin,
          materialDate: material.sellPriceMinDate,
          key: 0,
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
        const itemName =
          `T${tier}_${this.baseItemName}` +
          (subtier == 0 ? "" : `_LEVEL${subtier}@${subtier}`);

        if (subtier == 0) {
          row.push({
            name: itemName,
            price: 0,
            fee: 0,
            marketFee: MARKET_SELL_ORDER_FEE,
            profit: 0,
            percentageProfit: 0,
            date: "",
            key: 1,
          });

          continue;
        }

        const item = this.sellItems[itemName];
        const price = Math.floor(item.sellPriceMin * 0.955);
        const fee = Math.floor(
          this.getTransmutationFee(itemName, this.getItemTransCostPrevSubtierFormula)
        );
        const materialName =
          `T${tier}_${this.baseItemName}` +
          (subtier - 1 <= 0 ? "" : `_LEVEL${subtier - 1}@${subtier - 1}`);
        const material = this.buyItems[materialName];
        const outcome = fee + material.sellPriceMin;
        const profit = price == 0 ? 0 : price - outcome;
        const percentageProfit = price == 0 ? 0 : (profit / outcome) * 100;

        row.push({
          name: itemName,
          price,
          fee: -fee,
          marketFee: MARKET_SELL_ORDER_FEE,
          profit,
          percentageProfit,
          date: item.sellPriceMinDate,
          materialName,
          materialPrice: -material.sellPriceMin,
          materialDate: material.sellPriceMinDate,
          key: 1,
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

      for (let s = subtier; s <= 4; s++) {
        cells[s] = [];

        for (let t = tier; t <= 8; t++) {
          cells[s][t] = {};
        }
      }

      for (let t = tier; t <= 8; t++) {
        for (let s = subtier; s <= 4; s++) {
          let itemName = this.getItemName(t, s);

          if (t == tier && s == subtier) {
            cells[s][t] = {
              transmutationFee: 0,
              prevTier: 0,
              pervSubtier: 0,
            };

            continue;
          }

          let prevTierFee = 0;
          let prevSubtierFee = 0;

          if (t - 1 >= tier) {
            prevTierFee =
              cells[s][t - 1].transmutationFee +
              this.getTransmutationFee(itemName, this.getItemTransCostPrevTierFormula);
          }

          if (s - 1 >= subtier) {
            prevSubtierFee =
              cells[s - 1][t].transmutationFee +
              this.getTransmutationFee(itemName, this.getItemTransCostPrevSubtierFormula);
          }

          cells[s][t].cost = 0;

          if ((prevTierFee < prevSubtierFee && prevTierFee != 0) || prevSubtierFee == 0) {
            cells[s][t] = {
              transmutationFee: prevTierFee,
              prevTier: t - 1,
              prevSubtier: s,
            };
          } else {
            cells[s][t] = {
              transmutationFee: prevSubtierFee,
              prevTier: t,
              prevSubtier: s - 1,
            };
          }
        }
      }

      let getBuyCost = ([tier, subtier]) =>
        this.buyItems[this.getItemName(tier, subtier)].sellPriceMin;
      let getSellCost = ([tier, subtier]) =>
        this.sellItems[this.getItemName(tier, subtier)].sellPriceMin;

      for (let t = tier; t <= 8; t++) {
        for (let s = subtier; s <= 4; s++) {
          if (t == tier && s == subtier) {
            continue;
          }

          const recoveredWay = this.recoverWay(cells, t, s);
          const transmutationFee = cells[s][t].transmutationFee;
          const income =
            getSellCost(recoveredWay[recoveredWay.length - 1]) *
            (1 - MARKET_SELL_ORDER_FEE / 100);
          const outcome = getBuyCost(recoveredWay[0]) + transmutationFee;
          const profit = income - outcome;
          const profitPercentage = (profit / outcome) * 100;

          bestWays.push({
            profit,
            profitPercentage,
            fee: transmutationFee,
            way: recoveredWay,
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
      let tier = toTier,
        subtier = toSubtier;

      while (tier != 0) {
        let { prevTier, prevSubtier } = cells[subtier][tier];

        path.push([tier, subtier]);
        tier = prevTier;
        subtier = prevSubtier;
      }

      return path.reverse();
    },
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
