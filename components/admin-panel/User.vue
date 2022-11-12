<template>
  <div class="user-data">
    <span class="nickname">{{ user.nickname }}</span>
    <div class="user-info">
      <div
        v-if="!user.resetPassword"
        @click="allowResetPassword"
      >
        User is not allowed to change the password:
        <button class="role">
          Allow?
        </button>
      </div>
      <div v-else>
        User allowed to change the password: ✅
      </div>
      <div class="roles">
        <span
          v-for="role in roles"
          :key="role"
          class="role"
          :class="{
            'role--selected': role == user.role,
          }"
          @click="updateRole(role)"
        >
          {{ role }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "User",
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState({
      roles: (state) => state.adminPanel.roles,
    }),
  },
  methods: {
    async updateRole(role) {
      if (this.user.role == role) {
        return;
      }

      try {
        const message = await this.$store.dispatch("adminPanel/UPDATE_ROLE", {
          nickname: this.user.nickname,
          role,
          token: this.$auth.strategy.token.get(),
        });

        this.$toast.success(message);
      } catch {
        this.$toast.error(this.$t("toast.somethingWentWrong"));
      }
    },

    async allowResetPassword() {
      try {
        const message = await this.$store.dispatch("adminPanel/UPDATE_ALLOW_RESET_PASSWORD", {
          nickname: this.user.nickname,
          token: this.$auth.strategy.token.get(),
        });

        this.$toast.success(message);
      } catch {
        this.$toast.error(this.$t("toast.somethingWentWrong"));
      }
    }
  },
};
</script>

<style scoped lang="scss">
.user-data {
  display: flex;
  flex-direction: row;
  padding: var(--space-xs) var(--space-m);
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-blind);
}

.nickname {
  font-size: 20px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-xs);
}

.roles {
  display: flex;
  flex-direction: row;
}

.role {
  display: inline-block;
  border: 1px solid var(--color-secondary);
  border-radius: 10px;
  padding: 1px 5px;
  text-align: center;
  margin: 0 5px;
  font-size: 0.9em;
  cursor: pointer;
  transition: 0.1s;

  &--selected {
    border: 1px solid var(--color-blind);
    background: var(--color-blind);
    color: var(--color-primary);
  }

  &:first-child {
    margin-left: 0px;
  }

  &:hover {
    background: var(--color-primary-analog-contrast);
    color: var(--color-primary);
  }
}
</style>