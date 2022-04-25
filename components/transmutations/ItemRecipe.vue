<template>
  <div class="resources">
    <Ingredient
      :item-names="allResourceNames"
      :get-item-by-name="getItemByName('sell')"
      :update-item-by-name="getUpdateItemByName('buy')"
      :main-item-name="resourceTo"
      :number-of-ingredients="'1'"
    />
    <div class="arrow">
      <svg-icon icon-class="long-arrow-left" />
    </div>
    <Ingredient
      :item-names="allResourceNames"
      :get-item-by-name="getItemByName('buy')"
      :update-item-by-name="getUpdateItemByName('buy')"
      :main-item-name="resourceFrom"
      :number-of-ingredients="'1'"
    />
  </div>
</template>

<script>
import Ingredient from "~/components/utils/IngredientPrices/Ingredient.vue";
import { createStringOfAllResources } from "~/store/utils";

export default {
  name: "ItemRecipe",
  components: {
    Ingredient,
  },
  props: {
    resourceFrom: {
      type: String,
      default: "",
    },

    resourceTo: {
      type: String,
      default: "",
    },
  },
  computed: {
    allResourceNames() {
      return createStringOfAllResources(this.resourceFrom.slice(3)).split(",");
    },
  },
  methods: {
    /**
     * @param location - 'sell' or 'buy'
     */
    getItemByName(location) {
      return (itemName) =>
        this.$store.getters["transmutations/getItemByName"](itemName, location);
    },

    /**
     * @param location - 'sell' or 'buy'
     */
    getUpdateItemByName(location) {
      return ({ itemName, item }) =>
        this.$store.commit("transmutations/UPDATE_ITEM_BY_ITEM_NAME", {
          itemName,
          item,
          location,
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