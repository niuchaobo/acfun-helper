/* global spell */
function getImageSource(id) {
    return document.querySelector(`#${id}`).src;
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

function lottery() {
    let number = $("#lucy-number").val();
    if(number=='' || Number(number)<=0){
        return false;
    }
    let isFollow = $("#lucy-follow").val();
    window.parent.postMessage({
        action: 'lottery',
        params: {
            number: number,
            isFollow: isFollow
        }
    }, '*');

}

function checkNumber() {
    var value = $("#lucy-number").val();
    var re = /^[1-9]+[0-9]*]*$/;
    if(!re.test(value)) {
        $("#lucy-number").val("");
        //return false;

    }
}

function api_showLucyResult(params) {
    let src = "bg/images/copy_link.png";
    let {arr} = params;
    let lucyUser = JSON.parse(arr);
    console.log(lucyUser);
    let html = "";
    for(let i=0;i<lucyUser.length;i++){
        let obj = lucyUser[i];
        console.log(obj);
        html += ' <div class="odh-definition">\n' +
            '         <a target="_blank" href="'+obj.url+'" class="comment-label">'+obj.name+'</a>\n' +
            '             <span style="margin-right: 10px">#'+obj.floor+'</span>\n' +
            '             <div id="ncb-div" style="">\n' +
            '                                 '+obj.comment+'\n' +
            '             </div>\n' +
            '      </div>'
    }
    $("#lucy-result").html(html);

}

function onDomContentLoaded() {
    registVideoClick();
    $("#comment-scan").change(scanChange);
    $("#comment-mark").change(markChange);
    $("#comment-receive").change(receiveChange);
    $("#copy-link-super").bind('click',{"id":'#live-url-super'},copyLink);
    $("#copy-link-high").bind('click',{"id":'#live-url-high'},copyLink);
    //抽奖
    $("#lucy-chou").bind('click',lottery);
    $("#lucy-number").bind('keyup',checkNumber);
    $("#ncb").click(function () {
        $("#ncb-div").show();
    })
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
