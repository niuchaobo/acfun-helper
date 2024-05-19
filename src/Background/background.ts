import { AcFunHelperBgFrame } from "@/Core/Sigularity";
import { ExtOptions } from "@/Core/CoreUtils";
import { ModuleStd } from "@/Declare/FeatureModule";
import { bgFeatures } from "@/Modules/BgModules";
import { hosts } from "./ExecHostReg";

export class AcFunHelperBackend implements AcFunHelperBgFrame {
    TypedModules: Record<ModuleStd.SequentialType, Record<ModuleStd.manifest["name"], ModuleStd.manifest>>;
    ExecHost: Record<ModuleStd.SequentialType, Record<ModuleStd.lordManifest["name"], ModuleStd.lordManifest>>;

    constructor() {
        console.log(new Date(), "Hello from Backend.");
        chrome.runtime.onInstalled.addListener(this.onInstalled.bind(this));

        this.TypedModules = {} as Record<ModuleStd.SequentialType, Record<ModuleStd.manifest["name"], ModuleStd.manifest>>;
        this.ExecHost = {} as Record<ModuleStd.SequentialType, Record<ModuleStd.lordManifest["name"], ModuleStd.lordManifest>>;
        this.Init()
    }

    Init() {
        this.UpdateConf();
        //加载功能模块
        for (let featName in bgFeatures) {
            const module = bgFeatures[featName];
            if (module.workSpace != ModuleStd.WorkSpace.Background) {
                continue
            }

            if (!module.sequentialType) {
                if (!this.TypedModules[ModuleStd.SequentialType.Loaded]) {
                    this.TypedModules[ModuleStd.SequentialType.Loaded] = {};
                }
                this.TypedModules[ModuleStd.SequentialType.Loaded][module.name] = module;
            } else {
                if (!this.TypedModules[module.sequentialType]) {
                    this.TypedModules[module.sequentialType] = {};
                }
                this.TypedModules[module.sequentialType][module.name] = module;
            }
        }
        //运行承载模块
        for (let hostName in hosts) {
            const host = hosts[hostName];
            host.main(this.TypedModules[host.requiredSequentialType])
        }

    }

    onInstalled(details: chrome.runtime.InstalledDetails) {
        this.UpdateConf();
        const versionNum = chrome.runtime.getManifest().version;
        if (details.reason === 'install') {
            // chrome.tabs.create({ url: chrome.runtime.getURL('bg/firstRun.html') });
            chrome.notifications.create("", {
                type: 'basic',
                iconUrl: 'icon/icon128.png',
                title: 'AcFun助手',
                message: '安装了！'
            });
        }
        if (details.reason === 'update') {
            if (versionNum == details.previousVersion) {
                chrome.notifications.create("", {
                    type: 'basic',
                    iconUrl: 'icon/icon128.png',
                    title: 'AcFun助手',
                    message: '重启了！'
                });
                return;
            }
            chrome.notifications.create("", {
                type: 'basic',
                iconUrl: 'icon/icon128.png',
                title: 'AcFun助手',
                message: '更新了！'
            });
        }
    }

    UpdateConf() {
        ExtOptions.saveAll(ExtOptions.sanitizeOptions({}))
        console.log("配置更新完成");
    }

}

export { };
