<template>
  <section class="container">
    <Header />
    <div class="wrapper">
      <Settings />
      <Table />
    </div>
  </section>
</template>

<script>
import Header from "~/components/Header";
import Settings from "~/components/transmutations/Settings"
import Table from "~/components/transmutations/Table";

export default {
  name: "Transportations",
  middleware: ["authenticated"],
  components: {
    Header,
    Settings,
    Table
  },
  data() {
    return {};
  },
};
</script>

<style lang='scss'>
.wrapper {
  display: flex;
  justify-content: space-between;
  padding: 0 15px 10px 15px;
}
</style>