<template>
  <div
    v-show="currentItemTier"
    class="table-row"
  >
    <ItemRecipe 
      :craft-resources="craftResourcesArray"
      :item-name="currentItemTier"
    />
    <ItemCells :item-names="allNamesWithSubtiers" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ItemRecipe from './ItemRecipe.vue';
import ItemCells from './ItemCells/ItemCells.vue';

export default {
  name: "ItemProfitTable",
  components: {
    ItemRecipe,
    ItemCells,
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
      getItemCraftingRequirements: 'foodAndPotions/getItemCraftingRequirements'
    }),

    allNamesWithSubtiers() {
      return this.getAllItemNamesWithSubtiers(this.currentItemTier);
    },

    craftResourcesArray() {
      const allResources = this.allNamesWithSubtiers.map(itemName => {
        const { craftresource } = this.getItemCraftingRequirements(itemName);
    
        if (Array.isArray(craftresource)) {
          return craftresource;
        }

        return [craftresource];
      }).flat();

      const uniqueNames = [...new Set(allResources.map(resource => resource['@uniquename']))];

      return uniqueNames.map(itemName => allResources.find(resource => resource['@uniquename'] === itemName));
    }

  },
}
</script>

<style scoped lang="scss">
.table-row {
  margin-top: 15px;
}
</style>