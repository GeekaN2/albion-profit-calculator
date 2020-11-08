import automaticEn from './en.json';
import automaticRu from './ru.json';
import staticRu from './static/ru.json';
import staticEn from './static/en.json';

const en = Object.assign(automaticEn, staticEn);
const ru = Object.assign(automaticRu, staticRu);

export default {
  locale: 'en',
  fallbackLocale: 'en',
  silentFallbackWarn: true,
  messages: { en, ru }
}