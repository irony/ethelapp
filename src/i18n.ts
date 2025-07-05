// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// your translation files (you can move these to JSON under public/locales if you like)
const resources = {
  en: {
    translation: {
      layout: {
        openDrawer: 'Open menu',
        viewAs: 'View as…',
        userMenu: 'User menu',
        settings: 'Settings',
        logout: 'Log out',
        close: 'Close menu',
        home: 'Home',
        chat: 'Chat',
      },
      login: {
        title: 'Hello World (Login Placeholder)',
      },
      dashboard: {
        title: 'Dashboard',
        welcome: 'Welcome to your dashboard!',
      },
    },
  },
  // TODO: add de/fr/it here
};

i18n
  .use(initReactI18next) // binds i18n to React
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;

