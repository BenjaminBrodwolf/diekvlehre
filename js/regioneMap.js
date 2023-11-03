import {getRegionJson} from "./betriebe.js";

const svgMaps = document.querySelectorAll('.svgMap');
const regions = ['Tessin', 'Romandie', 'OS', 'NWS'];
export const getRegionName = reg => ({
    'OS': 'Zürich & Ostschweiz',
    'NWS': 'Nordwestschweiz'
})[reg] || reg;

regions.forEach(reg => document.querySelector(`#svgMap${reg}`).addEventListener('click', () => {
        svgMaps.forEach(map => map.classList.remove('activeRegion'))
        document.querySelector(`.map${reg}`).classList.add('activeRegion')
        document.querySelector('.selectedRegion').textContent = getRegionName(reg);

        renderTable(reg);
    }
))

const tableRow = document.querySelector('table .row');
const renderTable = reg => {
    const jsonArray = getRegionJson(reg);
    tableRow.innerHTML = "";
    jsonArray.forEach(({Firma, Ort, Internet, Mail}) => {

        const rowElement = document.createElement('tr');

        if (Internet) {
            // rowElement.setAttribute('href', Internet);
            rowElement.addEventListener('click', () => window.open('http://' + Internet, "_blank"));
        }
        rowElement.innerHTML = `<td>${Firma}</td><td>${Ort}</td>`
        tableRow.insertAdjacentElement('afterbegin', rowElement)
    })

}

