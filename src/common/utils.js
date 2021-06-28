const defaults = {
  enabled: true,//开启关闭插件
  auto_throw: false,
  LikeHeart: false,
  LikeHeartClass: "0",
  LikeHeartNotif: true,
  to_attention: true,
  to_attention_num: 5,
  to_special_items: [],
  broadcastingUIDlistFollowing: {},
  MarkedComment: { setting: { enabled: true, storeLocation: "ExtensionStore", storePlugin: ["ExtensionStore", "IndexedDB", "Nextcloud", "UserdefinedServer"] }, datasets: {} },
  WatchPlanList: [],
  MusicPlayList: { "windowSetting": { "left": 139, "top": 32, "width": 980, "height": 590 }, "onLoadAutoPlay": true, "playerMode": 1, "multiPartContinue": true, "List": {} },
  activeTabKey: 'activeTabId',
  extendsName: 'AcFun助手',
  upUrlTemplate: 'https://www.acfun.cn/u/{uid}',
  userInfo: 'https://www.acfun.cn/rest/pc-direct/user/userInfo?userId={uid}',
  banana_notice: true,
  watchLater: true,
  fetchPushList_daemonsw: true,
  timer4Unread_daemonsw: true,
  krnl_videossEarly: false,
  krnl_globalTimer: true,
  custom_css: false,
  custom_css_style: ``,
  logSetting: { "consoleOutput": true, "logLevel": 4 },
  mark: false,//评论用户标记
  scan: false,//评论用户扫描
  upHighlight: true,//up主评论高亮
  receive: false,//接收用户情报
  filter: false,//up文章区屏蔽
  beautify_nav: true,//首页右侧导航
  beautify_personal: true,//顶栏个人中心优化
  show_like: false,//视频投稿显示点赞数、投桃数
  custom_rate: true,//开启自定义倍速
  custom_rate_keyCode: [38, 40],//shift ↑ ↓ 倍速播放快捷键
  custom_easy_jump_keyCode: [65], //shift A 评论时间跳转快捷键
  player_mode: 'default',//进入页面时播放器的状态，default:默认 film:观影模式  web:网页全屏 screen:桌面全屏
  liveFloowNotif: false,
  liveFollowOpenNow: false,
  liveCloseNotif: false,
  videoQualityStrategy: '0',
  livePlayerEnhc: false,
  autoJumpLastWatchSw: false,
  hideAd: true,
  liveHideAd: true,
  liveHideAdType: 1,
  liveBansw: false,
  playerRecommendHide: true,
  PlayerDamakuSearchSw: false,
  PlayerTimeCommentEasyJump: true,
  PlaybackRateKeysw: false,
  FilmModeExclusionsw: true,
  endedAutoExitFullscreensw: true,
  endedAutoToCommentArea: false,
  easySearchScanForPlayerTimesw: false,
  Dev_indexBlurSW: false,
  userHomeMoment: true,
  Upgradeable: 0,
  ABPlaysw: true,
  ProgressBarsw: true,
  ProgressBarStyle: {
    barColor: "#fd4c5d",
    barHeight: "0.4%",
    loadedOpen: "open",
    loadedColor: "#ffffffb3",
    loadedHeight: "0.4%",
  },
  danmuSearchListToUsersw: true,
  endedAutoJumpRecommandFirstDougasw: false,
  autOpenVideoDescsw: true,
  followLiveNotif: true,
  liveCommentTimeTag: true,
  LiveUserFocus: false,
  LiveWatchTimeRec_popup: false,
  multiPartListSpread: true,
  BangumiNotif: true,
  BangumiPlan: true,
  audioGain: false,
  uddPopUp: true,
  uddPopUptype: 0,//紧凑样式评论区稿件信息弹框,0为完全，1为紧凑模式
  articleReadMode: false,
  articleBanana: false,
  audioAfterBanana: false,
  picDrag: true,
  picRotate: true,
  commentPageEasyTrans: true,
  liveMediaSession: false,
  videoMediaSession: false,
  videoAchievement: true,
  userCenterBeautify: true,
  pageTransKeyBind: true,
  quickCommentSubmit: false,
  widenUCVideoList: false,
  Dev_thinScrollbar: false,
  liveIndexRankNum: true,
  timelineDots: false,
  notificationContent: { commentNotif: true, likeNotif: false, giftNotif: true },
  frameStepSetting: { enabled: false, controlUI: false, }
};
const readOnlyKey = ["extendsName", "upUrlTemplate", "userInfo"];

