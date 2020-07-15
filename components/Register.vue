<template>
  <div class="modal_form_wrapper">
    <div 
      v-click-outside="hideModal"
      class="modal_form"
    >
      <div class="modal_form__header">
        <h2 class="modal_form__title">{{ $t('register') }}</h2>
        <img 
          class="close_button" 
          src="images/close.svg"
          @click="hideModal"
        >
      </div>
      <form @submit.prevent="register">
        <p class="modal_form__error">
          {{ $t(error) }}
        </p>
        <input 
          :placeholder="$t('nickname')"
          v-model="nickname"
          class="modal_form__input"   
          type="text"
          required
        >
        <input 
          :placeholder="$t('password')"
          v-model="password"
          class="modal_form__input"   
          type="password"
          required
        >
        <input 
          v-model="token"
          class="modal_form__input"   
          type="token"
          placeholder="e32ab7123e9a9f9451..."
          required
        >
        <p class="modal_form__description">{{ $t('getToken') }} <span class="underline_text">GeekaN#8674</span></p>
        <button 
          class="modal_form__button"
          @click="register"
        >
          {{ $t('registerButton') }}
        </button>
      </form>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "register": "Register an account",
    "registerButton": "Register",
    "nickname": "Nickname",
    "password": "Password",
    "getToken": "To get register token write me on Discord ",
    "error": {
      "badToken": "Bad register token",
      "empty": "Fill in all the fields",
      "wrong": "Nickname is already taken"
    }
  },
  "ru": {
    "register": "Регистрация",
    "registerButton": "Регистрация",
    "nickname": "Никнейм",
    "password": "Пароль",
    "getToken": "Чтобы получить токен для регистрации, напиши мне в Дискорд ",
    "error": {
      "badToken": "Такого токена не существует",
      "empty": "Заполните все поля",
      "wrong": "Такой никнейм уже занят"
    }
  }
}
</i18n>

<script>
export default {
  name: 'UserRegisterForm',
  props: {
    isModalShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      nickname: '',
      password: '',
      token: '',
      error: ''
    }
  },
  methods: {
    hideModal() {
      this.$emit('hide-modal-register');
    },
    async register() {
      try {
        if (!this.nickname || !this.password || !this.token) {
          this.error = 'error.empty';

          return
        }

        const response = await this.$axios.$post('register', {
          nickname: this.nickname,
          password: this.password,
          registerToken: this.token
        });

        if (response == 'Bad register token') {
          this.error = 'error.badToken';

          return;
        }

        await this.$auth.loginWith('local', {
          data: {
            nickname: this.nickname,
            password: this.password
          },
        })

        this.$router.push(this.localePath('/tree'));
      } catch {
        this.error = 'error.wrong';
      }
    }
  }
};
</script>

<style lang="scss">
.modal_form {
  &__description {
    font-size: 0.9rem;
    text-align: left;
    margin-bottom: 10px;
  }
}

.underline_text {
  text-decoration: underline;
}
</style>