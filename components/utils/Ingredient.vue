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
    <IngredientPrices
      v-click-outside="hide"
      v-if="isLoaded"
      v-show="showPrices"
      :name="name"
      :index="index"
      class="prices-table"
    />
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
    name: {
      type: String,
      default: "",
    },
    numberOfIngredients: {
      type: String,
      default: '0',
    },
    showPrices: {
      type: Boolean,
      default: false
    },
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
    click() {
      if (!this.showPrices) {
        this.$emit('show', this.name);
      } else {
        this.hide();
      }
    },

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
  top: 100%;
  left: 0;
  z-index: 11;
}
</style>