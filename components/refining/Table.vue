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
  computed: {
    ...mapGetters({
      buyRawResources: 'refining/buyRawResources',
      sellMaterials: 'refining/sellMaterials',
      buyMaterials: 'refining/buyMaterials',
      loadingText: 'refining/loadingText'
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

        row.push({
          name: itemName,
          profit: 1000,
          percentageProfit: 78,
          tooltipData: [
            {
              name: itemName,
              percent: -4.5,
              price: 88000,
              date: new Date(Date.now())
            }
          ]
        });
      }

      return row;
    },

    getItemName(tier, subtier) {
      return `T${tier}_${this.baseItemName}` + (subtier == 0 ? '' : `_LEVEL${subtier}@${subtier}`);
    },

    getItemRecipe(tier, subtier) {
      let rawResource = `T${tier}_${getRawResourceNameByMaterial(this.baseItemName)}` + 
        (subtier == 0 ? '' : `_LEVEL${subtier}@${subtier}`);
      let material = `T${tier - 1}_${this.baseItemName}`;

      if (tier != 4) {
        material = material + `_LEVEL${subtier}@${subtier}`;
      }

      let recipe = {};

      recipe[rawResource] = Math.min(tier - 2, 5);
      recipe[material] = 1;

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