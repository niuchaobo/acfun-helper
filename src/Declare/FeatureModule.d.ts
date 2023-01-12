export namespace ModuleStd {
  export enum ModType {
    //mixed feature implement and style
    Hybrid = "Hybrid",
    //just some code
    FucntionCode = "FunctionCode",
    //style text to inject or uninject
    Styling = "Styling",
  }
  export interface manifest {
    name: string;
    type: ModType;
  }
}
