<template>
  <div 
    v-if="Object.keys(tableData).length" 
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
          'row__unprofitable': item.price < 0,
          'row__profitable': item.price > 0,
          'row__unknown': item.price == 0 || outdated(item.date) || noArtefactForSale(name),
        }, `tier${name.slice(1, 2)} tier item`]"
        :key="name"
      > 
        {{ item.price | formatPrice }}
        <div 
          class="item__warnings">
          <img
            v-if="outdated(item.date)"
            src="/images/clock.svg"
            class="item__warnings__icon"
          ><img 
            v-if="noArtefactForSale(name)"
            src="/images/exclamation-triangle.svg" 
            class="item__warnings__icon">
          <img 
            v-if="!outdated(item.date) && !noArtefactForSale(name)"
            class="item__warnings__info"
            src="/images/info.svg" 
            alt="i">
          <div 
            :class="[
              'item__warnings__tooltip', 
              `tooltip--tier${name.slice(1, 2)}`]"
          >
            <div class="item__warnings__tooltip__table">
              <template
                v-for="(tooltipRow, infoName) in tableInfo[createName(name, subtier)]">  
                <div 
                  v-if="!isObjectEmpty(tooltipRow)"
                  :key="`${infoName}:0`"
                  class="text-algin-left">
                  {{ $t(tooltipRow.name) }} 
                  {{ tooltipRow.percentage ? `${tooltipRow.percentage}%` : '' }}</div>
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
                >{{ tooltipRow.date | formatDate }}</div>
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
    "Fee": "Fee",
    "Journals": "Journals"
  },
  "ru": {
    "Market price": "Цена на рынке",
    "Materials": "Материалы",
    "Artifact": "Артефакт",
    "Fee": "Налог",
    "Journals": "Журналы"
  }
}
</i18n>

