import { fetchResult } from "@/Core/CoreLibs/WebRequest";

export const api = {
    get: "https://www.acfun.cn/rest/pc-direct/feed/followFeed?isGroup=0&gid=-1&count=30&pcursor=",
}

export const getMyDougaPushData = async (index: number = 1) => {
    return JSON.parse(await fetchResult(api.get + index, "GET", "", "include")) as DougaPushList;
}

export interface DougaPushList {
    result: number
    feedList: FeedList[]
    pageNo: number
    totalPage: number
    requestId: string
    ups: any[]
    pageSize: number
    upsPos: number
    "host-name": string
    totalCount: number
}

export interface FeedList {
    goldBanana: number
    isArticle: boolean
    views: number
    aid: number
    shareUrl: string
    userImg: string
    releaseDate: number
    danmakuSize: number
    titleImg: string
    verifiedType: number
    verifiedText: string
    vid: number
    allowDanmaku: boolean
    stows: number
    channelId: number
    title: string
    verifiedTypes: number[]
    cid: number
    author: string
    isSignedUpCollege: boolean
    errorlog: string
    avatar: string
    contentClass: string
    score: number
    username: string
    userId: number
    success: boolean
    url: string
    comments: number
    sign: string
    time: number
    tags: string
    description?: string
}
