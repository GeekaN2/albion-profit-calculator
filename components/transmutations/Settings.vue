<template>
  <div class="settings">
    <h2>{{ $t("settings.settings") }}</h2>
    <div class="setting">
      <h3>{{ $t("settings.feeForNutrition") }}</h3>
      <input
        v-model.number="fee"
        class="input input--number"
        placeholder="800"
        maxlength="10"
      >
    </div>
    <div class="setting">
      <h3
        v-tooltip="{
          placement: 'right',
          content: `${$t('needToCalcGlobalDiscount')} (${globalDiscount.toFixed(3)})`,
        }"
      >
        {{ $t("gameItemFee") }}
        <svg-icon icon-class="question-circle" />
      </h3>
      <div class="settingRow">
        <input
          v-model.number="gameItemFee"
          class="input input--number gameItemFee"
          placeholder="33500"
          maxlength="20"
          :disabled="settings.isCalibrated"
        >
        {{ globalDiscount.toFixed(3) }}
      </div>
      <Button
        :text="settings.isCalibrated ? $t('settings.change') : $t('settings.calibrate')"
        classname="freeze"
        @click="setIsCalibrated"
      />
    </div>
    <div class="setting">
      <input
        id="checkbox-ways"
        v-model="showTransmutationWays"
        class="checkbox"
        type="checkbox"
      >
      <label for="checkbox-ways">{{ $t("showTransmutationWays") }}</label>
    </div>
    <div class="setting">
      <div
        class="refresh"
        @click="updateState('sell-items')"
      >
        <svg-icon
          class="icon"
          icon-class="redo-alt"
        />
        <p>{{ $t("updateSellPrice") }}</p>
      </div>
    </div>
    <div class="setting">
      <div
        class="refresh"
        @click="updateState('buy-items')"
      >
        <svg-icon
          class="icon"
          icon-class="redo-alt"
        />
        <p>{{ $t("updateBuyPrices") }}</p>
      </div>
    </div>
    <div class="setting">
      <h3 class="setting__city-header">
        {{ $t("sellLocation") }}
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
        {{ $t("buyLocation") }}
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
    "sellLocation": "Sell resources",
    "showTransmutationWays": "Transmutation ways",
    "buyLocation": "Buy resources",
    "updateSellPrice": "Update sell prices",
    "updateBuyPrices": "Update buy prices",
    "gameItemFee": "T4.3 → T4.4 transmutation cost",
    "needToCalcGlobalDiscount": "Necessary to calculate the global discount"
  },
  "ru": {
    "sellLocation": "Продажа ресурсов",
    "showTransmutationWays": "Пути трансмутации",
    "buyLocation": "Покупка ресурсов",
    "updateSellPrice": "Обновить цены продажи",
    "updateBuyPrices": "Обновить цены покупки",
    "gameItemFee": "T4.3 → T4.4 transmutation cost",
    "needToCalcGlobalDiscount": "Нужно для расчета глобальной скидки"
  }
}
</i18n>

<script>
import { mapState, mapGetters } from "vuex";
import Button from "../utils/Button.vue";

export default {
  name: "Settings",
  components: {
    Button,
  },
  data() {
    return {
      cities: {
        sellResourcesLocation: "Caerleon",
        buyResourcesLocation: "Caerleon",
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
        "Brecilien",
      ],
    };
  },
  computed: {
    /**
     * Show transmutation ways insted of profit tables
     */
    showTransmutationWays: {
      set(showTransmutationWays) {
        this.$store.commit(
          "transmutations/UPDATE_SHOW_TRANSMUTATION_WAYS",
          showTransmutationWays
        );
      },
      get() {
        return this.settings.showTransmutationWays;
      },
    },

    fee: {
      set(fee) {
        this.$store.commit("transmutations/UPDATE_FEE", fee);
      },
      get() {
        return this.settings.fee;
      },
    },

    gameItemFee: {
      set(gameItemFee) {
        this.$store.commit("transmutations/UPDATE_GAME_ITEM_FEE", gameItemFee);
      },
      get() {
        return this.settings.gameItemFee;
      },
    },

    ...mapState({
      settings: (state) => state.transmutations.settings,
    }),

    ...mapGetters({
      globalDiscount: "transmutations/globalDiscount",
    }),
  },
  methods: {
    /**
     * Change cities at the state
     */
    changeCity() {
      this.$store.commit("transmutations/UPDATE_CITIES", this.cities);
      this.$store.dispatch("transmutations/CHECK_ALL");
    },

    setIsCalibrated() {
      this.$store.commit("transmutations/UPDATE_SET_LAST_GLOBAL_DISCOUNT", this.globalDiscount)
      this.$store.commit("transmutations/UPDATE_IS_CALIBRATED", !this.settings.isCalibrated);
    },


    /**
     * Update some part of the state and try to get new data
     *
     * @param {string} data - what we need to update
     */
    updateState(data) {
      this.$store.dispatch("transmutations/UPDATE_STATE", data);
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
  min-width: 220px;
  gap: var(--space-2-xs);

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
      padding-left: 0px;
      font-size: 0.95em;

      &:after {
        content: "";
        position: absolute;
        left: -20px;
        top: 2px;
        width: 15px;
        height: 15px;
        border: 2px solid var(--color-contrast);
        background: var(--color-primary);
        display: block;
      }
    }
  }

  h3 {
    font-size: 0.85em;
    margin-bottom: 0px;
  }
}

.input {
  width: 185px;
  background: var(--color-primary);
  color: var(--color-contrast);

  &--number {
    outline: none;
    border: none;
    border-bottom: 2px solid var(--color-contrast);
    transition: 0.1s;

    &:focus {
      border-bottom-color: var(--color-focus);
    }

    &:disabled {
      background: var(--color-primary-analog);
    }
  }
}

.refresh {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  cursor: pointer;

  & .icon {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
}

.city {
  width: 185px;
}

.settingRow {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: var(--space-s);
}

.gameItemFee {
  min-width: 50px;
}

.freeze {
  width: max;
}
</style>
