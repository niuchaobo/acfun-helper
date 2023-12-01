import { ModuleStd } from "@/Declare/FeatureModule";
import { module as navGlass } from "@/Modules/Theming/IndexTheming/navGlass"
import { module as userId } from "@/Modules/Auth/userId"

export const features: Record<string, ModuleStd.manifest> = {
    navGlass, userId
}