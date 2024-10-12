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
import { defaultConf as IndexNextPage } from "@/Modules/Pages/NextPage/index"
import { defaultConf as NormalPartListNextPage } from "@/Modules/Pages/NextPage/partList"
import { defaultConf as LiveDanmuTime } from "@/Modules/Live/DanmuTime/liveDanmuTime"
import { defaultConf as LiveIndexPause } from "@/Modules/Live/IndexPause/liveIndexPause"
import { defaultConf as LiveIndexCount } from "@/Modules/Live/IndexCount/liveIndexCount"

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
    IndexNextPage,
    NormalPartListNextPage,
    LiveDanmuTime,
    LiveIndexPause,
    LiveIndexCount,
}