import { ModuleStd } from "@/Declare/FeatureModule";
import { ExtOptions } from "@/Core/CoreUtils";
import { getUnreadMessage, UnReadCount, UnreadMsgType } from "@/Utils/Api/unread/check";
import { api, MsgType, unreadGetter } from "@/Utils/Api/unread/detail";

interface Conf {
    enable: boolean
}

let allOptions: Conf;

const main = async () => {
    allOptions = await ExtOptions.getValue(module.name) as Conf;
    if (!allOptions.enable) {
        return {
            enabled: false,
            item: {},
            trigger: () => { },
        }
    }
    return {
        enabled: true,
        option: { periodInMinutes: 1 },
        task: [async () => {
            const resp = await getUnreadMessage();
            if (resp.result != 0) {
                return
            }
            const allCount = countAll(resp.unReadCount);
            if (allCount <= 0) {
                return
            }
            updateBadge(allCount);
            checkMsg(resp);
        },]
    }

}

const countAll = (e: Record<keyof UnReadCount, number>) => {
    let allNum = 0;
    const allName = Object.keys(e) as Array<keyof UnReadCount>;
    allName.forEach(n => {
        allNum += e[n];
    })
    return allNum;
}

const updateBadge = (allCount: number) => {
    chrome.action.setBadgeText({ text: allCount > 0 ? String(allCount) : "" });
}

const checkMsg = async (status: UnreadMsgType) => {
    const unreadComment = status.unReadCount.new_comment;
    const atNotify = status.unReadCount.at_notify;
    const commentLikeCount = status.unReadCount.new_comment_like;
    const giftCount = status.unReadCount.new_gift;
    const systemNotifyCount = status.unReadCount.new_system_notify;
    if (unreadComment > 0) {
        checkAndCreateNotification(await unreadGetter.message.getRange(api[MsgType.Comment], 1, unreadComment), "未读评论")
    }
    if (atNotify > 0) {
        checkAndCreateNotification(await unreadGetter.message.getRange(api[MsgType.AtMe], 1, atNotify), "@你")
    }
    if (commentLikeCount > 0) {
        checkAndCreateNotification(await unreadGetter.message.getRange(api[MsgType.Like], 1, commentLikeCount), "评论点赞")
    }
    if (giftCount > 0) {
        checkAndCreateNotification(await unreadGetter.message.getRange(api[MsgType.Gift], 1, giftCount), "礼物")
    }
    if (systemNotifyCount > 0) {
        checkAndCreateNotification(await unreadGetter.message.getRange(api[MsgType.SysMsg], 1, systemNotifyCount), "全站通知")
    }
}

const checkAndCreateNotification = async (message: (string[] | undefined), messageTitle: string) => {
    if (message == undefined) {
        return
    }
    if (!(message.length)) {
        return
    }
    message.forEach((msg: string) => {
        chrome.notifications.create("", {
            "type": "basic",
            "iconUrl": "/icon/icon128.png",
            "title": messageTitle,
            "priority": 1,
            "message": msg,
        })
    })
}

export const defaultConf: Conf = {
    enable: true
}

export const module: ModuleStd.manifest = {
    name: "UnreadMsg",
    type: ModuleStd.ModType.FucntionCode,
    workSpace: ModuleStd.WorkSpace.Background,
    sequentialType: ModuleStd.SequentialType.onScheduleTaskReg,
    main
}