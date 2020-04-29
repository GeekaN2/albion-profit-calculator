<template>
  <div 
    v-if="Object.keys(tableData).length" 
    class="table">
    <div 
      v-for="subtier in 4"
      :class="`subtier${subtier - 1}`"
      :key="subtier"
      class="row"
    >
      <div
        v-for="(item, name) of getRow(subtier - 1)"
        :class="[{
          'row__profitable': item.price > 0,
          'row__unprofitable': item.price < 0,
          'row__unknown': item.price == 0 || outdated(item.date) || noArtefactForSale(name),
        }, `tier${name.slice(1, 2)} tier`]"
        :key="name"
      >
        {{ formatePrice(item.price) }}
        <div 
          v-if="outdated(item.date) || noArtefactForSale(name)" 
          class="row__warnings">
          <img
            v-if="outdated(item.date)"
            src="/images/clock.svg"
            class="row__warnings__icon"
          ><img 
            v-if="noArtefactForSale(name)"
            src="/images/exclamation-triangle.svg" 
            class="row__warnings__icon">
          <div class="row__warnings__tooltip">
            <p v-if="outdated(item.date)" >Outdated</p>
            <p v-if="noArtefactForSale(name)" >No artifacts for sale</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemTable",
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
      }
    }
  },
  methods: {
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
            date: Date.now() 
          };

          if (this.tableData.items[key].price != 0) {
            const tier = key.slice(1, 2);
            let creationCost = 0;

            creationCost += this.itemCreationCost(tier, subtier);
            creationCost += this.getArtefactPrice(tier);
            creationCost -= this.journalProfit(tier, subtier);

            row[key].price = this.tableData.items[key].price - creationCost;
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
    getArtefactPrice: function(tier) {
      if (!this.isObjectEmpty(this.tableData.artefacts)) {
        return this.tableData.artefacts[
          `T${tier}_ARTEFACT${this.tableData.itemName.slice(2)}`
        ].price;
      }
      return 0;
    },

    /**
     * Format the price for the convenience
     * @param price - string for formatting
     */
    formatePrice: function(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    /**
     * Cost of materials, taking into account the percentage of return on resources
     * @param tier - resource tier
     * @param subtier - resource subtier
     */
    itemCreationCost: function(tier, subtier) {
      let cost = 0;
      for (let resourceName in this.tableData.recipe) {
        const resourceFullName =
          `T${tier}_${resourceName}` +
          (subtier != 0 ? `_LEVEL${subtier}@${subtier}` : "");
        const resourceCost = this.tableData.resources[resourceFullName].price;
        const returnPercentage = 0.152;

        cost += Math.floor(
          resourceCost *
            this.tableData.recipe[resourceName] *
            (1 - returnPercentage)
        );
      }

      return cost;
    },

    /**
     * 
     */
    journalProfit: function(tier, subtier) {
      if (this.tableData.useJournals){
        let amountOfMaterials = 0;

        for (let material in this.tableData.recipe) {
          amountOfMaterials += this.tableData.recipe[material];
        }

        // amount of fame per unit of this tier material 
        const fame = this.materialsBaseFame[`T${tier}`];

        let craftFame = (fame * (subtier + 1) - 7.5 * subtier) * amountOfMaterials;
        craftFame += !this.isObjectEmpty(this.tableData.artefacts) ? 500 : 0;

        const journalFame = 1200 * 2 ** (tier - 3);
        const journalName = `T${tier}_JOURNAL${this.tableData.root.slice(4)}`;
        
        const profit = (this.tableData.journals[journalName].sellPrice - this.tableData.journals[journalName].buyPrice) * (craftFame / journalFame);

        return Math.floor(profit);
      }
      
      return 0;
    },
    
    /**
     * Check the date
     * if more than 1 day has passed since the last check
     * returns true
     * @param date - last check date
     */
    outdated: function(date) {
      return Date.now() - (new Date(date)).getTime() > 86400000;
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
    }
  }
};
</script>

<style scoped lang="scss">
.table {
  margin: 0 auto;
  display: grid;
  width: 600px;

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
    color: #118711;
  }

  &__unprofitable {
    text-shadow: 1px 0 1px #4a0404;
    color: #a52a2a;
  }

  &__unknown {
    text-shadow: 0px 0 1px #131313;
    color: #585858;
  }

  &__warnings {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    bottom: 0px;
    right: -1px;
    z-index: 50;
    padding: 3px 6px 6px 6px;

    &__icon { 
      top: 6px; 
      padding: 1px 0;
      width: 11px;
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
      font-size: 12px;
      text-shadow: none;
      padding: 5px;
      white-space:nowrap;

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

</style>