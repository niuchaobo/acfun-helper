import { AcFunHelperFgFrame } from "@/Core/Sigularity";
import { ModuleStd } from "@/Declare/FeatureModule";
import { features } from "../Modules/FeatureRegistry";
import { fgDebugLog,LogLevel } from "@/Core/CoreUtilLibs/ConsoleProxy";

class AcFunHelperFrontend implements AcFunHelperFgFrame {
    TypedModules: Record<ModuleStd.SequentialType, Record<ModuleStd.manifest["name"], ModuleStd.manifest>>;
    constructor() {
        this.TypedModules = {} as Record<ModuleStd.SequentialType, Record<ModuleStd.manifest["name"], ModuleStd.manifest>>;
        this.Init();
    }

    async Init() {
        window.alitadebug = true;
        fgDebugLog("Fg","Init","Init...",LogLevel.Info)
        for (let featName in features) {
            const module = features[featName];
            if (!module.sequentialType) {
                if (this.TypedModules[ModuleStd.SequentialType.Loaded]) {
                    this.TypedModules[ModuleStd.SequentialType.Loaded][module.name] = module;
                } else {
                    this.TypedModules[ModuleStd.SequentialType.Loaded] = {};
                }
            } else {
                this.TypedModules[module.sequentialType][module.name] = module;
            }

        }

        window.addEventListener("load", (e) => {
            this.Loaded(e);
        });

        document.addEventListener("DOMContentLoaded", (e) => {
            this.OnDOMContentLoaded(e);
        });


    }

    async Loaded(e: Event) {
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