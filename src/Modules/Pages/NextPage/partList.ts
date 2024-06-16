import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { isTargetPage, REG } from "@/Core/Regs";
import { KeyBindMgr } from "@/Utils/KeyBind/KeyBindMgr"

interface Conf {
    enable: boolean
}

let allOptions: Conf;

const main = (e: KeyboardEvent) => {
    const keyName = KeyBindMgr.KeyListToStr(KeyBindMgr.EventToKeyName(e));
    switch (keyName) {
        case "Shift+PageUp":
            pageUp();
            break
        case "Shift+PageDown":
            pageDown();
            break
    }
}

const pageUp = () => {
    let cmdListElem = document.querySelector(".pageWrap");
    if (!cmdListElem) {
        cmdListElem = document.querySelector(".pager__wrapper")
    }
    const targetElem = cmdListElem?.children[0] as HTMLElement;
    if(targetElem.ariaDisabled=="true"){
        return
    }
    targetElem?.click();
}

const pageDown = () => {
    let cmdListElem = document.querySelector(".pageWrap");
    if (!cmdListElem) {
        cmdListElem = document.querySelector(".pager__wrapper")
    }
    const targetElem = cmdListElem?.children[cmdListElem.childElementCount - 2] as HTMLElement;
    if(targetElem.ariaDisabled=="true"){
        return
    }
    targetElem?.click();
}

const init = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return
    }

    // if (!isTargetPage(REG.partIndex) && !isTargetPage(REG.search)) {
    if (!isTargetPage(REG.partIndex)) {
        return
    }
    modLog("Init", module.name, "")

    return [{
        key: "Shift+PageDown",
        main
    }, {
        key: "Shift+PageUp",
        main
    }]
}

export const defaultConf: Conf = {
    enable: true
}

export const module: ModuleStd.manifest = {
    name: "NormalPartListNextPage",
    type: ModuleStd.ModType.FucntionCode,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.OnPageKeyShotcutReg,
    main, init
}