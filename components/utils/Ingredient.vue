<template>
  <div 
    class="ingredient"
  >
    <ImageWithNumber
      :name="name" 
      :number="numberOfIngredients"
      class="ingredient__image"
      @click.native.stop="click"
    />
    <transition name="prices">
      <IngredientPrices
        v-if="isLoaded"
        v-show="showPrices"
        v-click-outside="hide"
        :name="name"
        :index="index"
        class="prices-table"
      />
    </transition>
  </div>
</template>

<script>
import ImageWithNumber from "./ImageWithNumber";
import IngredientPrices from "./IngredientPrices";
import { mapGetters } from 'vuex';

export default {
  name: "Ingredient",
  components: {
    ImageWithNumber,
    IngredientPrices
  },
  props: {
    /**
     * Item name to show image
     */
    name: {
      type: String,
      default: "",
    },

    /**
     * Number of ingredients required (can be a range of
     */
    numberOfIngredients: {
      type: String,
      default: '1',
    },

    /**
     * Show ingredient prices or not
     */
    showPrices: {
      type: Boolean,
      default: false
    },

    /**
     * Number of ingredient position to use the correct data in the table
     */
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters({
      isLoaded: "tree/isLoaded"
    })
  },
  methods: {
    /**
     * Show or hide table with ingredient prices
     */
    click() {
      if (!this.showPrices) {
        this.$emit('show', this.name);
      } else {
        this.hide();
      }
    },

    /**
     * Hide table with ingredient prices
     */
    hide() {
      if (this.showPrices) {
        this.$emit('hide');
      }
    }
  }
};
</script>

<style lang="scss">
.ingredient {
  position: relative;
  
  &__image {
    cursor: pointer;
  }
}
.prices-table {
  position: absolute;
  bottom: calc(100% + 5px);
  left: 0;
  z-index: 8;
}

.prices-enter-active, .prices-leave-active {
  transition: 0.15s;
}
.prices-enter, .prices-leave-to {
  opacity: 0;
  bottom: calc(100% - 5px);
}
</style>