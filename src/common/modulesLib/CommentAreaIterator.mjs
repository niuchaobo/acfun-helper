class DependencyError {
    constructor(message) {
        this.message = message;
        this.name = "DependencyError";
    }
}

/**
 * 评论区遍历操作
 * @description 1.遍历评论区评论，并进行操作 newInstant->add->start 2.遍历评论区并添加操作菜单内容 newInstant->menuAdd->start
 */
export class CommentAreaIterator {
    constructor() {
        /**@type {InnerDefined.CommentAreaIterator.Registry} */
        this.registry = {
            _sys: [],

        };
        /**@type {InnerDefined.CommentAreaIterator.MenuRegistry} */
        this.menuCallback = {
            _sys: [],

        }
        if (typeof (GetAsyncDomUtil) == "undefined") {
            throw new DependencyError("该类依赖于核心类 GetAsyncDomUtil");
        }
    }

    /**
     * 添加selector对应的回调
     * @param {string} subSelector 
     * @param {function} callback 
     * @returns {boolean}
     */
    add(subSelector, callback) {
        if (this.registry._sys.includes(subSelector)) {
            return false;
        }
        this.registry._sys.push(subSelector);
        this.registry[subSelector] = callback;
        return true;
    }

    /**
     * 执行遍历
     * @returns 
     */
    start() {
        const childrens = document.querySelector(".ac-comment-root-list").children;
        const hotChildrens = document.querySelector(".ac-comment-hot-list").children;
        for (let e of childrens) {
            this.registry._sys.forEach(callName => {
                callName != "_sys" && this.registry[callName](e);
            })
            this.menuCallback._sys.forEach(() => {
                this.menuExec(e);
            })
        }
        for (let i = 0; i < hotChildrens.length - 1; i++) {
            const e = hotChildrens[i];
            console.log(e)
            this.registry._sys.forEach(callName => {
                callName != "_sys" && this.registry[callName](e);
            })
            this.menuCallback._sys.forEach(() => {
                this.menuExec(e);
            })
        }
    }

    /**
     * 添加菜单内容
     * @param {string} menuItemName 
     * @param {string} menuItemDisplay 
     * @param {function} callback 
     * @returns {boolean}
     */
    menuAdd(menuItemName, menuItemDisplay, callback) {
        if (this.menuCallback._sys.includes(menuItemName)) {
            return false;
        }
        this.menuCallback._sys.push(menuItemName);
        this.menuCallback[menuItemName] = {
            callback: callback,
            displayName: menuItemDisplay
        }
        return true;
    }

    /**
     * 在遍历过程中添加菜单
     * @param {HTMLElement} commentElem 
     */
    menuExec(commentElem) {
        if (this.menuCallback._sys) {
            for (let menuItemData in this.menuCallback) {
                if (menuItemData == "_sys") {
                    continue;
                }
                const newItem = document.createElement("span");
                newItem.className = menuItemData;
                newItem.innerText = this.menuCallback[menuItemData].displayName;
                commentElem.querySelector(".area-comm-more").appendChild(newItem);
                commentElem.querySelector(".area-comm-more").querySelector("." + menuItemData).addEventListener("click", this.menuCallback[menuItemData].callback);
            }
        }
    }

    /**
     * 获取对象中的信息
     * @param {HTMLElement} commentItemElem
     * @param {"username"|"uid"|"commentid"|"index"|"userimg"|"userimgWidget"|"time"|"content"} info
     */
    static reference(commentItemElem, info) {
        switch (info) {
            case "commentid":
                const cid = commentItemElem.children[0].dataset["commentid"];
                return cid ? Number(cid) : false;
            case "index":
                const index = commentItemElem.children[0].querySelector(".index-comment").innerText.replace("#", "");
                return index ? Number(index) : false;
            case "uid":
                const uid = commentItemElem.querySelector("a.name").dataset["userid"];
                return uid ? Number(uid) : false;
            case "username":
                return commentItemElem.querySelector("a.name").innerText;
            case "userimgWidget":
                return commentItemElem.querySelector("a.thumb").children[1].src;
            case "userimg":
                return commentItemElem.querySelector("a.avatar").src;
            case "time":
                return commentItemElem.querySelector("span.time_times").innerText
            case "like":
                return commentItemElem.querySelector("a.area-comment-like").innerText.replace("赞", "")
            case "device":
                return commentItemElem.querySelector("a.deviceModel").innerText
            case "content":
                return commentItemElem.querySelector("p.area-comment-des-content").innerHTML;
        }
    }

}
