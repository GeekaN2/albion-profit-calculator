<template>
  <img 
    :src="`/images/items/${name}.png`"
    :alt="name"
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
}

@media (max-width: 1200px) {
  .image-without-number {
    width: 65px;
  }
}

@media (max-width: 991px) {
  .image-without-number {
    width: 55px;
  }
}

@media (max-width: 840px) {
  .image-without-number {
    width: 50px;
  }
}

@media (max-width: 479px) {
  .image-without-number {
    width: 40px;
  }
}
</style>