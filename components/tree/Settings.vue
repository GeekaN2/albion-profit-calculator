<template>
  <div class="settings">
    <template v-if="settings.useExpertMode">
      <ExpertSettings class="settings__expert" />
    </template>
    <BasicSettings class="settings__basic" />
  </div>
</template>

<script>
import BasicSettings from './BasicSettings';
import ExpertSettings from './ExpertSettings';
import { mapState } from 'vuex';

export default {
  name: "Settings",
  components: {
    BasicSettings,
    ExpertSettings
  },
  computed: {
    ...mapState({
      settings: state => state.tree.settings,
    })
  }
};
</script>

<style scoped lang="scss">
.settings {
  display: flex;
  justify-content: left;
  flex-direction: row;

  &__basic {
    width: 100%;
  }
}
</style>