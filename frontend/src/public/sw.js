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
                    "/induction",
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
    // meaning always try network first, and if that fails then try the cache
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

    // anything else will be served from the cache (if it is in the cache)
    // if it is not expired or if it is expired but could not connect to the
    // internet.
    else {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache =>
                cache.match(event.request).then(response => {
                    if (response === undefined) {
                        // not found in cache
                        return fetch(event.request)
                    } else if (expired(response)) {
                        return fetch(event.request)
                            .then(fetch_response => {
                                if (!fetch_response.ok) return response

                                const clone = fetch_response.clone()
                                const headers = new Headers(clone.headers)
                                headers.append("sw-fetched-on", new Date().getTime())
                                return clone.blob().then(body =>
                                    cache.put(
                                        event.request,
                                        new Response(body, {
                                            status: clone.status,
                                            statusText: clone.statusText,
                                            headers: headers
                                        })
                                    )
                                )
                            })
                            .catch(() => response)
                    } else {
                        return response
                    }
                })
            )
        )
    }
})

function expired(response) {
    if (response) {
        const time = response.headers.get("sw-fetched-on")
        // cache expires after 2 hours.  1000 * 60 * 60 * 2 is 2 hr in ms
        return time && parseFloat(time) + 1000 * 60 * 60 * 2 < new Date().getTime()
    } else return true
}
