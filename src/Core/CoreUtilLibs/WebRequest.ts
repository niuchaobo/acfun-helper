const send = <T = any>(target: string | URL, method: string, reqRaw: string, syncMode: boolean, middle: Array<(...args: any) => XMLHttpRequest>, triggers: Record<keyof XMLHttpRequestEventMap | string, () => any>, headers: Record<string, string>) => {
    const xhr = new XMLHttpRequest();
    return new Promise<T>((resolve, reject) => {
        xhr.addEventListener('load', () => resolve(xhr.response));
        xhr.addEventListener('error', () => reject(xhr.status));
        middle.forEach(f => {
            f(xhr);
        })
        for (let e in triggers) {
            xhr.addEventListener(e, triggers[e]);
        }

        xhr.open(method, target, !syncMode);
        for (let k in headers) {
            xhr.setRequestHeader(k, headers[k]);
        }
        xhr.send(reqRaw);
    })
}

const middles = {
    setResponseTyoe: (ctx: XMLHttpRequest, type: XMLHttpRequestResponseType) => {
        ctx.responseType = type;
    },
    overrideMimeType: (ctx: XMLHttpRequest, mime: string) => {
        ctx.overrideMimeType(mime);
    },
}

/**
 * fetch simple
 * @returns 
 */
export async function fetchResult(url: string, method: "GET" | "POST", data: string, withCredentials: RequestCredentials = "omit", mode: "same-origin" | "cors" | "navigate" | "no-cors" = "cors", cache: RequestCache = "no-cache", referrerPolicy: "same-origin" | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url" = "no-referrer", referrer: string = "") {
    var result;
    switch (method) {
        case "POST":
            let config: RequestInit = {
                method: "POST", credentials: withCredentials, headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', 'Accept': "*/*"
                }, body: data, mode: mode, cache: cache, referrerPolicy: referrerPolicy, referrer: referrer
            }
            console.log(config)
            result = fetch(url, config).then((res => { return res.text() }))
            break;
        case "GET":
        default:
            result = fetch(url, { credentials: withCredentials ? "include" : "same-origin", mode: mode, cache: cache, referrerPolicy: referrerPolicy, referrer: referrer }).then((response) => {
                return response.text();
            })
            console.log("here")
            break;
    }
    return result
}

export const fetchBinary = (target: string, req: string) => {
    return send(target, "GET", req, true, [(ctx) => {
        middles.setResponseTyoe(ctx, "arraybuffer")
        return ctx
    }], {}, {})
}

