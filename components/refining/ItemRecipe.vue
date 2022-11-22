<template>
  <div class="resources">
    <Ingredient
      :item-names="allSellMaterialNames"
      :get-item-by-name="getItemByName('sellMaterials')"
      :update-item-by-name="getUpdateItemByName('sellMaterials')"
      :main-item-name="getRecipe(5, 0).material.name"
      :number-of-ingredients="'1'"
    />
    <div class="arrow">
      <svg-icon icon-class="long-arrow-left" />
    </div>
    <Ingredient
      :item-names="allBuyMaterialNames"
      :get-item-by-name="getItemByName('buyMaterials')"
      :update-item-by-name="getUpdateItemByName('buyMaterials')"
      :main-item-name="getRecipe(4, 0).material.name"
      :number-of-ingredients="'1'"
    />
    <Ingredient
      :item-names="allRawResourceNames"
      :get-item-by-name="getItemByName('buyRawResources')"
      :update-item-by-name="getUpdateItemByName('buyRawResources')"
      :main-item-name="getRecipe(4, 0).rawResource.name"
      :number-of-ingredients="'2-5'"
    />
  </div>
</template>

<script>
import Ingredient from "~/components/utils/IngredientPrices/Ingredient.vue";
import { getItemRecipe, getMaterialName } from './getItemRecipe';
import { mapState } from 'vuex';

export default {
  name: "ItemRecipe",
  components: {
    Ingredient,
  },
  computed: {
    allRecipes() {
      const numberOfSubtiers = this.baseItemName != 'STONEBLOCK' ? 5 : 1;
      const recipes = [];

      for (let tier = 4; tier <= 8; tier++) {
        for (let subtier = 0; subtier < numberOfSubtiers; subtier++) {
          const recipe = this.getRecipe(tier, subtier);

          recipes.push(recipe);
        }
      }

      return recipes;
    },

    allRawResourceNames() {
      return this.allRecipes.map(recipe => recipe.rawResource.name);
    },

    allBuyMaterialNames() {
      return [...new Set(this.allRecipes.map(recipe => recipe.material.name))];
    },

    allSellMaterialNames() {
      const names = [];
      const numberOfSubtiers = this.baseItemName != 'STONEBLOCK' ? 5 : 1;

      for (let tier = 4; tier <= 8; tier++) {
        for (let subtier = 0; subtier < numberOfSubtiers; subtier++) {
          names.push(getMaterialName(this.baseItemName, tier, subtier));
        }
      }

      return names;
    },

    ...mapState({
      cities: state => state.refining.cities,
      baseItemName: state => state.refining.currentItemInfo.name,
    })
  },
  methods: {
    getRecipe(tier, subtier) {
      return getItemRecipe(this.baseItemName, tier, subtier);
    },
  
    /**
     * @param itemGroup - 'sellMaterials' | 'buyMaterials' | 'buyRawResources'
     */
    getItemByName(itemGroup) {
      return (itemName) =>
        this.$store.getters["refining/getItemByName"](itemName, itemGroup);
    },

    /**
     * @param itemGroup - 'sellMaterials' | 'buyMaterials' | 'buyRawResources'
     */
    getUpdateItemByName(itemGroup) {
      return ({ itemName, item }) =>
        this.$store.commit("refining/UPDATE_ITEM_BY_ITEM_NAME", {
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