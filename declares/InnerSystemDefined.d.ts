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
  namespace CommentAreaIterator{
    interface Registry {
      _sys:string[];
      [callbackName: string]: Function;
    }
    interface MenuRegistry {
      _sys:string[];
      [callbackName: string]: {callback:function,displayName:string};
    }
  }
}
