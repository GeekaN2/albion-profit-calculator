<template>
  <a 
    href="https://patreon.com/geekan"
    class="support-me"
    target="_blank"
  >
    <span>{{ $t('supportMe') }}</span>
    <Patreon />
  </a>
</template>
  
  <i18n>
  {
    "en": {
      "supportMe": "Support me"
    },
    "ru": {
      "supportMe": "Поддержите меня"
    }
  }
  </i18n>
  
  <script>
  import Patreon from '~/components/icons/Patreon.vue';

  export default {
    name: "SupportMe",
    components: {
        Patreon
    }
  };
  </script>
  
  <style scoped lang="scss">
  .support-me {
    border: 1px solid var(--color-secondary);
    border-radius: var(--radius-s);
    padding: var(--space-3-xs) var(--space-2-xs);

    &:hover {
        background: var(--color-secondary);
        color: var(--color-primary);
    }
  }
  </style>