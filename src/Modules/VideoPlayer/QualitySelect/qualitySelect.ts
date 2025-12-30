import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions, GetAsyncDOM } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { isTargetPage, REG } from "@/Core/Regs";
import { Encylopedia } from "@/Declare/Std";

type AllQulitiesType = keyof typeof Encylopedia.avaliableVideoQuality
// const AllQulities = Object.keys(Encylopedia.avaliableVideoQuality)

enum QulityPolicyTypes {
    Auto = "Auto",
    TopLevel = "TopLevel",
    BottomLevel = "BottomLevel",
    Standard = "Standard",
    Below60FPSTop = "Below60FPSTop",
    No4kTop = "No4kTop",
    No4kNoHDR = "No4kNoHDR",
    PreferCustom = "PreferCustom",
}

type QualitiyPolicy = keyof typeof QulityPolicyTypes

export interface Conf {
    enable: boolean
    preferQuality: QualitiyPolicy
    customFirst: AllQulitiesType
    customSecond: AllQulitiesType
}

let allOptions: Conf;

const main = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return
    }

    if (!isTargetPage(REG.videoAndBangumi)) {
        return
    }
    modLog("Init", module.name, "main")
    GetAsyncDOM.Get("div.quality-panel", () => {
        const qualityPanel = document.querySelector("div.quality-panel")?.children;
        if (!(qualityPanel && qualityPanel.length > 0)) {
            modLog("获取界面中存在的画质选项列表出现问题", module.name, "main")
            return
        }
        applyPolicy(qualityPanel)
    })
}

const applyPolicy = (panelList: HTMLCollection) => {
    switch (allOptions.preferQuality) {
        case "Auto":
            (panelList[panelList.length - 1] as HTMLDivElement)?.click()
            break;
        case "TopLevel":
            (panelList[0] as HTMLDivElement)?.click
            break;
        case "BottomLevel":
            (panelList[panelList.length - 2] as HTMLDivElement)?.click()
            break;
        case "Standard":
            (panelList[panelList.length - 2] as HTMLDivElement)?.click()
        case "Below60FPSTop":
            for (let i = 0; i < panelList.length; i++) {
                const element = panelList[i] as HTMLElement;
                const elemQualityName = element.dataset["qualityType"];
                (elemQualityName && /p60/.test(elemQualityName) == false) && element?.click();
                break;
            }
            modLog("没有非60帧的最高画质。", module.name, "applyPolicy");
            break;
        case "No4kTop":
            for (let i = 0; i < panelList.length; i++) {
                const element = panelList[i] as HTMLElement;
                const elemQualityName = element.dataset["qualityType"];
                (elemQualityName && /2160p/.test(elemQualityName) == false) && element?.click();
            }
            modLog("没有非4k的最高画质。", module.name, "applyPolicy");
            break;
        case "No4kNoHDR":
            for (let i = 0; i < panelList.length; i++) {
                const element = panelList[i] as HTMLElement;
                const elemQualityName = element.dataset["qualityType"];
                (elemQualityName && /2160p/.test(elemQualityName) == false && /HDR/.test(elemQualityName) == false) && element?.click();
                break;
            }
            modLog("没有非4k非60帧的最高画质。", module.name, "applyPolicy");
            break;
        case "PreferCustom":
            for (let i = 0; i < panelList.length; i++) {
                const element = panelList[i] as HTMLElement;
                const elemQualityName = element.dataset["qualityType"];
                (elemQualityName && elemQualityName == allOptions.customFirst) && element?.click();
                break;
            }
            modLog("没有首选画质。", module.name, "applyPolicy");
            for (let i = 0; i < panelList.length; i++) {
                const element = panelList[i] as HTMLElement;
                const elemQualityName = element.dataset["qualityType"];
                (elemQualityName && elemQualityName == allOptions.customSecond) && element?.click();
                break;
            }
            modLog("没有次选画质。", module.name, "applyPolicy");
        default:
            for (let i = 0; i < panelList.length; i++) {
                const element = panelList[i] as HTMLElement;
                const elemQualityName = element.dataset["qualityType"];
                (elemQualityName && /1080p/.test(elemQualityName)) && element?.click();
            }
            break;
    }
}

export const defaultConf: Conf = {
    enable: true,
    preferQuality: "Auto",
    customFirst: "1080P60",
    customSecond: "1080P"
}

export const module: ModuleStd.manifest = {
    name: "VideoQualitySelect",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main
}