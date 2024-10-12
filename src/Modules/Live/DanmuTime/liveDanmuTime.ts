import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions, GetAsyncDOM } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { isTargetPage, REG } from "@/Core/Regs";

interface Conf {
    enable: boolean
}

let allOptions: Conf;

const main = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return
    }

    if (!isTargetPage(REG.live)) {
        return
    }
    modLog("Init", module.name, "main")

    GetAsyncDOM.Get(".live-feed-messages", () => {
        document.querySelector(".live-feed-messages")?.addEventListener("DOMNodeInserted", e => {
            const targetElem = e.target as HTMLElement;
            const time = new Date();
            const firstChild = targetElem.children[0].firstChild;
            const span = document.createElement("span");
            span.innerText = `[${time.toLocaleTimeString()}]`;
            targetElem.children[0].insertBefore(span,firstChild);
        })
    })
}

export const defaultConf: Conf = {
    enable: true
}

export const module: ModuleStd.manifest = {
    name: "LiveDanmuTime",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main
}