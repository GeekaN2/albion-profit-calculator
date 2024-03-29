<template>
  <div class="modal_form_wrapper">
    <div 
      v-click-outside="hideModal"
      class="modal_form"
    > 
      <div class="modal_form__header">
        <h2 class="modal_form__title">
          {{ $t('login') }}
        </h2>
        <div @click="hideModal">
          <svg-icon
            class="close_button"
            icon-class="close"
          />
        </div>
      </div>
      <form @submit.prevent="login">
        <p class="modal_form__error">
          {{ $t(error) }}
        </p>
        <input 
          v-model="nickname"
          :placeholder="$t('nickname')"
          class="modal_form__input"   
          type="text"
          required
        >
        <input 
          v-model="password"
          :placeholder="$t('password')"
          class="modal_form__input"   
          type="password"
          required
        >
        <button 
          class="modal_form__button"
          @click.prevent="login"
        >
          {{ $t('loginButton') }}
        </button>
        <p class="modal_form__description">
          {{ $t('forgotThePassword') }}
          <span class="underline_text">GeekaN#8674</span>
        </p>
      </form>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "login": "Sign in to your account",
    "loginButton": "Sign in",
    "nickname": "Nickname",
    "password": "Password",
    "forgotThePassword": "Forgot your password? Write to me. I'll allow you to reset it",
    "myDiscord": "My Discord",
    "error": {
      "empty": "Fill in all the fields",
      "wrong": "Wrong nickname or password"
    }
  },
  "ru": {
    "login": "Войти в аккаунт",
    "loginButton": "Войти",
    "nickname": "Никнейм",
    "password": "Пароль",
    "myDiscord": "Мой Discord",
    "forgotThePassword": "Забыли пароль? Напишите мне. Я разрешу вам его сменить",
    "error": {
      "empty": "Заполните все поля",
      "wrong": "Неправильный никнейм или пароль"
    }
  }
}
</i18n>

<script>
export default {
  name: 'UserAuthForm',
  props: {
    /**
     * Show this modal or not
     */
    isModalShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      /**
       * User nickname
       */
      nickname: '',

      /**
       * User password
       */
      password: '',

      /**
       * Error message if something goes wrong
       */
      error: '',
    }
  },
  methods: {
    hideModal() {
      this.$emit('hide-modal-auth');
    },

    /**
     * Auth user
     */
    async login() {
      try {
        if (!this.nickname || !this.password){
          this.error = 'error.empty';

          return;
        }

        const response = await this.$auth.loginWith('local', {
          data: {
            nickname: this.nickname,
            password: this.password
          }
        });

        this.hideModal();
      } catch {
        this.error = 'error.wrong';
      }
    }
  }
};
</script>

<style lang="scss">
.modal_form_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.2);
  font-size: 1.2rem;
  z-index: 1000;
}

.modal_form {
  width: 300px;
  padding: 15px;
  background: var(--color-primary);
  border-radius: 15px;
  text-align: center;
  color: var(--color-secondary);
  box-shadow: 0 1px 12px -5px var(--color-unknown-secondary);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  &__error {
    margin-bottom: 10px;
    font-size: 0.9rem;
    text-align: left;
    color: var(--color-unprofitable);
  }

  &__input {
    width: 100%;
    padding: 12px 5px;
    text-align: center;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid var(--color-blind);
    font-size: 1rem;
    outline: none;
    transition: 0.2s;
    color: var(--color-secondary);
    background: var(--color-primary);

    &:focus {
      border: 1px solid var(--color-secondary);
    }
  }

  &__button {
    width: 100%;
    padding: 12px 5px;
    border-radius: 5px;
    margin: var(--space-s) 0;
    background: var(--color-secondary-analog);
    border: none;
    color: var(--color-primary);
    font-weight: bold;
    font-size: 1rem;
    letter-spacing: 1px;
    outline: none;
    transition: 0.1s;
    cursor: pointer;

    &:hover {
      background: var(--color-secondary-analog-hover);
    }

    &__description {
      font-size: 0.9rem;
      text-align: left;
      margin-bottom: 10px;
    }
  }
}

.close_button {
  width: 2rem;
  opacity: 0.6;
  cursor: pointer;
  fill: var(--color-contrast);
}

.underline_text {
  text-decoration: underline;
}

.purple-link {
  color: var(--color-selected);

  &:hover {
    color: var(--color-selected-hover);
  }
}
</style>