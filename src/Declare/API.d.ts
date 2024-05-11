declare namespace APIs {
  interface ChannelInfo {
    id: number
    name: string
    parentId: number
    parentName: string
  }
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
    channel: ChannelInfo;
    description: string;
    likeCount: number;
    title: string;
    shareCountShow: string;
    hasHotComment: string;
    isDislike: boolean;
    /**@description bangumi only */
    showTitle: string;
    /**@description bangumi only */
    image: string;
    /**@description bangumi only */
    episodeName: string;
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
  namespace Personal {
    interface UserInfoBasic {
      avatarFrame: number;
      blog: string;
      comeFrom: string;
      experimentConfig: string;
      firstDepositState: number;
      gender: number;
      headUrl: string;
      isRegular: boolean;
      isSameCityTagAllowShown: boolean;
      nameColor: number;
      nameRed: number;
      qq: string;
      registerTime: number;
      sexTrend: -1 | 0 | 1 | 2;
      signature: string;
      userId: number;
      name: string;
      verifiedText: string;
      verifiedTypes: number[];
    }
    interface UserInfo extends UserInfoBasic {
      activeRecently: boolean;
      avatarFrameImgInfo: UserInfoImg;
      avatarFrameMobileImg: string;
      avatarFramePcImg: string;
      avatarImage: string;
      banana: number;
      contentCount: string;
      email: string;
      followed: string;
      followedNum: number;
      following: string;
      goldBanana: number;
      isContractUp: boolean;
      isEmailCheck: boolean;
      isMobileCheck: boolean;
      isTeenagerMode: boolean;
      level: number;
      mediaWearInfo: MedalInfo;
      membershipModuleDesc: string;
      membershipModuleImgUrl: string;
      membershipState: number;
      mobile: string;
      renameCard: number;
      shareUrl: string;
      signature: string;
      tagStowCount: string;
      taskModuleDesc: string;
      userHeadImgInfo: UserInfoImg;
      verifiedType: number;
    }
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
