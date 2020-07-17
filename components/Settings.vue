<template>
  <div class="settings">
    <h2>{{ $t('settings') }}</h2>
    <div class="setting">
      <input 
        id="checkbox" 
        v-model="useJournals" 
        type="checkbox" 
        @change="$emit('changeUseJournals', useJournals)"
      >
      <label for="checkbox">{{ $t('useJournals') }}</label>
    </div>
    <div 
      class="refresh" 
      @click="$emit('dropStore','journals')">
      <img 
        src="/images/redo-alt.svg" 
        alt >
      <p>{{ $t('updateJournals') }}</p>
    </div>
    <div 
      class="refresh" 
      @click="$emit('dropStore', 'items')">
      <img 
        src="/images/redo-alt.svg" 
        alt >
      <p>{{ $t('updateItems') }}</p>
    </div>
    <div 
      class="refresh" 
      @click="$emit('dropStore', 'resources')">
      <img 
        src="/images/redo-alt.svg" 
        alt >
      <p>{{ $t('updateResources') }}</p>
    </div>
    <div class="input">
      <input 
        :value="fee"
        placeholder="0"
        maxlength="4"
        @change="updateFee($event.target.value)">
      <span>% {{ $t('craftFee') }}</span>
    </div>
    <select 
      v-model="city" 
      class="city"
      @change="$emit('changeCity', city)"
    >
      <option>Caerleon</option>
      <option>Black Market</option>
      <option>Bridgewatch</option>
      <option>Fort Sterling</option>
      <option>Lymhurst</option>
      <option>Martlock</option>
      <option>Thetford</option>
    </select>
  </div>
</template>

<i18n>
{
  "en": {
    "settings": "Settings",
    "useJournals": "Use journals",
    "updateJournals": "Update journal prices",
    "updateItems": "Update current item",
    "updateResources": "Update resource prices",
    "craftFee": "craft fee"
  },
  "ru": {
    "settings": "Настройки",
    "useJournals": "Использовать журналы",
    "updateJournals": "Обновить цену журналов",
    "updateItems": "Обновить цену предметов",
    "updateResources": "Обновить цену ресурсов",
    "craftFee": "налог станка"
  }
}
</i18n>

<script>
export default {
  name: "Settings",
  props: {
    loadingText: {
      type: String,
      default: ''
    },
    fee: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      useJournals: false,
      city: "Caerleon",
      showedFee: 10,
    };
  },
  methods: {
    updateFee: function (value) {
      this.$emit('inputFee', value);
    }
  }
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

  input[type="checkbox"] {
    display: none;

    &:checked + label:after {
      background: #e08c4c;
      animation: gradient 60s ease infinite;
    }
  }

  label[for="checkbox"] {
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

.city {
  width: 100%;
  margin-bottom: 10px;
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
    text-align: left;
    width: 100%;
    font-size: 14px;
    border-image-source: linear-gradient(90deg, #000000 0%,#000000 8%, #5a5a5a 30%, #ffffff 70%);  
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