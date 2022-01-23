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
      <span>{{ item.profit }}</span>
      <div class="secondary-info">
        <span class="percentage">{{ item.percentageProfit }}%</span>
      </div>
    </div>
    <div class="warnings">
      <img class="warnings-info" src="/images/info.svg" alt="i" />
      <div :class="['tooltip', `tooltip--tier${itemName.slice(1, 2)}`]">
        <Tooltip :data="item.tooltipData" />
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
    }),

    ...mapState({
      fee: (state) => state.foodAndPotions.settings.fee,
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
      const dumpData = this.itemDump(this.itemName);
      const craftingRequirements = this.getCraftingRequirements(this.itemName);
      const resourcesNeeded = [this.getResourcesNeededForItem(this.itemName)].flat();
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
        const resourceCount = resource['@count'];
        const resourceData = this.getResourceByName(resourceName);
        const resourceValue = this.getResourceValueByName(resourceName);
        const resourceWaste =
          (resourceData.sellPriceMin * (100 - returnPercentage)) / 100 * Number(resourceCount);

        resourcesWaste += resourceWaste;
        itemValue += resourceValue * resourceCount;

        tooltipData.push({
          name: resourceData.itemId,
          price: -Math.floor(resourceWaste),
          percent: -returnPercentage,
          date: resourceData.sellPriceMinDate,
          additionalData: resourceCount,
        });
      });

      let feeWaste = itemValue * this.fee / 100 * 0.1125;

      tooltipData.push({
        name: 'settings.fee',
        price: -Math.floor(feeWaste),
        additionalData: this.fee,
      });

      const finalProfit = sellProfit === 0 ? 0 : sellProfit - resourcesWaste - feeWaste;
      const finalPercentageProfit = sellProfit === 0 ? 0 : finalProfit / sellProfit * 100;

      return {
        profit: Math.floor(finalProfit),
        percentageProfit: Number.parseFloat(finalPercentageProfit.toFixed(1)),
        tooltipData,
      };
    },
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.cell {
  --offset: 4px;

  padding: var(--space-3-xs) var(--space-2-xs);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: relative;

  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 120%;
    filter: blur(3px);

    top: -10%;
    left: 0;
    background: var(--before-subtier);
    z-index: -1;
  }

  &:first-child::before {
    width: calc(100% + var(--offset));
    left: calc(-1 * var(--offset));
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  &:last-child::before {
    width: calc(100% + var(--offset));
    right: calc(-1 * var(--offset));
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  &--profitable {
    text-shadow: 0.5px 0.5px 0.5px var(--profitable-color-shadow);
    color: var(--profitable-color);

    .base-item-info__secondary-info {
      color: var(--profitable-color-secondary);
    }
  }

  &--unprofitable {
    text-shadow: 0.5px 0.5px 0.5px var(--unprofitable-color-shadow);
    color: var(--unprofitable-color);

    .base-item-info__secondary-info {
      color: var(--unprofitable-color-secondary);
    }
  }

  &--unknown {
    text-shadow: 0.5px 0.5px 0.5px var(--unknown-color-shadow);
    color: var(--unknown-color);

    .base-item-info__secondary-info {
      color: var(--unknown-color-secondary);
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
  height: 100%;
  bottom: -1px;
  right: -1px;
  z-index: 10;
  width: 20px;

  &:hover .tooltip {
    bottom: 100%;
    opacity: 1;
    visibility: visible;
  }

  &:hover .tooltip:after {
    opacity: 1;
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
}

.percentage {
  width: 100%;
  background: rgba(0, 0, 0, 0.07);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  font-size: 10px;
  padding-left: 3px;
  gap: 7px;
}
</style>