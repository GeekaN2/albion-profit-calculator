<template>
  <div>
    <Row
      :items="foodAndPotionsTree"
      @showTable="showTable"
    />
    <Loading
      v-if="isShowingTable && currentItemTiers.length > 0"
      :text="loadingStatus"
    />
    <Table v-if="isShowingTable && loadingStatus === 'calculated'" />
  </div>
</template>

<script>
import Row from "./Row";
import Loading from "../utils/Loading";
import Table from "./Table";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Tree",
  components: {
    Row,
    Table,
    Loading,
  },
  data() {
    return {
      isShowingTable: false,
    };
  },
  computed: {
    ...mapState({
      currentItemTiers: (state) => state.foodAndPotions.currentItemTiers,
      loadingStatus: (state) => state.foodAndPotions.features.loadingStatus,
      foodAndPotionsTree: (state) => state.foodAndPotions.foodAndPotionsTree,
    }),
  },
  methods: {
    showTable(isShowingTable) {
      this.isShowingTable = isShowingTable;
    },
  },
};
</script>

<style scoped lang="scss">
</style>