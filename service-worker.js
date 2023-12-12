const CACHE = "cacheV1";
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            return cache.addAll([
                '/index.html',
                '/datenschutz.html',
                '/impressum.html',
                '/css/',
                '/css/header.css',
                '/css/main.css',
                '/css/normalize.css',
                '/css/styles.css',
                '/img/',
                '/img/start_animated_points.webm',
                '/img/ausbildung.webp',
                '/img/bewerbung.webp',
                '/img/favicon.png',
                '/img/kontakt.webp',
                '/img/movie.webp',
                '/img/start.webp',
                '/img/logo.svg',
                '/js/',
                '/js/betriebe.js',
                '/js/i18n.js',
                '/js/main.js',
                '/js/regioneMap.js',
                '/js/split-pages.js',
                '/js/split-pages.js',
                '/js/trackingService.js',
                '/js/translation.js',
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});