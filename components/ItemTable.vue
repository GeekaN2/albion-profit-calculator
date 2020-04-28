<template>
    <div class="table" v-if="Object.keys(tableData).length">
        <div class="common row">
            <div 
                :class="{
                    'row__profitable': item.price > 0,
                    'row__unprofitable': item.price < 0,
                    'row__unknown': item.price == 0
                }"
                v-for="(item, name) in getRow(0)"
                :key=name
            >{{formatePrice(item.price)}}</div>
        </div> 
        <div class="uncommon row">
            <div 
                :class="{
                    'row__profitable': item.price > 0,
                    'row__unprofitable': item.price < 0,
                    'row__unknown': item.price == 0
                }"
                v-for="(item, name) in getRow(1)"
                :key=name
            >{{formatePrice(item.price)}}</div>
        </div>
        <div class="rare row">
            <div 
                :class="{
                    'row__profitable': item.price > 0,
                    'row__unprofitable': item.price < 0,
                    'row__unknown': item.price == 0
                }"
                v-for="(item, name) in getRow(2)"
                :key=name
            >{{formatePrice(item.price)}}</div>
        </div>
        <div class="exceptional row">
            <div 
                :class="{
                    'row__profitable': item.price > 0,
                    'row__unprofitable': item.price < 0,
                    'row__unknown': item.price == 0
                }"
                v-for="(item, name) in getRow(3)"
                :key=name
            >{{formatePrice(item.price)}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ItemTable',
    props: {
        tableData: {}
    },
    methods: {
        getRow: function(subtier){
            let row = {};
            for (let key in this.tableData.items) {
                if ((key.slice(-2) == `@${subtier}`) || (subtier == 0 && key.slice(-2, -1) != '@')) {
                    row[key] = this.tableData.items[key];
                }
            }
            return row;
        },
        getArtefactPrice: function(tier){

        },
        formatePrice: function(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    }
}
</script>

<style scoped lang="scss">
.table {
    margin: 0 auto;
    display: grid;
    width: 500px;

    .uncommon {
        box-shadow: 0 0 4px 3px #6afe90;
        border: 2px solid #6afe90;
    }

    .rare {
        box-shadow: 0 0 4px 3px #4bc8d2;
        border: 2px solid #4bc8d2;
    }

    .exceptional {
        box-shadow: 0 0 4px 3px #b987f7;
        border: 2px solid #b987f7;
    }
}

.row {
    display: inline-flex;
    justify-content: center;
    margin: 5px;
    border-radius: 10px;
    overflow: hidden;

    div {
        width: 20%;
        text-align: center;
        padding: 4px;
        &:nth-child(1) {
            background: #7fa6bf;
        }

        &:nth-child(2) {
            background: #ce7d76;
        }

        &:nth-child(3) {
            background: #d5803f;
        }

        &:nth-child(4) {
            background: #dabc5b;
        }

        &:nth-child(5) {
            background: #f5f5f5;
        }
    }

    &__profitable {
        text-shadow: 1px 0 1px #003b00;
        color: #00b800;
    }

    &__unprofitable {
        text-shadow: 1px 0 1px #4a0404;
        color: #a52a2a;
    }

    &__unknown {
        text-shadow: 0px 0 1px #131313;
        color: #585858;
    }
}

</style>