/**
 * 自动投蕉
 */
class Banana{
    constructor(){

    }

    async throwBanana(params) {
        let options = window.odhfront.options;
        var up_name = '';
        var banana_num = 0;
        if(!options.auto_throw){
            return;
        }
        if(options.to_attention){
            //判断是否为已关注up主
            let followed = document.getElementsByClassName('follow-up followed');
            if(!followed || followed.length<=0){
                return;
            }
            up_name = document.getElementsByClassName('up-name')[0].innerText;
            banana_num = options.to_attention_num;
        }else{
            //判断是否为指定up主
            let up_url = document.getElementsByClassName('up-name')[0].href;
            let flag = false;
            let special_items = options.to_special_items;
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
        let res_obj = JSON.parse(result);
        if(res_obj==undefined || res_obj.extData==undefined || res_obj.extData.bananaRealCount==undefined){
            return;
        }
        //改变页面上的投蕉状态
        $('.right-area .banana').addClass('active');
        //如果开启投蕉通知,通知background发提醒
        if(options.banana_notice){
            let action = "notice";
            let msg = '您成功给'+up_name+'投食'+banana_num+'蕉';
            let p={
                title:"自动投蕉通知",
                msg:msg,
            }
            chrome.runtime.sendMessage({action:action,params:p}, function(response) {

            });
        }
    }
    
}