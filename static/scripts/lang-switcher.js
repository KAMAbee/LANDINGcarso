const langBtns = document.querySelectorAll(".lang-btn");
let currentLang = localStorage.getItem("lang") || "ru";

window.translations = {};

const loadTranslations = async (lang) => {
  try {
    const response = await fetch(`static/languages/${lang}.json`);
    if (!response.ok) throw new Error(`Не удалось загрузить ${lang}.json`);
    const translations = await response.json();
    
    window.translations[lang] = translations;
    
    return translations;
  } catch (error) {
    console.error("Ошибка загрузки перевода:", error);
    return {};
  }
};

window.getTranslation = (key, lang = null) => {
  const targetLang = lang || currentLang;
  const translations = window.translations[targetLang];
  
  if (!translations) return key;
  
  const keys = key.split('.');
  let result = translations;
  
  for (const k of keys) {
    if (result && result[k]) {
      result = result[k];
    } else {
      return key;
    }
  }
  return result || key;
};

const applyTranslations = (translations) => {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const keys = el.dataset.i18n.split(".");
    let text = translations;
    for (let key of keys) {
      if (Array.isArray(text) && !isNaN(key)) {
        text = text[Number(key)];
      } else if (text && key in text) {
        text = text[key];
      } else {
        text = null;
        break;
      }
    }
    if (typeof text === "string") {
      el.innerHTML = text;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const keys = el.dataset.i18nPlaceholder.split(".");
    let text = translations;
    for (let key of keys) {
      if (text && key in text) {
        text = text[key];
      } else {
        text = null;
        break;
      }
    }
    if (typeof text === "string") {
      el.setAttribute("placeholder", text);
    }
  });

  document.querySelectorAll("[data-i18n-href]").forEach((el) => {
    const key = el.dataset.i18nHref;
    const translatedHref = translations[key];
    if (typeof translatedHref === "string") {
      el.setAttribute("href", translatedHref);
    }
  });
};

const setLanguage = async (lang) => {
  localStorage.setItem("lang", lang);
  currentLang = lang;
  
  const langContainer = document.querySelector(".header__top-lang");
  if (lang === "kz") {
    langContainer.classList.add("kz-active");
  } else {
    langContainer.classList.remove("kz-active");
  }

  langBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });

  const translations = await loadTranslations(lang);
  applyTranslations(translations);
};

const initTranslations = async () => {
  await Promise.all([
    loadTranslations("ru"),
    loadTranslations("kz")
  ]);
  
  setLanguage(currentLang);
};

langBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedLang = btn.getAttribute("data-lang");
    if (selectedLang !== currentLang) {
      setLanguage(selectedLang);
    }
  });
});

initTranslations();