class AcFunHelperBackendCore extends AcFunHelperBgFrame {
    constructor() {
        super();
        globalThis.runtimeData = this.runtimeData;
        /**@type {runtimeData} */
        this.runtime = globalThis.runtimeData;
        /**浏览器类型数据 */
        this.runtime.dataset.core.browserType = ToolBox.thisBrowser();

        this.options = null;

        this.initBackend().then(init => {
            if (!init) {
                return;
            }
            /**开发模式 */
            // this.devReload = new AcFunHelperHelper(1); this.devReload.devModeWatch();

            chrome.runtime.onInstalled.addListener(this.onInstalled.bind(this));

            /**消息&调用处理 */
            this.MessageRouter = new MessageSwitch("bg");

            chrome.runtime.onMessage.addListener(this.MessageRouter.BackgroundMessageSwitch.bind(this));
            this.sandboxAgent = new SandboxAgent(document.getElementById('sandbox').contentWindow);
            window.addEventListener('message', this.MessageRouter.SandboxMsgHandler.bind(this));
            this.runtime.dataset.core.status.messageSwitch = true;

            /**通知响应 */
            chrome.notifications.onButtonClicked.addListener((e, index) => this.notifBuTrigger(e, index));
            this.runtime.dataset.core.status.notificationButtunTrigger = true;

            /**计划任务处理 */
            chrome.alarms.onAlarm.addListener((e) => this.onAlarmsEvent(e));
            this.runtime.dataset.core.status.scheduler = true;

            /**模块实例化 */
            this.MsgNotifsInst = new MsgNotifs();
            this.contextMenuMgmt = new ContextMenuManage();
            this.WatchPlan = new WatchPlan();
            this.authInfo = new AuthInfo();
            this.Ominibox = new Ohminibox();
            this.Upgrade = new UpgradeAgent();

            this.Apis = new AcFunHelperBackendAPIs(this);

            /**就绪 */
            this.runtime.dataset.core.status.core = true;
            this.startDaemon();
        })
    }

    startDaemon() {
        if (this.options.enabled) {
            /**建立计划任务表 */
            for (let task in this.runtime.dataset.core.scheduler) {
                if (typeof (task) == "string") {
                    chrome.alarms.create(task, this.runtime.dataset.core.scheduler[task].option)
                }
            }
            /**右键菜单实体、事件挂接 */
            this.contextMenuMgmt.attachAll();
            /**评论事件钩子 */
            //评论区
            chrome.webRequest.onBeforeRequest.addListener(
                this.onCommentRequest.bind(this),
                {
                    urls: ["https://www.acfun.cn/rest/pc-direct/comment/*"]
                },
                []
            );
            //直播流
            chrome.webRequest.onBeforeRequest.addListener(
                this.onLiveStreamUrl.bind(this),
                {
                    urls: ["*://*/livecloud*"]
                },
                []
            );
        }

    }

    /**
     * 通知按钮点击响应处理
     * @param {string} e 
     * @param {number} index 
     * @returns 
     */
    notifBuTrigger(e, index) {
        for (let regElem in this.runtime.dataset.notificationBtnTriggerData) {
            if (new RegExp(regElem).test(e)) {
                this.runtime.dataset.notificationBtnTriggerData[regElem](e, index);
            }
        }
    }

    /**
     * 计划任务处理
     * @param {chrome.alarms.Alarm} e 
     */
    onAlarmsEvent(e) {
        const targetTaskGroup = this.runtime.dataset.core.scheduler[e.name];
        try {
            for (let taskgroup in targetTaskGroup.tasks) {
                for (let task in targetTaskGroup.tasks[taskgroup]) {
                    targetTaskGroup.tasks[taskgroup][task]();
                }
            }
        } catch (error) {
            console.log(error, e, targetTaskGroup)
        }
    }

