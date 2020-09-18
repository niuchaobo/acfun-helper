/*global Agent */
class SandboxAPI {
    constructor() {
        this.agent = new Agent(window.parent);
    }

    async postMessage(action, params) {
        return new Promise((resolve, reject) => {
            try {
                this.agent.postMessage(action, params, result => resolve(result));
            } catch (err) {
                reject(null);
            }
        });
    }

    async fetch(url) {
        return await this.postMessage('Fetch', { url });
    }

    callback(data, callbackId) {
        this.postMessage('callback', { data, callbackId });
    }

    initBackend() {
        this.postMessage('initBackend', {});
    }

}

window.api = new SandboxAPI();