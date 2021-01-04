<template>
  <div>
    <div class="first-table">
      <template v-for="item in getItems">
        {{ item.sellPriceMin }}/{{ getItemProfitFirst(item) }} | 
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: "Table",
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
        [0, 375, 1200, 3600, 12500],
        [0, 750, 1200, 2500, 10200],
        [0, 2100, 3200, 5100, 20400],
        [0, 8400, 12800, 20400, 40800]
      ]
    };
  },
  computed: {
    ...mapGetters({
      getItems: 'transmutations/getItems'
    }),

    ...mapState({
      settings: state => state.transmutations.settings
    })
  },
  methods: {
    getValue(tier, subtier) {
      return this.values[subtier][tier - 4];
    },

    getItemTransCostPrevTierFormula(tier, subtier) {
      return this.transCostPrevTierFormula[subtier][tier - 4]
    },

    getItemTransCostPrevSubtierFormula(tier, subtier) {
      return this.getValue(tier, subtier) * (subtier * 50 - !(subtier % 2) * 25);
    },

    getItemProfitFirst(item) {
      const tier = Number(item.itemId.slice(1, 2));
      const subtier = Number(item.itemId.slice(-1)) || 0;
      const itemTransCost = this.getItemTransCostPrevTierFormula(tier, subtier);
      const goldPrice = this.settings.gold;
      const value = this.getValue(tier, subtier);
      const fee = this.settings.fee;

      const transmutationCost = itemTransCost - (itemTransCost * (3000 - goldPrice) / 3000) + (value * 5 * fee)

      return transmutationCost;
    }
  }
};
</script>

<style>
.first-table {
  width: 100%;
}
</style>