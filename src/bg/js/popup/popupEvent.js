/* global odhback, optionsLoad, optionsSave*/

export function openUpdateLog() {
  window.open("https://github.com/niuchaobo/acfun-helper/commits/master");
}

export function openIntroduce() {
  //window.open("guide.html","_blank");
  var a = $("<a href='guide.html' target='_blank'></a>").get(0);
  var e = document.createEvent("MouseEvents");
  e.initEvent("click", true, true);
  a.dispatchEvent(e);
}

export function openSetting() {
  //window.open("options.html","_blank");
  var a = $("<a href='options.html' target='_blank'></a>").get(0);
  var e = document.createEvent("MouseEvents");
  e.initEvent("click", true, true);
  a.dispatchEvent(e);
}

export function indexJump() {
  switch (this.id) {
    case 'pop-toUcenter':
      var a = $("<a href='https://www.acfun.cn/member/#area=splash' target='_blank'></a>").get(0);
      var e = document.createEvent("MouseEvents");
      e.initEvent("click", true, true);
      a.dispatchEvent(e);
      break;
    case 'pop-toLiveIndex':
      var a = $("<a href='https://live.acfun.cn/' target='_blank'></a>").get(0);
      var e = document.createEvent("MouseEvents");
      e.initEvent("click", true, true);
      a.dispatchEvent(e);
      break;
    case 'pop-toArticlePart':
      var a = $("<a href='https://www.acfun.cn/v/list63/index.htm' target='_blank'></a>").get(0);
      var e = document.createEvent("MouseEvents");
      e.initEvent("click", true, true);
      a.dispatchEvent(e);
      break;
    default:
      break;
  }
}

export function watchLive() {
  let uid = $("#live-id").val();
  //不输入uid时，跳转到直播首页（以前是404）
  let reg = /^\d{1,}$/;
  let pattern = new RegExp(reg);
  let url = pattern.test(uid)
    ? `http://live.acfun.cn/live/${uid}`
    : `https://live.acfun.cn/`;
  var a = $("<a href='" + url + "' target='_blank'></a>").get(0);
  var e = document.createEvent("MouseEvents");
  e.initEvent("click", true, true);
  a.dispatchEvent(e);
}

export function titleToHome() {
  window.open("https://www.acfun.cn/");
}

export function hideToTopButton() {
  let top = $(".toTop").offset().top;
  if (top < 2000) {
    $(".toTop").css({ opacity: "0" , bottom : '16px'});
    $(".PushListMode").css({right:'16px'})
  } else {
    $(".toTop").css({ opacity: "1" , bottom : '41px'});
    $(".PushListMode").css({right:'60px'})
  }
}

export function clickToTop() {
  $("html,body").animate({ scrollTop: "0px" }, 600);
}

export async function onOptionChanged(e) {
    if (!e.originalEvent) return;
    let options = await optionsLoad();
    options.enabled = $("#extends-enbaled").prop("checked");
    let newOptions = await odhback().opt_optionsChanged(options);
    optionsSave(newOptions);
}

export async function MomentSquareFpop(){
  chrome.tabs.create({url: chrome.extension.getURL('bg/square.html')});
}

export async function WatchLaterFOpenList(){
  mdui.snackbar({
    message: `请移步助手 设置页面 - 内容设置。`,
  });
}

export async function WatchLaterFpopup(){
  chrome.storage.local.get(['watchLater'],function(items){
    if(items.watchLater){
      mdui.snackbar({
        message: `已经启动 稍后再看 排程。`,
      });
      chrome.runtime.sendMessage({action: "watchLater",params:{}}, function (response) {});
    }
  })
}

export async function viewHistory(){
  let x = await db_getHistoryViews();
  var raw_data = "";
  for(let i=x.content.length-1;i>=0;i--){
    var raw_data =raw_data+ `
      <tr>
          <td class="dispLimit">${x.content[i].name}<br>于${getTimeSinceNow(x.content[i].time)}</td>
          <td><a title="Up: ${x.content[i].name}" href="https://www.acfun.cn${Boolean(x.content[i].aid)?"/v/ac"+x.content[i].aid:"/"}" target="_blank">《${x.content[i].title}》</a> </td>
      </tr>
    `;
  }
  $("#ViewHistory").append(raw_data);
  $("#ViewHistoryAction").hide();
}

