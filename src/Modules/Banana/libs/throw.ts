import { modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { doThrow, throwResponse } from "@/Utils/Api/banana/bananaApi";
import { GetAsyncDOM } from "@/Core/CoreUtils";

/**
 * 投蕉
 * @tutorial 此接口下的resourceType参数，2为视频投稿，3为文章投稿
 */
export async function bananaThrow(resourceId: string, banana_num: number, dougaType: "video" | "article" = "video") {
    let res_obj: throwResponse;
    let result = await doThrow(resourceId, banana_num, dougaType)
    if (!!result) {
        res_obj = JSON.parse(result);
        switch (res_obj.result) {
            case 0:
                modLog(`投喂稿件${resourceId} ${banana_num}根香蕉ﾟ∀ﾟ)σ`);
                pageBananaState(banana_num, dougaType);
                return true
            case 170004:
                modLog(`没有足够的香蕉可以投喂了( ﾟ∀。)`);
                return false
        }
    }
    return false
}

export function pageBananaState(banana_num: number, type: string) {
    if (!banana_num) {
        return;
    }
    const bananaCountDom = document.querySelector(".bananaCount") as HTMLElement;
    const JBa_numDom = document.querySelectorAll(".Jba_num") as NodeListOf<HTMLElement>;
    if (bananaCountDom == null || JBa_numDom == null) {
        return
    }

    if (type == "video") {
        $('.right-area .banana').addClass('active');
        bananaCountDom.innerText = String(Number(bananaCountDom.innerText) + Number(banana_num));
    } else if (type == "article") {
        GetAsyncDOM.Get("div.census-right", () => {
            document.querySelectorAll('.bananacount')[0].classList.add("active");
            document.querySelectorAll('.bananacount')[1].classList.add("active");
            JBa_numDom[0].innerText = String(Number(JBa_numDom[0].innerText) + Number(banana_num));
            JBa_numDom[2].innerText = String(Number(JBa_numDom[2].innerText) + Number(banana_num));
        })
    }
}