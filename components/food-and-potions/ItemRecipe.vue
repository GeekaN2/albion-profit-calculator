<template>
  <div class="resources">
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
import Ingredient from '~/components/utils/IngredientPrices/Ingredient.vue';

export default {
  name: "ItemRecipe",
  components: {
    Ingredient,
  }, 
  props: {
    craftResources: {
      type: Array,
      default: () => [],
    }
  },
  methods: {
    getItemByName(itemName) {
      return this.$store.getters['foodAndPotions/getItemResponseModelByName'](itemName);
    },

    updateItemByName({
      itemName,
      item,
    }) {
      this.$store.commit('foodAndPotions/UPDATE_ITEM_BY_ITEM_NAME', {
        itemName,
        item
      })
    },
  }
}
</script>

<style scoped lang="scss">
.resources {
  display: flex;
  flex-direction: row;

}
</style>