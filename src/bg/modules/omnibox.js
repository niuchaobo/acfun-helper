/**
 * omnibox 地址栏扩展模块
 */
class Ohminibox {
    constructor() {
        this.omnibox = chrome.omnibox;
        this.initMod();
    }

    initMod() {
        if (myBrowser() == "FF") {
            this.omnibox = browser.omnibox;
        }
    }

    registerOmnibox() {
        console.log("Registered Omnibox Mod.")
        this.omnibox.onInputStarted.addListener(() => { });
        this.omnibox.onInputChanged.addListener((text, suggest) => {
            if (RegExp('-ac(.*)').exec(text) == null) {
                fetch(`https://www.acfun.cn/rest/pc-direct/search/suggest?count=6&keyword=${text}&callback=jQuery35104624576750465499_1592378440178&_=1592378440180`).then((res) => { return res.text(); })
                    .then((res) => {
                        try {
                            let result = RegExp("jQuery35104624576750465499_1592378440178(.*)").exec(res)[1].replace('(', '').replace(')', '');
                            var x = JSON.parse(result);
                        } catch (error) {
                            console.log(`    [LOG]Backend-Omnibox>registerOmnibox: [${formatDate(new Date(), true)}] 没有找到准确的关键字`);
                        }
                        let suggestions = x.suggestKeywords.map((val) => {
                            return {
                                "content": val,
                                "description": chrome.i18n.getMessage("omniboxInputSuggestion", val)
                            }
                        });
                        try {
                            suggest(suggestions);
                        } catch (error) { }
                    })
            }
        });

        this.omnibox.onInputEntered.addListener((text, disposition) => {
            let y0 = RegExp('-ac(.*)').exec(text);
            let url;
            if (y0 == null) {
                url = 'https://www.acfun.cn/search?keyword=' + String(encodeURI(text));
            } else {
                url = 'https://www.acfun.cn/v/ac' + String(encodeURI(y0[1]));
            }
            switch (disposition) {
                case "currentTab":
                    browser.tabs.update({ url });
                    break;
                case "newForegroundTab":
                default:
                    window.open(url) || browser.tabs.create({ url });
                    break;
                case "newBackgroundTab":
                    browser.tabs.create({ url, active: false });
                    break;
            }
        });

        this.omnibox.setDefaultSuggestion({
            "description": chrome.i18n.getMessage("omniboxDefaultSuggestion")
        });
    }
}