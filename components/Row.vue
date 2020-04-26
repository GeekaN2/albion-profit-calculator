<template>
  <div class="wrapper">
    <div class="images">
      <div
        :class="{
          'line': isOpen && item.name == nextSection
        }"
        @click="toggle(item.name, item.children || [])"
        v-for="(item, index) in items"
        :key="index"> 
        <img :src="`/images/${item.name}.png`" alt="">
      </div>
    </div>
    <div 
        v-for="(item, index) in items"
        v-show="isOpen"
        :key="index">
      <Row  
        v-show="nextSection == item.name"
        :items="item.children">
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Row",
  props: {
    items: Array
  },
  data() {
    return {
      isOpen: false,
      nextSection: ''
    }
  },
  methods: {
    toggle: function(name, children) {
      if (!children.length) {
        alert('I\'m LEAF');
      }
      this.switcher(name);
    },
    switcher: function(name) {
      if (this.nextSection == name) {
        this.isOpen = !this.isOpen;
      } else {
        this.isOpen = true;
      }

      this.nextSection = name;
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

.line {
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