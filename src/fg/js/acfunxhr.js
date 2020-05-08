const reg = new RegExp("https://webapi.acfun.cn/query/article/list\\?.*");
const fill = {
    allowed_add_tag: false,
    attitudes: [],
    banana_count: 0,
    big_cover_image: "",
    channel_id: 110,
    channel_name: "综合",
    channel_path: "a",
    comment_count: 0,
    contribute_time: 1588857632000,
    cover_image: "https://imgs.aixifan.com/FvHGj3sOzp9d2jsjlBfqFFuUgBAJ",
    description: "",
    essense: false,
    favorite_count: 6,
    id: 15387968,
    isSignedUpCollege: false,
    latest_active_time: 1588861593000,
    latest_comment_time: 1588861593000,
    like_count: 0,
    link: "",
    parent_channel_id: 63,
    parent_channel_name: "文章",
    parent_realm_id: 0,
    realm_id: 5,
    realm_name: "杂谈",
    recommended: false,
    status: 2,
    title: "下一页内容已全部屏蔽",
    top_level: false,
    tudou_domain: false,
    type_id: 1,
    user_avatar: "",
    user_id: 7054138,
    username: "acfun助手",
    view_count: 0,
    view_only: true,
}

var ups = null;
function modifyResponse(response) {
    var original_response, modified_response;

    if (this.readyState === 4) {
        // 使用在 openBypass 中保存的相关参数判断是否需要修改
        if (reg.test(this.requestURL) && ups!=null) {
            original_response = response.target.responseText;
            Object.defineProperty(this, "responseText", {writable: true});
            modified_response = JSON.parse(original_response);
            // 根据 sendBypass 中保存的数据修改响应内容
            let articleList = modified_response.data.articleList;
            for (let i = 0; i < articleList.length; i++) {
                let item = articleList[i];
                let name = item.username;
                let uid = ups.get(name);
                if(uid!=undefined && uid!=null){
                    articleList.splice(i, 1); // 将使后面的元素依次前移，数组长度减1
                    i--; // 如果不减，将漏掉一个元素
                }
            }
            console.log("articleList.length="+articleList.length)
            if(articleList.length==0){
                articleList[0]=fill;
            }
            console.log(articleList);
            modified_response.data.articleList = articleList;
            this.responseText = JSON.stringify(modified_response);
        }
    }
}

function openBypass(original_function) {
    return function(method, url, async) {
        // 保存请求相关参数
        this.requestMethod = method;
        this.requestURL = url;

        this.addEventListener("readystatechange", modifyResponse);
        return original_function.apply(this, arguments);
    };

}

function sendBypass(original_function) {
    return function(data) {
        // 保存请求相关参数
        this.requestData = data;
        return original_function.apply(this, arguments);
    };
}

XMLHttpRequest.prototype.open = openBypass(XMLHttpRequest.prototype.open);
XMLHttpRequest.prototype.send = sendBypass(XMLHttpRequest.prototype.send);


//接收配置信息
window.addEventListener("message", function(event) {
    const data = event.data;
    let to = data.to;
    if(to == 'acfunxhr'){
        ups = data.ups;
    }
});