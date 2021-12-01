/* global self, caches, fetch */
/* eslint-disable no-restricted-globals */

const CACHE = 'cache-59898ae';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./biomanzelka_001.html","./biomanzelka_002.html","./biomanzelka_009.html","./biomanzelka_010.html","./biomanzelka_011.html","./biomanzelka_012.html","./biomanzelka_013.html","./biomanzelka_007.html","./biomanzelka_014.html","./biomanzelka_008.html","./biomanzelka_015.html","./biomanzelka_016.html","./biomanzelka_017.html","./biomanzelka_018.html","./biomanzelka_019.html","./biomanzelka_020.html","./biomanzelka_021.html","./biomanzelka_022.html","./biomanzelka_023.html","./biomanzelka_024.html","./biomanzelka_025.html","./biomanzelka_026.html","./biomanzelka_027.html","./biomanzelka_028.html","./colophon.html","./favicon.png","./index.html","./manifest.json","./resources.html","./resources/image001_fmt.jpeg","./resources/image002_fmt.jpeg","./resources/index.xml","./resources/obalka_biomanzelka_fmt.jpeg","./resources/upoutavka_eknihy_fmt.jpeg","./scripts/bundle.js","./style/style.min.css"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