export async function fetchDougaInfo(){
  let acid = $("#dougaInfoAcid").val();
  let regAcid = new RegExp("ac(.*)");
  if(acid==''){return}
  let x = regAcid.exec(acid);
  x==null?acid=acid:acid=x[1]
  fetch("https://mini.pocketword.cn/api/acfun/info?dougaId=" + acid).then((res)=>{
    if(res.status==503){
      chrome.runtime.sendMessage({action:'notice',params:{title:"AcFun助手",msg:"请不要过于频繁地请求。"}}, function(response) {});
    }
  return res.text()})
  .then((res)=>{
    let x = JSON.parse(res);
    if(x.result!=0){chrome.runtime.sendMessage({action:'notice',params:{title:"AcFun助手",msg:"这可能不是一个视频稿件的AcID。"}}, function(response) {});
    return}
    let raw_data = `
    <div class="mdui-table-fluid">
        <table class="mdui-table">
            <thead>
            <tr>
                <th>#</th>
                <th>Data</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>标题</td>
                <td><a href="${x.shareUrl}" target="blank">${x.title}</a></td>
            </tr>
            <tr>
                <td>播放</td>
                <td>${x.viewCount}</td>
            </tr>
            <tr>
                <td>香蕉</td>
                <td>${x.bananaCount}</td>
            </tr>
            <tr>
                <td>发布</td>
                <td>于 ${getTimeSinceNow(x.createTimeMillis,true)} 过审；于 ${getTimeSinceNow(x.currentVideoInfo.uploadTime,true)} 上传</td>
            </tr>
            <tr>
                <td>弹幕</td>
                <td>${x.danmakuCount}</td>
            </tr>
            <tr>
                <td>收藏</td>
                <td>${x.stowCount}</td>
            </tr>
            <tr>
                <td>简介</td>
                <td>${x.description}</td>
            </tr>
            <tr>
                <td>点赞</td>
                <td>${x.likeCount}</td>
            </tr>
            <tr>
                <td>分享</td>
                <td>${x.shareCount}</td>
            </tr>
            <tr>
                <td>其他属性</td>
                <td>持续时长：${Math.floor(x.currentVideoInfo.durationMillis/1000)}秒 - 原创：${x.originalDeclare?'Y':'N'} - 可见性：${x.currentVideoInfo.visibleType==1?'Y':'N'} - 学院奖励：${x.isRewardSupportted?'Y':'N'} - 文件名：${x.currentVideoInfo.fileName} - 投稿类型：<a href="https://www.acfun.cn/v/list${x.channel.id}/index.htm" target="blank">${x.channel.name}</a></td>
            </tr>
            </tbody>
        </table>
        </div>
    `;
  $("#dougaInfoPrint").append(raw_data);
  })
}

