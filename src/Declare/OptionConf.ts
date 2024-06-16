import { defaultConf as FlexProgressBar } from "@/Modules/VideoPlayer/FlexProgressBar/flexProgressbar"
import { defaultConf as ABPlay } from "@/Modules/VideoPlayer/ABPlay/abPlayConf"
import { defaultConf as SearchMenu } from "@/Modules/Global/SearchMenu/searchMenu"
import { defaultConf as OmniAcid } from "@/Modules/Global/Omnibox/acid"
import { defaultConf as MediaSession } from "@/Modules/VideoPlayer/MedisSession/videoMediaSession"
import { defaultConf as BgTabSleep } from "@/Modules/VideoPlayer/BgTabSleep/bgTabSleepConf"
import { defaultConf as PictureInPicture } from "@/Modules/VideoPlayer/PicInPic/conf"
import { defaultConf as LiveMediaSession } from "@/Modules/Live/LiveMediaSession/liveMediaSession"
import { defaultConf as CommentIterator } from "@/Modules/Comment/iterator"
import { defaultConf as UserTag } from "@/Modules/Comment/UserTag/userTag"
import { defaultConf as UpAndStaffTag } from "@/Modules/Comment/UpAndStaffTag/upAndStaffTag"
import { defaultConf as InitNextPage } from "@/Modules/Pages/NextPage/init"
import { defaultConf as IndexNextPage } from "@/Modules/Pages/NextPage/index"
import { defaultConf as NormalPartListNextPage } from "@/Modules/Pages/NextPage/partList"

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
    MediaSession,
    BgTabSleep,
    PictureInPicture,
    LiveMediaSession,
    CommentIterator,
    UserTag,
    UpAndStaffTag,
    InitNextPage,
    IndexNextPage,
    NormalPartListNextPage,
}