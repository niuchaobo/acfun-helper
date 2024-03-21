import { ModuleStd } from "@/Declare/FeatureModule";
import { module as navGlass } from "@/Modules/Theming/IndexTheming/navGlass"
import { module as userId } from "@/Modules/Auth/userId"
import { module as banana } from "@/Modules/Banana/banana"
import { module as flexProgressbar } from "@/Modules/VideoPlayer/FlexProgressBar/flexProgressbar"
import { module as rightNavBar } from "@/Modules/Pages/IndexRightMenu/rightNavBar"
import { module as abPlay } from "@/Modules/VideoPlayer/ABPlay/abPlay"

export const features: Record<string, ModuleStd.manifest> = {
    navGlass, userId, banana, flexProgressbar, rightNavBar, abPlay
}