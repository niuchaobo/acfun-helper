/**
 * 番剧计划
 */
class BangumiPlan {
    constructor() {

    }

    onLoad() {
        console.log("Hook BangumiPlan Mod.");
    }

    async fetchBangumiInfo() {
        let y = await getStorage("AccessToken");
        fetch(`https://api-new.app.acfun.cn/rest/app/feed/favorite/bangumi?count=100&pcursor=&access_token=${y.AccessToken}`, { method: "GET", credentials: 'include' })
            .then((res => { return res.text() }))
            .then((res) => {
                db_putMyBangumi_Partly(JSON.parse(res));
            })
    }

    async todayUpdate() {
        let x = await db_getMybangumi(0, '', 'isOver', 'false');
        let day = checkDay();
        return x.filter(bangumiInfo => bangumiInfo.updateDayOfWeek == day);
    }

    async notifyBangumiUpdate() {
        let updates = await this.todayUpdate();
        if (updates.length > 0) {
            let items = updates.map((val) => {
                return {
                    title: val.caption,
                    message: chrome.i18n.getMessage("bangumiUpdateNotifyItemDetailMessage", val.lastVideoName)
                }
            });
            items.unshift({
                title: chrome.i18n.getMessage("bangumiUpdateNotifyItemOverviewTitle"),
                message: chrome.i18n.getMessage("bangumiUpdateNotifyItemOverviewMessage", updates.length)
            });

            chrome.notifications.create(null, {
                type: 'list',
                iconUrl: 'images/notice.png',
                title: chrome.i18n.getMessage("bangumiUpdateNotifyTitle"),
                message: chrome.i18n.getMessage("bangumiUpdateNotifyMessage", updates.length),
                items: items,
                buttons: [
                    { title: chrome.i18n.getMessage("bangumiUpdateNotifyBtn0") },
                    { title: chrome.i18n.getMessage("bangumiUpdateNotifyBtn1") },
                ],
            }, (e) => {
                chrome.notifications.onButtonClicked.addListener((e, index) => {
                    if (index == 0) {
                        chrome.tabs.create({ url: '/bg/bangumi.html' })
                    } else {
                        chrome.tabs.create({ url: 'https://www.acfun.cn/bangumilist' })
                    }
                });
            });
        }
    }
}