const staticCacheName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v1";

const assets = [
	"/",
	"/index.html",
	"/js/app.js",
	"/js/ui.js",
	"/js/materialize.min.js",
	"/css/styles.css",
	"/css/materialize.min.css",
	"/img/dish.png",
	"/manifest.json",
	"https://fonts.googleapis.com/icon?family=Material+Icons",
	"https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
	"/img/icons/favicon.png",
	"/img/icons/icon-72x72.png",
	"/img/icons/icon-96x96.png",
	"/img/icons/icon-144x144.png",
	"/img/icons/icon-192x192.png",
	"/img/icons/icon-512x512.png",
];

const limitCacheSize = (cacheName, numAllowedFiles) => {
	caches.open(cacheName).then((cache) => {
		cache.keys().then((keys) => {
			if (keys.length > numAllowedFiles) {
				cache.delete(keys[0]).then(limitCacheSize(cacheName, numAllowedFiles));
			}
		});
	});
};

//Install service worker
self.addEventListener("install", (event) => {
	// console.log("Service Worker has been installed", event);

	event.waitUntil(
		caches.open(staticCacheName).then((cache) => {
			// console.log("Caching all assets", cache);
			cache.addAll(assets);
		})
	);
});

//Activate serviceworker
self.addEventListener("activate", (event) => {
	// console.log("Service worker has been activated", event);
	event.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys
					.filter((key) => key !== staticCacheName)
					.map((key) => caches.delete(key))
			);
		})
	);
});

// Fetch
self.addEventListener("fetch", (event) => {
	if (!(event.request.url.indexOf("http") === 0)) return;
	// console.log(event.request);

	event.respondWith(
		caches.match(event.request).then((cacheRes) => {
			return (
				cacheRes ||
				fetch(event.request).then((fetchRes) => {
					return caches.open(dynamicCacheName).then((cache) => {
						cache.put(event.request.url, fetchRes.clone());
						limitCacheSize(dynamicCacheName, 2);
						return fetchRes;
					});
				})
			);
		})
	);
});
