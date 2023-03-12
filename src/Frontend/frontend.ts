import { AcFunHelperFgFrame } from "@/Core/Sigularity";
import { ModuleStd } from "@/Declare/FeatureModule";
// import { module as navGlass } from "@/Modules/IndexTheming/navGlass"
import { features } from "../Modules/FeatureRegistry";


console.log("Hello from AcFun-Helper-Abyss!");

class AcFunHelperFrontend implements AcFunHelperFgFrame {
    Modules:Array<ModuleStd.manifest>
    constructor(){
        this.Modules = []
        this.Init()
    }

    Init(){
        for(let f in features){
            this.Modules.push(features[f])
        }
        // this.Modules.push(navGlass)

        window.addEventListener("load", (e) => {
            this.Loaded();
        });

        document.addEventListener("DOMContentLoaded", (e) => {

        });

    }

    Loaded(){
        this.Modules.forEach(f=>{
            f.main()
        })
    }
    
}

const AcFunHelperFg = new AcFunHelperFrontend();
globalThis.AcFunHelperFg = AcFunHelperFg;
export {};