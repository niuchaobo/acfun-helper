import { ModuleStd } from "@/Declare/FeatureModule";
import { lord as menuManager } from "@/Background/ContextMenu/menuManager";
import { lord as omniManager } from "./Omnibox/omniManager";
import { lord as scheduler } from "./Scheduler/scheduler";

export const hosts: Record<ModuleStd.lordManifest["name"], ModuleStd.lordManifest> = {
    menuManager, omniManager, scheduler
}