<template>
  <section class="container">
    <Header />
    <div class="wrapper">
      <Settings />
      <div class="table">
        <h2 class="table__header">
          {{ $t("chooseFragments") }}
        </h2>
        <Row />
      </div>
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
  import Settings from "~/components/food-and-potions/Settings.vue";
  import Row from "~/components/artifacts-foundry/Row.vue";
  
  export default {
    name: "FoodAndPotions",
    components: {
      Header,
      Settings,
      Row,
    },
    middleware: ["authenticated"],
    created() {
      this.$store.dispatch('artifactsFoundry/FETCH_STATE');
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