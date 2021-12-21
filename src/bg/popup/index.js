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
	PushListDougaMode,
	indexJump,
	userInfoFetch,
	attentionTabs,
	unreadNum,
	toUcenter,
	topicSearch,
} from "./popupEvent.js";

async function onReady() {
	const statusDic = { "tabPushList": false, "tabGroupPushList": false, "tabLives": false, "tabSpecial": false }
	let options = await optionsLoad(); //global function
	renderPushInnerHtml(); //稿件动态列表加载
	updateVersionIcon(); //更新提醒
	unreadNum();
	customCss();//自定义popup样式
	$("#extends-enbaled").prop("checked", options.enabled);
	$("#extends-enbaled").change(onOptionChanged);
	options.LocalUserId != "0" && $("#pop-title .Ucenter").show(); $("#pop-title .Ucenter").click(toUcenter);
	$(document).scroll(hideToTopButton);
	$(".toTop").click(clickToTop);
	$("#pop-toArticlePart").click(indexJump);
	$("#pop-toLiveIndex").click(indexJump);
	$("#pop-setting").click(openSetting);
	$("#pop-title .letter").click(titleToHome);
	document.querySelector("#mainTabs").addEventListener("click", (e) => {
		switch (e.target.id) {
			case "tabPushList":
				statusDic.tabPushList = true;
				break;
			case "tabGroupPushList":
				if (statusDic.renderFollowGroup) { return };
				renderFollowGroup();
				$("#followGroups").click(e => { renderGroupPush(e.target.dataset.id) });
				statusDic.tabGroupPushList = true;
				break;
			case "tabLives":
				if (statusDic.tabLives) { return };
				renderLives(); //生放送列表加载
				renderLiveWatchTimeLst();
				document.querySelector("#livePageWatchTimeRecList").addEventListener("click", e => { e.target.dataset.type === "liveWatchListItemReact" && AcFunHelperHelper.activeTabToFront(Number(e.target.dataset.key)) });
				statusDic.tabLives = true;
				break;
			case "tabSpecial":
				if (statusDic.tabSpecial) { return };
				$("#UserInfoActionBtn").click(userInfoFetch);
				document.querySelector("#topicSearchBtn").addEventListener("click", topicSearch);
				$("#ViewHistoryAction").click(viewHistory);
				$("#WatchLaterFpopup").click(WatchLaterFpopup);
				$("#StopWatchLaterFpopup").click(StopWatchLaterFpopup);
				$("#attentionTabsFg").click(attentionTabs);
				statusDic.tabSpecial = true;
				break;
		}
	})
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
	onReady();
});

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
