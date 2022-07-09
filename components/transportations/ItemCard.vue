<template>
  <div class="wrapper">
    <div class="main">
      <ImageWithoutNumber :name="itemFrom.itemId" />

      <div class="header-wrapper">
        <div class="header">
          <div class="title-wrapper">
            <span
              class="title"
              @click="copyName($t(itemFrom.itemId))"
            >
              {{ $t(itemFrom.itemId) }}
            </span>
            <!-- <div class="favorite">⭐️</div> -->
          </div>
          <div class="controls">
            <div class="info">
              <svg-icon
                class="arrow-icon"
                icon-class="info-circle-outline"
              />
            </div>
          </div>
        </div>

        <div class="item">
          <div class="inputs-grid">
            <PriceWithDate
              :price="itemFrom.price"
              :date="itemFrom.date"
            />
            <svg-icon
              class="arrow-icon"
              icon-class="arrow-right"
            />
            <PriceWithDate
              :price="itemTo.price"
              :date="itemTo.date"
            />

            <span>{{ itemFrom.location }}</span>
            <svg-icon
              class="arrow-icon"
              icon-class="arrow-right"
            />
            <span>{{ itemTo.location }}</span>
          </div>
          <div class="profit">
            <div
              :class="[
                'profit-real',
                {
                  profitable: profit > 0,
                  unprofitable: profit < 0,
                },
              ]"
            >
              {{ formatPrice(profit) }}
            </div>
            <div class="profit-addons">
              <div
                :class="[
                  'profit-percents',
                  {
                    profitable: profit > 0,
                    unprofitable: profit < 0,
                  },
                ]"
              >
                {{ percentageProfit }}%
              </div>
              <div class="sold-per-day">
                {{ averageItemsSoldPerDay }}/d
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="addons" />
  </div>
</template>

<script>
import ImageWithoutNumber from "~/components/utils/ImageWithoutNumber";
import { isOutdated, formatPrice, roundPrice } from "./utils";
import PriceWithDate from "./ItemCardComponents/PriceWithDate";
import SvgIcon from "../utils/SvgIcon.vue";

export default {
    name: "ItemCard",
    components: {
        ImageWithoutNumber,
        PriceWithDate,
        SvgIcon,
    },
    props: {
        itemFrom: {
            type: Object,
            default: () => ({
                itemId: "T4_BAG@1",
                location: "Martlock",
                date: "1970-00-00T00:00:00Z",
                price: 1800,
                quality: 2,
                averageItemsSold: 0,
            }),
        },
        itemTo: {
            type: Object,
            default: () => ({
                itemId: "T4_BAG@1",
                location: "Martlock",
                date: "1970-00-00T00:00:00Z",
                price: 2000,
                quality: 1,
                averageItemsSold: 0,
            }),
        },
    },
    computed: {
        profit() {
            return (
                (this.itemTo.price * (100 - 4.5)) / 100 - this.itemFrom.price
            );
        },

        percentageProfit() {
            const percentageProfit = (this.profit / this.itemFrom.price) * 100;
            const roundedPrice = roundPrice(percentageProfit, 1);

            return roundedPrice;
        },

        averageItemsSoldPerDay() {
            return roundPrice(this.itemFrom.averageItemsSold, 1);
        },
    },
    methods: {
        /**
         * Copy text to the clipboard
         *
         * @param {string} text - text to copy
         */
        copyName(text) {
            this.$copyText(text);
            this.$toast.success("Copied");
        },
        formatPrice: formatPrice,
        isOutdated: isOutdated,
    },
};
</script>

<style scoped lang="scss">
.wrapper {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--color-blind);
    border-radius: var(--radius-s);
    padding: var(--space-xs);
    margin: var(--space-xs) 0;
}

.main {
    display: flex;
    flex-direction: row;
}

.header-wrapper {
    width: 100%;
}

.title {
    cursor: copy;
}

.header {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;

    .title-wrapper {
        display: flex;
        flex-direction: row;
    }

    .controls {
        display: flex;
        flex-direction: row;
    }
}

.inputs-grid {
    display: grid;
    grid-template-columns: repeat(3, auto);
    align-items: center;

    .arrow-icon {
        margin-right: var(--space-2-xs);
        margin-left: var(--space-xs);
    }
}

.item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.profit {
    display: flex;
    flex-direction: column;
    gap: var(--space-3-xs);
}

.profit-real {
    display: flex;
    justify-content: flex-end;
}

.profit-addons {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    gap: var(--space-s);
    font-size: 0.85rem;
}

.profitable {
    color: var(--color-profitable);
}

.unprofitable {
    color: var(--color-unprofitable);
}
</style>