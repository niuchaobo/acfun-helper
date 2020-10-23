let rawData = {
    "aria": {
        "isNewVisit": false,
        "visitId": "8bfa60bb-66fb-5fbf-82c1-10315dd69cfe",
        "osPlatform": "win",
        "selectedPlatform": "win",
        "pageName": "MyBangumi"
    }, "tips": []
}

async function fetchSerializationData() {
    let x = await db_getMybangumi(1, 'updateDayOfWeek');
    console.log(x)
    for (let i = 0; i < x.length; i++) {
        let y = x[i];
        // let exclude1 = new RegExp('APP播放页面下滑进入番剧话题，获取更多优质内容推荐。(.*)');
        // let exclude2 = new RegExp('下滑进入番剧话题，获取更多优质内容推荐。(.*)');
        // _description = exclude1.exec(y.description) == null ? (
        //     exclude2.exec(y.description) == null ? y.description : exclude2.exec(y.description)[1]
        //     ) : exclude1.exec(y.description)[1];
        rawData.tips.push(
            {
                "actions": [
                    {
                        "text": `${checkDay() == Number(y.updateDayOfWeek) ? "观看最新" : "番剧主页"}`,
                        "url": "https://www.acfun.cn/bangumi/aa"+y.bangumiId,
                        "sameTab": true
                    },
                ],
                "category": {
                    "text": `${y.isOver == "true" ? "已完结" : "播出中 - 周" + y.updateDayOfWeek + "更新"}`+` - ${y.areaShow} - ${y.lastVideoName} - ${y.showPlayCount}播放`,
                    "id": `${y.isOver == "true" ? "ended" : "broadcasting"}`,
                    "color": `${y.isOver == "true" ? "#642C91" : "#098179"}`
                },
                "description": `<p>${y.description}</p><br><p>---${y.recoReason} <br> ${y.lastUpdateItemTimeStr}${y.isOver == "true" ?"完":""} - ${y.stowCount}人追番 - 于${y.updateDayTimeStr}更新</p>`,
                "id": i,
                "isOver": y.isOver == "true" ? true : false,
                "acfunOnly": y.acfunOnly == "true" ? true : false,
                "thumb": `${y.coverUrls[0]}`,
                "title": `${y.caption}`
            }
        )
    }
    // console.log(rawData)
    View.renderPage(rawData);
}
fetchSerializationData();
/**
 * 可以考虑做一下点击版块，然后背景图片使用此版块的图片，加点模糊最好
 */
// window.addEventListener('click',function(e){
    // console.log(e)
    // console.log(e.target.style.cssText)
// })