import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { ExtOptions, GetAsyncDOM } from "@/Core/CoreUtils";
import { REG, isTargetPage } from "@/Core/Regs";
import { ModuleStd } from "@/Declare/FeatureModule";
import { App, createApp } from "vue";
import Main from "./abplay-ui.vue"
import { addElement } from "@/Utils/GUI/dom";

let app: App<Element>;
let allOptions: Conf;
export interface Conf {
    enable: boolean,
}

export const defaultConf: Conf = {
    enable: true,
}

const main = async () => {
    //加载配置
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return
    }

    if (!isTargetPage(REG.videoAndBangumi)) {
        return
    }
    modLog("Init", module.name, "main")
    GetAsyncDOM.Get("div.container-controls > div.control-bar-top > div.box-right", () => {
        addElement({ tag: "div", id: "AcFunHelperAnot-Abplay", target: document.querySelector(".box-right") as Element, classes: "control-btn speed AcFunHelperAnot", createMode: "headChildAppend" });
        modLog("Init Container.", module.name, "main..GetAsyncDOM")
        app = createApp(Main);
        app.mount("#AcFunHelperAnot-Abplay");
        modLog("Mount App.", module.name, "main..GetAsyncDOM")
    })
}

export const optMani: ModuleStd.optManifest = {
    modName: "ABPlay",
    name: "AB回放",
    description: "AB回放是在设定的两个时间点之间重复播放。",
    main
}

export const module: ModuleStd.manifest = {
    name: "ABPlay",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.OnAcVideoPlayerLoaded,
    main
}
