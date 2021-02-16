import {
    getFollowings
} from "./pagehandlerLibs.js"

async function Processing() {
    let liveFloowings = await getStorage('liveFloowings');
    let result = await getFollowings();
    for (let i = 0; i < result.length; i++) {
        let childPageNum = result[i].length
        for (let j = 0; j < childPageNum; j++) {
            if (result[i][j].userId in liveFloowings.liveFloowings) {
                //关注的
                $("div.mdui-list").append(`<label class="mdui-list-item mdui-ripple" data-key=${result[i][j].userId} ><div class="mdui-checkbox"><input class="switch" data-key=${result[i][j].userId} data-name=${result[i][j].userName} type="checkbox" checked/><i class="mdui-checkbox-icon" data-key=${result[i][j].userId} ></i></div><div class="mdui-list-item-content" data-key=${result[i][j].userId}>${result[i][j].userName}</div><i class="mdui-list-item-icon mdui-icon material-icons"><a href="https://www.acfun.cn/u/${result[i][j].userId}" target="_blank">chat</a></i></label>`)
            } else {
                //未关注的
                $("div.mdui-list").append(`<label class="mdui-list-item mdui-ripple" data-key=${result[i][j].userId} ><div class="mdui-checkbox"><input class="switch" data-key=${result[i][j].userId} data-name=${result[i][j].userName} type="checkbox"/><i class="mdui-checkbox-icon" data-key=${result[i][j].userId} ></i></div><div class="mdui-list-item-content" data-key=${result[i][j].userId}>${result[i][j].userName}</div><i class="mdui-list-item-icon mdui-icon material-icons"><a href="https://www.acfun.cn/u/${result[i][j].userId}" target="_blank">chat</a></i></label>`)
            }
        }
    }
    chrome.storage.local.get(['liveFloowings'], function (items) {
        $('.switch').click(function () {
            if (!$(this).is(":checked")) {
                let this_uid = $(this).data("key");
                let this_uName = $(this).data("name");
                mdui.snackbar({
                    message: `已取消关注 "${this_uName}"`,
                });
                delete items.liveFloowings[this_uid];
                chrome.storage.local.set({ 'liveFloowings': items.liveFloowings });
            } else {
                let this_uid = $(this).data("key");
                let this_uName = $(this).data("name");
                mdui.snackbar({
                    message: `已关注 "${this_uName}"`,
                });
                items.liveFloowings[this_uid] = this_uName;
                chrome.storage.local.set({ 'liveFloowings': items.liveFloowings });
            }
        });
    });
}

function notif() {
    mdui.snackbar({
        message: '本页面包含你所有的关注，如果条目多，请使用Ctrl+F查找。',
        position: 'right-top',
        timeout: 0,
        closeOnOutsideClick: true,
    });
}

window.addEventListener('load', e => onLoad(e));

function onLoad() {
    notif();
    Processing();
}
