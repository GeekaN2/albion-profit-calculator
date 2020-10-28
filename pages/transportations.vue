<template>
  <section class="container">
    <Header />
    <Table />
  </section>
</template>

<script>
import Header from "~/components/Header";
import Table from "~/components/transportations/Table";

export default {
  name: "Tree",
  middleware: ["authenticated"],
  components: {
    Header,
    Table
  },
  data() {
    return {};
  },
  created: async function () {
    await this.$store.dispatch("FETCH_STATE");
    this.tree = this.$store.state.tree.tree;
  },
};
</script>

<style lang='scss'>

</style>