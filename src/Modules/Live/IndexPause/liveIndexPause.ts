import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions, GetAsyncDOM } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { isTargetPage, REG } from "@/Core/Regs";

interface Conf {
    enable: boolean
    type: string
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

    const controlDom = document.querySelector(".btn-span") as HTMLElement;
    const volumeDom = document.querySelector(".volume") as HTMLElement;

    const timer = setInterval(() => {
        switch (allOptions.type) {
            case "onlyMuteAndPause":
                const playStatus = controlDom.dataset.bindAttr;
                const muteStatus = volumeDom.dataset.bindAttr;
                const muteBtn = document.querySelector(".volume-icon") as HTMLElement;

                if (muteStatus != "muted") {
                    muteBtn?.click();
                }
                if (playStatus != "pause") {
                    controlDom.click();
                }
                break;
            case "deletePlayer":
                window.player.destroy();
                break;
            default:
                break;
        }
    }, 500);
}

export const defaultConf: Conf = {
    enable: true,
    type: "onlyMuteAndPause"
}

export const module: ModuleStd.manifest = {
    name: "LiveIndexPause",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main
}