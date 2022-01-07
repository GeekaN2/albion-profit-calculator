<template>
  <div>
    <Row :items="items" />
  </div>
</template>

<script>
import Row from './Row';
import axios from 'axios';

export default {
  name: "Tree",
  components: {
    Row
  },
  data() {
    return {
      items: []
    }
  },
  created: async function () {
    const { data: items } = await axios.get('/json/foodAndPotionsTree.json');

    this.items = items;
  }
}
</script>

<style scoped lang="scss">

</style>