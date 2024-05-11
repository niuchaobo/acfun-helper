import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions, GetAsyncDOM } from "@/Core/CoreUtils";
import { isTargetPage } from "@/Core/Regs";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { REG } from "@/Core/Regs";
import { state } from "./bgTabSleepState";
import { addElement } from "@/Utils/GUI/dom";
import { createApp, App } from "vue";
import Main from "./bgTabSleepUI.vue"

interface Conf {
    enable: boolean;
    withVolume: boolean;
}

let allOptions: Conf;
let beforeChangeTabPlayStatus: boolean;
let app: App<Element>;

const main = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return
    }

    if (!isTargetPage(REG.videoAndBangumi)) {
        return
    }
    modLog("Init", module.name, "main")
    GetAsyncDOM.Get(".volume-panel-content", trigger);
    state.setMessage(true);
    mountApp();
}

const mountApp = () => {
    GetAsyncDOM.Get(".setting-panel>.setting-panel-content", () => {
        addElement({ tag: "div", id: "acArbs-bgTabSleepUI", target: document.querySelector(".setting-panel>.setting-panel-content") as Element, classes: "acArbs-bgTabSleepUI", createMode: "append" });
        modLog("Init Container.", module.name, "mountApp..GetAsyncDOM")
        app = createApp(Main);
        app.mount("#acArbs-bgTabSleepUI");
        modLog("Mount App.", module.name, "mountApp..GetAsyncDOM")
    })
}

const trigger = () => {
    let originVolumeNumber = 0;
    document.addEventListener("visibilitychange", () => {
        if(!state.tempSw){
            return
        }
        const volBar = document.querySelector(".volume-panel-content") as HTMLDivElement;
        const volBarSpan = volBar.children[0] as HTMLSpanElement;
        const videoElemt = document.querySelector("video");
        if (!!videoElemt == false || volBar == null || volBar.children[0] == null) {
            modLog("Not Got Player", module.name, "trigger")
            return
        }
        originVolumeNumber = Number(volBarSpan.innerText) / 1e2;
        switch (document.visibilityState) {
            case "hidden":
                beforeChangeTabPlayStatus = !videoElemt.paused;
                //开启画中画则不暂停
                if (!document.pictureInPictureElement) {
                    allOptions.withVolume && (videoElemt.volume = 0);
                    videoElemt.pause();
                }
                break;
            case "visible":
                if (beforeChangeTabPlayStatus) {
                    //播放
                    videoElemt.play();
                    //音量调大~
                    if (!document.pictureInPictureElement && allOptions.withVolume) {
                        //慢慢提大音量
                        var _voluemUpper = setInterval(() => {
                            let lastVolume = 0;
                            if (Number(videoElemt.volume) != Number(originVolumeNumber) && Number(videoElemt.volume) <= 1) {
                                lastVolume = Number((videoElemt.volume).toFixed(2));
                                videoElemt.volume = Number(lastVolume) + 0.01;
                                if (Number(videoElemt.volume) == 1) {
                                    clearTimeout(_voluemUpper);
                                }
                                lastVolume = Number((videoElemt.volume).toFixed(2));
                            } else {
                                clearTimeout(_voluemUpper);
                            }
                        }, 10);
                    }
                }
                break;
        }
    })
}

export const defaultConf: Conf = {
    enable: false,
    withVolume: false
}

export const module: ModuleStd.manifest = {
    name: "BgTabSleep",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.OnAcVideoPlayerLoaded,
    main
}