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
  pageInfo: APIs.AcFunPageInfo;
  chrome: ChromeFront;
  intro: {
    $followBtn: JQuerySerializeArrayElement;
    $introduction: JQuerySerializeArrayElement;
    $options: object;
    children: Array;
    closeAllDesc: () => void;
    data: undefined;
    el: HTMLElement;
    follow: () => void;
    handleResize: () => void;
    id: string;
    init: () => void;
    intro_desc: JQuerySerializeArrayElement;
    intro_text: JQuerySerializeArrayElement;
    reward: () => void;
    showAllDesc: () => void;
    staffInfos: Array;
    toggleShow: () => void;
    upInfo:APIs.PersonalUserInfo
  };
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
