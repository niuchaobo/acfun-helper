import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions, GetAsyncDOM } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { isTargetPage, REG } from "@/Core/Regs";
import { DOMObserverSlim } from "@/Core/CoreLibs/DOMObserver";

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
        const livefeedArea = document.querySelector(".live-feed-messages");
        if (!livefeedArea) {
            return
        }
        DOMObserverSlim.L1Cilds(livefeedArea, e => {
            e[0].addedNodes.forEach(e=>{
                addTimeTagForElem(e as HTMLElement)
            })
        })
    })
}

const addTimeTagForElem = (targetElem: HTMLElement) => {
    const time = new Date();
    const firstChild = targetElem.children[0].firstChild;
    const span = document.createElement("span");
    span.style.color = "#ccc";
    span.innerText = `[${time.toLocaleTimeString()}] `;
    targetElem.children[0].insertBefore(span, firstChild);
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