/*
 * service-worker.js
 *
 * Cache name: 'hello-ai-v1'
 *   Manual version-bump protocol: when any file in CACHE_FILES changes, increment
 *   the version string (e.g., 'hello-ai-v2') so the activate handler deletes the
 *   old cache and clients receive fresh assets.
 *
 * Strategy: cache-first
 *   On fetch, the SW checks the cache first. If a cached response exists it is
 *   returned immediately without touching the network. This ensures the app shell
 *   loads even when the device is offline. Network is only contacted when no
 *   cached entry is found (e.g., first load before install completes, or for
 *   non-cached resources).
 */

var CACHE_NAME = 'hello-ai-v1';

/*
 * List every app shell asset served from public/.
 * Update this array (and bump CACHE_NAME) whenever public/ assets change.
 */
var CACHE_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(CACHE_FILES);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (name) {
          return name !== CACHE_NAME;
        }).map(function (name) {
          return caches.delete(name);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) {
        return cached;
      }
      return fetch(event.request);
    })
  );
});
