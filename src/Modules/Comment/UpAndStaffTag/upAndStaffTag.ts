import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { REG, isTargetPage, pageAcID } from "@/Core/Regs";
import { getStaffInfo, StaffInfoApi } from "@/Utils/Api/douga/staff";

interface Conf {
    enable: boolean
}

interface SimpleStaffInfo {
    staffRoleName: string
    name: string
    id: string
}

type StaffUserId = string

interface StaffInfoFromGUI {
    upInfo: SimpleStaffInfo
    staffInfos: Record<StaffUserId, SimpleStaffInfo>
}

enum infoGatherMetholdType {
    FromApi = 0,
    FromGUI = 1
}

let allOptions: Conf;
let acid = "";
let infoGatherMethold = 0;
let staffApiCache: StaffInfoApi;
let staffGUICache: StaffInfoFromGUI;
let staffApiUidMap: Record<StaffUserId, number> = {};
let staffUidList: Array<string> = [];

const init = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (allOptions.enable) {
        AcFunHelperStyleMgr.add(module.name, "up", styleText) ? "" : log("style add faild.", "init");
        acid = pageAcID() ?? "";
        log("init: " + acid.length ? "type api" : "type gui", "");
        if (acid.length == 0 || isTargetPage(REG.article)) {
            // 没获取到ACID就应该换方案了，因为通过API获取到Staff信息需要ACID
            infoGatherMethold = 1;
            staffGUICache = {
                "upInfo": {},
                "staffInfos": [],
            } as unknown as StaffInfoFromGUI;
            if (isTargetPage(REG.article)) {
                return gatherInfoFromArticlePage();
            }
            return gatherInfoFromPage();
        }
        staffApiCache = await getStaffInfo(acid);
        //构造一个以用户名字符串为键，在API返回中Staff列表中的索引为值的Record
        let index = 0;
        staffApiCache.staffInfos.forEach(u => {
            staffApiUidMap[u.id] = index;
            index += 1;
        })
        staffUidList = Object.keys(staffApiUidMap)
        if (!staffApiCache || staffApiCache.result != 0) {
            infoGatherMethold = 1;
            //API请求失败或者消息有问题，就返回通过DOM获取信息的情况
            return !!staffGUICache;
        }
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
}

span.pos.staff {
    background-color: #c056ff !important;
}`

const log = (msg: string, position: string) => {
    modLog(msg, module.name, position);
}

const gatherInfoFromArticlePage = () => {
    if (infoGatherMethold != 1) {
        return false;
    }
    const upInfoArea = document.querySelector("section#up-info");
    if (!upInfoArea) {
        return false;
    }
    const aName = upInfoArea.querySelector("a.name") as HTMLAnchorElement;
    if (!aName) {
        return false;
    }
    const UpUid = aName.href.match(/[0-9]+/)?.[0] ?? "";
    if (!UpUid.length) {
        return false;
    }
    staffGUICache["upInfo"] = {
        "id": UpUid,
        "name": "Up",
        "staffRoleName": "Up"
    }
    return true;
}

const gatherInfoFromPage = (): boolean => {
    if (infoGatherMethold != 1) {
        return false;
    }
    const staffArea = document.querySelector("div.introduction>div.up-area.staff-area");
    if (!staffArea?.children?.length) {
        return false
    }
    const staffItems = staffArea?.children;
    for (let i = 0; i < staffItems.length; i++) {
        const e = staffItems[i];
        switch (e.className) {
            case "up-details staff-details":
                staffGUICache["upInfo"] = {
                    id: (e.querySelector("a.up-name") as HTMLAnchorElement).href.match(/[0-9]+/)?.[0] ?? "",
                    name: (e.querySelector("a.up-name") as HTMLElement).innerText ?? "Up主",
                    staffRoleName: (e.querySelector("div.role") as HTMLElement).innerText ?? "Up主",
                }
                break;
            case "staff-details":
                const userid = (e.querySelector("a.staff-name") as HTMLAnchorElement).href.match(/[0-9]+/)?.[0] ?? ""
                staffGUICache["staffInfos"][userid] = {
                    id: userid,
                    name: (e.querySelector("a.staff-name") as HTMLElement).innerText ?? "合作者",
                    staffRoleName: (e.querySelector("div.role") as HTMLElement).innerText ?? "合作者",
                }
                break;
            default:
                break;
        }
    }
    return true;
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
    switch (infoGatherMethold) {
        case infoGatherMetholdType.FromApi:
            if (commentUserId == staffApiCache.upInfo.id) {
                renderUpTag(e);
            }
            if (staffUidList.includes(commentUserId)) {
                renderStaffTag(e, infoGatherMetholdType.FromApi, commentUserId);
            }
            break;
        case infoGatherMetholdType.FromGUI:
            if (commentUserId == staffGUICache.upInfo.id) {
                renderUpTag(e);
            }
            if (staffUidList.includes(commentUserId)) {
                renderStaffTag(e, infoGatherMetholdType.FromGUI, commentUserId);
            }
            break;
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

const renderStaffTag = (e: HTMLElement, infoSrcType: number, staffUid: StaffUserId) => {
    if (!e.parentElement?.querySelector("span.pos.staff")) {
        let elem = document.createElement("span");
        elem.className = "pos staff";
        switch (infoSrcType) {
            case infoGatherMetholdType.FromApi:
                elem.innerText = staffApiCache.staffInfos[staffApiUidMap[staffUid]].staffRoleName;
                break;
            case infoGatherMetholdType.FromGUI:
                elem.innerText = staffGUICache.staffInfos[staffUid].staffRoleName
                break;
        }
        const aName = e.querySelector("a.name");
        if (!!aName) {
            aName.after(elem);
        }
    }
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