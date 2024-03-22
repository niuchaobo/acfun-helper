import { ModuleStd } from "@/Declare/FeatureModule"
import { ExtOptions } from "@/Core/CoreUtils";
import { Occasion, RegEntry } from "@/Background/Omnibox/omniManager"

let allOptions: Conf;
const regHander = new RegExp('-ac(.*)');

const main = async (): Promise<RegEntry> => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return {
            enabled: false,
            occasion: Occasion.Entered,
            trigger: () => { },
        }
    }

    return {
        enabled: true,
        occasion: Occasion.Entered,
        trigger: (text, disposition) => {
            if (regHander.test(text)) {
                let words = regHander.exec(text);
                let targetUrl = ""
                if (words) {
                    targetUrl = 'https://www.acfun.cn/v/ac' + String(encodeURI(words[1]));
                } else {
                    targetUrl = 'https://www.acfun.cn/search?keyword=' + String(encodeURI(text));
                }
                switch (disposition) {
                    case "currentTab":
                        chrome.tabs.update({ url: targetUrl });
                        break;
                    case "newForegroundTab":
                        chrome.tabs.create({ url: targetUrl });
                        break;
                    case "newBackgroundTab":
                        chrome.tabs.create({ url: targetUrl, active: false });
                        break;
                    default:
                        chrome.tabs.create({ url: targetUrl });
                        break;
                }
            }
        },
    }
}

interface Conf {
    enable: boolean,
}

export const defaultConf: Conf = {
    enable: true,
}

export const module: ModuleStd.manifest = {
    name: "OmniAcid",
    type: ModuleStd.ModType.FucntionCode,
    workSpace: ModuleStd.WorkSpace.Background,
    sequentialType: ModuleStd.SequentialType.OnOmniboxObjectReg,
    main
}
