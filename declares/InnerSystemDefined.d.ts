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
    videoList: HTMLElement[];
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
    to_special_items: [
      { bananaNum: string; name: string; uid: string; up_url: string }
    ];
    broadcastingUIDlistFollowing: { [number]: boolean };
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
    WatchPlanList: string[];
    PictureInPictureModeUI: boolean;
    activeTabKey: string;
    extendsName: "AcFun助手";
    upUrlTemplate: string;
    userInfo: string;
    banana_notice: boolean;
    watchLater: boolean;
    CommentFilter: Map<number, string>;
    commentFilterSw: boolean;
    fetchPushList_daemonsw: boolean;
    timer4Unread_daemonsw: boolean;
    krnl_videossEarly: boolean;
    krnl_globalTimer: boolean;
    custom_css: boolean;
    custom_css_style: string;
    logSetting: { consoleOutput: boolean; logLevel: number };
    mark: boolean;
    UserMarks: {
      [uid: number]: {
        name: string;
        tag: string;
        desc?: string;
        commentId?: number;
        evidence?: string;
        refer?: string;
      };
    };
    UserFilter: { [uid: number]: { name: string } };
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
    liveHideAdType: "0" | "1";
    liveHideAdMute: boolean;
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
    userTagRender: boolean;
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
      atNotif: boolean;
    };
    frameStepSetting: { enabled: boolean; controlUI: boolean };
    liveVolumeMild: boolean;
    wheelToChangeVolume: boolean;
    simpleCC: boolean;
  }
}

declare namespace SizzwooApis {
  interface LiveRoomInfo {
    avatarImage: string;
    coverUrl: string;
    duration: number;
    endTime: string;
    fansUp: number;
    headUrl: string;
    likeCount: number;
    liveId: string;
    maxOnlineCount: number;
    name: string;
    onlineCount: number;
    roomId: number;
    startTime: string;
    title: string;
    uid: number;
  }
  interface LiveRecord {
    coverUrl: string;
    danmuCount: number;
    danmuUsers: number;
    duration: number;
    endTime: string;
    fansUp: number;
    incomes: number;
    likeCount: number;
    liveId: string;
    liveState: number;
    maxOnlineCount: number;
    name: string;
    onlineCount: number;
    premiumGte5Users: number;
    premiumUsers: number;
    startTime: string;
    title: string;
    uid: number;
  }
  interface LiveCountData {
    uid: string;
    roomId: number;
    name: string;
    headUrl: string;
    avatarImage: string;
    incomes: number;
    premiumUsers: number;
    premiumGtenumberUsers: number;
    danmuUsers: number;
    danmuCount: number;
    duration: number;
    maxOnlineCount: number;
  }
  interface UserDetail {
    code: number;
    data: {
      avatarImage: string;
      clubCount: number;
      clubCountUp: number;
      clubName: string;
      contributeCount: number;
      dateTime: string;
      fansCount: number;
      fansCountUp: number;
      fansCountUpHour: number;
      hasFansClub: number;
      headUrl: string;
      lastLiveTime: string;
      likeCount: number;
      liveState: number;
      maxOnlineCount: number;
      name: string;
      onlineCount: number;
      signature: string;
      uid: number;
      verifiedText: string;
    };
    message: string;
  }
  interface Analysis {
    code: number;
    data: {
      endDateTime: string;
      startDateTime: string;
      type: number;
      data: {
        userCount: LiveCountData;
        maxIncomesLive: LiveRecord;
        maxFansUpLive: LiveRecord;
        maxDurationLive: LiveRecord;
        maxDanmuLive: LiveRecord;
        fansCountUp: number;
        fansCount: number;
        clubCountUp: number;
        clubCount: number;
        count: LiveCountData;
      };
    };
    message: string;
  }
  interface Info {
    code: number;
    data: {
      danmuCount: number;
      danmuUsers: number;
      fansUp: number;
      incomes: number;
      likeCount: number;
      maxOnlineCount: number;
      nowTime: string;
      onlineCount: number;
      premiumGte5Users: number;
      premiumUsers: number;
      startTime: string;
      title: string;
    };
    message: string;
  }
  interface WorldCloud {
    code: number;
    data: {
      day: Array<{ name: string; value: number }>;
      hour: Array<{ name: string; value: number }>;
      week: Array<{ name: string; value: number }>;
    };
    message: string;
  }
  interface RichMen {
    code: number;
    data: {
      data: Array<{
        avatarImage: string;
        count: number;
        countUp: number;
        details: null;
        detailsSize: number;
        headUrl: string;
        medalCount: number;
        name: string;
        rank: number;
        rankUp: number;
        uid: number;
      }>;
      endDateTime: string;
      startDateTime: string;
    };
    message: string;
  }
  interface Gift {
    code: number;
    data: {
      day: Array<{
        giftId: number;
        giftName: string;
        giftPrice: number;
        url: string;
      }>;
    };
    message: string;
  }
  interface Rank {
    code: number;
    data: {
      data: Array<{
        avatarImage: string;
        count: number;
        countUp: number;
        details: null;
        detailsSize: number;
        headUrl: string;
        medalCount: number;
        name: string;
        rank: number;
        rankUp: number;
        uid: number;
      }>;
      endDateTime: string;
      startDateTime: string;
    };
    message: string;
  }
}
