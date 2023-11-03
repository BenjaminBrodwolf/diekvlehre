import {getRegionJson} from "./betriebe.js";

const svgMaps = document.querySelectorAll('.svgMap');
const regions = ['Tessin', 'Romandie', 'OS', 'NWS'];
export const getRegionName = reg => ({
    'OS': 'Zürich & Ostschweiz',
    'NWS': 'Nordwestschweiz'
})[reg] || reg;

const parentScrollElement = document.querySelector('[data-page-id="1"] .bottomRight');
const regionTitle = document.querySelector('.selectedRegion');
regions.forEach(reg => document.querySelector(`#svgMap${reg}`).addEventListener('click', () => {
        svgMaps.forEach(map => map.classList.remove('activeRegion'))
        document.querySelector(`.map${reg}`).classList.add('activeRegion')
        regionTitle.textContent = getRegionName(reg);
        renderTable(reg);
        parentScrollElement.scrollTo({top: 500, behavior: 'smooth'})
    }
))

const sortAlphabetic = (a, b) => {
    if (a.Firma > b.Firma) {
        return -1;
    }
    if (b.Firma > a.Firma) {
        return 1;
    }
    return 0;
}

const tableRow = document.querySelector('tbody.row');
const renderTable = reg => {
    console.log(reg)
    const jsonArray = getRegionJson(reg).sort(sortAlphabetic);
    tableRow.innerHTML = "";
    jsonArray.forEach(({Firma, Ort, Internet, Yousty}) => {
        const rowElement = document.createElement('tr');
        if (Yousty || Internet) {
            rowElement.addEventListener('click', () => window.open(Yousty || Internet, "_blank"));
        }
        rowElement.innerHTML = `<td>${Firma}</td><td>${Ort}</td>`
        tableRow.prepend(rowElement)
    })

}

