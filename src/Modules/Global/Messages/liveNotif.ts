import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions } from "@/Core/CoreUtils";
import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { api, getMyFollowedLiveList, LiveList, User } from "@/Utils/Api/live/followLive";

type UID = string

interface Conf {
    enable: boolean;
    followedLiveNotifEnable: boolean;
    customLiveNotifEnable: boolean;

    liveUsers: Array<UID>;
}

let allOptions: Conf;

const main = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions) {
        allOptions = defaultConf;
    }
    if (!allOptions.enable) {
        return
    }
    return {
        enabled: true,
        option: { periodInMinutes: 2 },
        task: [
            async () => {
                allOptions.followedLiveNotifEnable && followedLiveCheck();
                allOptions.customLiveNotifEnable && customLiveCheck();
            },
        ]
    }

}

const createLiveUserNotification = (e:LiveList) => {
    chrome.notifications.create("", {
        "type": "basic",
        "iconUrl": "/icon/icon128.png",
        "title": "AcFun助手 - 直播通知",
        "priority": 1,
        "message": `${e.user.name} 正在直播：${e.title}`,
    })
}

const followedLiveCheck = async () => {
    let authInfo = await ExtOptions.getValue("LocalUserId") as unknown as string;
    if (authInfo.length == 0) {
        //用户未登录
        return
    }
    let optionStorage = await ExtOptions.getValue(module.name) as Conf;

    let lastLiveUsers = optionStorage.liveUsers;
    let liveUsers: Array<string> = [];
    let liveInfo: Record<UID, LiveList> = {};
    let apiFollowedUsers = await getMyFollowedLiveList();

    apiFollowedUsers?.liveList?.forEach(e => {
        liveUsers.push(e.user.id);
        liveInfo[e.user.id] = e;
    })
    if (liveUsers.length == 0) {
        return
    }

    let diff = liveUsers.filter(item => !lastLiveUsers.includes(item));
    diff.forEach(uid => {
        //TODO:发出通知
        createLiveUserNotification(liveInfo[uid]);
    })
    optionStorage.liveUsers = liveUsers;
    ExtOptions.setValue(module.name, optionStorage);
}

const customLiveCheck = async () => {

}

export const defaultConf: Conf = {
    enable: true,
    followedLiveNotifEnable: true,
    customLiveNotifEnable: false,
    liveUsers: [],
}

export const module: ModuleStd.manifest = {
    name: "LiveNotification",
    type: ModuleStd.ModType.Hybrid,
    workSpace: ModuleStd.WorkSpace.Background,
    sequentialType: ModuleStd.SequentialType.onScheduleTaskReg,
    main
}