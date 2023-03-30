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
      id="checkbox-use-last-time-checked-sorting"
      v-model="useLastTimeCheckedSorting"
      class="checkbox"
      type="checkbox"
      @change="changeBackendSorting"
    >
    <label for="checkbox-use-last-time-checked-sorting">{{ $t("useLastTimeCheckedSorting") }}</label>
    <p class="subtitle">
      {{ $t("mainSorting") }}
    </p>
    <select
      v-model="mainBackendSorting"
      class="location"
      @change="changeBackendSorting"
    >
      <template v-for="sorting in backendSorting">
        <option
          :key="sorting"
          :value="sorting"
        >
          {{ $t(`sorting.${sorting}`) }}
        </option>
      </template>
    </select>
  </div>
</template>

<i18n>
{
  "en": {
    "useLastTimeCheckedSorting": "Sort by the last price check time",
    "cities": {
      "locationFrom": "Buy items",
      "locationTo": "Sell items"
    },
    "mainSorting": "Main sort",
    "sorting": {
      "BY_PROFIT": "By silver profit",
      "BY_PERCENTAGE_PROFIT": "By percentage profit",
      "BY_PROFIT_VOLUME": "By profit volume"
    }
  },
  "ru": {
    "useLastTimeCheckedSorting": "Сортировать по времени последней проверке цены",
    "cities": {
      "locationFrom": "Покупка предметов",
      "locationTo": "Продажа предметов"
    },
    "mainSorting": "Основная сортировка",
    "sorting": {
      "BY_PROFIT": "По профиту в серебре",
      "BY_PERCENTAGE_PROFIT": "По профиту в процентах",
      "BY_PROFIT_VOLUME": "По объему профита"
    }
  }
}
</i18n>

<script>
export default {
  name: "Settings",
  data() {
    return {
      cities: {
        locationFrom: "Caerleon",
        locationTo: "Black Market",
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
        "Brecilien",
      ],

      useLastTimeCheckedSorting: true,
      mainBackendSorting: 'BY_PERCENTAGE_PROFIT',
      backendSorting: [
        'BY_PROFIT',
        'BY_PERCENTAGE_PROFIT',
        'BY_PROFIT_VOLUME'
      ]
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

    changeBackendSorting() {
      let allSorts = [this.mainBackendSorting];

      if (this.useLastTimeCheckedSorting) {
        allSorts.push('BY_LAST_TIME_CHECKED');
      }

      this.$store.commit("transportations/UDPATE_BACKEND_SORTING", allSorts);
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
  margin-top: var(--space-xs);
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