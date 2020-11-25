/**
 * 获取认证信息
 */
class AuthInfo{
    constructor(){

    }

    fetchPasstoken(){
        chrome.storage.local.get(['LocalUserId'],async(Uid)=>{
            if(Uid.LocalUserId=="0"){return}
            chrome.cookies.get({url:'https://www.acfun.cn/',name:'acPasstoken'},function(a){
                chrome.storage.local.set({AcPassToken : `${a.value}`});
            })
        })
    }

    getAccessToken(){
        chrome.storage.local.get(["AccessToken"],async(AccessToken)=>{
            if(AccessToken.AccessToken=="0"){return};
            chrome.cookies.get({url:"https://www.acfun.cn/",name:"JSESSIONID"},function(e){
                if(e==undefined){
                    return;
                }
                chrome.storage.local.set({AccessToken : `${e.value}`});
            })
        })
    }

}