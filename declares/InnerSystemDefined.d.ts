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
}
