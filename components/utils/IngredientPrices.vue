<template>
  <div
    v-if="items != {}"
    :class="{
      'ingredient-prices--left': isJournal
    }"
    class="ingredient-prices"
  >
    <template v-for="itemName of itemNames">
      <input 
        :key="itemName" 
        v-model.number="items[itemName].price"
        class="ingredient"
        @change="updatePrice(itemName, items[itemName].price)"
      >
    </template>
  </div>
</template>

<script>
import { createArrayOfAllIngredients } from "../../store/utils";

export default {
  name: "IngredientPrices",
  props: {
    /**
     * Item name to generate all names with all tiers and subtiers
     */
    name: {
      type: String,
      default: "",
    },

    /**
     * Prices getter name
     */
    getterName: {
      type: String,
      default: '',
    },

    /**
     * Setter to update prices
     */
    setterName: {
      type: String,
      default: '',
    }
  },
  computed: {
    isJournal() {
      return this.name.includes('JOURNAL');
    },
    /**
     * All item names
     */
    itemNames() {
      return createArrayOfAllIngredients(this.name).filter(ingredientName => {
        if (this.name.includes('_EMPTY')) {
          return ingredientName.includes('EMPTY');
        }

        if (this.name.includes('_FULL')) {
          return ingredientName.includes('FULL');
        }

        return true;
      });
    },

    /**
     * Items data
     */
    items() {
      return this.$store.getters[this.getterName];
    }
  },
  methods: {
    /**
     * @param itemName - name of item to update store
     * @param price - price to set
     */
    updatePrice(itemName, price) {
      this.$store.commit(this.setterName, { itemName, price });
    }
  }
}
</script>

<style lang="scss">
.ingredient-prices {
  display: grid;
  grid-template-rows: repeat(auto, 1fr);
  grid-template-columns: repeat(5, 1fr);
  box-shadow: 0px 2px 10px #555555;
  opacity: 1;
  border-radius: 10px;
  transition: 0.2s;

  .ingredient {
    width: 5.5rem;
    border: none;
    outline: none;
    text-align: right;
    padding: 2.5px 5px;
    background: transparent;
    font-size: 0.85rem;
    
    &:nth-child(5n + 1) {
      background: var(--tier4);
    }

    &:nth-child(5n+2) {
      background: var(--tier5);
    }

    &:nth-child(5n+3) {
      background: var(--tier6);
    }

    &:nth-child(5n+4) {
      background: var(--tier7);
    }

    &:nth-child(5n) {
      background: var(--tier8);
    }

    &:nth-child(1) {
      border-top-left-radius: inherit;
      box-shadow: -8px 0 3px -3px #a2a2a2;
    } 

    &:nth-child(5) {
      border-top-right-radius: inherit;
    }

    &:last-child {
      border-bottom-right-radius: inherit;
    }

    &:nth-last-child(5) {
      border-bottom-left-radius: inherit;
    }

    &:nth-child(6) {
      box-shadow: -8px 0 3px -3px #6afe90;
    }

    &:nth-child(11) {
      box-shadow: -8px 0 3px -3px #4bc8d2;
    }

    &:nth-child(16) {
      box-shadow: -8px 0 3px -3px  #b987f7;
    }
  }

  &:after {
    content: '';
    width: 10px;
    height: 10px;
    background: #9bc8e2;
    box-shadow: 0px 0px 3px #555555;
    z-index: -1;
    position: absolute;
    left: 20px;
    bottom: -5px;
    transform: rotate(45deg)
  }

  &--left:after {
    left: auto;
    right: 20px;
    background: #f5f5f5;
  }
}

@media (max-width: 1200px) {
  .ingredient-prices {
    .ingredient {
      width: 5.5rem;
    }
  }
}

@media (max-width: 991px) {
  .ingredient-prices {
    .ingredient {
      width: 5rem;
      font-size: 0.8rem;
    }
  }
}

@media (max-width: 840px) {
  .ingredient-prices {
    

    .ingredient {
      font-size: 0.75rem;
      width: 4.5rem;
    }
  }
}

@media (max-width: 479px) {
  .ingredient-prices {
    .ingredient {
       font-size: 0.7rem;
      width: 4rem;
    }
  }
}
</style>