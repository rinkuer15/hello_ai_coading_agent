// Service worker for Hello AI Coding Agent
// BROWSER-API TEST GAP (OQ-6)
// This file runs in a browser service worker context.
// The caches API, self object, and push/fetch events are browser-only APIs
// and are intentionally untestable via node --test.
// Browser-side test strategy is deferred to OQ-6.

var CACHE_NAME = 'hello-ai-v1';

self.addEventListener('install', function() {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(fetch(event.request));
});