const REG = {
  index: new RegExp('http(s)?://www.acfun.cn/$'),
  video: new RegExp('http(s)?:\\/\\/www.acfun.cn\\/v\\/ac\\d+'),//视频
  player: new RegExp('http(s)?:\\/\\/www.acfun.cn\\/player\\/ac\\d+'),//视频
  bangumi: new RegExp('http(s)?:\\/\\/www.acfun.cn\\/bangumi\\/.*'),//番剧
  videoAndBangumi: new RegExp('((http(s)?:\\/\\/www.acfun.cn\\/v\\/ac\\d+)|(http(s)?:\\/\\/www.acfun.cn\\/bangumi\\/.*))'),//视频与番剧
  article: new RegExp('http(s)?:\\/\\/www.acfun.cn\\/a\\/ac\\d+'),//文章
  msg_comment: new RegExp('http(s)?:\\/\\/www.acfun.cn\\/(a|v)\\/ac\\d+#ncid=(\\d+)'),//从我的消息-评论跳转
  mlive: new RegExp("https://m.acfun.cn/live/detail/*"),//移动版直播
  live: new RegExp("https://live.acfun.cn/live/*"),//直播
  liveIndex: new RegExp("https://live.acfun.cn"),//直播主页
  userHome: new RegExp("http(s)?://www.acfun.cn/u/(\\d+)"),//用户中心
  partIndex: new RegExp("/v/list"),//分区主页
  articleDetail: new RegExp("/v/as"),//文章分区详细页
  acVid: new RegExp('http(s)?:\\/\\/www.acfun.cn\\/v\\/ac(\\d+)'),
  acAid: new RegExp('http(s)?:\\/\\/www.acfun.cn\\/a\\/ac(\\d+)'),
  acBangumid: new RegExp('http(s)?:\\/\\/www.acfun.cn\\/bangumi/aa(\\d+)'),
  liveRoomID: new RegExp("http(s)?://live.acfun.cn/live/(\\d+)"),
  videoPlayerSrc: new RegExp("blob:https://www.acfun.cn/"),
  videoPartNumByURL: new RegExp("_([0-9].?)"),
}

/**
 * 以传过来的options为主体做好填充,如果其中没有就取默认值
 * @param {*} options 
 */
function sanitizeOptions(options) {
  for (const key in defaults) {
    if (!options.hasOwnProperty(key)) {
      options[key] = defaults[key];
    }
  }
  return options;
}

/**
 * 以default为主体,如果传过来的options有对应的key,就用传过来的
 * @param {*} options 
 */
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
  let raw = Object.keys(options.UserMarks);
  for (let i = 0; i < raw.length; i++) {
    map.set(raw[i], options.UserMarks[raw[i]])
  }
  return map;
}

function upMap(options) {
  let map = new Map();
  let raw = Object.keys(options.UserFilter);
  for (let i = 0; i < raw.length; i++) {
    map.set(raw[i], options.UserFilter[raw[i]])
  }
  return map;
}

function upMapReverse(options) {
  let map = new Map();
  let raw = Object.keys(options.UserFilter);
  for (let i = 0; i < raw.length; i++) {
    map.set(options.UserFilter[raw[i]].name, raw[i])
  }
  return map;
}

//===============配置处理=================
/**
 * 加载所有配置项
 */
async function optionsLoad() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(null, (options) => {
      resolve(sanitizeOptions(options));
    });
  });
}

