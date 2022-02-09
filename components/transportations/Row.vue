<template>
  <div 
    :style="[backgroundStyle()]"
    class="row"
  >
    <ImageWithoutNumber 
      :name="item.itemId"
      class="row__image" 
    />
    <div class="vertical">
      <span 
        class="row__item-name"
        @click="copyName($t(item.itemId))"
      >{{ $t(item.itemId) }}</span>
      <div>
        <input 
          v-model.number.lazy="priceFrom"
          class="row__input"
          type="text" 
        >
        <span
          :class="[{
            'error': outdated(item.dateFrom),
            'success': !outdated(item.dateFrom)
          }, 'row__date']"
        >{{ formatDate(item.dateFrom) }}</span>

        <input 
          v-model.number.lazy="priceTo"
          class="row__input"
          type="text" 
        >
        <span
          :class="[{
            'error': outdated(item.dateTo),
            'success': !outdated(item.dateTo)
          }, 'row__date']"
        >{{ formatDate(item.dateTo) }}</span>
      </div>
    </div>
    <div class="row__profit profit">
      <span class="profit__base">{{ profit | formatPrice }}</span>
      <span class="profit__percentage">{{ percentageProfit | formatPercentage }}%</span>
      <span class="profit__percentage">{{ item.averageItems | formatFloat }}/{{ $t('days') }}</span>
    </div>
  </div>
</template>

<script>
import ImageWithoutNumber from "~/components/utils/ImageWithoutNumber";

export default {
  name: "Row",
  components: {
    ImageWithoutNumber,
  },
  filters: {
    /**
     * Floating point format
     */
    formatPercentage(num) {
      if (typeof num !== "number") {
        return 0;
      }

      if (Math.floor(num) == num) {
        return num;
      }

      num = num.toFixed(1);
      num = num > 0 ? `+${num}` : num;

      return num;
    },

    /**
     * Format numbers
     */
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    /**
     * Formats floating-point numbers
     */
    formatFloat(num) {
      return Math.floor(num) == num ? num : num.toFixed(1);
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          itemId: "T4_BAG@1",
          locationFrom: "Martlock",
          locationTo: "Caerleon",
          priceFrom: 1800,
          priceTo: 2000,
          qualityFrom: 1,
          qualityTo: 2
        };
      },
    },
  },
  data() {
    return {
      priceFrom: this.item.priceFrom,
      priceTo: this.item.priceTo,
    }
  },
  computed: {
    profit() {
      return this.priceTo - this.priceFrom
    },

    percentageProfit() {
      return (this.priceTo / this.priceFrom) * 100 - 100;
    }
  },
  methods: {
    /**
     * Copy text to the clipboard
     * 
     * @param {string} text - text to copy
     */
    copyName(text) {
      this.$copyText(text);
    },

    /**
     * Check the date
     * if more than 1 day has passed since the last check
     * returns true
     *
     * @param {timestamp} date - last check date
     * @param {string} specialCase - optionally parameter to considers outdated differently
     * @returns {boolean}
     */
     outdated(date) {
      const day = 24 * 60 * 60 * 1000;

      return Date.now() - new Date(date).getTime() > day;
    },

    /**
     * Add h(hours) or d(days) to date
     *
     * @param {Date} date - timestamp
     */
    formatDate(date) {
      if (typeof date != 'string') {
        return "-";
      }

      date = new Date(date);

      let lastCheckInHours = Math.floor(
        (Date.now() - date.getTime()) / 3600000
      );

      let lastCheckInDays = Math.floor(lastCheckInHours / 24);

      if (lastCheckInDays > 100) {
        return "∞";
      }

      return lastCheckInHours < 24
        ? lastCheckInHours + this.$t('hours')
        : Math.floor(lastCheckInHours / 24) + this.$t('days');
    },

    /**
     * Format location for styles
     * 
     * @param location - location to format
     */
    formatLocation(location) {
      return location.toLowerCase().replace(/[\s]+/g, '-');
    },

    /**
     * 
     */
    backgroundStyle() {
      const colors = {
        'Lymhurst': '#c1ffa9',
        'Black Market': 'grey',
        'Bridgewatch': '#fee98e',
        'Thetford': '#ffa7fd',
        'Martlock': '#bcfffe',
        'Fort Sterling': 'lightgrey',
        'Caerleon': '#a5d1a5'
      }

      const gradient = `linear-gradient(to right, ${colors[this.item.locationFrom]} 0%, ${colors[this.item.locationFrom]} 50%, ${colors[this.item.locationTo]} 50%, ${colors[this.item.locationTo]} 100%)`

      return {
        background: gradient
      }
    }
  },
};
</script>

<style scoped lang="scss">
.row {
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  align-items: center;
  padding: 2px 10px;
  position: relative;

  &__input {
    width: 6rem;
    background: none;
    border: none;
    border-bottom: 2px solid var(--color-contrast);
    text-align: right;
    background: var(--color-primary);
    color: var(--color-contrast);
  }

  &__item-name {
    cursor: copy;
    white-space: nowrap;
  }

  &__date {
    display: inline-block;
    min-width: 2rem;
    font-size: 0.8rem;
    text-shadow: 0.5px 0.5px #dedede;
  }

  &__profit {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }

  &:before {
    content: "";
    position: absolute;
    width: 50px;
    height: 100%;
    left: 50%;
    top: 0;
    z-index: 0;
  }
}

.profit {
  &__base {
    font-size: 1.2rem;
  }

  &__percentage {
    font-size: 0.8rem;
  }
}

.vertical {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.success {
  color: var(--success);
}

.error {
  color: var(--error);
}
</style>