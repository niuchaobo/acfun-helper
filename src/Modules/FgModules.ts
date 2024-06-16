import { ModuleStd } from "@/Declare/FeatureModule";
import { module as navGlass } from "@/Modules/Theming/IndexTheming/navGlass"
import { module as userId } from "@/Modules/Auth/userId"
import { module as banana } from "@/Modules/Banana/banana"
import { module as flexProgressbar } from "@/Modules/VideoPlayer/FlexProgressBar/flexProgressbar"
import { module as rightNavBar } from "@/Modules/Pages/IndexRightMenu/rightNavBar"
import { module as abPlay } from "@/Modules/VideoPlayer/ABPlay/abPlay"
import { module as mediaSession } from "@/Modules/VideoPlayer/MedisSession/videoMediaSession"
import { module as bgTabSleep } from "./VideoPlayer/BgTabSleep/bgTabSleep";
import { module as pictureInPicture } from "./VideoPlayer/PicInPic";
import { module as liveMediaSession } from "./Live/LiveMediaSession/liveMediaSession";
import { module as commentIterator } from "./Comment/iterator";
import { module as initNetPage } from "./Pages/NextPage/init";
import { module as indexNextPage } from "./Pages/NextPage/index";
import { module as normalPartListNextPage } from "./Pages/NextPage/partList";

export const features: Record<string, ModuleStd.manifest> = {
    navGlass, userId, banana, flexProgressbar, rightNavBar, abPlay, mediaSession, bgTabSleep, pictureInPicture, liveMediaSession, commentIterator, initNetPage, indexNextPage, normalPartListNextPage,
}