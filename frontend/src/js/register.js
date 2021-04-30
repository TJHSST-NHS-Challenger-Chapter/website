if ("serviceWorker" in window.navigator) {
    const sw_path = document.querySelector("meta[data-name='service-worker-path']").content
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register(sw_path)
            .then(registration => console.log("ServiceWorker registration successful with scope: ", registration.scope))
            .catch(error => console.error("ServiceWorker registration failed: ", error))
    })
}
