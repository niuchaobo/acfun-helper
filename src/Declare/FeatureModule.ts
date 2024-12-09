export namespace ModuleStd {
  export enum ModType {
    //mixed feature implement and style
    Hybrid = "Hybrid",
    //just some code
    FucntionCode = "FunctionCode",
    //style text to inject or uninject
    Styling = "Styling",
  }
  export enum WorkSpace {
    Frontend = "Fg",
    Background = "Bg"
  }
  export enum SequentialType {
    Loaded = 1,
    OnDOMContentLoaded,
    OnHeaderLoaded,
    OnAcVideoPlayerLoaded,
    OnAcLivePlayerLoaded,
    OnAcPaginationLoaded,
    OnDamakuLoaded,
    OnModuleAllLoaded,

    OnContextMenuReg,
    OnOmniboxObjectReg,
    onScheduleTaskReg,

    OnPageKeyShotcutReg,
  }
  export type ModApiTrigger = string
  export interface modApi {
    triggers: Array<ModApiTrigger>
    add: (...e: any) => any;
    remove: (...e: any) => any
  }
  export interface lordManifest {
    name: string;
    requiredSequentialType: SequentialType;
    main: (...args: any) => any;
  }
  export interface manifest {
    name: string;
    type: ModType;
    sequentialType?: SequentialType;
    workSpace: WorkSpace;
    dataset?: {};
    main: (...args: any) => any;
    exit?: (...args: any) => any;
    enable?: (...args: any) => any;
    disable?: (...args: any) => any;
    init?: (...args: any) => any;
    isEnabled?: (...args: any) => any;
    runtimeMsgTrigger?: Record<string, (...args: any) => Promise<any> | undefined | void>;
    eventTrigger?: (...args: any) => any;
  }
  export interface optManifest {
    modName: string,
    name: string,
    description: string,
    // location:
    main: (...args: any) => any;
  }
}
