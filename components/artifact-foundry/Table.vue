<template>
  <div>
    <div class="item-table">
      <div
        v-for="branch in ['WARRIOR_BRANCH', 'HUNTER_BRANCH', 'MAGE_BRANCH', 'ALL']"
        :key="branch"
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
  import { mapGetters, mapState } from 'vuex';
  import ItemRow from './ItemRow';
  
  export default {
    name: "Table",
    components: {
      ItemRow,
    },
    computed: {
      ...mapGetters({
        getFragmentsMeldProfit: 'artifactFoundry/getFragmentsMeldProfit',
      }),
  
      ...mapState({
        settings: state => state.refining.settings,
        fragmentType: state => state.refining.currentItemInfo.name
      })
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
          console.log('cell data', cellData);

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
  </style>f