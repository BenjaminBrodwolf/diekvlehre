import {i18n,title, pages} from "./i18n.js";

const setLang = selectedLanguage => {
    document.documentElement.setAttribute("lang", selectedLanguage);
    window.history.pushState(pages[selectedLanguage], title[selectedLanguage], '?lang=' + selectedLanguage);
    document.title = title[selectedLanguage];
    // window.location.href = pages[selectedLanguage];
}

const availableLocales = ['de', 'fr', 'it'];
const defaultLanguage = 'de'

const navigatorLanguage = (window.navigator.userLanguage || window.navigator.language).substring(0, 2);
export let pageLanguage = defaultLanguage;


const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
if (params?.lang && availableLocales.includes(params.lang)){
    pageLanguage = params.lang;
    setLang(pageLanguage)
} else if (availableLocales.includes(navigatorLanguage)) {
    pageLanguage = navigatorLanguage;
    setLang(pageLanguage)
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
            setLang(pageLanguage);
        }
    ))

// const initLangsByElements = [...elements].map(e => ({
//     key: e.dataset.i18n,
//     de: e.innerText.replace(/(\r\n|\n|\r)/gm," ").replace(/\s+/g, ' '),
//     fr: "",
//     it: ""
// }))

