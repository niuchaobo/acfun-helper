importScripts("./workbox-sw.js")

const CACHE_NAME = "acfun-helper-serviceCache"

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  workbox.routing.registerRoute(
    ({ url }) => url.origin === 'https://imgs.aixifan.com' ||
      url.origin === 'https://cdn.aixifan.com',
    new workbox.strategies.CacheFirst({
      cacheName: 'aixifan-imgs',
      plugins: [
        new workbox.expiration.ExpirationPlugin({ maxEntries: 20 }),
      ],
    }),
    new workbox.strategies.CacheFirst({
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200]
        })
      ]
    }),
  );

  self.addEventListener('install', function (event) {});

  self.addEventListener('activate', function (event) {
    event.waitUntil(
      caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

  self.addEventListener('fetch', function (event) {
    console.log(event)
    if (isCachedAssetRequest(event)) {
      event.respondWith(
        caches.open(CACHE_NAME).then(function (cache) {
          return cache.match(event.request).then(function (response) {
            if (response) {
              return response;
            } else {
              return fetch(event.request.clone()).then(function (response) {
                cache.put(event.request, response.clone());
                return response;
              });
            }
          });
        })
      );
    }
  });

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

function isCachedAssetRequest(event) {
  let isSameOriginRequest = event.request.url.startsWith(self.location.origin);
  let isFontRequest = FONT_ORIGINS.some((origin) => event.request.url.startsWith(origin));

  return !isNavigationRequest(event) && (isSameOriginRequest || isFontRequest);
}