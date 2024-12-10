import { fetchResult } from "@/Core/CoreLibs/WebRequest"
import { DOMParser, LiveNodeList } from "@xmldom/xmldom"
import { Element as Element2 } from "@xmldom/xmldom"

export const api = {
    get: "https://message.acfun.cn/?quickViewId=upCollageMain&reqID=1&ajaxpipe=1",
}

export const getUnreadDetail = async () => {
    return JSON.parse((await fetchResult(api.get, "GET", "", "include")).replace("/*<!-- fetch-stream -->*/", "").replaceAll("\\n", "")) as UnreadDetailType
}

const getUnreadDetailDOM = async () => {
    return new DOMParser().parseFromString((await getUnreadDetail())?.html, "text/html")
}

const getUnreadDetailDOMByNum = async (num: number) => {
    const raw = await getUnreadDetailDOM();
    if (num <= 0) {
        return
    }
    const messageIndex = 2 * num - 1;
    const targetDom = raw.documentElement?.childNodes[messageIndex];
    if (!targetDom) {
        return
    }
    const message = targetDom.textContent?.replace(/\s{2,}/g, ' ');
    return message;
}

const getUnreadDetailDOMRange = async (startIndex: number, endIndex: number) => {
    const raw = await getUnreadDetailDOM();
    if (startIndex <= 0) {
        startIndex = 1
    }
    const childList = raw.documentElement?.childNodes as unknown as Array<Element2>;
    console.log(childList)
    if (!childList) {
        return
    }
    const result:Array<string> = [];
    endIndex+=1;
    for (let index = startIndex; index < endIndex; index++) {
        let messageIndex = 2 * index - 1;
        if (messageIndex > childList.length) {
            break
        }
        const element = childList[messageIndex];
        if(!element){
            continue
        }
        const message = element.textContent?.replace(/\s{2,}/g, ' ');
        // let linkHref = element.getElementsByClassName("msg-reply") as unknown as LiveNodeList<Element2>;
        // let linkHrefAttr = linkHref[0].getAttribute("href")
        if(!(message?.length)){
            continue
        }
        result.push(message);
    }
    return result;
}

export const unreadGetter = {
    api: getUnreadDetail,
    dom: getUnreadDetailDOM,
    message: {
        getByNum: getUnreadDetailDOMByNum,
        getRange: getUnreadDetailDOMRange,
    }
}

export interface UnreadDetailType {
    html: string
}