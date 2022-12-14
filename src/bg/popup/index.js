import {
	updateVersionIcon,
	renderPushInnerHtml,
	renderLives,
	renderLiveWatchTimeLst,
	customCss,
	renderFollowGroup,
	renderGroupPush,
	PopupLater,
} from "./renderList.js";
import {
	onOptionChanged,
	titleToHome,
	clickToTop,
	hideToTopButton,
	fetchDougaInfo,
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
	$(document).on("scroll", hideToTopButton);
	$(".toTop").on("click", clickToTop);
	$("#pop-toArticlePart").on("click", indexJump);
	$("#pop-toLiveIndex").on("click", indexJump);
	$("#pop-setting").on("click", indexJump);
	$("#pop-title .letter").on("click", titleToHome);
	document.querySelector("#tabPushList").addEventListener("click", () => {
		statusDic.tabPushList = true;
	})
	document.querySelector("#tabGroupPushList").addEventListener("click", () => {
		if (statusDic.renderFollowGroup) { return };
		renderFollowGroup();
		$("#followGroups").on("click", e => { renderGroupPush(e.target.dataset.id) });
		statusDic.tabGroupPushList = true;
	})
	document.querySelector("#tabLives").addEventListener("click", () => {
		if (statusDic.tabLives) { return };
		renderLives(); //生放送列表加载
		renderLiveWatchTimeLst();
		document.querySelector("#livePageWatchTimeRecList").addEventListener("click", e => { e.target.dataset.type === "liveWatchListItemReact" && AcFunHelperHelper.activeTabToFront(Number(e.target.dataset.key)) });
		statusDic.tabLives = true;
	})
	document.querySelector("#tabSpecial").addEventListener("click", () => {
		if (statusDic.tabSpecial) { return };
		$("#UserInfoActionBtn").on("click", userInfoFetch);
		$("#dougaInfoAcidbtn").on("click", fetchDougaInfo);
		document.querySelector("#topicSearchBtn").addEventListener("click", topicSearch);
		$("#WatchLaterFpopup").on("click", WatchLaterFpopup);
		$("#StopWatchLaterFpopup").on("click", StopWatchLaterFpopup);
		$("#attentionTabsFg").on("click", attentionTabs);
		statusDic.tabSpecial = true;
	})

	$(".PushListMode").click(PushListDougaMode);
	$(".MultOpen").click(PopupLater);
	$(".MultOpen2").click(PopupLater);
}

document.addEventListener("DOMContentLoaded", function (e) {
	//处理pop页面宽度
	let browser = ToolBox.thisBrowser();
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
