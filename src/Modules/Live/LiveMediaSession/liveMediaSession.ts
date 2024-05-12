import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { isTargetPage, REG } from "@/Core/Regs";
import { MediaSessionBaseInfo } from "@/Modules/VideoPlayer/MedisSession/videoMediaSession";
import { getLiveDataByUid } from "@/Utils/Api/live/liveBaseInfo";

interface Conf {
    enable: boolean
}

let allOptions: Conf;
let baseInfo: MediaSessionBaseInfo;

const main = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return
    }

    if (!isTargetPage(REG.live)) {
        return
    }
    //兼容性检查
    if (!("mediaSession" in navigator)) {
        modLog("此浏览器不支持MediaSession", module.name, "main")
        return
    }
    let urlInfo = REG.liveRoomID.exec(location.href);
    console.log(urlInfo)
    if (!urlInfo?.length) {
        modLog("没有从页面中查找到直播UID信息", module.name, "main")
        return
    }
    let roomId = urlInfo[2];
    let liveData = await getLiveDataByUid(roomId);
    if (liveData.streamName == undefined) {
        modLog("从服务器获取直播间信息失败了", module.name, "main")
        return;
    }
    navigator.mediaSession.metadata = new MediaMetadata({
        title: `${liveData.title} - ${liveData.type.categoryName} > ${liveData.type.name}`,
        artist: liveData.user.name,
        artwork: [
            { src: liveData.coverUrls[0] + "?imageView2/1/w/284/h/166", sizes: '284x166', type: 'image/jpeg' },
        ]
    });
    modLog("MediaSession挂接成功", module.name, "registerMediaSession");
}

export const defaultConf: Conf = {
    enable: true
}

export const module: ModuleStd.manifest = {
    name: "LiveMediaSession",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Frontend,
    sequentialType: ModuleStd.SequentialType.Loaded,
    main
}