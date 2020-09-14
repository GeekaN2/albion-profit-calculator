<template>
  <div class="item-recipe">
    <template 
      v-for="(value, material) in getRecipe"
    >
      <ImageWithNumber
        :key="material"
        :name="`T4_${material}`" 
        :number="`${value}`"
      />
    </template><ImageWithNumber 
      v-if="isArtifactItem"
      :name="getArtifactName(4)"
      :number="numberOfArtifacts" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import ImageWithNumber from "~/components/ImageWithNumber";


export default {
  name: "ItemRecipe",
  components: {
    ImageWithNumber
  },
  computed: {
    numberOfArtifacts() {
      let amountOfMaterials = 0;

      for (let material in this.getRecipe) {
        amountOfMaterials += this.getRecipe[material];
      }

      if (this.getArtifactName(4).includes('ROYAL')) {
        return `${amountOfMaterials / 4}-${amountOfMaterials}`;
      }

      return '1';
    },

    ...mapGetters([
      "getRecipe",
      "isArtifactItem",
      "getArtifactName"
    ])
  }
};
</script>

<style lang="scss">
.item-recipe {
  display: flex;

  img {
    min-width: 40px;
  }
}
</style>