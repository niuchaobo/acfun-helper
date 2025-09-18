import { fetchResult } from "@/Core/CoreLibs/WebRequest"
import { DOMParser, LiveNodeList } from "@xmldom/xmldom"
import { Element as Element2 } from "@xmldom/xmldom"

export enum MsgType {
    Comment = "getComment",
    Like = "getLike",
    AtMe = "getAtMe",
    Gift = "getGift",
    SysMsg = "getSysMsg",
    ResMsg = "getResMsg",
}

export const api = {
    getComment: "https://message.acfun.cn/?quickViewId=upCollageMain&reqID=1&ajaxpipe=1",
    getLike: "https://message.acfun.cn/like?quickViewId=upCollageMain&reqID=1&ajaxpipe=1",
    getAtMe: "https://message.acfun.cn/atmine?quickViewId=upCollageMain&reqID=2&ajaxpipe=1",
    getGift: "https://message.acfun.cn/gift?quickViewId=upCollageMain&reqID=3&ajaxpipe=1",
    getSysMsg: "https://message.acfun.cn/sysmsg?quickViewId=upCollageMain&reqID=6&ajaxpipe=1",
    getResMsg: "https://message.acfun.cn/resmsg?quickViewId=upCollageMain&reqID=7&ajaxpipe=1",
}

export const getUnreadDetail = async (apiEndp: string) => {
    return JSON.parse((await fetchResult(apiEndp, "GET", "", "include")).replace("/*<!-- fetch-stream -->*/", "").replaceAll("\\n", "")) as UnreadDetailType
}

const getUnreadDetailDOM = async (apiEndp: string) => {
    return new DOMParser().parseFromString((await getUnreadDetail(apiEndp))?.html, "text/html")
}

const getUnreadDetailDOMByNum = async (apiEndp: string, num: number) => {
    const raw = await getUnreadDetailDOM(apiEndp);
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

const getUnreadDetailDOMRange = async (apiEndp: string, startIndex: number, endIndex: number) => {
    const raw = await getUnreadDetailDOM(apiEndp);
    if (startIndex <= 0) {
        startIndex = 1
    }
    const childList = raw.documentElement?.childNodes as unknown as Array<Element2>;
    console.log(childList)
    if (!childList) {
        return
    }
    const result: Array<string> = [];
    endIndex += 1;
    for (let index = startIndex; index < endIndex; index++) {
        let messageIndex = 2 * index - 1;
        if (messageIndex > childList.length) {
            break
        }
        const element = childList[messageIndex];
        if (!element) {
            continue
        }
        const message = element.textContent?.replace(/\s{2,}/g, ' ');
        // let linkHref = element.getElementsByClassName("msg-reply") as unknown as LiveNodeList<Element2>;
        // let linkHrefAttr = linkHref[0].getAttribute("href")
        if (!(message?.length)) {
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