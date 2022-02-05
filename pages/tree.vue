<template>
  <section class="container">
    <Header />
    <div class="wrapper">
      <Settings />
      <div class="centered">
        <h2 class="wrapper__header">
          {{ $t('chooseBranch') }}
          <Guide
            guide="profit-tree"
          />
        </h2>
        <Row 
          :items="tree" 
          class="wrapper__tree" 
          @showTable="showTable" 
        />
        <div 
          v-if="isTableShowed" 
          class="wrapper__table"
        >
          <div class="wrapper__loading-bar">
            <ItemRecipe />
            <Loading
              :text="text"
              class="wrapper__loading"
            />
            <ItemRecipe
              v-if="settings.useJournals"
              style="justify-content: flex-end"
              :right-side="true"
            />
          </div>
          <ItemTable v-if="loadingText == 'calculated'" />
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
import Row from "~/components/tree/Row";
import ItemTable from "~/components/tree/ItemTable";
import Settings from "~/components/tree/Settings";
import ItemRecipe from "~/components/utils/ItemRecipe";
import Loading from "~/components/utils/Loading";
import Guide from "~/components/guides/Guide";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Tree",
  components: {
    Header,
    Row,
    ItemTable,
    ItemRecipe,
    Settings,
    Loading,
    Guide
  },
  middleware: ["authenticated"],
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
      loadingText: (state) => state.tree.features.loadingText
    }),

    ...mapGetters({
      /**
       * Text of loading
       */
      text: 'tree/loadingText'
    })
  },
  created: async function () {
    await this.$store.dispatch("tree/FETCH_STATE");

    this.$toast.show(this.$t('toast.loadingUserSettings')); 

    try {
      await this.$store.dispatch("tree/FETCH_USER_SETTINGS", this.$auth.strategy.token.get());

      this.$toast.success(this.$t('toast.settingsLoadedSuccessfully'));
    } catch {
      this.$toast.error(this.$t('toast.somethingWentWrong'));
    }
    
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

<style scoped lang='scss'>
.container {
  font-size: 16px;
  position: relative;
  margin: 0 auto 20px auto;
}

img {
  width: 80px;
}

.centered {
  margin: 0 auto;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  padding: 0 15px 10px 15px;

  &__guide {
    font-weight: normal;
    text-decoration: underline;
    font-size: 0.8em;
  }

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

  &__loading-bar {
    margin: 0 auto;
    width: 100%;
    max-width: 650px;
    display: grid;
    grid-template-columns: 1fr 1.3fr 1fr;
    align-items: center;
    margin-top: -10px;
  }

  &__table {
    min-height: 220px;
  }
}

@media (max-width: 1200px) {
  .wrapper {
    img {
      width: 72px;
    }

    &__tree {
      width: 650px;
    }
  }
}

@media (max-width: 1080px) {
  .wrapper {
    flex-direction: column;
  }
}

@media (max-width: 991px) {
  .wrapper {
    flex-direction: column;
    &__tree {
      width: 600px;
    }

    img {
      width: 65px;
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
    }
  }
}

@media (max-width: 479px) {
  .container {
    max-width: 450px;
  }

  .wrapper {
    flex-direction: column;

    &__guide {
      font-weight: 500;
    }

    &__tree {
      width: 100%;
    }

    &__table {
      min-height: 220px;
    }

    img {
      width: 45px;
    }
  }
}
</style>