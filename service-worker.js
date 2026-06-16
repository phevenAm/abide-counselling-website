self.addEventListener("install", e => {
	e.waitUntil(
		caches.open("static").then(cache => {
			return cache.addAll([
				'./',
				'./manifest.json',
				'./public/css/main.min.css',
				'./public/css/bootstrap.min.css',
				'./public/scripts/main.min.js',
				'./public/media/brand/fav/android-chrome-512x512.png',
				'./public/media/brand/fav/android-chrome-192x192.png',
				'./public/media/brand/fav/apple-touch-icon.png',
				'./public/media/brand/fav/favicon-32x32.png',
			]);
		})
	);
});

self.addEventListener('fetch', e => {
	e.respondWith(
		caches.match(e.request).then(res => {
			return res || fetch(e.request);
		})
	);
});
