<template>
  <section class="container">
    <Header />
    <GlobalNotifies />
    <Table  v-if="$store.state.features.currentServerId"/>
  </section>
</template>

<script>
import Header from "~/components/Header";
import Table from "~/components/transportations/Table";
import GlobalNotifies from "~/components/utils/GlobalNotifies/GlobalNotifies";

export default {
  name: "Transportations",
  components: {
    GlobalNotifies,
    Header,
    Table
  },
  data() {
    return {};
  },
  created: async function () {
    await this.$store.dispatch("transportations/FETCH_STATE");
  },
};
</script>

<style lang='scss'>

</style>