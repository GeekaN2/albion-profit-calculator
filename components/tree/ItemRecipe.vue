<template>
  <div class="item-recipe">
    <template v-if="!rightSide">
      <template 
        v-for="(value, material, index) in this['tree/getRecipe']"
      >
        <Ingredient 
          :key="material"
          :name="`T4_${material}`" 
          :number-of-ingredients="`${value}`"
          :show-prices="nameToShowPrices == `T4_${material}`"
          :getter-name="getterByIndex(index)"
          :setter-name="setterByIndex(index)"
          @show="showIngredientPricesTable"
          @hide="hideIngredientPricesTable"
        />
      </template>
      <Ingredient 
        v-if="this['tree/isArtifactItem']"
        :name="this['tree/getArtifactName'](4)"
        :number-of-ingredients="numberOfArtifacts"
        :show-prices="nameToShowPrices == this['tree/getArtifactName'](4)"
        getter-name="tree/getArtefacts"
        setter-name="tree/UPDATE_ARTIFACT"
        @show="showIngredientPricesTable"
        @hide="hideIngredientPricesTable"
      />
    </template>
    <template v-if="rightSide">
      <Ingredient 
        v-if="this['tree/areHeartsNeeded']"
        :name="this['tree/getHeartName']"
        number-of-ingredients="1-10"
        :show-prices="nameToShowPrices == this['tree/getHeartName']"
        getter-name="tree/getHearts"
        setter-name="tree/UPDATE_HEARTS"
        @show="showIngredientPricesTable"
        @hide="hideIngredientPricesTable"
      />
      <Ingredient 
        :name="this['tree/getJournalName'](4) + '_EMPTY'"
        :show-prices="nameToShowPrices == this['tree/getJournalName'](4) + '_EMPTY'"
        getter-name="tree/getEmptyJournals"
        setter-name="tree/UPDATE_JOURNAL"
        @show="showIngredientPricesTable"
        @hide="hideIngredientPricesTable"
      />
      <Ingredient 
        :name="this['tree/getJournalName'](4) + '_FULL'"
        :show-prices="nameToShowPrices == this['tree/getJournalName'](4) + '_FULL'"
        getter-name="tree/getFullJournals"
        setter-name="tree/UPDATE_JOURNAL"
        @show="showIngredientPricesTable"
        @hide="hideIngredientPricesTable"
      />
    </template>
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
  props: {
    rightSide: {
      type: Boolean,
      default: false
    }
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
      "tree/getArtifactName",
      "tree/getJournalName",
      "tree/areHeartsNeeded",
      "tree/getHeartName"
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
    },

    /**
     * Take a getter by index, for flexibility
     * 
     * @param index
     */
    getterByIndex(index) {
      switch(index) {
        case 0: return 'tree/getFirstResources';
        case 1: return 'tree/getSecondResources';
      }
    },

    /**
     * Take a setter by index
     * 
     * @param index
     */
    setterByIndex(index) {
      switch(index) {
        case 0: return 'tree/UPDATE_FIRST_RESOURCE_ITEM';
        case 1: return 'tree/UPDATE_SECOND_RESOURCE_ITEM';
      }
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