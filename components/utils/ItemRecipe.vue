<template>
  <div class="item-recipe">
    <template 
      v-for="(value, material) in this['tree/getRecipe']"
    >
      <ImageWithNumber
        :key="material"
        :name="`T4_${material}`" 
        :number="`${value}`"
      />
    </template><ImageWithNumber 
      v-if="this['tree/isArtifactItem']"
      :name="this['tree/getArtifactName'](4)"
      :number="numberOfArtifacts" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import ImageWithNumber from "~/components/utils/ImageWithNumber";


export default {
  name: "ItemRecipe",
  components: {
    ImageWithNumber
  },
  computed: {
    numberOfArtifacts() {
      let amountOfMaterials = 0;

      for (let material in this['tree/getRecipe']) {
        amountOfMaterials += this['tree/getRecipe'][material];
      }

      if (this['tree/getArtifactName'](4).includes('ROYAL')) {
        return `${amountOfMaterials / 4}-${amountOfMaterials}`;
      }

      return '1';
    },

    ...mapGetters([
      "tree/getRecipe",
      "tree/isArtifactItem",
      "tree/getArtifactName"
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