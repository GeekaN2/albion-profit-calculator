<template>
  <div class="transportations-table">
    <template v-for="(item, index) in items">
      <Row 
        :item="item"
        :key="item.itemId + index"
      />
    </template>
  </div>
</template>

<script>
import Row from "~/components/transportations/Row";

export default {
  name: 'Table',
  components: {
    Row
  },
  data() {
    return {
      items: this.$store.state.transportations.items
    }
  },
  created() {
    this.$store.dispatch('transportations/GET_ITEMS');
  }
}
</script>

<style>
.transportations-table {
  margin: 0 auto;
  padding: 10px;
  background:#dadada;
  max-width: 900px;
}
</style>