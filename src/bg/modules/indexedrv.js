/**
 * IndexedDB 驱动
 */
const db = new Dexie("acfunhelper");
const db2 = new Dexie("acfunhelper-square");
const db3 = new Dexie("acfunhelper-bangumi");
const db4 = new Dexie("acfunhelper-historicalAchieve");
const Bangumi_struct = "coverUrls,showPlayCount,shareCount,commentCount,showStowCount,showSerialStatus,isOver,updateDayOfWeek,updateDayTime,bangumiId,lastVideoName,caption,description,paymentType,recoReason,acfunOnly,likeCount,stowCount,shareUrl,playCount,areaShow,firstPlayDate,lastUpdateItemTimeStr,updateDayTimeStr"

function test() {
    //dexie 官网上的示例
    db.version(1).stores({
        friends: 'name,shoeSize'
    });
    db.friends.put({ name: "Nicolas", shoeSize: 8 }).then(function () {
        return db.friends.get('Nicolas');
    }).then(function (friend) {
        console.log("Nicolas has shoe size " + friend.shoeSize);
    }).catch(function (error) {
        alert("Ooops: " + error);
    });
}

function initializeDBTable() {
    console.log("initializeDBTable For System.")
    initPushList();
    initHistoryViews();
    initPushListHtml();
    initSquareList();
    inithistoricalAchieve();
}

async function judgeDbExist(dbName) {
    return new Promise((resolve, reject) => {
        Dexie.exists(dbName).then(function (exists) {
            if (exists) {
                resolve(true);
            } else {
                resolve(false);
            }
        }).catch(function (error) {
            console.error("    [ERROR]Background-IndexedDbDrv > judgeDbExist: Oops, an error occurred when trying to check database existance");
        });
    });
}

//---------------------Initialize Table--------------
function initSquareList() {
    try {
        db2.SquareList.count(function (e) {
            // console.log(e)
        })
    } catch (error) {
        console.log("    [WARN]Background-IndexedDbDrv > initSquareList:Table May Not Exist.")
        db2.version(2).stores({
            SquareList: 'acmid,uid,time,userInfo,commentNum,bananaCount,content',
        });
        console.log("    [WARN]Background-IndexedDbDrv > initSquareList: Table initialize.")
    }
}

function initLuckyHistory() {
    try {
        db.LuckyHistory.count(function (e) {
            // console.log(e)
        })
    } catch (error) {
        console.log("    [WARN]Background-IndexedDbDrv > initLuckyHistory:Table May Not Exist.")
        db.close();
        db.version(1).stores({
            LuckyHistory: 'uid,acid,userName,date'
        });
        console.log("    [WARN]Background-IndexedDbDrv > initLuckyHistory: Table initialize.")
    }
}

function initPushList() {
    try {
        db.PushList.count(function (e) {
            // console.log(e)
        })
    } catch (error) {
        console.log("    [WARN]Background-IndexedDbDrv > initLuckyHistory:Table May Not Exist.")
        db.version(1).stores({
            PushList: 'uid,acid,userName,date',
        });
    }
}

function initPushListHtml() {
    try {
        db.PushListHtml.count(function (e) {
            // console.log(e)
        })
    } catch (error) {
        db.close();
        db.version(1).stores({
            PushListHtml: 'id,content',
        });
        console.log("    [WARN]Background-IndexedDbDrv > initPushListHtml:Table initializing.")
    }
}

function initHistoryViews() {
    try {
        db.HistoryViews.count(function (e) {
            // console.log(e)
        })
    } catch (error) {
        db.close();
        db.version(1).stores({
            HistoryViews: 'id,historyArray',
        });
        console.log("    [WARN]Background-IndexedDbDrv > initHistoryViews:Table initializing.")
    }
}

function initMyBangumi() {
    try {
        db3.MyBangumi.count(function (e) {
            // console.log(e)
        })
    } catch (error) {
        db3.version(3).stores({
            MyBangumi: Bangumi_struct,
        });
        console.log("    [WARN]Background-IndexedDbDrv > initHistoryViews:Table initializing.")
    }
}

function inithistoricalAchieve() {
    try {
        db4.historical.count(function (e) {
            // console.log(e)
        })
    } catch (error) {
        db4.version(5).stores({
            historical: 'acid,date,tag',
        });
        db4.historical.put({
            "acid": 1, "date": new Date, "tag": "233"
        })    
        console.log("    [WARN]Background-IndexedDbDrv > inithistoricalAchieve:Table initializing.")
    }
}

//----------------------Utils-Func-----------------

async function db_SquareListCount() {
    initSquareList();
    db2.open();
    let x = await db2.SquareList.count((e) => {
        return e
    })
    // db2.close();
    return x
}

function db_exportAllData(dbName) {

}

function db_importData(dbName, purgeSw = false, Data) {
    //Data -> Array
    if (purgeSw) { db.delete(); console.log("    [LOG]Background-IndexedDbDrv > db_importData:Db has been purged.") }
    db.open();
    if (Data != null && Data != undefined) {
        db[`${dbName}`].bulkPut(Data);
    }
    db2.close();
}

//----------------------Put-Obj-----------------
function db_putPushListHtml(Data) {
    initPushListHtml();
    db.open();
    if (Data != null && Data != undefined) {
        db.PushListHtml.put({ id: 1, content: Data });
    }
    db.close();
}

