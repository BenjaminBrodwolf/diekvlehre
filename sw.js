const STATIC_CACHE_VERSION = "static-v13.3";

self.addEventListener('install', (event) => {
  console.log('Service Worker Installing... ' + STATIC_CACHE_VERSION);
  self.skipWaiting(); // Ermöglicht dem Service Worker, sofort zu aktivieren

  event.waitUntil(
    caches.open(STATIC_CACHE_VERSION).then((cache) =>
      cache.addAll([
        '/',
        '/?lang=de',
        '/?lang=fr',
        '/?lang=it',
        '/index.html',
        '/datenschutz.html',
        '/impressum.html',
        '/css/header.css',
        '/css/main.css',
        '/css/normalize.css',
        '/css/style.css',
        '/img/start_animated_points.webm',
        '/img/ausbildung.webp',
        '/img/bewerbung.webp',
        '/img/kontakt.webp',
        '/img/movie.webp',
        '/img/start.webp',
        '/img/schnuppern.webp',
        '/img/logo.svg',
        '/js/betriebe.js',
        '/js/i18n.js',
        '/js/main.js',
        '/js/regioneMap.js',
        '/js/split-pages.js',
        '/js/trackingService.js',
        '/js/translation.js',
      ])
    )
  );
});

self.addEventListener("activate", event => {
  // Delete any non-current cache
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (![STATIC_CACHE_VERSION].includes(key)) {
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim()) // Aktiviert den Service Worker sofort für alle Clients
  );
});

self.addEventListener("fetch", event => {
  // Check if the request is a GET request
  if (event.request.method !== 'GET') {
    // If not a GET request, fetch from the network without caching
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      // Serve from cache if available, else fetch from network
      return response || fetch(event.request).then(fetchResponse => {
        return caches.open(STATIC_CACHE_VERSION).then(cache => {
          // Cache the fetched response
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    }).catch(() => {
      // Optional: Handle errors or return a fallback resource
    })
  );
});

