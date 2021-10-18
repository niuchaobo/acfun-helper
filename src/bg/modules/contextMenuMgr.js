class ContextMenuManage extends AcFunHelperBackend {
    constructor() {
        super();
        this.initMod();
        this.clickEvent();
        console.log("Register ContextMenu Mod.")

    }

    initMod() {
        this.runtime.dataset.contextMenuRegistry["menuItem"]["coverDownload"] = {
            documentUrlPatterns: ['https://*.acfun.cn/*'],
            title: '下载封面',
            contexts: ['link'],
            id: "1",
        }

        this.runtime.dataset.contextMenuRegistry["menuItem"]["coverDownloadraw"] = {
            documentUrlPatterns: ['https://*.acfun.cn/*'],
            title: '下载原始封面',
            contexts: ['link'],
            parentId: '1',
            id: "2",
        }

        this.runtime.dataset.contextMenuRegistry["menuItem"]["coverDownloadhd"] = {
            documentUrlPatterns: ['https://*.acfun.cn/*'],
            title: '下载高清封面',
            contexts: ['link'],
            parentId: '1',
            id: "3",
        }

        this.runtime.dataset.contextMenuRegistry["menuItem"]["search"] = {
            title: '使用AcFun搜索【%s】', // %s表示选中的文字
            contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
            id: "4",
        }

        this.runtime.dataset.contextMenuRegistry["menuItem"]["watchlater"] = {
            title: '加入到助手的稍后再看',
            contexts: ['link'],
            id: "5",
        }

        this.runtime.dataset.contextMenuRegistry["menuItem"]["acfunqmlOpen"] = {
            title: '从AcFunQml桌面打开',
            contexts: ['link'],
            id: "6",
        }

        this.runtime.dataset.contextMenuRegistry["menuItem"]["timelineDots"] = {
            documentUrlPatterns: ['https://*.acfun.cn/v/*'],
            title: '在时间轴上添加这些章节标记',
            contexts: ['selection'],
            id: "7",
        }

    }

    clickEvent() {
        this.runtime.dataset.contextMenuRegistry["event"]["2"] = function (params, tab) {
            let link_url = params.linkUrl;
            MessageSwitch.sendMessage('bg', {
                target: "downloadCover", InvkSetting: { tabId: tab.id, type: "function" }, params: {
                    link_url: link_url, type: 'normal'
                }
            })
        }.bind(this)

        this.runtime.dataset.contextMenuRegistry["event"]["3"] = function (params, tab) {
            let link_url = params.linkUrl;
            MessageSwitch.sendMessage('bg', {
                target: "downloadCover", InvkSetting: { tabId: tab.id, type: "function" }, params: {
                    link_url: link_url, type: 'high'
                }
            })
        }.bind(this)

        this.runtime.dataset.contextMenuRegistry["event"]["4"] = function (params) {
            chrome.tabs.create({ url: 'https://www.acfun.cn/search?keyword=' + encodeURI(params.selectionText) });
        }

        this.runtime.dataset.contextMenuRegistry["event"]["5"] = (params) => {
            let link_url = params.linkUrl;
            globalThis.AcFunHelperBackendInst.WatchPlan.PushInList(link_url).then(() => {
                let x = globalThis.AcFunHelperBackendInst.WatchPlan.getOpRes();
                console.log(globalThis.AcFunHelperBackendInst.WatchPlan)
                let sw = ""
                x ? sw = "加入成功。" : sw = "稍后再看已被关闭或为错误对象。"
                chrome.notifications.create(null, {
                    type: 'basic',
                    iconUrl: 'images/notice.png',
                    title: 'AcFun 助手 - 稍后再看',
                    message: `${sw}`
                });
            });
        }

        this.runtime.dataset.contextMenuRegistry["event"]["6"] = (params) => {
            let link_url = params.linkUrl;
            this.WatchPlan.connectAcFunQmlByUrlScheme(link_url).then(() => {
            });
        }

        this.runtime.dataset.contextMenuRegistry["event"]["7"] = function (params, tab) {
            MessageSwitch.sendMessage('bg', {
                target: "timelineDotsMain", InvkSetting: { tabId: tab.id, type: "function" }, params: {
                    massText: params.selectionText, url: params.pageUrl
                }
            })

        }.bind(this)


    }

}