/**
 * 存储读取后修改的配置
 * @param {*} options 
 */
async function optionsSave(options) {
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

/**
 * 获取插件存储值内容
 * @param {string} key 
 */
async function getStorage(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (res) => {
      resolve(res);
    });
  });
}

/**
 * 删除插件存储值内容
 * @param {string} key 
 */
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
    el.innerHTML = DOMPurify.sanitize(chrome.i18n.getMessage(el.getAttribute("data-i18n")));
    //火狐警告使用innerHTML添加标签 ⬇
    // HTMLElement.prototype.htmlContent = function(html){
    //     var dom = new DOMParser().parseFromString('<template>'+html+'</template>', 'text/html').head;
    //     this.appendChild(dom.firstElementChild.content);
    // }
    // el.htmlContent( DOMPurify.sanitize(chrome.i18n.getMessage(el.getAttribute("data-i18n"))));

  }
}

async function updateStorage(progress, id, tabId) {
  let item = await getStorage(id).then((result) => {
    return result[id];
  });
  item.progress = progress + "%";
  if (progress == 100) {
    item.lineText = "已完成";
  }
  chrome.storage.local.set({ [id]: item }, function () { });
}

/**
 * 判断浏览器类型
 * @returns string 'FF' 'Chrome' 'IE' 'Safari' 'IE' 'MSIE'
 */
