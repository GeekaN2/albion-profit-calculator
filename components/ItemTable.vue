<template>
  <div class="table" v-if="Object.keys(tableData).length">
    <div 
      class="row"
      :class="`subtier${subtier - 1}`"
      v-for="subtier in 4"
      :key="subtier"
    >
      <div
        :class="[{
                  'row__profitable': item.price > 0,
                  'row__unprofitable': item.price < 0,
                  'row__unknown': item.price == 0 || outdated(item.date) || noArtefactForSale(name),
                }, `tier${name.slice(1, 2)} tier`]"
        v-for="(item, name) of getRow(subtier - 1)"
        :key="name"
      >
        {{formatePrice(item.price)}}
        <div v-if="outdated(item.date) || noArtefactForSale(name)" class="row__warnings">
          <img
            v-if="outdated(item.date)"
            src="/images/clock.svg"
            class="row__warnings__icon"
          /><img 
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
    tableData: {}
  },
  methods: {
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
            let creationCost = 0;
            const tier = key.slice(1, 2);
            creationCost += this.itemCreationCost(tier, subtier);
            creationCost += this.getArtefactPrice(tier);
            row[key].price = this.tableData.items[key].price - creationCost;
            row[key].date = this.tableData.items[key].date;
          }
        }
      }
      return row;
    },
    getArtefactPrice: function(tier) {
      if (this.tableData.artefacts) {
        return this.tableData.artefacts[
          `T${tier}_ARTEFACT${this.tableData.itemName.slice(2)}`
        ].price;
      }
      return 0;
    },
    formatePrice: function(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
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
    outdated: function(date) {
      return Date.now() - (new Date(date)).getTime() > 86400000;
    },
    noArtefactForSale: function(name) {
      const artefactName = `T${name.slice(1, 2)}_ARTEFACT${this.tableData.itemName.slice(2)}`;
      if (!this.tableData.artefacts[artefactName]){
        return false;
      }

      return this.tableData.artefacts[artefactName].price == 0;
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