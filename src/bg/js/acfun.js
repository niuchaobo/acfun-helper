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
function ajax(method, url, data,header) {
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
        /*if(header){
            header.forEach(function (key, value) {
                request.setRequestHeader(key, value);
            })
        }*/
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.setRequestHeader("udid", "web_9920269298442E9A");
        request.setRequestHeader("Origin", 'https://www.acfun.cn');
        request.setRequestHeader("Origin", 'https://www.acfun.cn');

        request.send(data);
    });
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
function notice(title,message) {
    chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: 'images/notice.png',
        title: title,
        message: message
    });
}
