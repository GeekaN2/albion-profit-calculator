<template>
  <div class="modal_form_wrapper">
    <div 
      v-click-outside="hideModal"
      class="modal_form"
    >
      <div class="modal_form__header">
        <h2 class="modal_form__title">Register an account</h2>
        <img 
          class="close_button" 
          src="images/close.svg"
          @click="hideModal"
        >
      </div>
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
      <input 
        v-model="token"
        class="modal_form__input"   
        type="token"
        placeholder="e32ab7123e9a9f9451..."
        required
      >
      <p class="modal_form__description">To get register token write me on Discord <span class="underline_text">GeekaN#8674</span></p>
      <button 
        class="modal_form__button">
        Register
      </button>
    </div>
  </div>
</template>

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
      token: ''
    }
  },
  methods: {
    hideModal() {
      this.$emit('hide-modal-register');
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