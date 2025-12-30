import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { ExtOptions, GetAsyncDOM } from "@/Core/CoreUtils";
import { ModuleStd } from "@/Declare/FeatureModule";
import { App, createApp } from "vue";
import Main from "./liveBanDanmuByType-ui.vue"
import { addElement } from "@/Utils/GUI/dom";
import { FgBroadcastChannelName, isTargetPage, REG } from "@/Core/Regs";

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
    const MsgSw = new BroadcastChannel(FgBroadcastChannelName);

    if (!isTargetPage(REG.live)) {
        return
    }
    modLog("Init", module.name, "main")
    GetAsyncDOM.Get(".live-feed .face-text", () => {
        addElement({ tag: "i", id: "AcFunHelperAnot-LiveBanDanmu", target: document.querySelector(".live-feed .face-text") as Element, classes: "notice_icon AcFunHelperAnot", createMode: "headChildAppend" });
        modLog("Init Container.", module.name, "main..GetAsyncDOM")
        app = createApp(Main);
        app.mount("#AcFunHelperAnot-LiveBanDanmu");
        modLog("Mount App.", module.name, "main..GetAsyncDOM")
    })

}

export const defaultConf: Conf = {
    enable: true
}

export const module: ModuleStd.manifest = {
    name: "LiveBanDanmu",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main
}