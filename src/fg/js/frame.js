/* global spell */
function getImageSource(id) {
    return document.querySelector(`#${id}`).src;
}

function registerAddNoteLinks() {
    for (let link of document.getElementsByClassName('odh-addnote')) {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const ds = e.currentTarget.dataset;
            e.currentTarget.src = getImageSource('load');
            window.parent.postMessage({
                action: 'addNote',
                params: {
                    nindex: ds.nindex,
                    dindex: ds.dindex,
                    context: document.querySelector('.spell-content').innerHTML
                }
            }, '*');
        });
    }
}

function registerAudioLinks() {
    for (let link of document.getElementsByClassName('odh-playaudio')) {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const ds = e.currentTarget.dataset;
            window.parent.postMessage({
                action: 'playAudio',
                params: {
                    nindex: ds.nindex,
                    dindex: ds.dindex
                }
            }, '*');
        });
    }
}

function registerSoundLinks() {
    for (let link of document.getElementsByClassName('odh-playsound')) {
        link.setAttribute('src', getImageSource('play'));
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const ds = e.currentTarget.dataset;
            window.parent.postMessage({
                action: 'playSound',
                params: {
                    sound: ds.sound,
                }
            }, '*');
        });
    }
}

function registerHiddenClass() {
    for (let div of document.getElementsByClassName('odh-definition')) {
        div.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            hideTranslation();
        });
    }
}

function registSpreadDetail() {
    let doc = document.getElementById("odh-note1");
    if(doc==null){
        return;
    }
    document.getElementById("odh-note1").style.display="none";
    for (let div of document.getElementsByClassName('detail')) {
        div.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            spreadDetail();
        });
    }
}

function registAddFavourite() {
    for (let link of document.getElementsByClassName('odh-likes')) {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            window.parent.postMessage({
                action: 'addFavourite'
            }, '*');
        });
    }
}



function spreadDetail(){

    if(document.getElementById("odh-note1").style.display==""){
        document.getElementById("odh-note1").style.display="none";
        document.getElementById("f-detail").innerText='点击展开柯林斯专业翻译';
        /*let h = 400;
        let w = window.document.body.clientWidth;
        window.parent.postMessage({
            action: 'changeHeight',
            params: {
                height: h,
                width: w,
            }
        }, '*');*/

    }else{
        document.getElementById("odh-note1").style.display="";
        document.getElementById("f-detail").innerText='点击折叠柯林斯专业翻译';
        /*let h = 400;
        let w = window.document.body.clientWidth;
        window.parent.postMessage({
            action: 'changeHeight',
            params: {
                height: h,
                width: w,
            }
        }, '*');*/
    }
}


function hideTranslation(){
    let className = 'span.chn_dis, span.chn_tran, span.chn_sent, span.tgt_tran, span.tgt_sent'; // to add your bilingual translation div class name here.
    for (let div of document.querySelectorAll(className)) {
        div.classList.toggle('hidden');
    }
}

function registVideoClick() {
    for (let link of document.getElementsByClassName('pos simple')) {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const ds = e.currentTarget.dataset;
            if(ds.run=="true"){

                window.parent.postMessage({
                    action: 'notice',
                    params: {
                        title: '',
                        msg:'请耐心等待，视频正在下载中',
                    }
                }, '*');

                return;
            }
            window.parent.postMessage({
                action: 'download',
                params: {
                    url: ds.url,
                    title:ds.title,
                    id:ds.id,
                    qualityLabel:ds.quality
                }
            }, '*');
            e.currentTarget.dataset.run="true";
        });
    }
}

function markChange(e) {
    let value = $(this).prop('checked');
    window.parent.postMessage({
        action: 'mark',
        params: {
            value: value,
        }
    }, '*');
}

function scanChange(e) {
    let value = $(this).prop('checked');
    window.parent.postMessage({
        action: 'scan',
        params: {
            value: value,
        }
    }, '*');
}
function receiveChange(e) {
    let value = $(this).prop('checked');
    window.parent.postMessage({
        action: 'receive',
        params: {
            value: value,
        }
    }, '*');
}

