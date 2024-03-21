import { AcFunHelperFgFrame } from "@/Core/Sigularity";
import { ModuleStd } from "@/Declare/FeatureModule";
import { features } from "@/Modules/FeatureRegistry";
import { fgDebugLog, LogLevel, modLog } from "@/Core/CoreLibs/ConsoleProxy";
import { GetAsyncDOM } from "@/Core/CoreUtils";
import { isTargetPage, REG } from "@/Core/Regs";
import { fetchPageInfo } from "./pageInfo";

interface AcFunHelperFgRuntimeData {
    dataset: {
        fetchDougaInfoStatus: boolean
        dougaInfo: APIs.DougaInfo
    }
}

class AcFunHelperFrontend implements AcFunHelperFgFrame {
    TypedModules: Record<ModuleStd.SequentialType, Record<ModuleStd.manifest["name"], ModuleStd.manifest>>;
    runtime: AcFunHelperFgRuntimeData;
    constructor() {
        this.TypedModules = {} as Record<ModuleStd.SequentialType, Record<ModuleStd.manifest["name"], ModuleStd.manifest>>;
        this.runtime = {
            dataset: {
                fetchDougaInfoStatus: false,
                dougaInfo: {} as APIs.DougaInfo
            }
        }
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

        }

        //获取稿件信息
        let result = fetchPageInfo();
        if (result.status) {
            fgDebugLog("Fg", "Loaded", "fetchPageInfo successful.", LogLevel.Info);
            this.runtime.dataset.fetchDougaInfoStatus = true;
            this.runtime.dataset.dougaInfo = result.result;
        }

        window.addEventListener("load", (e) => {
            this.Loaded(e);
        });

        document.addEventListener("DOMContentLoaded", (e) => {
            this.OnDOMContentLoaded(e);
        });


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

}

const AcFunHelperFg = new AcFunHelperFrontend();
globalThis.AcFunHelperFg = AcFunHelperFg;
export { };