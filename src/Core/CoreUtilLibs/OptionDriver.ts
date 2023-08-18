import { readOnlyKey, defaultOption } from "@/Declare/OptionConf";

export class ExtOptions {
    storageArea: chrome.storage.AreaName;
    constructor(storageArea: chrome.storage.AreaName = "local") {
        this.storageArea = storageArea;
    }

    /**
     * 获取相关存储区域的全部配置
     */
    _getAll() {
        return new Promise((resolve, reject) => {
            chrome.storage[this.storageArea].get(null, (options) => {
                resolve(ExtOptions.sanitizeOptions(options));
            });
        });
    }

    /**
     * 获取所有本地配置
     */
    static getAll() {
        return new ExtOptions('local')._getAll();
    }

    /**
     * 保存所有配置到相关区域
     */
    _saveAll(options: Record<string, any>) {
        return new Promise(() => {
            chrome.storage[this.storageArea].set(ExtOptions.transOptions(options));
        });
    }

    /**
     * 将此配置保存为全部配置
     */
    static saveAll(options: Record<string, any>) {
        return new ExtOptions('local')._saveAll(options);
    }

    /**
     * 获取相关区域键为key的配置
     */
    _get(key: string | Array<any>): Promise<boolean> {
        return new Promise((resolve, reject) => {
            chrome.storage[this.storageArea].get(key, (res) => {
                if (res.length == 2 && JSON.stringify(res) == "{}") {
                    reject(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * 获取本地键为key的配置
     */
    static get(key: string | Array<any>) {
        return new ExtOptions('local')._get(key);
    }

    /**
     * 获取相关区域键为key的配置内容
     */
    _getValue(key: string) {
        return new Promise<{ [key: string]: any }>((resolve, reject) => {
            chrome.storage[this.storageArea].get(key, (res) => {
                if (res.length == 2 && JSON.stringify(res) == "{}") {
                    reject(false);
                } else {
                    resolve(res[key]);
                }
            });
        });
    }

    /**
     * 获取本地键为key的配置内容
     */
    static getValue(key: string) {
        return new ExtOptions('local')._getValue(key);
    }

    /**
     * 设置相关区域键key为value的配置
     */
    _setValue(key: string, value: any) {
        return new Promise((resolve, reject) => {
            try {
                if (readOnlyKey.includes(key)) {
                    reject("This key is in readOnlyKey list.");
                } else {
                    chrome.storage[this.storageArea].set({ [key]: value });
                    resolve(true);
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    /**
     * 设置本地键key为value的配置
     */
    static async setValue(key: any, value: any) {
        return new ExtOptions('local')._setValue(key, value);
    }

    /**
     * 删除相关区域键key的配置
     */
    _delete(key: string) {
        return new Promise((resolve, reject) => {
            if (readOnlyKey.includes(key)) {
                resolve(false);
            } else {
                chrome.storage[this.storageArea].remove(key, () => {
                    resolve(true);
                });
            }
        });
    }

    /**
     * 删除本地键key的配置
     */
    static delete(key:string) {
        return new ExtOptions('local')._delete(key);
    }

    /**
     * 清空相关区域的键key的配置
     */
    _purgeValue(key:string) {
        this._setValue(key, null);
    }

    /**
     * 清空本地键key的配置
     */
    static purgeValue(key:string) {
        return new ExtOptions('local')._purgeValue(key);
    }

    /**
     * 清空相关区域所有配置
     */
    _purgeAll() {
        return new Promise((resolve, reject) => {
            chrome.storage[this.storageArea].clear();
        })
    }

    /**
     * 清空本地的所有配置
     */
    static purgeAll() {
        return new ExtOptions('local')._purgeAll();
    }

    /**
     * 重置相关区域所有配置（恢复默认配置）
     */
    _resetAll() {
        return new Promise((resolve, reject) => {
            ExtOptions.purgeAll();
            ExtOptions.saveAll(ExtOptions.sanitizeOptions({}));
            resolve(true);
        })
    }

    /**
     * 重置本地所有配置
     */
    static resetAll() {
        return new ExtOptions('local')._resetAll();
    }

    async _usedSpace(key = null) {
        //if key == null,count total space usage.
        return new Promise((resolve, reject) => {
            chrome.storage['local'].getBytesInUse(null, (e) => {
                resolve(e)
            });
        })
    }

    /**
     * 计算使用空间
     */
    static async usedSpace(key = null) {
        return await new ExtOptions('local')._usedSpace(key);
    }

    /**
     * 以传过来的options为主体做配置填充，如果其中没有就取默认值
     */
    static sanitizeOptions(options:any) {
        for (const key in defaultOption) {
            if (!options.hasOwnProperty(key)) {
                options[key] = defaultOption[key];
            }
        }
        return options;
    }

    /**
     * 以default为主体做配置填充，如果传过来的options有对应的key,就用传过来的
     */
    static transOptions(options:any) {
        for (const key in defaultOption) {
            if (options.hasOwnProperty(key)) {
                if (readOnlyKey.indexOf(key) > -1) {
                    continue;
                }
                defaultOption[key] = options[key];
            }
        }
        return defaultOption;
    }

    /**
     * 切换某个功能模块的开关状态
     */
    static async changeFeatureSwitch(featureOptionName:string, swStatus:boolean) {
        if (featureOptionName == undefined || swStatus == undefined || typeof (swStatus) != "boolean") {
            throw ("[WARN]ExtOptions > changeFeatureSwitch: two param both should not empty or second param should be boolean type.");
        }
        let raw = await ExtOptions.getValue(featureOptionName);
        if(typeof(raw)=="boolean"){
            return raw == swStatus ? true : await ExtOptions.setValue(featureOptionName, swStatus);
        }
    }

}
