import { modLog } from "@/Core/CoreUtilLibs/ConsoleProxy";
import { REG, isTargetPage, pageAcID } from "@/Core/Regs";
import { ModuleStd } from "@/Declare/FeatureModule";
import { hasThrowBanana, isFollowed, isLogin } from "@/Utils/Check";
import { getUpUid } from "@/Utils/Get";
import { bananaThrow } from "./libs/throw";

//所有Up 关注的Up 特定的Up 关注的和特定的Up
const main = async () => {
    //是否是正确的页面
    let isVideo: boolean, isArticle: boolean
    isVideo = isTargetPage(REG.video)
    isArticle = isTargetPage(REG.article)
    if (!isVideo && !isArticle) {
        return
    }
    //是否登录
    if (!isLogin()) {
        return
    }
    //是否已投
    if (!await hasThrowBanana) {
        return
    }
    //获取Up的Uid
    let Uid = isVideo ? await getUpUid("video") : await getUpUid("article");
    //是否已关注
    let hasFollowed = isVideo ? await isFollowed("video") : await isFollowed("article");
    //获取AcID
    let acID = "";
    let vids;
    if (isVideo) {
        vids = pageAcID(REG.acVid);
    } else {
        vids = pageAcID(REG.acAid);
    }
    if (vids == null) {
        modLog("no acid found", module.name, "main");
        return;
    } else {
        acID = vids[2];
    }
    modLog(Uid + "\n" + hasFollowed, module.name, "main");

}

export const module: ModuleStd.manifest = {
    name: "Banana",
    type: ModuleStd.ModType.FucntionCode,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main,
}