<template>
  <div class="transportations-table">
    <Settings />
    <div class="items">
      <Row
        v-for="(item, index) in items"
        :item="item"
        :key="item.itemId + index"
      />
    </div>
  </div>
</template>

<script>
import Row from "~/components/transportations/Row";
import Settings from "~/components/transportations/Settings";
import { mapState } from "vuex";

export default {
  name: "Table",
  components: {
    Row,
    Settings,
  },
  computed: {
    ...mapState({
      items: (state) => state.transportations.items,
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
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        
        if (bottomOfWindow) {
          this.$store.dispatch("transportations/UPDATE_TABLE");
        }
      }
    }
  },
  
};
</script>

<style>
.transportations-table {
  display: grid;
  margin: 0 auto;
  padding: 10px;
  column-gap: 10px;
  grid-template-areas: 
  "Sett Filt Filt"
  "Sett Rows Rows"
  "Sett Rows Rows";
}

.settings {
  grid-area: Sett;
  max-width: 350px;
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