import { ModuleStd } from "@/Declare/FeatureModule";
import { DOMObserver, ExtOptions, GetAsyncDOM } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { isTargetPage, REG } from "@/Core/Regs";

type screenModeType = "default" | "film" | "web" | "desktop"

interface Conf {
    enable: boolean
    screenMode: screenModeType,
    autoExit: boolean
}

let allOptions: Conf;

interface ElemState {
    tag: string
    observerTarget: string
    state: boolean
}

const elemtAndState: Record<Conf["screenMode"], ElemState> = {
    "desktop": {
        "tag": "div.fullscreen.fullscreen-screen",
        "observerTarget": ">div>span",
        "state": false
    },
    "film": {
        "tag": "div.control-btn.btn-film-model>div",
        "observerTarget": ">span",
        "state": false
    },
    "web": {
        "tag": "div.fullscreen.fullscreen-web",
        "observerTarget": ">div>span",
        "state": false
    },
    "default": {
        "tag": "",
        "observerTarget": "",
        "state": false
    }
}

const main = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return
    }

    if (!isTargetPage(REG.videoAndBangumi)) {
        return
    }
    modLog("Init", module.name, "main")

    GetAsyncDOM.Get(".right-column", onEnter);
}

const onEnter = () => {
    switch (allOptions.screenMode) {
        case "desktop":
            const screenBtnElem = document.querySelector(elemtAndState.desktop.tag) as HTMLDivElement;
            if (screenBtnElem) {
                screenBtnElem.click()
                elemtAndState.desktop.state = true
            }
            break;
        case "film":
            const filmBtnElem = document.querySelector(elemtAndState.film.tag) as HTMLDivElement;
            if (filmBtnElem) {
                filmBtnElem.click()
                elemtAndState.film.state = true
            }
            break;
        case "web":
            const webBtnElem = document.querySelector(elemtAndState.web.tag) as HTMLDivElement;
            if (webBtnElem) {
                webBtnElem.click()
                elemtAndState.web.state = true
            }
            break;
        default:
            break;
    }
    if (allOptions.autoExit) {
        observeState()
        const videoElem = document.querySelector("video")
        videoElem?.addEventListener("ended", onEnded)
    }
}

const observeState = () => {
    const fileModeObsvTarget = document.querySelector(elemtAndState.film.tag + elemtAndState.film.observerTarget) as HTMLSpanElement;
    fileModeObsvTarget && DOMObserver.attr(fileModeObsvTarget, e => observeStateChange(e, "film"))

    const webModeObsvTarget = document.querySelector(elemtAndState.web.tag + elemtAndState.web.observerTarget) as HTMLSpanElement;
    webModeObsvTarget && DOMObserver.attr(webModeObsvTarget, e => observeStateChange(e, "web"))

    const screenModeObsvTarget = document.querySelector(elemtAndState.desktop.tag + elemtAndState.desktop.observerTarget) as HTMLSpanElement;
    screenModeObsvTarget && DOMObserver.attr(screenModeObsvTarget, e => observeStateChange(e, "desktop"))
}

const observeStateChange = (e: MutationRecord, mode: Conf["screenMode"]) => {
    if (e.attributeName != "data-bind-attr") {
        return
    }
    const targetElem = e.target as HTMLSpanElement;
    switch (mode) {
        case "film":
            elemtAndState['film'].state = targetElem.dataset["bindAttr"] === "true" ? true : false
            elemtAndState["desktop"].state = false
            elemtAndState["web"].state = false
            break;
        case "web":
            elemtAndState['web'].state = targetElem.dataset["bindAttr"] === "web" ? true : false
            elemtAndState["desktop"].state = false
            elemtAndState["film"].state = false
            break;
        case "desktop":
            elemtAndState['desktop'].state = targetElem.dataset["bindAttr"] === "screen" ? true : false
            elemtAndState["film"].state = false
            elemtAndState["web"].state = false
            break;
        default:
            break;
    }
}

const onEnded = () => {
    for (let i in elemtAndState) {
        const stateName = i as screenModeType
        if (elemtAndState[stateName].state) {
            (document.querySelector(elemtAndState[stateName].tag) as HTMLElement)?.click()
            modLog(`从${stateName}播放器屏幕模式退出`, module.name, "onEnded")
            return
        }
    }
}

export const defaultConf: Conf = {
    enable: true,
    screenMode: "default",
    autoExit: true,
}

export const module: ModuleStd.manifest = {
    name: "PlayerScreenMode",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.OnAcVideoPlayerLoaded,
    main
}