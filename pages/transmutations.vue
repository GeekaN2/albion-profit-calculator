<template>
  <section class="container">
    <Header />
    <div class="wrapper">
      <Settings />
      <div class="table">
        <h2 class="table__header">{{ $t('chooseBranch') }}</h2>
        <Row />
        <Loading 
          v-if="itemName"
          :text="text" 
        />
        <Table
          v-if="text == 'calculated'"
        />
      </div>
    </div>
  </section>
</template>

<i18n>
{
  "en": {
    "chooseBranch": "Choose a resource for transmutation"
  },
  "ru": {
    "chooseBranch": "Выберите ресурс для трансмутации"
  }
}
</i18n>

<script>
import Header from "~/components/Header";
import Settings from "~/components/transmutations/Settings"
import Table from "~/components/transmutations/Table";
import Row from "~/components/transmutations/Row";
import Loading from '~/components/utils/Loading.vue';
import { mapGetters, mapState } from 'vuex'; 

export default {
  name: "Transmutations",
  middleware: ["authenticated"],
  components: {
    Header,
    Settings,
    Table,
    Row,
    Loading,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      text: 'transmutations/loadingText'
    }),

    ...mapState({
      itemName: (state) => state.transmutations.currentItemInfo.name
    })
  },
  created() {
    this.$store.commit('transmutations/SET_STATE');
  }
};
</script>

<style lang='scss'>
.wrapper {
  display: flex;
  justify-content: space-between;
  padding: 0 15px 10px 15px;

  .table {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    align-items: center;

    &__header {
      font-weight: bold;
      font-size: 1.1em;
      margin-bottom: 20px;
    }
  }
}
</style>