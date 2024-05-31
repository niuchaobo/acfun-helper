import { fetchResult } from "@/Core/CoreLibs/WebRequest";

export interface StaffInfoApi {
    result: number
    staffInfos: StaffInfo[]
    "host-name": string
    upInfo: UpInfo
}

export interface StaffInfo {
    avatarFrameImgInfo: any
    action: number
    href: string
    staffRoleName: string
    contributeCount: string
    isFollowing: boolean
    nameColor: number
    sexTrend: number
    verifiedTypes?: number[]
    avatarFramePcImg: string
    avatarFrameMobileImg: string
    followingStatus: number
    avatarFrame: number
    followingCount: string
    headUrl: string
    fanCountValue: number
    verifiedType?: number
    verifiedText?: string
    gender: number
    headCdnUrls: HeadCdnUrl[]
    isJoinUpCollege?: boolean
    followingCountValue: number
    contributeCountValue: number
    fanCount: string
    userHeadImgInfo: UserHeadImgInfo
    name: string
    signature: string
    id: string
    comeFrom?: string
}

export interface HeadCdnUrl {
    url: string
    freeTrafficCdn: boolean
}

export interface UserHeadImgInfo {
    width: number
    height: number
    size: number
    type: number
    animated: boolean
    thumbnailImage: ThumbnailImage
    smallSharedImage: SmallSharedImage
    expandedImage: ExpandedImage
    originImage: OriginImage
    thumbnailImageCdnUrl: string
}

export interface ThumbnailImage {
    cdnUrls: CdnUrl[]
    animated?: number
}

export interface CdnUrl {
    url: string
    freeTrafficCdn: boolean
    freeTrafficProductAbbreviation: string
}

export interface SmallSharedImage {
    cdnUrls: CdnUrl[]
}


export interface ExpandedImage {
    cdnUrls: CdnUrl[]
}


export interface OriginImage {
    cdnUrls: CdnUrl[]
}

export interface UpInfo {
    avatarFrameImgInfo: any
    action: number
    href: string
    staffRoleName: string
    contributeCount: string
    isFollowing: boolean
    nameColor: number
    sexTrend: number
    avatarFramePcImg: string
    avatarFrameMobileImg: string
    followingStatus: number
    avatarFrame: number
    followingCount: string
    headUrl: string
    fanCountValue: number
    gender: number
    headCdnUrls: HeadCdnUrl[]
    followingCountValue: number
    contributeCountValue: number
    fanCount: string
    userHeadImgInfo: UserHeadImgInfo
    name: string
    signature: string
    id: string
}

export const api = {
    get: "https://www.acfun.cn/rest/pc-direct/staff/getStaff",
}

export const getStaffInfo = async (acid: string) => {
    return JSON.parse(await fetchResult(api.get, "POST", `resourceId=${acid}&resourceType=2`, "include")) as StaffInfoApi;
}