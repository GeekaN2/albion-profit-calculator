<template>
  <div class="row">
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
    createClassName(name = "") {
      return name.replace(/[^A-Za-z0-9]/g, "-").toLowerCase();
    },
    getColor(location) {
      switch (location) {
        case "Martlock":
          return "cyan";
          break;
        case "Caerleon":
          return "darkgreen";
          break;
      }
    },
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
  },
};
</script>

<style lang="scss">
.row {
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  align-items: center;

  &__input {
    width: 6rem;
    background: none;
    border: none;
    border-bottom: 2px solid #000;
    text-align: right;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      color: #000;
      width: 100%;
      height: 100%;
      background: #00f;
      border:10px solid #0ff;
    }
  }

  &__item-name {
    cursor: copy;
  }

  &__date {
    display: inline-block;
    min-width: 2rem;
    font-size: 0.8rem;
  }

  &__profit {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
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

.martlock {
  background: cyan;
}

.caerleon {
  background: darkgreen;
}

.success {
  color: #1d7d18;
}

.error {
  color: #e73939;
}
</style>