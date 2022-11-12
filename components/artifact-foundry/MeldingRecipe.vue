<template>
  <div class="resources">
    <ImageWithNumber
      :name="sellArtifacts[0].itemId"
      number="1"
    />
    <div class="arrow">
      <svg-icon icon-class="long-arrow-left" />
    </div>
    <Ingredient
      :item-names="allFragmentNames"
      :get-item-by-name="getItemByName('buyFragments')"
      :update-item-by-name="getUpdateItemByName('buyFragments')"
      :main-item-name="allFragmentNames[0]"
      :number-of-ingredients="'36-50'"
    />
  </div>
</template>
  
  <script>
  import Ingredient from "~/components/utils/IngredientPrices/Ingredient.vue";
  import { mapState, mapGetters } from 'vuex';
  import ImageWithNumber from "../utils/ImageWithNumber.vue";
  
  export default {
    name: "MeldingRecipe",
    components: {
      Ingredient,
      ImageWithNumber,
    },
    computed: {
      ...mapGetters({
        allFragmentNames: 'artifactFoundry/getFragmentsNeeded',
        sellArtifacts: 'artifactFoundry/sellArtifacts',
      }),
  
      ...mapState({
        cities: state => state.artifactFoundry.cities,
      })
    },
    methods: {
      /**
       * @param itemGroup - 'sellFragments' | 'buyFragments' | 'sellArtifacts' | 'buyArtifacts'
       */
      getItemByName(itemGroup) {
        return (itemName) =>
          this.$store.getters["artifactFoundry/getItemByName"](itemName, itemGroup);
      },
  
      /**
       * @param itemGroup - 'sellFragments' | 'buyFragments' | 'sellArtifacts' | 'buyArtifacts'
       */
      getUpdateItemByName(itemGroup) {
        return ({ itemName, item }) =>
          this.$store.commit("artifactFoundry/UPDATE_ITEM_BY_ITEM_NAME", {
            itemName,
            item,
            itemGroup
          });
      },
    },
  };
  </script>
  
  <style scoped lang="scss">
  .resources {
    display: flex;
    flex-direction: row;
  }
  
  .arrow {
    display: grid;
    justify-content: center;
    align-content: center;
    padding: 0 var(--space-2-xs);
  }
  </style>