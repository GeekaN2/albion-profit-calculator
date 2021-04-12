<template>
  <div class="item-row">
    <div 
      v-for="item of row"
      :key="item.name"
      :class="[{
        'item-row--unprofitable': item.profit < 0,
        'item-row--profitable': item.profit > 0,
        'item-row--unknown': item.profit == 0,
      }, `tier${item.name.slice(1, 2)} tier item`]"
    > 
      <div class="item__base-item-info base-item-info">
        <span>{{ item.profit | formatPrice }}</span>
        <div class="base-item-info__secondary-info">
          <span class="secondary-info__profit-percentage">{{ item.percentageProfit | formatPercentage }}%</span>
        </div>
      </div>
      <div class="item__warnings">
        <img
          class="item__warnings__info"
          src="/images/info.svg"
          alt="i"
        >
        <div
          :class="[
            'item__warnings__tooltip tooltip', 
            `tooltip--tier${item.name.slice(1, 2)}`]"
        >
          <Tooltip 
            :data="tooltipData(item)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Tooltip from '../utils/Tooltip';

export default {
  name: 'ItemRow',
  components: {
    Tooltip
  },
  filters: {
    /**
     * Format the price for the convenience
     * @param {number} price - number for formatting
     */
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    /**
     * Floating point format
     */
    formatPercentage(num) {
      if (typeof num !== 'number') {
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
     * Format float
     */
    formatFloat(num) {
      return Math.floor(num) == num ? num : num.toFixed(1);
    }
  },
  props: {
    row: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState({
      settings: state => state.transmutations.settings
    })
  },
  methods: {
    /**
     * Check the date
     * if more than 1 day has passed since the last check
     * returns true
     *
     * @param {timestamp} date - last check date
     * @returns {boolean}
     */
    outdated(date) {
      const day = 24 * 60 * 60 * 1000;

      return Date.now() - new Date(date).getTime() > day;
    },

    /**
     * Add h(hours) or d(days) to date
     *
     * @param {string} date - timestamp
     */
    formatDate(date) {
      if (date.length == 0) {
        return '-';
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
     * Copy text to the clipboard
     * 
     * @param {string} text - text to copy
     */
    copyName(text) {
      this.$copyText(text);
    },

    tooltipData(item) {
      let tooltipRows = [];

      tooltipRows.push({
        name: item.name,
        price: item.price,
        percent: -item.marketFee,
        date: item.date
      });

      if (item.materialName) {
        tooltipRows.push({
          name: item.materialName,
          price: item.materialPrice,
          date: item.materialDate
        })
      }

      tooltipRows.push({
        name: 'settings.fee',
        price: item.fee,
        percent: this.settings.fee,
        date: ''
      });

      return tooltipRows;
    }
  }
}
</script>

<style lang="scss">
.subtier1 {
  background: #6afe90;
  box-shadow: 0 0 4px 5px #6afe90;
}

.subtier2 {
  background: #4bc8d2;
  box-shadow: 0 0 4px 5px #4bc8d2;
}

.subtier3 {
  background: #b987f7;
  box-shadow: 0 0 4px 5px #b987f7;
}

.text-algin-left {
  text-align: left;
}

.error {
  color: #e73939;
}

.success {
  color: #1d7d18;
}

.item-row {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 7px 0;
  border-radius: 15px;
  width: 100%;
  position: relative;

  &--profitable {
    text-shadow: .5px .5px .5px #041e04;
    color: #14a014;

    .base-item-info__secondary-info {
      color: #1bb31b;
    }
  }

  &--unprofitable {
    text-shadow: .5px .5px .5px #380404;
    color: #ae3a3a;

    .base-item-info__secondary-info {
      color: #d54c4c;
    }
  }

  &--unknown {
    text-shadow: .5px .5px .5px #242424;
    color: #585858;

    .base-item-info__secondary-info {
      color: #6a6a6a;
    }
  }

  .tier {
    width: 20%;
    text-align: right;
    padding: 4px 20px 4px 4px;
    position: relative;
  }

  .tier4 {
    border-radius: 15px 0 0 15px;
    background: #9bc8e2;
  }

  .tier5 {
    background: #eb8f87;
  }

  .tier6 {
    background: #e09255;
  }

  .tier7 {
    background: #eccc62;
  }

  .tier8 {
    border-radius: 0 15px 15px 0;
    background: #f5f5f5;
  }
}

.item {
  &__warnings {
    position: absolute;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    height: 100%;
    bottom: -1px;
    right: -1px;
    z-index: 10;
    width: 20px;

    &__icon {
      top: 6px;
      padding: 1px 0;
      width: 11px;
    }

    &__info {
      width: 10px;
      height: 10px;
    }

    &:hover &__tooltip {
      bottom: 100%;
      opacity: 1;
      visibility: visible;
    }

    &:hover &__tooltip:after {
      opacity: 1;
    }
  }
  
  &__base-item-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
}

.tooltip {
  visibility: hidden;
  right: 50%;
  transform: translateX(8%);
  bottom: 90%;
  position: absolute;
  background: #dfdfdf;
  color: #5e5e5e;
  font-weight: bold;
  transition: 0.15s;
  opacity: 0;
  border-radius: 4px;
  box-shadow: 0 0 6px 0px #6a6a6a;
  font-size: 0.75em;
  text-shadow: none;
  padding: 5px;
  white-space: nowrap;
  transition-delay: 0.03s;

  &:after {
    content: "";
    position: absolute;
    right: calc(8% - 5px);
    bottom: -5px;
    width: 10px;
    height: 10px;
    background: #dfdfdf;
    transform: rotate(45deg);
  }

  &__table {
    display: grid;
    grid-template-columns: 3fr 3fr 1fr;
    text-align: right;
    grid-gap: 5px 10px;
  }
}

.base-item-info__secondary-info {
  background: rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  font-size: 10px;
  padding-left: 3px;
  gap: 7px;
  width: 95%;
  /*color: #1c4c1b;*/
}

.tooltip {
  &--tier4 {
    transform: translateX(50%);

    &:after {
      right: calc(50% - 5px);
    }
  }

  .copy-cell {
    cursor: copy;
  }
}

@media (max-width: 840px) {
  .item-table {
    width: 100%;
    font-size: 14px;
    padding: 0 10px;
  }

  .item__warnings__icon {
    top: 6px;
    padding: 1px 0;
    width: 9px;
  }

  .item__warnings__info {
    width: 9px;
    height: 9px;
  }

  .base-item-info__secondary-info {
    font-size: 9px;
    gap: 3px;
  }
}
@media (max-width: 479px) {
  .item-table {
    width: 100%;
    font-size: 10px;
  }

  .item__warnings__icon {
    top: 6px;
    padding: 1px 0;
    width: 7px;
  }

  .base-item-info__secondary-info {
    font-size: 8px;
  }
}
</style>