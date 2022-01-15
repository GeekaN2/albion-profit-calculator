<template>
  <div v-show="currentItemTier">
    <ItemRecipe :item-name="currentItemTier" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ItemRecipe from './ItemRecipe.vue';

export default {
  name: "ItemProfitTable",
  components: {
    ItemRecipe
  },
  props: {
    currentItemTier: {
      type: String,
      default: '',
    }
  },
  computed: {
    ...mapGetters({
      getAllItemNamesWithSubtiers: 'foodAndPotions/getAllItemNamesWithSubtiers',
    }),
  },
}
</script>

<style scoped lang="scss">

</style>