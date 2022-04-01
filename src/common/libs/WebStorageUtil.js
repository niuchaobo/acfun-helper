/**
 * SenssionStorage & LocalStorage 操作封装
 */
class WebStorageUtil {
    constructor(storeMode = "local", storeTimeout = 86400000, timeLimit = 2000) {
        this.storeMode = storeMode;
        this.storeTimeout = storeTimeout;
        this.timeLimit = timeLimit;
        this.unavailTypes = ["undefined", "function", "Symbol",];
        this.hander = {};
        this.init();
    }

    init() {
        if ("localStorage" in window && "storage" in navigator) {
            navigator.storage.estimate().then(status => {
                if (status.usage + 10 > status.quota) {
                    this.purgeOutdate();
                    throw "[LOG]WebStorageUtil > init: Storagespace is about out of quota,unable to init WebStorageUtil or execute inner function.";
                }
            })
            switch (this.storeMode) {
                case "local":
                    this.hander = window.localStorage;
                    break;
                case "session":
                    this.hander = window.sessionStorage;
                    break;
            }
        } else {
            throw ("[LOG]WebStorageUtil > init: browser is not support localStorage.")
        }
    }

    get unavailTypes() {
        return this._unavailTypes;
    }

    set unavailTypes(types) {
        this._unavailTypes = types;
    }

    typeCheck(elem) {
        if (typeof (elem) in this.unavailTypes) {
            return false;
        }
        return true;
    }

    getByKey(key = "") {
        if (key) {
            const result = JSON.parse(this.hander.getItem(key));
            if (!result) {
                return;
            }
            if (!result.timeout) {
                return result;
            }
            const latestTime = new Date;
            if (result.timeout != -1) {
                if (result.timeout < latestTime.getTime()) {
                    //已经过期了，我不仅不会返回给你，我还会把这个漏网之鱼删掉！
                    this.hander.removeItem(key);
                    return false;
                }
            }
            return result["value"];
        }
        return false;
    }

    setByKv(key, value) {
        this.init()
        if (this.typeCheck(key) && this.typeCheck(value)) {
            let timeoutStamp;
            if (this.storeTimeout != -1) {
                timeoutStamp = (new Date).getTime() + this.storeTimeout;
            }
            const data = { timeout: timeoutStamp, value: value }
            this.hander.setItem(key, JSON.stringify(data))
            return true;
        }
        return false;
    }

    removeItems(keys = "") {
        function removeItem(_this, key) {
            if (_this.hander.hasOwnProperty(key)) {
                _this.hander.removeItem(key);
                return true;
            }
            return false;
        }
        if (typeof keys == "string") {
            return removeItem(this, keys);
        } else if (typeof keys == "object") {
            let stateCount = 0, causeElemt = [];
            keys.forEach(e => {
                if (removeItem(e)) {
                    stateCount++;
                } else {
                    causeElemt.push(e);
                }
            });
            if (stateCount === 0) {
                return true;
            }
            return causeElemt;
        }
    }

    watchByKey(targetKey, eventCall) {
        if (!targetKey && typeof eventCall != 'function') {
            throw "[LOG]WebStorageUtil > watchByKey:targetKey or eventCall maybe wrong type.";
        }
        if (e.key === targetKey) {
            window.addEventListener("storage", eventCall);
        }
    }

    purgeOutdate() {
        const keyList = Object.keys(this.hander);
        keyList.forEach(e => {
            const result = this.getByKey(e);
            if (result.timeout < new Date.getTime()) {
                this.removeItems(e);
            }
        })
    }

    static isSupport() {
        if ("localStorage" in window && "sessionStorage" in window) {
            return true;
        }
        return false;
    }
}
