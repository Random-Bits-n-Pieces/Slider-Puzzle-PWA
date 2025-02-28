const CACHE_NAME = `slider-puzzle-pwa`
const CACHE_CONTENT = [
  '/',
  '/imgs/Tiles0.jpg',
  '/imgs/Tiles1.jpg',
  '/imgs/Tiles2.jpg',
  '/imgs/Tiles3.jpg',
  '/imgs/Tiles4.jpg',
  '/imgs/Tiles5.jpg',
  '/imgs/Tiles6.jpg',
  '/main.js',
  '/styles.css'
];

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll(CACHE_CONTENT);
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Get the resource from the cache.
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
        try {
          // If the resource was not in the cache, try the network.
          const fetchResponse = await fetch(event.request);

          // Save the resource in the cache and return it.
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        } catch (e) {
          // The network failed.
        }
    }
  })());
});