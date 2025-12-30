import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { ExtOptions, GetAsyncDOM } from "@/Core/CoreUtils";
import { REG, isTargetPage } from "@/Core/Regs";
import { ModuleStd } from "@/Declare/FeatureModule";

export interface Conf {
    enable: boolean
}

export interface MediaSessionBaseInfo {
    title: string
    channel: {
        parentName: string
        name: string
    },
    user: {
        name: string
    },
    coverUrl: string
}

let allOptions: Conf;
let baseInfo: MediaSessionBaseInfo;
let videoInfo: APIs.DougaInfo;
let playerInst: HTMLVideoElement;
/**@description 现在所在的分P，从1开始**/
let playingIndex: number;

const main = async () => {
    allOptions = await ExtOptions.getValue("MediaSession") as Conf;
    if (!allOptions.enable) {
        return
    }
    if (!isTargetPage(REG.video)) {
        return
    }
    //兼容性检查
    if (!("mediaSession" in navigator)) {
        modLog("此浏览器不支持MediaSession", module.name, "main");
        return
    }
    //稿件信息情况检查
    if (!globalThis.AcFunHelperFg.runtime.dataset.fetchDougaInfoStatus) {
        modLog("在此之前的稿件信息获取失败，此处后续操作取消", module.name, "main");
        return
    }
    videoInfo = globalThis.AcFunHelperFg.runtime.dataset.dougaInfo;
    baseInfoProcess()
    registerMediaSession()
}

const baseInfoProcess = () => {
    baseInfo = {
        title: videoInfo.title,
        channel: videoInfo.channel,
        user: videoInfo.user,
        coverUrl: videoInfo.coverUrl,
    }
}

const registerMediaSession = () => {
    //基本信息
    navigator.mediaSession.metadata = new MediaMetadata({
        title: `${videoInfo.title} - ${videoInfo.channel.parentName} > ${videoInfo.channel.name}`,
        artist: "AcFun: " + videoInfo.user.name,
        artwork: [
            { src: videoInfo.coverUrl, sizes: "284x166", type: "image/jpeg" },
        ],
    });
    //进度条
    playerInst = document.getElementsByTagName("video")[0];
    playerInst.addEventListener('timeupdate', (e) => {
        try {
            navigator.mediaSession.setPositionState({
                duration: playerInst.duration,
                position: playerInst.currentTime
            });
        } catch (error) {
            modLog("MediaSession也许在切换分P： " + error, module.name, "registerMediaSession");
        }
    }, true);
    modLog("MediaSession挂接成功", module.name, "registerMediaSession")
    //播放时间控制
    navigator.mediaSession.setActionHandler("seekbackward", function () {
        playerInst.currentTime -= 5;
    });
    navigator.mediaSession.setActionHandler("seekforward", function () {
        playerInst.currentTime += 5;
    });
    navigator.mediaSession.setActionHandler("seekto", function (details) {
        playerInst.currentTime = Number(details.seekTime);
    });
    //多分P处理
    if (videoInfo.videoList.length > 1) {
        navigator.mediaSession.setActionHandler("previoustrack", multiPlayerHandle);
        navigator.mediaSession.setActionHandler("nexttrack", multiPlayerHandle);
        modLog("MediaSession多分P", module.name, "registerMediaSession");
    }
}

const multiPlayerHandle = (detail: MediaSessionActionDetails) => {
    let action = detail.action;
    playingIndex = Number(REG.videoPartNumByURL.exec(location.href)?.[1]) ?? Number((document.querySelector(".current-priority") as HTMLSpanElement).innerText ?? 1);
    switch (action) {
        case "previoustrack":
            playingIndex = playingIndex < 1 ? videoInfo.videoList.length : (playingIndex - 1) % (videoInfo.videoList.length);
            break;
        case "nexttrack":
            playingIndex = (playingIndex + 1) % (videoInfo.videoList.length);
            break;
    }
    GetAsyncDOM.Get(".scroll-div", (e) => {
        let list = document.querySelector(".scroll-div")?.children;
        if (!list) {
            return
        }
        let target = list[playingIndex - 1] as HTMLLIElement;
        target.click()
    })
    setTimeout(() => {
        playerInst.play();
    }, 243);
}

const resetMediaSession = () => {
    navigator.mediaSession.metadata = null;
    navigator.mediaSession.setActionHandler("seekbackward", null)
    navigator.mediaSession.setActionHandler("seekforward", null)
    navigator.mediaSession.setActionHandler("seekto", null)
    navigator.mediaSession.setActionHandler("previoustrack", null)
    navigator.mediaSession.setActionHandler("nexttrack", null)
    navigator.mediaSession.setPositionState();
}


export const defaultConf: Conf = {
    enable: true
}

/**
 * Windows MediaSession 支持
 * @refer https://www.cnblogs.com/ajanuw/p/8422176.html https://w3c.github.io/mediasession/#the-mediasession-interface https://developer.mozilla.org/zh-CN/docs/Web/API/MediaSession#%E4%BE%8B%E5%AD%90
 * @ideaRefer https://github.com/Yzi/AcFun-TheaterMode
 */
export const module: ModuleStd.manifest = {
    name: "VideoMediaSession",
    type: ModuleStd.ModType.FucntionCode,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.OnAcVideoPlayerLoaded,
    main
}