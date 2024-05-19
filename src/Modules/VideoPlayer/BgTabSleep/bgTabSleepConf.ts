import { ModuleStd } from "@/Declare/FeatureModule";

export interface Conf {
    enable: boolean;
    withVolume: boolean;
}

export const defaultConf: Conf = {
    enable: false,
    withVolume: false
}

const main = () => {

}

export const optMani: ModuleStd.optManifest = {
    modName: "BgTabSleep",
    name: "后台自动暂停",
    description: "当切换标签页时，自动暂停（或同时调小音量，当切换回来时慢慢调大）视频播放、",
    main
}