import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import sl from "./locales/sl.json";
import hr from "./locales/hr.json";

export const WMS_LANG_STORAGE_KEY = "wms.i18n.lang";

const resources = {
  en: { translation: en },
  sl: { translation: sl },
  hr: { translation: hr },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "sl",
    supportedLngs: ["en", "sl", "hr"],
    load: "languageOnly",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage"],
      lookupLocalStorage: WMS_LANG_STORAGE_KEY,
      caches: ["localStorage"],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
