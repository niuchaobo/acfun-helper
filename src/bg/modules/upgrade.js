/**
 * 定时更新数据
 * @todo 部分功能可以采用 chrome.alarms 的方式实现，create − chrome.alarms.create(string name, object alarmInfo)；get − chrome.alarms.get(string name, function callback)；getAll − chrome.alarms.getAll(function callback)；clear − chrome.alarms.clear(string name, function callback)；clearAll − chrome.alarms.clearAll(function callback)
 */
class UpgradeAgent {
    constructor() {
        this.ModuleName = 'UpgradeAgent';
        this.checkConfigDay = [3, 7]
        this.option = '';
        this.scheduler = myBrowser() == "Chrome" ? chrome.alarms : browser.alarms;
        this.notificationListPurgeCount = 0;
        this.devMode = false;
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

    /**
     * 总
     */
    async upgradeMain() {
        console.log("Registered Upgrade Check Mod.");
        // 配置获取
        let x = await getStorage("krnl_globalTimer").then(function (e) {
            return e.krnl_globalTimer;
        })
        if (x) {
            this.scheduleTasks();
        }
        // 定时执行（一天的样子）
        this.scheduler.create("scheduleTasks", { "periodInMinutes": 1440 })
    }

    async scheduleTasks() {
        //配置

        //调用
        this.checkUpdate();
        this.purgeNotificationList();
    }
}