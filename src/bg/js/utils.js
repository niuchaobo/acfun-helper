function sanitizeOptions(options) {
    const defaults = {
        apidomain: 'http://bdc.zdq1688.com',
        //apidomain: 'http://localhost:8002',
        userkey: '',
        wxenabled: true,
        enabled: true,
        hotkey: '16', // 0:off , 16:shift, 17:ctrl, 18:alt
        maxcontext: '1',
        maxexample: '2',
        monolingual: '0', //0: bilingual 1:monolingual
        preferredaudio: '0',
        services: 'none',
        id: '',
        password: '',

        deckname: 'Default',
        typename: 'Basic',
        expression: 'Front',
        reading: '',
        extrainfo: '',
        definition: 'Back',
        definitions: '',
        sentence: '',
        url: '',
        audio: '',

        sysscripts: 'builtin_encn_Collins,general_Makenotes,cncn_Zdic,encn_Collins',
        udfscripts: '',

        dictSelected: 'encn_Collins',
        dictNamelist: [],
        qr_ticket: '',
        headimage: '',
        nickName:'',
        activeTabKey:'activeTabId',
        extendsName:'Acfun下载助手',
    };

    for (const key in defaults) {
        if (!options.hasOwnProperty(key)) {
            options[key] = defaults[key];
        }
    }
    return options;
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
        chrome.storage.local.set(sanitizeOptions(options), resolve());
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
