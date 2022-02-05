<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
import Vue from 'vue';
import LogRocket from 'logrocket';

if (process.client && process.env.HAWK_CATCHER_TOKEN) {
  import('@hawk.so/javascript')
    .then(HawkCatcher =>  {
      const hawk = new HawkCatcher.default({
        token: process.env.HAWK_CATCHER_TOKEN,
        vue: Vue,
      });
    })
}

if (process.env.ENABLE_LOG_ROCKET == 'true' && process.env.LOG_ROCKET_PROJECT) {
  LogRocket.init(process.env.LOG_ROCKET_PROJECT);
}

// Yandex.Metrica
if (process.client && process.env.ENABLE_METRIKA == 'true') {
  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(65443882, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
    });
}


export default {};
</script>

<style lang="scss">
@import '~/node_modules/minireset.css/minireset.min.css';

html {
  font-family: 'Ubuntu', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  margin-bottom: -30px;
}

.body {
  &--modal-shown {
    overflow: hidden;
  }
}

:root {
  --color-primary: #fff;
  --color-secondary: #583131;
  --color-contrast: #000;
  --color-disabled: #8b8b8b;
  --color-selected: #583156;
  --color-selected-hover: #7b4c79;
  --color-blind: #908585;


  --tier1: #cecece;
  --tier2: #dddddd;
  --tier3: #a2cea2;
  --tier4: #9bc8e2;
  --tier5: #eb8f87;
  --tier6: #e09255;
  --tier7: #eccc62;
  --tier8: #f5f5f5;

  --subtier0: #bebebe;
  --subtier1: #6afe90;
  --subtier2: #4bc8d2;
  --subtier3: #b987f7;

  --space-3-xs: 2px;
  --space-2-xs: 4px;
  --space-xs: 8px;
  --space-s: 12px;

  --color-profitable: #14a014;
  --color-profitable-secondary: #1bb31b;
  --color-profitable-shadow: #041e04;

  --color-unprofitable: #ae3a3a;
  --color-unprofitable-secondary: #d54c4c;
  --color-unprofitable-shadow: #380404;

  --color-unknown: #585858;
  --color-unknown-secondary: #6a6a6a;
  --color-unknown-shadow: #242424;

  --error: #e73939;
  --success: #1d7d18;

  --color-focus: #e19839;
}


a {
  text-decoration: none;
}
</style>

