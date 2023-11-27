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

export const trackPageView = pageTitle =>
    trackPush({
        event: 'sls-page-view',
        category: 'view',
        page_location: '/',
        page_title: pageTitle
    })

export const trackButtonClick = (label, pageTitle) => {
    trackPush({
        event: 'sls-button-clicked',
        category: 'buttons',
        action: 'clicked',
        label: label,
        page_location: '/',
        page_title: pageTitle
    });
}
