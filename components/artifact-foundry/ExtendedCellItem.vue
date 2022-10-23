<template>
  <div class="excellitem-container">
    <ImageWithoutNumber :name="artifact.item.itemId" />
    <div class="excellitem-infoContainer">
      <div class="excellitem-itemInfo">
        <span
          class="excellitem-itemName"
          @click="copyName($t(artifact.item.itemId))"
        >{{
          $t(artifact.item.itemId) }}
        </span>
                
                    
        <span>{{ formatPrice(artifact.item.sellPriceMin) }} 
          <span>{{ formatDate(artifact.item.sellPriceMinDate) }}</span>
        </span>
      </div>
      <div class="excellitem-profits">
        <span>{{ formatPrice(artifact.profit) }}</span>
        <span>{{ formatPercentage(artifact.profitPercentage) }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatPrice } from '~/store/utils';
import ImageWithoutNumber from '../utils/ImageWithoutNumber.vue';

export default {
    name: "ExtendedCellItem",
    components: { ImageWithoutNumber },
    props: {
        /**
         * @param profit
         * @param profitPercentage
         * @param expenses
         */
        artifact: {
            type: Object,
            default: () => { },
        },
    },
    computed: {
        ...mapGetters({
            getCellItems: "artifactFoundry/getCellItems",
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

        formatFloat(num) {
            return Math.floor(num) == num ? num : num.toFixed(1);
        },

        copyName(text) {
            this.$copyText(text);
        },

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
    }
}
</script>

<style scoped lang="scss">
.excellitem {
    &-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        border: 1px solid var(--color-primary-analog);
        border-radius: var(--radius-xs);
        padding: var(--space-xs);
    }

    &-itemName {
        cursor: copy;
    }

    &-itemInfo {
        display: flex;
        flex-direction: column;
        gap: var(--space-2-xs);
        justify-content: center;
    }

    &-profits {
        display: flex;
        gap: var(--space-2-xs);
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
    }

    &-infoContainer {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
}
</style>