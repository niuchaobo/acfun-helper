export const liveApis = {
    liveIndex: {
        all: `https://api.sizzwoo.cc/rest/live`,
        /**@returns {SizzwooApis.LiveRoomInfo} */
        getAll: async () => {
            return JSON.parse(await fetchResult(liveApis.liveIndex.all));
        }
    },
    info: `https://api.sizzwoo.cc/rest/live/current?liveId=`,
    /**@returns {SizzwooApis.Info} */
    getInfo: async (liveId) => {
        return JSON.parse(await fetchResult(liveApis.info + liveId));
    },
    wordCloud: {
        url: `https://api.sizzwoo.cc/rest/nlp/word-cloud`,
        /**@returns {SizzwooApis.WorldCloud} */
        getWordcloud: async () => {
            return JSON.parse(await fetchResult(liveApis.wordCloud.url));
        }
    },
    richMan: {
        url: `https://api.sizzwoo.cc/rest/nlp/billboard/rich?type=1`,
        /**@returns {SizzwooApis.RichMen} */
        getRichMen: async () => {
            return JSON.parse(await fetchResult(liveApis.richMan.url));
        }
    },
    gifts: {
        url: `https://api.sizzwoo.cc/rest/nlp/live/gift`,
        /**@returns {SizzwooApis.Gift} */
        getGifts: async () => {
            return JSON.parse(await fetchResult(liveApis.wordCloud.url));
        }
    },
    rank: {
        url: `https://api.sizzwoo.cc/rest/nlp/live/gift`,
        /**@returns {SizzwooApis.Rank} */
        getRank: async () => {
            return JSON.parse(await fetchResult(liveApis.rank.url));
        }
    }
}

export const userApis = {
    detail: {
        url: `https://api.sizzwoo.cc/rest/up/snapshot/latest?uid=`,
        /**@returns {SizzwooApis.UserDetail} */
        get: async (uid) => {
            return JSON.parse(await fetchResult(userApis.detail.url + uid));
        }
    },
    analysis: {
        url: `https://api.sizzwoo.cc/rest/up/analysis?uid=`,
        /**@returns {SizzwooApis.Analysis} */
        get: async (uid) => {
            return JSON.parse(await fetchResult(userApis.analysis.url + uid + "&type=1"));
        }
    },
    history: {
        url: `https://api.sizzwoo.cc/rest/live/history/user?uid=`,
        /**@returns {SizzwooApis.LiveRecord} */
        get: async (uid, size = 20) => {
            return JSON.parse(await fetchResult(userApis.history.url + uid + "&size=" + size));
        }
    }
}

export const summary = {
    /**@returns {string} */
    getLiveId: async (uid) => {
        if (!uid) {
            return
        }
        return (JSON.parse(await fetchResult(acfunApis.live.liveInfo + uid)))["liveId"];
    },
    /**@returns {SizzwooApis.Info} */
    getUserLiveCurData: async () => {
        let uid = REG.liveRoomID.exec(location.href)[2];
        if (!uid) {
            return
        }
        const liveId = await summary.getLiveId(uid);
        const data = await liveApis.getInfo(liveId);
        return data;
    }
}