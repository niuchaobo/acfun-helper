/* global odhback, localizeHtmlPage, utilAsync, optionsLoad, optionsSave */

function populateDictionary(dicts) {
    $('#dict').empty();
    dicts.forEach(item => $('#dict').append($('<option>', { value: item.objectname, text: item.displayname })));
}


async function onOptionChanged(e) {
    if (!e.originalEvent) return;

    let options = await optionsLoad();
    options.enabled = $('#enabled').prop('checked');
    options.hotkey = $('#hotkey').val();
    options.dictSelected = $('#dict').val();
    options.wxenabled = $("#wxenabled").prop('checked');
    let newOptions = await odhback().opt_optionsChanged(options);
    optionsSave(newOptions);
}



async function onWxOptionChanged(e) {
    if (!e.originalEvent) return;

    let options = await optionsLoad();
    options.wxenabled = $("#wxenabled").prop('checked');
    if(options.wxenabled){
        //获取ticket
        let wx_ticket='';
        let ticket = await getTicketFromBackend().then(value => {if(value!=null){
            wx_ticket=value['ticket']
        }});
        if(wx_ticket!=''){
            options.qr_ticket=wx_ticket;
            $("#qrcode img").attr("src","https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+wx_ticket);
            $("#qrcode").wxshow();

        }
    }else{
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
    if(options.wxenabled){
        $("#qrcode").wxshow();
    }else{
        $("#qrcode").wxhide();
    }
}

async function adjustWxenabled(options){
    let userKey = options.userkey;
    if(userKey == ''){
        updateWxenabled(options);
        $("#wxenabled").change(onWxOptionChanged);
    }else{
        /*let userKeyDb = await getKeyFromDb();
        if(userKey == userKeyDb){
            $("#wxdiv").hide();
        }else{
            updateWxenabled(options);
            $("#wxenabled").change(onWxOptionChanged);
        }*/
        if(options.wxenabled){
            options.wxenabled=false;
            optionsSave(options);
        }
        $("#wxhead")[0].src=options.headimage;
        $("#wxhead").show();
        $("#wxdiv").hide();
    }
}

async function qrcodeListen(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;//浏览器兼容
    var config = {attributes: true}//配置对象
    $("#qrcode img").each(function(){
        var _this = $(this);
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(record) {
                if(record.type == "attributes"){//监听属性
                    let num = 0;
                    let interval = setInterval(async function () {
                        num++;
                        if(num>=30){
                            clearInterval(interval);
                            $("#ncb-shade-timeout img")[0].src=`${chrome.runtime.getURL('fg/img/timeout.png')}`;
                            $('#ncb-shade-timeout').show();
                        }
                        let img_src = _this[0].src;
                        //console.log(ticket);
                        if(img_src!=''){
                            let ticket = '';
                            var reg=/^http.*\?ticket=(.*)/;
                            if(reg.test(img_src)){
                                let res = img_src.match(reg);
                                ticket = res[1];
                            }
                            if(ticket!=''){
                                let user =await getKeyFromDb(ticket);
                                if(user!=null && user!=''){
                                    //let userObj = JSON.parse(user);
                                    let userKey = user['openid'];
                                    if(userKey!=''){
                                        let options =await optionsLoad();
                                        options.userkey = userKey;
                                        options.headimage = user['headimgurl'];
                                        options.nickName = user['nickname'];
                                        let newOptions = await odhback().opt_optionsChanged(options);
                                        optionsSave(newOptions);
                                        $("#wxhead")[0].src=options.headimage;
                                        $("#wxhead").show();
                                        $("#ncb-shade img")[0].src=`${chrome.runtime.getURL('fg/img/ok.png')}`;
                                        $("#ncb-shade").show();
                                        setTimeout(function () {
                                            $('#qrcode').hide();
                                        },2000);
                                        clearInterval(interval);
                                    }
                                }
                            }
                        }
                    },1000);
                }
            });
        });
        observer.observe(_this[0], config);
    });
}

