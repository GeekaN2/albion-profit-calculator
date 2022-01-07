<template>
  <div class="row-wrapper__images images">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="{
        'selected': isOpen && item.name == nextSection
      }"
      @click="toggle(item.name, isLeaf(item.children))"
    >
      <img :src="`/images/items/${item.name}.png`">
    </div>
  </div>
</template>

<script>
export default {
  name: "Row",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    isOpen: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style scoped lang="scss">

</style>