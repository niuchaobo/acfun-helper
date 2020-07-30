/**
 * IndexedDB 驱动
 */
const db = new Dexie("acfunhelper");
const Pushlist_struct = "goldBanana,userId,title,channelId,author,isSignedUpCollege,isArticle,views,vid,allowDanmaku,stows,titleImg,shareUrl,releaseDate,danmakuSize,avatar,errorlog,score,contentClass,cid,userImg,verifiedType,verifiedText,aid,time,url,comments,sign,tags,description,success,username"
const Pushlist_Commonstruct="aid,userId"



function test(){
    //dexie 官网上的示例
    db.version(1).stores({
        friends: 'name,shoeSize'
    });
    db.friends.put({name: "Nicolas", shoeSize: 8}).then (function(){
        return db.friends.get('Nicolas');
    }).then(function (friend) {
        console.log("Nicolas has shoe size " + friend.shoeSize);
    }).catch(function(error) {
        alert ("Ooops: " + error);
    });
}

async function judgeDbExist(dbName) {
    return new Promise((resolve, reject) => {
        Dexie.exists(dbName).then(function(exists) {
            if (exists){
                resolve(true);
            }else{
                resolve(false);
            }
        }).catch(function (error) {
            console.error("[ERROR]Background-IndexedDbDrv > judgeDbExist: Oops, an error occurred when trying to check database existance");
        });
    });
}

function test1(){
    db.version(1).stores({
        a: 'id,content',
    });
    db.a.put({id:4,content: "23334"});
    console.log(db.a.get(4));
}

function SquareListCount(){
    //广场对象数
    try {
        db.SquareList.count(function(e){
            return e
        })
    } catch (error) {
        return 0
    }

}

function initSquareList(){
    //广场表初始化
    try {
        db.SquareList.count(function(e){
            console.log(e)
        })
    } catch (error) {
        console.log("[WARN]Background-IndexedDbDrv > initSquareList:Table May Not Exist.")
        db.version(1).stores({
            SquareList: 'acmid,uid,time,userInfo,commentNum,bananaCount,content',
        });
        console.log("[WARN]Background-IndexedDbDrv > initSquareList: Table initialize.")
    }
}

function initPushList(){
    try {
        db.PushList.count(function(e){
            // console.log(e)
        })
    } catch (error) {
        console.log("[WARN]Background-IndexedDbDrv > initPushList:Table May Not Exist.")
        db.version(1).stores({
            PushList: 'acid,uid,content',
        });
    }
}

function db_putSquareList(Data){
    //广场数据写入
    initSquareList();
    if(Data.feedList.length != 0){
        for(let i=0;i<=Data.feedList.length-1;i++){
            let x = Data.feedList[i];
            db.SquareList.put({acmid:x.resourceId,uid:x.authorId,time:x.createTime,userInfo:x.userInfo,commentNum:x.commentCount,bananaCount:x.bananaCount,content:x.moment});
        }
    }
    // db.close();
}

function db_putPushLst(Data){
    // console.log(Data)
    initPushList();
    if(Data.length != 0){
        for(let i=0;i<=29;i++){
            let x = Data.feedList[i];
            db.PushList.put({acid:x.aid,uid:x.userId,content:x});
        }
    }
    // db.close();
}

async function db_getSquareList(limitNum){
    //获取广场前多少个条目
    initSquareList();
    let x = await db.SquareList.orderBy("acmid").reverse().limit(limitNum).toArray();
    return x;
}

async function db_getPushLstMany(limitNum){
    //获取推送列表前多少个条目
    initPushList();
    let x = await db.PushList.orderBy("acid").reverse().limit(limitNum).toArray();
    return x;
}

async function db_getPushLstByAcid(Acid,limitNum=30){
    //获取某个推送中的稿件
    initPushList();
    let x = await db.PushList.where({"acid":Acid}).toArray();
    return x;
}