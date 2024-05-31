import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { isTargetPage, REG } from "@/Core/Regs";

interface Conf {
    enable: boolean
}

let allOptions: Conf;

const init = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    modLog("CommentIteratorProcessChainItem: " + module.name, module.name, "init")
}

const isEnabled = async () => {
    return allOptions.enable
}

const main = async (e: HTMLElement) => {

}

export const defaultConf: Conf = {
    enable: true
}

export const module: ModuleStd.manifest = {
    name: "UserTag",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main,
    init,
    isEnabled
}