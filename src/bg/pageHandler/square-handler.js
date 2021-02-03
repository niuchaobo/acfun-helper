var squareListData = {
  index: 0,
  firstLoad: true,
};
var globalSqlist = [];

function renderFunc(x, type = 0) {
  var num;
  if (type == 0) {
    num = x.feedList.length;
  } else {
    num = x.length;
  }
  for (let index = 0; index < num; index++) {
    var nod = document.createElement("div");
    if (type == 0) {
      var avatar = x.feedList[index].user.userHead;
      var Uname = x.feedList[index].user.userName;
      var sign = x.feedList[index].userInfo.signature;
      try {
        var picNum = x.feedList[index].moment.imgs.length;
      } catch (error) {
        var picNum = 0;
      }
      var pic = Boolean(picNum)
        ? x.feedList[index].moment.imgs[0].originUrl
        : false;
      var content = x.feedList[index].moment.text;
      var mid = x.feedList[index].moment.momentId;
      var releTime = x.feedList[index].createTime;
      var banana = x.feedList[index].bananaCount;
      var comNum = x.feedList[index].commentCount;
    } else if (type == 1) {
      var avatar = x[index].userInfo.headUrl;
      var Uname = x[index].userInfo.name;
      var sign = x[index].userInfo.signature;
      try {
        var picNum = x[index].content.imgs.length;
      } catch (error) {
        var picNum = 0;
      }
      var pic = Boolean(picNum) ? x[index].content.imgs[0].originUrl : false;
      var content = x[index].content.text;
      var mid = x[index].content.momentId;
      var releTime = x[index].time;
      var banana = x[index].bananaCount;
      var comNum = x[index].commentNum;
    }
    content = setContent(content);
    let card = `
    <div class="mdui-card card-initial">
    <div class="mdui-card-header">
      <img class="mdui-card-header-avatar" src="${avatar}"/>
      <div class="mdui-card-header-title">${Uname}${
      sign ? `<div class="u-sign" title="${sign}">${sign}</div>` : ``
      }</div>
      <div class="mdui-card-header-subtitle">- ${getTimeSinceNow(releTime,true)}发布</div>
    </div>
    <div class="mdui-card-content">${content}
    `;
    if (Boolean(pic)) {
      card += `
    <div class="mdui-card-media">
      <img class="lazyload mediaPic" src="./images/prpr.jpg" data-src="${pic}"/>
    </div>`;
    }
    card += `
    </div>
    <div class="mdui-card-actions">
        <div class="mdui-card-primary-subtitle">香蕉： ${banana}</div>
        <div class="mdui-card-primary-subtitle">评论： ${comNum}</div>
        <div class="mdui-card-primary-subtitle" data-key=${mid}><a class="btn-a" href="https://m.acfun.cn/communityCircle/moment/${mid}" target="_blank">查看</a></div>
    </div>
    </div>
    <br>`;
    nod.innerHTML = card;
    document.getElementById("content-container").append(nod);
  }
}

function setContent(content) {
  let atReg = new RegExp("\\[at uid=(\\d+)\\](@\\S+)\\[/at\\]", "g");
  let acReg = new RegExp("\\[ac=(\\d+)@(\\w+)\\](ac\\d+)\\[/ac\\]","g");
  let tagReg = new RegExp("\#([^#]+)\#","g")
  content = content.replace(atReg, function (reg, $1, $2) {
    return ` <a class = "atReg" href=https://www.acfun.cn/u/${$1} target='_new'>${$2}</a>`;
  })
  content = content.replace(acReg,function(reg,$1,$2,$3,$4){
    if($2 === 'video'){
        return ` <a class = "acReg" href=https://www.acfun.cn/v/${$3} target='_new'>${$3}</a>`;
    }
    if($2 === 'article'){
        return ` <a class = "acReg" href=https://www.acfun.cn/a/${$3} target='_new'>${$3}</a>`;
    }
  })
  content = content.replace(tagReg,function(reg,$1){
        return ` <a class = "tagReg" href=https://www.acfun.cn/search?keyword=${$1} target='_new'>${reg}</a>`;
  })
  return content;
}

