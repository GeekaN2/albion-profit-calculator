<template>
  <div class="resources">
    <template v-for="resource in craftResources">
      <ImageWithNumber
        :key="resource['@uniquename']"
        :name="resource['@uniquename']" 
        :number="resource['@count']"
      />
    </template>
  </div>
</template>

<script>
import ImageWithNumber from '../utils/ImageWithNumber.vue';

export default {
  name: "ItemRecipe",
  components: {
    ImageWithNumber
  }, 
  props: {
    craftResources: {
      type: Array,
      default: () => {},
    }
  },
}
</script>

<style scoped lang="scss">
.resources {
  display: flex;
  flex-direction: row;

}
</style>