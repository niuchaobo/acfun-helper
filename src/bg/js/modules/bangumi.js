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
        let result = [];
        let day = checkDay();
        for (let i = 0; i < x.length; i++) {
            let singleBangumiInfo = x[i];
            if (singleBangumiInfo.updateDayOfWeek == day) {
                result.push(singleBangumiInfo);
            }
        }
        return result
    }

    async notifyBangumiUpdate() {
        let updates = await this.todayUpdate();
        let items = [{ title: '概览', message: `今天有${updates.length}个番剧更新。` },]

        if (updates.length > 0) {
            for (let i = 0; i < updates.length; i++) {
                items.push({ title: updates[i].caption, message: `上次更新到${updates[i].lastVideoName}` })
            }
            chrome.notifications.create(null, {
                type: 'list',
                iconUrl: 'images/notice.png',
                title: 'AcFun 助手 - 番剧更新提示',
                message: `今天大概有${updates.length}个番剧更新。`,
                items: items,
                buttons: [
                    { title: '助手-我的番剧' },
                    { title: '主站-番剧' },
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