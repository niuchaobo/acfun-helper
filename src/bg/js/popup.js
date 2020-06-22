/* global odhback, localizeHtmlPage, utilAsync, optionsLoad, optionsSave */

function populateDictionary(dicts) {
    $('#dict').empty();
    dicts.forEach(item => $('#dict').append($('<option>', { value: item.objectname, text: item.displayname })));
}


async function onOptionChanged(e) {
    if (!e.originalEvent) return;

    let options = await optionsLoad();
    options.enabled = $('#extends-enbaled').prop('checked');
    let newOptions = await odhback().opt_optionsChanged(options);
    optionsSave(newOptions);
}



async function onWxOptionChanged(e) {
    if (!e.originalEvent) return;

    let options = await optionsLoad();
    options.wxenabled = $("#wxenabled").prop('checked');
    if (options.wxenabled) {
        //获取ticket
        let wx_ticket = '';
        let ticket = await getTicketFromBackend().then(value => {
            if (value != null) {
                wx_ticket = value['ticket']
            }
        });
        if (wx_ticket != '') {
            options.qr_ticket = wx_ticket;
            $("#qrcode img").attr("src", "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + wx_ticket);
            $("#qrcode").wxshow();

        }
    } else {
        $("#qrcode").wxhide();
    }
    let newOptions = await odhback().opt_optionsChanged(options);
    optionsSave(newOptions);
}


function onMoreOptions() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
}

function updateWxenabled(options) {
    options.wxenabled = $("#wxenabled").prop('checked');
    if (options.wxenabled) {
        $("#qrcode").wxshow();
    } else {
        $("#qrcode").wxhide();
    }
}

async function adjustWxenabled(options) {
    let userKey = options.userkey;
    if (userKey == '') {
        updateWxenabled(options);
        $("#wxenabled").change(onWxOptionChanged);
    } else {
        /*let userKeyDb = await getKeyFromDb();
        if(userKey == userKeyDb){
            $("#wxdiv").hide();
        }else{
            updateWxenabled(options);
            $("#wxenabled").change(onWxOptionChanged);
        }*/
        if (options.wxenabled) {
            options.wxenabled = false;
            optionsSave(options);
        }
        $("#wxhead")[0].src = options.headimage;
        $("#wxhead").show();
        $("#wxdiv").hide();
    }
}

async function qrcodeListen() {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;//浏览器兼容
    var config = { attributes: true }//配置对象
    $("#qrcode img").each(function () {
        var _this = $(this);
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (record) {
                if (record.type == "attributes") {//监听属性
                    let num = 0;
                    let interval = setInterval(async function () {
                        num++;
                        if (num >= 30) {
                            clearInterval(interval);
                            $("#ncb-shade-timeout img")[0].src = `${chrome.runtime.getURL('fg/img/timeout.png')}`;
                            $('#ncb-shade-timeout').show();
                        }
                        let img_src = _this[0].src;
                        //console.log(ticket);
                        if (img_src != '') {
                            let ticket = '';
                            var reg = /^http.*\?ticket=(.*)/;
                            if (reg.test(img_src)) {
                                let res = img_src.match(reg);
                                ticket = res[1];
                            }
                            if (ticket != '') {
                                let user = await getKeyFromDb(ticket);
                                if (user != null && user != '') {
                                    //let userObj = JSON.parse(user);
                                    let userKey = user['openid'];
                                    if (userKey != '') {
                                        let options = await optionsLoad();
                                        options.userkey = userKey;
                                        options.headimage = user['headimgurl'];
                                        options.nickName = user['nickname'];
                                        let newOptions = await odhback().opt_optionsChanged(options);
                                        optionsSave(newOptions);
                                        $("#wxhead")[0].src = options.headimage;
                                        $("#wxhead").show();
                                        $("#ncb-shade img")[0].src = `${chrome.runtime.getURL('fg/img/ok.png')}`;
                                        $("#ncb-shade").show();
                                        setTimeout(function () {
                                            $('#qrcode').hide();
                                        }, 2000);
                                        clearInterval(interval);
                                    }
                                }
                            }
                        }
                    }, 1000);
                }
            });
        });
        observer.observe(_this[0], config);
    });
}


