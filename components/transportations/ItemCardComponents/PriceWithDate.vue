<template>
  <div class="price-with-date">
    <InputWithView
      :get-text="() => price"
      :set-text="setItemPrice"
      :format-text="formatPrice"
    />
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
import InputWithView from '../../utils/InputWithView.vue';

export default {
  name: "PriceWithDate",
  components: {
    InputWithView
  },
  props: {
    setItemPrice: {
      type: Function,
      default: () => {},
    },
    price: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
      default: '1970-01-01T00:00:00Z',
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