async function contentHandler() {
  if (squareListData.firstLoad) {
    let a = await fetchResult(
      "https://api-new.app.acfun.cn/rest/app/feed/feedSquareV2?pcursor=&count=20"
    );
    let x = JSON.parse(a);
    if (x.feedList.length <= 5) {
      globalSqlist = await getFromIndexed();
      squareListData.index = 20;
      var sqList = [];
      sqList = globalSqlist.slice(squareListData.index + 1, squareListData.index + 11);
      mdui.snackbar({
        message: '主站获取的数据没有了（不要过多请求哦），加载本地缓存的数据中...'
      });
      renderFunc(sqList, 1);
      squareListData.index += 11;
      return
    }
    db_putSquareList(x);
    renderFunc(x, 0);
  }
}

async function getFromIndexed() {
  let dbMaxNum = await db_SquareListCount();
  let globalSqlist = await db_getSquareList(dbMaxNum);
  return globalSqlist;
}

async function continuous() {
  globalSqlist = await getFromIndexed();
  squareListData.index = 20;
  var sqList = [];
  window.onscroll = function () {
    if (
      (getScrollHeight() == Math.floor(getDocumentTop() + getWindowHeight()) ||
        getScrollHeight() == Math.ceil(getDocumentTop() + getWindowHeight())) &&
      !squareListData.firstLoad
    ) {
      // console.log("scroll to bottom");
      sqList = globalSqlist.slice(
        squareListData.index + 1,
        squareListData.index + 11
      );
      mdui.snackbar({
        message: "加载中...",
      });
      renderFunc(sqList, 1);
      $("img.lazyload").lazyload({ threshold: 0.5 });
      squareListData.index += 11;
    }
  };
}

$("#refreshHere").on("click", function () {
  location.reload();
});

let cssText = `
        .mdui-container{
            width:85vw;
        }
        .mudi-card {
            padding-top:20px;
        }
        .card-initial{
            overflow: initial !important;
            border-radius: 5px 20px 5px 20px;
        }
        .mdui-card-header {
            padding:16px 0 0 20px;
        }
        .u-sign{
            font-size: 12px;
            color: #a0a0a0;
            font-weight: normal;
            padding: 0 10px;
            max-width: 55vw;
            display: inline-block;
        }
        .mdui-card-content {
            padding:10px 20px;
            margin:0px 71px 10px;
            border:.5px solid #cccccc52;
            border-radius: 0px 10px 10px 10px;
            display:inline-block;
            z-index:2;
        }
        .mdui-card-content>a{
            text-decoration: none;
            font-weight: bold;
        }
        .mdui-card-content>a.atReg{
            color: #ff008c;
        }
        .mdui-card-content>a.acReg{
            color: #007cffc9;
        }
        .mdui-card-content>a.tagReg{
            color: #ff0000c4;
        }
        .mdui-card-media{
            width:auto !important;
            max-width: 20vw;
            padding-top: 10px;
            min-width: 10vw;
           
        }
        img.mediaPic{
            transition-duration:.2s;
            transform-origin: 0% 0%;
            background: #cccccc24;
            border-radius: 5px;
            padding: 5px;
        }
        img.mediaPic:hover{
            background: #a9a9a957;
            transition-delay:.5s;
            transform: scale(1.8);
        }
        .mdui-card-content:hover{
            z-index:3
        }
        .mdui-card-actions{
            display:flex;
            z-index:1;
        }
        .mdui-card-actions>div{
            flex:1;
            text-align:center;
            border-left: 1px #ccc solid;
        }
        .mdui-card-actions>div:nth-child(1){
            border-left: 0px;
        }
        .mdui-snackbar-bottom, .mdui-snackbar-top{
            left: 85%;
            background-size: 200% 100%;
            background-image: -webkit-linear-gradient(left, #000000 30%,#4c4c4c 55%, #777777 60%,#000000 80%);
            animation: masked-animation 2s infinite linear;
        }
        .btn-a{
            color:red;
        }
        @-webkit-keyframes masked-animation {
            0% {
                background-position: 0 0;
            }
            100% {
                background-position: -200% 0;
            }
        }
    `;
createElementStyle(cssText);

function onReady(e) {
  contentHandler().then(() => {
    $("img.lazyload").lazyload({ threshold: 0.5 });
  })
  squareListData.firstLoad = false;
  continuous();
}
window.addEventListener('load', e => onReady(e));
