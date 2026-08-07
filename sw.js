const CACHE_NAME = "frequentsuspicion-shell-v15-verified-navigation";
const APP_SHELL = [
  "./",
  "./index.html",
  "./album.html",
  "./about.html",
  "./styles.css?v=20260807-4",
  "./analytics.js?v=1",
  "./app.js?v=20260807-3",
  "./care.js?v=20260802-1",
  "./data/biblical-counseling.js",
  "./data/apologetics.js",
  "./pwa.js?v=2",
  "./accessibility.js?v=2",
  "./manifest.webmanifest",
  "./assets/og-four-album-journey.png",
  "./assets/artwork/the-war-came-home-site-textless.png",
  "./assets/artwork/the-reckoning-site-textless.png",
  "./assets/artwork/the-restoration-site-textless.png",
  "./assets/artwork/carry-it-forward-site-textless.png",
  "./assets/greg-granger.png?v=566ef75",
  "./assets/icons/pwa-192.png",
  "./assets/icons/pwa-512.png",
  "./assets/icons/pwa-maskable-512.png",
  "./assets/icons/apple-touch-icon.png",
  "./assets/icons/favicon-32.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return response;
      }).catch(() => caches.match(request).then(cached => cached || caches.match("./index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    }))
  );
});
