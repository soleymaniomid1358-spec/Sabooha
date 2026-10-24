// برای انتشار نسخه جدید، عدد CACHE را یکی بالا ببرید
const CACHE='konkur-sabooha-v5';
const FILES=['./','./index.html','./app.js','./app.js?v=5','./xlsx.mini.min.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./fonts/Vazirmatn-Regular.woff2','./fonts/Vazirmatn-Medium.woff2','./fonts/Vazirmatn-Bold.woff2','./fonts/Vazirmatn-Black.woff2'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  // صفحه و اسکریپت: اول شبکه (برای دریافت به‌روزرسانی)، در حالت آفلاین از کش
  if(r.mode==='navigate'||/\.(js|webmanifest)(\?|$)/.test(r.url)){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c));return res}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));return}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c));return res})))});
