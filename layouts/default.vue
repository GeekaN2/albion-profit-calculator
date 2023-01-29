<template>
  <div>
    <div><nuxt /></div>
    <portal-target name="body" />
  </div>
</template>

<script>
import Vue from 'vue';
import LogRocket from 'logrocket';

if (process.client && process.env.HAWK_CATCHER_TOKEN) {
  try {
    import('@hawk.so/javascript')
    .then(HawkCatcher =>  {
      const hawk = new HawkCatcher.default({
        token: process.env.HAWK_CATCHER_TOKEN,
        vue: Vue,
      });
    })
  } catch {
    console.log('Couldn\'t initialize Hawk');
  }
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
  background: var(--color-primary);
  color: var(--color-contrast);
}

.body {
  &--modal-shown {
    overflow: hidden;
  }
}

.light-mode body {
  --color-primary: #fff;
  --color-primary-analog: #dfdfdf;
  --color-primary-analog-contrast: #5e5e5e;

  --color-secondary: #583131;
  --color-secondary-analog: #875f5f; // lighter version of secondary
  --color-secondary-analog-hover: #a27e7e;

  --color-contrast: #000;
  --color-contrast-analog: #333333;

  --color-disabled: #8b8b8b;
  --color-selected: #583156;
  --color-selected-hover: #7b4c79;
  --color-blind: #908585;

  --color-link: #005eff;
  --color-link-visited: #a300b9;
}

.dark-mode body {
  --color-primary: #242020;
  --color-primary-analog: #3a3434;
  --color-primary-analog-contrast: #d3c7c7;

  --color-secondary: #eeeeee;
  --color-secondary-analog: #b8b8b8; // lighter version of secondary
  --color-secondary-analog-hover: #a09494;

  --color-contrast: #ffffff;
  --color-contrast-analog: #cccccc;

  --color-disabled: #8b8b8b;
  --color-selected: #b69bb5;
  --color-selected-hover: #916c8f;
  --color-blind: #908585;

  --color-link: #4388fe;
  --color-link-visited: #cc5bdb;
}

:root {
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
  --subtier4: #f0f07d;

  --normal-quality: #acacac;
  --good-quality: #5788bd;
  --outstanding-quality: #db9c63;
  --excellent-quality: #e6e6e6;
  --masterpiece-quality: #fdb44f;

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

  --color-focus: #e08c4c;
  --color-checked: #e08c4c;
  --color-checked-analog: #3963e1;

  --space-3-xs: 2px;
  --space-2-xs: 4px;
  --space-xs: 8px;
  --space-s: 12px;
  --space-m: 14px;
  --space-l: 16px;
  --space-xl: 20px;
  --space-2-xl: 24px;
  --space-3-xl: 28px;

  --radius-2-xs: 2px;
  --radius-xs: 4px;
  --radius-s: 8px;
  --radius-m: 12px;
}


a {
  text-decoration: none;
  color: var(--color-link);

  &:visited {
    color: var(--color-link-visited);
  }
}

.tooltip > .tooltip-inner {
  background: var(--color-secondary);
  color: var(--color-primary);
  padding: var(--space-3-xs) var(--space-xs);
  border-radius: var(--radius-s);
}
</style>

