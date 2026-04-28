const CACHE_NAME = 'health-v1';
const ASSETS = [
  './',
  './index.html',
  'https://cdn-icons-png.flaticon.com/512/3048/3048122.png'
];

// ====== 安裝快取 ======
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// ====== 攔截請求 ======
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

// ====== 🔔 顯示通知（之後也可接 FCM）======
self.addEventListener('push', function(event) {
  let data = {};

  if (event.data) {
    data = event.data.json();
  }

  event.waitUntil(
    self.registration.showNotification(data.title || "📢 通知", {
      body: data.body || "有新訊息",
      icon: "https://cdn-icons-png.flaticon.com/512/1975/1975643.png"
    })
  );
});

// ====== 🔔 點擊通知 ======
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  event.waitUntil(
    clients.openWindow('./')
  );
});
