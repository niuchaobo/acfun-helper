import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { ExtOptions } from "@/Core/CoreUtils";
import { REG, isTargetPage } from "@/Core/Regs";
import { ModuleStd } from "@/Declare/FeatureModule";

let allOptions: Conf;

const main = async () => {
    allOptions = await ExtOptions.getValue("VideoMediaSession") as Conf;
    if (!allOptions.enable) {
        return
    }
    if (!isTargetPage(REG.videoAndBangumi)) {
        return
    }
    //兼容性检查
    if (!("mediaSession" in navigator)) {
        modLog("此浏览器不支持MediaSession", module.name, "main")
        return
    }
}

interface Conf {
    enable: boolean
}

export const defaultConf: Conf = {
    enable: true
}

/**
 * Windows MediaSession 支持
 * @refer https://www.cnblogs.com/ajanuw/p/8422176.html https://w3c.github.io/mediasession/#the-mediasession-interface https://developer.mozilla.org/zh-CN/docs/Web/API/MediaSession#%E4%BE%8B%E5%AD%90
 * @ideaRefer https://github.com/Yzi/AcFun-TheaterMode
 */
export const module: ModuleStd.manifest = {
    name: "VideoMediaSession",
    type: ModuleStd.ModType.FucntionCode,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.OnAcVideoPlayerLoaded,
    main
}