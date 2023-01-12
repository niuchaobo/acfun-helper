declare namespace APIs {
  interface DougaInfo {
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
    videoList: [
      {
        danmakuCount: number;
        danmakuCountShow: string;
        danmakuGuidePosition: number;
        durationMillis: number;
        fileName: string;
        id: string;
        priority: number;
        sizeType: number;
        sourceStatus: number;
        title: string;
        uploadTime: number;
        visibleType: number;
      }
    ];
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
      transcodeInfos: [
        {
          hdr: boolean;
          qualityType: string;
          sizeInBytes: number;
        }
      ];
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
    tagList: [
      {
        id: string;
        name: string;
      }
    ];
    disableEdit: boolean;
    danmakuCountShow: string;
    createTimeMillis: number;
    createTime: string;
    superUbb: boolean;
    shareUrl: string;
    user: Personal.UserInfo;
    status: string;
    isFavorite: boolean;
    mkey: string;
    priority: string;
  }
  interface ArticleInfo {
    articleId: string;
    isLike: string;
    commentCount: string;
    stowCount: number;
    channel: {
      id: number;
      name: string;
      parentId: number;
      parentName: string;
    };
    coverUrl: string;
    coverCdnUrls: Array;
    createTimestring;
    createTimeMillis: number;
    danmakuCount: number;
    descriptionstring;
    formatBananaCount: string;
    formatCommentCount: string;
    formatDanmakuCount: string;
    formatShareCount: string;
    formatStowCount: string;
    formatViewCount: string;
    hasHotComment: boolean;
    isFavorite: boolean;
    isLike: boolean;
    isThrowBanana: boolean;
    likeCount: number;
    likeCountShowstring;
    commentCount: number;
    result: number;
    shareCount: number;
    shareUrlstring;
    stowCount: number;
    superUbb: boolean;
    titlestring;
    viewCount: number;
    tagList: [{ name: string; id: number }];
    realm: {
      realmId: number;
      realmName: string;
    };
    parts: [{ title: string; content: string }];
  }
  namespace Medel {
    interface MedalInfo {
      clubName: string;
      level: number;
      uperHeadUrl: string;
      uperId: number;
      uperName: string;
    }
    interface MedalDetail {
      clubName: string;
      currentDegreeLimit: number;
      friendshipDegree: number;
      joinClubTime: number;
      level: number;
      uperHeadUrl: string;
      uperId: number;
      uperName: string;
      wearMedal: boolean;
    }
    interface MedalDegreeLimit {
      bananaDegree: number;
      bananaDegreeLimit: number;
      giftDegree: number;
      giftDegreeLimit: number;
      liveWatchDegree: number;
      liveWatchDegreeLimit: number;
      peachDegree: number;
      peachDegreeLimit: number;
      uperId: number;
    }
    interface LiveMedalApi {
      clubName: string;
      liveGiftConfig: {
        afterDiscountGiftCount: number;
        beforeDiscountGiftCount: number;
        liveGiftId: number;
      };
      medal: MedalDegreeLimit;
      medalDegreeLimit: MedalDegreeLimit;
      medalList: MedalDetail[];
      rankList: string;
      status: number;
    }
  }
}