async function popTranslate(e){
    //if (!e.originalEvent) return;
    let words = $("#searchWord").val();
    var result = await odhback().popTranslation(words);
    let notes = buildNote(result,words);
    let tdiv = renderDiv(notes);
    tdiv.then(value => fillResult(value));
    $('#odh-note1').hide();

}

function fillResult(value) {
    $(".crosspanel").html(value);
}



function buildNote(result,words) {
    let tmpl = {
        css: '',
        expression: words,
        reading: '',
        extrainfo: '',
        definitions: '',
        sentence:'',
        url: '',
        audios: [],
        reads: []
        //overview:'',
    };

    //if 'result' is array with notes.
    if (Array.isArray(result)) {
        for (const item of result) {
            for (const key in tmpl) {
                item[key] = item[key] ? item[key] : tmpl[key];
            }
        }
        return result;
    } else { // if 'result' is simple string, then return standard template.
        tmpl['definitions'] = [].concat(result);
        return [tmpl];
    }

}

async function renderDiv(notes) {
    let content = '';
    let services = this.options ? this.options.services : '';
    let image = '';
    let imageclass = '';

    for (const [nindex, note] of notes.entries()) {
        content += note.css + '<div class="odh-note'+nindex+'"' +'id=odh-note'+nindex+'>';
        //content += note.overview;
        let audiosegment = '';
        let audioArr = [];
        let audioImg = '';
        let likes = `<img title="收藏" src="${chrome.runtime.getURL('fg/img/likes.png')}"/>`;
        if (note.audios) {
            for (const [dindex, audio] of note.audios.entries()) {
                if (audio)
                    audioImg = `<img class="odh-playaudio" data-url="${audio}" data-nindex="${nindex}" data-dindex="${dindex}" src="${chrome.runtime.getURL('fg/img/play.png')}"/>`;
                    audioArr[dindex]=audioImg;
                    audiosegment += `${audioImg}`;
            }
        }
        if(nindex == 0){
            let read_uk = `${note.reads}`.length==0?'':`${note.reads[0]}`;
            let audio_uk = `${audioArr}`.length==0?'':`${audioArr[0]}`;
            let read_us = `${note.reads}`.length==0?'':`${note.reads[1]}`;
            let audio_us = `${audioArr}`.length==0?'':`${audioArr[1]}`;
            content += `
                <div class="odh-headsection">
                    <!--<span class="odh-audios">${audiosegment}</span>-->
                    <!--<span class="odh-expression">${note.expression}</span>-->
                    <span class="odh-reading">${read_uk}${audio_uk}</span>
                    <span class="odh-reading">${read_us}${audio_us}</span>
                    <span class="odh-extra">${note.extrainfo}</span>
                    <span class="odh-likes">${likes}</span>
                </div>`;
            content += `<div style="display: none" id="message"><img style="vertical-align:middle" width="15px" height="15px" src="${chrome.runtime.getURL('fg/img/likes.png')}" /><span class="message">test</span></div>`
        }else{
            content += `
                <div class="odh-headsection">
                    <!--<span class="odh-expression">${note.expression}</span>-->
                    <span class="odh-reading">${note.reading}</span>
                    <span class="odh-extra">${note.extrainfo}</span>
                </div>`;
        }
        for (const [dindex, definition] of note.definitions.entries()) {
            let button = (services == 'none' || services == '') ? '' : `<img ${imageclass} data-nindex="${nindex}" data-dindex="${dindex}" src="${chrome.runtime.getURL('fg/img/'+ image)}" />`;
            content += `<div class="odh-definition">${button}${definition}</div>`;
        }
        content += '</div>';
        if(nindex==0 && notes.length>1){
            content += '<div><span class="detail">点击展开柯林斯专业翻译</span></div>';
        }
    }
    //content += `<textarea id="odh-context" class="odh-sentence">${this.sentence}</textarea>`;
    //content += '<div id="odh-container" class="odh-sentence"></div>';
    return popupHeader() + content + popupFooter();
    //return content;
}

