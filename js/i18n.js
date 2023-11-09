const availableLocales = ['de', 'fr', 'it'];
const defaultLanguage = 'de'

const navigatorLanguage = (window.navigator.userLanguage || window.navigator.language).substring(0, 2);
let pageLanguage = defaultLanguage;
if (availableLocales.includes(navigatorLanguage)) {
    pageLanguage = navigatorLanguage;
}

const locales = {
    de: {
        "start": {
            "title": "Deutscher Titel",
            "subtitle": "Deutscher Subtitle",
        },
    },
    fr: {
        "start": {
            "title": "Französischer Titel",
            "subtitle": "Französischer Subtitle",
        },
    },
};

const elements = document.querySelectorAll('[data-i18n]');


const translate = () => {
    const json = locales[pageLanguage];
    elements.forEach((element, index) => {
        const key = element.getAttribute('data-i18n');
        element.innerHTML = key.split('.').reduce((obj, i) => (obj ? obj[i] : null), json);
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

const activeLangClass = 'activeLang';

const langElement = document.querySelectorAll('.header-languages span');
langElement.forEach(langEle => langEle.addEventListener('click', () => {
        langElement.forEach(l => l.classList.remove(activeLangClass))
        langEle.classList.add(activeLangClass);
        changeLanguage(langEle.dataset.lang);
    }
))

document.querySelector(`[data-lang="${pageLanguage}"]`).classList.add(activeLangClass);


// const initLangsByElements = [...elements].map(e => ({
//     key: e.dataset.i18n,
//     de: e.innerText.replace(/(\r\n|\n|\r)/gm," ").replace(/\s+/g, ' '),
//     fr: "",
//     it: ""
// }))
