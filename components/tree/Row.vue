<template>
  <div class="row-wrapper">
    <div class="row-wrapper__images images">
      <div
        v-for="(item, index) in items"
        :class="{
          'selected': isOpen && item.name == nextSection
        }"
        :key="index"
        @click="toggle(item.name, isLeaf(item.children))"
      >
        <img :src="`/images/items/${item.name}.png`">
      </div>
    </div>
    <div 
      v-for="(item, index) in items" 
      v-show="isOpen" 
      :key="index">
      <Row
        v-if="nextSection == item.name && item.children"
        :items="item.children"
        :last-root="`${item.name.slice(0,4) == 'ROOT' ? item.name : lastRoot}`"
        :parent-item="item.name"
        @showTable="showTable"
      />
    </div>
  </div>
</template>

<script>
import { isArtifactItem } from "../../store/utils";

export default {
  name: "Row",
  props: {
    /**
     * Array with objects that contains the following vertex name
     * and the same array of childrens
     */
    items: {
      type: Array,
      default: () => [],
    },

    /**
     * Last root: ROOT_WARRIOR etc. We need it for journals
     */
    lastRoot: {
      type: String,
      default: "ROOT",
    },

    /**
     * Previous vertex
     */
    parentItem: {
      type: String,
      default: "ROOT",
    },
  },
  data() {
    return {
      /**
       * Is this item or vertex open
       */
      isOpen: false,

      /**
       * Which item is open in this row
       */
      nextSection: "",
    };
  },
  methods: {
    /**
     * Change function condition
     * And call profit table for current item if it's leaf
     *
     * @param name - name of current item
     * @param isLeaf - shows does this element have not empty children[]
     */
    async toggle (name, isLeaf) {
      this.switcher(name);

      if (isLeaf && this.isOpen) {
        this.showTable(true);

        await this.$store.dispatch("tree/CHECK_ALL", {
          name: name,
          parent: this.parentItem,
          root: this.lastRoot,
          artefactLevel: this.artefactLevel(name),
        });

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
    switcher: function (name) {
      if (this.nextSection == name) {
        this.isOpen = !this.isOpen;
      } else {
        this.isOpen = true;
      }

      this.nextSection = name;
    },

    /**
     * Call function in parent
     */
    showTable: function (data) {
      this.$emit("showTable", data);
    },

    /**
     * Check array for emptiness
     *
     * @param children - array for check
     * @return {boolean}
     */
    isLeaf: function (children) {
      return !(children && children.length);
    },

    /**
     * Determines the type of artifact by the item number in the array
     *
     * @param {string} name - name of current item
     * @returns {string} - artefact name: rune, soul... or empty string
     */
    artefactLevel(name) {
      if (!isArtifactItem(name)) {
        return "";
      }

      let currentItemIndex = 0;
      let firstArtefactItemIndex = 0;

      for (; firstArtefactItemIndex < this.items.length; firstArtefactItemIndex++) {
        if (isArtifactItem(this.items[firstArtefactItemIndex].name)) {
          break;
        }
      }

      for (; currentItemIndex < this.items.length; currentItemIndex++) {
        if (this.items[currentItemIndex].name == name) {
          break;
        }
      }

      let artefact = "";

      switch (currentItemIndex - firstArtefactItemIndex) {
        case 0:
          artefact = "rune";
          break;
        case 1:
          artefact = "soul";
          break;
        case 2:
          artefact = "relic";
          break;
        case 3:
          artefact = "avalon";
          break;
      }

      return artefact;
    },
  },
};
</script>

<style scoped lang="scss">
.images {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 20px;
}

.images img {
  cursor: pointer;
  width: 72px;
}

.row-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
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