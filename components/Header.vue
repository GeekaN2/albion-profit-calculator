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
        <svg-icon
          class="header__patreon" 
          icon-class="patreon"
        />
      </a>
      <a
        class="header__social"
        href="https://discord.gg/2AM2twM"
        target="_blank"
      >
        <img
          class="header__discord"
          title="Our discord server"
          src="/svg/discord-logo-color.svg"
        > 
      </a>
    </div>
    <div class="header__wrapper">
      <ThemeToggle class="header__toggle" />
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
      <span class="header__user-role">{{ $auth?.user?.role ?? 'guest' }}</span>
      <span 
        class="header__user-nickname"
      >{{ $auth?.user?.nickname }}</span>
      <div
        v-if="$auth.loggedIn" 
        @click="logout"
      >
        <svg-icon
          class="logout_button"
          icon-class="exit" 
        />
      </div>
      <button
        v-if="!$auth.loggedIn"
        class="header__sign-in"
        @click.stop="showModalAuth"
      >
        {{ $t('signIn') }}
      </button>
    </div>
    <portal to="body">
      <Auth
        v-if="isModalAuthShowed"
        @hide-modal-auth="hideModalAuth"
      />
    </portal>
  </div>
</template>

<i18n>
{
  "en": {
    "support": "Become a patron",
    "signIn": "Sign in"
  },
  "ru": {
    "support": "Поддержать на патреоне",
    "signIn": "Войти"
  }
}
</i18n>

<script>
import ThemeToggle from './utils/ThemeToggle.vue';
import Auth from './Auth.vue';

export default {
  name: "Header",
  components: {
    ThemeToggle,
    Auth,
  },
  data() {
    return {
      isModalAuthShowed: false,
    };
  },
  methods: {
    logout() {
      this.$auth.logout('local');
    },

    showModalAuth() {
      this.isModalAuthShowed = true;
    },

    hideModalAuth() {
      this.isModalAuthShowed = false;
    },
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

  &__sign-in {
    background: none;
    color: var(--color-seondary);
    border: var(--color-secondary) 1px solid;
    border-radius: var(--radius-xs);
    cursor: pointer;
    padding: var(--space-2-xs) var(--space-s);

    &:hover {
      background: var(--color-secondary);
      color: var(--color-primary);
    }
  }

  &__left {
    display: flex;
    align-items: center;
  }

  &__logo {
    color: var(--color-secondary);
    margin-right: 8px;
  }

  &__social {
    display: flex;
    margin-left: 5px;
    width: 15px;
    min-width: 13px;

    &:first-child {
      margin: 10px;
    }
  }

  &__patreon {
    color: #ff424d;
    width: 15px;
    height: 15px;
  }

  &__wrapper {
    display: flex;
    align-items: center;
  }

  &__toggle {
    margin-right: var(--space-xs);
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

      &:hover {
        color: var(--color-selected-hover);
      }
    }

    &--underline {
      text-decoration: underline;

      &:hover {
        color: var(--color-selected);
      }
    }
  }
}

.logout_button {
  width: 20px;
  height: 20px;
  cursor: pointer;
  fill: var(--color-contrast);
}
</style>