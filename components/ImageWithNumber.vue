<template>
  <div class="image-with-number">
    <img 
      :src="`/images/${name}.png`"
      :alt="name"
    >
    <span class="number-in-image">{{ number }}</span>
  </div>
</template>

<script>
export default {
  name: "ImageWithNumber",
  props: {
    name: {
      type: String,
      default: "",
    },
    number: {
      type: String,
      default: '0'
    }
  },
};
</script>

<style lang="scss">
.image-with-number {
  position: relative;
  display: block;
  width: 65px;

  .number-in-image {
    position: absolute;
    text-align: center;
    font-size: 0.8rem;
    right: 15%;
    bottom: 20%;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
    padding: 0 5px;
    border-radius: 5px;
  }
}

@media (max-width: 1200px) {
  .image-with-number {
    width: 65px;
  }
}

@media (max-width: 991px) {
  .image-with-number {
    width: 55px;
  }
}

@media (max-width: 840px) {
  .image-with-number {
    width: 50px;
  }
}

@media (max-width: 479px) {
  .image-with-number {
    width: 40px;
  }
}
</style>