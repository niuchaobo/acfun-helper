/**
 * 稍后再看
 * @description 思路：我们利用保存好了的数组，当用户点击稍后再看的观看按钮时，我们取出数组中的前几个（自定义数量）元素，打开标签页；打开完了之后，我们维护一个字典：{tabId:{url,{tabInfo}}} =>这里是所有打开了并没有被关闭或者转换了url的标签页信息，如果标签关闭了，或者被导航至其他url时，我们会将其从字典中删除，并将其对应的url从数组中删除。=>观看完毕。其中，我们还要保证其在点击了按钮之后，页面一直保持着打开（自定义）着一定数量的标签（除非数组中满足不了数量的要求）；直到清空数组所有元素。
 */
class WatchPlan extends AcFunHelperBgFrame {
    constructor() {
        super();
        /**@description 稍后再看列表操作状态信息 @type {boolean} */
        this.OpFlag = true;
        /**
         * 需要保持的打开的稍后再看任务数量
         */
        this.execWatchReqTabNum = 3;
        /**
         * 标签状态字典
         */
        this.tabStateDic = {};
        /**
         * 任务列表
         * @type {string[]}
         */
        this.ori_list = [];
        this.livePageWatchTimeRecList = {};
        this.startToken = true;
        this.daemon = 0;
        this.devMode = false;
        this.onLoad();
    }

    onLoad() {
        console.log("Registered WatchPlan Mod.");
    }

    /**
     * 设置稍后再看需要保持在前台的标签任务数
     * @param {number} num 
     */
    setWatchOptTabNum(num) {
        this.execWatchReqTabNum = num;
    }

    /**
     * 获取状态信息
     */
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

    async EmptyFix() {
        var ori_list = await ExtOptions.get("WatchPlanList");
        //假如任务队列为空，则先构造一个列表
        if (ori_list.WatchPlanList == null) {
            chrome.storage.local.set({ WatchPlanList: [] });
            ori_list = await ExtOptions.get("WatchPlanList");
        }

    }
    /**
     * 加入任务队列
     * @param {string} data 主站投稿的URL
     * @returns this.OpFlag 判断结果
     */
    async PushInList(data) {
        var sw = await ExtOptions.get("watchLater");
        if (!sw.watchLater) { this.OpFlag = false; return }
        await this.EmptyFix();
        var ori_list = await ExtOptions.get("WatchPlanList");
        //假如传入数据（链接）为视频、文章、用户首页 并且 其不是先存在于任务队列中的数据 就加入队列，并修改操作状态信息为 是
        if ((REG.video.test(data) || REG.article.test(data) || REG.userHome.test(data)) && !this.ifExist(ori_list.WatchPlanList, data)) {
            ori_list.WatchPlanList.push(data)
            chrome.storage.local.set({ "WatchPlanList": ori_list.WatchPlanList });
            this.OpFlag = true
        } else {
            this.OpFlag = false
        }
    }
    /**
     * 批量加入任务队列
     * @param {List} list UrlList
     */
    async MassInsert(list) {
        var sw = await ExtOptions.get("watchLater");
        if (!sw.watchLater) { this.OpFlag = false; return }
        await this.EmptyFix();
        await ExtOptions.get("WatchPlanList").then((ori_list) => {
            let res = ori_list.WatchPlanList.concat(list);
            chrome.storage.local.set({ "WatchPlanList": res });
        })
    }

    /**
     * 批量加入合集稿件
     * @param {number} arubamuId 
     * @param {boolean} reverse 倒序添加
     * @returns {boolean}
     */
    async arubamuInsert(arubamuId, reverse = false) {
        const sw = await ExtOptions.getValue("watchLater");
        if (arubamuId != undefined && sw) {
            let apiResPageOne = await acfunApis.arubamu.getList(arubamuId, 1, 2);
            if (apiResPageOne.contents.length == 0) {
                return false
            }
            const total = apiResPageOne.totalSize;
            const needReqSize = total < 100 ? 1 : Math.round(total / 100);
            /**@type {APIs.ArubamuItem[]} */
            let res = []
            for (let i = 1; i <= needReqSize; i++) {
                let resp = await acfunApis.arubamu.getList(arubamuId, i, 100);
                res = res.concat(resp.contents);
            }
            let oList = await ExtOptions.getValue("WatchPlanList");
            let urlRes = []
            if (reverse) {
                for (let k = res.length - 1; k >= 0; k--) {
                    urlRes.push("https://www.acfun.cn/v/ac" + res[k].resourceId);
                }
            } else {
                res.forEach((v) => {
                    urlRes.push("https://www.acfun.cn/v/ac" + v.resourceId);
                })
            }
            //把原来的列表项目放到最后
            if (oList != null) {
                urlRes = urlRes.concat(oList);
            }
            return await ExtOptions.setValue("WatchPlanList", urlRes);
        }
        return false
    }

    /**
     * 打开标签，并返回一个tab Info字典
     * @param {string} url 
     * @returns tabInfo dict
     */
    async execTabCreate(url) {
        return new Promise((resolve, reject) => {
            chrome.tabs.create({ url: url }, (e) => {
                resolve(e);
            });
        });
    }

