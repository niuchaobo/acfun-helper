// const db = new Dexie("acfunhelper");
const db2 = new Dexie("acfunhelper-square");
const db3 = new Dexie("acfunhelper-bangumi");
// const db4 = new Dexie("acfunhelper-historicalAchieve");

class IndexedDBAbsLayer {
    constructor(dbName = "acfunhelper") {
        this.dbName = dbName;
    }

    databaseConstruct() {
        if (indexdbArch) {
            const dbsName = Object.keys(indexdbArch);
            dbsName.forEach((e) => {
                const dbHandler = new Dexie(e);
                dbHandler.open()
                const fixedTable = Object.keys(indexdbArch[e].tables);
                const inDbTables = this.getDbTablesName();
                fixedTable.forEach(tableName => {
                    if (inDbTables.includes(tableName)) {
                        return;
                    }
                    dbHandler.version(indexdbArch[e].dbId).stores({ tableName: indexdbArch[e].tables[tableName] });
                })
            })
        }
    }

    getDbTablesName(dbHandler) {
        let result = [];
        dbHandler.open()
        dbHandler.tables.forEach(e => { result.push(e) });
        return result
    }

    init() {

    }

    static clearTables(dbName,tableName) {
        new Dexie(dbName)[tableName].clear();
    }

    static importAndCoverData(dbName, tableName, purgeSw = false, Data) {
        //Data -> Array
        if (purgeSw) {
            db.delete();
            console.log("    [LOG]IndexedDBAbsLayer-importData > Db has been purged.")
        }
        const dbHandler = new Dexie(dbName);
        dbHandler.open();
        if (Data) {
            dbHandler[`${tableName}`].bulkPut(Data);
        }
        dbHandler.close();
    }

    async static relateCount(dbName, tableName) {
        const dbHandler = new Dexie(dbName);
        dbHandler.open();
        return await dbHandler[tableName].count((e) => {
            return e
        })
    }

    static putMyBangumi_Partly(Data) {
        db3.open();
        if (Data.feeds.length != 0) {
            for (let i = 0; i <= Data.feeds.length - 1; i++) {
                let x = Data.feeds[i];
                db3.MyBangumi.put({ "bangumiId": x.id, "coverUrls": x.coverUrls, "showPlayCount": x.showPlayCount, "shareCount": x.shareCount, "commentCount": x.commentCount, "showStowCount": x.showStowCount, "showSerialStatus": x.showSerialStatus, "isOver": String(x.isOver), "updateDayOfWeek": x.updateDayOfWeek, "updateDayTime": x.updateDayTime, "lastVideoName": x.lastVideoName, "caption": x.caption, "description": x.description, "paymentType": x.paymentType, "recoReason": x.recoReason, "acfunOnly": String(x.acfunOnly), "likeCount": x.likeCount, "stowCount": x.stowCount, "shareUrl": x.shareCount, "playCount": x.playCount, "areaShow": x.areaShow, "firstPlayDate": x.firstPlayDate, "lastUpdateItemTimeStr": x.lastUpdateItemTimeStr, "updateDayTimeStr": x.updateDayTimeStr });
            }

        }
    }

    static putMyBangumi_Full(Data) {
        initMyBangumi();
        db3.open();
        if (Data.feeds.length != 0) {
            for (let i = 0; i <= Data.feeds.length - 1; i++) {
                let x = Data.feeds[i];
                db3.MyBangumi.put({
                    "bangumiId": x.albumId, "caption": x.caption, "Data": x
                })
            }
        }
    }

    async static getSquareList(limitNum) {
        //获取推送列表前多少个条目
        db2.open();
        let x = await db2.SquareList.orderBy("acmid").reverse().limit(limitNum).toArray();
        db2.close();
        return x;
    }

    async static getLuckyHistory(requireExportType) {
        initLuckyHistory();
        db.open();
        let x = await db.LuckyHistory.orderBy("uid").reverse().toArray();
        db.close();
        switch (requireExportType) {
            case "userList":
                let resultList = [];
                x.forEach((e) => { resultList.push(e["uid"]) })
                return resultList
            default:
                return x;
        }
    }

    async static getPushLstMany(limitNum) {
        //获取推送列表前多少个条目
        db.open();
        let x = await db.PushList.orderBy("acid").reverse().limit(limitNum).toArray();
        db.close();
        return x;
    }

    async static getPushLstByAcid(Acid, limitNum = 30) {
        //获取某个推送中的稿件
        initPushList();
        db.open();
        let x = await db.PushList.where({ "acid": Acid }).toArray();
        db.close();
        return x;
    }

    async static getUserMomentFromLocal(uid) {
        initSquareList();
        db2.open();
        if (typeof (uid) == "number") {
            let x = await db2.SquareList.where("uid").equals(uid).toArray();
            db2.close();
            return x;
        } else {
            return ["param uid should be number"]
        }
    }

    /**
     * 根据type排序番剧信息并返回
     * @param {int} mode 查询类型 0:键值约束 1:有序的全部
     * @param {string} orderType 排序类型（单选，不然只能选后两个参数）'bangumiId:int','caption:string','updateDayOfWeek:int','areaShow:string'
     * @param {string} limitKey 受约束的主键
     * @param {string} limitValue 受约束的值
     */
    async static getMybangumi(mode, orderType = '', limitKey = '', limitValue = '') {
        initMyBangumi();
        db3.open();
        if (mode == 0) {
            let x = await db3.MyBangumi.where(limitKey).equals(limitValue).toArray();
            db3.close();
            return x;
        } else if (mode == 1) {
            let x = await db3.MyBangumi.orderBy(orderType).toArray();
            db3.close();
            return x;
        } else {
            db3.close();
            return [];
        }
    }

}