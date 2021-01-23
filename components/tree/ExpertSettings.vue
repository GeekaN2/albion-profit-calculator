<template>
  <div class="expert-mode">
    <h2>{{ $t('expertMode') }}</h2>
    <div class="setting">
      <input
        id="checkbox-percentage"
        v-model="useOwnPercentage"
        class="checkbox"
        type="checkbox"
        @change="changeUseOwnPercentage"
      >
      <label for="checkbox-percentage">{{ $t('ownPercentage') }}</label>
      <template v-if="useOwnPercentage">
        <input 
          v-model.number.lazy="ownPercentage"
          class="input--number input--own-percentage"
          placeholder="15.2" 
          maxlength="5"
          @change="updateOwnPercentage"
        >
      </template>
    </div>
    <div class="setting">
      <input
        id="checkbox-minprice"
        v-model="useMinPriceNormalization"
        class="checkbox"
        type="checkbox"
        @change="changeUseMinPrices"
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
        @change="changeQualities">
      <label for="normal" />
      <input
        id="good"
        v-model.number="qualities"
        class="quality quality--good"
        type="checkbox"
        value="2"
        @change="changeQualities">
      <label for="good" />
      <input 
        id="outstanding"
        v-model.number="qualities"
        class="quality quality--outstanding"
        type="checkbox" 
        value="3"
        @change="changeQualities">
      <label for="outstanding" />
      <input
        id="excellent"
        v-model.number="qualities"
        class="quality quality--excellent"
        type="checkbox" 
        value="4"
        @change="changeQualities">
      <label for="excellent" />
      <input
        id="masterpiece"
        v-model.number="qualities"
        class="quality quality--masterpiece"
        type="checkbox"   
        value="5"
        @change="changeQualities">
      <label for="masterpiece" />
    </div>
  </div>
  
</template>

<i18n>
{
  "en": {
    "expertMode": "Expert settings",
    "ownPercentage": "Use own return %",
    "useMinPrices": "Use min item prices",
    "ownQualities": "Item qualities"
  },
  "ru": {
    "expertMode": "Режим эксперта",
    "ownPercentage": "Свой % возврата",
    "useMinPrices": "Использовать мин. цены предметов",
    "ownQualities": "Качества предметов"
  }
}
</i18n>

<script>
export default {
  name: 'ExpertSettings',
  data() {
    return {
      /**
       * Use own return percentage or not
       */
      useOwnPercentage: false,

      /**
       * Own return percentage
       */
      ownPercentage: 15.2,

      /**
       * Change normalized items algorithm
       */
      useMinPriceNormalization: false,

      qualities: [1, 2, 3]
    }
  },
  methods: {
    /**
     * Switch setting to use own percentage or not
     */
    changeUseOwnPercentage() {
      this.$store.commit('tree/UPDATE_USE_OWN_PERCENTAGE', this.useOwnPercentage);
    },

    /**
     * Update return percentage
     */
    updateOwnPercentage() {
      this.$store.commit('tree/UPDATE_OWN_RETURN_PECENTAGE', this.ownPercentage);
    },

    /**
     * Use other normalized algorithm
     */
    changeUseMinPrices() {
      this.$store.commit('tree/UPDATE_USE_MIN_PRICES_NORMALIZATION', this.useMinPriceNormalization);
    },

    /**
     * Update needed item qualities
     */
    changeQualities(event) {
      if (this.qualities.length == 0) {
        const otherQuality = Number(event.target.attributes.value.value) % 5 + 1;
        this.$set(this.qualities, 0, otherQuality);
      }

      this.$store.commit('tree/UPDATE_QUALITIES', this.qualities);
    }
  }
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
      background: #3963e1;
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
        border: 2px solid #000;
        background: white;
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
      background: #fff;
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
        border: 2px solid #000;
        background: white;
        display: block;
      }
    }
    
    &--normal:checked + label:after {
      background: #acacac;
    }

    &--good:checked + label:after {
      background: #5788bd;
    }

    &--outstanding:checked + label:after {
      background: #db9c63;
    }

    &--excellent:checked + label:after {
      background: #d5d5d5;
    }

    &--masterpiece:checked + label:after {
      background: #fdb44f;
    }
  }
}

.input {
  &--number {
    outline: none;
    border: none;
    border-bottom: 2px solid #000;
    transition: 0.1s;

    &:focus {
      border-bottom-color: #3963e1;
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