<template>
  <div class="header">
    <nuxt-link 
      :to="localePath('/')"
      class="header__logo">
      Albion profit calculator
    </nuxt-link >
    <div class="header__wrapper">
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
      <span 
        class="header__user_nickname">{{ $auth.user.nickname }}</span>
      <img
        class="logout_button"
        src="/images/exit.svg" 
        @click="logout">
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout() {
      this.$auth.logout('local');
    }
  }
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

  &__wrapper {
    display: flex;
    align-items: center;
  }

  &__user_nickname {
    display: inline-block;
    margin-left: 20px;
    margin-right: 5px;
    color: $base-brown;
  }

  &__link {
    margin-right: 5px;
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

.logout_button {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>