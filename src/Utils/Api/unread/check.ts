import { fetchResult } from "@/Core/CoreLibs/WebRequest"

export const api = {
    get: "https://member.acfun.cn/common/api/getUnreadMess",
}

export const getUnreadMessage = async () => {
    return JSON.parse(await fetchResult(api.get, "POST", "", "include")) as UnreadMsgType
}

export interface UnreadMsgType {
    result: number
    unReadFollowFeedCount: number
    "host-name": string
    unReadCount: UnReadCount
    redirectFollowFeed: number
    activieTaskRedPoint: number
    feedBackRedPoint: number
    newbieTaskIsNewDevice: boolean
    token: string
}

export interface UnReadCount {
    new_comment: number
    new_content_notify: number
    at_notify: number
    new_comment_like: number
    new_gift: number
    new_system_notify: number
}
