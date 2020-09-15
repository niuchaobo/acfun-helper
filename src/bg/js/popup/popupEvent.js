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
    $(".toTop").css({ opacity: "0" });
  } else {
    $(".toTop").css({ opacity: "1" });
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
          <td>${x.content[i].name} - 观看于${getTimeSinceNow(x.content[i].time)}</td>
          <td><a href="https://www.acfun.cn${Boolean(x.content[i].aid)?"/v/ac"+x.content[i].aid:"/"}" target="_blank">《${x.content[i].title}》</a> </td>
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
      alert("请不要频繁请求。")
    }
  return res.text()})
  .then((res)=>{
    let x = JSON.parse(res);
    if(x.result!=0){alert("无效的视频稿件AcID。");return}
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
                <td>${x.title}</td>
            </tr>
            <tr>
                <td>播放量</td>
                <td>${x.viewCount}</td>
            </tr>
            <tr>
                <td>香蕉</td>
                <td>${x.bananaCount}</td>
            </tr>
            <tr>
                <td>发布时间</td>
                <td>${getTimeSinceNow(x.createTimeMillis)}</td>
            </tr>
            <tr>
                <td>弹幕</td>
                <td>${x.danmakuCount}</td>
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
                <td>收藏</td>
                <td>${x.stowCount}</td>
            </tr>
            </tbody>
        </table>
        </div>
    `;
  $("#dougaInfoPrint").append(raw_data);

  })
}

export function PushListDougaMode(){
  let e = document.createElement("style");
  e.type='text/css';
  e.id="PushListDougaModeStyle";
  e.textContent=""
  document.head.appendChild(e)
  switch ($(this)[0].dataset.type) {
    case "all":
      $(".PushListMode")[0].dataset.type="video";
      document.getElementById("PushListDougaModeStyle").remove();
      e.textContent=".article{display:none}";
      $(".PushListMode")[0].title="仅查看视频"
      document.head.appendChild(e);
      mdui.snackbar({
        message: `查看仅查看视频投稿。`,
      });    
      break;
    case "video":
      $(".PushListMode")[0].dataset.type="article";
      document.getElementById("PushListDougaModeStyle").remove()
      e.textContent=".video{display:none}"
      $(".PushListMode")[0].title="仅查看文章"
      document.head.appendChild(e);
      mdui.snackbar({
        message: `查看仅查看文章投稿。`,
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

export function LiveWatchTimeLstReact(id,url){
  chrome.tabs.update(Number(id), {
    'selected': true
  });
}
