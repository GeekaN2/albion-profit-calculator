<template>
  <div class="expert-mode">
    <h2>{{ $t('expertMode') }}</h2>
    <div class="setting">
      <input
        id="checkbox-percentage"
        v-model="useOwnPercentage"
        class="checkbox"
        type="checkbox"
      >
      <label for="checkbox-percentage">{{ $t('ownPercentage') }}</label>
      <template v-if="useOwnPercentage">
        <input 
          v-model.number="ownPercentage"
          class="input--number input--own-percentage"
          placeholder="15.2" 
          maxlength="5"
        >
      </template>
    </div>
    <div class="setting">
      <input
        id="checkbox-minprice"
        v-model="useMinPricesNormalization"
        class="checkbox"
        type="checkbox"
      >
      <label for="checkbox-minprice">{{ $t('useMinPrices') }}</label>
    </div>
    <div class="setting">
      <h3>{{ $t('ownQualities') }}</h3>
      <input  
        id="normal"
        v-model.number="qualities"
        class="quality quality--normal"
        type="checkbox"
        value="1"
      >
      <label for="normal" />
      <input
        id="good"
        v-model.number="qualities"
        class="quality quality--good"
        type="checkbox"
        value="2"
      >
      <label for="good" />
      <input 
        id="outstanding"
        v-model.number="qualities"
        class="quality quality--outstanding"
        type="checkbox" 
        value="3"
      >
      <label for="outstanding" />
      <input
        id="excellent"
        v-model.number="qualities"
        class="quality quality--excellent"
        type="checkbox" 
        value="4"
      >
      <label for="excellent" />
      <input
        id="masterpiece"
        v-model.number="qualities"
        class="quality quality--masterpiece"
        type="checkbox"   
        value="5"
      >
      <label for="masterpiece" />
    </div>
    <div class="setting">
      <h3>{{ $t('numberOfItemsToCraft') }}</h3>
      <input
        v-model.number="itemsMultiplier"
        class="input input--number"
        type="number"
        placeholder="1"
      >
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "expertMode": "Expert settings",
    "ownPercentage": "Use own return %",
    "useMinPrices": "Use min item prices",
    "ownQualities": "Item qualities",
    "numberOfItemsToCraft": "Number of items to craft"
  },
  "ru": {
    "expertMode": "Режим эксперта",
    "ownPercentage": "Свой % возврата",
    "useMinPrices": "Использовать мин. цены предметов",
    "ownQualities": "Качества предметов",
    "numberOfItemsToCraft": "Количество предметов для крафта"
  }
}
</i18n>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ExpertSettings',
  data() {
    return {
      /**
       * Prevents the lack of qualities
       */
      lastQualities: [1, 2, 3]
    }
  },
  computed: {
    /**
     * Use own return percentage or not
     */
    useOwnPercentage: {
      set(useOwnPercentage) {
        this.$store.commit('tree/UPDATE_USE_OWN_PERCENTAGE', useOwnPercentage);
      },
      get() {
        return this.settings.expert.useOwnPercentage;
      }
    },

    /**
     * Change normalized items algorithm
     */
    useMinPricesNormalization: {
      set(useMinPricesNormalization) {
        this.$store.commit('tree/UPDATE_USE_MIN_PRICES_NORMALIZATION', useMinPricesNormalization);
      },
      get() {
        return this.settings.expert.useMinPricesNormalization;
      }
    },

    /**
     * Own return percentage
     */
    ownPercentage: {
      set(ownPercentage) {
        
        this.$store.commit('tree/UPDATE_OWN_RETURN_PECENTAGE', ownPercentage);
      },
      get() {
        return this.settings.returnPercentage;
      }
    },

    itemsMultiplier: {
            set(numberOfItems) {
                this.$store.commit("tree/SET_ITEMS_MULTIPLIER", numberOfItems);
            },
            get() {
                return this.$store.state.tree.settings.itemsMultiplier;
            },
        },

    qualities: {
      set(qualities, event) {
        if (qualities.length == 0) {
          qualities = [this.lastQualities[0] % 5 + 1];
        }

        this.$store.commit('tree/UPDATE_QUALITIES', qualities);

        this.lastQualities = qualities;
      },
      get() {
        return this.settings.expert.qualities;
      }
    },

    ...mapState({
      settings: (state) => state.tree.settings
    })
  },
}
</script>

<style scoped lang="scss">
.expert-mode {
  h2 {
    font-size: 1.1em;
    font-weight: bold;
    margin-bottom: 10px;
  }
}

.setting {
  font-size: 1em;
  margin-bottom: 10px;
  width: 200px;

  .checkbox {
    display: none;

    &:checked + label:after {
      background: var(--color-checked-analog);
    }

    & + label {
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

  h3 {
    font-size: 0.85em;
    margin-bottom: 5px;
  }

  .quality {
    display: none;

    &:checked + label:after {
      background: var(--color-primary);
    }

    & + label {
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
        width: 18px;
        height: 18px;
        border: 2px solid var(--color-contrast);
        background: var(--color-primary);
        display: block;
      }
    }
    
    &--normal:checked + label:after {
      background: var(--normal-quality);
    }

    &--good:checked + label:after {
      background: var(--good-quality);
    }

    &--outstanding:checked + label:after {
      background: var(--outstanding-quality);
    }

    &--excellent:checked + label:after {
      background: var(--excellent-quality);
    }

    &--masterpiece:checked + label:after {
      background: var(--masterpiece-quality);
    }
  }
}

.input {
  &--number {
    outline: none;
    border: none;
    border-bottom: 2px solid var(--color-contrast);
    transition: 0.1s;
    background: var(--color-primary);
    color: var(--color-contrast);

    &:focus {
      border-bottom-color: var(--color-checked-analog);
    }
  }
  
  &--own-percentage {
    margin-top: 5px;
  }
}

@media (max-width: 1200px) {
  .expert-mode {
    font-size: 0.9rem;
  }
}

@media (max-width: 1080px) {
  .expert-mode {
    font-size: 0.95rem;
  }
}

@media (max-width: 840px) {
  .expert-mode {
    font-size: 0.9rem;
  }
}
</style>