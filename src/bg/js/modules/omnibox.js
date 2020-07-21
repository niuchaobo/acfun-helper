/**
 * omnibox 地址栏扩展模块
 */
class Ohminibox{
    constructor(){

    }
    
    registerOmnibox(){
        console.log("Registered Omnibox Mod.")
        chrome.omnibox.onInputStarted.addListener(() => {
        });
        chrome.omnibox.onInputChanged.addListener((text, suggest) => {
            let x0 = RegExp('-ac(.*)');
            let y0 = x0.exec(text);
            if(y0==null){
                fetch(`https://www.acfun.cn/rest/pc-direct/search/suggest?count=6&keyword=${text}&callback=jQuery35104624576750465499_1592378440178&_=1592378440180`).then((res)=>{return res.text();})
                .then((res)=>{
                    try {
                        let regX=RegExp("jQuery35104624576750465499_1592378440178(.*)");
                        let result = regX.exec(res)[1].replace('(','').replace(')','');
                        var x = JSON.parse(result);
                        var y=[];
                    } catch (error) {
                        console.log("[LOG]Backend-Omnibox>registerOmnibox: 没有找到关键字");
                    }
                    try {
                        var keywordNum = x.suggestKeywords.length;
                    } catch (error) {
                        var keywordNum = 1;
                    }
                    for(let i = 0;i<keywordNum;i++){
                        try {
                            let z = `{"content": "${x.suggestKeywords[i]}","description": "是否要查看 ${x.suggestKeywords[i]} 在主站有关的内容？"}`;
                            var zo = JSON.parse(z);
                        } catch (error) {
                            var zo={};
                        }
                        try {
                            y.push(zo);
                        } catch (error) {}
                    }
                    try {
                        suggest(y);
                    } catch (error) {}
                })
            }
        });
        
        chrome.omnibox.onInputEntered.addListener((text) => {
            let x0 = RegExp('-ac(.*)');
            let y0 = x0.exec(text);
            if(y0==null){
                window.open('https://www.acfun.cn/search?keyword='+String(encodeURI(text)));
            }else{
                window.open('https://www.acfun.cn/v/ac'+String(encodeURI(y0[1])));
            }
        });
        
        chrome.omnibox.setDefaultSuggestion({
                    "description": "Ac在爱一直在 - 由此进入主站"
        });
    }
}