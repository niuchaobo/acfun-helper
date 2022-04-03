export function afterReconfigure() {
    document.querySelector("#wait").style.display = "none;";
    mdui.snackbar({
        message: '配置完成，正在等待刷新。',
        position: 'right-bottom',
        timeout: 1000,
    });
    setTimeout(() => {
        document.querySelector("#wait").style.display = "none;"
        if (!globalThis?.['devMode']) {
            globalThis.location.reload();
        }
    }, 1500);
}

export function removeExtalElem(tag, max = 2) {
    const parentEle = document.querySelector(tag).parentElement;
    if (parentEle.childElementCount > max) {
        for (let i = max; i < parentEle.children.length; i++) {
            parentEle?.children?.[i].remove()
        }
    }
}

/**@param {(e:APIs.UserInfoApi,f:string)=>{} fn*/
export const userAddWrap = async (list, e, fn) => {
    if (!e) {
        mdui.alert("数据空空");
        return
    }
    e = e.trim();
    if (/http.*/.test) {
        e = new RegExp("[0-9]+").exec(e)[0];
    }
    //连续正整数
    if (/^[0-9]+$/.test(e)) {
        if (e in list) {
            mdui.alert("用户已在列表中。")
            return;
        }
        try {
            /**@type {APIs.UserInfoApi} */
            const userInfo = await acfunApis.users.getUserInfo(e);
            if (userInfo.result == 0) {
                fn(userInfo, e);
                return;
            }
            throw TypeError("你猜猜用户存不存在。")
        } catch (error) {
            mdui.alert("你输入的数据不对劲？或者服务器出毛病了。")
        }
    } else {
        mdui.alert("你输入的数据不对劲");
    }
}