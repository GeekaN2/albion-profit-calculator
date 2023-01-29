<template>
  <section class="container">
    <Header />
    <GlobalNotifies />
    <div class="wrapper">
      <Settings />
      <div class="table">
        <h2 class="table__header">
          {{ $t("chooseBranch") }}
        </h2>
        <Tree />
      </div>
    </div>
  </section>
</template>

<i18n>
{
  "en": {
    "chooseBranch": "Choose a branch of food & potions" 
  },
  "ru": {
    "chooseBranch": "Выберите ветку из еды и зелий"
  }
}
</i18n>

<script>
import Header from "~/components/Header";
import Settings from "~/components/food-and-potions/Settings";
import Tree from "~/components/food-and-potions/Tree";
import GlobalNotifies from "~/components/utils/GlobalNotifies/GlobalNotifies";

export default {
  name: "FoodAndPotions",
  components: {
    GlobalNotifies,
    Header,
    Settings,
    Tree,
  },
  created() {
    this.$store.dispatch('foodAndPotions/LOAD_FOOD_AND_POTIONS_TREE_ITEMS');
    this.$store.dispatch('foodAndPotions/LOAD_FOOD_AND_POTIONS_TREE');
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