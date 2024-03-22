import { ModuleStd } from "@/Declare/FeatureModule";
import { lord as menuManager } from "@/Background/ContextMenu/menuManager";
import { lord as omniManager } from "./Omnibox/omniManager";

export const hosts: Record<ModuleStd.lordManifest["name"], ModuleStd.lordManifest> = {
    menuManager, omniManager
}