function myBrowser() {
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
  // console.log(request);
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
      //contentType: "text/html; charset=utf-8",
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

/**
 * 通知封装
 * @param {string} title 
 * @param {string} message 
 */
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

/**
 * 时间戳到日期
 * @tutorial 2020-10-15 19:22:13 的类似格式
 * @param {Date} now 一个时间对象new Date()
 */
function formatDate(now, highAccuracy = false) {
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  if (!highAccuracy) {
    return year + "-" + month + "-" + date;
  } else {
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  }
}

/**
 * 将时间转为最近发布时间
 * @param {string} date 毫秒时间戳
 * @param {boolean} newFormat 美观样式（去掉为0部分，优化年表示部分）
 * @param {boolean} highAccuracy 提高显示精度比如不只是显示一个小时，需要将显示的内容具体到一个小时3分20秒）
 * @param {string} accuracy 高精度模式下的显示模式（s m h秒分时）
 */
function getTimeSinceNow(date, newFormat = false, highAccuracy = false, accuracy = 's') {
  let currentDate = new Date();
  let publishTime = new Date(date);
  let oneDay = 3600 * 24 * 1000;
  let oneWeek = oneDay * 7;
  let oneMinute = 60 * 1000;
  let oneHour = oneMinute * 60;
  let during = currentDate.getTime() - publishTime.getTime();
  if (highAccuracy) {
    switch (accuracy) {
      case 's':
        return Math.floor(during / 1000) + "秒前";
      case 'm':
        let m = Math.floor(during / oneMinute);
        let secExclude_m = Math.floor((during - oneMinute * m) / 1000);
        if (newFormat) {
          return `${m ? m + " 分" : ""}${secExclude_m} + 秒前`;
        }
        return m + "分" + secExclude_m + "秒前";
      case 'h':
        let h = Math.floor(during / oneHour);
        let mExclude_h = Math.floor((during - oneHour * h) / oneMinute);
        let secExclude_mh = Math.floor((during - h * oneHour - mExclude_h * oneMinute) / 1000)
        if (newFormat) {
          return `${h ? h + "小时" : ""}${mExclude_h ? mExclude_h + "分" : ""}${secExclude_mh + "秒前"}`
        }
        return h + "小时" + mExclude_h + "分" + secExclude_mh + "秒前"
      default:
        break;
    }
  }
  if (during < oneMinute) {
    return Math.floor(during / 1000) + "秒前";
  } else if (during >= oneMinute && during < oneHour) {
    return Math.floor(during / oneMinute) + "分钟前";
  } else if (during > oneHour && during < oneDay) {
    return Math.floor(during / oneHour) + "小时前";
  } else if (during >= oneDay && during < oneWeek) {
    return Math.floor(during / oneDay) + "天前";
  } else if (during >= oneWeek) {
    if (newFormat) {
      return `${publishTime.toLocaleDateString().replace(/\//g, "-") + " " + publishTime.toTimeString().substr(0, 8)}`;
    }
    return `${publishTime.getFullYear()}-${publishTime.getMonth() + 1}-${publishTime.getDate()}`;
  }
}

/**
 * 时间描述转换为秒数
 * @param {string} time string eg:"00:01"or "00:00:10" 时间
 * @returns int seconds
 */
function Duration2Seconds(time) {
  let str = time;
  let arr = str.split(":");
  if (arr.length == 2) {
    let Tm = Number(arr[0]) * 60;
    let Ts = Number(arr[1]);
    let seconds = Tm + Ts;
    return seconds;
  } else if (arr.length == 3) {
    let Ts = Number(arr[2]);
    let Tm = Number(arr[1]) * 60;
    let Th = Number(arr[0]) * 60 * 60;
    let seconds = Th + Tm + Ts;
    return seconds;
  }
}

/**
 * 检查今天周几
 * @param {boolean} ifToday 是否是检查今天
 * @param {Date} dateObj 传入时间对象 new Date()的返回
 */
function checkDay(ifToday = true, dateObj) {
  if (ifToday) {
    let x = new Date();
    return x.getDay();
  } else {
    return dateObj.getDay();
  }
}

/**
 * 获取cookies中key的信息
 * @param {string} keys 
 */
function getcookie(keys) {
  var arr = document.cookie.split(";");
  for (var i = 0; i < arr.length; i++) {
    var ass = arr[i].split("=");
    if (ass[0].trim() == keys) {
      return ass[1];
    }
  }
  return false;
}

/**
 * 在视频投稿中判断自己是否为Up主（DOM判断方式；还有一个使用Api的判断方式）
 */
function adjustVideoUp() {
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

/**
 * 在文章投稿中判断自己是否为Up主（DOM判断方式；还有一个使用Api的判断方式）
 */
function adjustArticleUp() {
  let currentUserNameEncode = getcookie("ac_username");
  if (currentUserNameEncode != "" && currentUserNameEncode != undefined) {
    let userName = decodeURI(currentUserNameEncode);
    let name = document.getElementsByClassName("up-name")[0].firstChild
      .innerText;
    if (userName == name) {
      return 1; //是up主
    } else {
      return 2; //不是up主
    }
  } else {
    return 0; //未登录
  }
}

/**
 * 将DOM转化为文本
 * @param {HTMLElement} node
 * @returns str 
 */
function domToString(node) {
  var tmpNode = document.createElement("div");
  tmpNode.appendChild(node);
  let str = tmpNode.innerHTML;
  tmpNode = node = null;
  return str;
}

/**
 * 监听DOM对象
 * @param {HTMLElement} target DOM对象
 * @param {function} fn 
 * @param {number} time 定时器周期 2500
 * @param {boolean} isDev 是否显示详细的监听文本 false
 * @todo 有时候，虽然DOM加载完了，但是因为页面不在前台，所以某些模块的函数没有得到执行，如果可以的话可以考虑加上使用document.visibilityState == "hidden"(万一插件根本没法获取到页面状态呢？)来判断，当页面切换到前台之后再执行那些函数。
 */
async function getAsyncDom(target, fn, time = 2500, isDev = false) {
  let i = 0;
  isDev && console.log(`[LOG]Common-Utils>getAsyncDom: 开始监听 ${target}`);
  re = (fn) => {
    return new Promise(resolve => {
      targetDom = document.getElementById(target) || document.getElementsByClassName(target).length || $(`${target}`).length || undefined
      if (targetDom) {
        i = 0;
        isDev && console.log("[LOG]Common-Utils>getAsyncDom: DOM加载");
        resolve(fn())
      } else {
        if (i >= 9000 / time) {
          i = 0;
          isDev && resolve(`[LOG]Common-Utils>getAsyncDom: ${target} 没找到`)
          return
        };
        i++;
        setTimeout(() => {
          isDev && console.log(`[LOG]Common-Utils>getAsyncDom: 正在监听 ${target} - 第${i}次`);
          resolve(re(fn));
        }, time);
      }
    })
  }
  return await re(fn)
}

/**
 * 从Up名称解析为UID
 * @param {string} upName 
 * @returns upUrl 返回Up主的主页地址
 * @callMethod let uid =await toUpInfo('qyqx')
 */
async function toUpInfo(upName) {
  let upUrl = fetch('https://www.acfun.cn/u/' + upName.toString()).then((response) => {
    let upUrl = response.url
    return upUrl
  })
  return upUrl
}

/**
 * 页面位置计算
 * @tutorial 一般用来判断是否到底部 getScrollHeight() == getWindowHeight() + getDocumentTop();文档高度 = 可视窗口高度 + 滚动条高度
 */
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

function getEsClassName(esClass) {
  return esClass.constructor.toString().match(/class\s+([^ \(]+)\s*\{/i)[1]
}

function getEsFuncName(esFunc) {
  let result;
  try {
    result = arguments[0].name;
  } catch (error) {
    result = esFunc.toString().toString().match(/\s+([^ \(]+)\s*\(/i)[1]
  }
  return result
}

/**
 * fetch信息，同步返回
 * @param {string} url 
 * @returns 返回结果的文本内容
 */
async function fetchResult(url, method, data, withCredentials) {
  var result;
  if (method == "POST" && withCredentials) {
    result = fetch(url, {
      method: "POST", credentials: 'include', headers: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Accept': "accept: application/json, text/plain, */*"
      }, body: data
    }).then((res => { return res.text() }))
  } else if (method == "POST" && withCredentials == false) {
    result = fetch(url, {
      method: "POST", headers: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Accept': "accept: application/json, text/plain, */*"
      }, body: data
    }).then((res => { return res.text() }))
  } else {
    result = fetch(url).then((response) => {
      return response.text();
    })
  }
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
throttle = (func, delay) => {
  var prev = Date.now();
  return function () {
    var context = this;
    var args = arguments;
    var now = Date.now();
    if (now - prev >= delay) {
      func.apply(context, args);
      prev = Date.now();
    }
  }
}

/**
 * 插入DOM对象
 * @param {Object} options { tag = 'div', id = '', css = '', target = document.body, classes = '', createMode = "append", thisHTML = "" }
 * @innerParam {String} createMode append,after,headAppend
 */
function addElement(options) {
  let { tag = 'div', id = '', css = '', target = document.body, classes = '', createMode = "append", thisHTML = "", title = "" } = options
  let x = document.createElement(tag);
  x.id = id;
  x.className = classes;
  x.innerHTML = thisHTML;
  x.style.cssText = css;
  if (title) {
    x.title = title;
  };
  if (createMode == "append") {
    target.append(x);
  } else if (createMode == "after") {
    target.after(x);
  } else if (createMode == "headAppnd") {
    let tempTarget = target.firstChild;
    target.insertBefore(x, tempTarget);
  }
  return x
}

function removeAPrefix(_$targetDom) {
  let acid = _$targetDom[0].getAttribute("data-aid");
  if (acid == '') { return }
  return acid
}

/**
 * 从string中的HTML内容创建DOM
 * @param {*} str 
 * @returns HTMLElement
 */
function stringToDOM(str) {
  let div = document.createElement("div");
  if (typeof str == "string") {
    div.innerHTML = str;
  }
  return div.childNodes;
}

/**
 * 判断用户是否登录
 * @param {string} dept "video" or "article"
 * @param {string} evidence "cookies" or "ui"
 * @returns {boolean} 状态
 */
function isLogin(dept = "video", evidence = "cookies") {
  if (evidence == "cookies") {
    return Boolean(getcookie("ac_username"));
  } else if (evidence == "ui") {
    switch (dept) {
      case "video":
        if ($("#ACPlayer > div > div.container-video > div > div.container-controls > div.control-bar-bottom > div.input-area > span.wrap-go2login").is(":hidden")) {
          return true;
        } else {
          return false;
        }
      case "article":
        let isLogined = false;
        try {
          isLogined = document.querySelector("#header-guide > li.guide-item.guide-user > a").childElementCount == 0;
        } catch (error) {
          isLogined = getcookie("ac_username") != false ? true : false;
        }
        return isLogined;
    }
  }
}

/**
 * 在某个地方（默认为head下）增加一个css的style标签
 * @param {string} cssText CSS样式文本
 * @param {HTMLElement} targetDom 添加于，默认是document.head
 * @param {string} id css标签的ID
 */
function createElementStyle(cssText, targetDom = document.head, id = null) {
  let target = targetDom;
  let nod = document.createElement("style");
  let str = cssText;
  nod.type = "text/css";
  id ? nod.id = id : null;
  nod.textContent = str;
  target.appendChild(nod);
  return () => {
    // console.log(target)
    // console.log(id)
    target.removeChild(document.getElementById(id));
  }

}

/**
 * 判断现在视频稿件所播放的分P编号
 * @returns {Number} PartNumber
 */
function judgeActivePart() {
  let x = document.querySelector("#main-content > div.right-column > div.part > div.fl.part-wrap > ul").children;
  for (let i = 0; i < x.length; i++) {
    if (x[i].classList[1] == "active") {
      return i + 1;
    }
  }
}

/**
 * 投蕉
 * @param {object} params == {key:稿件Id}
 * @param {number} banana_num  投蕉数
 * @param {string} dougaType String 投稿类型 "video" or "article"
 * @tutorial 此接口下的resourceType参数，2为视频投稿，3为文章投稿
 */
async function bananaThrow(params, banana_num, dougaType = "video") {
  //投蕉操作
  let { key, callback } = params;
  let header = new Map();
  let resType = 2;
  if (dougaType == "article") {
    resType = 3;
  }
  header.set("Content-Type", "application/x-www-form-urlencoded");
  let data = "resourceId=" + key + "&count=" + banana_num + "&resourceType=" + resType;
  let result = await ajax('POST', "https://www.acfun.cn/rest/pc-direct/banana/throwBanana", data, header);
  let res_obj = JSON.parse(result);
  if (res_obj == undefined || res_obj.extData == undefined || res_obj.extData.bananaRealCount == undefined) {
    return false;
  }
  return true;
}

/**
 * 从秒钟转化为分钟
 * @param {number} second 传入的秒钟数
 * @returns 分钟
 */
function timeToMinute(second) {
  second = Math.floor(second)
  var minute;
  minute = Math.floor(second / 60);
  second = second % 60;
  minute += "";
  second += "";
  minute = minute.length == 1 ? "0" + minute : minute;
  second = second.length == 1 ? "0" + second : second;
  return minute + ":" + second;
}

/**
 * 文件下载 For Front
 * @param {*} element 文件内容
 * @param {*} fileName 文件名
 */
function downloadThings(element, fileName) {
  var blob = new Blob([element], { type: 'application/octet-stream' });
  var url = window.URL.createObjectURL(blob);
  var saveas = document.createElement('a');
  saveas.href = url;
  saveas.style.display = 'none';
  document.body.appendChild(saveas);
  saveas.download = fileName;
  saveas.click();
  setTimeout(function () { saveas.parentNode.removeChild(saveas); }, 0)
  document.addEventListener('unload', function () { window.URL.revokeObjectURL(url); });
}

/**
 * 输出一个在此范围的随机数
 * @param {Number} minNum 起始
 * @param {Number} maxNum 结束
 */
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    default:
      return 0;
  }
}