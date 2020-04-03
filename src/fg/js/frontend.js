class ODHFront {

    constructor() {
        this.options = null;
        this.div = new Div();


        chrome.runtime.onMessage.addListener(this.onBgMessage.bind(this));
        window.addEventListener('message', e => this.onFrameMessage(e));
        window.addEventListener('DOMContentLoaded', e => this.onDomContentLoaded(e));
    }



      onBgMessage(request, sender, callback) {
        const { action, params } = request;
        const method = this['api_' + action];
        if (typeof(method) === 'function') {
            params.callback = callback;
            method.call(this, params);
        }
        callback();
    }

    onDomContentLoaded(e){
        /*console.log("href",window.location.href);
        //TODO 判断是acfun页面
        let href = window.location.href;
        let videoReg = new RegExp("")

        //获取
        this.div.show();*/

    }

    async api_throwBanana(params) {
        console.log($('.up-name').text());
        var up_name = '';
        var banana_num = 0;
        if(!this.options.auto_throw){
            return;
        }
        if(this.options.to_attention){
            //判断是否为已关注up主
            let followed = document.getElementsByClassName('follow-up followed');
            if(!followed || followed.length<=0){
                return;
            }
            up_name = document.getElementsByClassName('up-name')[0].innerText;
            banana_num = this.options.to_attention_num;
        }else{
            //判断是否为指定up主
            let up_url = document.getElementsByClassName('up-name')[0].href;
            let flag = false;
            let special_items = this.options.to_special_items;
            for(let item of special_items){
                if(item.up_url == up_url){
                    up_name = item.name;
                    banana_num = item.bananaNum;
                    flag = true;
                }
            }
            if(!flag){
                return;
            }
        }
        //如果已投蕉
        var arr = document.getElementsByClassName('banana active');
        if(arr.length>0){
            return;
        }
        let { key, callback } = params;
        let header = new Map();
        header.set("Content-Type","application/x-www-form-urlencoded");
        let data = "resourceId="+key+"&count="+banana_num+"&resourceType=2";
        let result = await ajax('POST',"https://www.acfun.cn/rest/pc-direct/banana/throwBanana",data,header);
        //如果开启投蕉通知,通知background发提醒
        if(this.options.banana_notice){
            let action = "notice";
            let p={
                name:up_name,
                num:banana_num
            }
            chrome.runtime.sendMessage({action:action,params:p}, function(response) {

            });
        }
    }

    api_setFrontendOptions(params) {
        let { options, callback } = params;
        this.options = options;
        callback();
    }

    onFrameMessage(e) {
        const { action, params } = e.data;
        const method = this['api_' + action];
        if (typeof(method) === 'function') {
            method.call(this, params);
        }
    }


}

function notice(title,message) {
    chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: 'images/notice.png',
        title: title,
        message: message
    });
}

window.odhfront = new ODHFront();