const CACHE_NAME = 'health-v1';
const ASSETS = [
  './',
  './index.html',
  'https://cdn-icons-png.flaticon.com/512/3048/3048122.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});