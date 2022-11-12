<template>
  <div class="excell-container">
    <div class="excell-table">
      <div><span>{{ $t('averageMeanPrice') }}</span> <span>{{ formatPrice(getCellItems.averageMeanPrice) }}</span></div>
      <div><span>{{ $t('averageMeanProfit') }}</span> <span>{{ formatPrice(getCellItems.averageMeanProfit) }}</span></div>
      <div><span>{{ $t('averageMeanProfitPercentage') }}</span> <span>{{ formatPrice(getCellItems.averageMeanProfitPercentage) }}%</span></div>
      <div><span>{{ $t('medianItemPrice') }}</span> <span>{{ formatPrice(getCellItems.medianItemPrice) }}</span></div>
      <div><span>{{ $t('medianItemProfit') }}</span> <span>{{ formatPrice(getCellItems.medianItemProfit) }}</span></div>
      <div><span>{{ $t('medianItemProfitPercentage') }}</span> <span>{{ formatPrice(getCellItems.medianItemProfitPercentage) }}%</span></div>
      <div><span>{{ $t('fragmentExpenses') }}</span> <span>{{ formatPrice(getCellItems.fragmentExpenses) }}</span></div>
    </div>
    <div class="excell-sort">
      <button
        type="button"
        class="excell-sortButton"
        @click="sortArtifactsByProfit"
      >
        Sort by profit ↓
      </button>
    </div>
    <div class="excell-artifacts">
      <div
        v-for="artifact in getCellItems.items"
        :key="artifact.item.itemId"
      >
        <ExtendedCellItem 
          :artifact="artifact"
        />
      </div>
    </div>
  </div>
</template>

<i18n>
    {
      "en": {
        "averageMeanPrice": "Average mean price",
        "averageMeanProfit": "Average mean profit",
        "averageMeanProfitPercentage": "Average mean profit percentage",
        "medianItemPrice": "Median item price",
        "medianItemProfit": "Median item profit",
        "medianItemProfitPercentage": "Median item profit percentage",
        "fragmentExpenses": "Fragment expenses"
      },
    "ru": {
        "averageMeanPrice": "Средняя цена артефакта",
        "averageMeanProfit": "Средний профит",
        "averageMeanProfitPercentage": "Средний профит в процентах",
        "medianItemPrice": "Медианная цена артефакта",
        "medianItemProfit": "Медианный профит",
        "medianItemProfitPercentage": "Медианный профит в процентах",
        "fragmentExpenses": "Затраты на фрагменты"
      }
    }
    </i18n>

<script>
import { mapGetters } from 'vuex';
import { formatPrice } from '~/store/utils';
import ExtendedCellItem from './ExtendedCellItem.vue';

export default {
    name: 'ExtendedCellTable',
    components: {
        ExtendedCellItem,
    },
    data() {
        return {
            sortCells: false,
        }
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

        artifactPriceChanged() {
            this.sortCells = false;
        },

        sortArtifactsByProfit() {
            this.$store.dispatch('artifactFoundry/SORT_EXTENDED_CELL_ARTIFACTS');
        }
    }
}
</script>

<style scoped lang="scss">
.excell {
    &-table {
        display: grid;

        & > div {
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            padding: var(--space-3-xs) var(--space-xs);
            
            &:nth-child(2n) {
                background: var(--color-primary-analog);
            }
        }
    }

    &-sort {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    
    &-sortButton {
        border: 1px solid var(--color-contrast);
        border-radius: var(--radius-xs);
        background: var(--color-primary);
        padding: var(--space-3-xs) var(--space-2-xs);
        cursor: pointer;
        color: var(--color-contrast);
        transition: 125ms;

        &:hover {
            background: var(--color-primary-analog);
        }

        &:active {
            background: var(--color-primary-analog-contrast);
        }
    }
}

#excell-sortButton {
    display: none;
}

.excell-container {
    min-width: 450px;
    border: 1px solid var(--color-primary-analog);
    border-right-width: 0;
    padding: var(--space-xs);
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
    border-top-left-radius: var(--radius-m);
    border-bottom-left-radius: var(--radius-m);
}

.excell-artifacts {
    display: flex;
    flex-direction: column;
    gap: var(--space-2-xs);
}
</style>