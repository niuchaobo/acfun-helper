import { REG, isTargetPage } from "@/Core/Regs";

/**
 * 获取投稿信息
 */
export const fetchPageInfo = (): { status: boolean, result: APIs.DougaInfo } => {
    let div = document.createElement('div');
    div.style.display = "none";
    let uuid = "ac-Arbs-DougaInfo";
    div.id = uuid;
    document.body.appendChild(div);
    if (isTargetPage(REG.videoAndBangumi)) {
        div.setAttribute('onclick', "document.getElementById('" + uuid + "').innerText=JSON.stringify(window.pageInfo)");
        div.click();
    }
    if (isTargetPage(REG.article)) {
        div.setAttribute('onclick', "document.getElementById('" + uuid + "').innerText=JSON.stringify(window.articleInfo)");
        div.click();
    }
    if (div.innerText.length != 0) {
        return { status: true, result: JSON.parse(div.innerText) }
    }
    return { status: false, result: {} as APIs.DougaInfo }
}