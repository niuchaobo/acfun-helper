/**
 * 评论区过滤
 * @param {import("../../../../declares/XHRProxy").XhrResponse} ctx 
 * @param {import("../../../../declares/XHRProxy").XhrResponseHandler} handler 
 * @todo 完善置顶评论过滤
 */
function commentFilter(ctx, handler) {
    /**
     * @type {APIs.CommentApi}
     */
    let rawComment = JSON.parse(ctx.response);
    let banUids = [];
    for (let i of this.dataset["commentAreaBanUsersId"]) {
        if (typeof (i) == "string") {
            banUids.push(Number(i))
        } else {
            banUids.push(i)
        }
    }
    let hots = [], root = [], srcMap = {}, sticky = {};

    hots = rawComment.hotComments.filter(e => !banUids.includes(e.userId));
    root = rawComment.rootComments.filter(e => !banUids.includes(e.userId));

    if (Object.keys(rawComment.subCommentsMap).length) {
        for (let e in rawComment.subCommentsMap) {
            srcMap[e] = {
                subComments: rawComment.subCommentsMap[e].subComments.filter(e => !banUids.includes(e.userId)),
                pcursor: rawComment.subCommentsMap[e].pcursor
            }
        }

    }
    const afterProcess = {
        commentCount: rawComment.commentCount,
        contentUbbVersion: rawComment.contentUbbVersion,
        curPage: rawComment.curPage,
        godComments: [],
        ['host-name']: rawComment["host-name"],
        isUp: rawComment.isUp,
        pageSize: rawComment.pageSize,
        pcursor: rawComment.pcursor,
        result: rawComment.result,
        sourceType: rawComment.sourceType,
        stickyComments: rawComment.stickyComments,
        totalPage: rawComment.totalPage,
        rootComments: root,
        hotComments: hots,
        stickyComments: sticky,
        subCommentsMap: srcMap,
    }
    ctx.response = JSON.stringify(afterProcess)
    handler.next(ctx);
}

export const arfpmod = {
    name: "commentFilter",
    trigger: commentFilter,
    datas: {
        /**@description  评论区过滤的UID*/
        commentAreaBanUsersId: [],
        commentFilterEnable: false,
    },
}