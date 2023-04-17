//Install service worker
self.addEventListener("install", (event) => {
	console.log("Service Worker has been installed", event);
});

//Activate serviceworker
self.addEventListener("activate", (event) => {
	console.log("Service worker has been activated", event);
});

//Fetch all requests
self.addEventListener("fetch", (event) => {
	console.log("Fetched event", event);
});
