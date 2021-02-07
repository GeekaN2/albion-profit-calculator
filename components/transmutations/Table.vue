<template>
  <div>
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
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import ItemRow from './ItemRow';

export default {
  name: "Table",
  components: {
    ItemRow
  },
  data() {
    return {
      resources: ["ORE", "HIDE", "FIBER", "WOOD", "ROCK"],
      values: [
        [4, 5, 8, 12, 25],
        [12, 10, 16, 25, 51],
        [24, 21, 32, 51, 102],
        [48, 42, 64, 102, 204]
      ],
      transCostPrevTierFormula: [
        [0, 375, 600, 1200, 5000],
        [0, 750, 1200, 2500, 10200],
        [0, 2100, 3200, 5100, 20400],
        [0, 8400, 12800, 20400, 40800]
      ],
      /**
       * It's a bit weird but rocks only have pr  ev tier formula
       */
      rockTransCost: [0, 375, 1200, 3600, 12500]
    };
  },
  computed: {
    ...mapGetters({
      sellItems: 'transmutations/sellItemPrices',
      buyItems: 'transmutations/buyItemPrices',
      loadingText: 'transmutations/loadingText'
    }),

    ...mapState({
      settings: state => state.transmutations.settings,
      baseItemName: state => state.transmutations.currentItemInfo.name
    })
  },
  methods: {
    getValue(tier, subtier) {
      return this.values[subtier][tier - 4];
    },

    getItemTransCostPrevTierFormula(tier, subtier) {
      if (this.baseItemName == 'ROCK') {
        return this.rockTransCost[tier - 4];
      }

      return this.transCostPrevTierFormula[subtier][tier - 4]
    },

    getItemTransCostPrevSubtierFormula(tier, subtier) {
      return this.getValue(tier, subtier) * (subtier * 50 - !(subtier % 2) * 25);
    },

    getItemProfitFirst(item, formula) {
      const tier = Number(item.itemId.slice(1, 2));
      const subtier = Number(item.itemId.slice(-1)) || 0;
      const itemTransCost = formula(tier, subtier);
      const goldPrice = this.settings.gold;
      const value = this.getValue(tier, subtier);
      const fee = this.settings.fee;

      const transmutationCost = itemTransCost - (itemTransCost * (3000 - goldPrice) / 3000) + (value * fee / 20)

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
        const fee = Math.floor(this.getItemProfitFirst(item, this.getItemTransCostPrevTierFormula));
        const materialName = `T${tier - 1}_${this.baseItemName}` + 
          (subtier == 0 ? '' : `_LEVEL${subtier}@${subtier}`);
        const material = this.buyItems[materialName];
        const profit = price == 0 ? 0 : price - fee - material.sellPriceMin;
        const percentageProfit = price == 0 ? 0 : profit / fee * 100;

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
        const fee = Math.floor(this.getItemProfitFirst(item, this.getItemTransCostPrevSubtierFormula));
        const materialName = `T${tier}_${this.baseItemName}` + 
        (subtier - 1 <= 0 ? '' : `_LEVEL${subtier - 1}@${subtier - 1}`);
        const material = this.buyItems[materialName];
        const profit = price == 0 ? 0 : price - fee - material.sellPriceMin;
        const percentageProfit = price == 0 ? 0 : profit / fee * 100;

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
    }
  }
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
</style>