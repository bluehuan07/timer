// Service Worker：把 App 的檔案快取起來，讓它離線也能開
// 之後若改了任何檔案，把版本號 v1 改成 v2…，使用者重開就會更新
const CACHE = "timer-v10";

// 要預先快取的檔案清單（路徑用相對的，GitHub Pages 放在子目錄也不會壞）
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png"
];

// 安裝時：把上面的檔案抓下來放進快取
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())  // 立即接手，不用等舊版關閉
  );
});

// 啟用時：清掉舊版本的快取
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// 頁面問版本時，回報目前正在用的快取版號。
// 這樣畫面顯示的版本＝實際生效的 SW 版本，使用者一眼就知道更新到位了沒。
self.addEventListener("message", (event) => {
  if (event.data === "version") {
    event.source.postMessage({ type: "version", version: CACHE });
  }
});

// 攔截請求：先找快取，找不到再連網路，沒網路就退回首頁
// （Google 字型等跨網域請求交給瀏覽器自己處理，這裡不攔）
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).catch(() => caches.match("./index.html"));
    })
  );
});
