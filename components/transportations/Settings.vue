<template>
  <div class="settings">
    <h2 class="title title--center">{{ $t("settings") }}</h2>
    <p class="subtitle">
      {{ $t("cities.locationFrom") }}
    </p>
    <select
      v-model="cities.locationFrom"
      class="location"
      @change="changeLocation"
    > 
      <template v-for="location in locations">
        <option :key="location">{{ location }}</option>
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
        <option :key="location">{{ location }}</option>
      </template>
    </select>
  </div>
</template>

<i18n>
{
  "en": {
    "cities": {
      "locationFrom": "Buy items",
      "locationTo": "Sell items"
    }
  },
  "ru": {
    "cities": {
      "locationFrom": "Покупка предметов",
      "locationTo": "Продажа предметов"
    }
  }
}
</i18n>

<script>
import { mapState } from 'vuex';

export default {
  name: "Settings",
  data() {
    return {
      cities: {
        locationFrom: 'Caerleon',
        locationTo: 'Black Market',
      },

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
      locationTo: settings.locationTo
    };
  },
  methods: {
    changeLocation() {
      this.$store.commit('transportations/UPDATE_LOCATION', this.cities);

      this.$store.dispatch('transportations/UPDATE_TABLE')
    },
  }
};
</script>

<style lang='scss'>
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
</style>