function sanitizeOptions(options) {
    const defaults = {
        auto_throw:false,
        to_attention:true,
        to_attention_num:5,
        to_special_items:[],
        activeTabKey:'activeTabId',
        extendsName:'Acfun下载助手',
        upUrlTemplate:'https://www.acfun.cn/u/{uid}.aspx',
        banana_notice:true

    };

    for (const key in defaults) {
        if (!options.hasOwnProperty(key)) {
            options[key] = defaults[key];
        }
    }
    return options;
}

//只更新这些值
function transOptions(options) {
    const defaults = {
        auto_throw:false,
        to_attention:true,
        to_attention_num:5,
        to_special_items:[],
        activeTabKey:'activeTabId',
        extendsName:'Acfun下载助手',
        upUrlTemplate:'https://www.acfun.cn/u/{uid}.aspx',
        banana_notice:true
    };

    for (const key in defaults) {
        if (options.hasOwnProperty(key)) {
            defaults[key] = options[key];
        }
    }
    return defaults;
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
        el.innerHTML = chrome.i18n.getMessage(el.getAttribute('data-i18n'));
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

async function addtofavourite(data){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://bdc.zdq1688.com/pocket/crx/addFavourite',
            type: 'POST',
            timeout: 20000,
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: (data) => {resolve(data)},
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
        if(header){
            header.forEach(function (key, value) {
                request.setRequestHeader(key, value);
            })
        }
        request.send(data);
    });
}