function popupHeader() {
    let root = chrome.runtime.getURL('/');
    return `
        <html lang="en">
            <head><meta charset="UTF-8"><title></title>
                <link rel="stylesheet" href="${root+'fg/css/frame.css'}">
                <link rel="stylesheet" href="${root+'fg/css/spell.css'}">
            </head>
            <body style="margin:0px;">
            <div class="odh-notes">`;
}

function popupFooter() {
    let root = chrome.runtime.getURL('/');
    let services = this.options ? this.options.services : '';
    let image = (services == 'ankiconnect') ? 'plus.png' : 'cloud.png';
    let button = chrome.runtime.getURL('fg/img/' + image);
    let monolingual = this.options ? (this.options.monolingual == '1' ? 1 : 0) : 0;

    return `
            </div>
            <div class="icons hidden"">
                <img id="plus" src="${button}"/>
                <img id="load" src="${root+'fg/img/load.gif'}"/>
                <img id="good" src="${root+'fg/img/good.png'}"/>
                <img id="fail" src="${root+'fg/img/fail.png'}"/>
                <img id="play" src="${root+'fg/img/play.png'}"/>
                <div id="context">${this.sentence}</div>
                <div id="monolingual">${monolingual}</div>
                </div>
            <!--<script src="${root+'fg/js/spell.js'}"></script>
            <script src="${root+'fg/js/frame.js'}"></script>-->
            </body>
        </html>`;
}

function spreadDetail(){
    if($('#odh-note1').is(':hidden')){
        $('#odh-note1').show();
        $('.detail').text('点击折叠柯林斯专业翻译');
    }else{
        $('#odh-note1').hide();
        $('.detail').text('点击展开柯林斯专业翻译');
    }
}

function playaudio(e){
    e.stopPropagation();
    e.preventDefault();
    let url = this.getAttribute('data-url');
    const audio = new Audio(url);
    audio.currentTime = 0;
    audio.play();
}


function messageShow(){
    $("#message").fadeIn(200,function () {
        $("#message").fadeOut(2000);
    });
}

function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
            if(callback) callback(response);
        });
    });
}

function renderTitle(tabId) {
    chrome.tabs.get(tabId, function(tab){
        $("#pop-title").html(tab.title);
        $("#pop-title").attr('title',tab.title);
    });
}

async function renderBody(result) {
    console.log(result);
    if(result == undefined || typeof(result) == undefined || result == 'undefined'){
        let empty = "<div class='pop-empty'>无资源</div>";
        $("#pop-body").html(empty);
    }else{
        let obj =await getStorage(result);
        let arr = new Array();
        for(var key of result){
            arr.push(obj[key]);
        }
        //将数据按照url分组,因为同一个tab页中的数据可能是不同页面的
        let map = new Map();
        for(let item of arr){
            let url = item.url;
            let tmp = map.get(url);
            if(tmp==null || tmp==undefined){
                tmp = new Array();
            }
            tmp.push(item);
            map.set(url,tmp);
        }

        let body = '';
        for (var [key, items] of map) {
            let id = hex_md5(key);
            let itemDiv = '<div class="layui-collapse" lay-filter="test">' +
                '<div class="layui-colla-item">' +
                '<h2 class="layui-colla-title">'+key+'</h2>' +
                '<div id="'+id+'" class="layui-colla-content layui-show">';
            for(let item of items){
                if(item.progress!=undefined){
                    itemDiv +=
                        '<div class="item">' +
                        '<div style="width: 33%" class="col title">'+item.duration+'</div>\n' +
                        '            <div id="'+item.lineId+'" style="width: 33%" class="col size">' +
                        '                <img class="pop-hide" style="vertical-align:middle" src="images/wait.svg"/>\n' +
                        '                <div style="margin-top: 18px" class="layui-progress" lay-filter="demo" lay-showPercent="true">\n' +
                        '                    <div style="width: '+item.progress+'" class="layui-progress-bar" lay-percent="'+item.progress+'">\n' +
                        '                        <span class="layui-progress-text">'+item.progress+'</span>\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '            </div>\n' +
                        '            <div style="width: 33%;float: right">\n' +
                        '                <a class="pop-download" data-id="'+item.lineId+'" data-title="'+item.title+'" data-segments="'+item.m3u8+'" style="float: right;cursor: pointer;color: #44af17" title="'+item.lineText+'">'+item.lineText+'</a>\n' +
                        '            </div>' +
                        '</div>';

                }else{
                    itemDiv +=
                        '<div class="item">' +
                        '<div style="width: 33%" class="col title">'+item.duration+'</div>\n' +
                        '            <div id="'+item.lineId+'" style="width: 33%" class="col size">' +
                        '                <img style="vertical-align:middle" src="images/wait.svg"/>\n' +
                        '                <div style="margin-top: 18px" class="layui-progress pop-hide" lay-filter="demo" lay-showPercent="true">\n' +
                        '                    <div class="layui-progress-bar" lay-percent="0%">\n' +
                        '                        <span class="layui-progress-text">0%</span>\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '            </div>\n' +
                        '            <div style="width: 33%;float: right">\n' +
                        '                <a class="pop-download" data-id="'+item.lineId+'" data-title="'+item.title+'" data-segments="'+item.m3u8+'" style="float: right;cursor: pointer;color: #44af17" title="下载">下载</a>\n' +
                        '            </div>' +
                        '</div>';
                }


            }
            itemDiv+='</div>' +
                '</div>' +
                '</div>';
            body+=itemDiv;

        }


        $("#pop-body").html(body);
        layui.element.init();
    }
}