    onInstalled(details) {
        const versionNum = chrome.runtime.getManifest().version;
        initializeDBTable();
        if (details.reason === 'install') {
            chrome.tabs.create({ url: chrome.runtime.getURL('bg/firstRun.html') });
        }
        if (details.reason === 'update') {
            if (versionNum == details.previousVersion) {
                chrome.notifications.create(null, {
                    type: 'basic',
                    iconUrl: 'images/notice.png',
                    title: 'AcFun助手',
                    message: '重启了！'
                });
                return;
            }
            chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'images/notice.png',
                title: 'AcFun助手',
                message: '更新了！'
            });
            this.onUpdated();
        }
    }

    async onUpdated() {
        let rawOpts = await optionsLoad();
        const raw = rawOpts.ProgressBarStyle;
        const defaultData = defaults.ProgressBarStyle;
        let newData = {
            barColor: raw.barColor ?? defaultData.barColor,
            barHeight: raw.barHeight ?? defaultData.barHeight,
            loadedColor: raw.loadedColor ?? defaultData.loadedColor,
            loadedHeight: raw.loadedHeight ?? defaultData.loadedHeight,
            innerBarColor: raw.innerBarColor ?? defaultData.innerBarColor,
            innerBarHeight: raw.innerBarHeight ?? defaultData.innerBarHeight,
            innerBarLoadColor: raw.innerBarLoadColor ?? defaultData.innerBarLoadColor,
            innerBarLoadHeight: raw.innerBarLoadHeight ?? defaultData.innerBarLoadHeight,
        }
        ExtOptions.setValue("ProgressBarStyle", newData);
    }

    onCommentRequest(req) {
        let url = req.url;
        let tabId = req.tabId;
        let commentListReg = new RegExp("https://www.acfun.cn/rest/pc-direct/comment/list\\?.*");
        let commentSubReg = new RegExp("https://www.acfun.cn/rest/pc-direct/comment/sublist\\?.*rootCommentId=(\\d+).*");

        if (commentListReg.test(url)) {
            this.tabInvoke(tabId, 'renderList', { url: url });
        } else if (commentSubReg.test(url)) {
            let rootCommentId = url.match(commentSubReg)[1];
            this.tabInvoke(tabId, 'renderSub', { rootCommentId: rootCommentId, url: url });
        }
        this.authInfo.fetchPasstoken();
    }

    onLiveStreamUrl(req) {
        this.authInfo.fetchPasstoken();
        const liveReg = new RegExp("http(s)?://.*-acfun-adaptive.pull.etoote.com/livecloud/.*");
        const url = req.url;
        const tabId = req.tabId;
        if (liveReg.test(url)) {
            this.tabInvoke(tabId, 'renderLive', { url: url });
        }
    }

    tabInvoke(tabId, action, params) {
        MessageSwitch.sendMessage('bg', { target: action, InvkSetting: { tabId: tabId, type: "function" }, params: params },)
    }

    async initBackend() {
        let options = await ExtOptions.getAll();
        return this.opt_optionsChanged(options);
    }

    async opt_optionsChanged(options) {
        if (!options.permission) {
            return false;
        }
        /**@type {OptionStruct.DefaultStruct|null} */
        this.options = options;
        ExtOptions.saveAll(this.options);
        return true;
    }

    async opt_optionUpdate(options) {
        this.options = options;
    }

    async loadScripts(list) {
        let promises = list.map((name) => this.loadScript(name));
        let results = await Promise.all(promises);
        return results.filter(x => {
            if (x.result) return x.result;
        });
    }

    async loadScript(name) {
        return new Promise((resolve, reject) => {
            this.agent.postMessage('loadScript', { name }, result => resolve(result));
        });
    }

    async setScriptsOptions(options) {
        return new Promise((resolve, reject) => {
            this.agent.postMessage('setScriptsOptions', { options }, result => resolve(result));
        });
    }

    static async removeTask(taskGroupName) {
        return new Promise((resolve, reject) => {
            /**@type {runtimeData} */
            const runtime = globalThis.AcFunHelperBackendCore.runtime;
            if (taskGroupName in runtime.dataset.core.scheduler) {
                chrome.alarms.clear(taskGroupName, (status) => {
                    if (status) {
                        delete runtime.dataset.core.scheduler[taskGroupName];
                        resolve();
                    }
                })
            }
        })
    }

}

window.AcFunHelperBackend = new AcFunHelperBackendCore();