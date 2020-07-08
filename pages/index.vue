<template>
  <section class="main_page_container main_page">
    <div>
      <h1 class="main_page__title">
        Albion Profit Calculator
      </h1>
      <h2 class="main_page__subtitle"/>
      <div class="main_page__links">
        <nuxt-link 
          :to="localePath('/tree')"
          class="links__button--brown button">Profit tree
        </nuxt-link>
        <span
          class="links__button--brown button"
          @click="showModalAuth"
        >Login
        </span>
        <span
          class="links__button--brown button"
          @click="showModalRegister"
        >Register
        </span>
      </div>
    </div>
    <UserAuthForm 
      v-if="isModalAuthShowed" 
      @hide-modal-auth="hideModalAuth"
    />
    <UserRegisterForm
      v-if="isModalRegisterShowed"
      @hide-modal-register="hideModalRegister"
    />
    <footer>
      <a href="https://github.com/GeekaN2">&copy; GeekaN</a>
      <a href="https://www.albion-online-data.com/">Powered by Albion Online Data Project</a>
    </footer>
  </section>
</template>

<script>
import UserAuthForm from '~/components/UserAuthForm';
import UserRegisterForm from '~/components/UserRegisterForm';

export default {
  name: 'MainPage',
  components: {
    UserAuthForm,
    UserRegisterForm
  },
  data() {
    return {
      isModalAuthShowed: false,
      isModalRegisterShowed: false,
    }
  },
  methods: {
    showModalAuth() {
      this.isModalAuthShowed = true;
    },
    hideModalAuth() {
      this.isModalAuthShowed = false;
    },
    showModalRegister() {
      this.isModalRegisterShowed = true;
    },
    hideModalRegister() {
      this.isModalRegisterShowed = false;
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
  &__title {
    display: block;
    font-weight: 300;
    font-size: 80px;
    color: $base-brown;
    letter-spacing: 1px;
  }

  &__subtitle {
  font-weight: 300;
  font-size: 42px;
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
  cursor: pointer;
}
</style>
