/**
 * IndexedDB 驱动
 */
const db = new Dexie("acfunhelper");
// this.db.close();
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

function db_putPushLst(Data){
    db.version(1).stores({
        PushList: 'acid,content',
    });
    if(Data==""){
        for(let i=0;i<=29;i++){
            let x = Data.feedList[i];
            db.PushList.put({acid:x.aid,content:x});
        }
    }
}