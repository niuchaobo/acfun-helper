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
  interface KsPlayJson {
    businessType: number;
    hideAuto: boolean;
    manualDefaultSelect: boolean;
    mediaType: number;
    stereoType: number;
    version: string;
    videoId: string;
    adaptationSet: [
      {
        duration: number;
        id: number;
        representation: [
          {
            codecs: string;
            comment: string;
            frameRate: number;
            hdrType: number;
            height: number;
            id: number;
            m3u8Slice: string;
            maxBitrate: number;
            quality: number;
            qualityLabel: string;
            qualityType: string;
            url: string;
            width: number;
            backupUrl: string[];
            avgBitrate: number;
          }
        ];
      }
    ];
  }
  namespace ContributionInfo {
    interface StaffInfos {
      result: string;
      staffInfos: Staff[];
      upInfo: UpInfo;
    }
    interface Staff extends UpInfo {
      staffRoleName: string;
    }
  }
  interface Sidelights {
    bananaCount: number;
    bananaCountShow: string;
    caption: string;
    commentCount: string;
    commentCountTenThousandShow: string;
    contentId: string;
    contributeTime: string;
    coverImgInfo: UserInfoImg;
    coverUrls: string;
    displayPlayCount: string;
    groupId: string;
    isLike: boolean;
    isThrowBanana: boolean;
    likeCount: number;
    sourceId: string;
    stowCount: string;
    type: number;
    user: Personal.UserInfo;
    videoId: string;
    videoSizeType: number;
    viewCount: string;
    vindex: number;
  }
  interface BangumiPageInfo {
    acfunOnly: boolean;
    allowComment: boolean;
    allowDownload: boolean;
    bananaCount: number;
    bananaCountShow: string;
    bangumiBananaCount: number;
    bangumiBananaCountShow: string;
    bangumiCoverImageH: string;
    bangumiCoverImageV: string;
    bangumiId: number;
    bangumiIntro: string;
    bangumiIsLike: boolean;
    bangumiLikeCount: number;
    bangumiLikeCountShow: string;
    bangumiPaymentType: { value: number; name: string };
    bangumiStyleList: [
      {
        categoryEntryId: number;
        createTime: number;
        id: number;
        name: string;
        priority: number;
        status: string;
      }
    ];
    bangumiTitle: string;
    belongType: number;
    commentCount: number;
    commentCountShow: string;
    commentParted: boolean;
    coverImgHInfo: UserInfoImg;
    coverImgVInfo: UserInfoImg;
    currentVideoInfo: null;
    episodeName: string;
    extendsStatus: string;
    firstPlayDate: number;
    highlightId: undefined;
    hotTags: [];
    image: string;
    imgInfo: UserInfoImg;
    introduction: string;
    isFavorite: boolean;
    isLike: boolean;
    isThrowBanana: boolean;
    itemCount: number;
    itemId: number;
    lastUpdateItemName: string;
    latestItem: string;
    mkey: string;
    needPay: boolean;
    online: number;
    onlineTime: number;
    paidForUser: boolean;
    paymentType: { value: number; name: string };
    playCount: number;
    playCountShow: string;
    priority: number;
    recommendBangumis: [RecommendBangumis];
    relatedBangumis: [
      { groupId: string; id: number; name: string; sort: number }
    ];
    shareUrl: string;
    showTitle: string;
    sidelights: [Sidelights];
    stowCount: number;
    stowCountShow: string;
    title: string;
    updateDayTime: number;
    updateDayTimeStr: string;
    updateFrequency: string;
    updateInfoShow: string;
    updateStatus: number;
    updateTime: string;
    updateWeekDay: number;
    videoId: number;
    videoSizeType: number;
    webUpdateInfoShow: string;
  }
  interface RecommendBangumis {
    coverImageH: string;
    coverImageV: string;
    coverImgHInfo: UserInfoImg;
    coverImgVInfo: UserInfoImg;
    groupId: string;
    id: number;
    itemCount: number;
    lastUpdateItemName: string;
    paymentType: { value: number; name: string };
    stowCount: number;
    stowCountShow: string;
    title: string;
    updateStatus: number;
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
      userName: string;
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
    interface Api {
      info: UserInfo;
      result: number;
    }
  }
  interface UserInfoImgCdns {
    freeTrafficCdn: boolean;
    url: string;
  }
  interface UserInfoImg {
    height: number;
    size: number;
    thumbnailImage: UserInfoImgCdns[];
    type: number;
    width: number;
  }
  interface UserInfoApi {
    enableUpdateSpaceImage: boolean;
    profile: UserInfo;
    result: number;
  }
  interface UserInfo {
    avatarFrameMobileImg: string;
    avatarFramePcImg: string;
    avatarImage: string;
    comeFrom: string;
    contentCount: string;
    followed: string;
    following: string;
    followingStatus: number;
    gender: number;
    headUrl: string;
    isContractUp: boolean;
    isFollowed: boolean;
    isFollowing: boolean;
    lastLoginTime: boolean;
    likeCount: number;
    likeCountShow: string;
    name: string;
    registerTime: number;
    shareUrl: string;
    signature: string;
    spaceImage: UserInfoImg;
    userHeadImgInfo: UserInfoImg;
    spaceImgInfo: UserInfoImg;
    userId: number;
    avatarFrameImgInfo: UserInfoImg;
    verifiedText: string;
    verifiedType: number;
    verifiedTypes: number[];
  }
  interface UpInfo {
    comeFrom: string;
    contributeCount: number;
    contributeCountShow: string;
    fanCount: number;
    fanCountShow: string;
    followingCount: number;
    followingCountShow: string;
    followingStatus: number;
    gender: number;
    groupId: number;
    groupName: string;
    isFollowed: boolean;
    isFollowing: boolean;
    /**
     * 对方是否关注了你
     */
    isFriend: boolean;
    isSignedUpCollege: boolean;
    nameColor: number;
    sexTrend: number;
    signature: string;
    userHeadImgInfo: UserInfoImg;
    id: string;
    userImg: string;
    userName: string;
    verifiedText: string;
    verifiedType: number;
    verifiedTypes: number[];
  }
  interface FollowsGet {
    friendList: UpInfo[];
    pcursor: string;
    result: number;
    totalCount: number;
  }
  interface FollowFeeds {
    feedList: [
      {
        aid: number;
        allowDanmaku: boolean;
        author: string;
        avatar: string;
        channelId: number;
        cid: number;
        comments: number;
        contentClass: string;
        danmakuSize: number;
        description: string;
        errorlog: string;
        goldBanana: number;
        isArticle: boolean;
        isSignedUpCollege: boolean;
        releaseDate: number;
        score: number;
        shareUrl: string;
        sign: string;
        stows: number;
        success: boolean;
        tags: string;
        time: number;
        title: string;
        titleImg: string;
        url: string;
        userId: number;
        userImg: string;
        username: string;
        verifiedText: string;
        verifiedType: number;
        verifiedTypes: number[];
        vid: number;
        views: number;
      }
    ];
    pageNum: number;
    pageSize: number;
    result: number;
    totalCount: number;
    totalPage: number;
    ups: string[];
    upsPos: number;
  }
  /**
   * @url https://live.acfun.cn/api/channel/list?count=56&pcursor=&filters=[%7B%22filterType%22:3,+%22filterId%22:0%7D]
   */
  interface LiveChannelList {
    channelData: object;
    channelFilters: {
      liveChannelDisplayFilters: [
        {
          displayFilters: [
            {
              filterType: number;
              name: string;
              filterId: number;
            }
          ];
        }
      ];
    };
    channelListData: {
      count: number;
      liveList: LiveUserInfo[];
      totalCount: number;
    };
    liveList: LiveUserInfo[];
    recommendAuthorsData: Array;
    totalCount: number;
  }
  /**
   * @url https://live.acfun.cn/api/live/info?authorId=378269
   */
  interface LiveUserInfoOuter {
    visitor: number;
    authorId: number;
    requestId: string;
    user: LiveUserInfo;
  }
  interface LiveUserInfo {
    action: number;
    authorId: number;
    bizCustomData: string;
    cdnAuthBiz: number;
    coverUrls: string[];
    createTime: number;
    disableDanmakuShow: boolean;
    formatLikeCount: string;
    formatOnlineCount: string;
    groupId: string;
    hasFansClub: boolean;
    href: string;
    likeCount: number;
    liveId: string;
    onlineCount: number;
    paidShowUserBuyStatus: boolean;
    panoramic: boolean;
    portrait: boolean;
    requestId: string;
    streamName: string;
    title: string;
  }
  /**
   * https://api.kuaishouzt.com/rest/zt/live/web/watchingList
   */
  interface LiveWatchingList {
    data: [
      {
        anonymousUser: number;
        avatar: [
          {
            cdn: string;
            freeTraffic: string;
            url: string;
            urlPattern: string;
          }
        ];
        customWatchingListData: string;
        displaySendAmount: string;
        managerType: number;
        nickname: string;
        userId: number;
      }
    ];
  }
  /**
   * @url https://member.acfun.cn/common/api/getUnreadMess
   */
  interface UnreadApi {
    activieTaskRedPoint: number;
    feedBackRedPoint: number;
    newbieTaskIsNewDevice: number;
    redirectFollowFeed: number;
    result: number;
    token: string;
    unReadCount: {
      new_comment: number;
      new_content_notify: number;
      new_comment_like: number;
      new_gift: number;
      new_system_notify: number;
    };
    unReadFollowFeedCount: number;
  }
  /**
   * @url https://www.acfun.cn/rest/pc-direct/homePage/searchDefault
   */
  interface SearchDefault {
    result: number;
    searchDefaultInfo: {
      id: number;
      text: string;
      url: string;
    };
    searchKeywords: [
      {
        isHot: boolean;
        keyword: string;
        rank: number;
      }
    ];
    tendencyKeywords: [
      {
        isHot: boolean;
        keyword: string;
        rank: number;
      }
    ];
  }
  namespace Comments {
    interface Item {
      avatarFrame: number;
      avatarFrameImgInfo: {
        width: number;
        height: number;
        size: number;
        type: number;
        thumbnailImage: {
          cdnUrls: [
            {
              freeTrafficCdn: boolean;
              freeTrafficProductAbbreviation: string;
              url: string;
            }
          ];
        };
      };
      avatarImage: string;
      commentId: number;
      content: string;
      deviceModel: string;
      floor: number;
      headUrl: [
        {
          cdn: string;
          url: string;
          urlPattern: string;
        }
      ];
      imageInfo: {
        height: number;
        size: number;
        type: number;
        width: number;
        cdnUrls: [
          {
            freeTrafficCdn: boolean;
            url: null;
          }
        ];
      };
      imageUrl: string;
      isLiked: boolean;
      isSameCity: boolean;
      isSignedUpCollege: boolean;
      isSticky: boolean;
      isUp: boolean;
      likeCount: number;
      likeCountFormat: string;
      nameColor: number;
      nameRed: number;
      postDate: string;
      replyTo: number;
      replyToUserName: string;
      selfComment: boolean;
      shareCount: number;
      shareCountFormat: string;
      sourceId: number;
      sourceType: number;
      subCommentCount: number;
      subCommentCountFormat: string;
      timestamp: number;
      totalPage: number;
      userHeadImgInfo: {
        width: number;
        height: number;
        size: number;
        type: number;
        thumbnailImage: {
          cdnUrls: [
            {
              freeTrafficCdn: boolean;
              freeTrafficProductAbbreviation: string;
              url: string;
            }
          ];
        };
      };
      userId: number;
      userName: string;
      verified: number;
      verifiedText: string;
      verifiedType: number;
      verifiedTypes: number[];
    }
    interface Api {
      commentCount: number;
      contentUbbVersion: string;
      curPage: number;
      godComments: Item[];
      hotComments: Item[];
      isUp: boolean;
      pageSize: number;
      pcursor: string;
      result: number;
      sourceType: number;
      stickyComments: CommentApi[];
      subCommentsMap: {};
      totalPage: number;
      rootComments: Item[];
    }
  }
  namespace Articles {
    interface Part {
      cursor: string;
      data: Feed[];
      result: number;
    }
    interface Feed {
      createTime: number;
      description: string;
      formatCommentCount: string;
      formatViewCount: string;
      isOriginal: boolean;
      realmId: number;
      realmName: string;
      title: string;
      userId: number;
      userName: string;
      articleId: number;
      commentCount: number;
      coverImgInfo: {
        height: number;
        thumbnailImage: [
          {
            freeTrafficCdn: boolean;
            freeTrafficProductAbbreviation: string;
            url: string;
          }
        ];
        size: number;
        type: number;
        width: number;
      };
    }
  }
  interface StaffGet {
    result: number;
    staffInfos: Personal.UserInfo[];
    upInfo: Personal.UserInfo;
  }
  namespace Danmakus {
    interface BlockItem {
      blockWords: string;
      blockWordsType: number;
      createTime: number;
    }
    interface BlockApi {
      result: number;
      textType: BlockItem[];
      userIdType: BlockItem[];
    }
    interface Item {
      body: string;
      color: number;
      createTime: number;
      danmakuAvatarUrl: string;
      danmakuId: number;
      danmakuImgUrl: string;
      danmakuStyle: number;
      danmakuType: number;
      isLike: boolean;
      likeCount: number;
      mode: number;
      position: number;
      rank: number;
      roleId: number;
      size: number;
      userId: number;
    }
    /**
     * @url https://www.acfun.cn/rest/pc-direct/new-danmaku/pollByPosition
     */
    interface PollDamakuByPosition {
      addCount: number;
      fetchTime: number;
      danmakus: Item[];
      onlineCount: number;
      positionFromInclude: number;
      positionToExclude: number;
      result: number;
      styleDanmakuCount: number;
      totalCount: number;
      totalCountShow: string;
    }
  }
  interface HotSpotsApi {
    hotSpotDistribution: [
      {
        hotSpot: number;
        timeAxis: number;
      }
    ];
    result: number;
  }
  namespace Favorite {
    interface FolderInfo {
      cover: string;
      favoriteCountLimit: number;
      folderId: number;
      inFolder: false;
      lastFavoriteTime: number;
      name: string;
      resourceCount: number;
      status: number;
      type: number;
    }
    interface FullBangumi {
      acfunOnly: boolean;
      albumId: string;
      allowComment: boolean;
      allowDownload: boolean;
      area: number;
      areaShow: string;
      bangumiBananaCount: number;
      bangumiBananaCountShow: string;
      bangumiStyleList: [];
      caption: string;
      commentCount: number;
      commentCountShow: string;
      commentParted: boolean;
      coverImageH: string;
      coverImageV: string;
      coverImgHInfo: APIs.UserInfoImg;
      coverImgVInfo: APIs.UserInfoImg;
      coverUrls: [string];
      description: string;
      favoriteBangumiShowPlayStatusContent: string;
      firstPlayDate: number;
      groupId: string;
      id: number;
      intro: string;
      isFavorite: boolean;
      isLike: boolean;
      isOver: boolean;
      itemCount: number;
      lastUpdateItemName: string;
      lastUpdateItemTimeStr: string;
      lastUpdateTime: string;
      lastVideoDescription: string;
      lastVideoId: number;
      lastVideoName: string;
      likeCount: number;
      online: number;
      onlineTime: number;
      paymentType: { value: number; name: string };
      playCount: number;
      playCountShow: string;
      playedVideoDurationMillis: number;
      price: number;
      recoReason: string;
      requestId: null;
      resourceTypeNumber: number;
      shareCount: number;
      shareCountShow: string;
      shareUrl: string;
      showCommentCount: string;
      showPlayCount: string;
      showSerialStatus: string;
      showStowCount: string;
      stowCount: number;
      stowCountShow: string;
      title: string;
      updateDayOfWeek: number;
      updateDayTime: number;
      updateDayTimeStr: string;
      updateInfoShow: string;
      updateStatus: number;
      updateWeekDay: number;
      userPlayedEpisodeName: string;
      userPlayedSeconds: number;
      userPlayedVideoId: string;
      verticalCoverUrls: [string];
      webUpdateInfoShow: string;
    }
    interface BangumiItem {
      bangumiDesc: string;
      bangumiId: number;
      bangumiSerialStatus: number;
      bangumiTitle: string;
      coverImage: string;
      coverImgInfo: UserInfoImg;
      groupId: string;
      itemCount: number;
      lastBangumiItemEpisodeName: string;
      lastUpdateItemName: string;
      lastUpdateTime: number;
      requestId: string;
      status: number;
      stows: number;
      updateStatus: number;
      updateTime: number;
      userPlayedSeconds: number;
      views: number;
    }
    interface AandVItem {
      channelInfo: {
        channelId: number;
        channelName: string;
      };
      comments: number;
      contentCreateTime: number;
      contentDesc: string;
      contentId: number;
      contentImg: string;
      contentTitle: string;
      groupId: string;
      isLike: boolean;
      like: boolean;
      likeCount: number;
      likeCountShow: string;
      requestId: string;
      status: number;
      stows: number;
      updateTime: number;
      userId: number;
      userImg: string;
      userName: string;
      userPlayedSeconds: number;
      views: number;
    }
    interface Api {
      page: number;
      perpage: number;
      result: number;
      total: number;
      favoriteList: AandVItem[];
    }
    interface Album {
      albumDesc: string;
      albumId: number;
      albumTitle: string;
      coverImage: string;
      groupId: string;
      lastUpdateTime: number;
      requestId: string;
      status: number;
      stows: number;
      updateTime: number;
      userId: number;
      userImage: string;
      userName: string;
      views: number;
    }
  }
  interface ArubamuApi {
    contents: ArubamuI;
    page: number;
    pageCount: number;
    size: number;
    totalSize: number;
  }
  interface ArubamuItem {
    groupId: string;
    duration: number;
    sort: number;
    id: number;
    createTime: number;
    videoList: DougaInfo[]
    resourceType: string;
    resourceTypeValue: number;
    title: string;
    coverImage: string;
    updateTime: number;
    uperName: string;
    commentCount: number;
    resourceId: null;
    viewsCount: number;
  }
  namespace BananaShop {
    interface StoreItem {
      amount: number;
      coolDownDay: number;
      description: string;
      expireTime: number;
      imageAppUrl: null;
      imagePCUrl: null;
      imageUrl: string;
      levelLimit: number;
      maxAllowBuy: number;
      priceInfo: [
        {
          count: number;
          payType: number;
          payTypeInfo: string;
        }
      ];
      productId: number;
      sales: number;
      status: number;
      title: string;
      type: number;
    }
    interface Api {
      list: StoreItem[];
      nextPage: string;
      total: number;
    }
    interface BoughtRealApi {
      orders: BoughtRealItem[];
      total: number;
    }
    interface BoughtVApi {
      items: BoughtVitem[];
      nextPage: string;
      total: number;
    }
    interface BoughtVitem {
      count: number;
      description: string;
      id: number;
      image: string;
      name: string;
      status: number;
      usageType: number;
    }
    interface BoughtRealItem {
      buyTime: number;
      count: number;
      id: string;
      image: string;
      name: string;
      payAmount: string;
      payType: number;
      productId: number;
      productType: number;
      state: string;
    }
  }
  namespace Album {
    interface List {
      albumDesc: string;
      albumId: number;
      albumTitle: string;
      coverImage: string;
      groupId: string;
      lastUpdateTime: number;
      requestId: string;
      status: number;
      stows: number;
      updateTime: number;
      userId: number;
      userImage: string;
      userName: string;
      views: number;
    }
  }
}
