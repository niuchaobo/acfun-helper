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
    return true;
}

const isEnabled = () => {
    return allOptions.enable
}

const main = async (e: HTMLElement) => {
    console.log(e)
}

export const defaultConf: Conf = {
    enable: true
}

export const module: ModuleStd.manifest = {
    name: "UpAndStaffTag",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main,
    init,
    isEnabled
}