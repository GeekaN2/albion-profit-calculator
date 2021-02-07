<template>
  <div class="settings">
    <h2>{{ $t('settings.settings') }}</h2>
    <div class="setting">
      <h3>{{ $t('goldPrice') }}</h3>
      <input 
        v-model.number="gold"
        class="input input--number"
        placeholder="3000" 
        maxlength="6"
        @change="updateGold"
      >
    </div>
    <div class="setting">
      <h3>{{ $t('settings.fee') }}</h3>
      <input 
        v-model.number="fee"
        class="input input--number"
        placeholder="10" 
        maxlength="5"
        @change="updateFee"
      >
    </div>
    <div class="setting">
      <div
        class="refresh" 
        @click="updateState('sell-items')"
      >
        <img src="/images/redo-alt.svg">
        <p>{{ $t('updateSellPrice') }}</p>
      </div>
    </div>
    <div class="setting">
      <div
        class="refresh" 
        @click="updateState('buy-items')"
      >
        <img src="/images/redo-alt.svg">
        <p>{{ $t('updateBuyPrices') }}</p>
      </div>
    </div>
    <div class="setting">
      <h3 class="setting__city-header">
        {{ $t('sellLocation') }}
      </h3>
      <select 
        v-model="cities.sellResourcesLocation" 
        class="city" 
        @change="changeCity"
      >
        <template v-for="baseCity in baseCities">
          <option :key="baseCity">
            {{ baseCity }}
          </option>
        </template>
      </select>
    </div>
    <div class="setting">
      <h3 class="setting__city-header">
        {{ $t('buyLocation') }}
      </h3>
      <select 
        v-model="cities.buyResourcesLocation" 
        class="city" 
        @change="changeCity"
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
export default {
  name: 'Settings',
  data() {
    return {
      gold: 3000,
      fee: 10,
      cities: {
        sellResourcesLocation: 'Caerleon',
        buyResourcesLocation: 'Caerleon'
      },

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
  methods: {
    updateGold() {
      this.$store.commit('transmutations/UPDATE_GOLD', this.gold);
    },

    updateFee() {
      this.$store.commit('transmutations/UPDATE_FEE', this.fee);
    },

    changeCity() {
      this.$store.commit('transmutations/UPDATE_CITIES', this.cities);
      this.$store.dispatch('transmutations/CHECK_ALL');
    },

    /**
     * Update some part of the state and try to get new data
     *
     * @param {string} data - what we need to update
     */
    updateState(data) {
      this.$store.dispatch('transmutations/UPDATE_STATE', data);
    },
  }
}
</script>

<style scoped lang="scss">
.settings {
  display: flex;
  flex-direction: column;
  min-width: 230px;
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
  width: 200px;

  h3 {
    font-size: 0.85em;
    margin-bottom: 0px;
  }
}

.input {
  width: 185px;
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
  width: 185px;
}

</style>