<template>
  <section class="container">
    <Header />
    <div class="wrapper">
      <Settings />
      <div class="table">
        <h2 class="table__header">
          {{ $t('chooseBranch') }}
          <Guide
            guide="transmutations-guide"
          />
        </h2>
        <Row />
        <Loading 
          v-if="itemName"
          :text="text" 
        />
        <Table
          v-if="text == 'calculated' && itemName != ''"
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
import Row from "~/components/transmutations/Row.vue";
import Loading from '~/components/utils/Loading.vue';
import Guide from "~/components/guides/Guide";
import { mapGetters, mapState } from 'vuex'; 

export default {
  name: "Transmutations",
  components: {
    Header,
    Settings,
    Table,
    Row,
    Loading,
    Guide
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