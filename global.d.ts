declare global {}
interface Window {
  AcFunHelperBackend: AcFunHelperBackend;
  AcFunHelperFrontend: AcFunHelperFrontend;
  A: {
    Cookie: {
      getCookie: (e: document.cookie, t: string) => string;
      hasCookie: (e: document.cookie, t: string) => boolean;
      setCookie: () => boolean;
      deleteCookie: () => boolean;
    };
    Day: {
      getReadableTime: (e: Date) => string;
      strftime: (e: string) => string;
    };
    Event: {
      emit: (e: string) => void;
      on: () => void;
      off: () => void;
      once: () => void;
    };
    Widget: {};
    ready: {};
  };
  Base64: {
    VERSION: string;
    atob: (e: string) => string;
    btoa: (e: string) => string;
    atou: (e: string) => string;
    utob: (e: string) => string;
    encode: (e: string) => string;
    decode: (e: string) => string;
    encodeURI: (e: string) => string;
    extendString: (e: string) => string;
    fromBase64: (e: string) => string;
    fromUint8Array: (e: string) => string;
    noConflict: (e: string) => string;
    toBase64: (e: string) => string;
    toUint8Array: (e: string) => string;
  };
  CATEGORY_INFO_MAP: {
    bangumi: {
      bangumiId: string;
      danmakuSelector: string;
      globalDataKey: string;
      key: string;
      resourceId: string;
      resourceType: string;
      resourceTypeCode: string;
      type: number;
    };
    v: {
      bangumiId: string;
      danmakuSelector: string;
      globalDataKey: string;
      key: string;
      resourceId: string;
      resourceType: string;
      resourceTypeCode: string;
      type: number;
    };
  };
  globalConfig: {
    asyncPlayerPlugins: string;
    imsdkcdn: string;
    oldPath: string;
    safetyId: string;
  };
  lastSourceId: string;
  lastVid: string;
  likeDomain: string;
  orideclare: HTMLElement;
  pageInfo: AcFunPageInfo;
  chrome: ChromeFront;
  globalConfig: globalConfigInterf;
  player: {
    $container: HTMLElement;
    $extendContainer: HTMLElement;
    $innerPlugins: HTMLElement;
    $outerPlugins: HTMLElement;
    $plugins: [
      {
        key: string;
        extend: {
          events: object;
          history: object;
          methods: object;
          properties: object;
        };
        beta: boolean;
      }
    ];
    $video: HTMLVideoElement;
    $wrapper: HTMLElement;
    acId: string;
    albumId: string;
    beForcedMuted: boolean;
    currentSrc: {
      adaptationSet: [
        {
          id: number;
          duration: number;
          representation: [
            {
              id: number;
              url: string;
              avgBitrate: number;
              backupUrl: string;
              codecs: string;
              comment: string;
              frameRate: number;
              hdrType: number;
              height: number;
              m3u8Slice: string;
              maxBitRate: number;
              quality: number;
              qualityLabel: string;
              qualityType: string;
              width: number;
            }
          ];
        }
      ];
      businessType: number;
      hideAuto: boolean;
      manualDefaultSelect: boolean;
      mediaType: number;
      stereoType: number;
      version: string;
      videoId: string;
    };
    currentTime: number;
    duration: number;
    eventsNameMap: {};
    extend: {};
    firstQuality: string;
    firstQualityType: number;
    getUrlByVid: () => string;
    hasPlayed: boolean;
    history: {
      flush: () => boolean;
      __KEY__: string;
      _history: {
        autoplay: boolean;
        currentFilterName: string;
        danmaku_allowOverlap: boolean;
        danmaku_alpha: number;
        danmaku_area: number;
        danmaku_blocked: {
          top: boolean;
          bottom: boolean;
          move: boolean;
          color: boolean;
          role: boolean;
        };
        danmaku_color: number;
        danmaku_enabled: boolean;
        danmaku_filtered: { filters: Array; enable: boolean };
        danmaku_fontScale: number;
        danmaku_merged: boolean;
        danmaku_mode: string;
        danmaku_size: number;
        danmaku_speedScale: number;
        firstQualityType: string;
        isDanmakuGFirstGuideShow: boolean;
        isDanmakuGFirstNoticeShow: boolean;
        joysoundSwitch: boolean;
        loop: boolean;
        muted: boolean;
        playContinue: boolean;
        sound_effects_enable: boolean;
        sound_effects_eqbands: number;
        sound_effects_gain: number;
        sound_effects_preset: string;
        subtitle_protected: boolean;
        volume: number;
        vpp_enabled: boolean;
      };
    };
    isLive: boolean;
    isLiveUI: boolean;
    joysoundSwitch: boolean;
    mkey: string;
    retryMax: number;
    retryNum: number;
    startBitrateNoLimit: Boolean;
    startFromSec: number;
    status: string;
    version: string;
    vid: string;
    playHistory: {
      delete: () => void;
      get: () => void;
      set: () => void;
    };
    reload: () => void;
    qualityConfig: {};
  };
}
interface AcFunPageInfo {
  currentVideoId: string;
  isLike: string;
  pctr: string;
  commentCountRealValue: string;
  groupId: {
    id: number;
    name: string;
    parentId: string;
    parentName: string;
  };
  bananaCountShow: string;
  stowCountShow: string;
  giftPeachCountShow: string;
  stowCount: number;
  channel: string;
  description: string;
  likeCount: number;
  title: string;
  shareCountShow: string;
  hasHotComment: string;
  isDislike: boolean;
  result: string;
  shareCount: number;
  picShareUrl: string;
  danmakuCount: number;
  videoList: Array;
  isThrowBanana: boolean;
  viewCount: number;
  bananaCount: number;
  currentVideoInfo: {
    danmakuCount: number;
    danmakuCountShow: string;
    danmakuGuidePosition: number;
    durationMillis: number;
    fileName: string;
    id: string;
    isKsManifest: string;
    ksPlayJson: string;
    playDomainInfo: Array;
    priority: number;
    sizeType: number;
    sourceStatus: number;
    title: string;
    transcodeInfos: Array;
    uploadTime: number;
    visibleType: number;
  };
  coverCdnUrls: Array;
  likeCountShow: string;
  giftPeachCount: number;
  viewCountShow: string;
  dougaId: string;
  isRewardSupportted: boolean;
  commentCountShow: string;
  durationMillis: number;
  commentCountTenThousandShow: string;
  coverImgInfo: string;
  "host-name": string;
  commentCount: number;
  coverUrl: string;
  tagList: Array;
  disableEdit: boolean;
  danmakuCountShow: string;
  createTimeMillis: number;
  createTime: string;
  superUbb: boolean;
  shareUrl: string;
  user: PersonalUserInfo;
  status: string;
  isFavorite: boolean;
  mkey: string;
  priority: string;
}
interface PersonalUserInfo {
  action: number;
  href: string;
  gender: 0 | 1 | 2;
  avatarImage: string;
  userHeadImgInfo: {};
  isFollowed: string;
  headCdnUrls: Array;
  isJoinUpCollege: string;
  followingCountValue: number;
  contributeCountValue: number;
  sexTrend: 0 | 1 | 2;
  isFollowing: boolean;
  contributeCount: string;
  followingStatus: string;
  fanCount: number;
  headUrl: Array;
  fanCountValue: string;
  verifiedText: string;
  nameColor: number;
  verifiedTypes: Array;
  avatarFrame: string;
  avatarFrameMobileImg: string;
  avatarFramePcImg: string;
  followingCount: string;
  name: string;
  signature: string;
  id: string;
  nameStyle: string;
}
interface MessageSwitchCommonPayload {
  target: string | { mod: string; methodName: string };
  source?: string | FgToInjectPayload;
  InvkSetting: {
    /**
     * @description 消息类型
     * @field function ->调用模块下的函数
     * @field printMsg ->在对端打印target的消息
     * @field subMod ->请求调用模块下的子模块
     * @field method ->调用消息处理机中的某个工具方法
     * @field echo ->回声...回声..回声.
     */
    type: "function" | "printMsg" | "subMod" | "method" | "echo";
    /**
     * @description 告知前台标签信息
     */
    receipt?: boolean;
    responseRequire?: boolean;
    /**
     * @description 异步封装
     */
    asyncWarp?: boolean;
    /**
     * @description 后台向前台通信需要指定tabId
     */
    tabId?: number | Array | undefined;
    /**
     * @description 经典的参数分解方式
     * @example const {url,method,postData} = params;
     */
    classicalParmParse?: boolean;
    /**
     * @description 是否存在并携带了回调函数
     */
    withCallback?: boolean;
    /**
     * @description 回调函数在回调暂存字典中的Id
     */
    callbackId?: number | string;
  };
  /**
   * @description 参数
   */
  params: object | Array;
}
interface MessageSwitchDedicatedLinkPayload extends MessageSwitchCommonPayload {
  /**
   * @description PortName
   */
  source: string;
}
interface MessageSwitchDedicatedLinkResponse {
  eventId: number;
  source: string;
  target: string;
  status: boolean;
  result: object;
}
interface MessageSwitchFgToInjectPayload extends MessageSwitchCommonPayload {}
interface MessageSwitchWindowMsgPayload
  extends MessageSwitchFgToInjectPayload {}
