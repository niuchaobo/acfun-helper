const defaults = {
    enabled:true,//开启关闭插件
    auto_throw:false,
    to_attention:true,
    to_attention_num:5,
    to_special_items:[],
    activeTabKey:'activeTabId',
    extendsName:'Acfun助手',
    upUrlTemplate:'https://www.acfun.cn/u/{uid}',
    userInfo:'https://www.acfun.cn/rest/pc-direct/user/userInfo?userId={uid}',
    banana_notice:true,
    mark:false,//评论用户标记
    scan:false,//评论用户扫描
    upHighlight:true,//up主评论高亮
    receive:false,//接收用户情报
    filter:false,//屏蔽up
    beautify_nav:true,//首页右侧导航
    beautify_personal:true,//个人中心入口
    show_like:true,//显示点赞数
    custom_rate:true,//开启自定义倍速
    player_mode:'default',//进入页面时播放器的状态，default:默认 film:观影模式  web:网页全屏 screen:桌面全屏


};
const readOnlyKey = ["extendsName","upUrlTemplate","userInfo"];


const REG = {
    video:new RegExp('http(s)?:\\/\\/www.acfun.cn\\/v\\/ac\\d+'),//视频
    bangumi:new RegExp('http(s)?:\\/\\/www.acfun.cn\\/bangumi\\/.*'),//番剧
    article:new RegExp('http(s)?:\\/\\/www.acfun.cn\\/a\\/ac\\d+'),//文章
    msg_comment:new RegExp('http(s)?:\\/\\/www.acfun.cn\\/(a|v)\\/ac\\d+#ncid=(\\d+)'),//从我的消息-评论跳转
    mlive:new RegExp("https://m.acfun.cn/live/detail/*"),//移动版直播
    live:new RegExp("https://live.acfun.cn/live/*")//直播
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
            if(readOnlyKey.indexOf(key)>-1){
                continue;
            }
            defaults[key] = options[key];
        }
    }
    return defaults;
}
function userMap(options) {
    let map = new Map();
    for(const key in options){
        if(key.indexOf("AC_")!=-1){
            map.set(key,options[key]);
        }
    }
    return map;
}

function upMap(options) {
    let map = new Map();
    for(const key in options){
        if(key.indexOf("FILTER_")!=-1){
            map.set(key,options[key]);
        }
    }
    return map;
}

function upMapReverse(options) {
    let map = new Map();
    for(const key in options){
        if(key.indexOf("FILTER_")!=-1){
            let v = options[key].name;
            if(v!=null && v!=undefined){
                map.set(v,key);
            }
        }
    }
    return map;
}


async function optionsLoad() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(null, (options) => {
            resolve(sanitizeOptions(options));
        });
    });
}

async function optionsSave(options) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set(transOptions(options), resolve());
    });
}

function utilAsync(func) {
    return function(...args) {
        func.apply(this, args);
    };
}

function odhback() {
    return chrome.extension.getBackgroundPage().odhback;
}

function localizeHtmlPage() {
    for (const el of document.querySelectorAll('[data-i18n]')) {
        if('INPUT' == el.nodeName){
            if(el.getAttribute('type') == 'text'){
                el.setAttribute('placeholder',chrome.i18n.getMessage(el.getAttribute('data-i18n')));
            }else if(el.getAttribute('type') == 'button'){
                el.setAttribute('value',chrome.i18n.getMessage(el.getAttribute('data-i18n')));
            }
        }
        el.innerHTML = DOMPurify.sanitize(chrome.i18n.getMessage(el.getAttribute('data-i18n')));
    }
}

async function getKeyFromDb(ticket){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://bdc.zdq1688.com/pocket/crx/getOpenid?ticket='+ticket,
            type: 'GET',
            timeout: 20000,
            //data: JSON.stringify(request),
            //contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: (data) => resolve(data),
            error: (xhr, status, err) => resolve(null),
        });
    });
}

async function getTicketFromBackend(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://bdc.zdq1688.com/pocket/crx/getQrcode',
            type: 'GET',
            timeout: 20000,
            //data: JSON.stringify(request),
            //contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: (data) => resolve(data),
            error: (xhr, status, err) => resolve(null),
        });
    });
}


