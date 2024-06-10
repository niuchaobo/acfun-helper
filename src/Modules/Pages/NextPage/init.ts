import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";

interface Conf {
    enable: boolean
}

let allOptions: Conf;

const main = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return
    }

    modLog("Init", module.name, "main")

    const modList = AcFunHelperFg.TypedModules[ModuleStd.SequentialType.OnPageKeyShotcutReg];
    const KeyMgr = globalThis.AcFunHelperFg.KeyMgr;
    for (let i in modList) {
        const mod = modList[i];
        if(mod.init!=undefined){
            const setting = await mod.init();
            KeyMgr.Add(setting.key,setting.main);
        }
    }
    KeyMgr.Hook();
}

export const defaultConf: Conf = {
    enable: true
}

export const module: ModuleStd.manifest = {
    name: "InitNextPage",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.OnDOMContentLoaded,
    main
}