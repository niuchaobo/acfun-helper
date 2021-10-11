class Sandbox {
    constructor() {
        this.UnsafeMessageRouter = new MessageSwitch("sandbox");
        this.sandboxAgent = new SandboxAgent(window.parent);
        window.addEventListener('message', this.UnsafeMessageRouter.UnsafeCallHandler.bind(this));
    }

    unsafe_console(e) {
        console.log("From unsafe: ", e)
        return true;
    }

}

class SandboxAPI {
    constructor() {
        this.agent = new SandboxAgent(window.parent);
    }

    /**
     * 向Agent发送消息
     * @param {MessageSwitchStructs.FgToInjectPayload} e 
     * @returns 
     */
    async postMessage(e) {
        this.agent.postMessage(e);
    }

    async fetchData(url) {
        return await this.postMessage({ target: 'bkFetch', InvkSetting: { type: "function" }, params: { url, method: 'GET', data: "", withCredentials: false } });
    }

    sandboxReady() {
        this.postMessage({ target: 'sandboxReady', InvkSetting: { type: "function" } });
    }

}

window.api = new SandboxAPI();
window.sandbox = new Sandbox();
document.addEventListener('DOMContentLoaded', () => {
    api.sandboxReady();
}, false);