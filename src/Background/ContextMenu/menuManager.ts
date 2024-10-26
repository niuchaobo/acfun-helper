import { ModuleStd } from "@/Declare/FeatureModule";

export interface RegEntry {
    enabled: boolean;
    item: chrome.contextMenus.CreateProperties;
    trigger: (e:chrome.contextMenus.OnClickData,tabInfo:chrome.tabs.Tab) => any
}

//保存菜单与钩子的映射关系
const triggerReg: Record<string, (...e: any) => any> = {

}

const main = async (modules: Record<ModuleStd.lordManifest["name"], ModuleStd.manifest>) => {
    //注册菜单项
    for (let modName in modules) {
        const mod = modules[modName];
        let regInfo: RegEntry = await mod.main();
        if (!regInfo.enabled) {
            continue
        }
        chrome.contextMenus.create(regInfo.item);
        if (regInfo.item.id) {
            triggerReg[regInfo.item.id] = regInfo.trigger;
        }
    }
    //挂接钩子
    registerCtxMenuEvent();
}

/**菜单响应 */
const registerCtxMenuEvent = () => {
    chrome.contextMenus.onClicked.addListener((e, tabInfo) => {
        triggerReg[e.menuItemId](e, tabInfo);
    });
}

export const lord: ModuleStd.lordManifest = {
    name: "ContextMenuMgr",
    requiredSequentialType: ModuleStd.SequentialType.OnContextMenuReg,
    main
}