<template>
  <section class="container">
    <Header />
    <h2 class="title">
      {{ $t('FAQ') }}
    </h2>
    <div class="questions">
      <div
        name="not-only-4th-tier"
        class="question"
      >
        <div class="questionName">
          {{ $t('Q4tier') }}
        </div>
        <div class="answer">
          {{ $t('A4tier') }}
        </div>
      </div>
      <div
        name="how-to-update-prices"
        class="question"
      >
        <div class="questionName">
          {{ $t('QHowToUpdatePrices') }}
        </div>
        <div class="answer">
          {{ $t('AHowToUpdatePrices') }} <a
            href="https://github.com/ao-data/albiondata-client/releases"
          >https://github.com/ao-data/albiondata-client/releases</a>
          <a
            href="https://youtu.be/H6ynVMmYKgc"
            target="_blank"
          >https://youtu.be/H6ynVMmYKgc
          </a>
        </div>
      </div>
      <div
        name="how-to-use-other-servers"
        class="question"
      >
        <div class="questionName">
          {{ $t('QOtherServers') }}
        </div>
        <div class="answer">
          {{ $t('AOtherServers') }} <nuxt-link
            :to="localePath('/servers')"
            class="header__logo"
          >
            {{ $t('servers.servers') }}
          </nuxt-link>
        </div>
      </div>
      <div
        name="who-should-i-ask"
        class="question"
      >
        <div class="questionName">
          {{ $t('QwhoIAsk') }}
        </div>
        <div class="answer">
          {{ $t('AwhoIAsk') }} <a
            href="https://discord.gg/2AM2twM"
            target="_blank"
          >Discord</a>
        </div>
      </div>
    </div>
  </section>
</template>
    
<i18n>
    {
      "en": {
        "FAQ": "Frequently asked questions",
        "Q4tier": "Is there only the 4th tier of items here?",
        "A4tier": "No, there are all tiers and subtiers at once. Determine by colors. Horizontal tiers: blue - 4, red - 5, orange - 6. Vertical subtiers: without stroke - 0, with green stroke - 1 etc.",
        "QHowToUpdatePrices": "How to update prices?",
        "AHowToUpdatePrices": "Install the client and just check the market",
        "QOtherServers": "How to send prices to different servers?",
        "AOtherServers": "Launch the client with a flag and a list of the necessary servers. The data will be sent to them. To switch the data source in the calculator, use the select in the header.",
        "QwhoIAsk": "I have a lot of questions, who should I ask?",
        "AwhoIAsk": "Ask the guys on the server in discord or me (the creator, GeekaN#8674) directly."
        
      },
      "ru": {
        "FAQ": "Часто задаваемые вопросы",
        "Q4tier": "Здесь только 4-й тир предметов?",
        "A4tier": "Нет, здесь сразу все тиры и подтиры. Определяй по цветам. По горизонтали тиры: синий - 4, красный - 5, оранжевый - 6. По вертикали подтиры: без обводки - 0, с зеленой обводкой - 1 etc.",
        "QHowToUpdatePrices": "Как обновлять цены?",
        "AHowToUpdatePrices": "Установи клиент и просто проверяй цены на рынке",
        "QOtherServers": "Как отправлять цены на разные сервера?",
        "AOtherServers": "Запусти клиент с флагом и списком нужных серверов. Данные будут поступать на них. Чтобы переключить источник данных в кальуляторе, используй селект в верхней части страницы.",
        "QwhoIAsk": "У меня много вопросов, кому задать?",
        "AwhoIAsk": "Спросите у ребят на сервере в Discord или у меня (создателя, GeekaN#8674) напрямую."
      }
    }
    </i18n>
    
<script>
import Header from "~/components/Header";

export default {
    name: "FAQ",
    components: {
        Header,
    },
};
</script>
    
<style scoped lang='scss'>
.title {
    text-align: center;
    font-size: 1.2em;
}

.questions {
    display: flex;
    flex-direction: column;
    gap: var(--space-3-xl);
    margin: var(--space-s);
}

.question {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
}

.questionName {
    font-size: 1.3rem;
}
</style>