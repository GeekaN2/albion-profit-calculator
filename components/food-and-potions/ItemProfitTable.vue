<template>
  <div v-show="currentItemTier">
    {{ getAllItemNamesWithSubtiers(currentItemTier) }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "ItemProfitTable",
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