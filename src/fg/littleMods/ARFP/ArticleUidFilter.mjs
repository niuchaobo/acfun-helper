/**
 * 文章区Feed过滤
 * @param {import("../../../../declares/XHRProxy").XhrResponse} ctx 
 * @param {import("../../../../declares/XHRProxy").XhrResponseHandler} handler 
 */
function articleListUidFilter(ctx, handler) {
    /**
     * @type {Array}
     */
    let banUids = [];
    for (let i of this.dataset["articleFilterUsersUid"]) {
        if (typeof (i) == "string") {
            banUids.push(Number(i))
        } else {
            banUids.push(i)
        }
    }

    /**
     * @type {APIs.ArticlePart}
     */
    let raw = JSON.parse(ctx.response);
    let newDataArr = [];
    raw.data.forEach(e => {
        if (!banUids.includes(e.userId)) {
            newDataArr.push(e);
        }
    })
    if (!newDataArr.length) {
        newDataArr.push(this.dataset.newArticleFilterEmptyFill);
    }
    /**@description 重新构造请求 */
    ctx.response = { "cursor": raw.cursor, "data": newDataArr, "result": raw.result };
    handler.next(ctx);
}

export const arfpmod = {
    name: "articleListUidFilter",
    trigger: articleListUidFilter,
    datas: {
        enable: false,
        /**@description  文章区列表过滤的用户ID*/
        articleFilterUsersUid: [],
        /**@description 新版文章区列表屏蔽中，默认的覆盖显示条目 */
        newArticleFilterEmptyFill: {
            articleId: 15387968,
            commentCount: 999,
            coverImgInfo: {
                width: 1600, height: 900, size: 265343, type: 1, thumbnailImage: { cdnUrls: [{ freeTrafficCdn: true, url: "https://imgs.aixifan.com/FvHGj3sOzp9d2jsjlBfqFFuUgBAJ", freeTrafficProductAbbreviation: "" }] }
            },
            createTime: 1588857632000,
            description: "",
            formatCommentCount: "999",
            formatViewCount: "999",
            isOriginal: true,
            realmId: 4,
            realmName: "爱稀饭助手",
            title: "下一页内容已全部屏蔽",
            userId: 7054138,
            userName: "爱稀饭助手-说",
        },
    },
}