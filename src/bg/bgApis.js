/**
 * 后台接口
 * @description 是已经bind了BgCore实例的MessageSwitch调用这些方法，所以这里的this就是Bg
 */
class AcFunHelperBackendAPIs extends AcFunHelperBgFrame {
    constructor() {
        super();
    }

    notice(params) {
        let { title, msg } = params;
        notice(title, msg);
    }

    async watchLater() {
        this.WatchPlan.execWatch();
    }

    async stopWatchLater() {
        this.WatchPlan.exitWatchPlan();
    }

    getLiveWatchTimeList() {
        return this.WatchPlan.getLiveWatchTimeList();
    }

    livePageWatchTimeRec(params) {
        this.WatchPlan.livePageWatchTimeRec(params);
    }

    attentionTabs(params) {
        return this.WatchPlan.attentionTabs(params.windowId);
    }

    updateLiveWatchTimeListItem() {
        return this.WatchPlan.updateLiveWatchTimeList();
    }

    bananAudio() {
        this.MsgNotifsInst.bananAudio();
    }

    getWatchLaterStatusAndNum() {
        return {
            status: this.WatchPlan.daemon != 0,
            leaves: this.WatchPlan.ori_list.length
        }
    }

    async arubamuInsert(e) {
        if (e) {
            if (e.reverse) {
                return this.WatchPlan.arubamuInsert(e.arid, true);
            }else{
                return this.WatchPlan.arubamuInsert(e.arid);
            }
        }
        console.warn("[AcFunHelperBg]:APIs->arubamuInsert: ", e);
    }

    async achievementEvent(e) {
        if (e.action == "get") {
            return await db_getHistoricalAchievs(REG.acVid.exec(e.url)[2]);
        } else if (e.action == "put") {
            db_insertHistoricalAchievs(REG.acVid.exec(e.url)[2], e.tagData);
            return true;
        }
    }

    sandboxReady() {
        this.runtime.dataset.core.status.sandbox = true;
    }

    async BkFetch(params) {
        let { url, method, data, withCredentials, callback } = params;
        return await fetchResult(url, method, data, withCredentials);
    }
}

