const videoQualitiesRefer =
{
    "2160p120HDR": { "definition": "4K", "disableAutoSwitch": true, "limitType": 1, "qualityLabel": "2160P120 HDR", "qualityType": "2160p120HDR", "width": 3840, "height": 2160 },
    "2160p120": { "limitType": 1, "disableAutoSwitch": true, "qualityType": "2160p120", "qualityLabel": "2160P120", "definition": "4K", "width": 3840, "height": 2160 },
    "2160p60HDR": { "limitType": 1, "disableAutoSwitch": true, "qualityType": "2160p60HDR", "qualityLabel": "2160P60 HDR", "definition": "4K", "width": 3840, "height": 2160 },
    "2160p60": { "limitType": 1, "disableAutoSwitch": true, "qualityType": "2160p60", "qualityLabel": "2160P60", "definition": "4K", "width": 3840, "height": 2160 },
    "2160pHDR": { "limitType": 1, "disableAutoSwitch": true, "qualityType": "2160pHDR", "qualityLabel": "2160P HDR", "definition": "4K", "width": 3840, "height": 2160 },
    "2160p": { "limitType": 1, "disableAutoSwitch": true, "qualityType": "2160p", "qualityLabel": "2160P", "definition": "4K", "width": 3840, "height": 2160 },
    "1080p60HDR": { "limitType": 1, "qualityType": "1080p60HDR", "qualityLabel": "1080P60 HDR", "definition": "HD", "width": 1920, "height": 1080 },
    "1080p60": { "limitType": 1, "qualityType": "1080p60", "qualityLabel": "1080P60", "definition": "HD", "width": 1920, "height": 1080 },
    "1080p+": { "limitType": 1, "qualityType": "1080p+", "qualityLabel": "1080P+", "definition": "HD", "width": 1920, "height": 1080 },
    "1080pHDR": { "limitType": 1, "qualityType": "1080pHDR", "qualityLabel": "1080P HDR", "definition": "HD", "width": 1920, "height": 1080 },
    "1080p": { "limitType": 1, "qualityType": "1080p", "qualityLabel": "1080P", "definition": "HD", "width": 1920, "height": 1080 },
    "720p60": { "limitType": 1, "qualityType": "720p60", "qualityLabel": "720P60", "width": 1280, "height": 720 },
    "720p": { "defaultSelect": true, "qualityType": "720p", "qualityLabel": "720P", "width": 1280, "height": 720 },
    "540p": { "qualityType": "540p", "qualityLabel": "540P", "width": 960, "height": 540 },
    "480p": { "qualityType": "480p", "qualityLabel": "480P", "width": 720, "height": 480 },
    "360p": { "qualityType": "360p", "qualityLabel": "360P", "width": 640, "height": 360 },
}

/**
 * 每一千秒所播放的帧数
 * @refer @伯翎飞云[2021年4月8日21:31:47]："电影23.976;60帧如果是NTSC的话是59.94;感知不强方向错了"
 */
const standardFrameRate = {
    "24": 23976,
    "25": 25000,
    "30": 29970,
    "60": 59940,
    "120": 120000
}

