const svgMaps = document.querySelectorAll('.svgMap');
const regions = ['Tessin', 'Romandie', 'OS', 'NWS'];
regions.forEach(reg => document.querySelector(`#svgMap${reg}`).addEventListener('click', () => {
        svgMaps.forEach(map => map.classList.remove('activeRegion'))
        document.querySelector(`.map${reg}`).classList.add('activeRegion')
    }
))