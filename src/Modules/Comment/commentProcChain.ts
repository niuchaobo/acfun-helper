import { ModuleStd } from "@/Declare/FeatureModule"
import { module as userTag } from "./UserTag/userTag"
import { module as upAndStaffTag } from "./UpAndStaffTag/upAndStaffTag"

export const ProcessChain: Record<string, ModuleStd.manifest> = {
    upAndStaffTag,userTag
}