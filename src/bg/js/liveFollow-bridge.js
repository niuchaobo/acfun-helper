async function getUid(){
    let Uid = await getStorage('LocalUserId');
    return Uid.LocalUserId
}

async function getResult(url) {
    // console.log(url)
    return new Promise((resolve, reject) => {
        fetch(url)
        .then((res)=>{return res.text();})
        .then((res)=>{
            let x=res;
            resolve(x);
        })
    });
}

async function getFollowingNum() {
    return new Promise((resolve, reject) => {
    fetch(`https://www.acfun.cn/rest/pc-direct/user/personalInfo?`).then((res)=>{return res.text()})
    .then((res)=>{
        let x = JSON.parse(res);
        let followingNum = Number(x.info.following);
        resolve(followingNum)
    });
  });
}

async function computePageNum(){
    let totalNum = await getFollowingNum();//总数
    let remainNum = totalNum%100; //剩余
    let comple = totalNum - remainNum;//整
    let multip = (comple/100)+1 //页数
    return multip
}

async function getFollowings() {
    let Uid = await getUid();
    let Page = await computePageNum();
    let result = []
    for(let i=1;i<Page+1;i++){
        let x = JSON.parse(await getResult(`https://api-new.acfunchina.com/rest/app/relation/getFollows?toUserId=${Uid}&pcursor=&count=100&page=${i}&groupId=0&action=7`));
        result.push(x.friendList);
    }
    return new Promise((resolve, reject) => {
        resolve(result);
    })
}

async function Processing(){
    let liveFloowings = await getStorage('liveFloowings');
    let result = await getFollowings();
    for(let i =0;i<result.length;i++){
        let childPageNum = result[i].length
        for(let j=0;j<childPageNum;j++){
            if(result[i][j].userId in liveFloowings.liveFloowings){
                //关注的
                $("div.mdui-list").append(`<label class="mdui-list-item mdui-ripple" data-key=${result[i][j].userId} ><div class="mdui-checkbox"><input class="switch" data-key=${result[i][j].userId} type="checkbox" checked/><i class="mdui-checkbox-icon" data-key=${result[i][j].userId} ></i></div><div class="mdui-list-item-content" data-key=${result[i][j].userId}>${result[i][j].userName}</div><i class="mdui-list-item-icon mdui-icon material-icons"><a href="https://www.acfun.cn/u/${result[i][j].userId}" target="_blank">chat</a></i></label>`)
                console.log(result[i][j].userId);
            }else{
                //未关注的
                $("div.mdui-list").append(`<label class="mdui-list-item mdui-ripple" data-key=${result[i][j].userId} ><div class="mdui-checkbox"><input class="switch" data-key=${result[i][j].userId} data-name=${result[i][j].userName} type="checkbox"/><i class="mdui-checkbox-icon" data-key=${result[i][j].userId} ></i></div><div class="mdui-list-item-content" data-key=${result[i][j].userId}>${result[i][j].userName}</div><i class="mdui-list-item-icon mdui-icon material-icons"><a href="https://www.acfun.cn/u/${result[i][j].userId}" target="_blank">chat</a></i></label>`)
            }
        }
    }
    chrome.storage.local.get(['liveFloowings'],function(items){
    $('.switch').click(function () {
        if(!$(this).is(":checked")){
            let this_uid=$(this).data("key");
            let this_uName=$(this).data("name");
            console.log(this_uid);
            console.log(this_uName)
            mdui.snackbar({
                message: `已取消关注 "${this_uName}"`,
            });
            delete items.liveFloowings[this_uid];
            chrome.storage.local.set({'liveFloowings':items.liveFloowings});
        }else{
            let this_uid=$(this).data("key");
            let this_uName=$(this).data("name");
            console.log(this_uid);
            console.log(this_uName)
            mdui.snackbar({
                message: `已关注 "${this_uName}"`,
            });
            items.liveFloowings[this_uid]=this_uName;
            chrome.storage.local.set({'liveFloowings':items.liveFloowings});
        }
        });
    });
}

window.addEventListener('load', e => onLoad(e));

function notif(){
    mdui.snackbar({
        message: '本页面包含你所有的关注，如果条目多，请使用Ctrl+F查找。',
        position: 'right-top',
        timeout:0,
        closeOnOutsideClick:true,
    });
}

function onLoad(){
    notif();
    Processing();
}
