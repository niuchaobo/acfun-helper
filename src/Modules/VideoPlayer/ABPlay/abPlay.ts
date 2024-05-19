import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { ExtOptions, GetAsyncDOM } from "@/Core/CoreUtils";
import { REG, isTargetPage } from "@/Core/Regs";
import { ModuleStd } from "@/Declare/FeatureModule";
import { App, createApp } from "vue";
import Main from "./abplay-ui.vue"
import { addElement } from "@/Utils/GUI/dom";
import { Conf } from "./abPlayConf";

let app: App<Element>;
let allOptions: Conf;

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
        addElement({ tag: "div", id: "acArbs-Abplay", target: document.querySelector(".box-right") as Element, classes: "control-btn speed acArbs-abplay", createMode: "headChildAppend" });
        modLog("Init Container.", module.name, "main..GetAsyncDOM")
        app = createApp(Main);
        app.mount("#acArbs-Abplay");
        modLog("Mount App.", module.name, "main..GetAsyncDOM")
    })
}

export const module: ModuleStd.manifest = {
    name: "ABPlay",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.OnAcVideoPlayerLoaded,
    main
}
