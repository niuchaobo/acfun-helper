import { ModuleStd } from "@/Declare/FeatureModule";
import { DOMObserver, ExtOptions, GetAsyncDOM } from "@/Core/CoreUtils";
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

    if (!isTargetPage(REG.liveIndex)) {
        return
    }
    modLog("Init", module.name, "main")

    GetAsyncDOM.Get(".pager-wrapper.pager-container", () => {
        const pagerWrapper = document.querySelector(".pager-wrapper.pager-container") as HTMLDivElement;
        if (pagerWrapper.childElementCount == 0) {
            render();
            return
        }
        DOMObserverSlim.L1Cilds(pagerWrapper, (e) => {
            render();
        })
    })
}

const render = () => {
    const pager = document.querySelector(".pager__btn.pager__btn__selected") as HTMLAnchorElement;
    const pageNum = !!pager ? parseInt(pager.innerText) : 1;
    let listCount = 0 + (pageNum - 1) * 100;
    document.querySelectorAll("div.live-status > div.live-status-desc").forEach((e) => {
        const elem = e as HTMLElement;
        listCount++;
        elem.innerText = `第${listCount}`;
    })
}

export const defaultConf: Conf = {
    enable: true
}

export const module: ModuleStd.manifest = {
    name: "LiveIndexCount",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main
}