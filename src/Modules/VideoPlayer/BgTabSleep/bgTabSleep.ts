import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions, GetAsyncDOM } from "@/Core/CoreUtils";
import { isTargetPage } from "@/Core/Regs";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { REG } from "@/Core/Regs";
import { state } from "./bgTabSleepState";
import { addElement } from "@/Utils/GUI/dom";
import { createApp, App } from "vue";
import Main from "./bgTabSleepUI.vue"
import { Conf } from "./bgTabSleepConf";
import { thisBrowser } from "@/Utils/Misc";

let allOptions: Conf;
let beforeChangeTabPlayStatus: boolean;
let app: App<Element>;

const main = async () => {
    if (thisBrowser() == "FF") {
        modLog("Incompatible browser.", module.name, "main");
        return
    }
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
        addElement({ tag: "div", id: "AcFunHelperAnot-bgTabSleepUI", target: document.querySelector(".setting-panel>.setting-panel-content") as Element, classes: "AcFunHelperAnot-bgTabSleepUI", createMode: "append" });
        modLog("Init Container.", module.name, "mountApp..GetAsyncDOM")
        app = createApp(Main);
        app.mount("#AcFunHelperAnot-bgTabSleepUI");
        modLog("Mount App.", module.name, "mountApp..GetAsyncDOM")
    })
}

const trigger = () => {
    let originVolumeNumber = 0;
    document.addEventListener("visibilitychange", () => {
        if (!state.tempSw) {
            return
        }
        const volBar = document.querySelector(".volume-panel-content") as HTMLDivElement;
        const volBarSpan = volBar.children[0] as HTMLSpanElement;
        const videoElemt = document.querySelector("video");
        if (!!videoElemt == false || volBar == null || volBar.children[0] == null) {
            modLog("Not Got Player", module.name, "trigger")
            return
        }
        switch (document.visibilityState) {
            case "hidden":
                beforeChangeTabPlayStatus = !videoElemt.paused;
                originVolumeNumber = Number(volBarSpan.innerText) / 1e2;
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
                        let v = 0;
                        let videoVolume = videoElemt.volume;
                        var _voluemUpper = setInterval(() => {
                            if (videoVolume != originVolumeNumber && videoVolume < 1) {
                                v = Number((videoElemt.volume).toFixed(2));
                                videoElemt.volume = Number(v) + 0.01;
                                videoVolume = videoElemt.volume;
                                if (videoVolume == originVolumeNumber || videoVolume == 1) {
                                    clearTimeout(_voluemUpper);
                                }
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


export const module: ModuleStd.manifest = {
    name: "BgTabSleep",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.OnAcVideoPlayerLoaded,
    main
}