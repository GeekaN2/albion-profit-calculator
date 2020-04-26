<template>
  <div class="wrapper">
    <div  class="images">
      <div
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
        v-show="nextName == item.name"
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
      nextName: ''
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
      if (this.nextName == name) {
        this.isOpen = !this.isOpen;
      } else {
        this.isOpen = true;
      }

      this.nextName = name;
    }
  }
};
</script>

<style scoped>
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
</style>