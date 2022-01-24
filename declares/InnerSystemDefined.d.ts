declare namespace InnerDefined {
  interface MediaSessoinVideoInfo {
    title: string;
    channel: {
      parentName: string;
      name: string;
    };
    user: {
      name: string;
    };
    coverUrl: string;
    videoList: [HTMLElement];
  }
  interface REGStruct {
    /** @description 主站 */
    index: RegExp;
    /** @description 视频 */
    video: RegExp;
    /** @description 单播放器页 */
    player: RegExp;
    /** @description 番剧 */
    bangumi: RegExp;
    /** @description 视频与番剧*/
    videoAndBangumi: RegExp;
    /** @description 文章 */
    article: RegExp;
    /** @description 带NCID的页面 */
    msg_comment: RegExp;
    /** @description 移动版直播页 */
    mlive: RegExp;
    /** @description 直播 */
    live: RegExp;
    /** @description 直播站主页 */
    liveIndex: RegExp;
    /** @description 个人页面 */
    userHome: RegExp;
    /** @description 个人中心 */
    userCenter: {
      following: RegExp;
    };
    /** @description 文章区主页 */
    partIndex: RegExp;
    /** @description 文章区详细 */
    articleDetail: RegExp;
    /** @description ACVID */
    acVid: RegExp;
    /** @description ACAID */
    acAid: RegExp;
    /** @description ACBGID */
    acBangumid: RegExp;
    /** @description 直播间页面 */
    liveRoomID: RegExp;
    /** @description 视频源URL */
    videoPlayerSrc: RegExp;
    videoPartNumByURL: RegExp;
    /** @description 网页端话题圈 */
    topicCircle: RegExp;
    /** @description 网页端动态内容 */
    momentContent: RegExp;
    /**@description 实用工具 */
    method: {
      [methodName: string]: () => any;
    };
  }
  namespace CommentAreaIterator {
    interface Registry {
      _sys: string[];
      [callbackName: string]: Function;
    }
    interface MenuRegistry {
      _sys: string[];
      [callbackName: string]: { callback: function; displayName: string };
    }
  }
}
declare namespace OptionStruct {
  interface DefaultStruct {
    enabled: boolean;
    permission: boolean;
    auto_throw: boolean;
    LikeHeart: boolean;
    LikeHeartClass: "0" | "1" | "2";
    LikeHeartNotif: boolean;
    to_attention: boolean;
    to_attention_num: number;
    to_special_items: [];
    broadcastingUIDlistFollowing: {};
    MarkedComment: {
      setting: {
        enabled: boolean;
        storeLocation: string;
        storePlugin: [
          "ExtensionStore",
          "IndexedDB",
          "Nextcloud",
          "UserdefinedServer"
        ];
      };
      datasets: {};
    };
    WatchPlanList: [];
    PictureInPictureModeUI: boolean;
    activeTabKey: string;
    extendsName: "AcFun助手";
    upUrlTemplate: string;
    userInfo: string;
    banana_notice: boolean;
    watchLater: boolean;
    fetchPushList_daemonsw: boolean;
    timer4Unread_daemonsw: boolean;
    krnl_videossEarly: boolean;
    krnl_globalTimer: boolean;
    custom_css: boolean;
    custom_css_style: string;
    logSetting: { consoleOutput: boolean; logLevel: number };
    mark: boolean;
    UserMarks: {};
    UserFilter: {};
    scan: boolean;
    upHighlight: boolean;
    filter: boolean;
    beautify_nav: boolean;
    beautify_personal: boolean;
    show_like: boolean;
    custom_rate: boolean;
    custom_rate_keyCode: number[];
    custom_easy_jump_keyCode: string[];
    player_mode: string;
    liveplayer_mode: string;
    liveFloowNotif: boolean;
    liveFollowOpenNow: boolean;
    videoQualityStrategy: "0" | "1" | "2" | "3" | "4";
    livePlayerEnhc: boolean;
    autoJumpLastWatchSw: boolean;
    hideAd: boolean;
    userPageTimeline: boolean;
    liveHideAd: boolean;
    liveHideAdType: 1 | 2;
    liveBansw: boolean;
    playerRecommendHide: boolean;
    PlayerDamakuSearchSw: boolean;
    userBatchManage: boolean;
    PlayerTimeCommentEasyJump: boolean;
    PlaybackRateKeysw: boolean;
    FilmModeExclusionsw: boolean;
    endedAutoExitFullscreensw: boolean;
    endedAutoToCommentArea: boolean;
    easySearchScanForPlayerTimesw: boolean;
    Dev_indexBlurSW: boolean;
    userHomeMoment: boolean;
    Upgradeable: 0;
    ABPlaysw: boolean;
    ProgressBarsw: boolean;
    ProgressBarStyle: {
      barColor: string;
      barHeight: string;
      loadedOpen: string;
      loadedColor: string;
      loadedHeight: string;
    };
    danmuSearchListToUsersw: boolean;
    endedAutoJumpRecommandFirstDougasw: boolean;
    autOpenVideoDescsw: boolean;
    followLiveNotif: boolean;
    liveCommentTimeTag: boolean;
    LiveUserFocus: boolean;
    LiveWatchTimeRec_popup: boolean;
    multiPartListSpread: boolean;
    audioGain: boolean;
    uddPopUp: boolean;
    uddPopUptype: 0;
    articleReadMode: boolean;
    articleBanana: boolean;
    audioAfterBanana: boolean;
    picDrag: boolean;
    picRotate: boolean;
    commentPageEasyTrans: boolean;
    liveMediaSession: boolean;
    videoMediaSession: boolean;
    videoAchievement: boolean;
    userCenterBeautify: boolean;
    pageTransKeyBind: boolean;
    quickCommentSubmit: boolean;
    widenUCVideoList: boolean;
    Dev_thinScrollbar: boolean;
    liveIndexRankNum: boolean;
    timelineDots: boolean;
    hideDanmakuOperator: { defaultMode: boolean; UI: boolean; maskSw: boolean };
    sleepPause: { defaultMode: boolean; UI: boolean };
    notificationContent: {
      commentNotif: boolean;
      likeNotif: boolean;
      giftNotif: boolean;
    };
    frameStepSetting: { enabled: boolean; controlUI: boolean };
    liveVolumeMild: boolean;
    wheelToChangeVolume: boolean;
    simpleCC: boolean;
  }
}
