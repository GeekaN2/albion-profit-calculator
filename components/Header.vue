<template>
  <div class="header">
    <div class="header__left">
      <nuxt-link 
        :to="localePath('/')"
        class="header__logo">
        Albion profit calculator
      </nuxt-link>
      <a 
        :title="$t('support')"
        href="https://patreon.com/geekan"
        target="_blank"
      >
        <img 
          class="header__patreon" 
          src="/images/patreon.svg">
      </a>
    </div>
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

<i18n>
{
  "en": {
    "support": "Support me on patreon :)"
  },
  "ru": {
    "support": "Поддержи меня на патреоне :)"
  }
}
</i18n>

<script>
export default {
  name: "Header",
  methods: {
    /**
     * Logout user
     */
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

  &__patreon {
    width: 14px;
    margin-left: 10px;
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