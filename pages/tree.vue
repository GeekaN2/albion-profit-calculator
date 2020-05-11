<template>
  <section class="container">
    <Header class="header" />
    <!--<TreeItem :item='tree'/>-->
    <div class="wrapper">
      <Settings
        :loading-text="loadingText" 
        class="wrapper__fixed" 
        @changeUseJournals="changeUseJournals" 
        @dropStore="dropStore"
        @changeCity="changeCity"
        @inputFee="updateFee"
      />
      <div>
        <Row 
          :items="tree" 
          class="wrapper__tree" 
          @showTable="showTable" />
        <Loading 
          v-if="isTableShowed" 
          :text="loadingText" 
          class="wrapper__loading" />
        <ItemTable 
          v-if="isTableShowed" 
          :table-data="tableData" />
      </div>
    </div>
  </section>
</template>

<script>
import Header from "~/components/Header";
import Row from "~/components/Row";
import ItemTable from "~/components/ItemTable";
import Settings from "~/components/Settings";
import Loading from "~/components/Loading";

export default {
  name: 'Tree',
  components: {
    Header,
    Row,
    ItemTable,
    Settings,
    Loading
  },
  data() {
    return {
      tree: [],
      isTableShowed: false,
      lastName: "",
      tableData: {},
      city: "Caerleon",
      useJournals: false,
      currentItem: "",
      root: "",
      loadingText: "",
      returnPercentage: 15.2,
      fee: 10,
      artefactLevel: ""
    };
  },
  computed: {
    feef: function(){
      return 0;
    }
  },
  created: async function() {
    await this.$store.dispatch("FETCH_STATE");
    this.tree = this.$store.state.tree;
  },
  methods: {
    /**
     * Show or hide table for selected item
     * @param itemName - name of selected item
     * @param show - hides or shows the table
     */
    showTable: async function({ itemName, show, root, artefactLevel }) {
      this.root = root;
      this.artefactLevel = artefactLevel;
      if (show) {
        this.currentItem = itemName;
        this.checkAllPricesAndFetchIt();
      } else {
        this.tableData = {};
      }

      this.isTableShowed = show;
    },

    /**
     * @param useJournals - use or no
     */
    changeUseJournals: function(useJournals) {
      this.useJournals = useJournals;

      if (this.isTableShowed) {
        this.checkAllPricesAndFetchIt();
      }
    },

    /**
     * @param city
     */
    changeCity: function(city) {
      this.city = city;

      if (this.isTableShowed) {
        this.checkAllPricesAndFetchIt();
      }
    },

    fetchItemPricesWithArtefacts: async function() {
      this.loadingText = "Loading item prices";

      await this.$store.dispatch("FETCH_ITEM_PRICE", {
        itemName: this.currentItem,
        location: this.city
      });
    },

    /**
     * Get resource prices for current city
     */
    fetchResourcePrices: async function() {
      this.loadingText = "Loading resource prices";

      await this.$store.dispatch("FETCH_RESOURCE_PRICES", this.city);
    },

    fetchJournalPrices: async function() {
      this.loadingText = "Loading journal prices";

      await this.$store.dispatch("FETCH_JOURNAL_PRICES", {
        location: this.city,
        root: this.root
      });
    },

    checkAllPricesAndFetchIt: async function() {
      const normalCity = this.city == "Black Market" ? "Caerleon" : this.city;

      if (
        !this.$store.state.prices[this.currentItem] ||
        !this.$store.state.prices[this.currentItem][this.city] &&
        this.currentItem
      ) {
        await this.fetchItemPricesWithArtefacts();
      }

      if (isObjectEmpty(this.$store.state.resources[normalCity])) {
        await this.fetchResourcePrices();
      }

      if (
        this.useJournals &&
        !this.$store.state.journals[normalCity][this.root] &&
        this.root.slice(0, 5) == "ROOT_"
      ) {
        await this.fetchJournalPrices();
      }

      this.updateTableData();
    },

    dropStore: function(data) {
      const normalCity = this.city == "Black Market" ? "Caerleon" : this.city;
      
      switch (data) {
        case "items":
          this.$store.state.prices[this.currentItem] = {};
          break;
        case "resources":
          this.$store.state.resources[normalCity] = {};
          break;
        case "journals":
          this.$store.state.journals[normalCity] = {};
          break;
      }

      this.checkAllPricesAndFetchIt();
    },

    updateFee: function(value) {
      this.fee = value;
    },

    updateTableData: function() {
      this.loadingText = "Profit calculated";
      const city = this.city == "Black Market" ? "Caerleon" : this.city;

      this.tableData = {
        items: this.$store.state.prices[this.currentItem][this.city],
        resources: this.$store.state.resources[city],
        artefacts: this.$store.state.artefacts[city][this.currentItem] || {},
        itemName: this.currentItem,
        recipe: this.$store.state.recipes[this.currentItem],
        useJournals: this.useJournals,
        journals: this.useJournals
          ? this.$store.state.journals[city][this.root]
          : {},
        root: this.root,
        returnPercentage: this.returnPercentage,
        fee: this.fee,
        artefactLevel: this.artefactLevel
      };
    }
  }
};

function isObjectEmpty(obj) {
  return Object.keys(obj).length == 0;
}
</script>

<style scored lang='scss'>
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

  &__loading {
    margin-top: -25px;
  }
}


</style>