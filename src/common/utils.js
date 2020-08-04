const defaults = {
    enabled:true,//开启关闭插件
    auto_throw:false,
    to_attention:true,
    to_attention_num:5,
    to_special_items:[],
    WatchPlanList:[],
    activeTabKey:'activeTabId',
    extendsName:'AcFun助手',
    upUrlTemplate:'https://www.acfun.cn/u/{uid}',
    userInfo:'https://www.acfun.cn/rest/pc-direct/user/userInfo?userId={uid}',
    banana_notice:true,
    mark:false,//评论用户标记
    scan:false,//评论用户扫描
    upHighlight:true,//up主评论高亮
    receive:false,//接收用户情报
    filter:false,//屏蔽up
    beautify_nav:true,//首页右侧导航
    beautify_personal:true,//顶栏个人中心入口优化
    show_like:false,//显示点赞数、投桃数
    custom_rate:true,//开启自定义倍速
    custom_rate_keyCode:[38,40],//shift ↑ ↓ 倍速播放快捷键
    custom_easy_jump_keyCode:[65], //shift A 评论时间跳转快捷键
    player_mode:'default',//进入页面时播放器的状态，default:默认 film:观影模式  web:网页全屏 screen:桌面全屏
    liveFloowNotif:false,
    videoQualityStrategy:'0',
    livePlayerEnhc:false,
    autoJumpLastWatchSw:false,
    hideAd:true,
    liveHideAd:true,
    liveBansw:false,
    PlayerDamakuSearchSw:false,
    PlayerTimeCommentEasyJump:true,
    PlaybackRateKeysw:true,
    FileModeExclusionsw:true,
    endedAutoExitFullscreensw:false,
    easySearchScanForPlayerTimesw:false,
    Dev_indexBlurSW:false,
    Upgradeable: 0,
    ABPlaysw:false,
    FlexProgressBarws:true,
    danmuSearchListToUsersw:true,
};
const readOnlyKey = ["extendsName", "upUrlTemplate", "userInfo"];

const REG = {
    index:new RegExp('http(s)?://www.acfun.cn/$'),
    video:new RegExp('http(s)?:\\/\\/www.acfun.cn\\/v\\/ac\\d+'),//视频
    bangumi:new RegExp('http(s)?:\\/\\/www.acfun.cn\\/bangumi\\/.*'),//番剧
    article:new RegExp('http(s)?:\\/\\/www.acfun.cn\\/a\\/ac\\d+'),//文章
    msg_comment:new RegExp('http(s)?:\\/\\/www.acfun.cn\\/(a|v)\\/ac\\d+#ncid=(\\d+)'),//从我的消息-评论跳转
    mlive:new RegExp("https://m.acfun.cn/live/detail/*"),//移动版直播
    live:new RegExp("https://live.acfun.cn/live/*"),//直播
    liveIndex:new RegExp("https://live.acfun.cn"),//直播主页
    userHome:new RegExp("http(s)?://www.acfun.cn/u/\\d+")//直播主页

}



//以传过来的options为主体,如果其中没有就取默认值
function sanitizeOptions(options) {
  for (const key in defaults) {
    if (!options.hasOwnProperty(key)) {
      options[key] = defaults[key];
    }
  }
  return options;
}

//以default为主体,如果传过来的options有对应的key,就用传过来的
function transOptions(options) {
  for (const key in defaults) {
    if (options.hasOwnProperty(key)) {
      if (readOnlyKey.indexOf(key) > -1) {
        continue;
      }
      defaults[key] = options[key];
    }
  }
  return defaults;
}

//================配置存储转换处理==============
function userMap(options) {
  let map = new Map();
  for (const key in options) {
    if (key.indexOf("AC_") != -1) {
      map.set(key, options[key]);
    }
  }
  return map;
}

function upMap(options) {
  let map = new Map();
  for (const key in options) {
    if (key.indexOf("FILTER_") != -1) {
      map.set(key, options[key]);
    }
  }
  return map;
}

function upMapReverse(options) {
  let map = new Map();
  for (const key in options) {
    if (key.indexOf("FILTER_") != -1) {
      let v = options[key].name;
      if (v != null && v != undefined) {
        map.set(v, key);
      }
    }
  }
  return map;
}

//===============配置处理=================
async function optionsLoad() {
  //加载所有配置项
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(null, (options) => {
      resolve(sanitizeOptions(options));
    });
  });
}

async function optionsSave(options) {
  //存储读取后修改的配置
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(transOptions(options), resolve());
  });
}

async function getResult() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get({ expression: "" }, (item) => {
      resolve(item.expression);
    });
  });
}

