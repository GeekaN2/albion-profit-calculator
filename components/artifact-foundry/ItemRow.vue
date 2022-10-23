<template>
  <div class="item-row">
    <div 
      v-for="item of row"
      :key="item.branch + item.tier"
      :class="[{
        'item-row--unprofitable': item.profit < 0,
        'item-row--profitable': item.profit > 0,
        'item-row--unknown': item.profit == 0,
      }, `tier${item.tier} tier item`]"
    > 
      <div class="item__base-item-info base-item-info">
        <span>{{ item.profit | formatPrice }}</span>
        <div class="base-item-info__secondary-info">
          <span class="secondary-info__profit-percentage">{{ item.profitPercentage | formatPercentage }}%</span>
        </div>
      </div>
      <div
        class="item__warnings"
        @click="extendCell(item.branch, item.tier)"
      >
        <svg-icon
          class="item__warnings__info"
          icon-class="info-circle-outline"
          alt="i"
        />
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    name: 'ItemRow',
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

      extendCell(branch, tier) {
        console.log('BLA');
        this.$store.commit('artifactFoundry/SET_EXTENDED_CELL', {
          branch,
          tier
        })
      }
    }
  }
  </script>
  
  <style scoped lang="scss">
  
  .text-algin-left {
    text-align: left;
  }
  
  .error {
    color: var(--error);
  }
  
  .success {
    color: var(--success);
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
      text-shadow: .5px .5px .5px var(--color-profitable-shadow);
      color: var(--color-profitable);
  
      .base-item-info__secondary-info {
        color: var(--color-profitable-secondary);
      }
    }
  
    &--unprofitable {
      text-shadow: .5px .5px .5px var(--color-unprofitable-shadow);
      color: var(--color-unprofitable);
  
      .base-item-info__secondary-info {
        color: var(--color-unprofitable-secondary);
      }
    }
  
    &--unknown {
      text-shadow: .5px .5px .5px var(--color-unknown-shadow);
      color: var(--color-unknown);
  
      .base-item-info__secondary-info {
        color: var(--color-unknown-secondary);
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
      background: var(--tier4);
    }
  
    .tier5 {
      background: var(--tier5);
    }
  
    .tier6 {
      background: var(--tier6);
    }
  
    .tier7 {
      background: var(--tier7);
    }
  
    .tier8 {
      border-radius: 0 15px 15px 0;
      background: var(--tier8);
    }
  }
  
  .item {
    &__warnings {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100%;
      bottom: 2px;
      right: -1px;
      z-index: 10;
      width: 20px;
      color: var(--color-unknown);

      &__info {
        width: 15px;
        height: 15px;
        cursor: pointer;
      }
    }
    
    &__base-item-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
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
  }
  
  .tooltip {
    &--tier4 {
      transform: translateX(50%);
  
      &:after {
        right: calc(50% - 5px);
      }
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