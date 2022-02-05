<template>
  <div class="header">
    <div class="header__left">
      <nuxt-link 
        :to="localePath('/')"
        class="header__logo"
      >
        Albion profit calculator
      </nuxt-link>
      <a 
        class="header__social"
        href="https://patreon.com/geekan"
        target="_blank"
      >
        <img 
          :title="$t('support')"
          class="header__patreon" 
          src="/images/patreon.svg"
        >
      </a><a
        class="header__social"
        href="https://ko-fi.com/geekan"
        target="_blank"
      >
        <img 
          title="Support me on ko-fi"
          class="header__ko-fi"
          src="/images/ko-fi-logo.png"
        >  
      </a><a
        class="header__social"
        href="https://discord.gg/2AM2twM"
        target="_blank"
      >
        <img 
          title="Our discord server"
          class="header__discord"
          src="/images/discord-logo-color.svg"
        > 
      </a>
    </div>
    <div class="header__wrapper">
      <nuxt-link
        :class="{
          'header__link--underline': $i18n.locale === 'ru'
        }"
        :to="switchLocalePath('ru')"
        class="header__link header__link--purple"
      >
        RU
      </nuxt-link>
      <nuxt-link
        :class="{
          'header__link--underline': $i18n.locale === 'en'
        }"
        :to="switchLocalePath('en')"
        class="header__link header__link--purple"
      >
        EN
      </nuxt-link>
      <span class="header__user-role">{{ $auth.user.role }}</span>
      <span 
        class="header__user-nickname"
      >{{ $auth.user.nickname }}</span>
      <img
        class="logout_button"
        src="/images/exit.svg" 
        @click="logout"
      >
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "support": "Become a patron"
  },
  "ru": {
    "support": "Поддержать на патреоне"
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

.header {
  padding: 15px;
  margin-bottom: 40px;
  font-size: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  &__left {
    display: flex;
    align-items: center;
  }

  &__logo {
    color: var(--color-secondary);
    margin-right: 8px;
  }

  &__social {
    display: inline-block;
    margin-left: 5px;
    width: 15px;
    min-width: 13px;

    &:first-child {
      margin: 10px;
    }
  }

  &__wrapper {
    display: flex;
    align-items: center;
  }

  &__user-role {
    font-size: 0.7em;
    color: var(--color-seondary);
    margin-left: 10px;
    border: 1px solid;
    padding: 0px 5px 1px 5px;
    border-radius: 8px;
  }

  &__user-nickname {
    display: inline-block;
    margin-left: 10px;
    margin-right: 5px;
    color: var(--color-secondary);
  }

  &__link {
    margin-right: 5px;
    position: relative;
    color: var(--color-secondary);
    white-space: nowrap;

    &--purple {
      color: var(--color-selected);
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