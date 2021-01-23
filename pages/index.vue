<template>
  <section class="main_page_container main_page">
    <div>
      <h1 class="main_page__title">
        Albion Profit Calculator
      </h1>
      <h2 class="main_page__subtitle"/>
      <div class="main_page__links">
        <nuxt-link 
          v-if="$auth.loggedIn"
          :to="localePath('/tree')"
          class="links__button--brown button">{{ $t('tree') }}
        </nuxt-link>
        <nuxt-link 
          v-if="$auth.loggedIn"
          :to="localePath('/transmutations')"
          class="links__button--brown button">{{ $t('transmutations') }}
        </nuxt-link>
        <span
          v-if="$auth.loggedIn"
          class="links__button--brown button"
          @click="logout"
        >{{ $t('logout') }}
        </span>
        <span
          v-if="!$auth.loggedIn"
          class="links__button--brown button"
          @click="showModalAuth"
        >{{ $t('login') }}
        </span>
        <span
          v-if="!$auth.loggedIn"
          class="links__button--brown button"
          @click="showModalRegister"
        >{{ $t('register') }}
        </span>
      </div>
    </div>
    <Auth 
      v-if="isModalAuthShowed" 
      @hide-modal-auth="hideModalAuth"
    />
    <Register
      v-if="isModalRegisterShowed"
      @hide-modal-register="hideModalRegister"
    />
    <footer>
      <a href="https://github.com/GeekaN2">&copy; GeekaN</a>
      <a href="https://www.albion-online-data.com/">Powered by Albion Online Data Project</a>
      <span>
        <nuxt-link
          :class="{
            'button__underline': $i18n.locale === 'ru'
          }"
          :to="switchLocalePath('ru')"
          class="button">RU</nuxt-link>
        <nuxt-link
          :class="{
            'button__underline': $i18n.locale === 'en'
          }"
          :to="switchLocalePath('en')"
          class="button">EN</nuxt-link>
      </span>
    </footer>
  </section>
</template>

<i18n>
{
  "en": {
    "tree": "Profit tree",
    "transmutations": "Transmuting",
    "login": "Login",
    "register": "Register",
    "logout": "Logout"
  },
  "ru": {
    "tree": "Дерево профита",
    "transmutations": "Трансмутация",
    "login": "Войти",
    "register": "Зарегистрироваться",
    "logout": "Выйти"
  }
}
</i18n>

<script>
import Auth from '~/components/Auth';
import Register from '~/components/Register';

export default {
  name: 'MainPage',
  components: {
    Auth,
    Register
  },
  data() {
    return {
      /**
       * Is modal form shown or not
       */
      isModalAuthShowed: false,

      /**
       * Is modal form shown or not
       */
      isModalRegisterShowed: false,
    }
  },
  methods: {
    /**
     * Show modal auth form
     */
    showModalAuth() {
      this.isModalAuthShowed = true;
    },

    /**
     * Hide modal auth form
     */
    hideModalAuth() {
      this.isModalAuthShowed = false;
    },

    /**
     * Show modal register form
     */
    showModalRegister() {
      this.isModalRegisterShowed = true;
    },

    /**
     * Hide modal register form
     */
    hideModalRegister() {
      this.isModalRegisterShowed = false;
    },

    /**
     * Logout user
     */
    async logout() {
      await this.$auth.logout('local');
    }
  }
}
</script>

<style lang="scss">
$base-brown: #583131;
$base-purple: #583156;

.main_page_container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  width: 100%;
}

.main_page {
  font-size: 16px;

  &__title {
    display: block;
    font-weight: 300;
    font-size: 5em;
    color: $base-brown;
    letter-spacing: 1px;
  }

  &__subtitle {
    font-weight: 300;
    font-size: 2.6em;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
    
    &__button--purple, &__button--brown {
      display: inline-block;
      border-radius: 4px;
      border: 1px solid $base-brown;
      color: $base-brown;
      text-decoration: none;
      padding: 10px 30px;
      margin-left: 15px;
    }

    &__button--purple {
      border-color: $base-purple;
      color: $base-purple;
    }

    &__button--purple:hover {
      color: #fff;
      background-color: $base-purple;
    }

    &__button--brown:hover {
      color: #fff;
      background: $base-brown;
    }
  }
}

footer {
  position: absolute;
  z-index: -2;
  bottom: 0;
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-evenly;

  a {
    color: $base-brown;
  }
}

.button {
  border: none;
  background: none;
  cursor: pointer;
  color: $base-purple;

  &__underline {
    text-decoration: underline;
  }
}

@media (max-width: 991px) {
  .main_page {
    font-size: 14px;
  }
}

@media (max-width: 840px) {
  .main_page {
    font-size: 12px;
  }
}

@media (max-width: 479px) {
  .main_page {
    font-size: 11px;
  }
}
</style>
