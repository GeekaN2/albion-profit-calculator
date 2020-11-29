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
  grid-area: 'Sett';
}

.items {
  grid-area: 'Rows';
  padding: 10px;
  background: #dadada;
  max-width: 900px;
}
</style>