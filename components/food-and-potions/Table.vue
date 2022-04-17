<template>
  <div>
    <template v-for="currentItemTier in currentItemTiers">
      <ItemProfitTable
        :key="currentItemTier"
        :current-item-tier="currentItemTier" 
      />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ItemProfitTable from './ItemProfitTable.vue';

export default {
  name: "Table",
  components: {
    ItemProfitTable
  },
  computed: {
    ...mapState({
      currentItemTiers: (state) => state.foodAndPotions.currentItemTiers,
    })
  }
}
</script>

<style scoped lang="scss">

</style>