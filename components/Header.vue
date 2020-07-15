<template>
  <div class="header">
    <nuxt-link 
      :to="localePath('/')"
      class="header__logo">
      Albion profit calculator
    </nuxt-link >
    <div>
      <span 
        class="header__user"
      >{{ $auth.user.nickname }}</span>
      <nuxt-link
        :class="{
          'header__link--underline': $i18n.locale === 'ru'
        }"
        :to="switchLocalePath('ru')"
        class="header__link header__link--purple">RU</nuxt-link>
      <nuxt-link
        :class="{
          'header__link--underline': $i18n.locale === 'en'
        }"
        :to="switchLocalePath('en')"
        class="header__link header__link--purple">EN</nuxt-link>
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
  
  &__user {
    margin-right: 20px;
    color: $base-brown;
  }

  &__link {
    margin-left: 5px;
    position: relative;
    color: $base-brown;
    white-space: nowrap;

    &--purple {
      color: $base-purple;
    }

    &--underline {
      text-decoration: underline;
    }
  }
}
</style>