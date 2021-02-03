/**
 * 定时更新数据
 * @todo 部分功能可以采用 chrome.alarms 的方式实现，create − chrome.alarms.create(string name, object alarmInfo)；get − chrome.alarms.get(string name, function callback)；getAll − chrome.alarms.getAll(function callback)；clear − chrome.alarms.clear(string name, function callback)；clearAll − chrome.alarms.clearAll(function callback)
 */
class UpgradeAgent {
    constructor() {
        this.ModuleName = 'UpgradeAgent';
        this.checkConfigDay = [3, 7]
        this.dateTimer = null;
        this.bangumiPlan = new BangumiPlan();
        this.option = '';
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
            //POST版本号至服务器，服务器对比最新的版本之后返回一个int值，0：不需要更新，1：小版本更新-弱提醒，2：重要功能更新-强提醒(session and cache please)
            var version = null
            $.get(chrome.extension.getURL("manifest.json"), function (content) {
                chrome.storage.local.set({ Version: content.version });
                version = content.version;
                fetch('https://mini.pocketword.cn/api/acfun-helper/newversion/', { method: "POST", headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': "accept: application/json, text/plain, */*" }, body: version })
                    .then((res) => { return res.text(); })
                    .then((res) => {
                        chrome.storage.local.remove("Upgradeable");
                        let x = JSON.parse(res);
                        let key = x.result;
                        chrome.storage.local.set({ Upgradeable: key });
                    });
            }, 'json');
        }
    }

    /**
     * 总
     */
    async upgradeMain() {
        console.log("Registered Upgrade Check Mod.");
        // 配置获取
        let x = await getStorage("krnl_globalTimer");
        this.dateTimer = x.krnl_globalTimer;
        let x1 = await getStorage("BangumiNotif");
        let BangumiNotifsw = x1.BangumiNotif;
        let x2 = await getStorage("BangumiPlan");
        let BangumiPlansw = x2.BangumiPlan;
        // 启动项
        this.checkUpdate();
        this.bangumiPlan.onLoad();
        BangumiNotifsw && this.bangumiPlan.fetchBangumiInfo();
        BangumiPlansw && this.bangumiPlan.notifyBangumiUpdate();
        // 定时执行（一天的样子）
        this.dateTimer && clearInterval(this.dateTimer);
        this.dateTimer = setInterval(async () => {
            // 定时器内部配置获取
            let x1 = await getStorage("BangumiNotif");
            let BangumiNotifsw = x1.BangumiNotif;
            let x2 = await getStorage("BangumiPlan");
            let BangumiPlansw = x2.BangumiPlan;
            //调用
            this.checkUpdate();
            BangumiNotifsw && this.bangumiPlan.fetchBangumiInfo();
            BangumiPlansw && this.bangumiPlan.notifyBangumiUpdate();
        }, 43200000);
    }
}