const acfunApis = {
    /**
     * @method POST 
     * @example kpn=ACFUN_APP&kpf=PC_WEB&subBiz=mainApp&interactType=1&objectType=2&objectId=30637780&acfun.midground.api_st=xxxxxxx&extParams%5BisPlaying%5D=false&extParams%5BshowCount%5D=3&extParams%5BotherBtnClickedCount%5D=20&extParams%5BplayBtnClickedCount%5D=0
     */
    like: `https://kuaishouzt.com/rest/zt/interact/add`,
    unlike: `https://kuaishouzt.com/rest/zt/interact/delete`,
    extensionIconImg: `https://i.loli.net/2020/05/28/2k8dPLiGEZNHjny.png`,
    personalBasicInfo: {
        url: `https://www.acfun.cn/rest/pc-direct/user/personalBasicInfo`,
        /**@returns {{"info":APIs.Personal.UserInfoBasic}} */
        get: async () => {
            return JSON.parse(await fetchResult(acfunApis.personalBasicInfo.url))
        }
    },
    gifts: "https://www.acfun.cn/rest/pc-direct/pay/deposit/products",
    contributes: `https://member.acfun.cn/list/api/queryContributeList`,
    index: {
        /**
         * @description 搜索推荐
         * @method GET
         */
        searchDefault: `https://www.acfun.cn/rest/pc-direct/homePage/searchDefault`,
        /**
         * 
         * @method POST
         * @example sid=acfun.midground.api
         */
        tokenGet: "https://id.app.acfun.cn/rest/web/token/get",
        /**
         * @description 表情列表
         * @method POST
         * @data kpn=ACFUN_APP
         */
        emotionList: "https://zt.gifshow.com/rest/zt/emoticon/package/list?kpn=ACFUN_APP",
        comment: {
            /**
             * @Example:?sourceId=30637780&sourceType=3&page=1&pivotCommentId=0&newPivotCommentId=&t=1628913287304&supportZtEmot=true 
             * sourceId ->acid
             * */
            comment: `https://www.acfun.cn/rest/pc-direct/comment/list`,
            /**
             * @example ?sourceId=30637780&sourceType=3&page=1&pivotCommentId=0&newPivotCommentId=0&t=1628913415510&supportZtEmot=true
             */
            floorComment: `https://www.acfun.cn/rest/pc-direct/comment/listByFloor`,
        },
        fansClud: {
            enabled: `https://member.acfun.cn/common/api/showFansClubApplyEntrance`,
            /**@returns {boolean} */
            isEnabled: async () => {
                return JSON.parse(await fetchResult(acfunApis.index.fansClud.enabled, "POST", ""))["enableFansClub"];
            }
        },
        bindKs: {
            bound: `https://id.app.acfun.cn/rest/web/central/ksaccount/status`,
            /**@returns {boolean} */
            isBound: async () => {
                return JSON.parse(await fetchResult(acfunApis.index.bindKs.bindKs, "POST", ""))["result"] == 1;
            }
        },
        naviList: {
            url: `https://member.acfun.cn/common/api/getNavList`,
            get: async () => {
                return JSON.parse(await fetchResult(acfunApis.index.naviList.url, "POST", ""))
            }
        },
        channelRank: `https://www.acfun.cn/rest/pc-direct/rank/channel`,
        /**
         * 排行榜
         * @param {"THREE_DAYS"|"DAY"|"WEEK"} rankPeriod 
         * @param {number} rankLimit 
         * @param {number} channelId 主区CID 可以通过 ```acfunApis.navigateCategory```查看
         * @param {number} subChannelId 
         * @returns 
         */
        getRank: async (rankPeriod = "DAY", rankLimit = 30, channelId, subChannelId) => {
            return JSON.parse(await fetchResult(acfunApis.index.channelRank + `channelId=${channelId ? channelId : ""}&subChannelId=${subChannelId ? subChannelId : ""}&rankLimit=${rankLimit}&rankPeriod=${rankPeriod}`));
        },
        /**@description 稿件推送 */
        webPush: `https://www.acfun.cn/rest/pc-direct/feed/webPush?count=50&pcursor=0`,
    },
    video: {
        videoInfo: `https://mini.pocketword.cn/api/acfun/dougaInfo?acid=`,
        videos: {
            status: {
                all: 0,
                /**通过 */
                passed: 1,
                /**待发布 */
                toBeRelease: 2,
                /**退回 */
                retreat: 3,
            },
            sortMethods: `https://member.acfun.cn/list/api/getSortList`,
            getSortMethods: async () => {
                return JSON.parse(await fetchResult(acfunApis.video.videos.sortMethods, "POST", ""))
            },
            /**@description 有跨域问题，尽量在Backend用 */
            getVideos: async (uid, pcursor = 0, sortType = 3, keyword, count, status) => {
                if (!uid) {
                    return;
                }
                return JSON.parse(await fetchResult(acfunApis.contributes, "POST", `pcursor=${pcursor}&resourceType=2&sortType=${sortType}&authorId=${uid}${status ? "&status=" + status : ""}${count ? "&count=" + count : ""}${keyword ? "&keyword=" + keyword : ""}`))
            },
            /**@description 有跨域问题，尽量在Backend用 */
            getArticles: async (uid, pcursor = 0, sortType = 3, keyword, count, status) => {
                if (!uid) {
                    return;
                }
                return JSON.parse(await fetchResult(acfunApis.contributes, "POST", `pcursor=${pcursor}&resourceType=3&sortType=${sortType}&authorId=${uid}${status ? "&status=" + status : ""}${count ? "&count=" + count : ""}${keyword ? "&keyword=" + keyword : ""}`))
            },
            getMyVideos: async (pcursor = 0) => {
                const myUid = await acfunApis.ucenter.getUserId();
                const result = await acfunApis.video.videos.getVideos(myUid, pcursor);
                return result;
            },
            getMyArticles: async (pcursor = 0) => {
                const myUid = await acfunApis.ucenter.getUserId();
                const result = await acfunApis.video.videos.getArticles(myUid, pcursor);
                return result;
            },
            glance: `https://member.acfun.cn/interActive/api/getDougaList`,
            getDougaGlance: async () => {
                return JSON.parse(await fetchResult(acfunApis.video.videos.glance, "POST", ""));
            }
        },
        Staff: {
            /**
             * @description 合作稿件的Staff信息
             * @method POST
             * @example resourceId=21194424&resourceType=2 (resourceId 就是ACID)
             */
            get: `https://www.acfun.cn/rest/pc-direct/staff/getStaff`,
            /**@return {APIs.ContributionInfo.StaffInfos} */
            getStaffInfo: async (acid) => {
                return JSON.parse(await fetchResult(acfunApis.video.Staff.get, "POST", `resourceId=${acid}&resourceType=2`, true));
            }
        },
        /**
         * @description 发送弹幕 (videoId不是acid)
         * @example mode=1&color=16777215&size=25&body=%E5%A5%BD%E6%A3%92&videoId=25879552&position=701&type=douga&id=${ACID}&subChannelId=58&subChannelName=%E9%9F%B3%E4%B9%90&roleId=
         */
        danmuFire: "https://www.acfun.cn/rest/pc-direct/new-danmaku/add",
        /**
         * @description 阶段性弹幕查询
         * @method POST
         * @example resourceId=25879552&enableAdvanced=true&positionFromInclude=0&positionToExclude=22000
         */
        danmakuSegQuery: "https://www.acfun.cn/rest/pc-direct/new-danmaku/pollByPosition",
        /**
         * @description 相关视频
         * @method POST 
         * @example resourceType=2&resourceId=29898019&count=9
         */
        relatedVideos: `https://www.acfun.cn/rest/pc-direct/feed/related/general`,
        /**
         * @description 视频预览图
         * @method POST
         * @example videoId=21417176&resourceId=25268198&resourceType=2
         */
        videoPreviewVtt: `https://www.acfun.cn/rest/pc-direct/play/playInfo/spriteVtt`,
        /**@description 获取视频预览图 */
        getVideoPreviewVtt: async (vid, acid) => {
            return await fetchResult(acfunApis.video.videoPreviewVtt + `videoId=${vid}&resourceId=${acid}&resourceType=2`, "POST");
        },
        anchorPoint: `https://www.acfun.cn/rest/pc-direct/play/playInfo/anchorPoint`,
        getAnchroPoint: async (acid) => {
            return JSON.parse(await fetchResult(acfunApis.video.anchorPoint, "POST", `resourceId=${acid}&resourceType=2`));
        },
        /**
         * @description 检查弹幕角色列表
         * @param resourceId
         * @param type "video"|"douga"
         */
        danmakuRoleName: "https://www.acfun.cn/rest/pc-direct/new-danmaku/getDanmakuRoleNames?resourceId=${resourceId}6&type=${type}",
        /**
         * @description 弹幕热点
         * @example resourceId=25268198&resourceType=2
         */
        hotSpots: `https://www.acfun.cn/rest/pc-direct/play/playInfo/hotSpotDistribution`,
        /**
         * @description 是否允许高级弹幕
         * @example resourceUserId=16854159
         */
        allowAdvDanmu: `https://www.acfun.cn/rest/pc-direct/new-danmaku/isAllowUseAdvancedDanmaku`,
        /**
         * @description 获取屏蔽的弹幕设定
         * @method POST
         */
        blockDanmakuWords: "https://www.acfun.cn/rest/pc-direct/new-danmaku/blockWords/load",
    },
    article: {
        channels: `https://member.acfun.cn/common/api/getChannelList`,
        getChannels: async () => {
            return JSON.parse(await fetchResult(acfunApis.article.channels, "POST", `{"types":1}`));
        }
    },
    live: {
        liveInfo: `https://live.acfun.cn/api/live/info?authorId=`,
        liveReward: `https://m.acfun.cn/rest/apph5-direct/pay/reward/giveRecords?pcursor=`,
        list: `https://member.acfun.cn/common/api/getLiveList`,
        list_acfunDotcn: `https://www.acfun.cn/rest/pc-direct/live/followLiveUsers`,
        getLiveList: async () => {
            return JSON.parse(await fetchResult(acfunApis.live.list, "POST", ""));
        },
        getLiveList_acfunDotcn: async () => {
            return JSON.parse(await fetchResult(acfunApis.live.list_acfunDotcn, "POST", `{"headers":{"Content-Type":"application/x-www-form-urlencoded"}}`));
        },
        liveTypes: `https://member.acfun.cn/common/api/getLiveTypeList`,
        getLiveTypes: async () => {
            return JSON.parse(await fetchResult(acfunApis.like.liveTypes, "POST", ""));
        },
        /**@param streamId 直播间的流id */
        banned: `https://onvideoapi.kuaishou.com/api/live/checkLiveBanned?source=ac&streamId=`,
        /**@returns {{code:number,data:{banned:boolean}}} */
        getBanned: async (streamId) => {
            return JSON.parse(await fetchResult(acfunApis.live.banned + streamId));
        },
        cutInfo: `https://live.acfun.cn/rest/pc-direct/live/getLiveCutInfo?`,
        /**@returns {{liveCutStatus:0|1,liveCutUrl:string}} */
        getCutInfo: async (uid, liveId) => {
            return JSON.parse(await fetchResult(acfunApis.live.cutInfo + "authorId=" + uid + "&liveId=" + liveId, "GET", null, true));
        },
        getKsCutStreamId: async (uid, liveId) => {
            const raw = await acfunApis.live.getCutInfo(uid, liveId);
            if (!raw.liveCutStatus) {
                return;
            }
            let result;
            try {
                result = new RegExp("[0-9]+").test(raw.liveCutUrl)[0];
            } catch (error) { }
            return result;
        }
    },
    navigateCategory: {
        query: `https://www.acfun.cn/rest/pc-direct/page/queryNavigators`,
    },
    ucenter: {
        personalVideoList: `https://www.acfun.cn/u/{Uid}?quickViewId=ac-space-video-list&reqID=3&ajaxpipe=1&type=video&order=newest&page={pageNum}&pageSize=20`,
        getUserId: async () => {
            return (JSON.parse(await acfunApis.personalBasicInfo.get()))["info"]["userId"];
        },
        followList: {
            followFeedList: `https://member.acfun.cn/common/api/getFeedList`,
            getFollowFeedList: async () => {
                return JSON.parse(await fetchResult(acfunApis.ucenter.followList.followFeedList, "POST", ""));
            }
        },
        upsAcademy: `https://member.acfun.cn/academy/api/checkAcademy`,
        checkUpAcademy: async () => {
            return JSON.parse(await fetchResult(acfunApis.ucenter.upsAcademy, "POST", ""));
        }
    },
    users: {
        info: `https://www.acfun.cn/rest/pc-direct/user/userInfo`,
        /**@returns {APIs.UserInfoApi} */
        getUserInfo: async (uid) => {
            return JSON.parse(await fetchResult(acfunApis.users.info + "?userId=" + uid));
        },
        followings: `https://www.acfun.cn/rest/pc-direct/relation/getFollows`,
        /**@example page=1&count=20&action=8 */
        getFollowings: async (groupId = -1, page = 1, count = 20, action = 7) => {
            return JSON.parse(await fetchResult(acfunApis.users.followings, "POST", `groupId=${groupId}&page=${page}&count=${count}&action=${action}`));
        },
        fans: `https://www.acfun.cn/rest/pc-direct/relation/getFollows`,
        getFans: async (page = 1, count = 20, action = 8) => {
            return JSON.parse(await fetchResult(acfunApis.users.followings, "POST", `page=${page}&count=${count}&action=${action}`));
        },
        groups: `https://www.acfun.cn/rest/pc-direct/relation/getGroups`,
        /**@returns {{result:number,groupList:[{followingCount: number,followingCountShow: string,groupId: string,groupName: string}]}} */
        getGroups: async () => {
            return JSON.parse(await fetchResult(acfunApis.users.groups));
        },
        getGnameGidMap: async (reverse = false) => {
            let all = await acfunApis.users.getGroups();
            all = all["groupList"];
            return Object.fromEntries(all.map(e => {
                return reverse ? [
                    e.groupId, e.groupName
                ] : [
                    e.groupName, e.groupId
                ]
            }))
        },
        followAction: `https://www.acfun.cn/rest/pc-direct/relation/follow`,
        specialFollow: async (uid, mode = true) => {
            return JSON.parse(await fetchResult(acfunApis.users.followAction, "POST", `toUserId=${uid}&action=${mode ? 14 : 15}`));
        },
        /**@description 关注/取关 mode:1/2 @returns {{result:number}}*/
        follow: async (uid, mode = true, ref = "https://www.acfun.cn/member/feeds/following") => {
            return JSON.parse(await fetchResult(acfunApis.users.followAction, "POST", `toUserId=${uid}&action=${mode ? 1 : 2}`, true, "same-origin", "default", "same-origin", ref));
        },
        locateUserToGroup: async (uid, groupId, mode = true, ref = "https://www.acfun.cn/member/feeds/following") => {
            //groupId = 0 时是直接移入“未分组”
            return JSON.parse(await fetchResult(acfunApis.users.followAction, "POST", `toUserId=${uid}&groupId=${mode ? groupId : 0}&action=3`, true, "same-origin", "default", "same-origin", ref));
        },
        groupManage: `https://www.acfun.cn/rest/pc-direct/relation/group`,
        addGroup: async (name) => {
            return JSON.parse(await fetchResult(acfunApis.users.groupManage, "POST", `action=4&groupName=${name}`));
        },
        renameGroup: async (gid, name) => {
            return JSON.parse(await fetchResult(acfunApis.users.groupManage, "POST", `action=6&groupId=${gid}&groupName=${name}`));
        },
        deleteGroup: async (gid) => {
            return JSON.parse(await fetchResult(acfunApis.users.groupManage, "POST", `action=5&groupId=${gid}`));
        },
        /**
         * @description 打赏列表、稿件礼物列表
         * @method POST
         * @data resourceId=${ACID}&resourceType=2 
         */
        rewardInfo: "https://www.acfun.cn/rest/pc-direct/pay/reward/resource/cardInfo?resourceId=${ACID}&resourceType=2",
        /**
         * @description Ac币余额
         * @method POST
         */
        coinBalance: "https://www.acfun.cn/rest/pc-direct/pay/wallet/acoinBalance",
        /**@returns {{result:number,data:{firstDepositState:number,aCoinAmount:number}}} */
        getCoinBalance: async () => {
            return JSON.parse(await fetchResult(acfunApis.users.coinBalance));
        },
        verifiedType: {
            types: {
                1: ["AcFun管理员认证", "monkey-verified"],
                2: ["官方认证", "official-verified"],
                3: ["AVI联盟", "avi-verified"],
                4: ["高弹达人标识", "advanced-danmaku-verified"],
                5: ["阿普学院", "up-college-verified"],
            },
            /**
             * @param {number} id ['AcFun管理员认证', '官方认证', 'AVI联盟', '高弹达人标识', '阿普学院']
             * @returns {string}
             */
            getQueryClassName: (id) => {
                return "." + acfunApis.users.verifiedType.types[id][1] + "-large.verified-icon-large";
            }
        },
        favorites: {
            video: {
                list: `https://www.acfun.cn/rest/pc-direct/favorite/resource/dougaList`,
                get: async (folderId, page = 1, perpage = 30) => {
                    return JSON.parse(await fetchResult(acfunApis.users.favorites.video.list, "POST", `folderId=${folderId}&page=${page}&perpage=${perpage}`))
                },
                remove: `https://www.acfun.cn/rest/pc-direct/favorite/resource/remove`,
                removeVideo: async (acid, folderId) => {
                    return JSON.parse(await fetchResult(acfunApis.users.favorites.video.remove, "POST", "resourceType=9&resourceId=" + acid + "&delFolderIds=" + folderId))
                },
                add: `https://www.acfun.cn/rest/pc-direct/favorite/resource/add`,
                addVideo: async (acid, folderId) => {
                    return JSON.parse(await fetchResult(acfunApis.users.favorites.video.add, "POST", `resourceId=${acid}&resourceType=9&addFolderIds=${folderId}`))
                }
            },
            folder: {
                add: `https://www.acfun.cn/rest/pc-direct/favorite/folder/add`,
                /**@returns {{result:number,data:APIs.Favorite.FolderInfo}} */
                addFavoriteFolder: async (name) => {
                    return JSON.parse(await fetchResult(acfunApis.users.favorites.folder.add, "POST", "name=" + name))
                },
                info: `https://www.acfun.cn/rest/pc-direct/favorite/folder/info`,
                /**@returns {{result:number,data:APIs.Favorite.FolderInfo}} */
                getInfo: async (folderId) => {
                    return JSON.parse(await fetchResult(acfunApis.users.favorites.folder.info, "POST", "folderId=" + folderId))
                },
                list: `https://www.acfun.cn/rest/pc-direct/favorite/folder/list`,
                /**@returns {{result:number,data:[APIs.Favorite.FolderInfo]}} */
                getList: async () => {
                    return JSON.parse(await fetchResult(acfunApis.users.favorites.folder.list, "POST", ""))
                },
                update: `https://www.acfun.cn/rest/pc-direct/favorite/folder/update`,
                /**@returns {{result:number}} */
                updateName: async (folderId, newName) => {
                    return JSON.parse(await fetchResult(acfunApis.users.favorites.folder.update, "POST", "folderId=" + folderId + "&name=" + newName))
                },
                remove: `https://www.acfun.cn/rest/pc-direct/favorite/folder/delete`,
                /**@returns {{result:number}} */
                removeFolder: async (folderId) => {
                    return JSON.parse(await fetchResult(acfunApis.users.favorites.folder.list, "POST", "folderId=" + folderId))
                }
            },
        },
        album: {
            list: `https://www.acfun.cn/rest/pc-direct/favorite/albumList`,
            /**@returns {{result:number,favoriteList:[APIs.Album.List]}} */
            getList: async (page = 1, perpage = 20) => {
                return JSON.parse(await fetchResult(acfunApis.users.album.list, "POST", "page=" + page + "&perpage=" + perpage))
            }
        }
    },
    moment: {
        friendMoment: `https://www.acfun.cn/rest/pc-direct/feed/followFeedV2?useWebp=true&pcursor=0&count=5&resourceTypes=0`,
    },
    bangumi: {
        mySubscribe: `https://www.acfun.cn/rest/pc-direct/feed/favorite/bangumi?count=`,
        /**@returns {{result:number,feeds:[APIs.Favorite.FullBangumi]}} */
        getMySubscribe: async (count = 10) => {
            return JSON.parse(await fetchResult(acfunApis.bangumi.myDescribe + count));
        },
        favorite: `https://www.acfun.cn/rest/pc-direct/favorite/bangumiList`,
        /**@returns {{result:number,favoriteList:[APIs.Favorite.BangumiItem]}} */
        getFavorites: async (page = 1, perpage = 20) => {
            return JSON.parse(await fetchResult(acfunApis.bangumi.favorite + "?page=" + page + "&perpage=" + perpage));
        }
    },
}

