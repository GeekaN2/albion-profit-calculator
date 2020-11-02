<template>
  <div class="settings">
    <h2>{{ $t('settings') }}</h2>
    <div class="setting">
      <input
        id="checkbox-journals"
        v-model="useJournals"
        class="checkbox"
        type="checkbox"
        @change="changeUseJournals"
      >
      <label for="checkbox-journals">{{ $t('useJournals') }}</label>
    </div>
    <div class="setting">
      <input
        id="checkbox-focus"
        v-model="useFocus"
        class="checkbox"
        type="checkbox"
        @change="changeUseFocus"
      >
      <label for="checkbox-focus">{{ $t('useFocus') }}</label>
    </div>
    <div class="setting">
      <input
        id="checkbox-cities"
        v-model="multipleCities"
        class="checkbox"
        type="checkbox"
        @change="toggleMultipleCities"
      >
      <label for="checkbox-cities">{{ $t('multipleCities') }}</label>
    </div>
    <div class="setting">
      <input
        id="checkbox-average-items"
        v-model="showAverageItems"
        class="checkbox"
        type="checkbox"
        @change="changeShowAverageItems"
      >
      <label for="checkbox-average-items">{{ $t('averageItems') }}</label>
    </div>
    <div class="setting">
      <input
        id="checkbox-average-price"
        v-model="useAveragePrice"
        class="checkbox"
        type="checkbox"
        @change="changeUseAveragePrice"
      >
      <label for="checkbox-average-price">{{ $t('averagePrice') }}</label>
    </div>
    <div 
      class="refresh" 
      @click="updateState('items')">
      <img src="/images/redo-alt.svg">
      <p>{{ $t('updateItems') }}</p>
    </div>
    <div 
      class="refresh" 
      @click="updateState('resources')">
      <img src="/images/redo-alt.svg">
      <p>{{ $t('updateResources') }}</p>
    </div>
    <div
      v-if="isArtifactItem"
      class="refresh"
      @click="updateState('artifacts')">
      <img src="/images/redo-alt.svg">
      <p>{{ $t('updateArtifacts') }}</p>
    </div>
    <div
      v-if="useJournals"
      class="refresh" 
      @click="updateState('journals')">
      <img src="/images/redo-alt.svg">
      <p>{{ $t('updateJournals') }}</p>
    </div>
    <div class="input">
      <input 
        v-model.number.lazy="fee"
        placeholder="0" 
        maxlength="4" 
        @change="updateFee" >
      <span>% {{ $t('craftFee') }}</span>
    </div>
    <p class="setting__city-header">{{ multipleCities ? $t('cities.sellItems') : $t('cities.mainCity') }}</p>
    <select 
      v-model="cities.sellItems" 
      class="city" 
      @change="changeCity">
      <option>Black Market</option>
      <template v-for="city in baseCities">
        <option :key="city">{{ city }}</option>
      </template>
    </select>
    <div 
      v-if="multipleCities" 
      class="setting__multiple-cities">
      <p class="setting__city-header">{{ $t('cities.craftItems') }}</p>
      <select 
        v-model="cities.craftItems" 
        class="city" 
        @change="changeCity">
        <template v-for="city in baseCities">
          <option :key="city">{{ city }}</option>
        </template>
      </select>
      <p 
        v-if="Object.entries(getRecipe).length == 0"
        class="setting__city-header">{{ $t('cities.resources') }}</p>
      <p 
        v-else
        class="setting__city-header">{{ $t(`resources.${Object.entries(getRecipe)[0][0]}`) }}</p>
      <select 
        v-model="cities.resourcesFirstLocation" 
        class="city" 
        @change="changeCity">
        <template v-for="city in baseCities">
          <option :key="city">{{ city }}</option>
        </template>
      </select>
      <template v-if="Object.entries(getRecipe).length == 2">
        <p class="setting__city-header">{{ $t(`resources.${Object.entries(getRecipe)[1][0]}`) }}</p>
        <select 
          v-model="cities.resourcesSecondLocation" 
          class="city" 
          @change="changeCity">
          <template v-for="city in baseCities">
            <option :key="city">{{ city }}</option>
          </template>
        </select>
      </template>
      <template v-if="isArtifactItem">
        <p class="setting__city-header">{{ artefactsCategory }}</p>
        <select 
          v-model="cities.artefacts" 
          class="city" 
          @change="changeCity">
          <template v-for="city in baseCities">
            <option :key="city">{{ city }}</option>
          </template>
        </select>
      </template>
      <template v-if="useJournals">
        <p class="setting__city-header">{{ $t('cities.journals') }}</p>
        <select 
          v-model="cities.journals" 
          class="city" 
          @change="changeCity">
          <template v-for="city in baseCities">
            <option :key="city">{{ city }}</option>
          </template>
        </select>
      </template>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "settings": "Settings",
    "useJournals": "Use journals",
    "useFocus": "Use focus",
    "updateItems": "Update current item",
    "updateResources": "Update resource prices",
    "updateArtifacts": "Update artifact prices",
    "updateJournals": "Update journal prices",
    "craftFee": "craft fee",
    "multipleCities": "Use multiple cities",
    "averageItems": "Number of items sold",
    "averagePrice": "Use average price",
    "cities": {
      "mainCity": "Main city",
      "sellItems": "Sell items",
      "craftItems": "Craft items",
      "items": "Items",
      "resources": "Resources",
      "artefacts": "Artifacts",
      "sigils": "Royal sigils",
      "skillbook": "Tome of insight",
      "journals": "Journals"
    }
  },
  "ru": {
    "settings": "Настройки",
    "useJournals": "Использовать журналы",
    "useFocus": "Использовать фокус",
    "updateItems": "Обновить цены предметов",
    "updateResources": "Обновить цены материалов",
    "updateArtifacts": "Обновить цены артефактов",
    "updateJournals": "Обновить цены журналов",
    "craftFee": "налог станка",
    "multipleCities": "Цены из разных городов",
    "averageItems": "Кол-во проданных предметов",
    "averagePrice": "Использовать среднюю цену",
    "cities": {
      "mainCity": "Основной город",
      "sellItems": "Продажа предметов",
      "craftItems": "Крафт предметов",
      "items": "Предметы",
      "resources": "Материалы",
      "artefacts": "Артефакты",
      "sigils": "Королевские знаки",
      "skillbook": "Книга интуиции",
      "journals": "Журналы"
    }
  }
}
</i18n>

