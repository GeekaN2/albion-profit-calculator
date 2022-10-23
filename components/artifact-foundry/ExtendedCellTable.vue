<template>
  <div class="excell-container">
    <div>averageMeanPrice: {{ formatPrice(getCellItems.averageMeanPrice) }}</div>
    <div>averageMeanProfit: {{ formatPrice(getCellItems.averageMeanProfit) }}</div>
    <div>averageMeanProfitPercentage: {{ formatPrice(getCellItems.averageMeanProfitPercentage) }}</div>
    <div>medianItemPrice: {{ formatPrice(getCellItems.medianItemPrice) }}</div>
    <div>medianItemProfit: {{ formatPrice(getCellItems.medianItemProfit) }}</div>
    <div>averageMeanProfit: {{ formatPrice(getCellItems.averageMeanProfit) }}</div>
    <div>medianItemProfitPercentage: {{ formatPrice(getCellItems.medianItemProfitPercentage) }}</div>
    <div class="excell-artifacts">
      <div
        v-for="artifact in getCellItems.items"
        :key="artifact.item.itemId"
      >
        <ExtendedCellItem :artifact="artifact" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatPrice } from '~/store/utils';
import ExtendedCellItem from './ExtendedCellItem.vue';

export default {
    name: 'ExtendedCellTable',
    components: {
        ExtendedCellItem,
    },
    computed: {
        ...mapGetters({
            getCellItems: 'artifactFoundry/getCellItems',
        }),
    },
    methods: {
        formatPrice(price) {
            return Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },

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
    }
}
</script>

<style scoped lang="scss">
.excell-container {
    min-width: 400px;
    border-left: 1px solid var(--color-primary-analog);
    padding: var(--space-xs);
}

.excell-artifacts {
    display: flex;
    flex-direction: column;
    gap: var(--space-2-xs);
}
</style>