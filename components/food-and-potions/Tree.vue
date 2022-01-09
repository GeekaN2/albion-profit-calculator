<template>
  <div>
    <Row
      :items="items"
      @showTable="showTable"
    />
    <Loading
      v-if="isShowingTable && currentItemTiers.length > 0"
      :text="loadingStatus"
    />
    <Table 
      v-if="isShowingTable && loadingStatus === 'calculated'"
    />
  </div>
</template>

<script>
import Row from "./Row";
import Loading from "../utils/Loading";
import Table from './Table';
import axios from "axios";
import { mapState } from 'vuex';

export default {
  name: "Tree",
  components: {
    Row,
    Table,
    Loading,
  },
  computed: {
    ...mapState({
      currentItemTiers: (state) => state.foodAndPotions.currentItemTiers,
      loadingStatus: (state) => state.foodAndPotions.features.loadingStatus,
    }),
  },
  data() {
    return {
      items: [],
      isShowingTable: false,
    };
  },
  created: async function () {
    const { data: items } = await axios.get("/json/foodAndPotionsTree.json");

    this.items = items;
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