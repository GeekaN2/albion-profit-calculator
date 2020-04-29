<template>
  <div class="settings">
    <h2>Settings</h2>
    <div class="setting">
      <input 
        id="checkbox" 
        v-model="useJournals" 
        type="checkbox" 
        @change="$emit('changeUseJournals', useJournals)"
      >
      <label for="checkbox">Use journals</label>
    </div>
    <div 
      class="refresh_item" 
      @click="$emit('dropStore','journals')">
      <img 
        src="/images/redo-alt.svg" 
        alt >
      <p>Update journal prices</p>
    </div>
    <div 
      class="refresh_item" 
      @click="$emit('dropStore', 'items')">
      <img 
        src="images/redo-alt.svg" 
        alt >
      <p>Update current item</p>
    </div>
    <div 
      class="refresh_item" 
      @click="$emit('dropStore', 'resources')">
      <img 
        src="/images/redo-alt.svg" 
        alt >
      <p>Update resource prices</p>
    </div>
    <!--<div class="refresh_item">
      <img 
        src="images/sync-alt.svg" 
        alt >
      <p>Reload all prices</p>
    </div>-->
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

<script>
export default {
  name: "Settings",
  props: {
    loadingText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      useJournals: false,
      city: "Caerleon"
    };
  }
};
</script>

<style scoped lang="scss">
.settings {
  display: flex;
  flex-direction: column;
  width: 250px;
  padding: 10px;
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

.refresh_item {
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
</style>