function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) callback(response);
        });
    });
}



async function tabQuery(option) {
    return new Promise((resolve, reject) => {
        chrome.tabs.query(option, (res) => {
            resolve(res);
        });
    });
}

function openUpdateLog() {
    //window.open("update-log.html","_blank");
    var a = $("<a href='update-log.html' target='_blank'></a>").get(0);
    var e = document.createEvent('MouseEvents');
    e.initEvent('click', true, true);
    a.dispatchEvent(e);
}
function openIntroduce() {
    //window.open("guide.html","_blank");
    var a = $("<a href='guide.html' target='_blank'></a>").get(0);
    var e = document.createEvent('MouseEvents');
    e.initEvent('click', true, true);
    a.dispatchEvent(e);
}
function openSetting() {
    //window.open("options.html","_blank");
    var a = $("<a href='options.html' target='_blank'></a>").get(0);
    var e = document.createEvent('MouseEvents');
    e.initEvent('click', true, true);
    a.dispatchEvent(e);

}

function watchLive() {
    let uid = $("#live-id").val();
    //不输入uid时，跳转到直播首页（以前是404）
    let reg = /^\d{1,}$/
    let pattern= new RegExp(reg);
    let url = pattern.test(uid) ? url = `http://live.acfun.cn/live/${uid}` : `https://live.acfun.cn/`
    var a = $("<a href='" + url + "' target='_blank'></a>").get(0);
    var e = document.createEvent('MouseEvents');
    e.initEvent('click', true, true);
    a.dispatchEvent(e);
}
function fetchPushContent() {
    chrome.storage.local.get(['AcpushList'], function (data) {
        console.log(data);
        $('#pop-push').append(data.AcpushList);
    })
}
var pushListData = {
    index: 1,  // 推送当前页码
    innerText: null,
    busy: false, // 当前忙
    firstLoad: true, // 第一次加载推送列表
    arriveEnd: false, // 到达终点
}
function renderPushInnerHtml() {
    pushListData.busy = true
    if(pushListData.index==1){
    chrome.storage.local.get(['AcpushList1'],function(data){
        $('#pop-push').append(data.AcpushList1);
    })}
    pushListData.index++;
    fetch('https://www.acfun.cn/rest/pc-direct/feed/followFeed?isGroup=0&gid=-1&count=30&pcursor=' + pushListData.index)
        .then((res) => { return res.text(); })
        .then((res) => {
            let rawdata = JSON.parse(res);
            if (rawdata.feedList.length === 0) {
                pushListData.arriveEnd = true
                $('#pop-push').append('<p class="push_end" style=\"text-align: center;margin: 5px 5px 5px 5px;\">没有更多数据了</p>')
                return
            }
            pushListData.innerText = '';
            for (let i = 0; i < rawdata.feedList.length; i++) {
                let data = rawdata.feedList[i];
                let xmlData = "<div class=\"inner\" id=\"";
                xmlData += data.aid + "\">" + "<div class=\"l\"><a target=\"_blank\" href=\"";
                xmlData += "https://www.acfun.cn" + data.url + "\"";
                xmlData += " class=\"thumb thumb-preview\"><img data-aid=\"";
                xmlData += data.aid + "\" src=\"" + data.titleImg + "\" class=\"preview\"> <div class=\"cover\"></div> </a> </div> <div class=\"r\"> <a data-aid=\"" + data.aid + " \"target=\"_blank\" href=\"" + "https://www.acfun.cn" + data.url + "\" class=\"title\">";
                xmlData += data.title + "</a> </p> <div class=\"info\"><a target=\"_blank\" data-uid=\"";
                xmlData += data.aid + "\" href=\"https://www.acfun.cn/u/" + data.userId + "\" class=\"name\"> ";
                xmlData += data.username + " </a><span class=\"time\">" + getTimeSinceNow(data.releaseDate) + "</span> </div> </div> </div> ";
                pushListData.innerText += xmlData;
            }
            $('#pop-push').append(pushListData.innerText)
            // pushListData.index++
            setTimeout(() => {
                pushListData.busy = false
            }, 0)
            if (pushListData.firstLoad) {
                setTimeout(() => {
                    $(window).bind('scroll', e => {
                        if (pushListData.busy || pushListData.arriveEnd) {
                            return
                        }
                        pushListData.firstLoad = false
                        let scrollTop = $(window).scrollTop()
                        if (scrollTop + 10 > $(document).height() - $(window).height()) {
                            pushListData.busy = false
                            renderPushInnerHtml()
                        }
                    }
                    )
                }, 0)
            }

        });
}

