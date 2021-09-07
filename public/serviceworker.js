importScripts('http://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js')

workbox.setConfig({
    debug: false
});

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
        cacheName: 'images'
    })
);

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'script' || request.destination === 'style' || request.destination === 'document' || request.destination === 'manifest',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'static-resources',
    })
);