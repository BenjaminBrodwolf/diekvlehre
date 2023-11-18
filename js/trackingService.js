export const Locations = {
    START: "start",
    APPLICATION: "bewerbung",
    EDUCATION: "ausbildung",
    MOVIE: "film",
    CONTACT: "kontakt",
}

export const LocationsById = {
    0: Locations.START,
    1: Locations.APPLICATION,
    2: Locations.EDUCATION,
    3: Locations.MOVIE,
    4: Locations.CONTACT,
}

const trackPush = obj => window.dataLayer.push(obj);

export const trackPageView = location =>
    trackPush({
        'event': 'sls-page-view',
        'category': 'view',
        'location': location,
    })

export const trackButtonClick = (label, location) => {
    trackPush({
        'event': 'sls-button-clicked',
        'category': 'buttons',
        'action': 'clicked',
        'label': label,
        'location': location,
    });
}
