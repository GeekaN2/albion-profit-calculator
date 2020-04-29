<template>
  <div 
    v-if="text.length > 0" 
    class="container">
    <span class="container__loading">{{ text }}</span>
  </div>
</template>

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