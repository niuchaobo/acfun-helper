import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions, GetAsyncDOM } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { isTargetPage, REG } from "@/Core/Regs";
import jQuery from "jquery";

interface Conf {
    enable: boolean
    defaultRate: number
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
    GetAsyncDOM.Get(".speed", () => renderControl())
}

const renderControl = () => {
    let html = `<li class="setCustomPlaybackRate" data-val='1'>自定义</li>`;
    jQuery(".speed[type!=abplay]").find("li:last").after(html);
    jQuery(".speed[type!=abplay]").on("click", (e: JQuery.TriggeredEvent) => {
        if (e.target.className === "setCustomPlaybackRate") {
            applyRate();
        } else {
            return;
        }
    });
}

const applyRate = () => {
    const v = document.getElementsByTagName("video")[0] as HTMLVideoElement | undefined;
    if (!v) {
        modLog("没有播放器对象", module.name, "applyRate")
        return
    }
    const reg = /^[0-4](\.[0-9]{1,2})?$/;
    let rate = prompt("请输入播放倍速【0-5之间（不包含5），最多2位小数】，例如：0.1", "");
    if (rate != null && rate != "") {
        if (reg.test(rate)) {
            v.playbackRate = parseFloat(rate);
        } else {
            alert("播放倍速格式不对【0-5之间（不包含5），最多2位小数】，例如：0.1")
        }
    }
}

export const defaultConf: Conf = {
    enable: true,
    defaultRate: 1.0
}

export const module: ModuleStd.manifest = {
    name: "CustomVideoPlayRate",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main
}