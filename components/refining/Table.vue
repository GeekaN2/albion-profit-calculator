<template>
  <div>
    <div class="item-table">
      <div
        v-for="subtier in (baseItemName != 'STONEBLOCK' ? 4 : 1)"
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
import { getRawResourceNameByMaterial } from '../../store/utils';

export default {
  name: "Table",
  components: {
    ItemRow
  },
  data() {
    return {
      /**
       * Values of materials from t4.0 to t8.3 
       */
      materialValues: [
        [14, 30, 62, 126, 254],
        [30, 61, 125, 253, 509],
        [54, 118, 246, 502, 1014],
        [102, 229, 485, 997, 2021]
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
    getRow(subtier) {
      let row = [];

      for (let tier = 4; tier <= 8; tier++) {
        const itemName = this.getItemName(tier, subtier);
        const recipe = this.getItemRecipe(tier, subtier);
        const fee = this.craftFee(tier, subtier);

        const itemPrice = Math.floor(this.sellMaterials[itemName].sellPriceMin * (1 - 4.5 / 100));
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
              percent: -4.5,
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
              date: this.buyRawResources[recipe.rawResource.name].sellPriceMinDate
            }, {
              name: 'settings.fee',
              percent: this.settings.fee,
              price: -fee,
            }
          ]
        });
      }

      return row;
    },

    craftFee(tier, subtier) {
      return Math.floor(
        this.materialValues[subtier][tier - 4] / 20 * this.settings.fee
      );
    },

    getItemName(tier, subtier) {
      return `T${tier}_${this.baseItemName}` + (subtier == 0 ? '' : `_LEVEL${subtier}@${subtier}`);
    },

    getItemRecipe(tier, subtier) {
      let rawResource = `T${tier}_${getRawResourceNameByMaterial(this.baseItemName)}` + 
        (subtier == 0 ? '' : `_LEVEL${subtier}@${subtier}`);
      let material = `T${tier - 1}_${this.baseItemName}`;

      if (tier != 4 && subtier > 0) {
        material = material + `_LEVEL${subtier}@${subtier}`;
      }

      let recipe = {};

      recipe.rawResource = {
        name: rawResource,
        quantity: Math.min(tier - 2, 5)
      };

      recipe.material = {
        name: material,
        quantity: 1
      }

      return recipe;
    },

    getItem(tier, subtier) {
      return 'a';
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