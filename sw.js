const CACHE_NAME = "frequentsuspicion-shell-v24-force-complete-catalog";

const APP_SHELL = [
  "./",
  "./index.html",
  "./album.html",
  "./about.html",
  "./styles.css?v=20260808-4",
  "./analytics.js?v=1",
  "./app.js?v=20260808-3",
  "./pillars.js?v=2",
  "./care.js?v=20260802-1",
  "./data/biblical-counseling.js",
  "./data/apologetics.js",
  "./pwa.js?v=6",
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
  "./assets/icons/favicon-32.png",
  "./lyrics/a-million-times-over.txt",
  "./lyrics/a-prayer-to-the-god-of-my-life.txt",
  "./lyrics/biblical-love.txt",
  "./lyrics/birthright.txt",
  "./lyrics/borrowed-throne.txt",
  "./lyrics/break-me.txt",
  "./lyrics/broken-me.txt",
  "./lyrics/by-his-grace.txt",
  "./lyrics/carry-it-forward.txt",
  "./lyrics/confront-me-god.txt",
  "./lyrics/covenant.txt",
  "./lyrics/death-day.txt",
  "./lyrics/dont-give-me-away-again.txt",
  "./lyrics/every-day-was-sin.txt",
  "./lyrics/its-over.txt",
  "./lyrics/mend-the-broken-portrait.txt",
  "./lyrics/my-dumpster-fire.txt",
  "./lyrics/september-in-july.txt",
  "./lyrics/shattered-lens.txt",
  "./lyrics/shepherds-of-silence.txt",
  "./lyrics/sleep-dont-come-easy.txt",
  "./lyrics/stop-casting-stones.txt",
  "./lyrics/teach-me-to-live.txt",
  "./lyrics/the-battle-for-your-soul.txt",
  "./lyrics/the-darkest-valley.txt",
  "./lyrics/the-little-lukewarm-church.txt",
  "./lyrics/the-man-behind-the-startle.txt",
  "./lyrics/the-many-wolves-in-masks.txt",
  "./lyrics/the-war-came-home.txt",
  "./lyrics/the-watchtower.txt",
  "./lyrics/what-is-next.txt",
  "./lyrics/when-i-close-my-eyes.txt",
  "./lyrics/when-the-night-goes-quiet.txt",
  "./lyrics/whispers-in-the-ear.txt",
  "./lyrics/wounded-but-still-going.txt",
  "./lyrics/your-sunday-best.txt",
  "./lyrics/your-words-are-echoes.txt"
];

async function fetchAndCache(request, bypassHttpCache = false) {
  const networkRequest = bypassHttpCache ? new Request(request, { cache: "reload" }) : request;
  const response = await fetch(networkRequest);
  if (response.ok) {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request, fallback = "") {
  try {
    return await fetchAndCache(request, true);
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (fallback) {
      const fallbackResponse = await caches.match(fallback);
      if (fallbackResponse) return fallbackResponse;
    }
    return Response.error();
  }
}

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: "window", includeUncontrolled: true }))
      .then(clients => Promise.all(clients.map(client => client.navigate(client.url))))
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, "./index.html"));
    return;
  }

  const mustStayFresh =
    request.destination === "script" ||
    request.destination === "style" ||
    url.pathname.includes("/lyrics/") ||
    url.pathname.endsWith("/manifest.webmanifest");

  if (mustStayFresh) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetchAndCache(request))
  );
});
