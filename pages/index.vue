<template>
  <section class="main_page_container main_page">
    <div>
      <h1 class="main_page__title">
        Albion Profit Calculator
      </h1>
      <h2 class="main_page__subtitle" />
      <div class="main_page__links">
        <nuxt-link
          v-if="$auth.loggedIn"
          :to="localePath('/tree')"
          class="links__button--brown button"
        >
          🪴 {{ $t("tree") }}
        </nuxt-link>
        <nuxt-link
          v-if="$auth.loggedIn"
          :to="localePath('/transmutations')"
          class="links__button--brown button"
        >
          🧪 {{ $t("transmutations") }}
        </nuxt-link>
        <nuxt-link
          v-if="$auth.loggedIn"
          :to="localePath('/food-and-potions')"
          class="links__button--brown button"
        >
          🍲 {{ $t("foodAndPotions") }}
        </nuxt-link>
        <CustomTooltipLayout :hide-tooltip="isSupporter">
          <template #content>
            <nuxt-link
              v-if="$auth.loggedIn"
              :disabled="!isSupporter"
              :to="localePath('/refining')"
              :class="[
                {
                  'links__button--disabled': $auth.loggedIn && !isSupporter,
                },
                'links__button--brown button',
              ]"
            >
              ♻️ {{ $t("refining") }}
            </nuxt-link>
          </template>
          <template #tooltip>
            {{ $t('onlyForSupporters') }}
            <br>
            <span class="tooltip-text">
              {{ $t('supportServer') }}
              <Patreon />
              {{ $t('or') }}
              <KoFi />
            </span>
          </template>
        </CustomTooltipLayout>
        <CustomTooltipLayout :hide-tooltip="isSupporter">
          <template #content>
            <nuxt-link
              v-if="$auth.loggedIn"
              :disabled="!isSupporter"
              :to="localePath('/transportations')"
              :class="[
                {
                  'links__button--disabled': $auth.loggedIn && !isSupporter,
                },
                'links__button--brown button',
              ]"
            >
              🦣 {{ $t("transportations") }}
            </nuxt-link>
          </template>
          <template #tooltip>
            {{ $t('onlyForSupporters') }}
            <br>
            <span class="tooltip-text">
              {{ $t('supportServer') }}
              <Patreon />
              {{ $t('or') }}
              <KoFi />
            </span>
          </template>
        </CustomTooltipLayout>
        <span
          v-if="$auth.loggedIn"
          class="links__button--brown button"
          @click="logout"
        >{{ $t("logout") }}
        </span>
        <span
          v-if="!$auth.loggedIn"
          class="links__button--brown button"
          @click="showModalAuth"
        >{{ $t("login") }}
        </span>
        <span
          v-if="!$auth.loggedIn"
          class="links__button--brown button"
          @click="showModalRegister"
        >{{ $t("register") }}
        </span>
      </div>
    </div>
    <Auth
      v-if="isModalAuthShowed"
      @hide-modal-auth="hideModalAuth"
    />
    <Register
      v-if="isModalRegisterShowed"
      @hide-modal-register="hideModalRegister"
    />
    <footer>
      <a href="https://github.com/GeekaN2">&copy; GeekaN</a>
      <a
        href="https://www.albion-online-data.com/"
      >Powered by Albion Online Data Project</a>
      <span class="options">
        <span>
          <nuxt-link
            :class="{
              button__underline: $i18n.locale === 'ru',
            }"
            :to="switchLocalePath('ru')"
            class="button"
          >RU</nuxt-link>
          <nuxt-link
            :class="{
              button__underline: $i18n.locale === 'en',
            }"
            :to="switchLocalePath('en')"
            class="button"
          >EN</nuxt-link>
        </span>
        <ThemeToggle />
      </span>
    </footer>
  </section>
</template>

<i18n>
{
  "en": {
    "tree": "Profit tree",
    "transmutations": "Transmuting",
    "refining": "Refining",
    "transportations": "Transportations (beta)",
    "onlyForSupporters": "Only for supporters",
    "supportServer": "Support the server on",
    "or": "or", 
    "login": "Login",
    "register": "Register",
    "logout": "Logout",
    "foodAndPotions": "Food & potions"
  },
  "ru": {
    "tree": "Дерево профита",
    "transmutations": "Трансмутация",
    "refining": "Переработка",
    "transportations": "Перевозки (бета)",
    "onlyForSupporters": "Только для саппортеров",
    "supportServer": "Вы можете поддержать сервер на",
    "or": "или", 
    "login": "Войти",
    "register": "Зарегистрироваться",
    "logout": "Выйти",
    "foodAndPotions": "Еда и зелья"
  }
}
</i18n>

