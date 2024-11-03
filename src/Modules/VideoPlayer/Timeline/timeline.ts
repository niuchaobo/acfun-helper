import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions, GetAsyncDOM } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { isTargetPage, REG } from "@/Core/Regs";
import { addElement } from "@/Utils/GUI/dom";
import dayjs from "dayjs";

interface Conf {
    enable: boolean
}

let allOptions: Conf;

const timeTagRegexp = new RegExp("[0-9]{1,3}[:时]?[0-9]{1,3}[:分][0-9]{1,2}秒?");
const dotsClassName = ".AcFunHelperAnotchapterDots"

const main = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return
    }

    if (!isTargetPage(REG.videoAndBangumi)) {
        return
    }
    modLog("Init", module.name, "main")
}

const render = (chapterDict: Record<string, string>) => {
    document.querySelectorAll(dotsClassName).forEach((e) => {
        e.remove();
    });
    Object.keys(chapterDict).forEach((timeTag) => {
        createSingleDot(timeTag, chapterDict[timeTag]);
    });
}

const timeTagToTimeSecond = (timeTag: string): number => {
    const raw = timeTagRegexp.exec(timeTag);
    if (!raw || raw?.length <= 0) {
        return 0
    }
    // "01:02:03" => [3,2,1];"02:03" => [3,2]
    const rawGroups = raw[0].split(":").map((v, i, a) => parseInt(v)).reverse()
    return dayjs.duration({
        seconds: rawGroups[0],
        minutes: rawGroups[1],
        hours: rawGroups[2],
    }).asSeconds()
}

const createSingleDot = (time: string, desc: string) => {
    GetAsyncDOM.Get("#ACPlayer", () => {
        const PlayerElem = document.querySelector("#ACPlayer") as HTMLDivElement;
        const videElem = document.querySelector("video");
        const handlerContainerElem = document.querySelector(".container-pro-handle");
        if (PlayerElem && videElem && handlerContainerElem) {
            let single = PlayerElem.clientWidth / Number(videElem.duration)
            let progressLen = timeTagToTimeSecond(time) * single
            addElement({
                tag: "div",
                css: `left: ${progressLen}px;position: absolute;-moz-box-sizing: border-box;box-sizing: border-box;top: 50%;background-color: #F44C5D;border: 2px solid white;width: 14px;height: 14px;margin-left: -14px;top: 50%;margin-top: -7px;opacity: 0.5;-webkit-transition: opacity 0.3s, height 0.3s, width 0.3s, margin-top 0.3s, margin-left 0.3s;transition: opacity 0.3s, height 0.3s, width 0.3s, margin-top 0.3s, margin-left 0.3s;z-index: 98;`,
                target: handlerContainerElem,
                classes: dotsClassName,
                createMode: "append",
                title: desc,
            });
        }
    })
}

const chapterDictProduce = (rawText: string) => {
    let resultArr: Array<string> = [];
    let resultDic: Record<string, string> = {};
    let srcArr = rawText.split(" ");
    let lastDicKey = "";
    srcArr.forEach((e) => {
        if (resultArr.indexOf(e) == -1) {
            resultArr.push(e);
        }
    });
    resultArr.forEach((e) => {
        if (timeTagRegexp.test(e)) {
            resultDic[e] = "";
            lastDicKey = e;
        } else {
            resultDic[lastDicKey] += " " + e;
        }
    });
    return resultDic;
}

const createNew = (e: any) => {
    if (!e?.data) {
        modLog("选定的章节文段是空的", module.name, "createNew")
        return
    }
    if (!timeTagRegexp.test(e.data)) {
        modLog("选定的章节文段没有时间信息", module.name, "createNew")
        return
    }
    render(chapterDictProduce(e.data));
}

const runtimeMsgTrigger = {
    "/fg/timeline/create": createNew
}

export const defaultConf: Conf = {
    enable: true
}

export const module: ModuleStd.manifest = {
    name: "Timeline",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main,
    runtimeMsgTrigger
}