/**
 * IndexedDB 驱动
 */
const db = new Dexie("acfunhelper");
const db2 = new Dexie("acfunhelper-square");
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

//----------------------Utils-Func-----------------

async function db_SquareListCount(){
    initSquareList();
    let x = await db2.SquareList.count((e)=>{
        return e
    })
    return x
}

//----------------------Init-Table-------------------

function initSquareList(){
    try {
        db2.SquareList.count(function(e){
            // console.log(e)
        })
    } catch (error) {
        console.log("[WARN]Background-IndexedDbDrv > initSquareList:Table May Not Exist.")
        db2.version(2).stores({
            SquareList: 'acmid,uid,time,userInfo,commentNum,bananaCount,content',
        });
        db2.open();
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
        db.open()
    }
}

function initPushListHtml(){
    try {
        db.PushListHtml.count(function(e){
            // console.log(e)
        })
    } catch (error) {
        console.log("[WARN]Background-IndexedDbDrv > initPushListHtml:Table May Not Exist.")
        db.version(1).stores({
            PushListHtml: 'id,content',
        });
        db.open();
        console.log("[WARN]Background-IndexedDbDrv > initPushListHtml:Table initializing.")
    }
}

//----------------------Put-Obj-----------------

function db_putPushListHtml(Data){
    // console.log(Data)
    initPushListHtml();
    if(Data!= null && Data !=undefined){
        db.PushListHtml.put({id:1,content:Data});
    }
}

function db_putSquareList(Data){
    // console.log(Data)
    initSquareList();
    if(Data.feedList.length != 0){
        for(let i=0;i<=Data.feedList.length-1;i++){
            let x = Data.feedList[i];
            db2.SquareList.put({acmid:x.resourceId,uid:x.authorId,time:x.createTime,userInfo:x.userInfo,commentNum:x.commentCount,bananaCount:x.bananaCount,content:x.moment});
        }
    }
    // db2.close();
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

//----------------------Get-Obj-----------------

async function db_getSquareList(limitNum){
    //获取推送列表前多少个条目
    initSquareList();
    let x = await db2.SquareList.orderBy("acmid").reverse().limit(limitNum).toArray();
    db2.close()
    return x;
}

async function db_getPushListHtml(){
    //获取推送列表HTML
    initPushListHtml();
    let x = await db.PushListHtml.orderBy("id").reverse().toArray();
    db.close()
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