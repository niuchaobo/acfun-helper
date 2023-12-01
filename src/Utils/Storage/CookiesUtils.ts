/**
 * Cookies处理封装
 * @description A complete cookies reader/writer framework with full unicode support. https://developer.mozilla.org/en-US/docs/DOM/document.cookie. This framework is released under the GNU Public License, version 3 or later. http://www.gnu.org/licenses/gpl-3.0-standalone.html
 * @tutorial 
 * setItem(name, value[, end[, path[, domain[, secure]]]])
 * getItem(name)
 * removeItem(name[, path], domain)
 * hasKey(name)
 * keys()
 * addTime({day:31})
 */
export class CookiesUtils {
    static getItem(sKey: string) {
        return decodeURIComponent(
            document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")
        ) || null;
    }

    /**
     * 设置Cookies
     */
    static setItem(sKey: string, sValue: string, vEnd: Date | string | number, sPath: string = "", sDomain: string, bSecure: string) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    //如果是数字,单位默认是:秒
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    const dateObject = vEnd as Date;
                    sExpires = "; expires=" + dateObject.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "; path=/") + (bSecure ? "; secure" : "");
        return true;
    }

    static removeItem(sKey:string, sPath:string, sDomain:string) {
        if (!sKey || !CookiesUtils.hasKey(sKey)) { return false; }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "; path=/");
        return true;
    }

    static hasKey(sKey:string) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }

    static keys() {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
            aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
        }
        return aKeys;
    }

    getAllArray() {
        return document.cookie == "" ? undefined : document.cookie.split(";");
    }

    getAllDic() {
        let raw = this.getAllArray() ?? [];
        let result:Record<string,string> = {};
        raw.forEach(e => {
            let temp = e.trim().split("=");
            result[temp[0]] = temp[1];
        })
        return result;
    }

    addChangeListener(key:string, callback:(e?:any)=>any) {
        window.CookieStore.onchange = (e) => {
            e.type == "changed" && e.changed.forEach(f => {
                f.name == key && callback();
            })
        }
    }

}
