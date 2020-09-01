/* global spell */
function getImageSource(id) {
    return document.querySelector(`#${id}`).src;
}

function downloadDanmaku(){
    try {
        let danmaku_dldBtn = document.getElementById('danmakuDownload');
        danmaku_dldBtn.addEventListener('click',function(){
            window.parent.postMessage({
                action: 'downloadDanmaku',
            }, '*');
        })
    } catch (error) {
        
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
                        msg:'请耐心等待，视频正在下载中...',
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
    let isFollow = $("#lucky-follow").prop('checked');
    if(number=='' || Number(number)<=0){
        alert("抽奖数值为空，请指定一下抽奖数量。")
        return false;
    }
    $('#lucy-chou').loading({text:'请稍候',num:3,rate: 1000,style:'.'});
    window.parent.postMessage({
        action: 'lottery',
        params: {
            number: number,
            follow: isFollow
        }
    }, '*');

}

function lotteryAgain() {
    let number = $("#lucy-number").val();
    let isFollow = $("#lucky-follow").prop('checked');
    if(number=='' || Number(number)<=0){
        alert("抽奖数值为空，请指定一下抽奖数量。")
        return false;
    }
    $('#lucy-chouAgain').loading({text:'请稍候',num:3,rate: 1000,style:'.'});
    window.parent.postMessage({
        action: 'lottery2nd',
        params: {
            number: number,
            follow: isFollow
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

function getParentUid(){
    let ureg = new RegExp('/u/([0-9].*[0-9]$)');
    let this_userUchref=window.parent.document.getElementsByClassName('up-name')[0].href;
    let Uid = ureg.exec(this_userUchref)[1];
    return Uid
}

function liveSubscribe(){
    fetch("http://localhost:51880/liststreamer").then((res)=>{
        if(res.ok) {
            return res.text();
          }
          throw new Error('Network response was not ok.');
    })
    .then((res)=>{
        let x = JSON.parse(res);
        // console.log(x);
        let Uid = getParentUid();
        if(x!=null){
            for(let i=0;i<x.length;i++){
                if(Uid==Number(Uid) & Uid == x[i].UID){
                    alert("已经订阅关注了");
                    return;
                }
            }
        }
        fetch('http://localhost:51880/addnotify/'+Uid).then((res)=>{return res.text()})
        .then((res)=>{
            alert("订阅成功");
        })
    })
}

function livecancelDanmuFtch(){
    let Uid = getParentUid();
    fetch("http://localhost:51880/deldanmu/"+Uid).then((res)=>{return res.text();})
    .then((res)=>{
        if(res=='true'){alert('已成功取消弹幕下载关注')}else{alert('未知错误')};
    })
}

function liveDanmuFtch(){
    let Uid = getParentUid();
    fetch("http://localhost:51880/adddanmu/"+Uid).then((res)=>{return res.text();})
    .then((res)=>{
        if(res=='true'){alert('已成功启动弹幕下载关注')}else{alert('未知错误')};
    })
}

function cancelStartliveDanmuFtch(){
    let Uid = getParentUid();
    fetch("http://localhost:51880/stopdanmu/"+Uid).then((res)=>{return res.text();})
    .then((res)=>{
        if(res=='true'){alert('已成功取消弹幕下载')}else{alert('未知错误')};
    })
}

function startiveDanmuFtch(){
    let Uid = getParentUid();
    fetch("http://localhost:51880/startdanmu/"+Uid).then((res)=>{return res.text();})
    .then((res)=>{
        if(res=='true'){alert('已成功启动弹幕下载')}else{alert('未知错误')};
    })
}

function recordLivecancel(){
    let Uid = getParentUid();
    fetch("http://localhost:51880/stoprecord/"+Uid).then((res)=>{return res.text();})
    .then((res)=>{
        if(res=='true'){alert('已成功取消录制')}else{alert('未知错误')};
    })
}

function recordLive(){
    let Uid = getParentUid();
    fetch("http://localhost:51880/startrecord/"+Uid).then((res)=>{return res.text();})
    .then((res)=>{
        if(res=='true'){alert('已成功启动直播录制')}else{alert('未知错误')};
    })
}

function subrecordLivecancel(){
    let Uid = getParentUid();
    fetch("http://localhost:51880/delrecord/"+Uid).then((res)=>{return res.text();})
    .then((res)=>{
        if(res=='true'){alert('已成功取消自动录制')}else{alert('未知错误')};
    })
}

function subrecordLive(){
    let Uid = getParentUid();
    fetch("http://localhost:51880/addrecord/"+Uid).then((res)=>{return res.text();})
    .then((res)=>{
        if(res=='true'){alert('已成功订阅自动直播录制')}else{alert('未知错误')};
    })
}

function liveRemoveSub(){
    fetch("http://localhost:51880/liststreamer").then((res)=>{return res.text()})
    .then((res)=>{
        if(res=="null"){alert("并没有订阅。")}else{
            let x = JSON.parse(res);
            let Uid = getParentUid();
            for(let i=0;i<x.length;i++){
                if(Uid == x[i].UID){
                    fetch('http://localhost:51880/delnotify/'+Uid).then((res)=>{return res.text()})
                    .then((res)=>{
                        alert("取消订阅成功");
                        return;
                    })
                }
            }
        }
    })
}

function api_showLucyResult(params) {
    let {arr} = params;
    let lucyUser = JSON.parse(arr);
    let html = "";
    for(let i=0;i<lucyUser.length;i++){
        let seq = i+1;
        let obj = lucyUser[i];
        html += ' <div class="odh-definition">\n' +
            '         <span class="lucy-seq">'+seq+'</span>'+
            '         <a target="_blank" href="'+obj.url+'" class="comment-label">'+obj.name+'</a>\n' +
            '             <span style="margin-right: 10px">#'+obj.floor+'</span>\n' +
            '             <div id="ncb-div" style="">\n' +
            '                                 '+obj.comment+'\n' +
            '             </div>\n' +
            '      </div>'
    }
    $("#lucy-result").html(html);
    let height = $("#lucy-result").height();
    let node = window.parent.document.getElementById("acfun-popup-helper");
    let _h = node.clientHeight;
    let t = height+_h;
    node.style.height=t+"px";
    $('#lucy-chou').loading('stop');
    $('#lucy-chouAgain').loading('stop');
    $("#lucy-result-label").show();
}

function onDomContentLoaded() {
    registVideoClick();
    downloadDanmaku();
    $("#comment-scan").change(scanChange);
    $("#comment-mark").change(markChange);
    $("#comment-receive").change(receiveChange);
    $("#copy-link-super").bind('click',{"id":'#live-url-super'},copyLink);
    $("#copy-link-high").bind('click',{"id":'#live-url-high'},copyLink);
    //抽奖
    $("#lucy-chou").bind('click',lottery);
    $("#lucy-chouAgain").bind('click',lotteryAgain);
    $("#lucy-number").bind('keyup',checkNumber);
    //AcFun-live桌面程序
    $("#subscribe").bind('click',liveSubscribe);
    $("#removeSubscribe").bind('click',liveRemoveSub);
    $("#record-danmu").bind('click',startiveDanmuFtch);
    $("#record-canceldanmu").bind('click',cancelStartliveDanmuFtch);
    $("#record-subdanmu").bind('click',liveDanmuFtch);
    $("#record-subcanceldanmu").bind('click',livecancelDanmuFtch);
    $("#record-cancelLiverec").bind('click',recordLivecancel);
    $("#record-liverec").bind('click',recordLive);
    $("#record-subliverec").bind('click',subrecordLive);
    $("#record-cancelsubLiverec").bind('click',subrecordLivecancel);
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
// window.addEventListener('wheel', onMouseWheel,{ passive: true });
