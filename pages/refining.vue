<template>
  <section class="container">
    <Header />
    <GlobalNotifies />
    <div class="wrapper">
      <Settings />
      <div class="table">
        <h2 class="table__header">
          {{ $t('chooseBranch') }}
        </h2>
        <Row />
        <Loading 
          v-if="itemName"
          :text="loadingText" 
        />
        <Table
          v-if="loadingText == 'calculated' && itemName != ''"
        />
      </div>
    </div>
  </section>
</template>

<i18n>
{
  "en": {
    "chooseBranch": "Choose a resource to refining"
  },
  "ru": {
    "chooseBranch": "Выберите ресурс для переработки"
  }
}
</i18n>

<script>
import Header from "~/components/Header";
import Settings from "~/components/refining/Settings"
import Row from "~/components/refining/Row.vue";
import Table from '~/components/refining/Table';
import Loading from '~/components/utils/Loading.vue';
import GlobalNotifies from "~/components/utils/GlobalNotifies/GlobalNotifies";
import { mapGetters, mapState } from 'vuex'; 

export default {
  name: "Refining",
  components: {
    GlobalNotifies,
    Header,
    Settings,
    Row,
    Table,
    Loading,
  },
  computed: {
    ...mapGetters({
      loadingText: 'refining/loadingText'
    }),

    ...mapState({
      itemName: (state) => state.refining.currentItemInfo.name
    })
  },
  created() {
    this.$store.commit('refining/SET_STATE');
  }
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

@media (max-width: 991px) {
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
}

@media (max-width: 479px) {
  .wrapper {
    flex-direction: column;
    font-size: 0.75rem;
  }
}
</style>