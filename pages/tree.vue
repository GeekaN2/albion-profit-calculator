<template>
  <section class="container">
    <Header />
    <div class="wrapper">
      <Settings />
      <div>
        <h2 class="wrapper__header">{{ $t('chooseBranch') }}</h2>
        <Row 
          :items="tree" 
          class="wrapper__tree" 
          @showTable="showTable" />
        <div 
          v-if="isTableShowed" 
          class="wrapper__table">
          <Loading class="wrapper__loading" />
          <ItemRecipe />
          <ItemTable />
        </div>
      </div>
    </div>
  </section>
</template>

<i18n>
{
  "en": {
    "chooseBranch": "Choose a craft branch"
  },
  "ru": {
    "chooseBranch": "Выберите ветку крафта"
  }
}
</i18n>

<script>
import Header from "~/components/Header";
import Row from "~/components/Row";
import ItemTable from "~/components/ItemTable";
import ItemRecipe from "~/components/ItemRecipe";
import Settings from "~/components/Settings";
import Loading from "~/components/Loading";
import { getReturnMaterialsPercentage } from "~/store/utils";
import { mapState } from "vuex";

export default {
  name: "Tree",
  middleware: ["authenticated"],
  components: {
    Header,
    Row,
    ItemTable,
    ItemRecipe,
    Settings,
    Loading,
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
    };
  },
  computed: {
    ...mapState({
      settings: (state) => state.tree.settings,
      currentItemInfo: (state) => state.tree.currentItemInfo,
    }),
  },
  created: async function () {
    await this.$store.dispatch("FETCH_STATE");
    this.tree = this.$store.state.tree.tree;
  },
  methods: {
    /**
     * Show or hide table for selected item
     *
     * @param {string} itemName - name of selected item
     * @param {boolean} show - hides or shows the table
     */
    async showTable(show) {
      this.isTableShowed = show;
    },
  },
};
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

  &__header {
    text-align: center;
    font-weight: bold;
    margin-bottom: 30px;
    font-size: 1.2rem;
  }

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
      width: 600px;

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

      img {
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