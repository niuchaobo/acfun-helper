class UpgradeAgent extends AcFunHelperBackend {
    constructor() {
        super();
        this.initMod();
    }

    initMod() {
        this.runtime.dataset.core.scheduler["update"] = {
            "option": { "periodInMinutes": 1440 },
            "tasks": {
                versionCheck: {
                    callback: this.checkUpdate.bind(this)
                },
            }
        }
        this.runtime.dataset.core.scheduler["purgeNotifTrg"] = {
            "option": { "periodInMinutes": 4220 },
            "tasks": {
                versionCheck: {
                    callback: this.checkUpdate.bind(this)
                },
            }
        }
    }

    /**
     * 检查是否是正确的日期
     */
    ifRightDay() {
        let x = checkDay();
        if (this.checkConfigDay.indexOf(x) != -1) {
            console.log(`[LOG]Backend-Upgrade>rightDay: [${formatDate(new Date(), true)}] 是时候检查更新了。`);
            return true;
        }
        return false;
    }

    /**
     * 检查插件更新
     */
    checkUpdate() {
        if (this.ifRightDay()) {
            //POST版本号至服务器，服务器对比最新的版本之后返回一个数字，0：不需要更新，1：小版本更新-弱提醒，2：重要功能更新-强提醒
            const version = chrome.runtime.getManifest().version;
            fetch('https://mini.pocketword.cn/api/acfun-helper/newversion/', {
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': "accept: application/json, text/plain, */*" },
                body: version
            })
                .then((res) => { return res.json(); })
                .then((res) => {
                    chrome.storage.local.remove("Upgradeable");
                    let key = res.result;
                    chrome.storage.local.set({ Upgradeable: key });
                })
        }
    }
    
    /**
     * 版本号判断
     * @param {string} remote 远端版本号
     * @param {string} local 本地版本号
     * @returns {0|1|2|undefined} 
     */
    versionProcess(remote, local) {
        if (remote.length != local.length) {
            return;
        }
        if (remote == local) {
            return 0;
        }
        const remoteVersion = remote.split(".");
        const localVersion = local.split(".");
        let signal;
        if (Number(remoteVersion[0]) > Number(localVersion[0])) {
            return 2;
        }
        if (Number(remoteVersion[1]) > Number(localVersion[1])) {
            return 2;
        }
        if (Number(remoteVersion[2]) > Number(localVersion[2])) {
            return 2;
        }
        Number(remoteVersion[3]) - Number(localVersion[3]) > 90 ? signal = 2 : signal = 1;
        return signal;
    }

    /**
     * 每隔三天清除助手本体的通知响应列表
     * @description 对于常年不关浏览器的同志来说相比是很需要的
     */
    purgeNotificationList() {
        if (this.notificationListPurgeCount > 2) {
            chrome.notifications.getAll((e) => {
                for (let i in e) {
                    chrome.notifications.clear(i, function () { });
                }
            })
            this.notificationListPurgeCount = 0;
        }
    }

}