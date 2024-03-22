
import { ModuleStd } from "@/Declare/FeatureModule"
import { module as searchMenu } from "@/Modules/Global/SearchMenu/searchMenu"
import { module as omniAcid } from "./Global/Omnibox/acid"

export const bgFeatures: Record<string, ModuleStd.manifest> = {
    searchMenu, omniAcid
}