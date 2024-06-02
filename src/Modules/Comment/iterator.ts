import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { ExtOptions, GetAsyncDOM } from "@/Core/CoreUtils";
import { isTargetPage, REG } from "@/Core/Regs";
import { ModuleStd } from "@/Declare/FeatureModule";
import { ProcessChain } from "./commentProcChain";
import { DOMObserverSlim } from "@/Core/CoreLibs/DOMObserver";

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
        !!mod.init ? (await mod.init() && enabledModules.push(i)) : "";
    }
    GetAsyncDOM.Get(".ac-pc-comment", loaded)
}

interface AcceptableForEachMethod {
    forEach: (callbackfn: (value: Element, key: number, parent: NodeListOf<Element>) => void) => any;
}

const loaded = () => {
    const commentList = document.querySelectorAll(".area-comment-title");
    iterator(commentList);
    const CommentAreaElem = document.querySelector(".ac-pc-comment ");
    if (!CommentAreaElem) {
        return false;
    }
    // 评论区DOM变动（折叠的评论、评论区刷新、）后的操作逻辑
    DOMObserverSlim.allChilds(CommentAreaElem, (m: MutationRecord[], e: MutationObserver) => {
        const rerenderArea = m[0].target as HTMLDivElement;
        switch (rerenderArea.className) {
            case "area-sec-list":
                const commentList = rerenderArea.querySelectorAll(".area-comment-title");
                iterator(commentList);
                break;
            case "ac-comment-loading":
                const probe = new GetAsyncDOM(".ac-comment-loading", () => {
                    const commentListAfterLoading = document.querySelectorAll(".area-comment-title");
                    iterator(commentListAfterLoading);
                }, 3000, false, () => { }, (e) => {
                    if (!(e instanceof HTMLElement)) {
                        return false;
                    }
                    if (e.childElementCount == 0) {
                        return true;
                    }
                    return false;
                })
                probe.probe();
                break;
            default:
                break;
        }
    })
    return true;
}

const iterator = (domList: AcceptableForEachMethod) => {
    domList.forEach(e => {
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