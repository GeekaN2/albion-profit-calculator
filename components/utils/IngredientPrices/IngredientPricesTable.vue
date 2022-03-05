<template>
  <div
    v-if="items"
    class="ingredient-prices"
  >
    <template v-for="itemName of itemNames">
      <input 
        :key="itemName" 
        v-model.number="items[itemName].price"
        class="ingredient"
        @change="updatePrice(itemName, items[itemName].price)"
      >
    </template>
  </div>
</template>

<script>
export default {
  name: 'IngredientPriceTable',
}
</script>

<style lang="scss">

</style>