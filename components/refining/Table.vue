<template>
  <div>
    <div class="item-table">
      <ItemRecipe />
      <div
        v-for="subtier in (baseItemName != 'STONEBLOCK' ? 5 : 1)"
        :key="subtier"
      >
        <ItemRow 
          :class="`subtier${subtier - 1}`"
          :row="getRow(subtier - 1)" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import ItemRow from './ItemRow';
import { getItemRecipe } from './getItemRecipe';
import { MARKET_SELL_ORDER_FEE } from '../../store/constants';
import ItemRecipe from '~/components/refining/ItemRecipe.vue';

export default {
  name: "Table",
  components: {
    ItemRow,
    ItemRecipe
  },
  data() {
    return {
      /**
       * Values of materials from t4.0 to t8.4
       */
      materialValues: [
        [16, 32, 64, 128, 256],
        [32, 64, 128, 256, 512],
        [64, 128, 256, 512, 1024],
        [128, 256, 512, 1024, 2048],
        [256, 512, 1024, 2048, 4096]
      ]
    }
  },
  computed: {
    ...mapGetters({
      buyRawResources: 'refining/buyRawResources',
      sellMaterials: 'refining/sellMaterials',
      buyMaterials: 'refining/buyMaterials',
      loadingText: 'refining/loadingText',
      returnPercentage: 'refining/returnPercentage'
    }),

    ...mapState({
      settings: state => state.refining.settings,
      baseItemName: state => state.refining.currentItemInfo.name
    })
  },
  methods: {
    /**
     * Calculate item profit and generate data for the tooltip
     */
    getRow(subtier) {
      let row = [];

      for (let tier = 4; tier <= 8; tier++) {
        const itemName = this.getItemName(tier, subtier);
        const recipe = getItemRecipe(this.baseItemName, tier, subtier);
        const fee = this.craftFee(tier, subtier);
        const itemPrice = Math.floor(this.sellMaterials[itemName].sellPriceMin * (1 - MARKET_SELL_ORDER_FEE / 100));
        const rawResourcesPrice = Math.floor(this.buyRawResources[recipe.rawResource.name].sellPriceMin
          * recipe.rawResource.quantity
          * (1 - this.returnPercentage / 100));
        const materialPrice =Math.floor(this.buyMaterials[recipe.material.name].sellPriceMin
          * recipe.material.quantity
          * (1 - this.returnPercentage / 100));
        
        const profit = itemPrice - (rawResourcesPrice + materialPrice + fee);
        const percentageProfit = profit / (rawResourcesPrice + materialPrice + fee) * 100

        row.push({
          name: itemName,
          profit,
          percentageProfit,
          tooltipData: [
            {
              name: itemName,
              percent: -MARKET_SELL_ORDER_FEE,
              price: itemPrice,
              date: this.sellMaterials[itemName].sellPriceMinDate
            }, {
              name: recipe.material.name,
              percent: -this.returnPercentage,
              price: -materialPrice,
              date: this.buyMaterials[recipe.material.name].sellPriceMinDate
            }, {
              name: recipe.rawResource.name,
              percent: -this.returnPercentage,
              price: -rawResourcesPrice,
              date: this.buyRawResources[recipe.rawResource.name].sellPriceMinDate,
              additionalData: recipe.rawResource.quantity
            }, {
              name: 'settings.fee',
              additionalData: this.settings.fee,
              price: -fee,
            }
          ]
        });
      }

      return row;
    },

    /**
     * Calculates fee for refining 1 item
     */
    craftFee(tier, subtier) {
      return Math.ceil(
        this.materialValues[subtier][tier - 4] * this.settings.fee / 100 * 0.1125
      );
    },

    /**
     * Generate item name of current tier and subtier
     */
    getItemName(tier, subtier) {
      return `T${tier}_${this.baseItemName}` + (subtier == 0 ? '' : `_LEVEL${subtier}@${subtier}`);
    },
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