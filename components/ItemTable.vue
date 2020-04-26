<template>
    <div class="table">
        <div class="common row">
            <div class="row__unprofitable">-1263</div>
            <div class="row__unprofitable">-542345</div>
            <div class="row__profitable">4123413</div>
            <div class="row__profitable">623345</div>
            <div class="row__profitable">-12345</div>
        </div> 
        <div class="uncommon row">
            <div class="row__profitable">1263</div>
            <div class="row__profitable">542345</div>
            <div class="row__unprofitable">-4123413</div>
            <div class="row__unprofitable">-623345</div>
            <div class="row__profitable">-12345</div>
        </div>
        <div class="rare row">
            <div class="row__profitable">1263</div>
            <div class="row__profitable">542345</div>
            <div class="row__profitable">4123413</div>
            <div class="row__unprofitable">-623345</div>
            <div class="row__profitable">-12345</div>
        </div>
        <div class="exceptional row">
            <div class="row__profitable">1263</div>
            <div class="row__profitable">542345</div>
            <div class="row__profitable">4123413</div>
            <div class="row__profitable">623345</div>
            <div class="row__unprofitable">-12345</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ItemTable'
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
}

</style>