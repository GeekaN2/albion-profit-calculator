<template>
  <div 
    v-if="loadingText == 'calculated'" 
    class="item-table">
    <div
      v-for="subtier in 4"
      :class="`subtier${subtier - 1}`"
      :key="subtier"
      class="item-table__row row"
    >
      <div
        v-for="(item, name) of getRow(subtier - 1)"
        :class="[{
          'row__unprofitable': item.profit < 0,
          'row__profitable': item.profit > 0,
          'row__unknown': item.profit == 0 || outdated(item.date) || noArtefactForSale(name),
        }, `tier${name.slice(1, 2)} tier item`]"
        :key="name"
      >
        <div class="item__base-item-info base-item-info">
          <span>{{ item.profit | formatPrice }}</span>
          <div class="base-item-info__secondary-info">
            <span class="secondary-info__profit-percentage">{{ item.percentageProfit | formatPercentage }}%</span>
            <span 
              v-if="settings.showAverageItems"
              class="secondary-info__average-items"
            >{{ item.averageItems | formatFloat }}/{{ $t('days') }}</span>
          </div>
        </div>
        <div class="item__warnings">
          <img
            v-if="noArtefactForSale(name)"
            src="/images/exclamation-triangle.svg"
            class="item__warnings__icon"
          >
          <img 
            v-if="outdated(item.date)" 
            src="/images/clock.svg" 
            class="item__warnings__icon" >
          <img
            v-if="!outdated(item.date) && !noArtefactForSale(name)"
            class="item__warnings__info"
            src="/images/info.svg"
            alt="i"
          >
          <div
            :class="[
              'item__warnings__tooltip', 
              `tooltip--tier${name.slice(1, 2)}`]"
          >
            <div class="item__warnings__tooltip__table">
              <template v-for="(tooltipRow, infoName) in tableInfo[createShortName(name, subtier)]">
                <div
                  v-if="!isObjectEmpty(tooltipRow)"
                  :key="`${infoName}:0`"
                  class="text-algin-left"
                >
                  {{ $t(tooltipRow.name) }}
                  {{ tooltipRow.percentage ? `${tooltipRow.percentage}%` : '' }}
                </div>
                <div
                  v-if="!isObjectEmpty(tooltipRow)"
                  :key="`${infoName}:1`"
                  :class="{
                    'error': tooltipRow.price == 0
                  }"
                >{{ tooltipRow.price | formatPrice(infoName) }}</div>
                <div
                  v-if="!isObjectEmpty(tooltipRow)"
                  :key="`${infoName}:2`"
                  :class="{
                    'error': outdated(tooltipRow.date),
                    'success': !outdated(tooltipRow.date)
                  }"
                >{{ formatDate(tooltipRow.date) }}</div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "Market price": "Market price",
    "Materials": "Materials",
    "Artifact": "Artifact",
    "Sigils": "Royal Sigils",
    "Fee": "Fee",
    "Journals": "Journals",
    "hours": "h",
    "days": "d"
  },
  "ru": {
    "Market price": "Цена на рынке",
    "Materials": "Материалы",
    "Artifact": "Артефакт",
    "Sigils": "Королевские знаки",
    "Fee": "Налог",
    "Journals": "Журналы",
    "hours": "ч",
    "days": "д"
  }
}
</i18n>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "ItemTable",
  filters: {
    /**
     * Format the price for the convenience
     * @param {number} price - number for formatting
     */
    formatPrice(price, infoName) {
      if (infoName == "journals" && price > 0) {
        price = "+" + price;
      }

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

      num = typeof num === 'number' ? num.toFixed(1) : 0;
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
  data() {
    return {
      /**
       * Amount of fame per unit of material
       */
      materialsBaseFame: {
        T4: 22.5,
        T5: 90,
        T6: 270,
        T7: 645,
        T8: 1395,
      },

      /**
       * Craft bench fee per unit of material and artefact
       */
      itemAndArtefactValues: {
        "T4.0": 14,
        "T4.1": 30,
        "T4.2": 54,
        "T4.3": 102,
        "T5.0": 30,
        "T5.1": 61,
        "T5.2": 118,
        "T5.3": 229,
        "T6.0": 62,
        "T6.1": 125,
        "T6.2": 246,
        "T6.3": 485,
        "T7.0": 126,
        "T7.1": 253,
        "T7.2": 502,
        "T7.3": 997,
        "T8.0": 254,
        "T8.1": 509,
        "T8.2": 1014,
        "T8.3": 2021,
        T4_royal: 4,
        T4_rune: 4,
        T4_soul: 12,
        T4_relic: 28,
        T4_avalon: 60,
        T5_royal: 8,
        T5_rune: 8,
        T5_soul: 24,
        T5_relic: 56,
        T5_avalon: 119.5,
        T6_royal: 16,
        T6_rune: 16,
        T6_soul: 48,
        T6_relic: 111.5,
        T6_avalon: 240,
        T7_royal: 32,
        T7_rune: 32,
        T7_soul: 95.5,
        T7_relic: 222.5,
        T7_avalon: 480, 
        T8_royal: 952.5,
        T8_rune: 63.5,
        T8_soul: 190.5,
        T8_relic: 444.5,
        T8_avalon: 952.5,
      },
      tableInfo: {},
    };
  },
  computed: {
    /**
     * Total amount of required materials
     */
    amountOfMaterials() {
      let amountOfMaterials = 0;

      for (let material in this.recipe) {
        amountOfMaterials += this.recipe[material];
      }

      return amountOfMaterials;
    },

    /**
     * Get all items(t4.0 - t8.3) for current item
     */
    items() {
      return this.$store.getters.getItems;
    },

    /**
     * Get all resources for current city
     */
    resources() {
      return this.$store.getters.getResources;
    },

    /**
     * Get artefacts. If artifacts are not needed returns {}
     */
    artefacts() {
      return this.$store.getters.getArtefacts;
    },

    /**
     * Get recipe to calculate craft cost
     */
    recipe() {
      return this.$store.getters.getRecipe;
    },

    /**
     * Get journals
     */
    journals() {
      return this.$store.getters.getJournals;
    },
    
    /**
     * Get average data
     */
    averageData() {
      return this.$store.getters.getAverageData;
    },

    ...mapGetters(["returnMaterialPercentage", "loadingText", "isArtefactItem"]),

    ...mapState({
      settings: (state) => state.tree.settings,
      currentItemInfo: (state) => state.tree.currentItemInfo,
    }),
  },
  created() {
    for (let tier = 4; tier <= 8; tier++) {
      for (let subtier = 0; subtier <= 3; subtier++) {
        this.tableInfo[`T${tier}.${subtier}`] = {};
      }
    }
  },
  methods: {
    /**
     * Create string item tier and subtier
     *
     * @param {string} name - item name
     * @param {number} subtier - item subtier
     * @returns {string}
     */
    createShortName(name, subtier) {
      const str = `T${name.slice(1, 2)}.${subtier - 1}`;

      return str;
    },

    /**
     * Calculate t4-t8 item prices with current subtier
     *
     * @param {number} subtier - item subtier
     * @returns {object}
     */
    getRow(subtier) {
      let row = {};
      for (let itemName in this.items) {
        if (
          itemName.slice(-2) == `@${subtier}` ||
          (subtier == 0 && itemName.slice(-2, -1) != "@")
        ) {
          row[itemName] = {
            profit: 0,
            date: this.dateNow()
          };

          const tier = Number(itemName.slice(1, 2));
          const marketFee = this.items[itemName].marketFee;

          this.tableInfo[`T${tier}.${subtier}`].marketPrice = {
            name: "Market price",
            percentage: -marketFee,
            price: Math.floor(this.items[itemName].price * (1 - marketFee / 100)),
            date: this.items[itemName].date,
          };

          let creationCost = 0;

          // calculate profit
          creationCost += this.itemCreationCost(tier, subtier, itemName);
          creationCost += this.getArtefactPrice(tier, subtier);
          creationCost += this.craftFee(tier, subtier);
          creationCost -= this.journalProfit(tier, subtier);

          const journalProfit = this.journalProfit(tier, subtier);

          if (this.items[itemName].price != 0) {
            const itemPrice = Math.floor(
              this.items[itemName].price * (1 - marketFee / 100)
            );
            row[itemName].profit = itemPrice - creationCost;
            row[itemName].date = this.items[itemName].date;
            row[itemName].percentageProfit = row[itemName].profit / creationCost * 100;
          }

          if (this.settings.showAverageItems) {
            row[itemName].averageItems = this.averageData?.[itemName]?.averageItems || 0;
          }
        }
      }

      return row;
    },

    /**
     * Return cost of the artefact, if used
     *
     * @param {number} tier - artefact tier
     * @param {number} subtier - artefact subtier
     * @returns {number} - artefact price
     */
    getArtefactPrice(tier, subtier) {
      if (!this.isArtefactItem) {
        this.$set(this.tableInfo[`T${tier}.${subtier}`], "artefact", {});

        return 0;
      }

      let artefact = "";
      let artefactPrice = 0;
      let name = 'Artifact';

      if (this.currentItemInfo.name.includes('ROYAL')) {
        // number of sigils e.g. for 8 materials returns from t4 to t8: 2 4 8 8 8
        const numberOfSigils = tier >= 6 ? this.amountOfMaterials : this.amountOfMaterials * (tier - 3) / 4;

        artefact = this.artefacts[`QUESTITEM_TOKEN_ROYAL_T${tier}`];
        artefactPrice = artefact.price * numberOfSigils;
        name = 'Sigils';
      } else {
        artefact = this.artefacts[
          `T${tier}_ARTEFACT${this.currentItemInfo.name.slice(2)}`
        ];
        artefactPrice = artefact.price;
      }

      this.tableInfo[`T${tier}.${subtier}`].artefact = {
        name: name,
        percentage: 0,
        price: -artefactPrice,
        date: artefact.date,
      };

      return artefactPrice;
    },

    /**
     * Cost of materials, taking into account the percentage of return on resources
     *
     * @param {number} tier - resource tier
     * @param {number} subtier - resource subtier
     */
    itemCreationCost(tier, subtier, itemName) {
      let cost = 0;

      for (let resourceName in this.recipe) {
        const resourceFullName =
          `T${tier}_${resourceName}` +
          (subtier != 0 ? `_LEVEL${subtier}@${subtier}` : "");
        const resourceCost = this.resources[resourceFullName].price;

        cost += Math.floor(
          resourceCost *
            this.recipe[resourceName] *
            (1 - this.returnMaterialPercentage / 100)
        );

        // update tableInfo
        this.tableInfo[`T${tier}.${subtier}`].materials = {
          name: "Materials",
          percentage: -this.returnMaterialPercentage,
          price: -cost,
          date: this.resources[resourceFullName].date,
        };
      }

      return cost;
    },

    /**
     * Calculate journals profit
     *
     * @param {number} tier - resource tier
     * @param {number} subtier - resource subtier
     * @returns {number}
     */
    journalProfit(tier, subtier) {
      if (this.settings.useJournals) {
        // amount of fame per unit of this tier material
        const fame = this.materialsBaseFame[`T${tier}`];
        let craftFame =
          (fame * (subtier + 1) - 7.5 * subtier) * this.amountOfMaterials;

        craftFame += !this.isObjectEmpty(this.artefacts) ? 500 : 0;

        const journalFame = 1200 * 2 ** (tier - 4);
        const journalName = `T${tier}_JOURNAL${this.currentItemInfo.root.slice(
          4
        )}`;
        const marketFee = this.journals[journalName].marketFee;

        let profit =
          (this.journals[journalName].sellPrice -
            this.journals[journalName].buyPrice) *
          (craftFame / journalFame);

        profit = Math.floor(profit);

        this.$set(this.tableInfo[`T${tier}.${subtier}`], "journals", {
          name: "Journals",
          percentage: -marketFee,
          price: profit,
          date: this.journals[journalName].date,
        });

        return profit;
      } else {
        this.$set(this.tableInfo[`T${tier}.${subtier}`], "journals", {});
      }

      return 0;
    },

    /**
     * Return craft bench fee
     *
     * @param {number} tier - resource tier
     * @param {number} subtier - resource subtier
     * @returns {number}
     */
    craftFee(tier, subtier) {
      const fee = this.settings.craftFee;
      const artefactLevel = this.currentItemInfo.artefactLevel;
      let itemValue = this.itemAndArtefactValues[`T${tier}.${subtier}`];

      if (artefactLevel.length != 0) {
        itemValue += this.itemAndArtefactValues[`T${tier}_${artefactLevel}`];
      }

      const feePrice = Math.floor(
        ((itemValue * this.amountOfMaterials) / 20) * fee
      );

      this.$set(this.tableInfo[`T${tier}.${subtier}`], "fee", {
        name: "Fee",
        percentage: fee,
        price: -feePrice,
        date: "",
      });

      return feePrice;
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
      return this.dateNow() - new Date(date).getTime() > 86400000;
    },

    /**
     * Checks for artifacts on sale
     *
     * @param {string} name - item name
     * @returns {boolean}
     */
    noArtefactForSale(name) {
      const artefactName = `T${name.slice(
        1,
        2
      )}_ARTEFACT${this.currentItemInfo.name.slice(2)}`;

      if (!this.artefacts[artefactName]) {
        return false;
      }

      return this.artefacts[artefactName].price == 0;
    },

    /**
     * Add h(hours) or d(days) to date
     *
     * @param {string} date - timestamp
     */
    formatDate(date) {
      if (date.length == 0) {
        return "-";
      }

      date = new Date(date);

      let lastCheckInHours = Math.floor(
        (Date.now() - date.getTime() + new Date().getTimezoneOffset() * 60000) /
          3600000
      );
      let lastCheckInDays = Math.floor(lastCheckInHours / 24);

      if (lastCheckInDays > 100) {
        return "∞";
      }

      return lastCheckInHours < 24
        ? lastCheckInHours + this.$t('hours')
        : Math.floor(lastCheckInHours / 24) + this.$t('days');
    },

    /**
     * Check object length
     *
     * @param {object} obj
     * @returns {boolean}
     */
    isObjectEmpty(obj) {
      return JSON.stringify(obj) === '{}' || obj === undefined;
    },

    /**
     * Get date with timezone offset
     *
     * @returns {number}
     */
    dateNow() {
      return Date.now() + new Date().getTimezoneOffset() * 60000;
    },
  },
};
</script>

<style scoped lang="scss">
.item-table {
  padding: 0 15px;
  margin: 0 auto;
  display: grid;
  max-width: 650px;
  font-size: 16px;

  .subtier1 {
    background: #6afe90;
    box-shadow: 0 0 4px 5px #6afe90;
  }

  .subtier2 {
    background: #4bc8d2;
    box-shadow: 0 0 4px 5px #4bc8d2;
  }

  .subtier3 {
    background: #b987f7;
    box-shadow: 0 0 4px 5px #b987f7;
  }

  .text-algin-left {
    text-align: left;
  }

  .error {
    color: #e73939;
  }

  .success {
    color: #1d7d18;
  }
}

.row {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 7px 0;
  border-radius: 15px;
  position: relative;

  &__profitable {
    text-shadow: .5px .5px .5px #041e04;
    color: #14a014;

    .base-item-info__secondary-info {
      color: #1bb31b;
    }
  }

  &__unprofitable {
    text-shadow: .5px .5px .5px #380404;
    color: #ae3a3a;

    .base-item-info__secondary-info {
      color: #d54c4c;
    }
  }

  &__unknown {
    text-shadow: .5px 0px .5px #131313;
    color: #585858;

    .base-item-info__secondary-info {
      color: #6a6a6a;
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
    background: #9bc8e2;
  }

  .tier5 {
    background: #eb8f87;
  }

  .tier6 {
    background: #e09255;
  }

  .tier7 {
    background: #eccc62;
  }

  .tier8 {
    border-radius: 0 15px 15px 0;
    background: #f5f5f5;
  }
}

.item {
  &__warnings {
    position: absolute;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    height: 100%;
    bottom: -1px;
    right: -1px;
    z-index: 50;
    width: 20px;

    &__icon {
      top: 6px;
      padding: 1px 0;
      width: 11px;
    }

    &__info {
      width: 10px;
      height: 10px;
    }

    &__tooltip {
      visibility: hidden;
      right: 50%;
      transform: translateX(8%);
      bottom: 90%;
      position: absolute;
      background: #dfdfdf;
      color: #5e5e5e;
      font-weight: bold;
      transition: 0.15s;
      opacity: 0;
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

    &:hover &__tooltip {
      bottom: 100%;
      opacity: 1;
      visibility: visible;
    }

    &:hover &__tooltip:after {
      opacity: 1;
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
  /*color: #1c4c1b;*/
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
