import { fetchResult } from "@/Core/CoreLibs/WebRequest";

export const UserLiveBaseInfoUrl = `https://live.acfun.cn/api/live/info?authorId=`;

export interface UserLiveBaseInfo {
    panoramic: boolean
    likeCount: number
    title: string
    cdnAuthBiz: number
    type: LiveType
    result: number
    requestId: string
    action: number
    paidShowUserBuyStatus: boolean
    href: string
    onlineCount: number
    hasFansClub: boolean
    formatLikeCount: string
    bizCustomData: string
    "host-name": string
    authorId: number
    portrait: boolean
    streamName: string
    liveId: string
    createTime: number
    disableDanmakuShow: boolean
    formatOnlineCount: string
    coverUrls: string[]
    visitor: number
    user: User
}

export interface LiveType {
    id: number
    name: string
    categoryId: number
    categoryName: string
}

export interface User {
    action: number
    href: string
    verifiedTypes: number[]
    avatarFramePcImg: string
    avatarFrameMobileImg: string
    isFollowing: boolean
    contributeCount: string
    nameColor: number
    sexTrend: number
    headUrl: string
    fanCountValue: number
    liveId: string
    followingStatus: number
    avatarFrame: number
    gender: number
    followingCount: string
    socialMedal: SocialMedal
    avatarImage: string
    userHeadImgInfo: UserHeadImgInfo
    isFollowed: boolean
    headCdnUrls: HeadCdnUrl[]
    isJoinUpCollege: boolean
    followingCountValue: number
    contributeCountValue: number
    fanCount: string
    name: string
    signature: string
    id: string
}

//TODO
export interface SocialMedal { }

export interface UserHeadImgInfo {
    width: number
    height: number
    size: number
    type: number
    animated: boolean
    thumbnailImage: ThumbnailImage
    thumbnailImageCdnUrl: string
}

export interface ThumbnailImage {
    cdnUrls: CdnUrl[]
}

export interface CdnUrl {
    url: string
    freeTrafficCdn: boolean
}

export interface HeadCdnUrl {
    url: string
    freeTrafficCdn: boolean
}


export const getLiveDataByUid = async (uid: string) => {
    const resp = await fetchResult(UserLiveBaseInfoUrl + uid, "GET", "", "include");
    if (resp) {
        return JSON.parse(resp) as UserLiveBaseInfo;
    }
    return {} as UserLiveBaseInfo;
}