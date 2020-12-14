<template>
  <div class="ingredient">
    <ImageWithNumber
      :name="name" 
      :number="numberOfIngredients"
      @click.native="click"
    />
    <IngredientPrices
      v-show="showPrices"
      :name="name"
      class="prices-table"
    />
  </div>
</template>

<script>
import ImageWithNumber from "./ImageWithNumber";
import IngredientPrices from "./IngredientPrices";

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
    }
  },
  methods: {
    click() {
      if (!this.showPrices) {
        this.$emit('show', this.name);
      } else {
        this.$emit('hide');
      }
    }
  }
};
</script>

<style>
.ingredient {
  position: relative;
}
.prices-table {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
}
</style>