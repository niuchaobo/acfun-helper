import { fetchResult } from "@/Core/CoreLibs/WebRequest";

export interface FollowedLiveListType {
    channelListData: ChannelListData
    totalCount: number
    channelData: ChannelData
    liveList: LiveList[]
    recommendAuthorsData: any[]
    channelFilters: ChannelFilters
}

export interface ChannelListData {
    result: number
    requestId: string
    liveList: LiveList[]
    count: number
    pcursor: string
    "host-name": string
    totalCount: number
}

export interface LiveList {
    disableDanmakuShow: boolean
    requestId: string
    groupId: string
    action: number
    href: string
    formatLikeCount: string
    formatOnlineCount: string
    panoramic: boolean
    bizCustomData: string
    cdnAuthBiz: number
    portrait: boolean
    streamName: string
    liveId: string
    authorId: number
    title: string
    likeCount: number
    onlineCount: number
    coverUrls: string[]
    createTime: number
    user: User
    type: Types
    hasFansClub: boolean
    paidShowUserBuyStatus: boolean
}

export interface User {
    action: number
    href: string
    followingCount: string
    followingStatus: number
    contributeCount: string
    nameColor: number
    avatarFrame: number
    headUrl: string
    liveId: string
    fanCountValue: number
    verifiedText?: string
    gender: number
    isFollowing: boolean
    avatarFramePcImg: string
    avatarFrameMobileImg: string
    sexTrend: number
    verifiedTypes?: number[]
    socialMedal: SocialMedal
    headCdnUrls: HeadCdnUrl[]
    isJoinUpCollege?: boolean
    followingCountValue: number
    contributeCountValue: number
    fanCount: string
    avatarImage: string
    userHeadImgInfo: UserHeadImgInfo
    isFollowed: boolean
    name: string
    signature: string
    id: string
    verifiedType?: number
    comeFrom?: string
}

export interface SocialMedal { }

export interface HeadCdnUrl {
    url: string
    freeTrafficCdn?: boolean
}

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



export interface ChannelData { }


export interface CdnUrl {
    url: string
    freeTrafficCdn?: boolean
}

export interface Types {
    id: number
    name: string
    categoryId: number
    categoryName: string
}

export interface ChannelFilters {
    liveChannelDisplayFilters: LiveChannelDisplayFilter[]
}

export interface LiveChannelDisplayFilter {
    displayFilters: DisplayFilter[]
}

export interface DisplayFilter {
    filterType: number
    filterId: number
    name: string
    cover?: string
}

export const api = {
    get: "https://live.acfun.cn/api/channel/list?count=56&pcursor=&filters=[%7B%22filterType%22:3,+%22filterId%22:0%7D]",
}

export const getMyFollowedLiveList = async () => {
    const resp = await fetchResult(api.get, "GET", "", "include");
    if (resp) {
        return JSON.parse(resp) as FollowedLiveListType;
    }
    return {} as FollowedLiveListType;

}