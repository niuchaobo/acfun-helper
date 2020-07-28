async function contentHandler(){
    let a = await fetchResult("https://api-new.app.acfun.cn/rest/app/feed/feedSquareV2?pcursor=&count=20");
    let x = JSON.parse(a);
    for (let index = 0; index < x.feedList.length; index++) {
        let nod = document.createElement("div");
        let avatar = x.feedList[index].user.userHead
        let Uname = x.feedList[index].user.userName
        let sign = x.feedList[index].userInfo.signature
        // console.log(x.feedList[index].moment.imgs)
        try {
            var picNum = x.feedList[index].moment.imgs.length
        } catch (error) {
            var picNum = 0
        }
        let pic = Boolean(picNum)?x.feedList[index].moment.imgs[0].originUrl:false
        let content = x.feedList[index].moment.text
        let mid = x.feedList[index].moment.momentId
        let card = `<br>
        <div class="mdui-card">
        <!-- 卡片头部，包含头像、标题、副标题 -->
        <div class="mdui-card-header">
          <img class="mdui-card-header-avatar" src="${avatar}"/>
          <div class="mdui-card-header-title">${Uname}</div>
          <div class="mdui-card-header-subtitle">${sign}</div>
        </div>`
        if(Boolean(pic)){card +=
        `<!-- 卡片的媒体内容，可以包含图片、视频等媒体内容，以及标题、副标题 -->
        <div class="mdui-card-media">
          <img class="mediaPic" src="${pic}"/>
        </div>`}
        card+=
        `
        <!-- 卡片的内容 -->
        <div class="mdui-card-content">${content}</div>
        <div class="mdui-card-actions">
        <button class="mdui-btn mdui-ripple checkIt" data-key=${mid}><a class="btn-a" href="https://m.acfun.cn/communityCircle/moment/${mid}" target="_blank">查看</a></button>
        </div>
        </div><br>`
        nod.innerHTML = card;
        document.getElementById("content-container").append(nod);
    }
}
contentHandler()