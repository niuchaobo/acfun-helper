import { ModuleStd } from "@/Declare/FeatureModule";
import { module as navGlass } from "@/Modules/Theming/IndexTheming/navGlass"
import { module as userId } from "@/Modules/Auth/userId"
import { module as banana } from "@/Modules/Banana/banana"
import { module as flexProgressbar } from "@/Modules/VideoPlayer/FlexProgressBar/flexProgressbar"
import { module as rightNavBar } from "@/Modules/Pages/IndexRightMenu/rightNavBar"
import { module as abPlay } from "@/Modules/VideoPlayer/ABPlay/abPlay"
import { module as mediaSession } from "@/Modules/VideoPlayer/MedisSession/videoMediaSession"
import { module as bgTabSleep } from "@/Modules/VideoPlayer/BgTabSleep/bgTabSleep";
import { module as pictureInPicture } from "@/Modules/VideoPlayer/PicInPic";
import { module as liveMediaSession } from "@/Modules/Live/LiveMediaSession/liveMediaSession";
import { module as commentIterator } from "@/Modules/Comment/iterator";
import { module as indexNextPage } from "@/Modules/Pages/NextPage/index";
import { module as normalPartListNextPage } from "@/Modules/Pages/NextPage/partList";
import { module as liveDanmuTime } from "@/Modules/Live/DanmuTime/liveDanmuTime";
import { module as liveIndexPause } from "@/Modules/Live/IndexPause/liveIndexPause";
import { module as liveIndexCount } from "@/Modules/Live/IndexCount/liveIndexCount";
import { module as nextRecommend } from "@/Modules/VideoPlayer/NextRecommend/watchNextRecommend";
import { module as timeline } from "./VideoPlayer/Timeline/timeline";
import { module as playerScreenMode } from "./VideoPlayer/PlayerScreenMode/playerMode";

export const features: Record<string, ModuleStd.manifest> = {
    navGlass, userId, banana, flexProgressbar, rightNavBar, abPlay, mediaSession, bgTabSleep, pictureInPicture, liveMediaSession, commentIterator, indexNextPage, normalPartListNextPage, liveDanmuTime, liveIndexPause, liveIndexCount, nextRecommend, timeline, playerScreenMode
}