    /**
     * 稍后再看-核心
     * @description 打开-监听-任务队列维护
     */
    async execWatch() {
        //打开列表中的前面几项（默认3项），并监听他们的状态（onRemoved or onUpdated），状态改变之后就将其从列表中删除，并补上页面，保持页面数量在指定数量。
        this.ori_list = await ExtOptions.getValue("WatchPlanList");
        chrome.tabs.onRemoved.addListener((id) => {
            //在关闭某个标签，检查是否是我们维护的标签状态对象里面的对象
            if (this.tabStateDic.hasOwnProperty(id)) {
                delete this.tabStateDic[id];
            }
        })

        this.daemon = window.setInterval(async () => {
            if (this.startToken == false) {
                clearInterval(this.daemon);
                this.daemon = 0;
                this.startToken = true;
                return;
            }
            //判断 标签状态对象 里面的维护对象数（此次稍后再看排程列表长）是否比需要保持的稍后再看的标签保持数小，并且稍后再看列表不为空
            if (Object.keys(this.tabStateDic).length < this.execWatchReqTabNum && this.ori_list.length != 0) {
                let info = await this.execTabCreate(this.ori_list.slice(-1)[0]);
                this.tabStateDic[info.id] = { url: info.pendingUrl, tabInfo: info };
                this.ori_list.pop(this.ori_list.slice(-1)[0]);
            }
            if (Object.keys(this.tabStateDic).length == 0 && this.ori_list.length == 0) {
                //清空存储中的任务列表，发送通知
                chrome.storage.local.set({ WatchPlanList: [] });
                chrome.notifications.create(null, {
                    type: 'basic',
                    iconUrl: 'images/notice.png',
                    title: 'AcFun 助手 - 稍后再看',
                    message: '已完成所有稍后再看列表项排程'
                });
                clearInterval(this.daemon);
                this.daemon = 0;
            }
        }, 2000);
        return;
    }

    exitWatchPlan() {
        if (this.startToken) {
            this.startToken = false;
            chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'images/notice.png',
                title: 'AcFun 助手 - 稍后再看',
                message: '已撤销此次稍后再看列表项排程（如需清除任务，就进入设置页面）'
            });
        }
    }

    /**
     * 将直播观看起始信息写入类中
     * @param {object} params 
     */
    livePageWatchTimeRec(params) {
        this.livePageWatchTimeRecList[`${params.tabid.id}`] = { windowId: params.tabid.windowId, index: params.tabid.index, startTime: params.startTime, url: params.tabid.url, title: params.tabid.title };
    }

    /**
     * 获取直播观看时长计分板
     */
    getLiveWatchTimeList() {
        return this.livePageWatchTimeRecList;
    }

    /**
     * 清除直播观看时长计分板
     */
    cleanLiveWatchTimeList() {
        this.livePageWatchTimeRecList = {};
    }

    delLiveWatchTimeListItem(item) {
        delete this.livePageWatchTimeRecList[item];
    }

    /**
     * 更新直播观看时长计分板
     * @description 清除不存在的信息
     */
    async updateLiveWatchTimeList() {
        let lwList = Object.keys(this.livePageWatchTimeRecList)
        for (let i in lwList) {
            await chrome.tabs.query({ url: this.livePageWatchTimeRecList[lwList[i]].url }, (e) => {
                if (e.length < 1) {
                    delete this.livePageWatchTimeRecList[lwList[i]]
                }
            })
        }
        return true
    }

    /**
     * AcFunQml链接桥 - 通过AcFunQml打开此稿件
     * @param {String} url 
     * @todo 打开文章稿件和动态
     */
    async connectAcFunQmlByUrlScheme(url) {
        var msg = "";
        if (url && REG.videoAndBangumi.test(url)) {
            let acid = "";
            let commandObj = {};
            if (acid = REG.acVid.exec(url)) {
                commandObj = { "v": 1, "acId": String(acid[2]), "type": "video" };
            } else if (acid = REG.acBangumid.exec(url)) {
                commandObj = { "v": 1, "acId": String(acid[2]), "type": "bangumi" };
            }
            if (acid != null) {
                chrome.tabs.create({ url: "AcfunQml://" + encodeURI(JSON.stringify(commandObj)) }, (e) => { });
                msg = "启动AcFunQml中。"
            }
        } else {
            msg = "无法启动AcFunQml，参数可能不是稿件。"
        }
        chrome.notifications.create(null, {
            type: 'basic',
            iconUrl: 'images/notice.png',
            title: 'AcFun 助手',
            message: msg,
        });
    }

    /**
     * 主站标签整理
     * @param {Number} mainWindowId 主窗口ID
     */
    attentionTabs(mainWindowId) {
        let wId;
        mainWindowId ? wId = mainWindowId : wId = 1;
        chrome.tabs.getAllInWindow(wId, function (e) {
            //存储本窗口中是主站的标签的ID
            let x = [];
            let y = new RegExp("https://www.acfun.cn");
            let z = new RegExp("https://live.acfun.cn");
            for (let i = 0; i < e.length; i++) {
                if (y.exec(e[i].url) || z.exec(e[i].url)) {
                    x.push(e[i].id);
                }
            }
            if (x.length != 0) {
                notice("自动整理", `在整理了在整理了！！整理了${x.length}个标签。`);
            } else {
                notice("自动整理", `没有什么能整理的标签页好不好。`);
                return
            }
            //创建一个窗口并将主站相关的标签都移动至新窗口
            chrome.windows.create((f) => {
                for (let j = 0; j < x.length; j++) {
                    chrome.tabs.move(x[j], { windowId: f.id, index: 1 })
                }
            })
        })
    }

}