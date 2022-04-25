<template>
  <div>
    <Header />
    <div>
      <div class="users">
        <div 
          v-for="user of users.slice(0, 10)"
          :key="user.nickname"
          class="user"
        >
          <User :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header';
import User from '~/components/admin-panel/User';
import { mapState } from 'vuex';

export default {
  name: 'AdminPanel',
  components: {
    Header,
    User
  },
  middleware: ['authenticated', 'admin'],
  computed: {
    ...mapState({
      roles: state => state.adminPanel.roles,
      users: state => state.adminPanel.users
    })
  },
  created() {
    this.$store.dispatch('adminPanel/GET_ROLES', this.$auth.strategy.token.get());
    this.$store.dispatch('adminPanel/GET_USERS', this.$auth.strategy.token.get());
  }
}
</script>

<style scoped lang="scss">

</style>