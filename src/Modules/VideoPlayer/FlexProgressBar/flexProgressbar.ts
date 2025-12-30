import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { DOMObserver, ExtOptions, GetAsyncDOM } from "@/Core/CoreUtils";
import { REG, isTargetPage } from "@/Core/Regs";
import { ModuleStd } from "@/Declare/FeatureModule";
import { addElement } from "@/Utils/GUI/dom";
import { throttle } from "@/Utils/Misc";

const progressBarOptions = {
    id: "AcFunHelperAnot-proBar",
    css: "z-index:100;transition: all 0.4s ease-out;position: fixed;bottom: 0px;width: 0%;box-shadow:rgb(125,125,125) -3px -1px 5px 0px;",
};
const progressLoadedBarOptions = {
    id: "AcFunHelperAnot-proBar-loaded",
    css: "z-index:99;transition: all 0.4s ease-out;position: fixed;bottom: 0px;width: 0%;",
};
let fullscreenProgressBarOptions;
let fullscreenProgressLoadBarOptions;

let progressBar: HTMLElement;
let progressLoadedBar: HTMLElement;
let fullscreenProgressBar: HTMLElement;
let fullscreenProgressLoadBar: HTMLElement;
let allOptions: Conf;
let options: StyleOptions;

const main = async () => {
    //加载配置
    allOptions = await ExtOptions.getValue("FlexProgressBar") as Conf;
    if (!allOptions.enable) {
        return
    }
    //页面正确
    if (!isTargetPage(REG.videoAndBangumi)) {
        return
    }
    modLog("Init", module.name, "main");
    options = allOptions.style;
    //创建元素
    addUI();
    //绑定钩子
    trigger();
}

const addUI = () => {
    //创建进度条
    progressBarOptions.css += `background-color: ${options?.barColor ?? "#fd4c5d"};height: ${options?.barHeight ?? "0.6%"};`;
    progressBar = addElement(progressBarOptions);

    progressLoadedBarOptions.css += `background-color: ${options?.loadedColor ?? "#e8e8e8"};height: ${options?.loadedHeight ?? "0.6%"};`;
    progressLoadedBar = addElement(progressLoadedBarOptions);
    //创建全屏进度条
    GetAsyncDOM.Get("div.container-video", () => {
        const containerElem = document.querySelector("div.container-video");
        if (!containerElem) {
            return
        }
        fullscreenProgressBarOptions = {
            id: "AcFunHelperAnot-proBar-inner",
            target: containerElem,
            css: "z-index:1000;transition: width 0.4s ease-out;position: fixed;bottom: 0px;width: 0%;box-shadow:rgb(125,125,125) -3px -1px 5px 0px;"
        };
        fullscreenProgressLoadBarOptions = {
            id: "AcFunHelperAnot-proBar-innerLoaded",
            target: containerElem,
            css: "z-index:999;transition: width 0.4s ease-out;position: fixed;bottom: 0px;width: 0%;"
        };
        fullscreenProgressBarOptions.css += `background-color: ${options?.innerBarColor ?? "#fd4c5d"};height: ${options?.innerBarHeight ?? "0.5%"};display: none;`;
        fullscreenProgressLoadBarOptions.css += `background-color: ${options?.innerBarLoadColor ?? "#e8e8e8"};height: ${options?.innerBarLoadHeight ?? "0.5%"};display: none;`;

        fullscreenProgressBar = addElement(fullscreenProgressBarOptions);
        fullscreenProgressLoadBar = addElement(fullscreenProgressLoadBarOptions);
    })
}

const trigger = () => {
    triggerBarHideShow();
    triggerBarLength();
    triggerFullscreenBarHideShow();
}

const triggerBarLength = () => {
    //原生的两个进度条：观看进度、加载进度
    const probarCurrent = document.querySelector(".pro-current") as HTMLElement;
    const loadprobarCurrent = document.querySelector(".loaded") as HTMLElement;
    //监听对象属性变动：一般是data-attr这个布尔值变动来控制显示隐藏
    probarCurrent != null && DOMObserver.attr(probarCurrent, () => {
        let percent = probarCurrent.style.width;
        progressBar.style.width = percent;
        fullscreenProgressBar.style.width = percent;
    });
    probarCurrent != null && DOMObserver.attr(loadprobarCurrent, () => {
        let percent = loadprobarCurrent.style.width;
        progressLoadedBar.style.width = percent;
        fullscreenProgressLoadBar.style.width = percent;
    });
}

const triggerBarHideShow = () => {
    const probar = document.querySelector(".control-bar-top") as HTMLElement;
    probar != null && DOMObserver.attr(probar, throttle(() => {
        let probarShow = probar.getAttribute("data-bind-attr") === "true";
        probarShow ? (progressBar.style.opacity = '0', progressLoadedBar.style.opacity = '0', fullscreenProgressBar.style.opacity = '0', fullscreenProgressLoadBar.style.opacity = '0') : (progressBar.style.opacity = '1', progressLoadedBar.style.opacity = '1', fullscreenProgressBar.style.opacity = '1', fullscreenProgressLoadBar.style.opacity = '1');
    }, 100));
}

const triggerFullscreenBarHideShow = () => {
    const fullscreenBtn = document.querySelector("div.fullscreen.fullscreen-screen>div.control-btn.btn-fullscreen>span.btn-span") as HTMLElement;
    fullscreenBtn != null && DOMObserver.attr(fullscreenBtn, e => {
        if (e.attributeName == "data-bind-attr") {
            const target = e.target as HTMLElement;
            if (target.dataset.bindAttr == "screen") {
                fullscreenProgressBar.style.display = "block";
                fullscreenProgressLoadBar.style.display = "block";
            } else {
                fullscreenProgressBar.style.display = "none";
                fullscreenProgressLoadBar.style.display = "none";
            }
        }
    })
}

interface StyleOptions {
    barColor: string,
    barHeight: string,
    loadedColor: string,
    loadedHeight: string,
    innerBarColor: string,
    innerBarHeight: string,
    innerBarLoadColor: string,
    innerBarLoadHeight: string,
}

export interface Conf {
    enable: boolean,
    style: StyleOptions
}

export const defaultConf: Conf = {
    enable: true,
    style: {
        barColor: "#fd4c5d",
        barHeight: "0.7%",
        loadedColor: "#e8e8e8",
        loadedHeight: "0.7%",
        innerBarColor: "#fd4c5d",
        innerBarHeight: "0.7%",
        innerBarLoadColor: "#ffffffb3",
        innerBarLoadHeight: "0.7%",
    }
}

export const module: ModuleStd.manifest = {
    name: "FlexProgressBar",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.OnAcVideoPlayerLoaded,
    main,
}