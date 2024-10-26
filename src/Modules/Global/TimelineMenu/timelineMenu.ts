import { ModuleStd } from "@/Declare/FeatureModule"
import { ExtOptions, MessageRouter } from "@/Core/CoreUtils";
import { RegEntry } from "@/Background/ContextMenu/menuManager"

let allOptions: Conf;

const main = async (): Promise<RegEntry> => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return {
            enabled: false,
            item: {},
            trigger: () => { },
        }
    }

    return {
        enabled: true,
        item: {
            documentUrlPatterns: ["https://*.acfun.cn/v/*"],
            title: '在时间轴上标记选定章节',
            contexts: ['selection'],
            id: "7",
        },
        trigger: (params, tabInfo) => {
            const MsgClient = new MessageRouter.MsgClient({ module: chrome.tabs, tabId: tabInfo.id });
            MsgClient.send("/fg/timeline/create", { "data": params.selectionText })
        }
    }
}

interface Conf {
    enable: boolean,
}

export const defaultConf: Conf = {
    enable: true,
}

export const module: ModuleStd.manifest = {
    name: "TimelineMenu",
    type: ModuleStd.ModType.FucntionCode,
    workSpace: ModuleStd.WorkSpace.Background,
    sequentialType: ModuleStd.SequentialType.OnContextMenuReg,
    main
}