const acfunHelperApis = {
    confSync: {
        upload: `https://mini.pocketword.cn/api/acfun-helper/options/upload`,
        download: `https://mini.pocketword.cn/api/acfun-helper/options/download`,
    }
}

const acfunApisParameter = {
    ImgProcessParameter: "?imageView2/1/w/${width}/h/${height}|imageslim",
    ImgWebp: "?imageMogr2/auto-orient/format/webp/quality/75!/ignore-error/1",
}

/**
 * @ref https://www.acfun.cn/rest/pc-direct/page/queryNavigators
 * */
const acfunDepts = {
    utils: {
        getAll: async () => {
            return JSON.parse(await fetchResult(acfunApis.navigateCategory.query));
        },
        getParts: async () => {
            const category = JSON.parse(await fetchResult(acfunApis.navigateCategory.query));
            return category.data.map(e => { return { [e.navName]: e.id } });
        },
        getAllDetailParts: async () => {
            let tempdict = [];
            const raw = JSON.parse(await fetchResult(acfunApis.navigateCategory.query));
            function recurOut(e) {
                if (e["children"].length) {
                    e.children.map(recurOut)
                } else {
                    tempdict.push(e);
                }
            }
            raw.data.map(e => {
                recurOut(e)
            })
            return tempdict;
        }
    },
    parts: { "AC正义": 112, "番剧": 105, "动画": 14, "娱乐": 18, "生活": 153, "音乐": 16, "舞蹈·偶像": 17, "游戏": 15, "科技": 19, "影视": 20, "体育": 21, "鱼塘": 22, "文章": 24 },
    detail: [
        {
            "id": 112,
            "navName": "AC正义",
            "parent": 0,
            "link": "/v/list177/index.htm",
            "orders": 200,
            "children": [
                {
                    "id": 125,
                    "navName": "中国日报",
                    "parent": 112,
                    "link": "/u/3216851",
                    "orders": 196,
                    "children": []
                },
                {
                    "id": 122,
                    "navName": "环球时报",
                    "parent": 112,
                    "link": "/u/9755346",
                    "orders": 194,
                    "children": []
                },
                {
                    "id": 144,
                    "navName": "中国网",
                    "parent": 112,
                    "link": "/u/14194071",
                    "orders": 191,
                    "children": []
                },
                {
                    "id": 150,
                    "navName": "法治进行时",
                    "parent": 112,
                    "link": "/u/16591709",
                    "orders": 190,
                    "children": []
                },
                {
                    "id": 145,
                    "navName": "浙样红TV",
                    "parent": 112,
                    "link": "/u/14706221",
                    "orders": 187,
                    "children": []
                },
                {
                    "id": 123,
                    "navName": "新青年工作室",
                    "parent": 112,
                    "link": "/u/12786860",
                    "orders": 186,
                    "children": []
                },
                {
                    "id": 148,
                    "navName": "新华社现场云",
                    "parent": 112,
                    "link": "/u/16141705",
                    "orders": 185,
                    "children": []
                },
                {
                    "id": 152,
                    "navName": "快手",
                    "parent": 112,
                    "link": "/u/20143211",
                    "orders": 184,
                    "children": []
                },
                {
                    "id": 124,
                    "navName": "小央视频",
                    "parent": 112,
                    "link": "/u/13423227",
                    "orders": 183,
                    "children": []
                },
                {
                    "id": 158,
                    "navName": "人民资讯",
                    "parent": 112,
                    "link": "/u/30169313",
                    "orders": 182,
                    "children": []
                },
                {
                    "id": 121,
                    "navName": "AC正义展览区",
                    "parent": 112,
                    "link": "/v/list178/index.htm",
                    "orders": 130,
                    "children": []
                }
            ]
        },
        {
            "id": 105,
            "navName": "番剧",
            "parent": 0,
            "link": "/v/list155/index.htm",
            "orders": 100,
            "children": [
                {
                    "id": 131,
                    "navName": "番剧列表",
                    "parent": 105,
                    "link": "/bangumilist",
                    "orders": 60,
                    "children": []
                },
                {
                    "id": 115,
                    "navName": "TV动画",
                    "parent": 105,
                    "link": "/v/list67/index.htm",
                    "orders": 50,
                    "children": []
                },
                {
                    "id": 116,
                    "navName": "剧场动画",
                    "parent": 105,
                    "link": "/v/list180/index.htm",
                    "orders": 40,
                    "children": []
                },
                {
                    "id": 130,
                    "navName": "国产动画",
                    "parent": 105,
                    "link": "/v/list120/index.htm",
                    "orders": 30,
                    "children": []
                }
            ]
        },
        {
            "id": 14,
            "navName": "动画",
            "parent": 0,
            "link": "/v/list1/index.htm",
            "orders": 90,
            "children": [
                {
                    "id": 132,
                    "navName": "动画综合",
                    "parent": 14,
                    "link": "/v/list106/index.htm",
                    "orders": 70,
                    "children": []
                },
                {
                    "id": 133,
                    "navName": "短片·手书·配音",
                    "parent": 14,
                    "link": "/v/list190/index.htm",
                    "orders": 60,
                    "children": []
                },
                {
                    "id": 34,
                    "navName": "MAD·AMV",
                    "parent": 14,
                    "link": "/v/list107/index.htm",
                    "orders": 50,
                    "children": []
                },
                {
                    "id": 35,
                    "navName": "MMD·3D",
                    "parent": 14,
                    "link": "/v/list108/index.htm",
                    "orders": 40,
                    "children": []
                },
                {
                    "id": 157,
                    "navName": "虚拟偶像",
                    "parent": 14,
                    "link": "/v/list207/index.htm",
                    "orders": 35,
                    "children": []
                },
                {
                    "id": 41,
                    "navName": "动画资讯",
                    "parent": 14,
                    "link": "/v/list159/index.htm",
                    "orders": 30,
                    "children": []
                },
                {
                    "id": 36,
                    "navName": "COSPLAY·声优",
                    "parent": 14,
                    "link": "/v/list133/index.htm",
                    "orders": 20,
                    "children": []
                },
                {
                    "id": 97,
                    "navName": "特摄",
                    "parent": 14,
                    "link": "/v/list99/index.htm",
                    "orders": 10,
                    "children": []
                },
                {
                    "id": 162,
                    "navName": "番剧二创",
                    "parent": 14,
                    "link": "/v/list212/index.htm",
                    "orders": 5,
                    "children": []
                }
            ]
        },
        {
            "id": 18,
            "navName": "娱乐",
            "parent": 0,
            "link": "/v/list60/index.htm",
            "orders": 87,
            "children": [
                {
                    "id": 156,
                    "navName": "搞笑",
                    "parent": 18,
                    "link": "/v/list206/index.htm",
                    "orders": 10,
                    "children": []
                },
                {
                    "id": 68,
                    "navName": "鬼畜",
                    "parent": 18,
                    "link": "/v/list87/index.htm",
                    "orders": 10,
                    "children": []
                },
                {
                    "id": 128,
                    "navName": "明星",
                    "parent": 18,
                    "link": "/v/list188/index.htm",
                    "orders": 9,
                    "children": []
                }
            ]
        },
        {
            "id": 153,
            "navName": "生活",
            "parent": 0,
            "link": "/v/list201/index.htm",
            "orders": 86,
            "children": [
                {
                    "id": 69,
                    "navName": "生活日常",
                    "parent": 153,
                    "link": "/v/list86/index.htm",
                    "orders": 10,
                    "children": []
                },
                {
                    "id": 66,
                    "navName": "萌宠",
                    "parent": 153,
                    "link": "/v/list88/index.htm",
                    "orders": 10,
                    "children": []
                },
                {
                    "id": 65,
                    "navName": "美食",
                    "parent": 153,
                    "link": "/v/list89/index.htm",
                    "orders": 10,
                    "children": []
                },
                {
                    "id": 154,
                    "navName": "旅行",
                    "parent": 153,
                    "link": "/v/list204/index.htm",
                    "orders": 2,
                    "children": []
                },
                {
                    "id": 85,
                    "navName": "手工·绘画",
                    "parent": 153,
                    "link": "/v/list127/index.htm",
                    "orders": 2,
                    "children": []
                },
                {
                    "id": 155,
                    "navName": "美妆·造型",
                    "parent": 153,
                    "link": "/v/list205/index.htm",
                    "orders": 1,
                    "children": []
                }
            ]
        },
        {
            "id": 16,
            "navName": "音乐",
            "parent": 0,
            "link": "/v/list58/index.htm",
            "orders": 80,
            "children": [
                {
                    "id": 166,
                    "navName": "治愈系",
                    "parent": 16,
                    "link": "/v/list215/index.htm",
                    "orders": 100,
                    "children": []
                },
                {
                    "id": 57,
                    "navName": "原创·翻唱",
                    "parent": 16,
                    "link": "/v/list136/index.htm",
                    "orders": 10,
                    "children": []
                },
                {
                    "id": 55,
                    "navName": "演奏·乐器",
                    "parent": 16,
                    "link": "/v/list137/index.htm",
                    "orders": 10,
                    "children": []
                },
                {
                    "id": 54,
                    "navName": "Vocaloid",
                    "parent": 16,
                    "link": "/v/list103/index.htm",
                    "orders": 10,
                    "children": []
                },
                {
                    "id": 52,
                    "navName": "综合音乐",
                    "parent": 16,
                    "link": "/v/list139/index.htm",
                    "orders": 10,
                    "children": []
                },
                {
                    "id": 129,
                    "navName": "音乐选集·电台",
                    "parent": 16,
                    "link": "/v/list185/index.htm",
                    "orders": 9,
                    "children": []
                }
            ]
        },
        {
            "id": 17,
            "navName": "舞蹈·偶像",
            "parent": 0,
            "link": "/v/list123/index.htm",
            "orders": 75,
            "children": [
                {
                    "id": 169,
                    "navName": "颜值",
                    "parent": 17,
                    "link": "/v/list218/index.htm",
                    "orders": 100,
                    "children": []
                },
                {
                    "id": 63,
                    "navName": "宅舞",
                    "parent": 17,
                    "link": "/v/list134/index.htm",
                    "orders": 5,
                    "children": []
                },
                {
                    "id": 59,
                    "navName": "综合舞蹈",
                    "parent": 17,
                    "link": "/v/list135/index.htm",
                    "orders": 4,
                    "children": []
                },
                {
                    "id": 81,
                    "navName": "偶像",
                    "parent": 17,
                    "link": "/v/list129/index.htm",
                    "orders": 3,
                    "children": []
                },
                {
                    "id": 159,
                    "navName": "中国舞",
                    "parent": 17,
                    "link": "/v/list208/index.htm",
                    "orders": 1,
                    "children": []
                }
            ]
        },
        {
            "id": 15,
            "navName": "游戏",
            "parent": 0,
            "link": "/v/list59/index.htm",
            "orders": 74,
            "children": [
                {
                    "id": 165,
                    "navName": "王者荣耀",
                    "parent": 15,
                    "link": "/v/list214/index.htm",
                    "orders": 40,
                    "children": []
                },
                {
                    "id": 161,
                    "navName": "我的世界",
                    "parent": 15,
                    "link": "/v/list210/index.htm",
                    "orders": 40,
                    "children": []
                },
                {
                    "id": 167,
                    "navName": "和平精英",
                    "parent": 15,
                    "link": "/v/list216/index.htm",
                    "orders": 35,
                    "children": []
                },
                {
                    "id": 168,
                    "navName": "第五人格",
                    "parent": 15,
                    "link": "/v/list217/index.htm",
                    "orders": 20,
                    "children": []
                },
                {
                    "id": 44,
                    "navName": "英雄联盟",
                    "parent": 15,
                    "link": "/v/list85/index.htm",
                    "orders": 20,
                    "children": []
                },
                {
                    "id": 47,
                    "navName": "电子竞技",
                    "parent": 15,
                    "link": "/v/list145/index.htm",
                    "orders": 19,
                    "children": []
                },
                {
                    "id": 134,
                    "navName": "网络游戏",
                    "parent": 15,
                    "link": "/v/list186/index.htm",
                    "orders": 17,
                    "children": []
                },
                {
                    "id": 45,
                    "navName": "主机单机",
                    "parent": 15,
                    "link": "/v/list84/index.htm",
                    "orders": 16,
                    "children": []
                },
                {
                    "id": 135,
                    "navName": "手机游戏",
                    "parent": 15,
                    "link": "/v/list187/index.htm",
                    "orders": 12,
                    "children": []
                },
                {
                    "id": 43,
                    "navName": "桌游卡牌",
                    "parent": 15,
                    "link": "/v/list165/index.htm",
                    "orders": 8,
                    "children": []
                }
            ]
        },
        {
            "id": 19,
            "navName": "科技",
            "parent": 0,
            "link": "/v/list70/index.htm",
            "orders": 65,
            "children": [
                {
                    "id": 160,
                    "navName": "手办模玩",
                    "parent": 19,
                    "link": "/v/list209/index.htm",
                    "orders": 8,
                    "children": []
                },
                {
                    "id": 71,
                    "navName": "科技制造",
                    "parent": 19,
                    "link": "/v/list90/index.htm",
                    "orders": 6,
                    "children": []
                },
                {
                    "id": 136,
                    "navName": "人文科普",
                    "parent": 19,
                    "link": "/v/list189/index.htm",
                    "orders": 5,
                    "children": []
                },
                {
                    "id": 70,
                    "navName": "汽车",
                    "parent": 19,
                    "link": "/v/list122/index.htm",
                    "orders": 3,
                    "children": []
                },
                {
                    "id": 84,
                    "navName": "数码家电",
                    "parent": 19,
                    "link": "/v/list91/index.htm",
                    "orders": 2,
                    "children": []
                },
                {
                    "id": 73,
                    "navName": "演讲·公开课",
                    "parent": 19,
                    "link": "/v/list151/index.htm",
                    "orders": 2,
                    "children": []
                },
                {
                    "id": 82,
                    "navName": "广告",
                    "parent": 19,
                    "link": "/v/list149/index.htm",
                    "orders": 1,
                    "children": []
                }
            ]
        },
        {
            "id": 20,
            "navName": "影视",
            "parent": 0,
            "link": "/v/list68/index.htm",
            "orders": 60,
            "children": [
                {
                    "id": 164,
                    "navName": "放映厅",
                    "parent": 20,
                    "link": "https://hd.acfun.cn/s/QpdpZsjR",
                    "orders": 110,
                    "children": []
                },
                {
                    "id": 170,
                    "navName": "影视混剪",
                    "parent": 20,
                    "link": "/v/list219/index.htm",
                    "orders": 100,
                    "children": []
                },
                {
                    "id": 137,
                    "navName": "预告·花絮",
                    "parent": 20,
                    "link": "/v/list192/index.htm",
                    "orders": 100,
                    "children": []
                },
                {
                    "id": 138,
                    "navName": "电影杂谈",
                    "parent": 20,
                    "link": "/v/list193/index.htm",
                    "orders": 90,
                    "children": []
                },
                {
                    "id": 139,
                    "navName": "追剧社",
                    "parent": 20,
                    "link": "/v/list194/index.htm",
                    "orders": 85,
                    "children": []
                },
                {
                    "id": 140,
                    "navName": "综艺show",
                    "parent": 20,
                    "link": "/v/list195/index.htm",
                    "orders": 80,
                    "children": []
                },
                {
                    "id": 141,
                    "navName": "纪录片·短片",
                    "parent": 20,
                    "link": "/v/list196/index.htm",
                    "orders": 75,
                    "children": []
                }
            ]
        },
        {
            "id": 21,
            "navName": "体育",
            "parent": 0,
            "link": "/v/list69/index.htm",
            "orders": 55,
            "children": [
                {
                    "id": 93,
                    "navName": "综合体育",
                    "parent": 21,
                    "link": "/v/list152/index.htm",
                    "orders": 10,
                    "children": []
                },
                {
                    "id": 92,
                    "navName": "足球",
                    "parent": 21,
                    "link": "/v/list94/index.htm",
                    "orders": 10,
                    "children": []
                },
                {
                    "id": 91,
                    "navName": "篮球",
                    "parent": 21,
                    "link": "/v/list95/index.htm",
                    "orders": 10,
                    "children": []
                },
                {
                    "id": 90,
                    "navName": "搏击健身",
                    "parent": 21,
                    "link": "/v/list153/index.htm",
                    "orders": 10,
                    "children": []
                },
                {
                    "id": 87,
                    "navName": "极限竞速",
                    "parent": 21,
                    "link": "/v/list93/index.htm",
                    "orders": 10,
                    "children": []
                }
            ]
        },
        {
            "id": 22,
            "navName": "鱼塘",
            "parent": 0,
            "link": "/v/list125/index.htm",
            "orders": 45,
            "children": [
                {
                    "id": 118,
                    "navName": "普法安全",
                    "parent": 22,
                    "link": "/v/list183/index.htm",
                    "orders": 11,
                    "children": []
                },
                {
                    "id": 78,
                    "navName": "国防军事",
                    "parent": 22,
                    "link": "/v/list92/index.htm",
                    "orders": 10,
                    "children": []
                },
                {
                    "id": 72,
                    "navName": "历史",
                    "parent": 22,
                    "link": "/v/list131/index.htm",
                    "orders": 10,
                    "children": []
                },
                {
                    "id": 67,
                    "navName": "新鲜事·正能量",
                    "parent": 22,
                    "link": "/v/list132/index.htm",
                    "orders": 10,
                    "children": []
                }
            ]
        },
        {
            "id": 24,
            "navName": "文章",
            "parent": 0,
            "link": "/v/list63/index.htm",
            "orders": 40,
            "children": [
                {
                    "id": 119,
                    "navName": "二次元画师",
                    "parent": 24,
                    "link": "/v/list184/index.htm",
                    "orders": 11,
                    "children": []
                },
                {
                    "id": 26,
                    "navName": "综合",
                    "parent": 24,
                    "link": "/v/list110/index.htm",
                    "orders": 10,
                    "children": []
                },
                {
                    "id": 27,
                    "navName": "生活情感",
                    "parent": 24,
                    "link": "/v/list73/index.htm",
                    "orders": 6,
                    "children": []
                },
                {
                    "id": 32,
                    "navName": "游戏",
                    "parent": 24,
                    "link": "/v/list164/index.htm",
                    "orders": 4,
                    "children": []
                },
                {
                    "id": 28,
                    "navName": "动漫文化",
                    "parent": 24,
                    "link": "/v/list74/index.htm",
                    "orders": 3,
                    "children": []
                },
                {
                    "id": 31,
                    "navName": "漫画·文学",
                    "parent": 24,
                    "link": "/v/list75/index.htm",
                    "orders": 2,
                    "children": []
                }
            ]
        }
    ],
}
