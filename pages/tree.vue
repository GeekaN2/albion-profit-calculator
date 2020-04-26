<template>
  <section class="container">
    <Header class="header" />
    <!--<TreeItem :item="tree"/>-->
    <Row :items="tree">
    </Row>
    <ItemTable />
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
      tree: this.$store.state.tree
    };
  },
  methods: {

  },
  created() {
    // this.tree = this.$store.state.tree;
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

