<template>
  <div>
    <template v-for="resource in creaftingRequirements.craftresource">
      <ImageWithNumber
        :key="resource['@uniquename']"
        :name="resource['@uniquename']" 
        :number="resource['@count']"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ImageWithNumber from '../utils/ImageWithNumber.vue';

export default {
  name: "ItemRecipe",
  components: {
    ImageWithNumber
  }, 
  props: {
    itemName: {
      type: String,
      default: '',
    }
  },
  computed: {
    ...mapGetters({
      getItemCraftingRequirements: 'foodAndPotions/getItemCraftingRequirements'
    }),

    creaftingRequirements() {
      return this.getItemCraftingRequirements(this.itemName);
    }
  }
}
</script>

<style scoped lang="scss">

</style>