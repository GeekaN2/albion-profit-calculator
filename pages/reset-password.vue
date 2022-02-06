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
  color: var(--color-secondary);

}

.reset-password {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 260px;
  border: 1px solid var(--color-blind);
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
  border: 1px solid var(--color-blind);
  font-size: 1rem;
  outline: none;
  transition: 0.2s;
  color: var(--color-secondary);

  &:focus {
    border-color: var(--color-selected);
  }
}

.info {
  text-align: center;
  color: var(--color-selected);
  font-size: 0.9em;
  margin-bottom: 10px;
}

.button {
  width: 100%;
  padding: 12px 5px;
  border-radius: 5px;
  margin-top: 10px;
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
}
</style>