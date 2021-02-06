<template>
  <div class="container">
    <div class="reset-password">
      <h2>Reset password</h2>
      <h3
        v-if="info"
        class="info"
      >
        {{ info }}
      </h3>
      <form @submit.prevent="reset">
        <input 
          v-model="nickname"
          :placeholder="$t('nickname')"
          class="input"   
          type="text"
          required
        >
        <input 
          v-model="password"
          :placeholder="$t('password')"
          class="input"   
          type="password"
          required
        >
        <button 
          class="button"
          @click.prevent="reset"
        >
          Reset
        </button>
      </form>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "nickname": "Nickname",
    "password": "New password"
  },
  "ru": {
    "nickname": "Никнейм",
    "password": "Новый пароль"
  }
}
</i18n>

<script>
export default {
  name: "ResetPassword",
  data() {
    return {
      nickname: '',
      password: '',
      info: ''
    }
  },
  methods: {
    async reset() {
      if (!this.nickname || !this.password) {
        return;
      }

      const baseUrl = process.env.BASE_URL;

      const response = await this.$axios.post(`${baseUrl}utils/reset-password`, {
        nickname: this.nickname,
        password: this.password
      });

      this.info = response.data;
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  color: #583131;

}

.reset-password {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 260px;
  border: 1px solid #908585;
  padding: 10px;
  border-radius: 10px;

  h2 {
    margin-bottom: 10px;
  }
}

.input {
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
    border-color: #583131;
  }
}

.info {
  text-align: center;
  color: #583156;
  font-size: 0.9em;
  margin-bottom: 10px;
}

.button {
  width: 100%;
  padding: 12px 5px;
  border-radius: 5px;
  margin-top: 10px;
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
</style>