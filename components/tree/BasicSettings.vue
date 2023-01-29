<template>
  <div class="basic-settings">
    <div class="basic-settings__header">
      <input
        id="checkbox-expert-mode"
        v-model="useExpertMode"
        class="expert-mode"
        type="checkbox"
      >
      <label for="checkbox-expert-mode">
        <div :title="$t('title.openExpertSettings')">
          <svg-icon
            icon-class="flask"
            class="svg svg--flask"
          />
        </div>
      </label>
      <h2>{{ $t("settings.settings") }}</h2>

      <div 
        v-tooltip="{
          placement: 'top',
          content: !$auth.loggedIn ? $t('signInToSaveSettings') : '',
          container: '#__layout',
        }"
        :title="$t('title.saveSettings')"
        :class="{
          'setting-disabled': !$auth.loggedIn
        }"
        @click="saveSettings"
      >
        <svg-icon
          icon-class="save"
          class="svg svg--save"
        />
      </div>
      <div 
        :title="$t('title.resetSettings')"
        @click="resetSettings"
      >
        <svg-icon
          icon-class="sync-alt"
          class="svg svg--sync"
        />
      </div>
    </div>
    <div class="setting">
      <input
        id="checkbox-journals"
        v-model="useJournals"
        class="checkbox"
        type="checkbox"
      >
      <label for="checkbox-journals">{{ $t("useJournals") }}</label>
    </div>
    <div class="setting">
      <input
        id="checkbox-focus"
        v-model="useFocus"
        class="checkbox"
        type="checkbox"
      >
      <label for="checkbox-focus">{{ $t("useFocus") }}</label>
    </div>
    <div class="setting">
      <input
        id="checkbox-cities"
        v-model="useMultipleCities"
        class="checkbox"
        type="checkbox"
      >
      <label for="checkbox-cities">{{
        $t("settings.useMultipleCities")
      }}</label>
    </div>
    <div class="setting">
      <input
        id="checkbox-average-items"
        v-model="showAverageItems"
        class="checkbox"
        type="checkbox"
      >
      <label for="checkbox-average-items">{{ $t("averageItems") }}</label>
    </div>
    <div class="setting">
      <input
        id="checkbox-average-price"
        v-model="useAveragePrice"
        class="checkbox"
        type="checkbox"
      >
      <label for="checkbox-average-price">{{ $t("averagePrice") }}</label>
    </div>
    <div
      class="refresh"
      @click="updateState('items')"
    >
      <svg-icon
        class="icon"
        icon-class="redo-alt"
      />
      <p>{{ $t("updateItems") }}</p>
    </div>
    <div
      class="refresh"
      @click="updateState('resources')"
    >
      <svg-icon
        class="icon"
        icon-class="redo-alt"
      />
      <p>{{ $t("updateResources") }}</p>
    </div>
    <div
      v-if="isArtifactItem"
      class="refresh"
      @click="updateState('artifacts')"
    >
      <svg-icon
        class="icon"
        icon-class="redo-alt"
      />
      <p>{{ $t("updateArtifacts") }}</p>
    </div>
    <div
      v-if="this['tree/areHeartsNeeded']"
      class="refresh"
      @click="updateState('hearts')"
    >
      <svg-icon
        class="icon"
        icon-class="redo-alt"
      />
      <p>{{ $t("updateHearts") }}</p>
    </div>
    <div
      v-if="useJournals"
      class="refresh"
      @click="updateState('journals')"
    >
      <svg-icon
        class="icon"
        icon-class="redo-alt"
      />
      <p>{{ $t("updateJournals") }}</p>
    </div>
    <div class="input">
      <span> {{ $t("craftFee") }}</span>
      <input
        v-model.number="craftFee"
        placeholder="0"
        maxlength="10"
      >
    </div>
    <p class="setting__city-header">
      {{ useMultipleCities ? $t("cities.sellItems") : $t("cities.mainCity") }}
    </p>
    <select
      v-model="cities.sellItems"
      class="city"
    >
      <option>Black Market</option>
      <template v-for="city in baseCities">
        <option :key="city">
          {{ city }}
        </option>
      </template>
    </select>
    <div
      v-if="useMultipleCities"
      class="setting__multiple-cities"
    >
      <p class="setting__city-header">
        {{ $t("cities.craftItems") }}
      </p>
      <select
        v-model="cities.craftItems"
        class="city"
      >
        <template v-for="city in baseCities">
          <option :key="city">
            {{ city }}
          </option>
        </template>
      </select>
      <p
        v-if="Object.entries(this['tree/getRecipe']).length == 0"
        class="setting__city-header"
      >
        {{ $t("cities.resources") }}
      </p>
      <p
        v-else
        class="setting__city-header"
      >
        {{ $t(`resources.${Object.entries(this["tree/getRecipe"])[0][0]}`) }}
      </p>
      <select
        v-model="cities.resourcesFirstLocation"
        class="city"
      >
        <template v-for="city in baseCities">
          <option :key="city">
            {{ city }}
          </option>
        </template>
      </select>
      <template v-if="Object.entries(this['tree/getRecipe']).length == 2">
        <p class="setting__city-header">
          {{ $t(`resources.${Object.entries(this["tree/getRecipe"])[1][0]}`) }}
        </p>
        <select
          v-model="cities.resourcesSecondLocation"
          class="city"
        >
          <template v-for="city in baseCities">
            <option :key="city">
              {{ city }}
            </option>
          </template>
        </select>
      </template>
      <template v-if="isArtifactItem">
        <p class="setting__city-header">
          {{ artefactsCategory }}
        </p>
        <select
          v-model="cities.artefacts"
          class="city"
        >
          <template v-for="city in baseCities">
            <option :key="city">
              {{ city }}
            </option>
          </template>
        </select>
      </template>
      <template v-if="this['tree/areHeartsNeeded']">
        <p class="setting__city-header">
          {{ $t("cities.hearts") }}
        </p>
        <select
          v-model="cities.hearts"
          class="city"
        >
          <template v-for="city in baseCities">
            <option :key="city">
              {{ city }}
            </option>
          </template>
        </select>
      </template>
      <template v-if="useJournals">
        <p class="setting__city-header">
          {{ $t("cities.journals") }}
        </p>
        <select
          v-model="cities.journals"
          class="city"
        >
          <template v-for="city in baseCities">
            <option :key="city">
              {{ city }}
            </option>
          </template>
        </select>
      </template>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "useJournals": "Use journals",
    "useFocus": "Use focus",
    "updateItems": "Update current item",
    "updateResources": "Update resource prices",
    "updateArtifacts": "Update artifact prices",
    "updateHearts": "Update heart prices",
    "updateJournals": "Update journal prices",
    "craftFee": "Fee for 100 nutrition",
    "averageItems": "Number of items sold",
    "averagePrice": "Use average price",
    "signInToSaveSettings": "Sign in to save settings",
    "cities": {
      "mainCity": "Main city",
      "sellItems": "Sell items",
      "craftItems": "Craft items",
      "items": "Items",
      "resources": "Resources",
      "artefacts": "Artifacts",
      "hearts": "Hearts",
      "sigils": "Royal sigils",
      "skillbook": "Tome of insight",
      "journals": "Journals"
    }
  },
  "ru": {
    "useJournals": "Использовать журналы",
    "useFocus": "Использовать фокус",
    "updateItems": "Обновить цены предметов",
    "updateResources": "Обновить цены материалов",
    "updateArtifacts": "Обновить цены артефактов",
    "updateHearts": "Обновить цены сердец",
    "updateJournals": "Обновить цены журналов",
    "craftFee": "Налог за 100 еды",
    "averageItems": "Кол-во проданных предметов",
    "averagePrice": "Использовать среднюю цену",
    "signInToSaveSettings": "Войдите, чтобы сохранить настройки",
    "cities": {
      "mainCity": "Основной город",
      "sellItems": "Продажа предметов",
      "craftItems": "Крафт предметов",
      "items": "Предметы",
      "resources": "Материалы",
      "artefacts": "Артефакты",
      "hearts": "Сердца",
      "sigils": "Королевские знаки",
      "skillbook": "Книга интуиции",
      "journals": "Журналы"
    }
  }
}
</i18n>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "BasicSettings",
  data() {
    return {
      /**
       * Royal cities of the continent
       */
      baseCities: [
        "Bridgewatch",
        "Caerleon",
        "Fort Sterling",
        "Lymhurst",
        "Martlock",
        "Thetford",
      ],
    };
  },
  computed: {
    /**
     * Use journals to craft items or not
     */
    useJournals: {
      set(useJournals) {
        this.$store.commit("tree/UPDATE_USE_JOURNALS", useJournals);

        this.$store.dispatch("tree/CHECK_ALL");
      },
      get() {
        return this.settings.useJournals;
      },
    },

    /**
     * Use focus points or not
     */
    useFocus: {
      set(useFocus) {
        this.$store.commit("tree/UPDATE_USE_FOCUS", useFocus);

        this.$store.dispatch("tree/CHECK_ALL");
      },
      get() {
        return this.settings.useFocus;
      },
    },

    /**
     * Show advanced settings or not
     */
    useExpertMode: {
      set(useExpertMode) {
        this.$store.commit("tree/UPDATE_USE_EXPERT_MODE", useExpertMode);

        this.$store.dispatch("tree/CHECK_ALL");
      },
      get() {
        return this.settings.useExpertMode;
      },
    },

    /**
     * Use prices from different cities or not
     */
    useMultipleCities: {
      set(useMultipleCities) {
        if (!useMultipleCities) {
          this.$store.commit(
            "tree/SET_CITIES",
            this.normalizedCities(this.cities.sellItems)
          );
        }

        this.$store.commit(
          "tree/UPDATE_USE_MULTIPLE_CITIES",
          useMultipleCities
        );

        this.$store.dispatch("tree/CHECK_ALL");
      },
      get() {
        return this.settings.useMultipleCities;
      },
    },

    /**
     * Craft bench tax on item creation
     */
    craftFee: {
      set(fee) {
        this.$store.commit("tree/UPDATE_CRAFT_FEE", fee);

        this.$store.dispatch("tree/CHECK_ALL");
      },
      get() {
        return this.settings.craftFee;
      },
    },

    /**
     * Prices from different cities
     */
    cities() {
      return new Proxy(this.$store.state.tree.settings.cities, {
        set: (target, prop, value) => {
          let normalizedCities = { [prop]: value };

          if (!this.useMultipleCities && prop == "sellItems") {
            normalizedCities = this.normalizedCities(value);
          }

          this.$store.commit("tree/SET_CITIES", normalizedCities);

          this.$store.dispatch("tree/CHECK_ALL");

          return true;
        },
      });
    },

    /**
     * Show average number of sold items per day or not
     */
    showAverageItems: {
      set(value) {
        this.$store.commit("tree/UPDATE_SHOW_AVERAGE_ITEMS", value);

        this.$store.dispatch("tree/CHECK_ALL");
      },
      get() {
        return this.settings.showAverageItems;
      },
    },

    /**
     * Use average item price instead of order price
     */
    useAveragePrice: {
      set(value) {
        this.$store.commit("tree/UPDATE_USE_AVERAGE_PRICE", value);

        this.$store.dispatch("tree/CHECK_ALL");
      },
      get() {
        return this.settings.useAveragePrice;
      },
    },

    /**
     * Is the current item an artifact
     */
    isArtifactItem() {
      return this.$store.getters["tree/isArtifactItem"];
    },

    /**
     * Choose one: artifacts, sigils or tome of insight
     */
    artefactsCategory() {
      const itemName = this.currentItemInfo.name;
      const category = itemName.includes("ROYAL")
        ? "cities.sigils"
        : itemName.includes("INSIGHT")
        ? "cities.skillbook"
        : "cities.artefacts";

      return this.$t(category);
    },

    ...mapGetters([
      /**
       * Get item recipe
       */
      "tree/getRecipe",

      /**
       * Do we need to display hearts
       */
      "tree/areHeartsNeeded",
    ]),

    ...mapState({
      /**
       * Current item info
       */
      currentItemInfo: (state) => state.tree.currentItemInfo,

      /**
       * Settings
       */
      settings: (state) => state.tree.settings,
    }),
  },
  methods: {
    /**
     * Normalize Black Market to set correct cities in settings
     */
    normalizedCities(sellItemsCity) {
      const normalizedCity =
        sellItemsCity == "Black Market" ? "Caerleon" : sellItemsCity;

      return {
        sellItems: sellItemsCity,
        craftItems: normalizedCity,
        resourcesFirstLocation: normalizedCity,
        resourcesSecondLocation: normalizedCity,
        artefacts: normalizedCity,
        journals: normalizedCity,
        hearts: normalizedCity,
      };
    },

    /**
     * Update some part of the state and try to get new data
     *
     * @param {string} data - what we need to update
     */
    async updateState(data) {
      await this.$store.dispatch("tree/UPDATE_STATE", data);
    },

    /**
     * Save user settings in the db
     */
    async saveSettings() {
      try {
        await this.$store.dispatch(
          "tree/SAVE_USER_SETTINGS",
          this.$auth.strategy.token.get()
        );

        this.$toast.success(this.$t("toast.settingsSavedSuccessfully"));
      } catch {
        this.$toast.error(this.$t("toast.somethingWentWrong"));
      }
    },

    /**
     * Reset settings to user default settings
     */
    resetSettings() {
      this.$store.commit("tree/RESET_SETTINGS");
      this.$store.dispatch("tree/CHECK_ALL");
    },
  },
};
</script>

