<template>
  <div class="user-data">
    <span class="nickname">{{ user.nickname }}</span>
    <div class="roles">
      <span 
        v-for="role in roles"
        :key="role"
        class="role"
        :class="{
          'role--selected': role == user.role
        }"
        @click="updateRole(role)"
      >
        {{ role }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'User',
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState({
      roles: state => state.adminPanel.roles
    })
  },
  methods: {
    async updateRole(role) {
      if (this.user.role == role) {
        return;
      }

      try {
        const message = await this.$store.dispatch('adminPanel/UPDATE_ROLE', {
          nickname: this.user.nickname,
          role,
          token: this.$auth.strategy.token.get()
        });

        this.$toast.success(message);
      } catch {
        this.$toast.error(this.$t('toast.somethingWentWrong'));
      }
    }
  }
}
</script>

<style scoped lang="scss">
.user-data {
  display: flex;
  flex-direction: column;
  padding: 0 15px 10px 15px;
}

.nickname {
  font-size: 20px;
}

.role {
  display: inline-block;
  border: 1px solid #4b4343;
  border-radius: 10px;
  padding: 1px 5px;
  text-align: center;
  margin: 0 5px;
  font-size: 0.9em;
  cursor: pointer;
  transition: 0.1s;

  &--selected {
    border: 1px solid #888585;
    background: #7e6c6c;
    color: #fff;
  }

  &:first-child {
    margin-left: 0px;
  }

  &:hover {
    background: #cecece;
    color: #fff;
  }
}
</style>