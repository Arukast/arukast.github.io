const CACHE_NAME = 'portfolio-assets-cache-v1';

const PRECACHE_ASSETS = [
  '/',
  '/terminal.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Determine the type of resource
  const isAstroAsset = url.pathname.includes('/_astro/');
  const isStaticImage = url.pathname.match(/\.(webp|avif|png|jpg|jpeg|svg|ico)$/i) || url.pathname.includes('/Foto_Tb');
  const isFont = url.hostname.includes('fonts.gstatic.com') || 
                 url.hostname.includes('cdnjs.cloudflare.com') || 
                 url.hostname.includes('fonts.googleapis.com');

  if (isAstroAsset || isStaticImage || isFont) {
    // Cache First Strategy for static assets, scripts, stylesheets, and fonts
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
    );
  } else if (event.request.mode === 'navigate') {
    // Network First Strategy for pages (HTML) to always ensure fresh content, falling back to cache if offline
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  }
});
