import { ModuleStd } from "@/Declare/FeatureModule";
import { lord as menuManager } from "@/Background/ContextMenu/menuManager";

export const hosts: Record<ModuleStd.lordManifest["name"], ModuleStd.lordManifest> = {
    menuManager
}