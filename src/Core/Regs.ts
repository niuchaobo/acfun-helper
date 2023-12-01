export const REG = {
    index: new RegExp('http(s)?://www.acfun.cn/$'),
    video: new RegExp('http(s)?:\\/\\/www.acfun.cn\\/v\\/ac\\d+'),//视频
    player: new RegExp('http(s)?:\\/\\/www.acfun.cn\\/player\\/ac\\d+'),//视频
    bangumi: new RegExp('http(s)?:\\/\\/www.acfun.cn\\/bangumi\\/.*'),//番剧
    videoAndBangumi: new RegExp('((http(s)?:\\/\\/www.acfun.cn\\/v\\/ac\\d+)|(http(s)?:\\/\\/www.acfun.cn\\/bangumi\\/.*))'),//视频与番剧
    article: new RegExp('http(s)?:\\/\\/www.acfun.cn\\/a\\/ac\\d+'),//文章
    msg_comment: new RegExp('http(s)?:\\/\\/www.acfun.cn\\/(a|v)\\/ac\\d+#ncid=(\\d+)'),//从我的消息-评论跳转
    mlive: new RegExp("https://m.acfun.cn/live/detail/*"),//移动版直播
    live: new RegExp("https://live.acfun.cn/live/*"),//直播
    liveIndex: new RegExp("https://live.acfun.cn"),//直播主页
    userHome: new RegExp("http(s)?://www.acfun.cn/u/(\\d+)"),//用户中心
    userCenter: {
        index: new RegExp("http(s)?://www.acfun.cn/member"),
        following: new RegExp("http(s)?://www.acfun.cn/member/feeds/following"),
    },
    partIndex: new RegExp("/v/list"),//分区主页
    articleDetail: new RegExp("/v/as"),//文章分区详细页
    acVid: new RegExp('http(s)?:\\/\\/www.acfun.cn\\/v\\/ac(\\d+)'),
    acAid: new RegExp('http(s)?:\\/\\/www.acfun.cn\\/a\\/ac(\\d+)'),
    acBangumid: new RegExp('http(s)?:\\/\\/www.acfun.cn\\/bangumi/aa(\\d+)'),
    liveRoomID: new RegExp("http(s)?://live.acfun.cn/live/(\\d+)"),
    videoPlayerSrc: new RegExp("blob:https://www.acfun.cn/"),
    videoPartNumByURL: new RegExp("_([0-9].?)"),
    topicCircle: new RegExp("^https:\/\/m.acfun.cn\/communityCircle\/(\d*)"),
    momentContent: new RegExp("^https:\/\/m.acfun.cn\/communityCircle\/moment\/(\d*)"),
    arubamu: new RegExp("http(s)?:\\/\\/www.acfun.cn\\/a\\/aa(\\d+)"),//合集
    method: {

    },
}

export const isTargetPage = (reg: RegExp) => {
    return reg.test(window.location.href)
}

export const pageAcID = (reg: RegExp) => {
    return reg.exec(window.location.href)
}