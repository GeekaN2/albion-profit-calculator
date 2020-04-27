<template>
    <div class="settings">
        <h2>Settings</h2>
        <div class="setting">
            <input type="checkbox" id="checkbox" v-model="useBooks">
            <label for="checkbox">Use journals</label>
        </div>
        <div class="refresh_item">
            <img src="images/redo-alt.svg" alt="">
            <p>Update current item</p>
        </div>
        <div class="refresh_item">
            <img src="images/sync-alt.svg" alt="">
            <p>Reload all prices</p>
        </div>
        <select class="city" v-model="city">
            <option>Caerleon</option>
            <option>Black Market</option>
            <option>Bridgewatch</option>
            <option>Fort Sterling</option>
            <option>Lymhurst</option>
            <option>Martlock</option>
            <option>Thetford</option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'Settings',
    data() {
        return {
            useBooks: false,
            city: 'Caerleon'
        }
    },

}
</script>

<style scoped lang="scss">
.settings {
    display: flex;
    flex-direction: column;
    min-height: 400px;
    width: 200px;
    padding: 10px;
    font-size: 16px;

    h2 {
        text-align: center;
        font-size: 18px;
        margin-bottom: 10px;
        font-weight: 700;
    }
}

.setting {
    font-size: 16px;
    margin-bottom: 10px;

    input[type="checkbox"] {
        display: none;
        
        &:checked + label:after{
            background: #488a36;
        }
    }

    label[for="checkbox"] {
        position: relative;
        cursor: pointer;
        margin-left: 20px;
        padding-left: 5px;

        &:after {
            content: ' ';
            position: absolute;
            left: -20px;
            top: 1px;
            width: 16px;
            height: 16px;
            border: 2px solid #000;
            background: white;
            display: block;
        }
    }   
}

.city {
    width: 100%;
    margin-bottom: 10px;
}

select {
    height: 22px;
    font-family: 'Ubuntu';
    font-size: 16px;
}

.refresh_item {
    display: flex;
    justify-content: left;
    margin-bottom: 10px;
    cursor: pointer;

    img {
        width: 18px;
    }

    p {
        margin-left: 5px;
    }
}
</style>