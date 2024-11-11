import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { FgBroadcastChannelName, isTargetPage, REG } from "@/Core/Regs";

interface Conf {
    enable: boolean
}

let allOptions: Conf;
let params = new URL(globalThis.location.href);
let hashData;
let parsedHash;
const reactors: Record<string, any> = {};

//每个需要使用urlparam的模块应当trigger事件urlparam-trigger-[modName]，这样在本模块解析url的hash之后，会触发相关事件，执行相对应的模块的回调
const main = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return
    }
    const MsgSw = new BroadcastChannel(FgBroadcastChannelName);

    if (!isTargetPage(REG.videoAndBangumi)) {
        return
    }
    modLog("Init", module.name, "main")
    if (params.hash.length == 0) {
        return
    }
    hashData = decodeURI(params.hash);
    if (hashData && /acfunhelper=/.test(hashData)) {
        parsedHash = parser(hashData);
        for (let reactorName in parsedHash) {
            reactors[reactorName] = parsedHash[reactorName];
            MsgSw.postMessage({ "action": "/fg/event/on/urlparam-trigger-" + reactorName, "data": parsedHash[reactorName] });
        }
    }
}

const parser = (e: string) => {
    const testResult = /acfunhelper=(.*)\#|acfunhelper=(.*)/.exec(e);
    return testResult == null ? null : JSON.parse(testResult[1] ?? testResult[2]);
}

export const defaultConf: Conf = {
    enable: true
}

export const module: ModuleStd.manifest = {
    name: "URLParam",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main
}