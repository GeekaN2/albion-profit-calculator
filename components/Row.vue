<template>
  <div class="row-wrapper">
    <div class="row-wrapper__images images">
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
        v-if="nextSection == item.name && item.children"
        :items="item.children"
        :last-root="`${item.name.slice(0,4) == 'ROOT' ? item.name : lastRoot}`"
        :parent-item="item.name"
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
      default: 'ROOT',
    },
    parentItem: {
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
     * And call profit table for current item if it's leaf
     * @param name - name of current item
     * @param isLeaf - shows does this element have not empty children[]
     */
    toggle: function(name, isLeaf) {
      this.switcher(name);

      if (isLeaf && this.isOpen) {
        this.showTable({
          itemName: name,
          show: true,
          root: this.lastRoot,
          artefactLevel: this.artefactLevel(name),
          parentItem: this.parentItem
        });

        this.isTableShowed = true;
      } else if (!isLeaf || !this.isOpen){
        this.showTable({
          itemName: name,
          show: false,
          root: this.lastRoot,
          artefactLevel: '',
          parentItem: this.parentItem
        });
      }
      
    },

    /**
     * Switch component condition
     * Show small triangle under icon if it's open
     * 
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
     * 
     * @param children - array for check
     */
    isLeaf: function(children) {
      return !(children && children.length);
    },

    /**
     * Determines the type of artifact by the item number in the array
     * 
     * @param {string} name - name of current item
     * @returns {string} - artefact name: rune, soul... or empty string
     */
    artefactLevel: function(name){
      const artefacts = ['UNDEAD', 'KEEPER', 'HELL', 'MORGANA', 'AVALON'];
      const isArtefactItem = artefacts.some(artefact => name.includes(artefact));

      if (!isArtefactItem) {
        return '';
      }

      const items = this.items;
      let index = 0;

      for (; index < items.length; index++) {
        if (items[index].name == name) {
          break;
        }
      }
      
      let artefact = '';

      switch (index) {
        case 3: artefact = 'rune'; break;
        case 4: artefact = 'soul'; break;
        case 5: artefact = 'relic'; break;
        case 6: artefact = 'avalon'; break;
      }

      return artefact;
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

.row-wrapper {
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