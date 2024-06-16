import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { isTargetPage, REG } from "@/Core/Regs";
import { presetList } from "../IndexRightMenu/rightNavBar";

interface Conf {
    enable: boolean
}

let allOptions: Conf;
let index = 0;
let menuList: Array<string> = []

const main = () => {
    const target = document.querySelector("#" + menuList[(index += 1) % menuList.length]) as HTMLElement;
    globalThis.scrollTo({
        top: target.offsetTop - 125,
        left: 0,
        behavior: "smooth",
    })
}

const init = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return
    }

    if (!isTargetPage(REG.index)) {
        return
    }
    modLog("Init",module.name,"")

    presetList.forEach(e => {
        menuList.push(e.id)
    })

    return [{
        key: "Shift+PageDown",
        main
    }]
}

export const defaultConf: Conf = {
    enable: true
}

export const module: ModuleStd.manifest = {
    name: "IndexNextPage",
    type: ModuleStd.ModType.FucntionCode,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.OnPageKeyShotcutReg,
    main, init
}