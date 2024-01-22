const STATIC_CACHE_VERSION = "static-v1";

self.addEventListener('install', (event) => {
  console.log('Service Worker Installing... ' + STATIC_CACHE_VERSION)
  event.waitUntil(
        caches.open(STATIC_CACHE_VERSION).then((cache) => {
            return cache.addAll([
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
              '/img/logo.svg',
              '/js/betriebe.js',
              '/js/i18n.js',
              '/js/main.js',
              '/js/regioneMap.js',
              '/js/split-pages.js',
              '/js/trackingService.js',
              '/js/translation.js',
            ]);
        })
    );
});

self.addEventListener("activate", event => {
  // Delete any non-current cache
  event.waitUntil(
    caches.keys().then(keys => {
      Promise.all(
        keys.map(key => {
          if (![STATIC_CACHE_VERSION].includes(key)) {
            return caches.delete(key);
          }
        })
      )
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.open(STATIC_CACHE_VERSION).then(cache =>
      cache.match(event.request).then(response =>
          response || fetch(event.request)
          .catch(err => {

          })
      )
    )
  );
});

/*
self.addEventListener('activate', event => {
  console.log('Activation Service Worker...');
  return self.clients.claim();
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  )
})

 */
