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
    }
}

export const FgBroadcastChannelName = "AcFunHelperFgMsgSw";

export class AcFunHelperFrontend implements AcFunHelperFgFrame {
    TypedModules: Record<ModuleStd.SequentialType, Record<ModuleStd.manifest["name"], ModuleStd.manifest>>;
    runtime: AcFunHelperFgRuntimeData;
    StyleManager: GlobalStyleManager;
    KeyMgr: typeof KeyBindMgr = KeyBindMgr;
    RuntimeMsgTriggers: Record<string, (...args: any) => Promise<any> | undefined | void>
    MsgRouter;
    MsgSwitch;
    BroadcastChannel;
    constructor() {
        this.TypedModules = {} as Record<ModuleStd.SequentialType, Record<ModuleStd.manifest["name"], ModuleStd.manifest>>;
        this.runtime = {
            dataset: {
                fetchDougaInfoStatus: false,
                dougaInfo: {} as APIs.DougaInfo,
            }
        }
        this.StyleManager = new GlobalStyleManager();
        globalThis.AcFunHelperStyleMgr = this.StyleManager;
        this.RuntimeMsgTriggers = {};
        for (let i in ModuleStd.SequentialType) {
            const SeqName = ModuleStd.SequentialType[i] as unknown as ModuleStd.SequentialType;
            this.TypedModules[SeqName] = {}
        }
        this.MsgSwitch = new MessageRouter.MsgSwitchWithEventTrigger();
        this.BroadcastChannel = new BroadcastChannel(FgBroadcastChannelName);
        this.MsgRouter = new MessageRouter.MsgRouter();
        this.Init();
    }

    async Init() {
        window.alitadebug = true;
        fgDebugLog("Fg", "Init", "Init...", LogLevel.Info);
        Object.assign(globalThis, { jQuery, $: jQuery });

        for (let featName in features) {
            const module = features[featName];
            if (module.workSpace != ModuleStd.WorkSpace.Frontend) {
                continue
            }
            if (!module.sequentialType) {
                this.TypedModules[ModuleStd.SequentialType.Loaded][module.name] = module;
            } else {
                this.TypedModules[module.sequentialType][module.name] = module;
            }
            if (module.runtimeMsgTrigger && Object.keys(module.runtimeMsgTrigger).length != 0) {
                this.RuntimeMsgTriggers = { ...this.RuntimeMsgTriggers, ...module.runtimeMsgTrigger }
            }
        }

        Object.keys(this.RuntimeMsgTriggers).forEach((e => {
            this.MsgRouter.on(e, this.RuntimeMsgTriggers[e]);
        }))
        chrome.runtime.onMessage.addListener(this.MsgRouter.listener());
        this.BroadcastChannel.addEventListener("message", this.MsgSwitch.listener());
        this.MsgSwitch.on("/fg/event/{eventType}/{eventName}", this.MsgSwitch.EventBaseMsgTrigger);

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
