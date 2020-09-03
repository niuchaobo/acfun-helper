/**
 * 通知、提醒和推送的后台守护模块
 */
class MsgNotifs{
    constructor(){

    }

    liveOnlineNotif(){
        console.log('Start LiveUpNotificationFetching Mod.')
        window.setInterval(function(){
            chrome.storage.local.get(['liveFloowNotif'],function(Ifswitch){
            if(Ifswitch.liveFloowNotif){
                chrome.storage.local.get(['liveFloowings'],function(items){
                chrome.storage.local.get(['broadcastingUIDlist'],function(broadcastingUIDlist){
                    // console.log(broadcastingUIDlist);
                    let y={}
                    if(JSON.stringify(broadcastingUIDlist)=='{}'){
                        chrome.storage.local.get(['liveFloowings'],function(a){for(let j in items.liveFloowings){y[j]=false}});
                        chrome.storage.local.set({'broadcastingUIDlist':y});
                        console.log('BroadcastingUIDlist Is Blank. Filling...')
                        return;
                    }
                    for(let i in items.liveFloowings){
                        //i就是UID
                        let ApiUrl='https://www.acfun.cn/rest/pc-direct/user/userInfo?userId='
                        fetch(ApiUrl+i).then((res)=>{return res.text()})
                        .then((res)=>{
                            let x=JSON.parse(res);
                            if(x.profile.liveId != undefined){
                                var state=true;
                            }else{
                                var state=false;
                            }
                            y[i]=state;
                            if(state==broadcastingUIDlist.broadcastingUIDlist[i]){
                                // console.log('same!');
                            }else{
                                let lastState=broadcastingUIDlist.broadcastingUIDlist[i]
                                if(lastState==false){
                                chrome.notifications.create(null, {
                                    type: 'basic',
                                    iconUrl: 'images/notice.png',
                                    title: 'AcFun助手',
                                    message: `${x.profile.name}  正在直播了！`
                                });
                                }else{
                                    // console.log(`${x.profile.name}  下播了！`);
                                    // chrome.notifications.create(null, {
                                    //     type: 'basic',
                                    //     iconUrl: 'images/notice.png',
                                    //     title: 'AcFun助手',
                                    //     message: `${x.profile.name}  下播了！`
                                    // });
                            }}
                            chrome.storage.local.set({'broadcastingUIDlist':y});
                            // chrome.storage.local.get(['broadcastingUIDlist'],function(e){console.log(e)});
                        });
                    }
                });
                });
            }
            });
        },60000);
    }

    async followLiveNotifEx(){
        chrome.storage.local.get(['LocalUserId'],async(Uid)=>{
            if(Uid.LocalUserId=="0"){return}
            let broadcastingUIDlistFollowing = await getResult('broadcastingUIDlistFollowing');
            let y={}
            if(JSON.stringify(broadcastingUIDlistFollowing)=='{}'){
                chrome.storage.local.set({'broadcastingUIDlistFollowing':y});
                console.log('BroadcastingUIDlistFollowing Is Blank. Filling...')
                return;
            }
            let rawResult = await fetchResult("https://live.acfun.cn/api/channel/list?count=56&pcursor=&filters=[%7B%22filterType%22:3,+%22filterId%22:0%7D]");
            let result = JSON.parse(rawResult);
            for(let i=0;i<result.liveList.length;i++){
                y[result.liveList[i].authorId] = true;
            }
            let a = await getStorage('broadcastingUIDlistFollowing');
            // console.log(a)
            let b = Object.keys(a.broadcastingUIDlistFollowing);
            let c = Object.keys(y);
            let j,k
            for(j in b){
                if(c.indexOf(b[j])!=-1){
                }else{
                    y[b[j]]=false;
                }
            }
            if(b.length<c.length){
                for(let l=0;l<c.length;l++){
                    if(b.indexOf(c[l])==-1){
                        // console.log(l)
                        // console.log(c[l])
                        let uInfo = await fetchResult(`https://www.acfun.cn/rest/pc-direct/user/userInfo?userId=${c[l]}`)
                        // console.log(`${JSON.parse(uInfo).profile.name}  正在直播了！`)
                        chrome.notifications.create(null, {
                            type: 'basic',
                            iconUrl: 'images/notice.png',
                            title: 'AcFun助手',
                            message: `${JSON.parse(uInfo).profile.name}  正在直播了！`
                        });
                    }
                }
            }
            for(k in b){
                // console.log(b.indexOf(b[k])==-1)
                if(a.broadcastingUIDlistFollowing[b[k]] != y[b[k]] && y[b[k]]== true){
                    let uInfo = await fetchResult(`https://www.acfun.cn/rest/pc-direct/user/userInfo?userId=${b[k]}`)
                    // console.log(`${JSON.parse(uInfo).profile.name}  正在直播了！`)
                    chrome.notifications.create(null, {
                        type: 'basic',
                        iconUrl: 'images/notice.png',
                        title: 'AcFun助手',
                        message: `${JSON.parse(uInfo).profile.name}  正在直播了！`
                    });
                }
            }
            chrome.storage.local.set({'broadcastingUIDlistFollowing':y});
        })
    }

