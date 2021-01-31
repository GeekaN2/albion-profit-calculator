<template>
  <img
    :src="`/images/items/${name}.png`"
    class="image-without-number"
  >
</template>

<script>
export default {
  name: "ImageWithoutNumber",
  props: {
    name: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
.image-without-number {
  position: relative;
  display: block;
  width: 65px;
  min-width: 65px;
  min-height: 65px;
}

@media (max-width: 1200px) {
  .image-without-number {
    width: 65px;
    min-width: 65px;
    min-height: 65px;
  }
}

@media (max-width: 991px) {
  .image-without-number {
    width: 55px;
    min-width: 55px;
    min-height: 55px;
  }
}

@media (max-width: 840px) {
  .image-without-number {
    width: 50px;
    min-width: 50px;
    min-height: 50px;
  }
}

@media (max-width: 479px) {
  .image-without-number {
    width: 40px;
    min-width: 40px;
    min-height: 40px;
  }
}
</style>