function db_putHistoryViews(Data) {
    initHistoryViews();
    db.open();
    if (Data != null && Data != undefined) {
        db.HistoryViews.put({ id: 1, content: Data });
    }
    db2.close();
}

function db_putSquareList(Data) {
    initSquareList();
    db2.open();
    if (Data.feedList.length != 0) {
        for (let i = 0; i <= Data.feedList.length - 1; i++) {
            let x = Data.feedList[i];
            db2.SquareList.put({ acmid: x.resourceId, uid: x.authorId, time: x.createTime, userInfo: x.userInfo, commentNum: x.commentCount, bananaCount: x.bananaCount, content: x.moment });
        }
    }
}

function db_putPushLst(Data) {
    initPushList();
    db.open();
    if (Data.length != 0) {
        for (let i = 0; i <= 29; i++) {
            let x = Data.feedList[i];
            db.PushList.put({ acid: x.aid, uid: x.userId, content: x });
        }
    }
    db.close();
}

function db_putLuckyHistory(Data) {
    initLuckyHistory();
    db.open();
    if (Data.length != 0) {
        db.LuckyHistory.put({ uid: Data.uid, acid: Data.acid, userName: Data.userName, date: Date.parse(new Date) });
    }
    db.close();
}

function db_delLuckyHistory(uid) {
    //uid->int
    initLuckyHistory();
    db.open();
    if (typeof (uid) == "number") {
        console.log(uid)
        db.LuckyHistory.where("uid").equals(uid).delete();
    }
    db.close();
}

/**
 * 将重要的番剧数据放入数据库
 * @todo 以后出现存储占用问题就改用这个方式
 * @param {Object} Data Bangumi Api Data
 */
function db_putMyBangumi_Partly(Data) {
    initMyBangumi();
    db3.open();
    if (Data.feeds.length != 0) {
        for (let i = 0; i <= Data.feeds.length - 1; i++) {
            let x = Data.feeds[i];
            db3.MyBangumi.put({ "bangumiId": x.id, "coverUrls": x.coverUrls, "showPlayCount": x.showPlayCount, "shareCount": x.shareCount, "commentCount": x.commentCount, "showStowCount": x.showStowCount, "showSerialStatus": x.showSerialStatus, "isOver": String(x.isOver), "updateDayOfWeek": x.updateDayOfWeek, "updateDayTime": x.updateDayTime, "lastVideoName": x.lastVideoName, "caption": x.caption, "description": x.description, "paymentType": x.paymentType, "recoReason": x.recoReason, "acfunOnly": String(x.acfunOnly), "likeCount": x.likeCount, "stowCount": x.stowCount, "shareUrl": x.shareCount, "playCount": x.playCount, "areaShow": x.areaShow, "firstPlayDate": x.firstPlayDate, "lastUpdateItemTimeStr": x.lastUpdateItemTimeStr, "updateDayTimeStr": x.updateDayTimeStr });
        }

    }
}

/**
 * 将全部的番剧数据放入数据库
 * @param {object} Data Bangumi Api Data
 */
function db_putMyBangumi_Full(Data) {
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

function db_insertHistoricalAchievs(acid, tag) {
    inithistoricalAchieve();
    db4.open();
    db4.historical.put({
        "acid": acid, "date": new Date, "tag": tag
    })
}

//----------------------Get-Obj-----------------
async function db_getSquareList(limitNum) {
    //获取推送列表前多少个条目
    db2.open();
    let x = await db2.SquareList.orderBy("acmid").reverse().limit(limitNum).toArray();
    db2.close();
    return x;
}

async function db_getPushListHtml() {
    //获取推送列表HTML
    initPushListHtml();
    db.open();
    let x = await db.PushListHtml.orderBy("id").toArray();
    db.close();
    return x;
}

async function db_getLuckyHistory(requireExportType) {
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

async function db_getHistoryViews() {
    initHistoryViews();
    db.open();
    let x = await db.HistoryViews.orderBy("id").reverse().toArray();
    db.close();
    return x[0];
}

async function db_getPushLstMany(limitNum) {
    //获取推送列表前多少个条目
    db.open();
    let x = await db.PushList.orderBy("acid").reverse().limit(limitNum).toArray();
    db.close();
    return x;
}

async function db_getPushLstByAcid(Acid, limitNum = 30) {
    //获取某个推送中的稿件
    initPushList();
    db.open();
    let x = await db.PushList.where({ "acid": Acid }).toArray();
    db.close();
    return x;
}

async function db_getUserMomentFromLocal(uid) {
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
async function db_getMybangumi(mode, orderType = '', limitKey = '', limitValue = '') {
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

async function db_getBangumiNum() {
    initMyBangumi();
    return await db3.MyBangumi.count((e) => { return e });
}

async function db_getHistoricalAchievs(acid) {
    inithistoricalAchieve();
    var result;
    db4.open();
    result = await db4.historical.where("acid").equals(acid).toArray();
    db4.close();
    return result;
}

//----------------------Clear-DB-----------------
function db_clearMyBangumi() {
    // db3["MyBangumi"].clear();
    db3.MyBangumi.clear();
}