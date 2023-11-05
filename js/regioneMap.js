import {getRegionJson} from "./betriebe.js";

const svgMaps = document.querySelectorAll('.svgMap');
const regions = ['Tessin', 'Romandie', 'OS', 'NWS'];
export const getRegionName = reg => ({
    'OS': 'Zürich & Ostschweiz',
    'NWS': 'Nordwestschweiz'
})[reg] || reg;

const parentScrollElement = document.querySelector('[data-page-id="1"] .bottomRight');
const regionTitle = document.querySelector('.selectedRegion');
regions.forEach(reg =>
    document.querySelector(`#svgMap${reg}`).addEventListener('click', () => {
        svgMaps.forEach(map => map.classList.remove('activeRegion'))
        document.querySelector(`.map${reg}`).classList.add('activeRegion')
        regionTitle.textContent = getRegionName(reg);
        renderTable(reg);
        renderLocationDropdownOptions(reg);
        setTimeout(() =>
        parentScrollElement.scrollTo({top: 550, behavior: 'smooth'})
        );
    }
))

const sortByFirma = (a, b) => {
    if (a.Firma > b.Firma) {
        return -1;
    }
    if (b.Firma > a.Firma) {
        return 1;
    }
    return 0;
}

const tableRow = document.querySelector('tbody.row');
const renderTable = (region, locationFilter) => {
    let jsonArray = getRegionJson(region).sort(sortByFirma);
    if (locationFilter) {
        jsonArray = jsonArray.filter(o => o.Ort === locationFilter);
    }
    tableRow.innerHTML = "";
    jsonArray.forEach(({Firma, Ort, Internet, Yousty}) => {
        const rowElement = document.createElement('tr');
        if (Yousty || Internet) {
            rowElement.addEventListener('click', () =>
                window.open(Yousty || Internet, "_blank"));
        }
        rowElement.innerHTML = `<td>${Firma}</td><td>${Ort}</td>`
        tableRow.prepend(rowElement)
    })
}

const generateOption = (reg, location) => {
    const option = document.createElement('div');
    option.textContent = location;
    option.addEventListener('click', () => renderTable(reg, location));
    return option;
}

const locationDropdown = document.querySelector('.location_dropdown');
const locationOptions = locationDropdown.querySelector('.location_options');
locationDropdown.addEventListener('click', () => locationDropdown.classList.toggle('active'));
const renderLocationDropdownOptions = reg => {
    const jsonArray = getRegionJson(reg);
    const locations = [...new Set(jsonArray.map(b => b.Ort))].sort();
    locationOptions.innerHTML = "";

    const allOption = document.createElement('div');
    allOption.textContent = '→ Alle Anzeigen';
    allOption.addEventListener('click', () => renderTable(reg));
    locationOptions.append(allOption);

    locations.forEach(location => {
        const option = document.createElement('div');
        option.textContent = location;
        option.addEventListener('click', () => renderTable(reg, location));
        locationOptions.append(option);
    })

}
