<template>
  <div class="settings">
    <h2>{{ $t('settings') }}</h2>
  </div>
  
</template>

<script>
export default {
  name: 'Settings',
  methods: {}
}
</script>

<i18n>
{
  "en": {
    "expertMode": "Expert settings",
    "ownPercentage": "Use own return %"
  },
  "ru": {
    "expertMode": "Режим эксперта",
    "ownPercentage": "Свой % возврата"
  }
}
</i18n>

<style lang="scss">
.settings {
  display: flex;
  flex-direction: column;
  min-width: 230px;
  padding: 0px 10px 10px 10px;
  font-size: 1em;

  &__header {
    display: flex;
    justify-content: left;
  }

  h2 {
    text-align: center;
    font-size: 1.1em;
    margin-bottom: 10px;
    margin-left: 7px;
    font-weight: 700;
  }
}
</style>