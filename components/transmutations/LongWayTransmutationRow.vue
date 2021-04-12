<template>
  <div class="transmutation-way-row">
    <div class="item-info">
      {{ transmutationRowData.profit | formatFloat }} <br>
      {{ transmutationRowData.profitPercentage | formatFloat }}%
    </div>
    <div class="way-images">
      <template v-for="[tier, subtier] of transmutationRowData.way">
        <ImageWithoutNumber 
          :key="getItemName(tier, subtier)"
          :name="getItemName(tier, subtier)"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ImageWithoutNumber from '../utils/ImageWithoutNumber';

export default {
  name: "LongWayTransmutationRow",
  components: {
    ImageWithoutNumber
  },
  filters: {
    /**
     * Format float number
     * 
     * @param {number} - number to format
     * @returns {number}
     */
    formatFloat(num) {
      return Math.round(num) == num ? num : parseFloat(num.toFixed(2));
    }
  },
  props: {
    /**
     * Data that we need to show the transmutation row
     */
    transmutationRowData: {
      type: Object,
      default: () => {
        return {
          profit: 0,
          percentageProfit: 0,
          fee: 0,
          way: [],
        };
      },
    },
  },
  computed: {
    ...mapGetters({
      getItemName: 'transmutations/getItemName'
    })
  }
};
</script>

<style>
.transmutation-way-row {
  display: flex;
  justify-content: left;
  align-content: center;
}

.item-info {
  min-width: 100px;
  display: flex;
  justify-content: flex-end;
}

.way-images {
  display: flex
}
</style>