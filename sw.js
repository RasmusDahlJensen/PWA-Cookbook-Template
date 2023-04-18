const staticCacheName = "site-static";
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
});

//Fetch all requests
self.addEventListener("fetch", (event) => {
	// console.log("Fetched event", event);
	// console.log(event.request);
	event.respondWith(
		caches.match(event.request).then((cacheRes) => {
			return cacheRes || fetch(event.request);
		})
	);
});
