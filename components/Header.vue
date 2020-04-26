<template>
    <div class="header">
        <a href="/" class="header__logo">Albion profit calculator</a>
        <a href="/tree" class="header__link">profit tree</a>
        <a href="/table" class="header__link">profit table</a>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped lang="scss">
$base-brown: #583131;
$base-purple: #583156;

.header {
    padding: 15px;
    margin-bottom: 40px;
    font-size: 20px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;

    &__logo {
        color: $base-brown;
    }

    &__link {
        position: relative;
        color: $base-brown;
    }

    &__link:before {
        content: '';
        border-bottom: 2px solid $base-brown;
        position: absolute;
        right: 51%;
        left: 51%;
        bottom: -5px;
        transition-property: all;
        transition-timing-function: cubic-bezier(0, 0.98, 0.51, 0.93);
        transition-duration: 200ms;
    }

    &__link:hover:before {
        left: 0%;
        right: 0%;
    }
}
</style>