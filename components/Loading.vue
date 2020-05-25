<template>
  <div 
    v-if="text.length > 0" 
    class="container">
    <span class="container__loading">{{ $t(text) }}</span>
  </div>
</template>

<i18n>
{
    "en": {
        "items": "Loading item prices",
        "resources": "Loading resource prices",
        "journals": "Loading journal prices",
        "calculated": "Profit calculated"
    },
    "ru": {
        "items": "Загружем цены предметов",
        "resources": "Загружаем цены ресурсов",
        "journals": "Загружаем цены журналов",
        "calculated": "Профит посчитан"
    }
}
</i18n>

<script>
export default {
    name: 'Loading',
    props: {
        text: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped lang="scss">
.container {
    text-align: center;
    color: #3e3e3e;

    &__loading {
        padding: 2px;
        position: relative;
    
        &:after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2.5px;
            background: linear-gradient(270deg, #2aa4f0, #f06e62, #ee7c25, #f1c946);
            background-size: 1000% 1000%;
            animation: gradient 60s ease infinite;
            border-radius: 1px;
        }

        @keyframes gradient {
            0%{background-position:0% 50%}
            50%{background-position:100% 50%}
            100%{background-position:0% 50%}
        }
    }
}
</style>