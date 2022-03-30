/**
 * IndexedDB 驱动
 */
const db = new Dexie("acfunhelper");
const db4 = new Dexie("acfunhelper-historicalAchieve");

const indexdbArch = {
    "acfunhelper": {
      dbId: 1,
      tables: {
        PushList: 'uid,acid,userName,date',
        PushListHtml: 'id,content',
        LuckyHistory: 'uid,acid,userName,date',
        HistoryViews: 'id,historyArray',
      },
    }, "acfunhelper-square": {
      dbId: 2,
      tables: {
        SquareList: 'acmid,uid,time,userInfo,commentNum,bananaCount,content',
      },
    }, "acfunhelper-bangumi": {
      dbId: 3,
      tables: {
        MyBangumi: "coverUrls,showPlayCount,shareCount,commentCount,showStowCount,showSerialStatus,isOver,updateDayOfWeek,updateDayTime,bangumiId,lastVideoName,caption,description,paymentType,recoReason,acfunOnly,likeCount,stowCount,shareUrl,playCount,areaShow,firstPlayDate,lastUpdateItemTimeStr,updateDayTimeStr",
      },
    }, "acfunhelper-historicalAchieve": {
      dbId: 5,
      tables: {
        historical: "acid,date,tag",
      },
    },
  }
  

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
    initPushListHtml();
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

//----------------------Put-Obj-----------------
function db_putPushListHtml(Data) {
    initPushListHtml();
    db.open();
    if (Data != null && Data != undefined) {
        db.PushListHtml.put({ id: 1, content: Data });
    }
    db.close();
}

function db_insertHistoricalAchievs(acid, tag) {
    inithistoricalAchieve();
    db4.open();
    db4.historical.put({
        "acid": acid, "date": new Date, "tag": tag
    })
}

//----------------------Get-Obj-----------------
async function db_getPushListHtml() {
    //获取推送列表HTML
    initPushListHtml();
    db.open();
    let x = await db.PushListHtml.orderBy("id").toArray();
    db.close();
    return x;
}

async function db_getHistoryViews() {
    initHistoryViews();
    db.open();
    let x = await db.HistoryViews.orderBy("id").reverse().toArray();
    db.close();
    return x[0];
}

async function db_getHistoricalAchievs(acid) {
    inithistoricalAchieve();
    var result;
    db4.open();
    result = await db4.historical.where("acid").equals(acid).toArray();
    db4.close();
    return result;
}
