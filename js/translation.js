import {i18n} from "./i18n.js";

const availableLocales = ['de', 'fr', 'it'];
const defaultLanguage = 'de'

const navigatorLanguage = (window.navigator.userLanguage || window.navigator.language).substring(0, 2);
export let pageLanguage = defaultLanguage;
if (availableLocales.includes(navigatorLanguage)) {
    pageLanguage = navigatorLanguage;
}

export const getTranslation = (key) => i18n[key][pageLanguage];

const elementsToTranslate = document.querySelectorAll('[data-i18n]');

const translate = () => {
    // const json = locales[pageLanguage];
    elementsToTranslate.forEach((element, index) => {
        const key = element.getAttribute('data-i18n');
        if (key === "application.right.ort") {
            element.placeholder = getTranslation(key);
        } else {
            element.textContent = getTranslation(key);
        }
    });
}
const changeLanguage = language => {
    if (language === pageLanguage) return;
    pageLanguage = language;
    translate()
}

if (pageLanguage !== defaultLanguage) {
    translate()
}


const langElements = document.querySelectorAll('.header-languages span');
langElements.forEach(langElement =>
    langElement.addEventListener('click', () => {
            const selectedLanguage = langElement.dataset.lang
            changeLanguage(selectedLanguage);
            document.documentElement.setAttribute("lang", selectedLanguage);
        }
    ))

// const initLangsByElements = [...elements].map(e => ({
//     key: e.dataset.i18n,
//     de: e.innerText.replace(/(\r\n|\n|\r)/gm," ").replace(/\s+/g, ' '),
//     fr: "",
//     it: ""
// }))

