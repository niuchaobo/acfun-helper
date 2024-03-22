import { defaultConf as FlexProgressBar } from "@/Modules/VideoPlayer/FlexProgressBar/flexProgressbar"
import { defaultConf as ABPlay } from "@/Modules/VideoPlayer/ABPlay/abPlay"
import { defaultConf as SearchMenu } from "@/Modules/Global/SearchMenu/searchMenu"
import { defaultConf as OmniAcid } from "@/Modules/Global/Omnibox/acid"

export const readOnlyKey: Array<string> = [

]

export const defaultOption: Record<string, any> = {
    logSetting: { "consoleOutput": true, "logLevel": 4 },
    userInfo: {

    },
    LocalUserId: "",
    GetUserId: true,
    NavGlass: true,
    FlexProgressBar,
    ABPlay,

    SearchMenu,
    OmniAcid,
}