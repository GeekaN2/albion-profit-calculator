<template>
  <div class="transportations-table">
    <Row />
    <Row />
    <Row />
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
      items: {
        'T4_BAG': {
          price: 1900
        },
        'T4_BAG@1': {
          price: 5000
        }
      }
    }
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