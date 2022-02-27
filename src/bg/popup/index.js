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
	liveInfo,
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
	document.querySelector("#mainTabs").addEventListener("click", (e) => {
		switch (e.target.id) {
			case "tabPushList":
				statusDic.tabPushList = true;
				break;
			case "tabGroupPushList":
				if (statusDic.renderFollowGroup) { return };
				renderFollowGroup();
				$("#followGroups").on("click", e => { renderGroupPush(e.target.dataset.id) });
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
				$("#UserInfoActionBtn").on("click", userInfoFetch);
				$("#dougaInfoAcidbtn").on("click", fetchDougaInfo);
				document.querySelector("#topicSearchBtn").addEventListener("click", topicSearch);
				$("#liveRoomInfoBtn").on("click", liveInfo);
				$("#WatchLaterFpopup").on("click", WatchLaterFpopup);
				$("#StopWatchLaterFpopup").on("click", StopWatchLaterFpopup);
				$("#attentionTabsFg").on("click", attentionTabs);
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

// const Counter = {
// 	data() {
// 		return {
// 			message: "Test"
// 		}
// 	}
// }

// /**@type {import("../../../declares/Vue/VueRuntimeCore").App} */
// const app = Vue.createApp(Counter);
// app.mount("#app")
