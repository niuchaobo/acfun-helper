import { AcFunHelperFgFrame } from "@/Core/Sigularity";
import { ModuleStd } from "@/Declare/FeatureModule";
import { features } from "@/Modules/FeatureRegistry";
import { fgDebugLog, LogLevel, modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { GetAsyncDOM, MessageRouter } from "@/Core/CoreUtils";
import { isTargetPage, REG } from "@/Core/Regs";
import { fetchPageInfo } from "./pageInfo";
import { GlobalStyleManager } from "@/Utils/StyleManager";
import { KeyBindMgr, KeyBindModInitResp } from "@/Utils/KeyBind/KeyBindMgr"

interface AcFunHelperFgRuntimeData {
    dataset: {
        fetchDougaInfoStatus: boolean
        dougaInfo: APIs.DougaInfo
        runtimeMsgTriggers: Record<string, (...args: any) => Promise<any> | undefined | void>
    }
}

export class AcFunHelperFrontend implements AcFunHelperFgFrame {
    TypedModules: Record<ModuleStd.SequentialType, Record<ModuleStd.manifest["name"], ModuleStd.manifest>>;
    runtime: AcFunHelperFgRuntimeData;
    StyleManager: GlobalStyleManager;
    KeyMgr: typeof KeyBindMgr = KeyBindMgr;
    constructor() {
        this.TypedModules = {} as Record<ModuleStd.SequentialType, Record<ModuleStd.manifest["name"], ModuleStd.manifest>>;
        this.runtime = {
            dataset: {
                fetchDougaInfoStatus: false,
                dougaInfo: {} as APIs.DougaInfo,
                runtimeMsgTriggers: {},
            }
        }
        this.StyleManager = new GlobalStyleManager();
        globalThis.AcFunHelperStyleMgr = this.StyleManager;
        this.Init();
    }

    async Init() {
        window.alitadebug = true;
        fgDebugLog("Fg", "Init", "Init...", LogLevel.Info);
        for (let featName in features) {
            const module = features[featName];
            if (module.workSpace != ModuleStd.WorkSpace.Frontend) {
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
            if (module.runtimeMsgTrigger && Object.keys(module.runtimeMsgTrigger).length != 0) {
                this.runtime.dataset.runtimeMsgTriggers = { ...this.runtime.dataset.runtimeMsgTriggers, ...module.runtimeMsgTrigger }
            }
        }

        const FgMsgRouter = new MessageRouter.MsgRouter();
        Object.keys(this.runtime.dataset.runtimeMsgTriggers).forEach((e => {
            FgMsgRouter.on(e, this.runtime.dataset.runtimeMsgTriggers[e]);
        }))
        chrome.runtime.onMessage.addListener(FgMsgRouter.listener());

        window.addEventListener("load", (e) => {
            this.Loaded(e);
        });

        document.addEventListener("DOMContentLoaded", (e) => {
            //获取稿件信息
            let result = fetchPageInfo();
            if (result.status) {
                fgDebugLog("Fg", "DOMContentLoaded", "fetchPageInfo successful.", LogLevel.Info);
                this.runtime.dataset.fetchDougaInfoStatus = true;
                this.runtime.dataset.dougaInfo = result.result;
                this.OnPageInfoGot();
            }
            this.OnDOMContentLoaded(e);
        });
        this.OnShortcutKeyBind();

    }

    async Loaded(e: Event) {
        isTargetPage(REG.videoAndBangumi) && GetAsyncDOM.Get("#ACPlayer .control-bar-top .box-right", () => {
            for (let featName in this.TypedModules[ModuleStd.SequentialType.OnAcVideoPlayerLoaded]) {
                this.TypedModules[ModuleStd.SequentialType.OnAcVideoPlayerLoaded][featName].main();
            }
        });
        for (let featName in this.TypedModules[ModuleStd.SequentialType.Loaded]) {
            this.TypedModules[ModuleStd.SequentialType.Loaded][featName].main();
        }
    }

    async OnDOMContentLoaded(e: Event) {
        for (let featName in this.TypedModules[ModuleStd.SequentialType.OnDOMContentLoaded]) {
            this.TypedModules[ModuleStd.SequentialType.OnDOMContentLoaded][featName].main();
        }
    }

    async OnPageInfoGot() {
        for (let featName in this.TypedModules[ModuleStd.SequentialType.OnPageInfoGot]) {
            this.TypedModules[ModuleStd.SequentialType.OnPageInfoGot][featName].main();
        }
    }

    async OnShortcutKeyBind() {
        for (let featName in this.TypedModules[ModuleStd.SequentialType.OnPageKeyShotcutReg]) {
            const mod = this.TypedModules[ModuleStd.SequentialType.OnPageKeyShotcutReg][featName];
            if (mod.init != undefined) {
                const setting: Array<KeyBindModInitResp> = await mod.init();
                setting?.length && setting.forEach(e => {
                    this.KeyMgr.Add(e.key, e.main);
                })
            }
        }
        this.KeyMgr.Hook();
    }

}
