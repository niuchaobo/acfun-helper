import { fetchResult } from "@/Core/CoreLibs/WebRequest"

export const api = {
    throw: "https://www.acfun.cn/rest/pc-direct/banana/throwBanana",
}

enum ApiDougaType {
    Video = 2,
    Article = 3
}

export interface throwResponse {
    result: number
    extData: {
        bananaRealCount: number
        criticalHitInfo: string
    }
}

export async function doThrow(resourceId: string, banana_num: number, dougaType: string = "video") {
    if (banana_num > 5 && banana_num < 1) {
        throw new Error("invalid banana_num.")
    }
    let resType = ApiDougaType.Video;
    if (dougaType == "article") {
        resType = ApiDougaType.Article;
    }

    let data = "resourceId=" + resourceId + "&count=" + banana_num + "&resourceType=" + resType;
    return fetchResult(api.throw, "POST", data, "same-origin", "cors", "default", "strict-origin-when-cross-origin", window.location.href);
}