<script>
import { mapState, mapGetters } from "vuex";
import { isObjectEmpty } from '../../store/utils';

export default {
  name: "Settings",
  data() {
    return {
      /**
       * Use journals to craft items or not
       */
      useJournals: false,

      /**
       * Use focus points or not
       */
      useFocus: false,

      /**
       * Show average number of sold items per day or not
       */
      showAverageItems: false,

      /**
       * Use average item price instead of order price
       */
      useAveragePrice: false,

      /**
       * Craft bench tax on item creation
       */
      fee: 10,

      /**
       * Current city or Black Market
       */
      cities: {
        sellItems: "Caerleon",
        craftItems: "Caerleon",
        resourcesFirstLocation: "Caerleon",
        resourcesSecondLocation: "Caerleon",
        artefacts: "Caerleon",
        journals: "Caerleon",
      },

      /**
       * Showed fee
       */
      showedFee: 10,

      /**
       * Use prices from diffrent cities
       */
      multipleCities: false,

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
     * Is the current item an artifact
     */
    isArtifactItem() {
      return this.$store.getters.isArtifactItem;
    },

    /**
     * Choose one: artifacts, sigils or tome of insight
     */
    artefactsCategory() {
      const itemName = this.currentItemInfo.name;
      const category = itemName.includes('ROYAL') ? 'cities.sigils' : 
      itemName.includes('INSIGHT') ? 'cities.skillbook' : 'cities.artefacts';

      return this.$t(category);
    },

    ...mapGetters([
      /**
       * Get item recipe
       */
      "getRecipe",
    ]),

    ...mapState({
      /**
       * Current item info
       */
      currentItemInfo: (state) => state.tree.currentItemInfo,
    }),
  },
  methods: {
    /**
     * Emit function on fee change
     */
    updateFee(value) {
      this.$store.commit("tree/UPDATE_CRAFT_FEE", this.fee);
    },

    /**
     * Emit function on city change
     */
    changeCity() {
      if (!this.multipleCities) {
        this.normalizeCities();
      }

      this.$store.commit("tree/SET_CITIES", this.cities);

      this.$store.dispatch("tree/CHECK_ALL");
    },

    /**
     * Set the selection of multiple cities
     */
    toggleMultipleCities() {
      if (!this.multipleCities) {
        this.normalizeCities();
      }

      this.$store.commit("tree/SET_CITIES", this.cities);

      this.$store.dispatch("tree/CHECK_ALL");
    },

    /**
     * Normalize Black Market to set correct cities in settings
     */
    normalizeCities() {
      const normalizedCity =
        this.cities.sellItems == "Black Market" ? "Caerleon" : this.cities.sellItems;

      this.cities = {
        sellItems: this.cities.sellItems,
        craftItems: normalizedCity,
        resourcesFirstLocation: normalizedCity,
        resourcesSecondLocation: normalizedCity,
        artefacts: normalizedCity,
        journals: normalizedCity,
      };
    },

    /**
     * Change useJournals checkbox state and try to update table
     */
    changeUseJournals() {
      this.$store.commit("tree/UPDATE_USE_JOURNALS", this.useJournals);

      this.$store.dispatch("tree/CHECK_ALL");
    },

    /**
     * Change useFocus checkbox state and try to update table
     */
    changeUseFocus() {
      this.$store.commit("tree/UPDATE_USE_FOCUS", this.useFocus);

      this.$store.dispatch("tree/CHECK_ALL");
    },
    
    /**
     * 
     */
    changeShowAverageItems() {
      this.$store.commit("tree/UPDATE_SHOW_AVERAGE_ITEMS", this.showAverageItems);

      this.$store.dispatch("tree/CHECK_ALL");
    },

    changeUseAveragePrice() {
      this.$store.commit("tree/UPDATE_USE_AVERAGE_PRICE", this.useAveragePrice);

      this.$store.dispatch("tree/CHECK_ALL");
    },

    /**
     * Update some part of the state and try to get new data
     *
     * @param {string} data - what we need to update
     */
    async updateState(data) {
      await this.$store.dispatch('tree/UPDATE_STATE', data);
    },
  },
};
</script>

<style scoped lang="scss">
.settings {
  display: flex;
  flex-direction: column;
  min-width: 230px;
  padding: 0px 10px 10px 10px;
  font-size: 16px;

  h2 {
    text-align: center;
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 700;
  }
}

.setting {
  font-size: 16px;
  margin-bottom: 10px;

  .checkbox {
    display: none;

    &:checked + label:after {
      background: #e08c4c;
    }

    & + label {
      position: relative;
      cursor: pointer;
      margin-left: 20px;
      padding-left: 5px;

      &:after {
        content: "";
        position: absolute;
        left: -20px;
        top: 1px;
        width: 16px;
        height: 16px;
        border: 2px solid #000;
        background: white;
        display: block;
      }
    }
  }

  &__city-header {
    font-size: 0.8rem;
  }
}

.city {
  width: 100%;
  margin-bottom: 10px;
  outline: none;
}

select {
  height: 22px;
  font-family: "Ubuntu";
  font-size: 16px;
}

.refresh {
  display: flex;
  justify-content: left;
  margin-bottom: 10px;
  cursor: pointer;

  img {
    width: 18px;
    height: 18px;
  }

  p {
    margin-left: 5px;
  }
}

.input {
  margin-bottom: 10px;
  font-size: 16px;
  position: relative;

  input {
    display: inline-block;
    outline: none;
    text-align: left;
    width: 100%;
    font-size: 14px;
    border-image-source: linear-gradient(
      90deg,
      #000000 0%,
      #000000 8%,
      #5a5a5a 30%,
      #ffffff 70%
    );
    border-image-slice: 1;
    border-width: 0 0 2px 0;
    margin-bottom: 2px;
    letter-spacing: 1px;
    padding-left: 0.4em;
    color: #222222;
  }

  span {
    position: absolute;
    left: 2.8em;
    color: #222222;
  }
}
</style>