<template>
  <div
    v-if="items != {}"
    class="ingredient-prices"
  >
    <template v-for="itemName of itemNames">
      <input 
        :key="itemName" 
        v-model.number="items[itemName].price" 
        class="ingredient"
      >
    </template>
  </div>
</template>

<script>
import { createArrayOfAllIngredients } from "../../store/utils";

export default {
  name: "IngredientPrices",
  props: {
    name: {
      type: String,
      default: "",
    },
    rows: {
      type: Number,
      default: 4,
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      itemNames: [],
      items: {},
    };
  },
  created() {
    let getterName = "tree/getFirstResources";

    this.itemNames = createArrayOfAllIngredients(this.name);
    console.log(this.itemNames);
    switch(this.index) {
      case 0: getterName = "tree/getFirstResources"; break;
      case 1: getterName = "tree/getSecondResources"; break;
      case 2: getterName = "tree/getArtefacts"; break;
    }

    this.items = Object.assign({}, this.items, this.$store.getters[getterName]);

    console.log(getterName, this.items);
    //this.items = this.$store.getters[getterName];
  }
};
</script>

<style lang="scss">
.ingredient-prices {
  display: grid;
  grid-template-rows: repeat(auto, 1fr);
  grid-template-columns: repeat(5, 1fr);
  box-shadow: 0px 2px 10px #555555;
  opacity: 1;
  border-radius: 10px;
  transition: 0.2s;

  .ingredient {
    width: 6rem;
    border: none;
    outline: none;
    text-align: right;
    padding: 2px 5px;
    background: transparent;

    &:nth-child(5n + 1) {
      background: #9bc8e2;
    }

    &:nth-child(5n+2) {
      background: #eb8f87;
    }

    &:nth-child(5n+3) {
      background: #e09255;
    }

    &:nth-child(5n+4) {
      background: #eccc62;
    }

    &:nth-child(5n) {
      background: #f5f5f5;
    }

    &:nth-child(1) {
      border-top-left-radius: inherit;
    }

    &:nth-child(5) {
      border-top-right-radius: inherit;
    }

    &:nth-child(16) {
      border-bottom-left-radius: inherit;
    }

    &:nth-child(20) {
      border-bottom-right-radius: inherit;
    }
  }

  &:after {
    content: '';
    width: 10px;
    height: 10px;
    background: #9bc8e2;
    box-shadow: 0px 0px 3px #555555;
    z-index: -1;
    position: absolute;
    left: 20px;
    top: -5px;
    transform: rotate(45deg)
  }
}
</style>