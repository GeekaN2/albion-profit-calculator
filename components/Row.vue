<template>
  <div class="wrapper">
    <div class="images">
      <div
        v-for="(item, index) in items"
        :class="{
          'selected': isOpen && item.name == nextSection
        }"
        :key="index"
        @click="toggle(item.name, isLeaf(item.children))"> 
        <img 
          :src="`/images/${item.name}.png`" 
          alt="">
      </div>
    </div>
    <div 
      v-for="(item, index) in items"
      v-show="isOpen"
      :key="index">
      <Row 
        v-show="nextSection == item.name"
        :items="item.children"
        :last-root="`${item.name.slice(0,4) == 'ROOT' ? item.name : lastRoot}`"
        @showTable="showTable"/>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Row',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    lastRoot: {
      type: String,
      default: 'ROOT'
    }
  },
  data() {
    return {
      isOpen: false,
      nextSection: ''
    }
  },
  methods: {
    /**
     * Change function condition
     * And call profit table for current item it it's leaf
     * @param name - name of current item
     * @param isLeaf - shows does this element have not empty children[]
     */
    toggle: function(name, isLeaf) {
      this.switcher(name);
      if (isLeaf && this.isOpen) {
        this.showTable({
          itemName: name,
          show: true,
          root: this.lastRoot
        });
        this.isTableShowed = true;
      } else if (!isLeaf || !this.isOpen){
        this.showTable({
          itemName: name,
          show: false,
          root: this.lastRoot
        });
      }
      
    },

    /**
     * Switch component condition
     * Show small triangle under icon if it's open
     * @param name - name of clicked item
     */
    switcher: function(name) {
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
    showTable: function(data) {
      this.$emit('showTable', data);
    },

    /**
     * Check array for emptiness
     * @param children - array for check
     */
    isLeaf: function(children) {
      return !(children && children.length);
    }
  }
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
}

.wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.selected {
  position: relative;

  &:after {
    content: ''; 
    position: absolute;
    bottom: -6px;
    left: calc(50% - 10px);
    width: 20px;
    height: 20px;
    background:url('../static/images/triangle.png') no-repeat;
    background-size: cover;
    z-index: -1;
  }
}
</style>