<script>
export default {
  name: "ItemTable",
  filters: {
    /**
     * Format the price for the convenience
     * @param {number} price - number for formatting
     */
    formatPrice: function(price, infoName) {
      if (infoName == 'journals' && price > 0) {
        price = '+' + price;
      }
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    formatDate: function(date) {
      if (date.length == 0) {
        return '-';
      }
      date = new Date(date);
      let lastCheckInHours = Math.floor((Date.now() - date.getTime() + new Date().getTimezoneOffset() * 60000 ) / 3600000);
      let lastCheckInDays = Math.floor(lastCheckInHours / 24);
      if (lastCheckInDays > 100) {
        return '∞';
      }
      return lastCheckInHours < 24 ? `${lastCheckInHours}h` : `${Math.floor(lastCheckInHours / 24)}d`;
    }
  },
  props: {
    tableData: {
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {
      materialsBaseFame: {
        'T4': 22.5,
        'T5': 90,
        'T6': 270,
        'T7': 645,
        'T8': 1395,
      },
      itemAndArtefactValues: {
        'T4.0': 14,
        'T4.1': 30,
        'T4.2': 54,
        'T4.3': 102,
        'T5.0': 30,
        'T5.1': 61,
        'T5.2': 118,
        'T5.3': 229,
        'T6.0': 62,
        'T6.1': 125,
        'T6.2': 246,
        'T6.3': 485,
        'T7.0': 126,
        'T7.1': 253,
        'T7.2': 502,
        'T7.3': 997,
        'T8.0': 254,
        'T8.1': 509,
        'T8.2': 1014,
        'T8.3': 2021,
        'T4_rune': 4 ,
        'T4_soul': 12,
        'T4_relic': 28,
        'T4_avalon': 60,
        'T5_rune': 8,
        'T5_soul': 24,
        'T5_relic': 56,
        'T5_avalon': 119.5,
        'T6_rune': 16,
        'T6_soul': 48,
        'T6_relic': 111.5,
        'T6_avalon': 240,
        'T7_rune': 32,
        'T7_soul': 95.5,
        'T7_relic': 222.5,
        'T7_avalon': 480,
        'T8_rune': 63.5,
        'T8_soul': 190.5,
        'T8_relic': 444.5,
        'T8_avalon': 952.5,
      },
      tableInfo: {},
    }
  },
  computed: {
    amountOfMaterials: function() {
      let amountOfMaterials = 0;

      for (let material in this.tableData.recipe) {
        amountOfMaterials += this.tableData.recipe[material];
      }

      return amountOfMaterials;
    }
  },
  created() {
    for (let tier = 4; tier <= 8; tier++) {
      for (let subtier = 0; subtier <= 3; subtier++) {
        this.tableInfo[`T${tier}.${subtier}`] = {};
      }
    }
  },
  methods: {
    createName: function(name, subtier){
      const str = `T${name.slice(1, 2)}.${subtier - 1}`;  
      return str;

    },
    /**
     * Calculate t4-t8 item prices with current subtier
     * @param subtier - items subtier
     */
    getRow: function(subtier) {
      let row = {};
      for (let key in this.tableData.items) {
        if (
          key.slice(-2) == `@${subtier}` ||
          (subtier == 0 && key.slice(-2, -1) != "@")
        ) {
          
          row[key] = {
            price: 0,
            date: this.dateNow()
          };

          const tier = key.slice(1, 2);
          const marketFee = this.tableData.items[key].marketFee;

          this.tableInfo[`T${tier}.${subtier}`].marketPrice = {
            name: 'Market price',
            percentage: -marketFee,
            price: Math.floor(this.tableData.items[key].price * 0.97),
            date: this.tableData.items[key].date
          }

          
          let creationCost = 0;

          creationCost += this.itemCreationCost(tier, subtier, key);
          creationCost += this.getArtefactPrice(tier, subtier);
            creationCost += this.craftFee(tier, subtier);
          creationCost -= this.journalProfit(tier, subtier);
          
          if (this.tableData.items[key].price != 0) {
            const itemPrice = Math.floor(this.tableData.items[key].price * (1 - marketFee / 100));
            row[key].price = itemPrice - creationCost;
            row[key].date = this.tableData.items[key].date;
          }
        }
      }
      return row;
    },

    /**
     * Return cost of the artefact, if used
     * @param tier - artefact tier
     */
    getArtefactPrice: function(tier, subtier) {
      if (!this.isObjectEmpty(this.tableData.artefacts)) {
        const artefact = this.tableData.artefacts[
          `T${tier}_ARTEFACT${this.tableData.itemName.slice(2)}`
        ];

        this.tableInfo[`T${tier}.${subtier}`].artefact = {
          name: 'Artifact',
          percentage: 0,
          price: -artefact.price,
          date: artefact.date
        }

        return artefact.price;
      } else {
        this.$set(this.tableInfo[`T${tier}.${subtier}`], 'artefact', {});
      }
      return 0;
    },

    /**
     * Cost of materials, taking into account the percentage of return on resources
     * @param tier - resource tier
     * @param subtier - resource subtier
     */
    itemCreationCost: function(tier, subtier, itemName) {
      let cost = 0;
      for (let resourceName in this.tableData.recipe) {
        const resourceFullName =
          `T${tier}_${resourceName}` +
          (subtier != 0 ? `_LEVEL${subtier}@${subtier}` : "");
        const resourceCost = this.tableData.resources[resourceFullName].price;
        const returnPercentage = this.tableData.returnPercentage;

        cost += Math.floor(
          resourceCost *
            this.tableData.recipe[resourceName] *
            (1 - returnPercentage / 100)
        );

        // update tableInfo
        this.tableInfo[`T${tier}.${subtier}`].materials = {
          name: 'Materials',
          percentage: -returnPercentage,
          price: -cost,
          date: this.tableData.resources[resourceFullName].date
        }
      }

      return cost;
    },

    /**
     * @param tier - resource tier
     * @param subtier - resource subtier
     */
    journalProfit: function(tier, subtier) {
      if (this.tableData.useJournals){

        // amount of fame per unit of this tier material 
        const fame = this.materialsBaseFame[`T${tier}`];

        let craftFame = (fame * (subtier + 1) - 7.5 * subtier) * this.amountOfMaterials;
        craftFame += !this.isObjectEmpty(this.tableData.artefacts) ? 500 : 0;

        const journalFame = 1200 * 2 ** (tier - 4);
        const journalName = `T${tier}_JOURNAL${this.tableData.root.slice(4)}`;
        const marketFee = this.tableData.journals[journalName].marketFee;

        let profit = (this.tableData.journals[journalName].sellPrice - this.tableData.journals[journalName].buyPrice) * (craftFame / journalFame);
        profit = Math.floor(profit);

        this.$set(this.tableInfo[`T${tier}.${subtier}`], 'journals', {
          name: 'Journals',
          percentage: -marketFee,
          price: profit,
          date: this.tableData.journals[journalName].date
        });

        return profit;
      } else {
        this.$set(this.tableInfo[`T${tier}.${subtier}`], 'journals', {});
      }
      
      return 0;
    },

    /**
     * @param tier - resource tier
     * @param subtier - resource subtier
     */
    craftFee(tier, subtier){
      const fee = this.tableData.fee != '' ? this.tableData.fee : 0;
      const artefactLevel = this.tableData.artefactLevel;
      let itemValue = this.itemAndArtefactValues[`T${tier}.${subtier}`];
      if (artefactLevel.length != 0) {
        itemValue += this.itemAndArtefactValues[`T${tier}_${artefactLevel}`];
      }
      
      const feePrice = Math.floor(itemValue * this.amountOfMaterials / 20 * fee);
      this.$set(this.tableInfo[`T${tier}.${subtier}`], 'fee', {
        name: 'Fee',
        percentage: fee,
        price: -feePrice,
        date: ''
      });

      return feePrice;
    },
    
    /**
     * Check the date
     * if more than 1 day has passed since the last check
     * returns true
     * @param date - last check date
     */
    outdated: function(date) {
      return (this.dateNow() - (new Date(date)).getTime()) > 86400000;
    },

    /**
     * Checks for artifacts on sale
     * @param name - item name
     */
    noArtefactForSale: function(name) {
      const artefactName = `T${name.slice(1, 2)}_ARTEFACT${this.tableData.itemName.slice(2)}`;
      if (!this.tableData.artefacts[artefactName]){
        return false;
      }

      return this.tableData.artefacts[artefactName].price == 0;
    },

    /**
     * Check object length
     * @param obj
     */
    isObjectEmpty: function(obj) {
      return Object.keys(obj).length == 0;
    },

    dateNow: function() {
      return Date.now() + new Date().getTimezoneOffset() * 60000;
    }
  }
};
</script>

<style scoped lang="scss">
.item-table {
  padding: 0 10px;
  margin: 0 auto;
  display: grid;
  width: 600px;
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
  border-radius: 12px;
  position: relative;

  &__profitable {
    text-shadow: 1px 0 1px #043204;
    color: #14a014;
  }

  &__unprofitable {
    text-shadow: 1px 0 1px #4a0404;
    color: #ae3a3a;
  }

  &__unknown {
    text-shadow: 0px 0 1px #131313;
    color: #585858;
  }
  
  .tier {
    width: 20%;
    text-align: center;
    padding: 4px;
    position: relative;
  }

  .tier4 {
      border-radius: 10px 0 0 10px;
      background: #7fa6bf;
  }

  .tier5 {
    background: #ce7d76;
  }

  .tier6 {
    background: #d5803f;
  }

  .tier7 {
    background: #dabc5b;
  }

  .tier8 {
    border-radius: 0 10px 10px 0;
    background: #f5f5f5;
  }
}

.item {

  &__warnings {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    bottom: -1px;
    right: -1px;
    z-index: 50;
    padding: 3px 6px 6px 6px;

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
      transform: translateX(50%);
      bottom: 24px;
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
      white-space:nowrap;
      transition-delay: 0.03s;

      &:after {
        content: '';
        position: absolute;
        right: calc(50% - 5px);
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

    &:hover &__tooltip{
      bottom: 28px;
      opacity: 1;
      visibility: visible;
    }

    &:hover &__tooltip:after {
      opacity: 1;
    }
  }
}

.tooltip {
  &--tier8 {
    transform: translateX(10%);

    &:after {
      right: calc(10% - 5px);
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
}

</style>
