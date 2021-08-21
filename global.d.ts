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
    tabId?: number | Array | undefined;
    classicalParmParse?: boolean;
    withCallback?: boolean;
    callbackId?: number | string;
  };
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
  createMode: "append"|"after"|"headAppend";
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
interface MessageExtendEvents extends WindowEventMap {
  AcFunHelperFrontend: string;
  AcFunHelperDataDivEvent: string;
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
