/**
 * 定时更新数据
 */
class UpgradeAgent{
    constructor(){
        this.checkConfigDay = [3,7]
        this.dataTimer = null;
    }

    /**
     * 检查今天周几
     */
    checkDay(){
        let x = new Date();
        return x.getDay();
    }

    /**
     * 检查是否是正确的日期
     */
    ifRightDay(){
        let x = this.checkDay();
        if(x in this.checkConfigDay){
            console.log("[LOG]Backend-Upgrade>rightDay: 是时候检查更新了。");
            return true;
        }
        return false;
    }

    /**
     * 检查插件更新
     */
    checkUpdate(){
        if(this.ifRightDay()){
            //POST版本号至服务器，服务器对比最新的版本之后返回一个int值，0：不需要更新，1：小版本更新-弱提醒，2：重要功能更新-强提醒(session and cache please)
            var version = null
            $.get(chrome.extension.getURL("manifest.json"),function(content){
                chrome.storage.local.set({Version : content.version});
                version = content.version;
            fetch('https://mini.pocketword.cn/api/acfun-helper/newversion/',{method:"POST",headers: {'Content-Type': 'application/x-www-form-urlencoded','Accept':"accept: application/json, text/plain, */*"},body:version})
            .then((res)=>{return res.text();})
            .then((res)=>{
                chrome.storage.local.remove("Upgradeable");
                let x = JSON.parse(res);
                let key = x.result;
                chrome.storage.local.set({Upgradeable : key}); 
            });
            },'json');
        }
    }

    /**
     * 总
     */
    upgradeMain(){
        console.log("Registered Upgrade Check Mod.")
        this.checkUpdate();
        this.dateTimer && clearInterval(this.dateTimer)
        this.dateTimer = setInterval(() => {
            this.checkUpdate();
        }, 43200000);
    }
}