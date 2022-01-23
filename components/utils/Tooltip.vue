<template>
  <div class="tooltip__table tooltip">
    <template v-for="row of data">
      <div
        :key="`${JSON.stringify(row)}:0`"
        class="text-algin-left copy-cell"
        @click="copyName($t(row.name))"
      >
        {{ $t(row.name) }}
        {{ row.additionalData ? `(${row.additionalData})` : '' }}
        {{ row.percent ? `${row.percent}%` : '' }}
      </div>
      <div
        :key="`${JSON.stringify(row)}:1`"
        :class="{
          'error': row.price == 0
        }"
      >
        {{ row.price | formatPrice }}
      </div>
      <div
        :key="`${JSON.stringify(row)}:2`"
        :class="{
          'error': outdated(row.date),
          'success': !outdated(row.date)
        }"
      >
        {{ formatDate(row.date) }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  filters: {
    /**
     * Format the price for the convenience
     * @param {number} price - number for formatting
     */
    formatPrice(price = 0) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
  props: {
    /**
     * Array of objects in each store data for a specific line 
     */
    data: {
      type: Array,
      default: () => []
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
      if (!date || date.length == 0) {
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
  }
}
</script>

<style scoped lang="scss">
.tooltip {
  right: 50%;
  transform: translateX(8%);
  bottom: 90%;
  position: absolute;
  background: #dfdfdf;
  color: #5e5e5e;
  font-weight: bold;
  transition: 0.15s;
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

.text-algin-left {
  text-align: left;
}

.error {
  color: var(--error);
}

.success {
  color: var(--success);
}

.copy-cell {
  cursor: copy;
}
</style>