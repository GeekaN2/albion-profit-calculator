<template>
  <div>
    <div class="item-table">
      <MeldingRecipe />
      <div
        v-for="branch in ['WARRIOR_BRANCH', 'HUNTER_BRANCH', 'MAGE_BRANCH', 'ALL']"
        :key="branch"
        class="af-branch"
      >
        <img
          class="branch-image"
          :src="`/images/${branch}.png`"
        >
        <ItemRow 
          :class="`branch-${branch}`"
          :row="getRow(branch)" 
        />
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { mapGetters } from 'vuex';
  import MeldingRecipe from './MeldingRecipe.vue';
  import ItemRow from './ItemRow';
  
  export default {
    name: "Table",
    components: {
      ItemRow,
      MeldingRecipe,
    },
    computed: {
      ...mapGetters({
        getFragmentsMeldProfit: 'artifactFoundry/getFragmentsMeldProfit',
      }),
    },
    methods: {
      /**
       * Calculate item profit and generate data for the tooltip
       * @param branch
       */
      getRow(branch) {
        let row = [];
  
        for (let tier = 4; tier <= 8; tier++) {
          const cellData = this.getFragmentsMeldProfit(branch, tier);

          row.push(cellData);
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

  .af-branch {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--space-xs);
  }

  .branch-image {
    width: 30px;
    height: 40px;
    filter: contrast(80%) drop-shadow(0px 0px 1px var(--color-secondary));
  }
  </style>