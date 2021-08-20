function getImageSource(id) {
    return document.querySelector(`#${id}`).src;
}
function downloadDanmaku() {
    alert("因为Api接口限制，可能弹幕下载不全。");
    window.parent.postMessage({
        to: "AcFunHelper",
        msg: { source: "frame-downloadDanmaku", target: "downloadDanmaku", InvkSetting: { type: "function" }, params: {} },
    }, '*');
}

function assDanmaku() {
    if (window.parent.document.querySelector(".control-btn.quality").children[0].innerText.toLowerCase() == "自动") {
        alert("请先选择一个确定的画质(1080P...)，以便助手确认字幕的宽高。");
    } else {
        alert("因为Api接口限制，可能弹幕下载不全。");
        try {
            window.parent.postMessage({
                to: "AcFunHelper",
                msg: { source: "frame-assDanmaku", target: "assDanmaku", InvkSetting: { type: "function" }, params: {} },
            }, '*');
        } catch (error) {
            alert("可能出现了某种错误。")
        }
    }
}

function registVideoClick() {
    for (let link of document.getElementsByClassName('pos simple')) {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const ds = e.currentTarget.dataset;
            if (ds.run == "true") {
                window.parent.postMessage({
                    to: "AcFunHelper",
                    msg: {
                        source: "frame-registVideoClick", target: "notice",
                        InvkSetting: { type: "function", classicalParmParse: true }, params: {
                            title: '',
                            msg: '请耐心等待，视频正在下载中...',
                        }
                    },
                }, '*');
                return;
            }
            window.parent.postMessage({
                to: "AcFunHelper",
                msg: {
                    source: "frame-registVideoClick", target: "download",
                    InvkSetting: { type: "function", classicalParmParse: true }, params: {
                        url: ds.url,
                        title: ds.title,
                        id: ds.id,
                        qualityLabel: ds.quality
                    }
                },
            }, '*');
            e.currentTarget.dataset.run = "true";
        });
    }
}

function markChange(e) {
    let value = $(this).prop('checked');
    window.parent.postMessage({
        to: "AcFunHelper",
        msg: { source: "frame-markChange", target: "mark", InvkSetting: { type: "function", classicalParmParse: true }, params: { value: value } },
    }, '*');
}

function scanChange(e) {
    let value = $(this).prop('checked');
    window.parent.postMessage({
        to: "AcFunHelper",
        msg: { source: "frame-scanChange", target: "scan", InvkSetting: { type: "function", classicalParmParse: true }, params: { value: value } },
    }, '*');
}

function readmodeChange(e) {
    let value = $(this).prop('checked');
    window.parent.postMessage({
        to: "AcFunHelper",
        msg: { source: "frame-scanChange", target: "lightReadMode", InvkSetting: { type: "function", classicalParmParse: true }, params: { value: value } },
    }, '*');
}

function copyLink(event) {
    let id = event.data.id;
    let live_url = $(id).text();
    if (live_url != '') {
        var aux = document.createElement("input");
        aux.setAttribute("value", live_url);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
        $("#live-msg").text("链接已复制到剪贴板");
        $("#live-msg").fadeIn(200, function () {
            $("#live-msg").fadeOut(2000);
        });
    }
}

function lottery() {
    let number = $("#lucy-number").val();
    let isFollow = $("#lucky-follow").prop('checked');
    if (number == '' || Number(number) <= 0) {
        alert("抽奖数值为空，请指定一下抽奖数量。")
        return false;
    }
    $('#lucy-chou').loading({ text: '请稍候', num: 3, rate: 1000, style: '.' });
    window.parent.postMessage({
        to: "AcFunHelper",
        msg: {
            source: "frame-scanChange", target: "lottery", InvkSetting: { type: "function", classicalParmParse: true }, params: {
                number: number,
                follow: isFollow
            }
        },
    }, '*');
}

function lotteryAgain() {
    let number = $("#lucy-number").val();
    let isFollow = $("#lucky-follow").prop('checked');
    if (number == '' || Number(number) <= 0) {
        alert("抽奖数值为空，请指定一下抽奖数量。")
        return false;
    }
    $('#lucy-chouAgain').loading({ text: '请稍候', num: 3, rate: 1000, style: '.' });
    window.parent.postMessage({
        to: "AcFunHelper",
        msg: {
            source: "frame-scanChange", target: "lottery2nd", InvkSetting: { type: "function", classicalParmParse: true }, params: {
                number: number,
                follow: isFollow
            }
        },
    }, '*');
}

