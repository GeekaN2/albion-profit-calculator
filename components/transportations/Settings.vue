<template>
  <div class="settings">
    <h2 class="title title--center">
      {{ $t("settings.settings") }}
    </h2>
    <p class="subtitle">
      {{ $t("cities.locationFrom") }}
    </p>
    <select
      v-model="cities.locationFrom"
      class="location"
      @change="changeLocation"
    >
      <template v-for="location in locations">
        <option :key="location">
          {{ location }}
        </option>
      </template>
    </select>
    <p class="subtitle">
      {{ $t("cities.locationTo") }}
    </p>
    <select
      v-model="cities.locationTo"
      class="location"
      @change="changeLocation"
    >
      <option>Black Market</option>
      <template v-for="location in locations">
        <option :key="location">
          {{ location }}
        </option>
      </template>
    </select>
    <input
      id="checkbox-heuristic"
      v-model="useHeuristicSort"
      class="checkbox"
      type="checkbox"
      @change="changeUseHeuristicSort"
    >
    <label for="checkbox-heuristic">{{ $t("useHeuristicSort") }}</label>
  </div>
</template>

<i18n>
{
  "en": {
    "useHeuristicSort": "Use heuristic sort",
    "cities": {
      "locationFrom": "Buy items",
      "locationTo": "Sell items"
    }
  },
  "ru": {
    "useHeuristicSort": "Использовать эвристическую сортировку",
    "cities": {
      "locationFrom": "Покупка предметов",
      "locationTo": "Продажа предметов"
    }
  }
}
</i18n>

<script>
import { mapState } from "vuex";

export default {
  name: "Settings",
  data() {
    return {
      cities: {
        locationFrom: "Caerleon",
        locationTo: "Black Market",
      },

      /**
       * Heuristic sort
       */
      useHeuristicSort: false,

      /**
       * All available locations without Black Market
       */
      locations: [
        "Bridgewatch",
        "Caerleon",
        "Fort Sterling",
        "Lymhurst",
        "Martlock",
        "Thetford",
      ],
    };
  },
  mounted() {
    const settings = this.$store.state.transportations.settings;

    this.cities = {
      locationFrom: settings.locationFrom,
      locationTo: settings.locationTo,
    };
  },
  methods: {
    changeLocation() {
      this.$store.commit("transportations/UPDATE_LOCATION", this.cities);
      this.$store.dispatch("transportations/GET_ITEMS");
    },

    changeUseHeuristicSort() {
      this.$store.commit("transportations/USE_HEURISTIC_SORT", this.useHeuristicSort);
      this.$store.dispatch("transportations/GET_ITEMS");
    }
  },
};
</script>

<style scoped lang='scss'>
.title {
  &--center {
    text-align: center;
  }
}

.settings {
  display: flex;
  flex-direction: column;
}

.subtitle {
  font-size: 0.9rem;
}

.location {
  margin-bottom: 8px;
}

.checkbox {
  display: none;

  &:checked + label:after {
    background: var(--color-checked);
  }

  & + label {
    position: relative;
    cursor: pointer;
    margin-left: 20px;
    padding-left: 5px;
    font-size: 1rem;

    &:after {
      content: "";
      position: absolute;
      left: -20px;
      top: 1px;
      width: 16px;
      height: 16px;
      border: 2px solid var(--color-contrast);
      background: var(--color-primary);
      display: block;
    }
  }
}
</style>