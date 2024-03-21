import { ModuleStd } from "@/Declare/FeatureModule";

interface MenuRegEntry {
    enabled: boolean;
    item: chrome.contextMenus.CreateProperties;
    trigger: (...e: any) => any
}

const triggerReg:Record<string,(...e:any)=>any> = {

}

const main = async (modules: Record<ModuleStd.lordManifest["name"], ModuleStd.manifest>) => {
    for (let menuEntryName in modules) {
        let menuEntry = modules[menuEntryName];
        let regInfo: MenuRegEntry = await menuEntry.main();
        if (regInfo.enabled) {
            chrome.contextMenus.create(regInfo.item);
            if(regInfo.item.id){
                triggerReg[regInfo.item.id] = regInfo.trigger;
            }
        }
    }
    registerCtxMenuEvent();
}

/**菜单响应 */
const registerCtxMenuEvent=()=> {
    chrome.contextMenus.onClicked.addListener((e, tabInfo) => {
        triggerReg[e.menuItemId](e,tabInfo);
    });
}

export const lord: ModuleStd.lordManifest = {
    name: "ContextMenuMgr",
    requiredSequentialType: ModuleStd.SequentialType.OnContextMenuReg,
    main
}