/* global odhback, localizeHtmlPage, utilAsync, optionsLoad, optionsSave updateVersionIcon*/
import {
	renderPushInnerHtml,
	renderLives,
	renderLiveWatchTimeLst,
	customCss,
	renderFollowGroup,
	renderGroupPush,
	PopupLater,
} from "./renderList.js";
import {
	openSetting,
	onOptionChanged,
	titleToHome,
	clickToTop,
	hideToTopButton,
	viewHistory,
	WatchLaterFpopup,
	StopWatchLaterFpopup,
	LiveWatchTimeLstReact,
	PushListDougaMode,
	indexJump,
	userInfoFetch,
	attentionTabs,
	unreadNum,
	toUcenter,
} from "./popupEvent.js";

async function onReady() {
	renderFollowGroup();
	$("#followGroups").click(e => { renderGroupPush(e.target.dataset.id) })
	localizeHtmlPage(); //global function
	updateVersionIcon(); //更新提醒
	let options = await optionsLoad(); //global function
	renderPushInnerHtml(); //稿件动态列表加载
	renderLives(); //生放送列表加载
	renderLiveWatchTimeLst();
	unreadNum();
	customCss();//自定义popup样式
	$("#extends-enbaled").prop("checked", options.enabled);
	$("#extends-enbaled").change(onOptionChanged);
	$("#pop-toArticlePart").click(indexJump);
	$("#pop-toLiveIndex").click(indexJump);
	$("#pop-setting").click(openSetting);
	$("#pop-title .letter").click(titleToHome);
	options.LocalUserId != "0" && $("#pop-title .Ucenter").show(); $("#pop-title .Ucenter").click(toUcenter);
	$(document).scroll(hideToTopButton);
	$(".toTop").click(clickToTop);
	$("#UserInfoActionBtn").click(userInfoFetch);
	$("#ViewHistoryAction").click(viewHistory);
	$("#WatchLaterFpopup").click(WatchLaterFpopup);
	$("#StopWatchLaterFpopup").click(StopWatchLaterFpopup);
	$("#attentionTabsFg").click(attentionTabs);
	$("#livePageWatchTimeRecList").click(e => { e.target.className === 'liveWatchListItem' && LiveWatchTimeLstReact(e.target.dataset.key, e.target.href) });
	$(".PushListMode").click(PushListDougaMode);
	$(".MultOpen").click(PopupLater);
	$(".MultOpen2").click(PopupLater);
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
