import i18n from 'i18next';

import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: process.env.NODE_ENV !== 'development',

        fallbackLng: 'en',
        load: 'languageOnly',

        interpolation: {
            escapeValue: false,
        },

        react: {
            useSuspense: false,
        }
    });

export default i18n;