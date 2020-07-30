var squareListData = {
  index: 1, // 推送当前页码
  firstLoad: true, // 第一次加载推送列表
};

function renderFunc(x,type = 0){
  var num
  if(type==0){num = x.feedList.length}else{num = x.length}
  for (let index = 0; index < num; index++) {
    var nod = document.createElement("div");
    if(type==0){
      var avatar = x.feedList[index].user.userHead
      var Uname = x.feedList[index].user.userName
      var sign = x.feedList[index].userInfo.signature
      try {
          var picNum = x.feedList[index].moment.imgs.length
      } catch (error) {
          var picNum = 0
      }
      var pic = Boolean(picNum)?x.feedList[index].moment.imgs[0].originUrl:false
      var content = x.feedList[index].moment.text
      var mid = x.feedList[index].moment.momentId
      var releTime = x.feedList[index].createTime
      var banana = x.feedList[index].bananaCount
      var comNum = x.feedList[index].commentCount
    }else if(type==1){
      var avatar = x[index].userInfo.headUrl
      var Uname = x[index].userInfo.name
      var sign = x[index].userInfo.signature
      try {
          var picNum = x[index].content.imgs.length
      } catch (error) {
          var picNum = 0
      }
      var pic = Boolean(picNum)?x[index].content.imgs[0].originUrl:false
      var content = x[index].content.text
      var mid = x[index].content.momentId
      var releTime = x[index].time
      var banana = x[index].bananaCount
      var comNum = x[index].commentNum
    }
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
    <div class="mdui-card-primary">
    <div class="mdui-card-primary-subtitle">${getTimeSinceNow(releTime)} - 香蕉： ${banana} - 评论： ${comNum}</div>
    </div>
    <!-- 卡片的内容 -->
    <div class="mdui-card-content">${content}</div>
    <div class="mdui-card-actions">
    <button class="mdui-btn mdui-ripple checkIt" data-key=${mid}><a class="btn-a" href="https://m.acfun.cn/communityCircle/moment/${mid}" target="_blank">查看</a></button>
    </div>
    </div><br>`
    // console.log(card)
    nod.innerHTML = card;
    document.getElementById("content-container").append(nod);
  }
}

async function contentHandler(){
  if(squareListData.firstLoad){
    let a = await fetchResult("https://api-new.app.acfun.cn/rest/app/feed/feedSquareV2?pcursor=&count=20");
    let x = JSON.parse(a);
    db_putSquareList(x);
    renderFunc(x,0);
  }
}

async function getFromIndexed(){
  let a = await db_getSquareList(10);
  renderFunc(a,1)
}

function continuous(){
  window.onscroll = function () {
    if ((getScrollHeight() == Math.floor(getDocumentTop()+getWindowHeight()) || getScrollHeight() == Math.ceil(getDocumentTop()+getWindowHeight()) ) && !squareListData.firstLoad) {
        // console.log("scroll to bottom");
        mdui.snackbar({
          message: '加载中'
        });
        getFromIndexed();
    }
  }
}

contentHandler()
squareListData.firstLoad = false;
continuous()