function checkNumber() {
    var value = $("#lucy-number").val();
    var re = /^[1-9]+[0-9]*]*$/;
    if (!re.test(value)) {
        $("#lucy-number").val("");
        //return false;
    }
}

function getParentUid() {
    let ureg = new RegExp('/u/([0-9].*[0-9]$)');
    let this_userUchref = window.parent.document.getElementsByClassName('up-name')[0].href;
    let Uid = ureg.exec(this_userUchref)[1];
    return Uid
}

function api_showLucyResult(params) {
    let { arr } = params;
    let lucyUser = JSON.parse(arr);
    let html = "";
    for (let i = 0; i < lucyUser.length; i++) {
        let seq = i + 1;
        let obj = lucyUser[i];
        html += ' <div class="odh-definition">\n' +
            '         <span class="lucy-seq">' + seq + '</span>' +
            '         <a target="_blank" href="' + obj.url + '" class="comment-label">' + obj.name + '</a>\n' +
            '             <span style="margin-right: 10px">#' + obj.floor + '</span>\n' +
            '             <div id="ncb-div" style="">\n' +
            '                                 ' + obj.comment + '\n' +
            '             </div>\n' +
            '      </div>'
    }
    $("#lucy-result").html(html);
    let height = $("#lucy-result").height();
    let node = window.parent.document.getElementById("acfun-popup-helper");
    let _h = node.clientHeight;
    let t = height + _h;
    node.style.height = t + "px";
    $('#lucy-chou').loading('stop');
    $('#lucy-chouAgain').loading('stop');
    $("#lucy-result-label").show();
}

function onDomContentLoaded() {
    registVideoClick();
    $("#danmakuDownload").bind('click', downloadDanmaku);
    $("#assDanmaku").bind('click', assDanmaku);
    $("#comment-scan").change(scanChange);
    $("#comment-mark").change(markChange);
    $("#readmode").change(readmodeChange);
    $("#copy-link-super").bind('click', { "id": '#live-url-super' }, copyLink);
    document.querySelectorAll("span.addressCopySrc").forEach((e) => {
        e.addEventListener("click", function (e) {
            var aux = document.createElement("input");
            aux.setAttribute("value", e.target.dataset.url);
            document.body.appendChild(aux);
            aux.select();
            document.execCommand("copy");
            document.body.removeChild(aux);
            window.parent.postMessage({
                to: "AcFunHelper",
                msg: { source: "frame-scanChange", target: "notice", 
                InvkSetting: { type: "function", classicalParmParse: true }, params: {
                    title: 'AcFun助手',
                    msg: '下载地址复制到剪贴板。',
                } },
            }, '*');
        })
    })
    //抽奖
    $("#lucy-chou").bind('click', lottery);
    $("#lucy-chouAgain").bind('click', lotteryAgain);
    $("#lucy-number").bind('keyup', checkNumber);
    $("#ncb").click(function () {
        $("#ncb-div").show();
    })
}

function onMessage(e) {
    console.log(e)
    const { action, params } = e.data;
    const method = window['api_' + action];
    if (typeof (method) === 'function') {
        method(params);
    }
}

function api_updateProgress(params) {
    let { progress, id } = params;
    document.getElementById(id + "-bar").style.width = progress + "%";
    document.getElementById(id + "-text").innerText = progress + "%";
}

function api_updateLiveUrl(params) {
    // console.log("update:"+params);
    let { live_url } = params;
    $("#live-url-super").text(live_url);
}

function api_showMessage(result) {
    let { res, params } = result;
    document.getElementById("ncb-image").src = res.src;
    document.getElementById("ncb-span").innerText = decodeURI(res.message);
    fadeIn('message', 10);
    //fadeOut('message',0.5);
}

function fadeIn(id, speed) {
    var ele = document.getElementById(id);
    var opacitynum = ele.style.opacity || 0;
    ele.style.display = 'inline';
    //var speed=(speed/100)||100;
    function opacityAdd() {
        if (opacitynum < 1) {
            ele.style.opacity = opacitynum = (parseFloat(opacitynum) + 0.01).toFixed(2);
        } else {
            clearInterval(opacityt);
            fadeOut(id, 10);
        }
    }
    var opacityt = setInterval(opacityAdd, speed);
}

function fadeOut(id, speed) {
    var ele = document.getElementById(id);
    var opacitynum = ele.style.opacity || 1;
    //var speed=(speed/100)||100;
    function opacityOff() {
        if (opacitynum > 0) {
            ele.style.opacity = opacitynum = (opacitynum - 0.01).toFixed(2);
        } else {
            clearInterval(opacityt);
            ele.style.display = 'none';
        }
    }
    var opacityt = setInterval(opacityOff, speed);
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
