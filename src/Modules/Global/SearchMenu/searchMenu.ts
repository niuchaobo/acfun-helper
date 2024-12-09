import { ModuleStd } from "@/Declare/FeatureModule"
import { ExtOptions } from "@/Core/CoreUtils";
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
            title: '使用AcFun搜索【%s】',
            contexts: ['selection'],
            id: "4",
        },
        trigger: (params, tabInfo) => {
            if(params?.selectionText){
                chrome.tabs.create({ url: 'https://www.acfun.cn/search?keyword=' + encodeURI(params.selectionText) });
            }
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
    name: "SearchMenu",
    type: ModuleStd.ModType.FucntionCode,
    workSpace: ModuleStd.WorkSpace.Background,
    sequentialType: ModuleStd.SequentialType.OnContextMenuReg,
    main
}
