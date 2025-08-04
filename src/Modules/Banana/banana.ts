import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { REG, isTargetPage, pageAcID, FgBroadcastChannelName } from "@/Core/Regs";
import { ModuleStd } from "@/Declare/FeatureModule";
import { hasThrowBanana, isFollowed, isLogin } from "@/Utils/Check";
import { getUpUid } from "@/Utils/Get";
import { bananaThrow } from "./libs/throw";
import { ExtOptions } from "@/Core/CoreUtils";

interface Conf {
    enable: boolean
    mode: "all" | "followed" | "specific"
    allModeBanaNum: number
    followModeBanaNum: number
    specificModeWithFollowed: boolean
    userMapBananaNum: Record<string, number>
}

let allOptions: Conf;

export const defaultConf: Conf = {
    enable: true,
    mode: "followed",
    allModeBanaNum: 5,
    followModeBanaNum: 0,
    specificModeWithFollowed: false,
    userMapBananaNum: {

    }
}


//所有Up 关注的Up 特定的Up 关注的和特定的Up
const main = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return
    }
    const MsgSw = new BroadcastChannel(FgBroadcastChannelName);
    const mode = allOptions.mode;
    if (mode == undefined) {
        return modLog("mode not set in config")
    }
    //是否是正确的页面
    let isVideo: boolean, isArticle: boolean
    isVideo = isTargetPage(REG.video);
    isArticle = isTargetPage(REG.article);
    if (!isVideo && !isArticle) {
        return
    }
    //是否登录
    if (!isLogin()) {
        return
    }
    //是否已投
    if (await hasThrowBanana(isVideo ? "video" : "article")) {
        return
    }
    //获取Up的Uid
    let Uid = isVideo ? await getUpUid("video") : await getUpUid("article");
    //是否已关注
    let hasFollowed = isVideo ? await isFollowed("video") : await isFollowed("article");
    //获取AcID
    let vids = pageAcID();
    if (vids == null || vids == undefined) {
        modLog("no acid found", module.name, "main");
        return;
    }

    switch (mode) {
        case "all":
            bananaThrow(vids, allOptions.allModeBanaNum, isVideo ? "video" : "article");
            break;
        case "followed":
            hasFollowed && bananaThrow(vids, allOptions.allModeBanaNum, isVideo ? "video" : "article");
            if (!allOptions.specificModeWithFollowed) {
                break;
            }
        case "specific":
            let requireBananaNum = allOptions.userMapBananaNum[Uid]
            if (typeof (requireBananaNum) != "number") {
                modLog("unvalid userMapBanana of " + Uid);
                return
            }
            if (requireBananaNum < 1 || requireBananaNum > 6) {
                bananaThrow(vids, allOptions.userMapBananaNum[Uid], isVideo ? "video" : "article")
            }
        default:
            break;
    }
}

const confUpdateDict: string[] = []
const confUpdateFunc: CallableFunction[] = []

const updateTrigger = (type: string, ...args: any[]) => {
    switch (type) {
        case "conf":
            return ExtOptions.updateConf(confUpdateDict, confUpdateFunc, args)
        default:
            break;
    }
}

export const module: ModuleStd.manifest = {
    name: "Banana",
    type: ModuleStd.ModType.FucntionCode,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    updateTrigger,
    main,
}