<template>
  <GlobalNotify id="install-client">
    <div class="install-client-notify"> 
      ⚠️ {{ $t('yoo') }} <svg-icon icon-class="clock" /> {{ $t('outdated') }} <a href="https://github.com/ao-data/albiondata-client/releases">{{ $t('fromHere') }}</a> {{ $t('updateItBy') }} <a href="https://youtu.be/H6ynVMmYKgc">{{ $t('throughMarket') }}</a><br>
      {{ $t('thanks') }} <a href="https://www.albion-online-data.com/">{{ $t('AODP') }}</a><br>
      {{ $t('note') }}
    </div>
  </GlobalNotify>
</template>

<i18n>
    {
      "en": {
        "yoo": "Yoo, If you don't want to see",
        "outdated": "outdated prices, install it",
        "fromHere": "from here",
        "updateItBy": "and update it by",
        "throughMarket": "going through the market",
        "thanks": "All prices in the calculator are updated thanks to the people with the client. And also thanks to the guys who created the",
        "AODP": "Albion Online Data Project",
        "note": "Prices are updated instantly, so you only need to reload the page or click the appropriate update buttons. Have a nice day 🍪 GeekaN"
      },
      "ru": {
        "yoo": "Привет, если ты не хочешь видеть",
        "outdated": "устаревшие цены, установи клиент",
        "fromHere": "отсюда",
        "updateItBy": "и обновляй их автоматически",
        "throughMarket": "просматривая маркет",
        "thanks": "Все цены в калькуляторе обновляются благодаря людям с клиентом. Отдельная благодарочка создателям",
        "AODP": "Albion Online Data Project",
        "note": "Цены обновляются мгновенно, поэтому после обновления цен нужно только перезагрузить страницу или нажать на кнопки обновления. Всего наилучшего 🍪 GeekaN"
      }
    }
    </i18n>

<script>
import GlobalNotify from './GlobalNotify.vue';

export default {
    name: 'InstallClient',
    components: {
        GlobalNotify,
    },
}
</script>

<style>
.install-client-notify {
    line-height: 1.4em;
}
</style>