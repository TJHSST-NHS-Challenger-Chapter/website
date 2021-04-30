// TODO: Set cache to expire after some time

const CACHE_NAME = "tjhsst-nhs-cache-v1"

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(
                [
                    // pages
                    "/",
                    "/about",
                    "/service",
                    "/faq",
                    "/contact",
                    // styles
                    "/styles/styles.css",
                    // icons
                    "/assets/icon-192x192.png",
                    "/assets/icon-256x256.png",
                    "/assets/icon-384x384.png",
                    "/assets/icon-512x512.png",
                    "/manifest.json",
                    // external
                    "https://fonts.googleapis.com/css?family=Roboto:300,400,500",
                    "https://fonts.googleapis.com/icon?family=Material+Icons",
                    "https://fonts.gstatic.com/s/materialicons/v85/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
                    "https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2",
                    "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2"
                ].map(path => {
                    if (PRODUCTION) {
                        if (!path.startsWith("http")) {
                            return `/nhs${path}`
                        } else return path
                    } else {
                        return path
                    }
                })
            )
        })
    )
})

self.addEventListener("fetch", event => {
    // home page is network first
    if (event.request.url.endsWith("/")) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    if (!response.ok) {
                        // fetch doesn't call catch when there's an HTTP error
                        // it returns an error code instead
                        return caches.match(event.request)
                    } else {
                        return caches
                            .open(CACHE_NAME)
                            .then(cache => cache.put(event.request, response.clone()))
                            .then(() => response)
                    }
                })
                .catch(() => caches.match(event.request))
        )
    }

    // build is on network response
    else if (/build\/|assets\/|js\/|styles\//.test(event.request.url)) {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return cache.match(event.request).then(response => {
                    return (
                        response ??
                        fetch(event.request).then(response => {
                            cache.put(event.request, response.clone())
                            return response
                        })
                    )
                })
            })
        )
    }

    // everything else is cache first
    else {
        event.respondWith(caches.match(event.request).then(response => response ?? fetch(event.request)))
    }
})
