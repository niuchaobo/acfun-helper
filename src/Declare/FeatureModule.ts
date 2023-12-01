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
    Backgroumd = "Bg"
  }
  export enum SequentialType{
    Loaded = 1,
    OnDOMContentLoaded,
    OnHeaderLoaded,
    OnAcVideoPlayerLoaded,
    OnAcLivePlayerLoaded,
    OnAcPaginationLoaded,
    OnDamakuLoaded,
  }
  export interface manifest {
    name: string;
    type: ModType;
    sequentialType?:SequentialType;
    workSpace: WorkSpace;
    dataset?: {};
    main: () => any;
    exit?: () => any;
    enable?:()=>any;
    disable?:()=>any;
  }
}