async function getStorage(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (res) => {
      resolve(res);
    });
  });
}

function delStorage(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.remove(key, (res) => {
      resolve(res);
    });
  });
}

function utilAsync(func) {
  return function (...args) {
    func.apply(this, args);
  };
}

function odhback() {
  return chrome.extension.getBackgroundPage().odhback;
}

function localizeHtmlPage() {
  for (const el of document.querySelectorAll("[data-i18n]")) {
    if ("INPUT" == el.nodeName) {
      if (el.getAttribute("type") == "text") {
        el.setAttribute(
          "placeholder",
          chrome.i18n.getMessage(el.getAttribute("data-i18n"))
        );
      } else if (el.getAttribute("type") == "button") {
        el.setAttribute(
          "value",
          chrome.i18n.getMessage(el.getAttribute("data-i18n"))
        );
      }
    }
    el.innerHTML = DOMPurify.sanitize( chrome.i18n.getMessage(el.getAttribute("data-i18n")));
    //火狐警告使用innerHTML添加标签 ⬇
    // HTMLElement.prototype.htmlContent = function(html){
    //     var dom = new DOMParser().parseFromString('<template>'+html+'</template>', 'text/html').head;
    //     this.appendChild(dom.firstElementChild.content);
    // }
    // el.htmlContent( DOMPurify.sanitize(chrome.i18n.getMessage(el.getAttribute("data-i18n"))));
    
  }
}

//=================助手更新状态处理===========
function updateVersionIcon(){
    chrome.storage.local.get(["Upgradeable"],  (data)=> {
        if(data.Upgradeable === 1){
            $('#update-box').css('display','inline-block')
            $('.update-letter').html('助手有轻量更新，点击查看')
            $('.head').addClass('lightUpdate')
            $('#update-box').click(()=>{
                window.open('https://www.acfun.cn/u/7054138')
            })
            return
        }
        if(data.Upgradeable === 2){
            $('#update-box').css('display','inline-block')
            $('.update-letter').html('助手有重大更新，点击查看')
            $('.update-icon').css('background','red')
            $('#update-box').click(()=>{
                window.open('https://www.acfun.cn/u/7054138')
            })
            $('.head').addClass('heavyUpdate')
            return 
        }
      }); 
}


async function getKeyFromDb(ticket) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://bdc.zdq1688.com/pocket/crx/getOpenid?ticket=" + ticket,
      type: "GET",
      timeout: 20000,
      //data: JSON.stringify(request),
      //contentType: 'application/json; charset=utf-8',
      dataType: "json",
      success: (data) => resolve(data),
      error: (xhr, status, err) => resolve(null),
    });
  });
}

async function getTicketFromBackend() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://bdc.zdq1688.com/pocket/crx/getQrcode",
      type: "GET",
      timeout: 20000,
      //data: JSON.stringify(request),
      //contentType: 'application/json; charset=utf-8',
      dataType: "json",
      success: (data) => resolve(data),
      error: (xhr, status, err) => resolve(null),
    });
  });
}

async function addfavourite() {
  let option = await optionsLoad();
  if (option.userkey == "" || option.userkey == null) {
    $("#message img")[0].src = `${chrome.runtime.getURL("fg/img/fail.png")}`;
    $("#message span").text("收藏失败，请扫码登录");
    messageShow();
    return;
  }
  let result = await getResult();
  //var jsonStr = JSON.stringify(result);

  let data_obj = { key: "", data: "" };
  data_obj.key = option.userkey;
  data_obj.data = result;

  let response = await addtofavourite(data_obj);
  if (response == null) {
    $("#message img")[0].src = `${chrome.runtime.getURL("fg/img/fail.png")}`;
    $("#message span").text("服务器异常");
  } else {
    $("#message span").text(response.message);
    let code = response.code;
    if (code == "1") {
      $("#message img")[0].src = `${chrome.runtime.getURL("fg/img/good.png")}`;
    } else {
      $("#message img")[0].src = `${chrome.runtime.getURL("fg/img/fail.png")}`;
    }
  }
  messageShow();
}

