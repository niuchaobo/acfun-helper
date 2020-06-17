/**
 * omnibox 地址栏扩展模块
 */
class Ohminibox{
    constructor(){

    }
    
    registerOmnibox(){
        console.log("registered Omnibox Mod.")
        chrome.omnibox.onInputStarted.addListener(() => {
        });
        chrome.omnibox.onInputChanged.addListener((text, suggest) => {
            fetch(`https://www.acfun.cn/rest/pc-direct/search/suggest?count=6&keyword=${text}&callback=jQuery35104624576750465499_1592378440178&_=1592378440180`).then((res)=>{return res.text();})
            .then((res)=>{
                let regX=RegExp("jQuery35104624576750465499_1592378440178(.*)");
                let result = regX.exec(res)[1].replace('(','').replace(')','');
                let x = JSON.parse(result);
                let y=[];
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
                    y.push(zo);
                }
                suggest(y);
            })
        });
        
        chrome.omnibox.onInputEntered.addListener((text) => {
            window.open('https://www.acfun.cn/search?keyword='+String(encodeURI(text)));
        });
        
        chrome.omnibox.setDefaultSuggestion({
                    "description": "Ac在爱一直在 - 由此进入主站"
        });
    }
}