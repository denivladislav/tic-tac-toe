import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationRU from '../src/assets/locales/ru.json';

i18n
  .use(initReactI18next)
  .init({
    lng: 'ru',
    debug: false,
    resources: {
      ru: {
        translation: translationRU,
      },
    },
  });

export default i18n;