    async followLiveNotif(){
        chrome.storage.local.get(['followLiveNotif'],(Ifswitch)=>{
            console.log('Start FollowingLiveNotificationFetching Mod.')
            if(Ifswitch.followLiveNotif){
                this.followLiveNotifEx();
                window.setInterval(()=>{
                    this.followLiveNotifEx();
                },120000);
            }
        })
    }
    async timer4Unread(){
        console.log("Start timer4Unread Mod");
        window.setInterval(async function(){
            let sw = await getStorage("timer4Unread_daemonsw")
            if(sw.timer4Unread_daemonsw==false){chrome.browserAction.setTitle({title:`AcFun助手，Ac在爱一直在`});chrome.browserAction.setBadgeText({ text: "" });return}
            chrome.storage.local.get(['LocalUserId'],function(Uid){
                if(Uid.LocalUserId=="0"){return}
                fetch('https://member.acfun.cn/common/api/getUnreadMess',{method:"POST",headers: {
                        'Content-Type': 'application/x-www-form-urlencoded','Accept':"accept: application/json, text/plain, */*"},body:""})
                .then((res=>{return res.text()}))
                .then((res)=>{
                    let b=JSON.parse(res);
                    let a0=b.unReadCount.new_comment;//评论
                    let a1=b.unReadCount.new_comment_like;//赞
                    let a2=b.unReadFollowFeedCount;//动态
                    let a3=b.unReadCount.new_content_notify;//系统通知
                    let a4=b.unReadCount.new_system_notify;//站内公告
                    var pushNum=a0+a1+a2+a3+a4;
                    chrome.browserAction.setTitle({title:`AcFun助手，Ac在爱一直在；\n通知\n评论未读：${a0}\n点赞：${a1}\n系统通知：${a3}\n站内公告：${a4}`})
                    // console.log(pushNum);
                    if(pushNum>0){
                        chrome.browserAction.setBadgeText({ text: pushNum.toString() });
                    }else{
                        chrome.browserAction.setBadgeText({ text: "" });
                    }
                })
            })
        },60000)
    }

    fetchPushList(){
        console.log("Start PushListFetching Mod");
        window.setInterval(async function(){
            let sw = await getStorage("fetchPushList_daemonsw")
            if(sw.fetchPushList_daemonsw==false){return}
            chrome.storage.local.get(['LocalUserId'],function(Uid){
                if(Uid.LocalUserId=="0"){return}
                fetch('https://www.acfun.cn/rest/pc-direct/feed/followFeed?isGroup=0&gid=-1&count=30&pcursor=1')
                    .then((res)=>{return res.text();})
                    .then((res)=>{
                        let rawdata=JSON.parse(res);
                        //调用indexeddb驱动，写入indexeddb。以后将会慢慢迁移。
                        // db_putPushLst(rawdata);
                        let out_data='';
                        for(let i=0;i<=29;i++){
                            let data=rawdata.feedList[i];
                            let xmlData="<div class=\"inner\" id=\"";
                            xmlData+=data.aid+"\">" + "<div class=\"l\"><a target=\"_blank\" href=\"";
                            xmlData+="https://www.acfun.cn"+data.url+"\"";
                            xmlData+=" class=\"thumb thumb-preview\"><img data-aid=\"";
                            xmlData+=data.aid + "\" src=\""+data.titleImg+"\" class=\"preview\"> <div class=\"cover\"></div> </a> </div> <div class=\"r\"> <a data-aid=\""+data.aid+" \"target=\"_blank\" href=\"" +"https://www.acfun.cn"+data.url+"\" class=\"title\">";
                            xmlData+=data.title+"</a> </p> <div class=\"info\"><a target=\"_blank\" data-uid=\"";
                            xmlData+=data.aid+"\" href=\"https://www.acfun.cn/u/"+data.userId+"\" class=\"name\">";
                            xmlData += data.username + " </a><span class=\"time\">" + getTimeSinceNow(data.releaseDate) + "发布</span> </div> </div> </div> ";
                            out_data+=xmlData;
                        }
                        // chrome.storage.local.set({'AcpushList1': out_data});
                        db_putPushListHtml(out_data);
                    });
            })
        },60000)
    }
        
}