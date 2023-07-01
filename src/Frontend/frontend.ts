import { AcFunHelperFgFrame } from "@/Core/Sigularity";
import { ModuleStd } from "@/Declare/FeatureModule";
// import { module as navGlass } from "@/Modules/IndexTheming/navGlass"
import { features } from "../Modules/FeatureRegistry";


console.log("Hello from AcFun-Helper-Abyss!");

class AcFunHelperFrontend implements AcFunHelperFgFrame {
    TypedModules: Record<ModuleStd.SequentialType, Array<ModuleStd.manifest>>;
    constructor() {
        this.TypedModules = {} as Record<ModuleStd.SequentialType, Array<ModuleStd.manifest>>
        this.Init();
    }

    Init() {
        for (let f in features) {
            const module = features[f];
            if (!module.sequentialType) {
                this.TypedModules[ModuleStd.SequentialType.Loaded].push(features[f])
            } else {
                this.TypedModules[module.sequentialType].push(module);
            }

        }

        window.addEventListener("load", (e) => {
            this.Loaded(e);
        });

        document.addEventListener("DOMContentLoaded", (e) => {
            this.OnDOMContentLoaded(e);
        });

        

    }

    Loaded(e:Event) {
        
    }

    OnDOMContentLoaded(e:Event) {

    }

}

const AcFunHelperFg = new AcFunHelperFrontend();
globalThis.AcFunHelperFg = AcFunHelperFg;
export { };