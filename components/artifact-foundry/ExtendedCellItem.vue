<template>
  <div class="excellitem-container">
    <ImageWithoutNumber :name="artifact.item.itemId" />
    <div class="excellitem-infoContainer">
      <div class="excellitem-itemInfo">
        <span
          class="excellitem-itemName"
          @click="copyName($t(artifact.item.itemId))"
        >{{
          $t(artifact.item.itemId)
        }}
        </span>

        <span class="excellitem-price">
          <InputWithView
            :set-text="(price) => {
              setArtifactPrice(artifact.item.itemId, price);
            }"
            :get-text="() => artifact.item.sellPriceMin"
            :format-text="formatPrice"
          />
          <span
            :class="{
              'profitable': !isOutdated(artifact.item.sellPriceMinDate),
              'unprofitable': isOutdated(artifact.item.sellPriceMinDate)
            }"
          >{{ formatDate(artifact.item.sellPriceMinDate) }}</span>
        </span>
        <span
          v-if="!(artifact.item.sellPriceMin != 0)"
          class="unknown removed-from-calculation"
        >Removed from calculations</span>
      </div>
      <div class="excellitem-profits">
        <span
          :class="{
            'unprofitable': artifact.profit < 0,
            'profitable': artifact.profit > 0,
            'unknown': artifact.profit == 0,
          }"
        >{{ formatPrice(artifact.profit) }}</span>
        <span
          :class="{
            'unprofitable': artifact.profitPercentage < 0,
            'profitable': artifact.profitPercentage > 0,
            'unknown': artifact.profitPercentage == 0,
          }"
        >{{ formatPercentage(artifact.profitPercentage) }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ImageWithoutNumber from '../utils/ImageWithoutNumber.vue';
import InputWithView from '../utils/InputWithView.vue';

export default {
    name: "ExtendedCellItem",
    components: {
        ImageWithoutNumber,
        InputWithView
    },
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

        setArtifactPrice(itemId, price) {
            this.$store.commit('artifactFoundry/SET_ARTIFACT_PRICE', {
                itemId,
                price,
                locationAction: 'sell',
            })
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

        isOutdated(date) {
            const day = 24 * 60 * 60 * 1000;

            return Date.now() - new Date(date).getTime() > day;
        }

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

    &-price {
        display: flex;
        flex-direction: row;
        gap: var(--space-xs);
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

.profitable {
    color: var(--color-profitable);
}

.unprofitable {
    color: var(--color-unprofitable-secondary);
}

.unknown {
    color: var(--color-unknown);
}

.removed-from-calculation {
    font-size: 0.7em;
}
</style>