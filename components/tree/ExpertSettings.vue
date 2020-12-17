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
  </div>
  
</template>

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
      ownPercentage: 15.2
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
    }
  }
}
</script>

<i18n>
{
  "en": {
    "expertMode": "Expert settings",
    "ownPercentage": "Use own return %"
  },
  "ru": {
    "expertMode": "Режим эксперта",
    "ownPercentage": "Свой % возврата"
  }
}
</i18n>

<style lang="scss">
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