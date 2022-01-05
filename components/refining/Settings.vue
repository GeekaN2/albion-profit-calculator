<template>
  <div class="settings">
    <h2>{{ $t('settings.settings') }}</h2>
    <div class="setting">
      <input
        id="checkbox-focus"
        v-model="useFocus"
        class="checkbox"
        type="checkbox"
      >
      <label for="checkbox-focus">{{ $t('settings.useFocus') }}</label>
    </div>
    <div class="setting">
      <input
        id="checkbox-multiple-cities"
        v-model="useMultipleCities"
        class="checkbox"
        type="checkbox"
      >
      <label for="checkbox-multiple-cities">{{ $t('settings.useMultipleCities') }}</label>
    </div>
    <div class="setting setting--low-margin">
      <input
        id="checkbox-own-percentage"
        v-model="useOwnPercentage"
        class="checkbox"
        type="checkbox"
      >
      <label for="checkbox-own-percentage">{{ $t('settings.ownReturnPercentage') }}</label>
    </div>
    <div 
      v-if="useOwnPercentage"
      class="setting"
    >
      <input 
        v-model.number="returnPercentage"
        class="input input--number"
        placeholder="10" 
        maxlength="5"
      >
    </div>
    <div class="setting">
      <h3>{{ $t('settings.feeForNutrition') }}</h3>
      <input 
        v-model.number="fee"
        class="input input--number"
        placeholder="10" 
        maxlength="5"
      >
    </div>
    <div class="setting">
      <div
        class="refresh" 
        @click="updateState('material-prices')"
      >
        <img src="/images/redo-alt.svg">
        <p>{{ $t('cities.updateMaterialPrices') }}</p>
      </div>
    </div>
    <div class="setting">
      <div
        class="refresh" 
        @click="updateState('resource-prices')"
      >
        <img src="/images/redo-alt.svg">
        <p>{{ $t('cities.updateResourcePrices') }}</p>
      </div>
    </div>
    <div class="setting">
      <h3 class="setting__city-header">
        {{ useMultipleCities ? $t('cities.sellMaterials') : $t('cities.mainCity') }}
      </h3>
      <select 
        v-model="cities.sellMaterials" 
        class="city" 
      >
        <template v-for="baseCity in baseCities">
          <option :key="baseCity">
            {{ baseCity }}
          </option>
        </template>
      </select>
    </div>
    <div 
      v-show="useMultipleCities"
      class="setting"
    >
      <h3 class="setting__city-header">
        {{ $t('cities.refining') }}
      </h3>
      <select 
        v-model="cities.refiningResources" 
        class="city" 
      >
        <template v-for="baseCity in baseCities">
          <option :key="baseCity">
            {{ baseCity }}
          </option>
        </template>
      </select>
    </div>
    <div 
      v-show="useMultipleCities"
      class="setting"
    >
      <h3 class="setting__city-header">
        {{ $t('cities.buyMaterials') }}
      </h3>
      <select 
        v-model="cities.buyMaterials" 
        class="city" 
      >
        <template v-for="baseCity in baseCities">
          <option :key="baseCity">
            {{ baseCity }}
          </option>
        </template>
      </select>
    </div>
    <div 
      v-show="useMultipleCities"
      class="setting"
    >
      <h3 class="setting__city-header">
        {{ $t('cities.buyResources') }}
      </h3>
      <select 
        v-model="cities.buyRawResources" 
        class="city" 
      >
        <template v-for="baseCity in baseCities">
          <option :key="baseCity">
            {{ baseCity }}
          </option>
        </template>
      </select>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "goldPrice": "Gold price",
    "sellLocation": "Sell resources",
    "buyLocation": "Buy resources",
    "updateSellPrice": "Update sell prices",
    "updateBuyPrices": "Update buy prices"
  },
  "ru": {
    "goldPrice": "Цена золота",
    "sellLocation": "Продажа ресурсов",
    "buyLocation": "Покупка ресурсов",
    "updateSellPrice": "Обновить цены продажи",
    "updateBuyPrices": "Обновить цены покупки"
  }
}
</i18n>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Settings',
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
    }
  },
  computed: {
    /**
     * Use focus points or not
     */
    useFocus: {
      set(useFocus) {
        this.$store.commit("refining/UPDATE_USE_FOCUS", useFocus);
      },
      get() {
        return this.settings.useFocus;
      }
    },

    /**
     * Use prices from different cities or not
     */
    useMultipleCities: {
      set(useMultipleCities) {
        if (!useMultipleCities) {
          this.$store.commit("refining/SET_CITIES", this.normalizedCities(this.cities.sellMaterials));
        }

        this.$store.commit('refining/UPDATE_USE_MULTIPLE_CITIES', useMultipleCities);
        

        this.$store.dispatch("refining/CHECK_ALL");
      },
      get() {
        return this.settings.useMultipleCities;
      }
    },

    /**
     * Use own return percentage or not
     */
    useOwnPercentage: {
      set(useOwnPercentage) {
        this.$store.commit('refining/UPDATE_USE_OWN_PERCENTAGE', useOwnPercentage);
      },
      get() {
        return this.settings.useOwnPercentage;
      }
    },

    /**
     * Own return percentage
     */
    returnPercentage: {
      set(returnPercentage) {
        this.$store.commit('refining/UPDATE_RETURN_PERCENTAGE', returnPercentage);
      },
      get() {
        return this.settings.returnPercentage;
      }
    },

    /**
     * Craft fee
     */
    fee: {
      set(fee) {
        this.$store.commit('refining/UPDATE_FEE', fee);
      },
      get() {
        return this.settings.fee
      }
    },

    /**
     * Prices from different cities
     */
    cities() {
      return new Proxy(this.$store.state.refining.settings.cities, {
        set: (target, prop, value) => {
          let normalizedCities = { [prop]: value };

          if (!this.useMultipleCities && prop == 'sellMaterials') {
            normalizedCities = this.normalizedCities(value);
          }

          this.$store.commit('refining/SET_CITIES', normalizedCities);
          
          this.$store.dispatch("refining/CHECK_ALL");

          return true;
        },
      });
    },

    ...mapState({
      /**
       * Current item info
       */
      currentItemInfo: (state) => state.refining.currentItemInfo,

      /**
       * Settings
       */
      settings: (state) => state.refining.settings,
    }),
  },
  methods: {
    /**
     * Update some part of the state and try to get new data
     *
     * @param {string} data - what we need to update
     */
    updateState(data) {
      this.$store.dispatch('refining/UPDATE_STATE', data);
    },

    /**
     * Normalize Black Market to set correct cities in settings
     */
    normalizedCities(normalizedCity) {
      return {
        sellMaterials: normalizedCity,
        refiningResources: normalizedCity,
        buyMaterials: normalizedCity,
        buyRawResources: normalizedCity
      };
    },
  }
}
</script>

<style scoped lang="scss">
.settings {
  display: flex;
  flex-direction: column;
  min-width: 240px;
  padding: 0px 10px 10px 10px;
  font-size: 1em;

  &__header {
    display: flex;
    justify-content: left;
  }

  h2 {
    font-size: 1.1em;
    margin-bottom: 10px;
    font-weight: 700;
  }
}

.setting {
  display: flex;
  flex-direction: column;
  font-size: 1em;
  margin-bottom: 10px;
  width: 210px;

  h3 {
    font-size: 0.85em;
    margin-bottom: 0px;
  }

  .checkbox {
    display: none;

    &:checked + label:after {
      background: #e08c4c;
    }

    & + label {
      white-space: nowrap;
      position: relative;
      cursor: pointer;
      margin-left: 20px;
      padding-left: 5px;
      font-size: 0.95em;

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

  &--low-margin {
    margin-bottom: 5px;
  }
}

.input {
  width: 100%;

  &--number {
    outline: none;
    border: none;
    border-bottom: 2px solid #000;
    transition: 0.1s;

    &:focus {
      border-bottom-color: #e19839;
    }
  }
}

.refresh  {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  cursor: pointer;

  img {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
}

.city {
  width: 210px;
}

</style>