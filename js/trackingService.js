export const Locations = {
    START: "start",
    SNIFF: "schnuppern",
    APPLICATION: "bewerbung",
    EDUCATION: "ausbildung",
    MOVIE: "film",
    CONTACT: "kontakt",
}

export const LocationsById = {
    0: Locations.START,
    1: Locations.SNIFF,
    2: Locations.APPLICATION,
    4: Locations.EDUCATION,
    5: Locations.MOVIE,
    6: Locations.CONTACT,
}

const trackPush = obj => window.dataLayer.push(obj);

export const trackPageView = pageTitle =>
    trackPush({
        event: 'sls-page-view',
        category: 'view',
        page_location: 'https://diekvlehre.ch/'+pageTitle,
        page_title: pageTitle
    })

export const trackButtonClick = (label, pageTitle) => {
    trackPush({
        event: 'sls-button-clicked',
        category: 'buttons',
        action: 'clicked',
        label: label,
        page_location: 'https://diekvlehre.ch/'+pageTitle,
        page_title: pageTitle
    });
}
