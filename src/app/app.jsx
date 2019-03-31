import React from 'react';

import Deck from './deck';

export default class App extends React.Component {
    constructor() {
        super();
        this.initServiceWorker();
        this.state = {
            title: "Hello World Candyland React Woohoo"
        };
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

    render() {
        return (
            <div>
                <span>{this.state.title}</span>
                <Deck />
            </div>
        );
    }
}