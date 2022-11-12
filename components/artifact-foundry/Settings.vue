<template>
  <div class="settings">
    <h2>{{ $t('settings.settings') }}</h2>
    <div class="setting">
      <input
        id="checkbox-multiple-cities"
        v-model="useMultipleCities"
        class="checkbox"
        type="checkbox"
      >
      <label for="checkbox-multiple-cities">{{ $t('settings.useMultipleCities') }}</label>
    </div>
    <div class="setting">
      <div
        class="refresh" 
        @click="updateState('artifact-prices')"
      >
        <svg-icon
          class="icon"
          icon-class="redo-alt"
        />
        <p>{{ $t('cities.updateArtifactPrices') }}</p>
      </div>
    </div>
    <div class="setting">
      <div
        class="refresh" 
        @click="updateState('fragment-prices')"
      >
        <svg-icon
          class="icon"
          icon-class="redo-alt"
        />
        <p>{{ $t('cities.updateFragmentPrices') }}</p>
      </div>
    </div>
    <h3
      v-if="useMultipleCities"
      class="sectionTitle"
    >
      {{ $t('melding') }}
    </h3>
    <div class="setting">
      <h3 class="setting__city-header">
        {{ useMultipleCities ? $t('cities.sellArtifacts') : $t('cities.mainCity') }}
      </h3>
      <select 
        v-model="cities.sellArtifacts" 
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
        {{ $t('cities.buyFragments') }}
      </h3>
      <select 
        v-model="cities.buyFragments" 
        class="city" 
      >
        <template v-for="baseCity in baseCities">
          <option :key="baseCity">
            {{ baseCity }}
          </option>
        </template>
      </select>
    </div>
    <h3
      v-if="useMultipleCities"
      class="sectionTitle"
    >
      {{ $t('salvaging') }}
    </h3>
    <div 
      v-show="useMultipleCities"
      class="setting"
    >
      <h3 class="setting__city-header">
        {{ $t('cities.sellFragments') }}
      </h3>
      <select 
        v-model="cities.sellFragments" 
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
        {{ $t('cities.buyArtifacts') }}
      </h3>
      <select 
        v-model="cities.buyArtifacts" 
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
      "melding": "Fragments melding",
      "salvaging": "Artifact salvaging"
    },
    "ru": {
      "melding": "Слияние фрагментов",
      "salvaging": "Переработка артефакта"
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
       * Use prices from different cities or not
       */
      useMultipleCities: {
        set(useMultipleCities) {
          if (!useMultipleCities) {
            this.$store.commit("artifactFoundry/SET_CITIES", this.normalizedCities(this.cities.sellFragments));
          }
  
          this.$store.commit('artifactFoundry/UPDATE_USE_MULTIPLE_CITIES', useMultipleCities);
          
  
          this.$store.dispatch("artifactFoundry/CHECK_ALL");
        },
        get() {
          return this.settings.useMultipleCities;
        }
      },
  
      /**
       * Prices from different cities
       */
      cities() {
        return new Proxy(this.$store.state.artifactFoundry.settings.cities, {
          set: (target, prop, value) => {
            let normalizedCities = { [prop]: value };
  
            if (!this.useMultipleCities && prop == 'sellFragments') {
              normalizedCities = this.normalizedCities(value);
            }
  
            this.$store.commit('artifactFoundry/SET_CITIES', normalizedCities);
            
            this.$store.dispatch("artifactFoundry/CHECK_ALL");
  
            return true;
          },
        });
      },
  
      ...mapState({
        currentItemInfo: (state) => state.artifactFoundry.currentItemInfo,
        settings: (state) => state.artifactFoundry.settings,
      }),
    },
    methods: {
      /**
       * Update some part of the state and try to get new data
       *
       * @param {string} data - what we need to update
       */
      updateState(data) {
        this.$store.dispatch('artifactFoundry/UPDATE_STATE', data);
      },
  
      /**
       * Normalize Black Market to set correct cities in settings
       */
      normalizedCities(normalizedCity) {
        return {
          sellArtifacts: normalizedCity,
          buyFragments: normalizedCity,
          sellFragments: normalizedCity,
          buyArtifacts: normalizedCity
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
  
.sectionTitle {
  font-weight: 500;
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
        background: var(--color-checked);
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
          border: 2px solid var(--color-contrast);
          background: var(--color-primary);
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
    }
  }
  
  .refresh  {
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
    width: 210px;
  }
  
  </style>