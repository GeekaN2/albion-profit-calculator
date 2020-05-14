<template>
  <div class="header">
    <a 
      href="/" 
      class="header__logo">Albion profit calculator</a>
    <div>
      <nuxt-link 
        :to="localePath('/tree')"
        class="header__link">profit tree</nuxt-link>
        
      <nuxt-link
        v-if="$i18n.locale !== 'en'"
        :to="switchLocalePath('en')"
        class="header__link">
        EN
      </nuxt-link>
      <nuxt-link
        v-if="$i18n.locale !== 'ru'"
        :to="switchLocalePath('ru')"
        class="header__link">
        RU
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
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
  justify-content: space-between;

  &__logo {
    color: $base-brown;
  }

  &__link {
    margin-left: 50px;
    position: relative;
    color: $base-brown;
    white-space: nowrap;
  }

  &__link:before {
    content: "";
    border-bottom: 2px solid $base-brown;
    position: absolute;
    right: 51%;
    left: 51%;
    bottom: -3px;
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