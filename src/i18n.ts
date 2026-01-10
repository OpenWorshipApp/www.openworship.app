 import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import kh from './locales/kh.json';
import fr from './locales/fr.json';
import zh from './locales/zh.json';

const resources = {
  en: { translation: en },
  kh: { translation: kh },
  fr: { translation: fr },
  zh: { translation: zh }
} as const;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: Object.keys(resources),
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
