import { ModuleStd } from "@/Declare/FeatureModule";
import { module as NavGlass } from "@/Modules/Theming/IndexTheming/navGlass"
import { module as UserId } from "@/Modules/Auth/userId"
import { module as Banana } from "@/Modules/Banana/banana"
import { module as FlexProgressbar } from "@/Modules/VideoPlayer/FlexProgressBar/flexProgressbar"
import { module as RightNavBar } from "@/Modules/Pages/IndexRightMenu/rightNavBar"
import { module as AbPlay } from "@/Modules/VideoPlayer/ABPlay/abPlay"
import { module as MediaSession } from "@/Modules/VideoPlayer/MedisSession/videoMediaSession"
import { module as BgTabSleep } from "@/Modules/VideoPlayer/BgTabSleep/bgTabSleep";
import { module as PictureInPicture } from "@/Modules/VideoPlayer/PicInPic";
import { module as LiveMediaSession } from "@/Modules/Live/LiveMediaSession/liveMediaSession";
import { module as CommentIterator } from "@/Modules/Comment/iterator";
import { module as IndexNextPage } from "@/Modules/Pages/NextPage/index";
import { module as NormalPartListNextPage } from "@/Modules/Pages/NextPage/partList";
import { module as LiveDanmuTime } from "@/Modules/Live/DanmuTime/liveDanmuTime";
import { module as LiveIndexPause } from "@/Modules/Live/IndexPause/liveIndexPause";
import { module as LiveIndexCount } from "@/Modules/Live/IndexCount/liveIndexCount";
import { module as NextRecommend } from "@/Modules/VideoPlayer/NextRecommend/watchNextRecommend";
import { module as Timeline } from "./VideoPlayer/Timeline/timeline";
import { module as PlayerScreenMode } from "./VideoPlayer/PlayerScreenMode/playerMode";
import { module as VideoQualitySelect } from "./VideoPlayer/QualitySelect/qualitySelect";
import { module as CustomVideoPlayRate } from "./VideoPlayer/CustomRate/customPlayRate";
import { module as PerFrameStep } from "./VideoPlayer/PerFrameStep/frameStepForward";
import { module as DanmakuSearch } from "./VideoPlayer/DanmakuSearch/danmakuSearch";
import { module as URLParam } from "./UrlParam/urlParam";
import { module as ArticlePicDrag } from "./Article/picDrag";

export const features: Record<string, ModuleStd.manifest> = {
    NavGlass, UserId, Banana, FlexProgressbar, RightNavBar, AbPlay, MediaSession, BgTabSleep, PictureInPicture, LiveMediaSession, CommentIterator, IndexNextPage, NormalPartListNextPage, LiveDanmuTime, LiveIndexPause, LiveIndexCount, NextRecommend, Timeline, PlayerScreenMode, VideoQualitySelect, CustomVideoPlayRate, PerFrameStep, DanmakuSearch, URLParam, ArticlePicDrag
}