async function addfavourite_frontend() {
  let res = { code: "", message: "", src: "" };
  let option = await optionsLoad();
  if (option.userkey == "" || option.userkey == null) {
    res.src = `${chrome.runtime.getURL("fg/img/fail.png")}`;
    res.message = encodeURI("收藏失败，请扫码登录");
    return res;
  }
  let result = await getResult();
  let data_obj = { key: "", data: "" };
  data_obj.key = option.userkey;
  data_obj.data = result;

  let response = await addtofavourite(data_obj);
  if (response == null) {
    res.src = `${chrome.runtime.getURL("fg/img/fail.png")}`;
    res.message = encodeURI("服务器异常");
  } else {
    res.message = encodeURI(response.message);
    let code = response.code;
    if (code == "1") {
      res.src = `${chrome.runtime.getURL("fg/img/good.png")}`;
    } else {
      res.src = `${chrome.runtime.getURL("fg/img/fail.png")}`;
    }
  }
  return res;
}

async function loginOut(e) {
  if (!e.originalEvent) return;
  let options = await optionsLoad();
  options.userkey = "";
  options.qr_ticket = "";
  options.headimage = "";
  options.nickName = "未登录";
  let newOptions = await odhback().opt_optionsChanged(options);
  optionsSave(newOptions);
}

async function updateStorage(progress, id, tabId) {
  let item = await getStorage(id).then((result) => {
    return result[id];
  });
  item.progress = progress + "%";
  if (progress == 100) {
    item.lineText = "已完成";
  }
  chrome.storage.local.set({ [id]: item }, function () {});
}

function myBrowser() {
  //判断浏览器类型
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf("Opera") > -1;
  if (isOpera) {
    return "Opera";
  } //判断是否Opera浏览器
  if (userAgent.indexOf("Firefox") > -1) {
    return "FF";
  } //判断是否Firefox浏览器
  if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  }
  if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  } //判断是否Safari浏览器
  if (
    userAgent.indexOf("compatible") > -1 &&
    userAgent.indexOf("MSIE") > -1 &&
    !isOpera
  ) {
    return "IE";
  } //判断是否IE浏览器
}

function ajax(method, url, data, header) {
  //content script发送同源请求，需要区分chrome和FF
  let browser = myBrowser();
  let request = null;
  if (browser == "FF") {
    request = new content.XMLHttpRequest();
  } else {
    request = new XMLHttpRequest();
  }
  //var request = new content.XMLHttpRequest();
  //var request = content.XMLHttpRequest;
  console.log(request);
  return new Promise(function (resolve, reject) {
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          resolve(request.responseText);
        } else {
          reject(request.status);
        }
      }
    };
    request.open(method, url);
    if (header) {
      header.forEach(function (value, key) {
        request.setRequestHeader(key, value);
      });
    }
    request.send(data);
  });
}

function getPageData(href) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: href,
      type: "GET",
      timeout: 10000,
      contentType: "text/html; charset=utf-8",
      success: (data) => {
        resolve(data);
      },
      error: (xhr, status, err) => resolve(null),
    });
  });
}

async function parseM3u8(url) {
  //解析m3u8文件
  let m3u8Data = await getPageData(url);
  let parser = new m3u8Parser.Parser();
  parser.push(m3u8Data);
  parser.end();
  let parsedManifest = parser.manifest;
  return parsedManifest;
  //计算总时长
  /*let totalSecond = countTotal(parsedManifest);
    let time = formateSeconds(totalSecond);
    alert(time);*/
}