async function getResult() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get({expression:''}, (item) => {
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

async function addfavourite(){
    let option = await optionsLoad();
    if(option.userkey=='' || option.userkey==null){
        $("#message img")[0].src=`${chrome.runtime.getURL('fg/img/fail.png')}`;
        $("#message span").text("收藏失败，请扫码登录");
        messageShow();
        return;
    }
    let result = await getResult();
    //var jsonStr = JSON.stringify(result);

    let data_obj = {key:'',data:''};
    data_obj.key=option.userkey;
    data_obj.data=result;

    let response = await addtofavourite(data_obj);
    if(response==null){
        $("#message img")[0].src=`${chrome.runtime.getURL('fg/img/fail.png')}`;
        $("#message span").text("服务器异常");
    }else{
        $("#message span").text(response.message);
        let code = response.code;
        if(code == "1"){
            $("#message img")[0].src=`${chrome.runtime.getURL('fg/img/good.png')}`;
        }else{
            $("#message img")[0].src=`${chrome.runtime.getURL('fg/img/fail.png')}`;
        }
    }
    messageShow();

}

async function addfavourite_frontend() {
    let res={code:'',message:'',src:''};
    let option = await optionsLoad();
    if(option.userkey=='' || option.userkey==null){
        res.src=`${chrome.runtime.getURL('fg/img/fail.png')}`;
        res.message=encodeURI('收藏失败，请扫码登录');
        return res;
    }
    let result = await getResult();
    let data_obj = {key:'',data:''};
    data_obj.key=option.userkey;
    data_obj.data=result;

    let response = await addtofavourite(data_obj);
    if(response==null){
        res.src=`${chrome.runtime.getURL('fg/img/fail.png')}`;
        res.message=encodeURI("服务器异常");
    }else{
        res.message=encodeURI(response.message);
        let code = response.code;
        if(code == "1"){
            res.src=`${chrome.runtime.getURL('fg/img/good.png')}`;
        }else{
            res.src=`${chrome.runtime.getURL('fg/img/fail.png')}`;
        }
    }
    return res;

}

async function loginOut(e){
    if (!e.originalEvent) return;
    let options = await optionsLoad();
    options.userkey='';
    options.qr_ticket='';
    options.headimage='';
    options.nickName='未登录';
    let newOptions = await odhback().opt_optionsChanged(options);
    optionsSave(newOptions);
}

async function updateStorage(progress,id,tabId){
    let item = await getStorage(id).then(result => {return result[id]});
    item.progress = progress+"%";
    if(progress==100){
        item.lineText="已完成";
    }
    chrome.storage.local.set({[id]:item}, function () {

    });
}

function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}

//content script发送同源请求，需要区分chrome和FF
function ajax(method, url, data,header) {
    let browser = myBrowser();
    let request = null;
    if(browser=='FF'){
        request = new content.XMLHttpRequest();
    }else{
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
        if(header){
            header.forEach(function (value, key) {
                request.setRequestHeader(key, value);
            })
        }
        request.send(data);
    });
}

function getPageData(href){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: href,
            type: 'GET',
            timeout: 10000,
            contentType: 'text/html; charset=utf-8',
            success: (data) => {resolve(data)},
            error: (xhr, status, err) => resolve(null),
        });
    });
}

async function parseM3u8(url) {
    let m3u8Data =await getPageData(url);
    //解析文件
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
    const promise = new Promise(function(resolve, reject){
        const handler = function() {
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
    return new Promise(resolve =>
        setTimeout(resolve, ms)
    )
}

function delStorage(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.remove(key, (res) => {
            resolve(res);
        });
    });
}


function notice(title,message) {
    chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: 'images/notice.png',
        title: title,
        message: message
    });
}

//时间戳到日期
function formatDate(now) {
    var year=now.getFullYear();
    var month=now.getMonth()+1;
    var date=now.getDate();
    var hour=now.getHours();
    return year+"-"+month+"-"+date;
}

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function uuidBuild() {
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

// 将时间转为最近
function getTimeSinceNow(date) {
    let currentDate = new Date()
    let publishTime = new Date(date)
    let oneDay = 3600 * 24 * 1000
    let oneWeek = oneDay * 7
    let oneMinute = 60 * 1000
    let oneHour = oneMinute * 60
    let during = currentDate.getTime() - publishTime.getTime()
    if (during < oneMinute) {
        return Math.floor(during / 1000) + '秒前发布'
    }
    else if (during >= oneMinute && during < oneHour) {
        return Math.floor(during / oneMinute) + '分前发布'
    } else if (during > oneHour && during < oneDay) {
        return Math.floor(during / oneHour) + '小时前发布'
    }
    else if (during >= oneDay && during < oneWeek) {
        return Math.floor(during / oneDay) + '天前发布'
    } else if (during >= oneWeek) {
        return `发布于${publishTime.getFullYear()}-${publishTime.getMonth + 1}-${publishTime.getDate()}`
    }
}

function getcookie(keys){
    var arr=document.cookie.split(";");
    for(var i=0; i<arr.length; i++){
        var ass=arr[i].split("=");
        if(ass[0].trim()==keys){
            return  ass[1];
        }
    }
    return false;

}

function adjustVideoUp(){
    let currentUserNameEncode = getcookie("ac_username");
    if(currentUserNameEncode!='' && currentUserNameEncode!=undefined){
        let userName = decodeURI(currentUserNameEncode);
        let name = document.getElementsByClassName("up-name")[0].innerText;
        if(userName == name){
            return 1;//是up主
        }else{
            return 2;//不是up主
        }
    }else{
        return 0;//未登录
    }
}
function adjustArticleUp(){
    let currentUserNameEncode = getcookie("ac_username");
    if(currentUserNameEncode!='' && currentUserNameEncode!=undefined){
        let userName = decodeURI(currentUserNameEncode);
        let name = document.getElementsByClassName("up-name")[0].firstChild.innerText;
        console.log(name);
        if(userName == name){
            return 1;//是up主
        }else{
            return 2;//不是up主
        }
    }else{
        return 0;//未登录
    }
}