<template>
  <section class="container">
    <Header />

    <h2 class="servers-title">
      {{ $t('availableServers') }}
    </h2>
    <div class="servers">
      <div
        v-for="server in servers"
        :key="server.id"
      >
        <div
          class="server"
          :value="server.id"
        >
          <h3 class="server-title">
            {{ $t(`servers.${server.id}`) }}
            <span class="healthcheck" />
          </h3>
          <span class="server-subtitle">NATS URL</span>
          <div class="server-url">
            {{ $t(server.natsUrl) }}
          </div>

          <div class="server-subtitle">
            {{ $t(server.description) }}
          </div>
        </div>
      </div>
    </div>
    <div class="connectInfo">
      <div>{{ $t('connectInfo') }}</div>
      <span class="server-subtitle">{{ $t('westCommand') }}: </span>
      <div class="commandExample">
        albiondata-client.exe -i {{ westNatsUrls.join(',') }}
      </div>
      <span class="server-subtitle">{{ $t('eastCommand') }}: </span>
      <div class="commandExample">
        albiondata-client.exe -i {{ eastNatsUrls.join(',') }}
      </div>
      <div class="shortcut">
        {{ $t('shortcut') }}
      </div>
      <div>⚠️ {{ $t('warning') }}</div>
    </div>
  </section>
</template>
  
<i18n>
  {
    "en": {
      "availableServers": "Available servers",
      "westCommand": "West server command",
      "eastCommand": "East server command",
      "shortcut": "For convenience, commands can be written to a shortcut and run the client through it.",
      "warning": "WARNING! Custom servers can't tell a European server from an Asian one. When switching the server in the game, also change the server to send in the client. Otherwise, the data will be stored on the wrong server.",
      "connectInfo": "To send data using a client to a specific server, you need to start the client with the -i flag, passing all the necessary servers."
    },
    "ru": {
      "availableServers": "Доступные сервера",
      "westCommand": "Команда для восточного сервера",
      "eastCommand": "Комадна для западного сервера",
      "shortcut": "Для удобства команды можно записать в ярлык и запускать клиент через него.",
      "warning": "ПРЕДУПРЕЖДЕНИЕ! Кастомные серверы не могут отличить игровой европейский сервер от азиатского. При переключении сервера в игре также меняйте сервер для отправки в клиенте. В противном случае данные будут храниться не на том сервере.",
      "connectInfo": "Чтобы отправлять данные при помощи клиента на конкретный сервер, нужно запустить клиент с флагом -i, передав все нужные серверы."
    }
  }
  </i18n>
  
<script>
import Header from "~/components/Header";
import { mapState } from 'vuex';

export default {
  name: "Servers",
  components: {
    Header,
  },
  computed: {
    ...mapState({
      servers: state => state.features.servers,
      currentServerId: state => state.features.currentServerId,
    }),

    eastNatsUrls() {
      return this.servers.filter(({ id }) => id.includes('east')).map(({ natsUrl }) => natsUrl);
    },

    westNatsUrls() {
      return this.servers.filter(({ id }) => id.includes('west')).map(({ natsUrl }) => natsUrl);
    }
  },
};
</script>
  
<style scoped lang='scss'>
.servers-title {
  text-align: center;
  font-size: 1.2em;
  margin-bottom: var(--space-s);
}

.servers {
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}

.server {
  border: 1px solid var(--color-primary-analog);
  padding: var(--space-s);
  margin: 0 var(--space-xs);
  border-radius: var(--radius-m);

  &-subtitle {
    font-size: 0.8em;
    color: var(--color-contrast-analog);
  }

  &-title {
    font-size: 1.2em;
    margin-bottom: var(--space-xs);
  }

  &-url {
    margin-bottom: var(--space-xs);
  }
}

.healthcheck {
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    left: var(--space-xs);
    width: 0.5em;
    height: 0.5em;
    background: var(--success-analog);
    animation: blink infinite ease-in-out 4s;
  }
}

.connectInfo {
  margin: var(--space-s);
}

.commandExample {
  font-family: Monaco;
  margin-bottom: var(--space-xs);
}

.shortcut {
  margin-bottom: var(--space-s);
}

@keyframes blink {
  from {
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>