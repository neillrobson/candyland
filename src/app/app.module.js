import appComponent from './app.component';

class App {
    init() {
        this.initComponents();
        this.initServiceWorker();
    }

    initComponents() {
        appComponent.init();
    }

    initServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('./service-worker.js')
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