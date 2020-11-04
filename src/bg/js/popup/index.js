/* global odhback, localizeHtmlPage, utilAsync, optionsLoad, optionsSave updateVersionIcon*/
import {
	renderPushInnerHtml,
	renderLives,
	renderLiveWatchTimeLst,
} from "./renderList.js";
import {
	openUpdateLog,
	openIntroduce,
	openSetting,
	watchLive,
	onOptionChanged,
	titleToHome,
	clickToTop,
	hideToTopButton,
	fetchDougaInfo,
	viewHistory,
	WatchLaterFpopup,
	StopWatchLaterFpopup,
	MomentSquareFpop,
	MyBangumiFpop,
	LiveWatchTimeLstReact,
	PushListDougaMode,
	indexJump,
	userInfoFetch,
	renderAcDaily,
	attentionTabs,
} from "./popupEvent.js";

async function onReady() {
	localizeHtmlPage(); //global function
	updateVersionIcon(); //更新提醒
	let options = await optionsLoad(); //global function
	//fetchPushContent();
	renderPushInnerHtml(); //稿件动态列表加载
	renderLives(); //生放送列表加载
	renderLiveWatchTimeLst();
	$("#extends-enbaled").prop("checked", options.enabled);
	$("#extends-enbaled").change(onOptionChanged);
	$("#pop-update-log").click(openUpdateLog);
	$("#pop-introduce").click(openIntroduce);
	$("#pop-toArticlePart").click(indexJump);
	$("#pop-toUcenter").click(indexJump);
	$("#pop-toLiveIndex").click(indexJump);
	$("#pop-setting").click(openSetting);
	$("#go-live").click(watchLive);
	$("#pop-title .letter").click(titleToHome);
	$(document).scroll(hideToTopButton);
	$(".toTop").click(clickToTop);
	$("#dougaInfoAcidbtn").click(fetchDougaInfo);
	$("#UserInfoActionBtn").click(userInfoFetch);
	$("#ViewHistoryAction").click(viewHistory);
	$("#WatchLaterFpopup").click(WatchLaterFpopup);
	$("#StopWatchLaterFpopup").click(StopWatchLaterFpopup);
	$("#attentionTabsFg").click(attentionTabs);
	$("#MomentSquareFpop").click(MomentSquareFpop);
	$("#MyBangumiFpop").click(MyBangumiFpop);
	$("#AcDailyFetch").click(renderAcDaily);
	$("#livePageWatchTimeRecList").click(e => { e.target.className === 'liveWatchListItem' && LiveWatchTimeLstReact(e.target.dataset.key, e.target.href) });
	$(".PushListMode").click(PushListDougaMode);
}

document.addEventListener("DOMContentLoaded", function (e) {
	//处理pop页面宽度
	let browser = myBrowser();
	if (browser == "FF") {
		document.getElementById("pop-push").style.width = "95%";
	}
});

$(document).ready(utilAsync(onReady));

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('./ServiceWorker/sworker.js');
//   });
// }

// new Vue({
//   el: '#app',
//   data: {
//       message: 'Hello Vue!'
//   }
// })   
