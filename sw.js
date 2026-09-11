/* Cache only the TablePing shell; restaurant data is fetched from Supabase and is never cached here. */
const CACHE='tableping-shell-v2.7.0';
const ASSETS=['./','./index.html','./welcome-art.png','./tableping-brand-v21.png','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tableping-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(c=>c.put('./index.html',copy)))}return response}).catch(()=>caches.match('./index.html')));return;
 }
 const known=ASSETS.map(path=>new URL(path,self.registration.scope).href);
 if(known.includes(event.request.url))event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});
