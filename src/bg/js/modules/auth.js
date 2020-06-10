/**
 * 获取认证信息
 */
class AuthInfo{
    constructor(){

    }
    test(){
        console.log('hello from Backend.Auth.test()');
    }

    fetchPasstoken(){
        chrome.cookies.get({url:'https://www.acfun.cn/',name:'acPasstoken'},function(a){
            chrome.storage.local.set({AcPassToken : `${a.value}`});
            console.log('233');
        })
    }

}