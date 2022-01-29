<template>
  <div class="cells">
    <template v-for="itemName in itemNames">
      <ItemCell 
        :key="itemName"
        :item-name="itemName"
        class="cell"
      />
    </template>
  </div>
</template>

<script>
import ItemCell from './ItemCell.vue';

export default {
  name: "ItemCells",
  components: {
    ItemCell,
  },
  props: {
    itemNames: {
      type: Array,
      default: () => [],
    }
  }
}
</script>

<style scoped lang="scss">
.cells {
  display: grid;
  grid-template-columns: repeat(4, 25%);// repeat(auto-fit,minmax(10px,1fr));
  width: 100%;
}

.cell {
  &:first-child {
    border-top-left-radius: var(--space-xs);
    border-bottom-left-radius:  var(--space-xs);
  }

  &:last-child {
    border-top-right-radius: var(--space-xs);
    border-bottom-right-radius: var(--space-xs);
  }

  &:not(&:last-child) {
    border-right: 2px solid rgba(0, 0, 0, 0.07);
  }
}
</style>