<script>
import Auth from "~/components/Auth";
import Register from "~/components/Register";
import ThemeToggle from "~/components/utils/ThemeToggle";
import CustomTooltipLayout from '~/components/utils/CustomTooltips/CustomTooltipLayout';
import Patreon from '~/components/icons/Patreon';
import KoFi from '~/components/icons/KoFi';

export default {
  name: "MainPage",
  components: {
    Auth,
    Register,
    ThemeToggle,
    CustomTooltipLayout,
    Patreon,
    KoFi,
  },
  data() {
    return {
      /**
       * Is modal form shown or not
       */
      isModalAuthShowed: false,

      /**
       * Is modal form shown or not
       */
      isModalRegisterShowed: false,
    };
  },
  computed: {
    isSupporter() {
      const supporter = ["supporter", "admin"];

      return supporter.includes(this.$auth?.user?.role);
    },
    onlyForSupporterTooltip() {
      return {
        content: this.$t('onlyForSupporters'),
        template: SupportMeTooltip,
        html: true,
      }
    } 
  },
  methods: {
    /**
     * Show modal auth form
     */
    showModalAuth() {
      this.isModalAuthShowed = true;
    },

    /**
     * Hide modal auth form
     */
    hideModalAuth() {
      this.isModalAuthShowed = false;
    },

    /**
     * Show modal register form
     */
    showModalRegister() {
      this.isModalRegisterShowed = true;
    },

    /**
     * Hide modal register form
     */
    hideModalRegister() {
      this.isModalRegisterShowed = false;
    },

    /**
     * Logout user
     */
    async logout() {
      await this.$auth.logout("local");
    },
  },
};
</script>

<style scoped lang="scss">
.main_page_container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  width: 100%;
}

.tooltip-wrapper {
  display: inline-block;
}

.main_page {
  font-size: 16px;

  &__title {
    display: block;
    font-weight: 300;
    font-size: 5em;
    color: var(--color-secondary);
    letter-spacing: 1px;
  }

  &__subtitle {
    font-weight: 300;
    font-size: 2.6em;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;

    &__button--purple,
    &__button--brown {
      display: inline-block;
      border-radius: 4px;
      border: 1px solid var(--color-secondary);
      color: var(--color-secondary);
      text-decoration: none;
      padding: 10px 30px;
      margin: 0 7px 5px 7px;
    }

    &__button--purple {
      border-color: var(--color-secondary);
      color: var(--color-secondary);
    }

    &__button--purple:hover {
      color: var(--color-primary);
      background-color:var(--color-selected) ;
    }

    &__button--brown:hover {
      color: var(--color-primary);
      background: var(--color-secondary);
    }

    &__button--disabled {
      background: repeating-linear-gradient(
        -45deg,
        #c4c4c4,
        #c4c4c4 5px,
        transparent 5px,
        transparent 15px
      );
      border-color: var(--color-disabled);
      color: var(--color-disabled);

      &:hover {
        background: repeating-linear-gradient(
          -45deg,
          #c4c4c4,
          #c4c4c4 5px,
          transparent 5px,
          transparent 15px
        );
        border-color: var(--color-disabled);
        color: var(--color-disabled);
      }
    }
  }
}

footer {
  position: absolute;
  z-index: 0;
  bottom: 0;
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-evenly;

  a {
    color: var(--color-secondary);
  }
}

.options {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.button {
  border: none;
  background: none;
  cursor: pointer;
  color: var(--color-selected);

  &__underline {
    text-decoration: underline;
  }
}

.tooltip-text {
  font-size: 0.9em;
}

.social {
  display: inline-block;
  margin-left: 5px;
  width: 15px;
  min-width: 13px;
}


@media (max-width: 991px) {
  .main_page {
    font-size: 14px;
  }
}

@media (max-width: 840px) {
  .main_page {
    font-size: 12px;
  }
}

@media (max-width: 479px) {
  .main_page {
    font-size: 11px;
  }
}
</style>
