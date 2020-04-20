const reg = new RegExp("https://webapi.acfun.cn/query/article/list\\?.*");
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