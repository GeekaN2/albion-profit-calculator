<template>
  <section class="container">
    <Header />
    <GlobalNotifies />
    <div class="wrapper">
      <div class="wrapper-row">
        <Settings />
        <div class="table">
          <h2 class="table__header">
            {{ $t("chooseFragments") }}
          </h2>
          <Row />
          <Loading 
            v-if="itemName"
            :text="status" 
          />
          <Table v-if="status == 'calculated' && itemName" />
        </div>
      </div>
      <ExtendedCellTable v-if="status == 'calculated' && itemName && extendedCell " />
    </div>
  </section>
</template>
  
<i18n>
  {
    "en": { 
      "chooseFragments": "Choose fragments to meld"
    },
    "ru": {
      "chooseFragments": "Выберите фрагменты для слияния"
    }
  }
  </i18n>
  
<script>
import Header from "~/components/Header";
import Row from "~/components/artifact-foundry/Row.vue";
import Table from "~/components/artifact-foundry/Table.vue";
import Loading from '~/components/utils/Loading.vue';
import ExtendedCellTable from '~/components/artifact-foundry/ExtendedCellTable.vue';
import Settings from '~/components/artifact-foundry/Settings.vue';
import GlobalNotifies from "~/components/utils/GlobalNotifies/GlobalNotifies";
import { mapState } from 'vuex'; 

export default {
  name: "FoodAndPotions",
  components: {
    GlobalNotifies,
    Header,
    Row,
    Loading,
    Table,
    Settings,
    ExtendedCellTable,
  },
  computed: {
    ...mapState({
      itemName: (state) => state.artifactFoundry.currentFragmentType.name,
      status: (state) => state.artifactFoundry.features.loadingStatus,
      extendedCell: (state) => state.artifactFoundry.extendedCell,
    })
  },
  created() {
    this.$store.dispatch('artifactFoundry/FETCH_STATE');
  },
};
</script>
  
<style scoped lang='scss'>
.wrapper {
  display: flex;
  justify-content: space-between;
  padding: 0 15px 10px 15px;

  .table {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 100%;

    &__header {
      font-weight: bold;
      font-size: 1.1em;
      margin-bottom: 20px;
      text-align: center;
    }
  }
}

.wrapper-row {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

@media (max-width: 1200px) {
  .wrapper {
    flex-direction: column;
    font-size: 0.9rem;
  }

  .table {
    width: 100%;
  }
}

@media (max-width: 840px) {
  .wrapper {
    width: 100%;
    font-size: 0.85rem;
  }

  .wrapper-row {
    flex-direction: column;
  }
}

@media (max-width: 479px) {
  .wrapper {
    flex-direction: column;
    font-size: 0.75rem;
  }
}
</style>