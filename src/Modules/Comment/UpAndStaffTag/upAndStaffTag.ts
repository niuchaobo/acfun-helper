import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { isTargetPage, pageAcID, REG } from "@/Core/Regs";
import { api, getStaffInfo, StaffInfoApi } from "@/Utils/Api/douga/staff";

interface Conf {
    enable: boolean
}

let allOptions: Conf;
let acid = "";
let infoGatherMethold = 0;
let staffApiCache: StaffInfoApi;
let pageStaffInfoCache = null;

const init = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (allOptions.enable) {
        acid = pageAcID() ?? "";
        if (acid.length == 0) {
            //没获取到ACID就应该换方案了，因为通过API获取到Staff信息需要ACID
            infoGatherMethold = 1;
            return gatherInfoFromPage();
        }
        staffApiCache = await getStaffInfo(acid);
        if (!staffApiCache || staffApiCache.result != 0) {
            infoGatherMethold = 1;
            //API请求失败或者消息有问题，就返回通过DOM获取信息的情况
            return !!pageStaffInfoCache;
        }
        log("", "init");
        AcFunHelperStyleMgr.add(module.name, "up", styleText) ? "" : log("style add faild.", "init");
        return true;
    }
    return false;
}

const styleText = `span.pos {
    margin: 5px;
    line-height: 18px;
    padding: 0px 4px;
    color: white;
    border-radius: 14px;
}

span.pos.up {
    background-color: #66ccff;
}`

const log = (msg: string, position: string) => {
    modLog("CommentIteratorProcessChainItem: " + msg + module.name, module.name, position);
}

//TODO
const gatherInfoFromPage = (): boolean => {
    if (infoGatherMethold != 1) {
        return false;
    }
    return true;
}

const main = async (e: HTMLElement) => {
    switch (infoGatherMethold) {
        case 0:
            renderApiResp(e);
            break;
        case 1:
            renderUIResp(e);
            break;
    }
}

const renderApiResp = (e: HTMLElement) => {
    const commentTitle = e.querySelector("a.name") as HTMLAnchorElement;
    if (!commentTitle) {
        return
    }
    const commentUserId = commentTitle.dataset["userid"] ?? "";
    if (!commentUserId.length) {
        return
    }
    if (commentUserId == staffApiCache.upInfo.id) {
        renderUpTag(e);
    }
}

const renderUpTag = (e: HTMLElement) => {
    if (!e.parentElement?.querySelector("span.pos.up")) {
        let elem = document.createElement("span");
        elem.className = "pos up";
        elem.innerText = "Up主";
        const aName = e.querySelector("a.name");
        if (!!aName) {
            aName.after(elem);
        }
    }
}

const renderUIResp = (e: HTMLElement) => {

}

export const defaultConf: Conf = {
    enable: true
}

export const module: ModuleStd.manifest = {
    name: "UpAndStaffTag",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main,
    init,
}