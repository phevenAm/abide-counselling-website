self.addEventListener("isntall", e => {
	console.log("isntalling", e);

	e.waitUntil(
		cache.open("static").then(cache => {
			return cache.addAll(['./', './media/brand/fav/android-chrome-512x512.png', './media/brand/fav/android-chrome-192x192.png', './media/brand/logo-clear.png','./media/brand/fav/apple-touch-icon.png', './scripts/main.js','./scripts/bootstrap/bootstrap.min.js',  'dist/css/index.css', './css/bootstrap.css'])
			//cache not working
		})
	)
});

self.addEventListener('fetch', e => {
	//console.log(`intercepting feetch for ${e.request.url}`);
	e.respondWith(
		caches.match(e.request).then(res => {
			return res || fetch(e.request) //check cache then check network
		})
	)
});