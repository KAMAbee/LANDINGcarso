const langBtns = document.querySelectorAll(".lang-btn");
let currentLang = localStorage.getItem("lang") || "ru";

const loadTranslations = async (lang) => {
  try {
    const response = await fetch(`static/languages/${lang}.json`);
    if (!response.ok) throw new Error(`Не удалось загрузить ${lang}.json`);
    return await response.json();
  } catch (error) {
    console.error("Ошибка загрузки перевода:", error);
    return {};
  }
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

  langBtns.forEach((btn) => {
    const isActive = btn.getAttribute("data-lang") === lang;

    // Анимация переключения
    if (isActive && !btn.classList.contains("active")) {
      btn.classList.add("animating");
      setTimeout(() => {
        btn.classList.remove("animating");
      }, 300);
    }

    btn.classList.toggle("active", isActive);
  });

  const translations = await loadTranslations(lang);
  applyTranslations(translations);
};

langBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedLang = btn.getAttribute("data-lang");
    if (selectedLang !== currentLang) {
      setLanguage(selectedLang);
    }
  });
});

setLanguage(currentLang);
