/**
 * Sandbox communication agent (with callback support)
 * 是Sandbox的代表(如果Backend传入的对象是Sandbox)
 */
class SandboxAgent {
    constructor(hostElement) {
        this.hostElement = hostElement;
        this.callbackId = 0;
        this.callbackNameList = [];
        this.finishedCallBacks = [];
        this.callbacks = {};
        this.AgentMessageRouter = new MessageSwitch("sandbox");
        window.addEventListener('message', this.AgentMessageRouter.SandboxComAgent.bind(this));
    }

    /**
     * 创建任务
     * @param {MessageSwitchStructs.WindowMsgPayload} e 
     * @param {Function} callback 
     */
    createTask(e, callback) {
        if (e.InvkSetting.withCallback) {
            if (this.callbackNameList.indexOf(e.InvkSetting.callbackId) == -1) {
                this.callbackNameList.push(e.InvkSetting.callbackId);
                this.callbacks[e.InvkSetting.callbackId] = callback;
            } else {
                throw ("[SandboxAgent > createRequest]: callbackId conflict.");
            }

            this.hostElement.postMessage({
                to: "sandbox",
                data: e
            }, '*');
        }
    }

    /**
     * 任务完成
     * @param {MessageSwitchStructs.WindowMsgPayload} e 
     */
    taskFinished(e, response) {
        if (this.finishedCallBacks.indexOf(e.InvkSetting.callbackId) == -1) {
            e.InvkSetting.response = response;
            this.hostElement.postMessage({
                to: "sandboxAgentCallback",
                data: e
            }, '*');

            this.finishedCallBacks.push(e.InvkSetting.callbackId);
            this.callbackNameList.slice(this.callbackNameList.indexOf(e.InvkSetting.callbackId), 1);
            delete this.callbacks[e.InvkSetting.callbackId];

            this.hostElement.postMessage({
                to: "background",
                data: e
            }, '*');
        }
    }

    /**
     * 运行回调
     * @param {MessageSwitchStructs.CommonPayload} e 
     * @returns 
     */
    runCallback(e) {
        return typeof (this.callbacks[e.InvkSetting.callbackId]) === 'function' && this.callbacks[e.InvkSetting.callbackId](e.InvkSetting.response);
    }

    postMessage(e) {
        this.hostElement.postMessage({
            to: "background",
            data: e
        }, '*');
    }

}
