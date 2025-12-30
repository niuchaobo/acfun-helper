import { defaultConf as FlexProgressBar } from "@/Modules/VideoPlayer/FlexProgressBar/flexProgressbar"
import { defaultConf as ABPlay } from "@/Modules/VideoPlayer/ABPlay/abPlay"
import { defaultConf as SearchMenu } from "@/Modules/Global/SearchMenu/searchMenu"
import { defaultConf as OmniAcid } from "@/Modules/Global/Omnibox/acid"
import { defaultConf as VideoMediaSession } from "@/Modules/VideoPlayer/MedisSession/videoMediaSession"
import { defaultConf as BgTabSleep } from "@/Modules/VideoPlayer/BgTabSleep/bgTabSleep"
import { defaultConf as PictureInPicture } from "@/Modules/VideoPlayer/PicInPic/index"
import { defaultConf as LiveMediaSession } from "@/Modules/Live/liveMediaSession"
import { defaultConf as CommentIterator } from "@/Modules/Comment/iterator"
import { defaultConf as UserTag } from "@/Modules/Comment/UserTag/userTag"
import { defaultConf as UpAndStaffTag } from "@/Modules/Comment/UpAndStaffTag/upAndStaffTag"
import { defaultConf as IndexNextPage } from "@/Modules/Pages/NextPage/index"
import { defaultConf as NormalPartListNextPage } from "@/Modules/Pages/NextPage/partList"
import { defaultConf as LiveDanmuTime } from "@/Modules/Live/liveDanmuTime"
import { defaultConf as LiveIndexPause } from "@/Modules/Live/liveIndexPause"
import { defaultConf as LiveIndexCount } from "@/Modules/Live/liveIndexCount"
import { defaultConf as NextRecommend } from "@/Modules/VideoPlayer/NextRecommend/watchNextRecommend"
import { defaultConf as Timeline } from "@/Modules/VideoPlayer/Timeline/timeline"
import { defaultConf as TimelineMenu } from "@/Modules/Global/TimelineMenu/timelineMenu"
import { defaultConf as PlayerScreenMode } from "@/Modules/VideoPlayer/PlayerScreenMode/playerMode"
import { defaultConf as VideoQualitySelect } from "@/Modules/VideoPlayer/QualitySelect/qualitySelect"
import { defaultConf as CustomVideoPlayRate } from "@/Modules/VideoPlayer/CustomRate/customPlayRate"
import { defaultConf as PerFrameStep } from "@/Modules/VideoPlayer/PerFrameStep/frameStepForward"
import { defaultConf as DanmakuSearch } from "@/Modules/VideoPlayer/DanmakuSearch/danmakuSearch"
import { defaultConf as URLParam } from "@/Modules/UrlParam/urlParam"
import { defaultConf as ArticlePicDrag } from "@/Modules/Article/picDrag"
import { defaultConf as UnreadMsg } from "@/Modules/Global/Messages/unread"
import { defaultConf as Banana } from "@/Modules/Banana/banana"
import { defaultConf as LiveBanDanmu } from "@/Modules/Live/liveBanDanmuByType/liveBanDanmuByType"
import { defaultConf as LiveNotification } from "@/Modules/Global/Messages/liveNotif"

export const readOnlyKey: Array<string> = [

]

export const defaultOption: Record<string, any> = {
    logSetting: { "consoleOutput": true, "logLevel": 4 },
    cache: {},
    userInfo: {

    },
    LocalUserId: "",
    GetUserId: true,
    NavGlass: true,
    FlexProgressBar,
    ABPlay,

    SearchMenu,
    OmniAcid,
    VideoMediaSession,
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
    NextRecommend,
    Timeline,
    TimelineMenu,
    PlayerScreenMode,
    VideoQualitySelect,
    CustomVideoPlayRate,
    PerFrameStep,
    DanmakuSearch,
    URLParam,
    ArticlePicDrag,
    UnreadMsg,
    Banana,
    LiveBanDanmu,
    LiveNotification,
}