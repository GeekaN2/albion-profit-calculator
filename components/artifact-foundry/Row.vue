<template>
  <div class="row">
    <div 
      v-for="item of artifactFragments"
      :key="item"
      :class="['row__item', currentItem == item ? 'selected' : '']"
      @click="itemClick(item)"
    >
      <img :src="`/images/items/T4_${item}.png`">
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: "Row",
    data() {
      return {
        artifactFragments: ["RUNE", "SOUL", "RELIC", "SHARD_AVALONIAN"],
  
        /**
         * Name of the selected item
         */
        currentItem: "",
      };
    },
    methods: {
      /**
       * Select or deselect an item
       */
      itemClick(itemName) {
        if (this.currentItem == itemName) {
          this.currentItem = "";
        } else {
          this.currentItem = itemName;
        }
  
        this.$store.dispatch('artifactFoundry/CHECK_ALL', {
          name: this.currentItem
        });
      }
    },
  };
  </script>
  
  <style scoped lang='scss'>
  .row {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 10px;
  
    &__item {
      position: relative;
  
      img {
        width: 80px;
        cursor: pointer;
      }
    }
  
    .selected:after {
      content: "";
      display: block;
      position: absolute;
      bottom: -6px;
      left: calc(50% - 10px);
      width: 20px;
      height: 20px;
      background: url("../../static/images/triangle.png") no-repeat;
      background-size: cover;
      z-index: -1;
    }
  }
  </style>