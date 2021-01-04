<template>
  <div>
    <div class="row">
      <template v-for="item of resources">
        <img 
          :src="`/images/items/T4_${item}.png`"
          :key="item"
        >
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      resources: ["ORE", "HIDE", "FIBER", "WOOD", "ROCK"],
    };
  },
};
</script>

<style>
</style>