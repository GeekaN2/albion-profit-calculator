<template>
  <div class="guides">
    <img
      class="guides__icon"
      src="/images/book-spells.svg"
      @click="showModal"
    >
    <div
      v-if="isGuideShown"
      class="guide"
    >
      <ProfitTreeGuide
        v-if="guide == 'profit-tree'"
        v-click-outside="hideModal"
        class="guide__modal"
      />
    </div>
  </div>
</template>

<script>
import ProfitTreeGuide from "./ProfitTreeGuide";

export default {
  name: "Guide",
  components: {
    ProfitTreeGuide,
  },
  props: {
    guide: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isGuideShown: true,
    };
  },
  methods: {
    showModal() {
      if (!this.isGuideShown) {
        this.isGuideShown = true;
      }
    },

    hideModal() {
      if (this.isGuideShown) {
        this.isGuideShown = false;
      }
    },
  },
};
</script>

<style lang="scss">
.guides {
  display: inline-block;

  &__icon {
    width: 15px;
    cursor: pointer;
  }
}

.guide {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  margin: 0 auto;
  background: rgba(73, 48, 48, 0.15);
  min-height: 100vh;
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  font-weight: normal;
  z-index: 20;

  &__modal {
    max-width: 700px;
    width: 80%;
    box-shadow: rgb(158, 158, 158) 0 5px 10px 0;
    margin: 15px auto;
    padding: 10px;
    background: #fff;
    border-radius: 20px;
  }

  &__header {
    font-size: 1.1em;
    font-weight: bold;
    margin-bottom: 5px;
  }

  &__subtitle {
    font-size: 1.1em;
    display: block;
    font-weight: bold;
  }

  &__close {
    width: 20px;
    height: 20px;
  }

  &__paragraph {
    margin: 10px 0;
    padding: 0 10px;
    font-size: 0.9em;
    line-height: 1.3;
    text-align: left;
  }

  &__code {
    background: #a3a3a3;
    font-size: 0.9em;
    color: #fff;
    padding: 1px 5px;
    border-radius: 5px;
    font-family: Consolas, sans-serif;
  }

  &__image {
    border-radius: 4px;
    width: 100%;
    box-shadow: #d5d3d3 0 3px 6px 0px;
    margin: 10px 0;

    &--inline {
      display: inline-block;
      width: auto;
      margin: 0;
      margin-bottom: -0.2em;
      height: 1.2em;
    }
  }

  &__svg {
    height: 1em;
    margin-bottom: -0.1em;
  }

  &__span {
    &--green {
      color: #14a014;
    }

    &--red {
      color: #ae3a3a;
    }

    &--gray {
      color: #585858;
    }
  }

  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>