import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions, GetAsyncDOM } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { isTargetPage, REG } from "@/Core/Regs";
import { createApp, App } from "vue";
import Main from "./ui.vue";
import { addElement } from "@/Utils/GUI/dom";
import { thisBrowser } from "@/Utils/Misc";

export interface Conf {
    enable: boolean
}

export const defaultConf: Conf = {
    enable: true
}

let allOptions: Conf;
let app: App<Element>;

const main = async () => {
    if (thisBrowser() == "FF") {
        modLog("Incompatible browser.", module.name, "main");
        return
    }
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return
    }

    if (!isTargetPage(REG.videoAndBangumi)) {
        return
    }
    modLog("Init", module.name, "main")
    GetAsyncDOM.Get("div.control-btn.setting", () => {
        addElement({ tag: "div", id: "AcFunHelperAnot-pictureInpicture", classes: "control-btn pip", target: document.querySelector("div.control-btn.setting") as Element, createMode: "after" });
        modLog("Init Container.", module.name, "main..GetAsyncDOM");
        app = createApp(Main);
        app.mount("#AcFunHelperAnot-pictureInpicture");
        modLog("Mount App.", module.name, "main..GetAsyncDOM");
    })
}

export const module: ModuleStd.manifest = {
    name: "PictureInPicture",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main
}