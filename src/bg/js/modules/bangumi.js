/**
 * 番剧计划
 */
class BangumiPlan{
    constructor(){

    }

    startMod(){
        console.log("Start BangumiPlan Mod");
    }

    fetchBangumiInfo(){
        let y = getStorage("AccessToken");
        let x = fetchResult(`https://api-new.acfunchina.com/rest/app/feed/favorite/bangumi?count=12&pcursor=&access_token=${y.AccessToken}`);
    }

}