interface MessageSwitchInjectRecievePayload extends Event {
  detail: MessageSwitchDedicatedLinkPayload;
}
interface MessageSwitchWindowMsgRespnse extends Event {
  data: MessageSwitchWindowMsgRespnseInner;
}
interface MessageSwitchWindowMsgRespnseInner {
  to: string | "background" | "sandbox";
  msg: MessageSwitchWindowMsgPayload;
}
interface MessageSwitchSandBoxPayload
  extends MessageSwitchWindowMsgRespnseInner {}
interface addElementPayload {
  tag: string;
  id: string;
  css: string;
  target: document.body | Document;
  classes: string;
  createMode: "append" | "after" | "headAppend";
  thisHTML: string;
}
interface FgToInjectPayload {
  tabId: number;
  subModName: string;
  parentWindowUrl: string;
}
interface MessageSender {
  frameId: number;
  id: string;
  origin: string;
  tab: TabsInfo;
  url: string;
}
interface TabsInfo {
  active: boolean;
  audible: boolean;
  autoDiscardable: boolean;
  discarded: boolean;
  favIconUrl: string;
  groupId: number;
  height: number;
  highlighted: boolean;
  id: number;
  incognito: boolean;
  index: number;
  mutedInfo: { muted: boolean };
  pinned: boolean;
  selected: boolean;
  status: "complete" | "loading";
  title: string;
  url: string;
  width: number;
  windowId: number;
}
const ExtensionStorageArea: "sync" | "local" | "managed";
interface MessageExtendEvents extends WindowEventMap {
  AcFunHelperFrontend: string;
  AcFunHelperDataDivEvent: string;
  DOMAttrModified: string;
  DOMAttributeNameChanged: string;
  DOMCharacterDataModified: string;
  DOMElementNameChanged: string;
  DOMNodeInserted: string;
  DOMNodeInsertedIntoDocument: string;
  DOMNodeRemoved: string;
  DOMNodeRemovedFromDocument: string;
  DOMSubtreeModified: string;
}
interface Window
  extends EventTarget,
    AnimationFrameProvider,
    GlobalEventHandlers,
    WindowEventHandlers,
    WindowLocalStorage,
    WindowOrWorkerGlobalScope,
    WindowSessionStorage {
  addEventListener<K extends keyof MessageExtendEvents>(
    type: K,
    listener: (this: Window, ev: WindowEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof MessageExtendEvents>(
    type: K,
    listener: (this: Window, ev: WindowEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
}
interface Element
  extends Node,
    Animatable,
    ChildNode,
    InnerHTML,
    NonDocumentTypeChildNode,
    ParentNode,
    Slottable {
  addEventListener<K extends keyof MessageExtendEvents>(
    type: K,
    listener: (this: Window, ev: WindowEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
}
