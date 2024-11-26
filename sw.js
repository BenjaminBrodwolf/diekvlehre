const STATIC_CACHE_VERSION = "static-v16.0";
const STATIC_CACHE_FILES = [
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
];

self.addEventListener('install', (event) => {
  console.log('Service Worker Installing... ' + STATIC_CACHE_VERSION);
  self.skipWaiting();

  event.waitUntil(
    caches.open(STATIC_CACHE_VERSION).then((cache) =>
      cache.addAll(STATIC_CACHE_FILES)
    )
  );
});

self.addEventListener("activate", (event) => {
  console.log('Service Worker Activating... ' + STATIC_CACHE_VERSION);
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE_VERSION) {
            console.log('Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      )
    ).then(() => {
      console.log('Claiming clients for version:', STATIC_CACHE_VERSION);
      return self.clients.claim();
    }).then(() => {
      self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ action: 'reload' });
        });
      });
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const requestURL = new URL(event.request.url);

  // Ignorieren Sie Range Requests
  if (event.request.headers.has('range')) {
    console.log('Range Request detected, fetching from network:', event.request.url);
    return;
  }

  // Nur Anfragen vom selben Ursprung verarbeiten
  if (requestURL.origin !== location.origin) {
    return;
  }

  if (STATIC_CACHE_FILES.includes(requestURL.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          console.log('Serving from cache:', event.request.url);
          return cachedResponse;
        }

        console.log('Fetching from network:', event.request.url);
        return fetch(event.request).then((networkResponse) => {
          // Prüfen Sie, ob die Antwort gültig ist
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseClone = networkResponse.clone();
            caches.open(STATIC_CACHE_VERSION).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        }).catch((error) => {
          console.error('Fetch failed:', error);
          throw error;
        });
      })
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});
