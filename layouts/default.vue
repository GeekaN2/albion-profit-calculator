<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
import Vue from 'vue';

if (process.client && process.env.HAWK_CATCHER_TOKEN) {
  const HawkCatcher = require('@hawk.so/javascript');

  const hawk = new HawkCatcher({
    token: process.env.HAWK_CATCHER_TOKEN,
    vue: Vue,
  });

  // Yandex.Metrica
  if (process.env.ENABLE_METRIKA == 'true'){
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(65443882, "init", {
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true
      });
    }
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

:root {
  --error: #e73939;
  --color: #1d7d18;
}

a {
  text-decoration: none;
}
</style>

