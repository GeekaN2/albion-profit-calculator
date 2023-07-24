<template>   
  <select
    v-model="currentServerId"
    class="servers-select"
  >
    <template v-for="server in servers">
      <option
        :key="server.id"
        :value="server.id"
      >
        {{ $t(`servers.${server.id}`) }}
      </option>
    </template>
  </select>
</template>
  
<script>
import { mapState } from 'vuex';

export default {
    name: "ServersSelect",
    computed: {
        ...mapState({
            servers: state => state.features.servers,
        }),

        currentServerId: {
            set(serverId) {
                this.$store.commit('features/SET_CURRENT_SERVER_ID', serverId);
            },
            get() {
                return this.$store.state.features?.currentServerId;
            }
        }
    },
    mounted() {
        if (this.servers?.length === 0) {
            this.$store.dispatch('features/FETCH_SERVERS');
        }
    }
};
</script>
  
<style scoped lang="scss">
.servers-select {
    margin-right: var(--space-s);
    border-radius: var(--radius-s);
    padding: 0 var(--space-2-xs);
    width: fit-content;
    background: var(--color-primary);
    color: var(--color-secondary);
    border: 1px solid var(--color-contrast);
    cursor: pointer;
    transition: 0.1s;
    outline: none;

    &:hover {
        border-color: var(--color-contrast-analog);
    }
}
</style>