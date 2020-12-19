<template>
  <div>
    <template 
      v-for="item of allItems"
    >
      {{ item }}
    </template>
  </div>
</template>

<script>
import { createArrayOfAllIngredients } from '../../store/utils';

export default {
  name: 'IngredientPrices',
  props: {
    name: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      default: 4
    }
  },
  computed: {
    allItems() {
      return createArrayOfAllIngredients(this.name);
    }
  }
}
</script>

<style>

</style>