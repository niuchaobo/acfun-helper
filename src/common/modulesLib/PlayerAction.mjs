export const PlayerAction = {
    addDanmakuFilterRule, addUserToDanmakuFilter, addDanmakuFilterRule,
    closeAllLoop, loopADanmu
}

export function addDanmakuFilterRule(data, type) {
    if (type == "uid") {
        $(".options-control-select>div[data-value='user']").trigger("click");
    } else {
        // keywords
        $(`div.danmaku-filter-type > div>div>div[data-value="key"]`).trigger("click");
    }
    $(".filter-input-wrap>input.filter-input").val(data);
    $(".btn-danmaku-filter-add").trigger("click");
    $(".filter-input-wrap>input.filter-input").val("");
}

/**
 * 添加按UID屏蔽弹幕规则
 * @param {number} userId
 */
export function addUserToDanmakuFilter(userId) {
    if (userId) {
        PlayerAction.addDanmakuFilterRule(userId, "uid");
    }
}

/**
 * 添加按内容屏蔽弹幕规则
 * @param {number} userId
 */
export function addDanmakuFilterWord(keywords) {
    if (keywords) {
        PlayerAction.addDanmakuFilterRule(keywords, "keywords");
    }
}

export function closeAllLoop() {
    if (document.querySelector(".control-btn.btn-loop>span").dataset.bindAttr == "true") {
        document.querySelector(".control-btn.btn-loop>span").click();
    }
    $(`div.control-checkbox[data-bind-key="playContinue"]`).data()['bindAttr'] && $('div.control-checkbox[data-bind-key="playContinue"]').trigger("click");
    $(`#ACPlayer > div > div.container-video > div > div.container-controls > div.control-bar-top > div.box-right > div.control-btn.setting > div.setting-panel > div.setting-panel-content > div:nth-child(2) > div`).data()['bindAttr'] && $('#ACPlayer > div > div.container-video > div > div.container-controls > div.control-bar-top > div.box-right > div.control-btn.setting > div.setting-panel > div.setting-panel-content > div:nth-child(2) > div').trigger("click");
}

export function loopADanmu(content) {
    if (content && typeof (content) == "string") {
        $(".danmaku-input").val(content);
        $(".send-btn.enable").trigger("click");
    }
}

