import { ModuleStd } from "@/Declare/FeatureModule"
import { ExtOptions } from "@/Core/CoreUtils";
import { Occasion, RegEntry } from "@/Background/Omnibox/omniManager"

let allOptions: Conf;

const main = async (): Promise<RegEntry> => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return {
            enabled: false,
            occasion: Occasion.Cancelld,
            trigger: () => { },
        }
    }

    return {
        enabled: false,
        occasion: Occasion.Changed,
        trigger: (text, suggest) => {

        },
    }
}

interface Conf {
    enable: boolean,
}

export const defaultConf: Conf = {
    enable: false,
}

export const module: ModuleStd.manifest = {
    name: "OmniKeyword",
    type: ModuleStd.ModType.FucntionCode,
    workSpace: ModuleStd.WorkSpace.Background,
    sequentialType: ModuleStd.SequentialType.OnOmniboxObjectReg,
    main
}