function renderMomentCircleHtml() {
    chrome.storage.local.get(['AcMomentCircle1'], function (data) {
        $('#pop-push-momentcircle').append(data.AcMomentCircle1);
    })
}
function renderLives(){
    chrome.storage.local.get(['broadcastingUIDlist'],function(data){
        console.log(data);
        for(let i in data.broadcastingUIDlist){
            if(data.broadcastingUIDlist[i]==true){
                fetch('https://live.acfun.cn/api/live/info?authorId='+i).then((res)=>{return res.text()})
                .then((res)=>{
                    let live_Data = '';
                    let livedata = JSON.parse(res);
                    let livexmlData="<div class=\"inner\" id=\"";
                    livexmlData+=livedata.authorId+"\">" + "<div class=\"l\"><a target=\"_blank\" href=\"";
                    livexmlData+="https://live.acfun.cn/live/"+livedata.authorId+"\"";
                    livexmlData+=" class=\"thumb thumb-preview\"><img data-aid=\"";
                    livexmlData+=livedata.authorId + "\" src=\""+livedata.coverUrls[0]+"\" class=\"preview\"> <div class=\"cover\"></div> </a> </div> <div class=\"r\"> <a data-aid=\""+livedata.authorId+" \"target=\"_blank\" href=\"" +"https://live.acfun.cn/live/"+livedata.authorId+"\" class=\"title\">";
                    livexmlData+=livedata.title+"</a> </p> <div class=\"info\"><a target=\"_blank\" data-uid=\"";
                    livexmlData+=livedata.authorId+"\" href=\"https://www.acfun.cn/u/"+livedata.authorId+"\" class=\"name\">";
                    livexmlData += livedata.user.name + " </a></div> </div> </div> ";
                    live_Data+=livexmlData;
                    $('#pop-push-lives').append(live_Data);
                })
            }
        }
        let No_data = '<p class="push_end" style="margin: 5px 5px 5px 5px;">没有更多数据了</p>'
        $('#pop-push-lives').append(No_data);
    })
}

$('.toTop').click(function(){$('html,body').animate({scrollTop: '0px'}, 600);});
function toTopHidden(){
    $(document).scroll(function () {
          let top = $(".mdui-fab").offset().top;
          if (top < 2000) {
            $(".mdui-fab")
              .css({ "opacity":'0'});
        }else{
            $(".mdui-fab")
              .css({ "opacity":'1'});
        }
      });
}
toTopHidden()
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
async function onReady() {
    localizeHtmlPage();
    let options = await optionsLoad();
    //fetchPushContent();
    renderPushInnerHtml();
    renderMomentCircleHtml();
    renderLives();
    $("#extends-enbaled").prop('checked', options.enabled);
    $("#extends-enbaled").change(onOptionChanged);
    $("#pop-update-log").click(openUpdateLog);
    $("#pop-introduce").click(openIntroduce);
    $("#pop-setting").click(openSetting);
    $("#go-live").click(watchLive);

}
document.addEventListener('DOMContentLoaded', function (e) {
    //处理pop页面宽度
    let browser = myBrowser();
    if (browser == 'FF') {
        document.getElementById("pop-push").style.width = "95%";
    }
});


$(document).ready(utilAsync(onReady));
