const CACHE_NAME = 'katifinance-v1';
const urlsToCache = [
  './keuangan.html',
  './logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // Gunakan Network First fallback ke Cache
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request).then(response => response || caches.match('./keuangan.html')))
  );
});
