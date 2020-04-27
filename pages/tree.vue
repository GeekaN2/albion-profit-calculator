<template>
  <section class="container">
    <Header class="header" />
    <!--<TreeItem :item="tree"/>-->
    <div class="wrapper">
      <Settings class="wrapper__fixed" />
      <div>
        <Row :items="tree" v-on:showTable="showTable" class="wrapper__tree"/>
        <ItemTable v-if="isTableShowed" :tableData="prices" />
      </div>
    </div>
  </section>
</template>

<script>
import Header from "~/components/Header.vue";
import Row from "~/components/Row.vue";
import ItemTable from "~/components/ItemTable.vue";
import Settings from "~/components/Settings.vue";

export default {
  components: {
    Header,
    Row,
    ItemTable,
    Settings
  },
  data() {
    return {
      tree: this.$store.state.tree,
      isTableShowed: false,
      lastName: "",
      prices: {},
      location: "Caerleon"
    };
  },
  methods: {
    /**
     * Show or hide table for selected item
     * @param itemName - name of selected item
     * @param show - hides or shows the table
     */
    showTable: async function({ itemName, show }) {
      if (show) {
        this.$store
          .dispatch("FETCH_ITEM_PRICE", {
            itemName: itemName,
            location: this.location
          })
          .then(() => {
            this.prices = this.$store.state.prices[itemName][this.location];
          });
      } else {
        this.prices = {};
      }
      this.isTableShowed = show;
    }
  }
};
</script>

<style scored lang="scss">
$base-brown: #583131;
$base-purple: #583156;

.container {
  position: relative;
  margin: 0 auto 20px auto;
  max-width: 1200px;
}

img {
  width: 80px;
}

.wrapper {
  display: flex;
  justify-content: center;

  &__tree {
    min-width: 800px;
  }
}
</style>