async function tabQuery(option) {
    return new Promise((resolve, reject) => {
        chrome.tabs.query(option, (res) => {
            resolve(res);
        });
    });
}

function observerPop(mutationsList) {
    mutationsList.forEach(function(item,index){
        if (item.type == 'childList') {
            //console.log(item.target.innerHTML);
        } else if (item.type == 'attributes') {
            //console.log('修改了'+item.attributeName+'属性');
        }
    });
    layui.element.render('collapse');
    layui.element.render('progress');
}

async function downloadVideo(e) {
    var text = $(this).text();
    if(text != '下载'){
        return;
    }
    let m3u8 = $(this).data('segments');
    let title = $(this).data('title');
    let id = $(this).data('id');
    $(this).text('下载中');
    let tabId =await tabQuery({"active":true,"currentWindow":true}).then(tabs=>{let t = tabs[0];return t.id});

    let lineItem = await getStorage(id).then(result => {return result[id]});
    lineItem.progress = 0+"%";
    lineItem.lineText = '下载中';

    //修改在storage中的数据
    chrome.storage.local.set({[id]: lineItem}, function () {
        if (chrome.runtime.lastError) {
            notice('Acfun下载助手', chrome.runtime.lastError.message)
        }
    });

    //让 background.js 执行下载逻辑
    var bg = chrome.extension.getBackgroundPage();
    odhback().downloadVideo(m3u8,title,id,tabId);

}

async function onReady() {
    //监听dom结构变化,layui重新渲染
    var targetNode = document.getElementById('pop-body');

    // 观察者的选项(要观察哪些突变)
    var config = {childList: true};
    //var config = { attributes: true, childList: true, subtree: true };

    // 创建一个链接到回调函数的观察者实例
    var observer = new MutationObserver(observerPop);

    // 开始观察已配置突变的目标节点
    observer.observe(targetNode, config);

    layui.use(['element', 'layer'], function(){
        var element = layui.element;
        var layer = layui.layer;
        //element.progress('demo', '5%');

        element.on('collapse(test)', function(data){

        });
    });
    let tabId =await tabQuery({"active":true,"currentWindow":true}).then(tabs=>{let t = tabs[0];return t.id});


    //获取当前tab存储的视频信息
    //let tabId =await getStorage('activeTabId').then(result => {return result['activeTabId']});
    let result = await getStorage(tabId.toString()).then(result => {return result[tabId.toString()]});


    //生成页面
    renderTitle(tabId);
    renderBody(result);

    //监听下载按钮点击事件
    $("#pop-body").on('click','.pop-download',downloadVideo);

    localizeHtmlPage();
    let options = await optionsLoad();
}



$(document).ready(utilAsync(onReady));