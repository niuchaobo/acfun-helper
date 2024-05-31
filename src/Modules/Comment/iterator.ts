import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { ExtOptions, GetAsyncDOM } from "@/Core/CoreUtils";
import { isTargetPage, REG } from "@/Core/Regs";
import { ModuleStd } from "@/Declare/FeatureModule";
import { ProcessChain } from "./commentProcChain";

interface Conf {
    enable: boolean
}

let allOptions: Conf;
const enabledModules: Array<string> = [];

const main = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return
    }

    if (!isTargetPage(REG.videoAndBangumi) && !isTargetPage(REG.article)) {
        return
    }
    modLog("Init", module.name, "main");
    for (let i in ProcessChain) {
        const mod = ProcessChain[i];
        !!mod.init ? (await mod.init() && (!!mod.isEnabled ? (mod.isEnabled() ? enabledModules.push(i) : "") : "")) : "";
    }
    GetAsyncDOM.Get(".ac-pc-comment", loaded)
}

const loaded = () => {
    const commentList = document.querySelectorAll(".area-comment-title");
    commentList.forEach(e => {
        enabledModules.forEach(m => {
            const module = ProcessChain[m];
            module.main(e);
        })
    })
}

export const defaultConf: Conf = {
    enable: true
}

/**
 * 评论迭代器
 */
export const module: ModuleStd.manifest = {
    name: "CommentIterator",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main
}