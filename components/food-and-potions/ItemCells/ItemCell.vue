<template>
  <div
    :style="cellStyles"
    class="cell"
  >
    {{ itemName }}
  </div>
</template>

<script>
export default {
  name: 'ItemCell',
  props: {
    itemName: {
      type: String,
      default: '',
    }
  },
  computed: {
    itemTier() {
      return Number(this.itemName.slice(1, 2));
    },

    itemSubtier() {
      return Number(this.itemName.slice(-1)) || 0;
    },

    cellStyles() {
      return {
        background: `var(--tier${this.itemTier})`,
        boxShadow:  `var(--subtier${this.itemSubtier})`,
      }
    }
  }
}
</script>

<style scoped lang="scss">
.cell {
  padding: 10px;
}
</style>