function copyLink(event) {
    let id = event.data.id;
    let live_url = $(id).text();
    if(live_url!=''){
        var aux = document.createElement("input");
        aux.setAttribute("value", live_url);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
        $("#live-msg").text("链接已复制到剪贴板");
        $("#live-msg").fadeIn(200,function () {
            $("#live-msg").fadeOut(2000);
        });
    }
}


function onDomContentLoaded() {
    registVideoClick();
    $("#comment-scan").change(scanChange);
    $("#comment-mark").change(markChange);
    $("#comment-receive").change(receiveChange);
    $("#copy-link-super").bind('click',{"id":'#live-url-super'},copyLink);
    $("#copy-link-high").bind('click',{"id":'#live-url-high'},copyLink);
   /* registSpreadDetail();
    registAddFavourite();
    registerAddNoteLinks();
    registerAudioLinks();
    registerSoundLinks();
    registerHiddenClass();*/
    //initSpellnTranslation();
}

function onMessage(e) {
    const { action, params } = e.data;
    const method = window['api_' + action];
    if (typeof(method) === 'function') {
        method(params);
    }
}

function api_updateProgress(params) {
    let {progress,id} = params;
    document.getElementById(id+"-bar").style.width=progress+"%";
    document.getElementById(id+"-text").innerText=progress+"%";
}

function api_updateLiveUrl(params) {
    console.log("update:"+params);
    let {live_url} = params;
    let super_url = live_url.replace('_sd1000','');
    $("#live-url-high").text(live_url);
    $("#live-url-super").text(super_url);
}

function api_setActionState(result) {
    const { response, params } = result;
    const { nindex, dindex } = params;

    const match = document.querySelector(`.odh-addnote[data-nindex="${nindex}"].odh-addnote[data-dindex="${dindex}"]`);
    if (response)
        match.src = getImageSource('good');
    else
        match.src = getImageSource('fail');

    setTimeout(() => {
        match.src = getImageSource('plus');
    }, 1000);
}

function api_showMessage(result){
    let {res ,params} = result ;
    document.getElementById("ncb-image").src=res.src;
    document.getElementById("ncb-span").innerText=decodeURI(res.message);
    fadeIn('message',10);
    //fadeOut('message',0.5);

}

function fadeIn(id,speed){
    var ele=document.getElementById(id);
    var opacitynum=ele.style.opacity||0;
    ele.style.display='inline';
    //var speed=(speed/100)||100;
    function opacityAdd(){
        if(opacitynum<1){
            ele.style.opacity=opacitynum=(parseFloat(opacitynum)+0.01).toFixed(2);
        }else{
            clearInterval(opacityt);
            fadeOut(id,10);
        }
    }
    var opacityt=setInterval(opacityAdd,speed);
}


function fadeOut(id,speed){
    var ele=document.getElementById(id);
    var opacitynum=ele.style.opacity||1;
    //var speed=(speed/100)||100;
    function opacityOff(){
        if(opacitynum>0){
            ele.style.opacity=opacitynum=(opacitynum-0.01).toFixed(2);
        }else{
            clearInterval(opacityt);
            ele.style.display='none';
        }
    }
    var opacityt=setInterval(opacityOff,speed);
}


function onMouseWheel(e) {
    document.querySelector('html').scrollTop -= e.wheelDeltaY / 3;
    document.querySelector('body').scrollTop -= e.wheelDeltaY / 3;
    //e.preventDefault();
}

document.addEventListener('DOMContentLoaded', onDomContentLoaded, false);
/*window.onload = function(){
    let h = window.document.body.clientHeight;
    let w = window.document.body.clientWidth;
    window.parent.postMessage({
        action: 'autoHeight',
        params: {
            height: h,
            width: w,
        }
    }, '*');
}*/
window.addEventListener('message', onMessage);
window.addEventListener('wheel', onMouseWheel,{ passive: true });
