async function acfunParse(href) {
    //根据href判断是视频还是番剧
    let video = new RegExp('http(s)?:\\/\\/www.acfun.cn\\/v\\/.*');
    let bangumi = new RegExp('http(s)?:\\/\\/www.acfun.cn\\/bangumi\\/.*');
    let pageData = await getPageData(href);
    if(video.test(href)){
        //找分p标记
        let multiFlag = findMultiFlag(pageData);
    }else if(bangumi.test(href)){

    }else{
        //error
    }
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
        client.onreadystatechange = handler;
        client.responseType = "blob";
        client.send();

    });

    return promise;
};
function ajax(method, url, data) {
    var request = new XMLHttpRequest();
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
        request.send(data);
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

function updatePop(item) {

    var views = chrome.extension.getViews({type:'popup'});
    if(views.length <= 0) {
        return;
    }
    let pop = views[0];
    let id = item.urlMd5;
    var itemHtml = '<div class="item">' +
        '               <div style="width: 33%" class="col title">'+item.duration+'</div>\n' +
        '                   <div id="'+item.lineId+'" style="width: 33%" class="col size">' +
        '                       <img style="vertical-align:middle" src="images/wait.svg"/>\n' +
        '                       <div style="margin-top: 18px" class="layui-progress pop-hide" lay-filter="demo" lay-showPercent="true">\n' +
        '                           <div class="layui-progress-bar" lay-percent="0%">\n' +
        '                               <span class="layui-progress-text">0%</span>\n' +
        '                           </div>\n' +
        '                       </div>\n' +
        '                   </div>\n' +
        '                   <div style="width: 33%;float: right">\n' +
        '                       <a class="pop-download" data-title="'+item.title+'" data-id="'+item.lineId+'" data-segments="'+item.m3u8+'" style="float: right;cursor: pointer;color: #44af17" title="下载">下载</a>\n' +
        '                   </div>' +
        '            </div>';
    let tag = pop.document.getElementById(id);
    if(tag == undefined || tag == null){
        let head = '<div class="layui-collapse" lay-filter="test">' +
            '           <div class="layui-colla-item">' +
            '               <h2 class="layui-colla-title">'+item.url+'</h2>' +
            '                   <div id="'+id+'" class="layui-colla-content layui-show">';

        let foot = '        </div>' +
            '           </div>' +
            '       </div>';
        itemHtml=head+itemHtml+foot;
        //判断当前body的内容是否是"无资源"
        if(pop.document.getElementsByClassName("pop-empty").length>0){
            $(pop.document.getElementById("pop-body")).html("").append(itemHtml);
        }else{
            $(pop.document.getElementById("pop-body")).append(itemHtml);
        }
    }else{
        $(pop.document.getElementById(id)).append(itemHtml);
    }
}

async function saveTabRes(res, tab, m3u8Url) {
    var tabId = tab.id+"";
    var tabTitle = tab.title;
    var totalSecond = countTotal(res);
    var duration = formateSeconds(totalSecond);
    if(totalSecond<1){
        return;
    }
    //视频信息
    var arr = new Array();
    //先判断此tabId下是否有数据
    let result = await getStorage(tabId).then(result => {return result[tabId]});
    if(typeof(result) == undefined || result == 'undefined' || result == undefined){
        let arr = new Array();
        let obj = new Object();
        obj.title = tabTitle;
        obj.segments = res.segments;//分段信息
        obj.m3u8=m3u8Url;
        obj.duration=duration;
        obj.url=tab.url;
        obj.urlMd5=hex_md5(tab.url);//popup中折叠面板的id
        obj.lineId=hex_md5(m3u8Url);//折叠面板中每一条记录的id
        arr[0] = obj.lineId;
        chrome.storage.local.set({[tabId]: arr}, function () {
            if(chrome.runtime.lastError){
                notice("警告",chrome.runtime.lastError.message);
            }else{
                chrome.storage.local.set({[obj.lineId]: obj}, function () {
                    if(chrome.runtime.lastError){
                        notice("警告",chrome.runtime.lastError.message);
                    }
                });
            }
        });
        updatePop(obj);
    }else{
        let index = result.length;
        let obj = new Object();
        obj.title = tabTitle;
        obj.segments = res.segments;//分段信息
        obj.m3u8=m3u8Url;
        obj.duration=duration;
        obj.url=tab.url;
        obj.urlMd5=hex_md5(tab.url);//popup中折叠面板的id
        obj.lineId=hex_md5(m3u8Url);//折叠面板中每一条记录的id
        result[index]=obj.lineId;
        chrome.storage.local.set({[tabId]: result}, function () {
            if(chrome.runtime.lastError){
                notice("警告",chrome.runtime.lastError.message);
            }else{
                chrome.storage.local.set({[obj.lineId]: obj}, function () {
                    if(chrome.runtime.lastError){
                        notice("警告",chrome.runtime.lastError.message);
                    }
                });
            }
            
        });
        updatePop(obj);
    }
}

function getStorage(key) {
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

function countTotal(m3u8) {
    var total = 0;
    for(var obj of m3u8.segments){
        let seconds = obj.duration;
        total = Number(total)+Number(seconds);
    }
    return total;
}

//将秒转化为时分秒
function formateSeconds(endTime){
    let secondTime = parseInt(endTime)//将传入的秒的值转化为Number
    let min = 0// 初始化分
    let h =0// 初始化小时
    let result=''
    if(secondTime>60){//如果秒数大于60，将秒数转换成整数
        min=parseInt(secondTime/60)//获取分钟，除以60取整数，得到整数分钟
        secondTime=parseInt(secondTime%60)//获取秒数，秒数取佘，得到整数秒数
        if(min>60){//如果分钟大于60，将分钟转换成小时
            h=parseInt(min/60)//获取小时，获取分钟除以60，得到整数小时
            min=parseInt(min%60) //获取小时后取佘的分，获取分钟除以60取佘的分
        }
    }
    result=`${h.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${secondTime.toString().padStart(2,'0')}`
    return result
}
async function urlExists(url,tabId) {
    let reg = new RegExp('https:\\/\\/.*m3u8|http:\\/\\/.*m3u8');
    let before = url.match(reg)[0];
    let result = await getStorage(tabId).then(result => {return result[tabId]});
    if(typeof(result) == undefined || result == 'undefined' || result == undefined){
        return 0;
    }else{
        let objs =await getStorage(result);
        let arr = new Array();
        for(var key of result){
            arr.push(objs[key]);
        }
        for(let obj of arr){
            let m3u8 = obj.m3u8;
            let tmp = m3u8.match(reg)[0];
            if(before == tmp){
                return 1;
            }
        }
        return 0;
    }

}
function notice(title,message) {
    chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: 'images/notice.png',
        title: title,
        message: message
    });

}