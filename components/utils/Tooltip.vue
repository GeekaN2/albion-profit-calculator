<template>
  <div class="tooltip__table">
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
    formatPrice(price) {
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

<style>

</style>