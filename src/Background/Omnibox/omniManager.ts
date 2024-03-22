import { ModuleStd } from "@/Declare/FeatureModule";
import { thisBrowser } from "@/Utils/Misc";

let OmniboxHandler = chrome.omnibox;
const triggerReg: Record<Occasion, Array<(...e: any) => any>> = {

} as Record<Occasion, [(...e: any) => any]>;

const init = async () => {
    if (thisBrowser() == "FF") {
        OmniboxHandler = browser.omnibox;
    }
}

export enum Occasion {
    Entered = 1,
    Changed,
    Started,
    Cancelld,
}

export interface RegEntry {
    enabled: boolean;
    occasion: Occasion,
    trigger: (...e: any) => any
}

const main = async (modules: Record<ModuleStd.lordManifest["name"], ModuleStd.manifest>) => {
    init();

    for (let modName in modules) {
        const mod = modules[modName];
        let regInfo: RegEntry = await mod.main();
        if (!regInfo.enabled) {
            continue
        }
        if (!triggerReg[regInfo.occasion]) {
            triggerReg[regInfo.occasion] = [];
        }
        triggerReg[regInfo.occasion].push(regInfo.trigger);
    }

    regEvent();
}

const regEvent = async () => {
    OmniboxHandler.onInputStarted.addListener(() => {
        const targetList = triggerReg[Occasion.Started];
        if (!targetList || !targetList.length) {
            return
        }
        triggerReg[Occasion.Started].forEach(e => {
            e();
        })
    })
    OmniboxHandler.onInputEntered.addListener((text: string, disposition: chrome.omnibox.OnInputEnteredDisposition) => {
        const targetList = triggerReg[Occasion.Entered];
        if (!targetList || !targetList.length) {
            return
        }
        triggerReg[Occasion.Entered].forEach(e => {
            e(text, disposition);
        })
    })
    OmniboxHandler.onInputChanged.addListener((text: string, suggest: (suggestResults: chrome.omnibox.SuggestResult[]) => void) => {
        const targetList = triggerReg[Occasion.Changed];
        if (!targetList || !targetList.length) {
            return
        }
        triggerReg[Occasion.Changed].forEach(e => {
            e(text, suggest);
        })
    })
    OmniboxHandler.onInputCancelled.addListener(() => {
        const targetList = triggerReg[Occasion.Cancelld];
        if (!targetList || !targetList.length) {
            return
        }
        triggerReg[Occasion.Cancelld].forEach(e => {
            e();
        })
    })
}

export const lord: ModuleStd.lordManifest = {
    name: "OmniboxManager",
    requiredSequentialType: ModuleStd.SequentialType.OnOmniboxObjectReg,
    main
}