<template>
  <section class='container'>
    <Header class='header' />
    <!--<TreeItem :item='tree'/>-->
    <div class='wrapper'>
      <Settings class='wrapper__fixed' 
      v-on:changeUseJournals='changeUseJournals' 
      v-on:changeCity='changeCity' 
      v-on:downloadResourcePrices='fetchResourcePrices'
      />
      <div>
        <Row :items='tree' v-on:showTable='showTable' class='wrapper__tree' />
        <ItemTable v-if='isTableShowed' :tableData='tableData' />
      </div>
    </div>
  </section>
</template>

<script>
import Header from '~/components/Header.vue';
import Row from '~/components/Row.vue';
import ItemTable from '~/components/ItemTable.vue';
import Settings from '~/components/Settings.vue';

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
      lastName: '',
      tableData: {},
      city: 'Caerleon',
      useJournals: false,
      currentItem: ''
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
          .dispatch('FETCH_ITEM_PRICE', {
            itemName: itemName,
            location: this.city
          })
          .then(() => {
            this.currentItem = itemName;
            this.updateTableData();
          });
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
    },

    /**
     * @param city
     */
    changeCity: function(city) {
      this.city = city;
      if (this.isTableShowed) {
        this.$store
          .dispatch('FETCH_ITEM_PRICE', {
            itemName: this.currentItem,
            location: this.city
          })
          .then(() => {
            this.updateTableData();
          });
      }
    },

    /**
     * Get resource prices for current city
     */
    fetchResourcePrices: function() {
      console.log('GO FETCH');
      this.$store.dispatch('FETCH_RESOURCE_PRICES', this.city)
        .then(() => {
          this.updateTableData();
        });
    },

    updateTableData: function() {
      this.tableData = {
        items: this.$store.state.prices[this.currentItem][this.city],
        resources: this.$store.state.resources[this.city],
        artefacts: this.$store.state.artefacts[this.city][this.currentItem],
        itemName: this.currentItem
      };
    }
  },
  created: function() {
    // this.$store.dispatch('FETCH_RESOURCE_PRICES');
  }
};
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
}
</style>

