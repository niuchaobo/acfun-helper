import { doThrow, throwResponse } from "@/Utils/Api/banana/bananaApi";

/**
 * 投蕉
 * @tutorial 此接口下的resourceType参数，2为视频投稿，3为文章投稿
 */
export async function bananaThrow(resourceId: string, banana_num: number, dougaType: "video" | "article" = "video") {
    let res_obj: throwResponse;
    let result = await doThrow(resourceId, banana_num, dougaType)
    if (!!result) {
        res_obj = JSON.parse(result);
        if (res_obj.result == 0) {
            return true
        }
    }
    return false
}