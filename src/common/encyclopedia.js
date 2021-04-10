const videoQualitiesRefer =
{
    "2160p120": { "limitType": 1, "qualityType": "2160p120", "qualityLabel": "2160P120", "definition": "4K", "width": 3840, "height": 2160 },
    "2160p60": { "limitType": 1, "qualityType": "2160p60", "qualityLabel": "2160P60", "definition": "4K", "width": 3840, "height": 2160 },
    "2160p": { "limitType": 1, "qualityType": "2160p", "qualityLabel": "2160P", "definition": "4K", "width": 3840, "height": 2160 },
    "1080p60": { "limitType": 1, "qualityType": "1080p60", "qualityLabel": "1080P60", "definition": "HD", "width": 1920, "height": 1080 },
    "720p60": { "limitType": 1, "qualityType": "720p60", "qualityLabel": "720P60" },
    "1080p+": { "limitType": 1, "qualityType": "1080p+", "qualityLabel": "1080P+", "definition": "HD", "width": 1920, "height": 1080 },
    "1080p": { "limitType": 1, "qualityType": "1080p", "qualityLabel": "1080P", "definition": "HD", "width": 1920, "height": 1080 },
    "720p": { "qualityType": "720p", "qualityLabel": "720P", "width": 1280, "height": 720 },
    "540p": { "qualityType": "540p", "qualityLabel": "540P", "width": 960, "height": 540 },
    "480p": { "qualityType": "480p", "qualityLabel": "480P", "width": 720, "height": 480 },
    "360p": { "qualityType": "360p", "qualityLabel": "360P", "width": 640, "height": 360 }
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
     * 用户信息 接UID
     */
    userInfo: `https://www.acfun.cn/rest/pc-direct/user/userInfo?userId=`,
    /**
     * 视频稿件 接AcVid
     */
    videoInfo: `https://mini.pocketword.cn/api/acfun/info?dougaId=`,
    /**
     * 用户投稿列表 接Uid
     */
    videoContributeList: `https://api-new.app.acfun.cn/rest/app/user/resource/query?count=1&resourceType=2&sortType=3&authorId=`,
    acDaily: `https://api-new.app.acfun.cn/rest/app/acDailyMagazine`,
    liveInfo: `https://live.acfun.cn/api/live/info?authorId=`,
}