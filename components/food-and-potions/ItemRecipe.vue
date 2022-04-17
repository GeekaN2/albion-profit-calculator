<template>
  <div class="resources">
    <Ingredient
      :item-names="allNamesWithSubtiers"
      :get-item-by-name="getItemByName"
      :update-item-by-name="updateItemByName"
      :main-item-name="itemName"
      :number-of-ingredients="itemCraftingAmount"
    />
    <div class="arrow">
      <svg-icon icon-class="long-arrow-left" />
    </div>
    <template v-for="resource in craftResources">
      <Ingredient
        :key="resource['@uniquename']"
        :item-names="[resource['@uniquename']]"
        :get-item-by-name="getItemByName"
        :update-item-by-name="updateItemByName"
        :main-item-name="resource['@uniquename']"
        :number-of-ingredients="resource['@count']"
      />
    </template>
  </div>
</template>

<script>
import Ingredient from "~/components/utils/IngredientPrices/Ingredient.vue";
import { mapGetters } from "vuex";

export default {
  name: "ItemRecipe",
  components: {
    Ingredient,
  },
  props: {
    craftResources: {
      type: Array,
      default: () => [],
    },

    itemName: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapGetters({
      getAllItemNamesWithSubtiers: "foodAndPotions/getAllItemNamesWithSubtiers",
      getItemCraftingRequirements: "foodAndPotions/getItemCraftingRequirements",
    }),

    allNamesWithSubtiers() {
      return this.getAllItemNamesWithSubtiers(this.itemName);
    },

    itemCraftingAmount() {
      return this.getItemCraftingRequirements(this.itemName)["@amountcrafted"];
    },
  },
  methods: {
    getItemByName(itemName) {
      return this.$store.getters["foodAndPotions/getItemResponseModelByName"](
        itemName
      );
    },

    updateItemByName({ itemName, item }) {
      this.$store.commit("foodAndPotions/UPDATE_ITEM_BY_ITEM_NAME", {
        itemName,
        item,
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