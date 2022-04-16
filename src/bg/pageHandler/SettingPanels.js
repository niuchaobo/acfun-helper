import * as Vue from "../../lib/vue.esm-browser.prod.js"

import { headerpanel } from "./SettingPanel/Main/Header.mjs";
import { bodypanel } from "./SettingPanel/Main/Body.mjs";
import { drawerApp } from "./SettingPanel/Main/Drawer.mjs";
import { clickToTop, hideToTopButton } from "../popup/popupEvent.js";
// const ListIndex = ["index", "common", "video", "live", "article", "comment", "pages", "utils"]

/**@type {import("../../../declares/Vue/VueRuntimeCore").Component} */
const MainAppData = {
    components: {
        drawerApp,
        headerpanel,
        bodypanel
    }
}

/**@type {import("../../../declares/Vue/VueRuntimeCore").App} */
const MainApp = Vue.createApp(MainAppData);
MainApp.mount("#MainBody");

mdui.mutation("#drawer")
document.addEventListener("scroll", () => {
    hideToTopButton(900);
})
document.querySelector(".toTop").addEventListener("click", clickToTop);
document.querySelector(".zipUnzip").addEventListener("click", ()=>{
    document.querySelectorAll("div.mdui-panel-item-header").forEach(e=>{
        e.click();
    })
});

