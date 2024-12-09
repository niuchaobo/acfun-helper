import { thisBrowser } from "@/Utils/Misc"

export const MainReqHandler = () => {
    // console.log(chrome.webRequest, chrome)
    // chrome.declarativeNetRequest.updateDynamicRules({
    //     addRules: [{
    //         "id": 1,
    //         "priority": 1,
    //         "action": {
    //             "type": chrome.declarativeNetRequest.RuleActionType.ALLOW,
    //         },
    //         "condition": {
    //             "urlFilter": "https://www.acfun.cn/rest/pc-direct/comment/*",
    //             "domains": ["www.acfun.cn"],
    //             "resourceTypes": [chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST]
    //         }
    //     }]
    // })

    if (thisBrowser() == "Chrome") {

    } else if (thisBrowser() == "FF") {
        chrome.webRequest.onCompleted.addListener(OnCommentReqDone, apiDict.OnCommentReqDone)
    }
}

export const apiDict = {
    OnCommentReqDone: {
        urls: ["https://www.acfun.cn/rest/pc-direct/comment/*"]
    }
}

const OnCommentReqDone = (req: any) => {
    console.log(req)
}

export const apiReqHandler = {
    OnCommentReqDone
}