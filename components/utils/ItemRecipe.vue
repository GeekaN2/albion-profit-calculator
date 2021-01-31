<template>
  <div class="item-recipe">
    <template 
      v-for="(value, material, index) in this['tree/getRecipe']"
    >
      <Ingredient 
        :key="material"
        :name="`T4_${material}`" 
        :number-of-ingredients="`${value}`"
        :show-prices="nameToShowPrices == `T4_${material}`"
        :index="index"
        @show="showIngredientPricesTable"
        @hide="hideIngredientPricesTable"
      />
    </template>
    <Ingredient 
      v-if="this['tree/isArtifactItem']"
      :name="this['tree/getArtifactName'](4)"
      :number-of-ingredients="numberOfArtifacts"
      :show-prices="nameToShowPrices == this['tree/getArtifactName'](4)"
      :index="2"
      @show="showIngredientPricesTable"
      @hide="hideIngredientPricesTable"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Ingredient from './Ingredient'


export default {
  name: "ItemRecipe",
  components: {
    Ingredient
  },
  data() {
    return {
      /**
       * Show ingredient prices table for this item
       */
      nameToShowPrices: ''
    }
  },
  computed: {
    /**
     * Generate number of artifacts
     * 
     * @returns number of artifcats or range
     */
    numberOfArtifacts() {
      let amountOfMaterials = 0;

      for (let material in this['tree/getRecipe']) {
        amountOfMaterials += this['tree/getRecipe'][material];
      }

      if (this['tree/getArtifactName'](4).includes('ROYAL')) {
        return `${amountOfMaterials / 4}-${amountOfMaterials}`;
      }

      return '1';
    },

    ...mapGetters([
      "tree/getRecipe",
      "tree/isArtifactItem",
      "tree/getArtifactName"
    ])
  },
  methods: {
    /**
     * Change local state to show prices table
     * 
     * @param name - new item name to show table
     */
    showIngredientPricesTable(name) {
      this.nameToShowPrices = name;
    },

    /**
     * Hide prices table
     */
    hideIngredientPricesTable() {
      this.nameToShowPrices = '';
    }
  }
};
</script>

<style lang="scss">
.item-recipe {
  display: flex;

  img {
    min-width: 40px;
  }
}
</style>