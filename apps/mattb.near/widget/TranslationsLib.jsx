const TranslationsLib = {
  translations: {},
  availableLanguages: null,
  currentLanguage: null,
  translationsLoaded: false,
  load: (url, language) => {
    TranslationsLib.url = url;
    TranslationsLib.currentLanguage = language;
    TranslationsLib.tryLoadByUrl(url, language);
    TranslationsLib.tryLoadByRequire(url, language);
  },
  setTranslations: (translations, language) => {
    if (!!translations[language]) {
      TranslationsLib.availableLanguages = Object.keys(translations);
      TranslationsLib.translations = translations[language];
      TranslationsLib.translationsLoaded = true;
      TranslationsLib.refresh();
    } else {
      TranslationsLib.throw(
        "Provided translations file is empty or is not an object"
      );
    }
  },
  tryLoadByUrl: (url, language) => {
    if (url.indexOf("https://")) {
      let data = fetch(url);
      TranslationsLib.setTranslations(data.body, language);
    }
  },
  tryLoadByRequire: (path, language) => {
    try {
      TranslationsLib.setTranslations(VM.require(path), language);
    } catch (error) {
      console.log(error);
    }
  },
  throw: (message) => {
    console.log(message);
  },
  refresh: () => {
    if (!!onRefresh && typeof onRefresh === "function") {
      onRefresh(TranslationsLib);
    }
  },
  get: (id, defaultText) => {
    let translation = id.indexOf(".")
      ? TranslationsLib.getTranslationByBreadcrumb(id)
      : TranslationsLib.getTranslation(id);

    return translation || defaultText;
  },
  getTranslationByBreadcrumb: (breadcrumb) => {
    return breadcrumb
            .split('.')
            .reduce(
                (path, nextPath) => (path || {})[nextPath],
                TranslationsLib.translations
            );
  },
  getTranslation: (id) => id in TranslationsLib.translations &&
    typeof TranslationsLib.translations[id] === "string"
      ? TranslationsLib.translations[id]
      : "",
  switchLanguage: (language) =>
    TranslationsLib.load(TranslationsLib.url, language),
  getAvailableLanguages: () => TranslationsLib.availableLanguages,
};

return TranslationsLib;