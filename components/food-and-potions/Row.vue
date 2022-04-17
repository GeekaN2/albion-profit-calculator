<template>
  <div class="row-wrapper">
    <div class="images-wrapper images">
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="{
          selected: isOpen && item.name == nextSection,
        }"
        @click="toggle(item, isLeaf(item.children))"
      >
        <img :src="`/images/items/${item.name}.png`">
      </div>
    </div>
    <div
      v-for="item in items"
      v-show="isOpen"
      :key="item.name"
    >
      <Row
        v-if="nextSection === item.name && item.children"
        :items="item.children"
        @showTable="showTable"
      />
    </div>
  </div>
</template>

<script>
import Table from "./Table";

export default {
  name: "Row",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isOpen: false,

      /**
       * Which item is open in this row
       */
      nextSection: "",
    };
  },
  methods: {
    /**
     * Check array for emptiness
     *
     * @param children - array for check
     * @return {boolean}
     */
    isLeaf(children) {
      return !(children && children.length);
    },

    /**
     * Call function in parent
     */
    showTable: function (data) {
      this.$emit("showTable", data);
    },

    /**
     * Change function condition
     * And call profit table for current item if it's leaf
     *
     * @param item - selected current item
     * @param isLeaf - shows does this element have not empty children[]
     */
    async toggle(item, isLeaf) {
      this.switcher(item.name);

      if (isLeaf && this.isOpen) {
        this.showTable(true);

        await this.$store.dispatch("foodAndPotions/CHECK_ALL", item.tiers);

        this.isTableShowed = true;
      } else if (!isLeaf || !this.isOpen) {
        this.showTable(false);
      }
    },

    /**
     * Switch component condition
     * Show small triangle under icon if it's open
     *
     * @param name - name of clicked item
     */
    switcher(name) {
      if (this.nextSection == name) {
        this.isOpen = !this.isOpen;
      } else {
        this.isOpen = true;
      }

      this.nextSection = name;
    },
  },
};
</script>

<style scoped lang="scss">
.images {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.images img {
  display: block;
  cursor: pointer;
  width: 72px;
}

.row-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
}

.selected {
  position: relative;

  &:after {
    content: "";
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

@media (max-width: 991px) {
  img {
    width: 65px;
  }
}

@media (max-width: 479px) {
  img {
    width: 45px;
  }
}
</style>