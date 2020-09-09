/**
 * 稍后再看
 */
/*
我们利用保存好了的数组，当用户点击稍后再看的观看按钮时，我们取出数组中的前几个（自定义数量）元素，打开标签页；打开完了之后，我们维护一个字典：{tabId:{url,{tabInfo}}} =>这里是所有打开了并没有被关闭或者转换了url的标签页信息，如果标签关闭了，或者被导航至其他url时，我们会将其从字典中删除，并将其对应的url从数组中删除。=>观看完毕。其中，我们还要保证其在点击了按钮之后，页面一直保持着打开（自定义）着一定数量的标签（除非数组中满足不了数量的要求）；直到清空数组所有元素。
*/

class WatchPlan {
    constructor() {
        this.OpFlag = true;
        this.execWatchReqTabNum = 3;
        this.tabStateDic = {};
        this.ori_list = {};
        this.livePageWatchTimeRecList = {};
    }

    onLoad() {
        console.log("Registered WatchPlan Mod.");
    }

    setWatchOptTabNum(num) {
        this.execWatchReqTabNum = num;
    }

    getOpRes() {
        return this.OpFlag;
    }

    ifExist(list, obj) {
        if (
            list.find(item => {
                return item == obj;
            })
        ) {
            return true
        } else {
            return false
        }
    }

    async PushInList(data) {
        var sw = await getStorage("watchLater");
        if (!sw.watchLater) { this.OpFlag = false; return }
        var ori_list = await getStorage("WatchPlanList");
        if (ori_list.WatchPlanList == null) {
            chrome.storage.local.set({ WatchPlanList: [] });
            ori_list = await getStorage("WatchPlanList");
        }
        if ((REG.video.test(data) || REG.article.test(data) || REG.userHome.test(data)) && !this.ifExist(ori_list.WatchPlanList, data)) {
            ori_list.WatchPlanList.push(data)
            chrome.storage.local.set({ "WatchPlanList": ori_list.WatchPlanList });
            this.OpFlag = true
        } else {
            this.OpFlag = false
        }
    }

    async execTabCreate(url) {
        //打开标签，并返回一个tab Info字典
        return new Promise((resolve, reject) => {
            chrome.tabs.create({ url: url }, (e) => {
                resolve(e);
            });
        });
    }

    async execWatch() {
        //打开列表中的前面几项（默认3项），并监听他们的状态（onRemoved or onUpdated），状态改变之后就将其从列表中删除，并补上页面，保持页面数量在指定数量。
        this.ori_list = await getStorage("WatchPlanList");
        chrome.tabs.onRemoved.addListener((id) => {
            //在关闭某个标签，检查是否是我们维护的标签状态对象里面的对象
            if (this.tabStateDic.hasOwnProperty(id)) {
                delete this.tabStateDic[id];
            }
        })

        var _daemon = setInterval(async () => {
            //判断 标签状态对象 里面的维护对象数（此次稍后再看排程列表长）是否比需要保持的稍后再看的标签保持数小，并且稍后再看列表不为空
            if (Object.keys(this.tabStateDic).length < this.execWatchReqTabNum && this.ori_list.WatchPlanList.length != 0) {
                let info = await this.execTabCreate(this.ori_list.WatchPlanList.slice(-1)[0]);
                this.tabStateDic[info.id] = { url: info.pendingUrl, tabInfo: info };
                this.ori_list.WatchPlanList.pop(this.ori_list.WatchPlanList.slice(-1)[0]);
            }
            if (Object.keys(this.tabStateDic).length == 0 && this.ori_list.WatchPlanList.length == 0) {
                chrome.storage.local.set({ WatchPlanList: [] });
                chrome.notifications.create(null, {
                    type: 'basic',
                    iconUrl: 'images/notice.png',
                    title: 'AcFun 助手 - 稍后再看',
                    message: '已完成所有稍后再看列表项排程'
                });
                clearInterval(_daemon);
            }
        }, 2000);
        return;
    }

    viewHistoryBackend(opts) {
        try {
            var x = JSON.parse(opts.msg).history.views;
        } catch (error) {
            console.log("[LOG]Backend-WatchPlan > viewHistoryBackend: viewHistory fetch Fail.");
            return
        }
        db_putHistoryViews(x)
    }

    livePageWatchTimeRec(params) {
        this.livePageWatchTimeRecList[`${params.tabid.id}`] = { windowId: params.tabid.windowId, index: params.tabid.index, startTime: params.startTime, url: params.tabid.url, title: params.tabid.title };
    }

    getLiveWatchTimeList() {
        return this.livePageWatchTimeRecList;
    }

    cleanLiveWatchTimeList() {
        this.livePageWatchTimeRecList = {};
    }

    delLiveWatchTimeListItem(item) {
        delete this.livePageWatchTimeRecList[item];
    }

    async updateLiveWatchTimeList() {
        let lwList = Object.keys(this.livePageWatchTimeRecList)
        for (let i in lwList) {
            // console.log(lwList[i])
            await chrome.tabs.query({ url: this.livePageWatchTimeRecList[lwList[i]].url }, (e) => {
                if (e.length < 1) {
                    // console.log(lwList[i])
                    delete this.livePageWatchTimeRecList[lwList[i]]
                }
            })
        }
        return true
    }

}