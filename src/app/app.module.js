class App {
    init() {
        this.initComponents();
        this.initServiceWorker();
    }

    initComponents() {
        // TODO
    }

    initServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('./sw.js')
                .then(() => {
                    console.log("Service worker registered successfully.");
                })
                .catch((error) => {
                    console.log("Error when registering service worker: " + error);
                });
        }
    }
}

export default app = new App();