<style scoped lang="scss">
.basic-settings {
  display: flex;
  flex-direction: column;
  min-width: 230px;
  padding: 0px 10px 10px 10px;
  font-size: 1em;

  &__header {
    display: flex;
    justify-content: left;

    margin-bottom: 5px;
  }

  h2 {
    text-align: center;
    font-size: 1.1em;
    margin-left: 7px;
    font-weight: 700;
  }
}

.svg {
  width: 18px;
  height: 18px;
  cursor: pointer;
  fill: var(--color-contrast);

  &--flask {
    width: 21px;
    height: 21px;
    margin-left: -2px;
  }

  &--save {
    margin-left: 7px;
    width: 16px;
    height: 21px;

    &:active {
      width: 14px;
      margin-right: 2px;
    }
  }

  &--sync {
    margin-left: 7px;
    width: 16px;
    height: 21px;

    &:active {
      width: 14px;
    }
  }
}

.setting {
  font-size: 1em;
  margin-bottom: 10px;

  &-disabled {
    opacity: 0.6;
  }

  .checkbox {
    display: none;

    &:checked + label:after {
      background: var(--color-checked);
    }

    & + label {
      white-space: nowrap;
      position: relative;
      cursor: pointer;
      margin-left: 20px;
      padding-left: 5px;
      font-size: 1em;

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

  &__city-header {
    font-size: 0.8em;
  }
}

.city {
  width: 100%;
  margin-bottom: 10px;
  outline: none;
}

select {
  height: 22px;
  font-family: "Ubuntu", sans-serif;
  font-size: 1em;
}

.refresh {
  display: flex;
  justify-content: left;
  margin-bottom: 10px;
  cursor: pointer;

  & .icon {
    width: 18px;
    height: 18px;
  }

  p {
    white-space: nowrap;
    margin-left: 5px;
  }
}

.expert-mode {
  display: none;
}

.input {
  margin-bottom: 10px;
  font-size: 1em;
  color: var(--color-contrast);
  display: flex;
  flex-direction: column;
  background: var(--color-primary);
  color: var(--color-contrast);

  input {
    outline: none;
    border: none;
    border-bottom: 2px solid var(--color-contrast);
    transition: 0.1s;
    background: var(--color-primary);
    color: var(--color-contrast);

    &:focus {
      border-bottom-color: var(--color-focus);
    }
  }

  span {
    font-size: 0.8em;
  }
}

@media (max-width: 1200px) {
  .basic-settings {
    font-size: 0.9rem;
  }
}

@media (max-width: 1080px) {
  .basic-settings {
    font-size: 0.95rem;
  }
}

@media (max-width: 840px) {
  .basic-settings {
    font-size: 0.9rem;
  }
}
</style>