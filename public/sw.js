// Pathbuilder 2e Local - Service Worker (Offline PWA Cache)
const CACHE_NAME = "pb2e-cache-v2";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "./js/pf2e_engine.js",
  "./js/pf2e_data.js",
  "./js/pf2e_feats_mechanics.js",
  "./js/pf2e_pdf_form_filler.js",
  "./js/pf2e_ai_assistant.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn("SW install cache warning:", err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Ignora chamadas para APIs de terceiros ou supabase
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Nunca sirva um index.html antigo apontando para bundles que já foram
  // removidos em um deploy. Navegações usam rede primeiro e cache como fallback
  // para manter o modo offline funcional.
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).then((response) => {
        if (response.ok) {
          const responseToCache = response.clone();
          void caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", responseToCache));
        }
        return response;
      }).catch(async () => {
        const cached = await caches.match("./index.html");
        return cached || caches.match("./");
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(() => {
        if (event.request.destination === "document") {
          return caches.match("./index.html");
        }
      });
    })
  );
});
