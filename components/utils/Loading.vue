<template>
  <div 
    v-if="text.length > 0" 
    class="container">
    <span class="container__loading">{{ $t(text) }}</span>
  </div>
</template>

<i18n>
{
  "en": {
    "items": "Loading item prices",
    "artefacts": "Loading artifact prices",
    "resources": "Loading resource prices",
    "journals": "Loading journal prices",
    "averageData": "Loading average data",
    "calculated": "Profit calculated"
  },
  "ru": {
    "items": "Загружаем цены предметов",
    "artefacts": "Загружаем цены артефактов",
    "resources": "Загружаем цены материалов",
    "journals": "Загружаем цены журналов",
    "averageData": "Загружаем средние значения",
    "calculated": "Профит посчитан"
  }
}
</i18n>

<script>
export default {
  name: "Loading",
  computed: {
    /**
     * Text of loading
     */
    text() {
      return this.$store.getters['tree/loadingText'];
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  text-align: center;
  color: #3e3e3e;

  &__loading {
    padding: 2px;
    position: relative;
    font-size: 1rem;

    &:after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2.5px;
      background: linear-gradient(270deg, #2aa4f0, #f06e62, #ee7c25, #f1c946);
      background-size: 1000% 1000%;
      animation: gradient 60s ease infinite;
      border-radius: 1px;
    }

    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  }
}

@media (max-width: 1200px) {
  .container__loading {
    font-size: 1rem;
  }
}

@media (max-width: 991px) {
.container__loading {
    font-size: 0.9rem;
  }
}

@media (max-width: 840px) {
.container__loading {
    font-size: 0.9rem;
  }
}

@media (max-width: 479px) {
.container__loading {
    font-size: 0.7rem;
  }
}
</style>