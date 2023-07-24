<template>
  <div class="modal_form_wrapper">
    <div 
      v-click-outside="hideModal" 
      class="modal_form"
    >
      <div class="modal_form__header">
        <h2 class="modal_form__title">
          {{ $t('register') }}
        </h2>
        <div @click="hideModal">
          <svg-icon
            icon-class="close" 
            class="close_button" 
          />
        </div>
      </div>
      <form @submit.prevent="register">
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
        <p class="modal_form__description">
          {{ $t('registerToSaveSettings') }}
        </p>
        <p class="modal_form__description">
          {{ $t('visitUs') }}
          <a 
            class="underline_text purple-link" 
            href="https://discord.gg/2AM2twM"
            target="_blank"
          >{{ $t('discordServer') }}</a>
        </p>
        <button 
          class="modal_form__button" 
          @click.prevent="register"
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
    "registerToSaveSettings": "Register to be able to save settings and test beta features",
    "visitUs": "Visit my discord, there is a lot of useful information",
    "discordServer": "Discord server",
    "error": {
      "badToken": "Bad register token",
      "empty": "Fill in all the fields",
      "wrong": "Nickname is already taken"
    }
  },
  "ru": {
    "register": "Регистрация",
    "registerButton": "Зарегистрироваться",
    "nickname": "Никнейм",
    "password": "Пароль",
    "registerToSaveSettings": "Зерегистрируйтесь, чтобы сохранять настройки и тестировать бета фичи",
    "visitUs": "Заходите в мой дискорд, там много полезной инфы",
    "discordServer": "Сервер в дискорде",
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
  name: "UserRegisterForm",
  props: {
    /**
     * Show this modal or not
     */
    isModalShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      /**
       * User nickname
       */
      nickname: "",

      /**
       * User password
       */
      password: "",

      /**
       * Error message if something goes wrong
       */
      error: "",
    };
  },
  methods: {
    /**
     * Call function to hide this modal form
     */
    hideModal() {
      this.$emit("hide-modal-register");
    },

    /**
     * Regsiter user
     */
    async register() {
      try {
        if (!this.nickname || !this.password) {
          this.error = "error.empty";

          return;
        }

        const response = await this.$axios.$post("register", {
          nickname: this.nickname,
          password: this.password
        });
        
        await this.$auth.loginWith("local", {
          data: {
            nickname: this.nickname,
            password: this.password,
          },
        });

        this.hideModal();
      } catch {
        this.error = "error.wrong";
      }
    },
  },
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

.purple-link {
  color: var(--color-selected);

  &:hover {
    color: var(--color-selected-hover);
  }
}

.discord-nickname {
  user-select: all;
}
</style>