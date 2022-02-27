import { OldUIHandler } from "./SettingPage/oldUIHandler.mjs"
import { indexSiteConfigure } from "./SettingPage/indexSite.mjs"
import { contentConfigure } from "./SettingPage/contentConfigure.mjs"
import { pageEnhance } from "./SettingPage/pageEnhance.mjs"
import { playerConfigure } from "./SettingPage/playerConfigure.mjs"
import { globalConfigure } from "./SettingPage/globalConfigure.mjs"

function Final() {
    if (ToolBox.thisBrowser() == "Chrome") {
        document.querySelectorAll(".chromeOnly").forEach(function (e) {
            e.style.display = "block"
        })
    }
    chrome.notifications.getPermissionLevel(e => {
        if (e != "granted") {
            mdui.snackbar({
                message: `您没有允许助手的通知权限，有些功能可能不会生效。`,
                position: 'right-top',
                timeout: 5000,
            });
        }
    })
    var devSwitchClick = 0
    document.querySelector("#devSwitch").addEventListener('click', function devMode() {
        if (devSwitchClick == 5) {
            document.querySelectorAll(".devFeature").forEach(function (e) { e.style.display = "block" });
            mdui.snackbar({
                message: `已进入特殊模式。`,
                position: 'right-bottom',
            });
            mention['devMode'] = true;
        }
        devSwitchClick++;
    })
}

var mention = { devMode: false };
window.addEventListener('load', function () {
    OldUIHandler()
    indexSiteConfigure()
    contentConfigure()
    pageEnhance()
    playerConfigure()
    globalConfigure()
    Final()
})
