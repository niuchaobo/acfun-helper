import { ModuleStd } from "@/Declare/FeatureModule"

const main = () => {

}

export interface Conf {
    enable: boolean,
}

export const defaultConf: Conf = {
    enable: true,
}

export const optMani: ModuleStd.optManifest = {
    modName: "ABPlay",
    name: "AB回放",
    description: "AB回放是在设定的两个时间点之间重复播放。",
    main
}

