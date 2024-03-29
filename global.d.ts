declare global { }
namespace MessageSwitchStructs {
  interface CommonPayload {
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
       * @description 是否存在并携带了回调函数
       */
      withCallback?: boolean;
      /**
       * @description 回调函数在回调暂存字典中的Id
       */
      callbackId?: number | string;
      unsafe?: boolean;
    };
    /**
     * @description 参数
     */
    params: object | { target: string; params: object };
  }
  interface DedicatedLinkPayload extends CommonPayload {
    /**
     * @description PortName
     */
    source: string;
  }
  interface DedicatedLinkResponse {
    eventId: number;
    source: string;
    target: string;
    status: boolean;
    result: object;
  }
  interface FgToInjectPayload extends CommonPayload { }
  interface WindowMsgPayload extends FgToInjectPayload { }
  interface WindowMsgRespnse extends Event {
    data: WindowMsgRespnseInner;
  }
  interface WindowMsgRespnseInner {
    to: string | "background" | "sandbox";
    data: WindowMsgPayload;
  }
  interface SandBoxPayload extends WindowMsgRespnseInner { }
}
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
interface XHRDriverFilterRule {
  name: String;
  jsonParse?: boolean;
  bound: "pre" | "post";
  condition: {
    /**
     * 目标键 或者 调用函数的名称
     */
    target: string;
    requestMode?: "is" | "not" | "requestRPC";
    /**
     * 目标值
     */
    request?: string;
  };
  action: { type: "deny" | "requestRPC" | "injectedApi" | "modify" };
}
interface XHRDriverRuleParam {
  type: "deny" | "requestRPC" | "modify" | "injectApi";
  rule: XHRDriverFilterRule;
  urlExp: string;
}
interface XHRDriverRegistry {
  _sys: {
    typesCount: {
      deny: number;
      requestRPC: number;
      injectedApi: number;
      modify: number;
    };
    boundCount: {
      pre: number;
      post: number;
    };
    registerdEvents: {
      deny: string[];
      requestRPC: string[];
      injectedApi: string[];
      modify: string[];
    };
  };
  /**
   * 主键就是URLRegExp
   */
  [prorName: string]: XHRDriverFilterRule;
}
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
interface runtimeData {
  modules: [];
  devMode: {
    [regString: string]: Function;
  };
  options: OptionStruct.DefaultStruct | null;
  dataset: {
    core: {
      browserType: string;
      status: {
        core: boolean;
        sandbox: boolean;
        messageSwitch: boolean;
        scheduler: boolean;
        notificationButtunTrigger: boolean;
      };
      scheduler: {
        [taskGroupName: string]: {
          option: chrome.alarms.AlarmCreateInfo;
          tasks: {
            [taskName: string]: {
              callback: Function;
            };
          };
        };
      };
    };
    notificationBtnTriggerList: string[];
    notificationBtnTriggerData: {
      [regString: string]: Function;
    };
    contextMenuRegistry: {
      menuItem: {
        [itemName: string]: chrome.contextMenus.CreateProperties;
      };
      event: {
        [itemName: string]: function;
      };
    };
    modulesData: {};
  };
}
interface runtimeDataFg {
  modules: string[];
  devMode: boolean;
  options: OptionStruct.DefaultStruct;
  href: null;
  dataset: {
    core: {
      browserType: "Opera" | "FF" | "Chrome" | "Safari" | "IE";
      status: {
        core: boolean;
        messageSwitch: boolean;
        videoInjects: boolean;
        liveInject: boolean;
        xhrProxy: boolean;
        authInfo: boolean;
        videoSetting: boolean;
        danmaku: boolean;
        banana: boolean;
        comments: boolean;
        danmakuSearch: boolean;
        download: boolean;
        live: boolean;
        livePageBeautify: boolean;
        luckyTurntab: boolean;
        pageBeautify: boolean;
        readMore: boolean;
        urlparams: boolean;
        videoPageBeautify: boolean;
        helperFgPop: boolean;
        block: boolean;
      };
    };
    notes: {
      vid: number;
      dougaId: string;
    };
    dougaInfo: APIs.DougaInfo;
    articleInfo: APIs.ArticleInfo;
    sessionUUID: string;
  };
  deferQueue: {};
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
