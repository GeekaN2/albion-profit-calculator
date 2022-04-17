<template>
  <div
    :style="cellStyles"
    :class="[
      {
        'cell--profitable': item.profit > 0,
        'cell--unprofitable': item.profit < 0,
        'cell--unknown': item.profit === 0,
      },
      'cell',
    ]"
  >
    <div class="info">
      <span>{{ item.profit | formatPrice }}</span>
      <div class="secondary-info">
        <span class="percentage">{{ item.percentageProfit }}%</span>
        <span v-if="showAverageItems">{{ item.numberOfItemsSold }}/{{ $t('days') }}</span>
      </div>
    </div>
    <div class="warnings">
      <svg-icon
        class="warnings-info"
        icon-class="info"
        alt="i"
      />
      <div class="tooltip">
        <Tooltip
          :class="`tooltip--subtier${itemSubtier}`"
          :data="item.tooltipData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from "../../utils/Tooltip.vue";
import { mapGetters, mapState } from "vuex";

export default {
  name: "ItemCell",
  components: {
    Tooltip,
  },
  filters: {
    /**
     * Format the price for the convenience
     * @param {number} price - number for formatting
     */
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
  props: {
    itemName: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapGetters({
      getItem: "foodAndPotions/getItem",
      itemDump: "foodAndPotions/getItemDumpData",
      getCraftingRequirements: "foodAndPotions/getItemCraftingRequirements",
      getResourceByName: "foodAndPotions/getResourceByName",
      getResourcesNeeded: "foodAndPotions/getResourcesNeeded",
      getReturnPercentage: "foodAndPotions/getReturnPercentage",
      getResourcesNeededForItem: "foodAndPotions/getResourcesNeededForItem",
      getResourceValueByName: "foodAndPotions/getResourceValueByName",
      getAverageDataByItemName: "foodAndPotions/getAverageDataByItemName",
    }),

    ...mapState({
      fee: (state) => state.foodAndPotions.settings.fee,
      showAverageItems: (state) => state.foodAndPotions.settings.showAverageItems,
    }),

    itemTier() {
      return Number(this.itemName.slice(1, 2));
    },

    itemSubtier() {
      return Number(this.itemName.slice(-1)) || 0;
    },

    cellStyles() {
      return {
        "--before-subtier": `var(--subtier${this.itemSubtier})`,
        background: `var(--tier${this.itemTier})`,
      };
    },

    item() {
      const item = this.getItem(this.itemName);
      const averageData = this.getAverageDataByItemName(this.itemName);
      const craftingRequirements = this.getCraftingRequirements(this.itemName);
      const resourcesNeeded = [
        this.getResourcesNeededForItem(this.itemName),
      ].flat();
      const returnPercentage = this.getReturnPercentage;
      let tooltipData = [];

      const amountCrafted = craftingRequirements["@amountcrafted"];
      const sellProfit =
        (amountCrafted * item.sellPriceMin * (100 - 4.5)) / 100;

      tooltipData.push({
        name: item.itemId,
        price: Math.floor(sellProfit),
        percent: -4.5,
        date: item.sellPriceMinDate,
        additionalData: amountCrafted,
      });

      let resourcesWaste = 0;
      let itemValue = 0;

      resourcesNeeded.forEach((resource) => {
        const resourceName = resource["@uniquename"];
        const resourceCount = resource["@count"];
        const resourceData = this.getResourceByName(resourceName);
        const resourceValue = this.getResourceValueByName(resourceName);
        const returnPercentageForResource = resourceName.includes('QUESTITEM_TOKEN_AVALON') ? 0 : returnPercentage;
        const resourceWaste =
          ((resourceData.sellPriceMin * (100 - returnPercentageForResource)) / 100) *
          Number(resourceCount);

        resourcesWaste += resourceWaste;
        itemValue += resourceValue * resourceCount;

        tooltipData.push({
          name: resourceData.itemId,
          price: -Math.floor(resourceWaste),
          percent: -returnPercentageForResource,
          date: resourceData.sellPriceMinDate,
          additionalData: resourceCount,
        });
      });

      let feeWaste = ((itemValue * this.fee) / 100) * 0.1125;

      tooltipData.push({
        name: "settings.fee",
        price: -Math.floor(feeWaste),
        additionalData: this.fee,
      });

      const allWastes = resourcesWaste + feeWaste;
      const finalProfit =
        sellProfit === 0 ? 0 : sellProfit - allWastes;
      const finalPercentageProfit =
        sellProfit === 0 ? 0 : (finalProfit / allWastes) * 100;

      return {
        profit: Math.floor(finalProfit),
        percentageProfit: Number.parseFloat(finalPercentageProfit.toFixed(1)),
        tooltipData,
        numberOfItemsSold: Number.parseFloat((averageData.averageItems || 0).toFixed(1)),
      };
    },
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.cell {
  --offset: 4px;
  --cell-border-width: 2px;

  padding: var(--space-3-xs) var(--space-2-xs);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: relative;

  &::before {
    position: absolute;
    content: "";
    width: calc(100% + var(--cell-border-width));
    height: 120%;
    filter: blur(2.5px);

    top: -10%;
    left: 0;
    background: var(--before-subtier);
    z-index: -1;
  }

  &:first-child::before {
    width: calc(100% + var(--offset) + var(--cell-border-width));
    left: calc(-1 * var(--offset));
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  &:last-child::before {
    width: calc(100% + var(--offset));
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  &--profitable {
    text-shadow: 0.5px 0.5px 0.5px var(--color-profitable-shadow);
    color: var(--color-profitable);

    .base-item-info__secondary-info {
      color: var(--color-profitable-secondary);
    }
  }

  &--unprofitable {
    text-shadow: 0.5px 0.5px 0.5px var(--color-unprofitable-shadow);
    color: var(--color-unprofitable);

    .base-item-info__secondary-info {
      color: var(--color-unprofitable-secondary);
    }
  }

  &--unknown {
    text-shadow: 0.5px 0.5px 0.5px var(--color-unknown-shadow);
    color: var(--color-unknown);

    .base-item-info__secondary-info {
      color: var(--color-unknown-secondary);
    }
  }
}

.info {
  text-align: right;
}

.warnings {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  bottom: 2px;
  right: -1px;
  z-index: 10;
  width: 20px;
  color: var(--color-unknown);

  &:hover .tooltip {
    bottom: 100%;
    opacity: 1;
    visibility: visible;
  }

  &:hover .tooltip:after {
    opacity: 1;
  }
}

.tooltip {
  opacity: 0;
  transition: 0.15s;
  visibility: hidden;

  &--subtier0 {
    transform: translateX(50%);

    &:after {
      right: calc(50% - 5px);
    }
  }
}

.warnings-info {
  width: 10px;
  height: 10px;
}

.info {
  width: 100%;
}

.secondary-info {
  width: 100%;
  background: rgba(0, 0, 0, 0.07);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  font-size: 10px;
  padding-left: 3px;
  gap: var(--space-s);
}
</style>