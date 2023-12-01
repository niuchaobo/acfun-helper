import { GetAsyncDOM } from "@/Core/CoreUtils";

export function getUpUid(dept: "video" | "article"): Promise<string> {
    switch (dept) {
        case "video":
            return new Promise((resolv) => {
                GetAsyncDOM.Get('#main-content > div.left-column > div.introduction > div.up-area > div.up-details', () => {
                    const e = document.querySelector("#main-content > div.left-column > div.introduction > div.up-area > div.up-details > div > div.up-info > a") as HTMLLinkElement;
                    if (!!e) {
                        const uidRegList = new RegExp("\\d+").exec(e.href);
                        if (uidRegList && uidRegList?.length != 0) {
                            resolv(uidRegList[0]);
                        }
                        resolv("");
                    }
                })
            })
        case "article":
            return new Promise((resolv) => {
                GetAsyncDOM.Get('#up-info', () => {
                    const e = document.querySelector("#up-info > div.up-detail > div > a.name") as HTMLLinkElement;
                    if (!!e) {
                        const uidRegList = new RegExp("\\d+").exec(e.href);
                        if (uidRegList && uidRegList?.length != 0) {
                            resolv(uidRegList[0]);
                        }
                        resolv("");
                    }
                })
            })
        default:
            return new Promise((resolv) => {
                resolv("");
            })
    }
}