<template>
  <div class="transportations-table">
    <Settings />
    <div class="items">
      <ItemCard
        v-for="(items, index) in transportations"
        :key="items.from.itemId + index + 'x'"
        :item-from="{
          itemId: items.from.itemId,
          price: items.from.sellPriceMin,
          date: items.from.sellPriceMinDate,
          location: items.from.location,
          quality: items.from.quality,
          averageItemsSold: items.from.averageItems,
        }"
        :item-to="{
          itemId: items.to.itemId,
          price: items.to.sellPriceMin,
          date: items.to.sellPriceMinDate,
          location: items.to.location,
          quality: items.to.quality,
          averageItemsSold: items.to.averageItems,
        }"
      />
    </div>
  </div>
</template>

<script>
import Settings from "~/components/transportations/Settings";
import { mapState } from "vuex";
import ItemCard from "./ItemCard.vue";

export default {
    name: "Table",
    components: {
        Settings,
        ItemCard,
    },
    computed: {
        ...mapState({
            transportations: (state) => state.transportations.transportations,
        }),
    },
    created() {
        this.$store.dispatch("transportations/GET_ITEMS");
    },
    mounted() {
        this.scroll();
    },
    methods: {
        scroll() {
            window.onscroll = () => {
                let bottomOfWindow =
                    document.documentElement.scrollTop + window.innerHeight >=
                    document.documentElement.offsetHeight;

                if (bottomOfWindow) {
                    this.$store.dispatch("transportations/UPDATE_TABLE");
                }
            };
        },
    },
};
</script>

<style scoped lang="scss">
.transportations-table {
    display: grid;
    margin: 0 auto;
    padding: 10px;
    column-gap: 10px;
    grid-template-areas:
        "Filt"
        "Sett"
        "Rows"
        "Rows";
}

.settings {
    grid-area: Sett;
}

.items {
    grid-area: Rows;
    padding: 10px 0;
}

@media (max-width: 840px) {
    .transportations-table {
        font-size: 0.9rem;
        grid-template-areas:
            "Filt Filt"
            "Sett Sett"
            "Rows Rows"
            "Rows Rows";
    }

    .settings {
        max-width: 100%;
    }
}
</style>