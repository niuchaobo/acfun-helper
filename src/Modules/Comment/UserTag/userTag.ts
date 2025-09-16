import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { isTargetPage, REG } from "@/Core/Regs";

type ACID = string


interface TagData {
    userId: string
    tagName: string
    taggedTime?: Date
    tagCommentRef?: Record<ACID, string>
}

interface Conf {
    enable: boolean
    tagDict: Record<string, TagData>
}

let allOptions: Conf;
const styleText = `
span.pos.user {
    background-color: #ff66f7ff;
}`

const log = (msg: string, position: string) => {
    modLog(msg, module.name, position);
}


const init = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    log("init", "")
    if (allOptions.enable) {
        AcFunHelperStyleMgr.add(module.name, "user", styleText) ? "" : log("style add faild.", "init");
        return true
    }
    return false
}

const main = async (e: HTMLElement) => {
    const commentTitle = e.querySelector("a.name") as HTMLAnchorElement;
    if (!commentTitle) {
        return
    }
    const commentUserId = commentTitle.dataset["userid"] ?? "";
    if (!commentUserId.length) {
        return
    }
    for (let uidInConf in allOptions.tagDict) {
        if (uidInConf == commentUserId) {
            renderUserTag(e, allOptions.tagDict[uidInConf])
        }
    }
}

const renderUserTag = (e: HTMLElement, tag: TagData) => {
    if (!e.parentElement?.querySelector("span.pos.ser")) {
        let elem = document.createElement("span");
        elem.className = "pos user";
        elem.innerText = tag.tagName;
        const aName = e.querySelector("a.name");
        if (!!aName) {
            aName.after(elem);
        }
    }
}

export const defaultConf: Conf = {
    enable: true,
    tagDict: {
        "941747": {
            userId: "941747",
            tagName: "Haha哥"
        }
    },
}

export const module: ModuleStd.manifest = {
    name: "UserTag",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main,
    init,
}