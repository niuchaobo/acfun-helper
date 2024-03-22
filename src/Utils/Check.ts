import { GetAsyncDOM } from "../Core/CoreUtils";
import { CookiesUtils } from "./Storage/CookiesUtils";

/**
* 判断用户是否登录
*/
export function isLogin(evidence: "ui" | "cookies" = "cookies", dept: "video" | "article" = "video"): boolean {
    if (evidence == "cookies") {
        return !!CookiesUtils.getItem("ac_username");
    } else if (evidence == "ui") {
        try {
            switch (dept) {
                case "video":
                    return $("#ACPlayer > div > div.container-video > div > div.container-controls > div.control-bar-bottom > div.input-area > span.wrap-go2login").is(":hidden")
                case "article":
                    const userAvator = document.querySelector("#header-guide > li.guide-item.guide-user > a")
                    if (userAvator != null) {
                        return true
                    }
            }
        } catch (error) {
            return !!CookiesUtils.getItem("ac_username");
        }
    }
    return false
}

/**
 * 使用Dom对象判断用户是否已经关注此页面的Up主
 * @returns 
 */
export function isFollowed(dept: "video" | "article" | "userpage"): Promise<boolean> {
    switch (dept) {
        case "video":
            return new Promise((resolv) => {
                GetAsyncDOM.Get('#main-content > div.left-column > div.introduction > div.up-area > div.up-interactive > div.follow-up', () => {
                    resolv(!!document.querySelector("#main-content > div.left-column > div.introduction > div.up-area > div.up-interactive > div.follow-up.followed"))
                })
            })
        case "article":
            return new Promise((resolv) => {
                GetAsyncDOM.Get('#up-info > div.up-operate > div', () => {
                    resolv(!!document.querySelector("#up-info > div.up-operate > div.alfocus"))
                })
            })
        case "userpage":
            return new Promise((resolv) => {
                GetAsyncDOM.Get("#follow", () => {
                    resolv(!!document.querySelector("#follow.followed"))
                })
            })
        default:
            return new Promise((resolv) => {
                resolv(false);
            })
    }
}

/**
 * 通过Dom来判断是否投蕉
 * @param dept 
 * @description 但是当鼠标放在投蕉按钮上时，也会有.active这个类，所以有时候会不准确
 * @returns 
 */
export function hasThrowBanana(dept: "video" | "article"): Promise<boolean> {
    switch (dept) {
        case "video":
            return new Promise((resolv) => {
                GetAsyncDOM.Get('#main-content > div.left-column > div.video-description.clearfix.dark-style > div > div.right-area', () => {
                    resolv(!!document.querySelector("#main-content > div.left-column > div.video-description.clearfix.dark-style > div > div.right-area > div.banana.active"))
                })
            })
        case "article":
            return new Promise((resolv) => {
                GetAsyncDOM.Get("div.art-title-census > div.census-right > div.bananacount.J_banana > div", () => {
                    resolv(!!document.querySelector("div.bananacount.J_banana.active"))
                })
            })
        default:
            return new Promise((resolv) => {
                resolv(false);
            })
    }
}

