const svgMaps = document.querySelectorAll('.svgMap');
const regions = ['Tessin', 'Romandie', 'OS', 'NWS'];

// Mapping für Regionen-Namen
const getRegionName = reg => ({
  'OS': 'Zürich & Ostschweiz',
  'NWS': 'Nordwestschweiz'
})[reg] || reg;

const parentScrollElement = document.querySelector('[data-page-id="1"] .bottomRight');
const regionTitle = document.querySelector('.selectedRegion');
const rowContainer = document.querySelector('.row');
const locationDropdown = document.querySelector('.location_dropdown');
const locationOptions = locationDropdown.querySelector('.location_options');

// Tabelle rendern
const renderTable = (regionKey, locationFilter) => {
  let jsonArray = regionData[regionKey] || [];
  if (locationFilter) {
    jsonArray = jsonArray.filter(o => o.ort === locationFilter);
  }

  rowContainer.innerHTML = "";
  jsonArray.forEach(({id, firma, ort, email, yousty, form_active}) => {
    const rowElement = document.createElement('tr');
    if (form_active) {
      rowElement.addEventListener('click', () => {
        window.location.href = `/single.php?p=${id}`
      })
    } else if (yousty) {
      rowElement.addEventListener('click', () =>
        window.open(yousty, "_blank"));
    } else if (email) {
      rowElement.addEventListener('click', () => {
        window.open('mailto:' + email, "_blank");
      });
    }
    rowElement.innerHTML = `<td>${firma}</td><td>${ort}</td>`;
    rowContainer.prepend(rowElement);
  });
};

// Dropdown-Optionen rendern
const renderLocationDropdownOptions = regionKey => {
  const jsonArray = regionData[regionKey] || [];
  const locations = [...new Set(jsonArray.map(b => b.ort))].sort();
  locationOptions.innerHTML = "";

  const allOption = document.createElement('div');
  allOption.textContent = '→ Alle anzeigen';
  allOption.addEventListener('click', () => renderTable(regionKey));
  locationOptions.append(allOption);

  locations.forEach(location => {
    const option = document.createElement('div');
    option.textContent = location;
    option.addEventListener('click', () => renderTable(regionKey, location));
    locationOptions.append(option);
  });
};

// Event-Handler für Regionen
regions.forEach(reg => {
  document.querySelector(`.map${reg}`)
    .addEventListener('click', () => {
      const hiddenTable = document.querySelector('table.hidden');
      if (hiddenTable) hiddenTable.classList.remove('hidden');

      svgMaps.forEach(map => map.classList.remove('activeRegion'));
      document.querySelector(`.map${reg}`).classList.add('activeRegion');

      regionTitle.textContent = getRegionName(reg);

      const regionKey = reg.toLowerCase();
      const regionKeyFixed = regionKey === 'nws' ? 'nsw' : regionKey === 'os' ? 'ostschweiz' : regionKey;
      renderTable(regionKeyFixed);
      renderLocationDropdownOptions(regionKeyFixed);

      setTimeout(() => {
        parentScrollElement.scrollTo({top: 550, behavior: 'smooth'});
      });
    });
});

// Dropdown-Interaktion
locationDropdown.addEventListener('click', () => locationDropdown.classList.toggle('active'));
