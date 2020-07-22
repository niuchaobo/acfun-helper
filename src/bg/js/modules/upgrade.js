/**
 * 定时更新
 */
class UpgradeAgent{
    constructor(){
        this.checkConfigDay = [3,7]
        this.testData = 1;
    }

    checkDay(){
        let x = new Date();
        return x.getDay();
    }

    ifRightDay(){
        let x = this.checkDay();
        if(x in this.checkConfigDay){
            console.log("[LOG]Backend-Upgrade>rightDay: 是时候检查更新了。");
            return true;
        }
        return false;
    }

    checkUpdate(){
        if(this.ifRightDay()){
            //POST版本号至服务器，服务器对比最新的版本之后返回一个int值，0：不需要更新，1：小版本更新-弱提醒，2：重要功能更新-强提醒(session and cache please)
            // fetch
            chrome.storage.local.remove("Upgradeable");
            let key = this.testData;
            switch (key) {
                case 0:
                    chrome.storage.local.set({Upgradeable : 0});
                    break;
                case 1:
                    chrome.storage.local.set({Upgradeable : 1});
                    break;
                case 2:
                    chrome.storage.local.set({Upgradeable : 2});
                    break;
            }
        }
    }

    upgradeMain(){
        console.log("Registered Upgrade Check Mod.")
        this.checkUpdate();
        var _dateTimer = setInterval(() => {
            this.checkUpdate();
        }, 43200000);
    }
}