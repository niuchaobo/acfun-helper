importScripts("./workbox-sw.js")

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://imgs.aixifan.com' ||
               url.origin === 'https://cdn.aixifan.com',
    new workbox.strategies.CacheFirst({
    // new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'aixifan-imgs',
      plugins: [
        new workbox.expiration.ExpirationPlugin({maxEntries: 20}),
      ],
    }),
  );

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}