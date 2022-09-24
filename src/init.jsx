import React from 'react';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import translationRU from './assets/locales/ru.json';
import translationEN from './assets/locales/en.json';
import App from './components/App.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';

export default async () => {
  const i18nInstance = i18n.createInstance();
  await i18nInstance.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru: {
        translation: translationRU,
      },
      en: {
        translation: translationEN,
      },
    },
  });

  return (
    <I18nextProvider i18n={i18nInstance}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  );
};
