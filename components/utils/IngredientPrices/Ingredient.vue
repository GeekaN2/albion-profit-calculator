<template>
  <div 
    v-click-outside="hidePrices"
    class="ingredient"
  >
    <ImageWithNumber
      :name="mainItemName" 
      :number="numberOfIngredients"
      class="image"
      @click.native="togglePrices"
    />
    <transition name="ascent">
      <div 
        v-if="isShowingPrices"
        class="prices"
      >
        <template v-for="itemName of itemNames">
          <input 
            :key="itemName" 
            :value="getItemPrice(itemName)"
            :class="[getItemTierClass(itemName), getItemSubtierClass(itemName), 'item']"
            :style="{
              gridArea: getItemAreaByName(itemName),
            }"
            @input="updateItemPrice($event, itemName)"
          >
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
import ImageWithNumber from '~/components/utils/ImageWithNumber.vue';
import { getItemTierByName, getItemSubtierByName } from '~/store/utils';
import { HANDWRITTEN_PRICE_DATE } from '~/store/constants';

export default {
  name: 'Ingredient',
  components: {
    ImageWithNumber
  },
  props: {
    itemNames: {
      type: Array,
      default: () => [],
    },

    numberOfIngredients: {
      type: String,
      default: '0',
    },

    mainItemName: {
      type: String,
      default: '',
    },

    getItemByName: {
      type: Function, // (itemName: string) => ResponseModel | undefined,
      default: () => {},
    },

    updateItemByName: {
      type: Function, // (item: ResponseModel) => void;
      default: () => {},
    },
  },
  data() {
    return {
      isShowingPrices: false,
    }
  },
  computed: {
    getItemPrice() {
        return (itemName) => {
          const item = this.getItemByName(itemName);

          return item?.sellPriceMin || 0;
        };
    },
  },
  methods: {
    updateItemPrice(event, itemName) {
      const item = this.getItemByName(itemName);

      this.updateItemByName({
        itemName,
        item: {
          ...item,
          sellPriceMinDate: HANDWRITTEN_PRICE_DATE,
          sellPriceMin: Number(event.target.value) || 0,
        }
      })
    },

    getItemTierClass(itemName) {
      return `item-tier-${getItemTierByName(itemName)}`;
    },

    getItemSubtierClass(itemName) {
      return `item-subtier-${getItemSubtierByName(itemName)}`
    },

    getItemAreaByName(itemName) {
      return `t${getItemTierByName(itemName)}s${getItemSubtierByName(itemName)}`;
    },

    showPrices() {
      this.isShowingPrices = true;
    },

    hidePrices() {
      this.isShowingPrices = false;
    },
  
    togglePrices( ) {
      this.isShowingPrices ? this.hidePrices() : this.showPrices();
    },
  }
}
</script>

<style scoped lang="scss">
.ingredient {
  position: relative;
}

.prices {
  position: absolute;
  z-index: 10;
  display: grid;
  grid-template-areas:
    't1s0 t2s0 t3s0 t4s0 t5s0 t6s0 t7s0 t8s0'
    't1s1 t2s1 t3s1 t4s1 t5s1 t6s1 t7s1 t8s1'
    't1s2 t2s2 t3s2 t4s2 t5s2 t6s2 t7s2 t8s2'
    't1s3 t2s3 t3s3 t4s3 t5s3 t6s3 t7s3 t8s3'
    't1s4 t2s4 t3s4 t4s4 t5s4 t6s4 t7s4 t8s4';
  overflow: hidden;
  border-radius: var(--radius-xs);
  box-shadow: 0px 0px 3px var(--color-primary-analog-contrast);
  bottom: calc(100% + 5px);
  background: var(--color-primary-analog);
}

.image {
  cursor: pointer;
}

.item {
  border: none;
  outline: none;
  display: block;
  position: relative;
  margin: 0;
  padding: var(--space-3-xs) var(--space-2-xs);
  text-align: right;
  width: 90px;
  opacity: 1;

  &-tier {
    &-1 {
      background: var(--tier1);
    }

    &-2 {
      background: var(--tier2);
    }

    &-3 {
      background: var(--tier3);
    }

    &-4 {
      background: var(--tier4);
    }

    &-5 {
      background: var(--tier5);
    }

    &-6 {
      background: var(--tier6);
    }

    &-7 {
      background: var(--tier7);
    }

    &-8 {
      background: var(--tier8);
    }
  }

  &-subtier {
    &-0 {
      border-left: 4px solid var(--subtier0);
    }

    &-1 {
      border-left: 4px solid var(--subtier1);

    }

    &-2 {
      border-left: 4px solid var(--subtier2);
    }

    &-3 {
      border-left: 4px solid var(--subtier3);
    }

    &-4 {
      border-left: 4px solid var(--subtier4);
    }
  }
}

.ascent-enter-active, .ascent-leave-active {
  transition: 0.15s;
}

.ascent-enter, .ascent-leave-to {
  opacity: 0;
  bottom: calc(100% - 5px);
}

.ascent-enter-to {
  opacity: 1;
  bottom: calc(100% + 5px);
}
</style>