function getVideo(url) {
  const promise = new Promise(function (resolve, reject) {
    const handler = function () {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.timeout = 10000;
    client.onreadystatechange = handler;
    client.responseType = "blob";
    client.send();
  });

  return promise;
}

function mysleep(ms) {
  //睡一下
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function notice(title, message) {
  chrome.notifications.create(null, {
    type: "basic",
    iconUrl: "images/notice.png",
    title: title,
    message: message,
  });
}

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function uuidBuild() {
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

function formatDate(now) {
  //时间戳到日期
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hour = now.getHours();
  return year + "-" + month + "-" + date;
}

function getTimeSinceNow(date) {
  // 将时间转为最近发布时间
  let currentDate = new Date();
  let publishTime = new Date(date);
  let oneDay = 3600 * 24 * 1000;
  let oneWeek = oneDay * 7;
  let oneMinute = 60 * 1000;
  let oneHour = oneMinute * 60;
  let during = currentDate.getTime() - publishTime.getTime();
  if (during < oneMinute) {
    return Math.floor(during / 1000) + "秒前发布";
  } else if (during >= oneMinute && during < oneHour) {
    return Math.floor(during / oneMinute) + "分前发布";
  } else if (during > oneHour && during < oneDay) {
    return Math.floor(during / oneHour) + "小时前发布";
  } else if (during >= oneDay && during < oneWeek) {
    return Math.floor(during / oneDay) + "天前发布";
  } else if (during >= oneWeek) {
    return `发布于${publishTime.getFullYear()}-${
      publishTime.getMonth + 1
    }-${publishTime.getDate()}`;
  }
}

function getcookie(keys) {
  //获取cookies信息
  var arr = document.cookie.split(";");
  for (var i = 0; i < arr.length; i++) {
    var ass = arr[i].split("=");
    if (ass[0].trim() == keys) {
      return ass[1];
    }
  }
  return false;
}

function adjustVideoUp() {
  //在视频投稿中判断自己是否为Up主（DOM判断方式；还有一个使用Api的判断方式）
  let currentUserNameEncode = getcookie("ac_username");
  if (currentUserNameEncode != "" && currentUserNameEncode != undefined) {
    let userName = decodeURI(currentUserNameEncode);
    let name = document.getElementsByClassName("up-name")[0].innerText;
    if (userName == name) {
      return 1; //是up主
    } else {
      return 2; //不是up主
    }
  } else {
    return 0; //未登录
  }
}

function adjustArticleUp() {
  //在文章投稿中判断自己是否为Up主（DOM判断方式；还有一个使用Api的判断方式）
  let currentUserNameEncode = getcookie("ac_username");
  if (currentUserNameEncode != "" && currentUserNameEncode != undefined) {
    let userName = decodeURI(currentUserNameEncode);
    let name = document.getElementsByClassName("up-name")[0].firstChild
      .innerText;
    // console.log(name);
    if (userName == name) {
      return 1; //是up主
    } else {
      return 2; //不是up主
    }
  } else {
    return 0; //未登录
  }
}

function domToString(node) {
  var tmpNode = document.createElement("div");
  tmpNode.appendChild(node);
  let str = tmpNode.innerHTML;
  tmpNode = node = null;
  return str;
}

async function getAsyncDom(target, fn, time = 2500,isDev=false) {
    let i = 0;
    isDev && console.log(`[LOG]Common-Utils>getAsyncDom: 开始监听 ${target}`);
  re = (fn)=>{
      return new Promise(resolve=>{
        targetDom = document.getElementById(target) || document.getElementsByClassName(target).length  || $(`${target}`).length|| undefined
        if(targetDom){
            i = 0; 
            isDev && console.log("[LOG]Common-Utils>getAsyncDom: DOM加载");
            resolve(fn())
        }else{
            if (i >= 9000 / time) {
                i = 0;
                isDev && resolve(`[LOG]Common-Utils>getAsyncDom: ${target} 没找到`)
                return 
            };
              i++; 
              setTimeout(() => {
                isDev && console.log(`[LOG]Common-Utils>getAsyncDom: 正在监听${target}第${i}次`);
                resolve(re(fn));
              }, time); 
        }
      })
  }
  return await re(fn)
}

async function toUpInfo(upName){
    //从Up名称解析为UID
    let upUrl = fetch('https://www.acfun.cn/u/' + upName.toString()).then((response)=>{
        let upUrl = response.url
        return upUrl
    })
    return upUrl
}

// let uil =await toUpInfo('qyqx')
//   console.log(uil)

//页面位置计算;一般用来判断是否到底部 getScrollHeight() == getWindowHeight() + getDocumentTop()
//文档高度 = 可视窗口高度 + 滚动条高度
function getDocumentTop() {
  //计算文档高度
  var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
  if (document.body) {
      bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop; return scrollTop;
}
function getWindowHeight() {
  //计算窗口高度
  var windowHeight = 0; if (document.compatMode == "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
  } else {
      windowHeight = document.body.clientHeight;
  }
  return windowHeight;
}
function getScrollHeight() {
  //计算滚动条高度
  var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
  if (document.body) {
      bodyScrollHeight = document.body.scrollHeight;
  }
  if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight;
  }
  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight; return scrollHeight;
}


async function fetchResult(url) {
    //fetch信息，同步返回
    let result = fetch(url).then((response)=>{
        return response.text();
    })
    return result
}

debounce = (fn, delay) => {
    let timer = null;
    return function (args) {
      let _this = this;
      let _args = args;
      if (timer) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.call(_this, _args);
        }, delay);
      } else {
        timer = setTimeout(function () {
          fn.call(_this, _args);
        }, delay);
      }
    };
  };
  throttle = (func, delay)=> {            
    　　var prev = Date.now();            
    　　return function() {                
    　　　　var context = this;                
    　　　　var args = arguments;                
    　　　　var now = Date.now();                
    　　　　if (now - prev >= delay) {                    
    　　　　　　func.apply(context, args);                    
    　　　　　　prev = Date.now();                
    　　　　}            
    　　}        
  }   