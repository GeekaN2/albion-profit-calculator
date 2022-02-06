<template>
  <div class="transmutation-way-row">
    <div class="item-info">
      <div 
        :class="{
          'item-info__main--profitable': transmutationRowData.profit > 0,
          'item-info__main--unprofitable': transmutationRowData.profit < 0
        }"
        class="item-info__main"
      >
        <div class="item-info__profit">
          {{ transmutationRowData.profit | formatPrice }}
        </div>
        <div class="item-info__additional-data">
          {{ transmutationRowData.profitPercentage | formatFloat }}%
        </div>
      </div>
      <div class="item-info__all-info all-info">
        <img
          class="all-info__icon"
          src="/images/info.svg"
          alt="i"
        >
        <div class="all-info__tooltip tooltip tooltip--right">
          <Tooltip 
            :data="tooltipData"
          />
        </div>
      </div>
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
import { mapGetters, mapState } from 'vuex';
import ImageWithoutNumber from '../utils/ImageWithoutNumber';
import Tooltip from '../utils/Tooltip';

export default {
  name: "LongWayTransmutationRow",
  components: {
    ImageWithoutNumber,
    Tooltip
  },
  filters: {
    /**
     * Format the price for the convenience
     * nb 
     * @param {number} price - number for formatting
     */
    formatPrice(price) {
      return Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

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
      sellItemPrices: 'transmutations/sellItemPrices',
      buyItemPrices: 'transmutations/buyItemPrices',
      getItemName: 'transmutations/getItemName'
    }),

    ...mapState({
      settings: state => state.transmutations.settings
    }),

    tooltipData() {
      let [fromTier, fromSubtier] = this.transmutationRowData.way[0];
      let [toTier, toSubtier] = this.transmutationRowData.way[this.transmutationRowData.way.length - 1];

      return [
        {
          name: this.getItemName(toTier, toSubtier),
          price: Math.round(this.sellItemPrices[this.getItemName(toTier, toSubtier)].sellPriceMin * (1 - 4.5 / 100)),
          percent: 4.5,
          date: this.sellItemPrices[this.getItemName(toTier, toSubtier)].sellPriceMinDate
        }, {
          name: this.getItemName(fromTier, fromSubtier),
          price: -this.buyItemPrices[this.getItemName(fromTier, fromSubtier)].sellPriceMin,
          date: this.buyItemPrices[this.getItemName(fromTier, fromSubtier)].sellPriceMinDate
        }, {
          name: 'settings.fee',
          price: -Math.round(this.transmutationRowData.fee),
          additionalData: this.settings.fee
        }
      ];; 
    }
  }
};
</script>

<style scoped lang="scss">
.transmutation-way-row {
  display: flex;
  justify-content: left;
  align-items: center;
}

.item-info {
  min-width: 100px;
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-3-xs);
  padding: 2px 5px 2px 15px;
  margin: 10px 0 10px 10px;
  background: linear-gradient(to right, #eee 0%, #eee 70%, #ffffff00 100%);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;

  &__main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    &--profitable {
      text-shadow: .4px 0 .4px var(--color-profitable-shadow);
      color: var(--color-profitable);
    }

    &--unprofitable {
      text-shadow: .4px 0 .4px var(--color-unprofitable-shadow);
      color: var(--color-unprofitable);
    }
  }

  &__all-info {
    position: relative;
    display: flex;
    justify-content: center;
    width: 15px;
  }

  &__additional-data {
    font-size: 0.75rem;
  }
}

.all-info {
  position: relative;

  &__icon {
    height: 15px;
    width: 15px;
  }

  &__tooltip {
    position: absolute;
    bottom: 27px;
    transition: 0.15s;
    opacity: 0;
    visibility: hidden;
  }

  &:hover &__tooltip {
    z-index: 2;
    opacity: 1;
    visibility: visible;
  }

  &:hover &__tooltip:after {
    opacity: 1;
  }
}

.way-images {
  display: flex
}
</style>