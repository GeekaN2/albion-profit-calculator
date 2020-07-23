<template>
  <section class="container">
    <Header />
    <div class="wrapper">
      <Settings
        :loading-text="loadingText" 
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
        <div 
          v-if="isTableShowed" 
          class="wrapper__table" >
          <Loading 
            :text="loadingText" 
            class="wrapper__loading" />
          <ItemTable 
            :table-data="tableData" />
        </div>
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
import { getReturnMaterialsPercentage } from "~/store/utils";

export default {
  name: 'Tree',
  middleware: ['authenticated'],
  components: {
    Header,
    Row,
    ItemTable,
    Settings,
    Loading
  },
  data() {
    return {
      /**
       * Tree of all the items we can craft
       */
      tree: [],

      /**
       * Is a specific item selected
       */
      isTableShowed: false,

      /**
       * Data to send to the table
       */
      tableData: {},

      /**
       * Current city or Black Market
       */
      city: "Caerleon",

      /**
       * Use journals or not
       */
      useJournals: false,

      /**
       * The currently displayed item
       */
      currentItem: "",

      /**
       * Root of current items
       */
      root: "",

      /**
       * Loading text shows which request is being sent
       */
      loadingText: "",

      /**
       * Return percentage of materials
       */
      returnPercentage: 15.2,

      /**
       * Craft bench tax on item creation
       */
      fee: 10,

      /**
       * Level of item artifact: relic, avalon etc.
       */
      artefactLevel: "",

      /**
       * Parent item of the current item
       */
      parentItem: "",
    };
  },
  created: async function() {
    await this.$store.dispatch("FETCH_STATE");
    this.tree = this.$store.state.tree.tree;
  },
  methods: {
    /**
     * Show or hide table for selected item
     * 
     * @param {string} itemName - name of selected item
     * @param {boolean} show - hides or shows the table
     * @param {string} root -
     * @param {string} artefactLevel -
     * @param {string} parentItem - name of previous vertex
     */
    showTable: async function({ itemName, show, root, artefactLevel, parentItem }) {
      this.root = root;
      this.artefactLevel = artefactLevel;
      this.parentItem = parentItem

      if (show) {
        this.currentItem = itemName;
        this.checkAllPricesAndFetchIt();
      } else {
        this.tableData = {};
      }

      this.isTableShowed = show;
    },

    /**
     * Checkbox
     * 
     * @param {boolean} useJournals - use or not
     */
    changeUseJournals: function(useJournals) {
      this.useJournals = useJournals;

      if (this.isTableShowed) {
        this.checkAllPricesAndFetchIt();
      }
    },

    /**
     * Change city method
     * 
     * @param city
     */
    changeCity: function(city) {
      this.city = city;

      if (this.isTableShowed) {
        this.checkAllPricesAndFetchIt();
      }
    },

    fetchItemPricesWithArtefacts: async function() {
      this.loadingText = "items";

      await this.$store.dispatch("FETCH_ITEM_PRICE", {
        itemName: this.currentItem,
        location: this.city
      });
    },

    /**
     * Get resource prices for current city
     */
    fetchResourcePrices: async function() {
      this.loadingText = "resources";

      await this.$store.dispatch("FETCH_RESOURCE_PRICES", this.city);
    },
    
    /**
     * get journal prices for current city and root(ROOT_WARRIOR etc.)
     */
    fetchJournalPrices: async function() {
      this.loadingText = "journals";

      await this.$store.dispatch("FETCH_JOURNAL_PRICES", {
        location: this.city,
        root: this.root
      });
    },

    /**
     * Check prices maybe they already exist in the state
     * It don't fetch them
     */
    checkAllPricesAndFetchIt: async function() {
      const normalCity = this.city == "Black Market" ? "Caerleon" : this.city;

      if (
        !this.$store.state.tree.prices[this.currentItem] ||
        !this.$store.state.tree.prices[this.currentItem][this.city] &&
        this.currentItem
      ) {
        await this.fetchItemPricesWithArtefacts();
      }

      if (isObjectEmpty(this.$store.state.tree.resources[normalCity])) {
        await this.fetchResourcePrices();
      }

      if (
        this.useJournals &&
        !this.$store.state.tree.journals[normalCity][this.root] &&
        this.root.slice(0, 5) == "ROOT_"
      ) {
        await this.fetchJournalPrices();
      }

      this.returnPercentage = getReturnMaterialsPercentage(this.parentItem, this.city);

      this.updateTableData();
    },
    
    /**
     * Drop some part of the state
     * 
     * @param {string} data - what we need to update
     */
    dropStore: function(data) {
      const normalCity = this.city == "Black Market" ? "Caerleon" : this.city;
      
      switch (data) {
        case "items":
          this.$store.state.tree.prices[this.currentItem] = {};
          break;
        case "resources":
          this.$store.state.tree.resources[normalCity] = {};
          break;
        case "journals":
          this.$store.state.tree.journals[normalCity] = {};
          break;
      }

      this.checkAllPricesAndFetchIt();
    },

    /**
     * Update craft bench fee
     * 
     * @param {number} value - new fee in percentage
     */
    updateFee: function(value) {
      this.fee = value;
    },

    /**
     * Update ItemTable
     */
    updateTableData: function() {
      this.loadingText = "calculated";
      const city = this.city == "Black Market" ? "Caerleon" : this.city;

      this.tableData = {
        items: this.$store.state.tree.prices[this.currentItem][this.city],
        resources: this.$store.state.tree.resources[city],
        artefacts: this.$store.state.tree.artefacts[city][this.currentItem] || {},
        itemName: this.currentItem,
        recipe: this.$store.state.tree.recipes[this.currentItem],
        useJournals: this.useJournals,
        journals: this.useJournals
          ? this.$store.state.tree.journals[city][this.root]
          : {},
        root: this.root,
        returnPercentage: this.returnPercentage,
        fee: this.fee,
        artefactLevel: this.artefactLevel
      };
    }
  }
};

/**
 * Check the object for emptiness
 * 
 * @param {object} obj - any object
 * @returns {boolean}
 */
function isObjectEmpty(obj) {
  return Object.keys(obj).length == 0;
}
</script>

<style lang='scss'>
$base-brown: #583131;
$base-purple: #583156;

.container {
  font-size: 16px;
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
  padding-bottom: 10px;

  &__tree {
    width: 750px;
    margin: 0 auto;
  }

  &__loading {
    margin-top: -5px;
  }

  &__table {
    min-height: 220px;
  }
}

@media (max-width: 1200px) {
  img {
    width: 75px;
  }
}

@media (max-width: 991px) {
  .wrapper {
    &__tree {
      width: 500px;

      img {
        width: 65px;
      }
    }
  }
}

@media (max-width: 840px) {
  .wrapper {
    flex-direction: column;
    width: 100%;
    padding: 0 10px;

    &__tree {
      width: 100%;

      img  {
        width: 60px;
      }
    }
  }
}

@media (max-width: 479px) {
  .container {
    max-width: 450px;
  }

  .wrapper {
    flex-direction: column;

    &__tree {
      width: 100%;
    }

    &__table {
      min-height: 220px;
    }
  }

  img {
    width: 65px;
  }
}
</style>