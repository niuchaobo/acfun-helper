import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions, GetAsyncDOM } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { isTargetPage, REG } from "@/Core/Regs";
import { addElement } from "@/Utils/GUI/dom";
import { createApp,App } from "vue";
import Main from "./danmakuSearch-ui.vue"

interface Conf {
    enable: boolean
}

let allOptions: Conf;
let app: App<Element>;

const main = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return
    }
    if (!isTargetPage(REG.videoAndBangumi)) {
        return
    }
    modLog("Init", module.name, "main")
    GetAsyncDOM.Get(".list-title", () => {
        addElement({ tag: "div", id: "AcFunHelperAnot-danmaku-wrapper", target: document.querySelector(".list-title") as Element, classes: "", createMode: "append" });
        modLog("Init Container.", module.name, "main..GetAsyncDOM")
        app = createApp(Main);
        app.mount("#AcFunHelperAnot-danmaku-wrapper");
        modLog("Mount App.", module.name, "main..GetAsyncDOM")
    })
}

export const defaultConf: Conf = {
    enable: true
}

export const module: ModuleStd.manifest = {
    name: "DanmakuSearch",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.OnAcVideoPlayerLoaded,
    main
}