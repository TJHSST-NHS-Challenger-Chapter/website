if ("serviceWorker" in window.navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register(PRODUCTION ? "/nhs/sw.js" : "sw.js")
            .then(registration => console.log("ServiceWorker registration successful with scope: ", registration.scope))
            .catch(error => console.error("ServiceWorker registration failed: ", error))
    })
}
