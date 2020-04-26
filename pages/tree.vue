<template>
  <section class="container">
    <Header class="header" />
    <!--<TreeItem :item="tree"/>-->
    <Row :items="tree" v-on:showTable="showTable" />
    <ItemTable v-if="isTableShowed" />
  </section>
</template>

<script>
import Header from "~/components/Header.vue";
import Row from "~/components/Row.vue";
import ItemTable from "~/components/ItemTable.vue";

export default {
  components: {
    Header,
    Row,
    ItemTable
  },
  data() {
    return {
      tree: this.$store.state.tree,
      isTableShowed: false,
      lastName: ''
    };
  },
  methods: {
    /**
     * Show or hide table for selected item
     * @param itemName - name of selected item
     * @param show - hides or shows the table
     */
    showTable: function({itemName, show}) {
      this.isTableShowed = show;
      console.log(itemName, show);
    }
  }
};
</script>

<style scored lang="scss">
$base-brown: #583131;
$base-purple: #583156;

.container {
  margin: 0 auto 20px auto;
  max-width: 1440px;
}

img {
  width: 80px;
}
</style>

