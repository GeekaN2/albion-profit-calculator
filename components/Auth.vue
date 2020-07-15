<template>
  <div class="modal_form_wrapper">
    <div 
      v-click-outside="hideModal"
      class="modal_form"
    > 
      <div class="modal_form__header">
        <h2 class="modal_form__title">Login into account</h2>
        <img 
          class="close_button" 
          src="images/close.svg"
          @click="hideModal"
        >
      </div>
      <p class="modal_form__error">
        Erorr
      </p>
      <input 
        v-model="nickname"
        class="modal_form__input"   
        type="text"
        placeholder="Nickname"
        required
      >
      <input 
        v-model="password"
        class="modal_form__input"   
        type="password"
        placeholder="Password"
        required
      >
      <button 
        class="modal_form__button"
        @click="login"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserAuthForm',
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
      error: ''
    }
  },
  methods: {
    hideModal() {
      this.$emit('hide-modal-auth');
    },
    async login() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            nickname: this.nickname,
            password: this.password
          }
        });
        console.log(response);

        this.$router.push(this.localePath('/tree'));
      } catch(error) {
        this.error = error;
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
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  font-size: 1.2rem;
}

.modal_form {
  width: 300px;
  padding: 15px;
  background: #fff;
  border-radius: 15px;
  text-align: center;
  color: #583131;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  &__error {
    margin-bottom: 10px;
    color: #ad0404;
  }

  &__input {
    width: 100%;
    padding: 12px 5px;
    text-align: center;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #908585;
    font-size: 1rem;
    outline: none;
    transition: 0.2s;
    color: #583131;

    &:focus {
      border: 1px solid #583131;
    }
  }

  &__button {
    width: 100%;
    padding: 12px 5px;
    border-radius: 5px;
    background: #875f5f;
    border: none;
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
    letter-spacing: 1px;
    outline: none;
    transition: 0.1s;
    cursor: pointer;

    &:hover {
      background: #a27e7e;
    }
  }
}

.close_button {
  width: 2rem;
  opacity: 0.6;
  cursor: pointer;
}
</style>