export async function userInfoFetch(){
  let uid = $("#userInfoUid").val();
  let dougaCountFlag = 0;
  if(uid==''){return}
  fetch("https://www.acfun.cn/rest/pc-direct/user/userInfo?userId=" + Number(uid)).then((res)=>{
    if(res.status==503){
      chrome.runtime.sendMessage({action:'notice',params:{title:"AcFun助手",msg:"您操作太过频繁。"}}, function(response) {});
    }
  return res.text()})
  .then((res)=>{
    let x = JSON.parse(res);
    if(x.result!=0){chrome.runtime.sendMessage({action:'notice',params:{title:"AcFun助手",msg:"UID可能存在着某些问题。"}}, function(response) {});return}
    if(x.profile.contentCount!=0){dougaCountFlag=1}
    let raw_data = `
    <div class="mdui-table-fluid">
        <table class="mdui-table">
            <thead>
            <tr>
                <th>#</th>
                <th>Data</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>UID</td>
                <td>${x.profile.userId}</td>
            </tr>
            <tr>
                <td>用户名</td>
                <td>${x.profile.name}</td>
            </tr>
            <tr>
                <td>注册时间</td>
                <td>${getTimeSinceNow(x.profile.registerTime,true)}</td>
            </tr>
            <tr>
                <td>签名</td>
                <td>${(x.profile.signature)}</td>
            </tr>
            <tr>
                <td>关注</td>
                <td>${x.profile.following}</td>
            </tr>
            <tr>
                <td>粉丝</td>
                <td>${x.profile.followed}</td>
            </tr>
            <tr>
                <td>稿件计数</td>
                <td>${x.profile.contentCount}</td>
            </tr>
            </tbody>
        </table>
        </div>
    `;
    $("#UserInfoPrint").append(raw_data);
    if(dougaCountFlag!=1){return}
    fetch(`https://api-new.app.acfun.cn/rest/app/user/resource/query?count=1&authorId=${Number(uid)}&resourceType=2&sortType=3`).then((res)=>{
    return res.text()})
    .then((res)=>{
      let x = JSON.parse(res);
      let raw_data = `
      <div class="mdui-table-fluid">
          <table class="mdui-table">
              <thead>
              </thead>
              <tbody>
              <tr>
                  <td>上次视频投稿时间</td>
                  <td>${getTimeSinceNow(x.feed[0].createTimeMillis,true)}</td>
              </tr>
              </tbody>
          </table>
          </div>
      `;
    $("#UserInfoPrint").append(raw_data);
    })
    fetch(`https://api-new.app.acfun.cn/rest/app/user/resource/query?count=1&authorId=${Number(uid)}&resourceType=3&sortType=3`).then((res)=>{
    return res.text()})
    .then((res)=>{
      let x = JSON.parse(res);
      if(x.feed[0].contributeTime==undefined){return}
      let raw_data = `
      <div class="mdui-table-fluid">
          <table class="mdui-table">
              <thead>
              </thead>
              <tbody>
              <tr>
                  <td>上次文章投稿时间</td>
                  <td>${getTimeSinceNow(x.feed[0].contributeTime,true)}</td>
              </tr>
              </tbody>
          </table>
          </div>
      `;
    $("#UserInfoPrint").append(raw_data);
    })
  })

}

export function PushListDougaMode(){
  //$('.PushListMode').addClass('active');
  //clearPushListDougaButtonClass();
  let e = document.createElement("style");
  e.type='text/css';
  e.id="PushListDougaModeStyle";
  e.textContent=""
  document.head.appendChild(e)
  switch ($('.PushListMode')[0].dataset.type) {
    case "all":
      $(".PushListMode")[0].dataset.type="video";
      document.getElementById("PushListDougaModeStyle").remove();
      e.textContent=`
      .article{display:none}
        `;
      $(".PushListMode")[0].title="仅查看视频"
      document.head.appendChild(e);
      mdui.snackbar({
        message: `仅查看视频投稿。`,
      });    
      break;
    case "video":
      $(".PushListMode")[0].dataset.type="article";
      document.getElementById("PushListDougaModeStyle").remove()
      e.textContent=".video{display:none}"
      $(".PushListMode")[0].title="仅查看文章"
      document.head.appendChild(e);
      mdui.snackbar({
        message: `仅查看文章投稿。`,
      });    
      break;
    case "article":
      $(".PushListMode")[0].dataset.type="all";
      $(".PushListMode")[0].title="全部投稿"
      document.getElementById("PushListDougaModeStyle").remove();
      mdui.snackbar({
        message: `查看全部类型投稿。`,
      });    
    break;  
  }
}
let timer = null;
function clearPushListDougaButtonClass(){
    timer && clearTimeout(timer);
    timer = setTimeout(()=>{
        $('.PushListMode').removeClass('active')
    },4500)
}
export function LiveWatchTimeLstReact(id,url){
  chrome.tabs.update(Number(id), {
    'selected': true
  });
}
