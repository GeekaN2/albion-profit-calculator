<template>
  <div class="price-with-date">
    <span class="price">{{ formatPrice(price) }}</span>
    <span
      :class="['date', {
        'profitable': !isOutdated,
        'unprofitable': isOutdated,
      }]"
    >{{ formatDate(date) }}</span>
  </div>
</template>

<script>
import { formatDate, formatPrice, isOutdated } from '../utils';

export default {
    name: "PriceWithDate",
    props: {
        price: {
            type: Number,
            default: 0,
        },
        date: {
            type: Number,
            default: 0,
        },
    },
    computed: {
      isOutdated() {
        return isOutdated(this.date);
      }
    },
    methods: {
      formatDate: formatDate,
      formatPrice: formatPrice,
    }
};
</script>

<style scoped lang="scss">
.price-with-date {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: var(--space-3-xs);

  .date {
    font-size: 0.65rem;
  }
}

.profitable {
    color: var(--color-profitable);
}

.unprofitable {
    color: var(--color-unprofitable);
}
</style>