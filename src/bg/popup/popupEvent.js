import { getRelatedTopic } from "../pageHandler/pagehandlerLibs.js";

export function openSetting() {
	//window.open("options.html","_blank");
	var a = $("<a href='options.html' target='_blank'></a>").get(0);
	var e = document.createEvent("MouseEvents");
	e.initEvent("click", true, true);
	a.dispatchEvent(e);
}

export function indexJump() {
	switch (this.id) {
		case 'pop-toLiveIndex':
			var a = $("<a href='https://live.acfun.cn/' target='_blank'></a>").get(0);
			var e = document.createEvent("MouseEvents");
			e.initEvent("click", true, true);
			a.dispatchEvent(e);
			break;
		case 'pop-toArticlePart':
			var a = $("<a href='https://www.acfun.cn/v/list63/index.htm' target='_blank'></a>").get(0);
			var e = document.createEvent("MouseEvents");
			e.initEvent("click", true, true);
			a.dispatchEvent(e);
			break;
		default:
			break;
	}
}

export function titleToHome() {
	window.open("https://www.acfun.cn/");
}

export function toUcenter() {
	window.open("https://www.acfun.cn/member/");
}

export function hideToTopButton() {
	let top = $(".toTop").offset().top;
	if (top < 2000) {
		$(".toTop").css({ opacity: "0" });
		//$(".PushListMode").css({ right: '16px' })
	} else {
		$(".toTop").css({ opacity: "1" });
		//$(".PushListMode").css({ right: '60px' })
	}
}

export function clickToTop() {
	$("html,body").animate({ scrollTop: "0px" }, 600);
}

export async function onOptionChanged(e) {
	if (!e.originalEvent) return;
	let options = await optionsLoad();
	options.enabled = $("#extends-enbaled").prop("checked");
	AcFunHelperHelper.getBackendInst().opt_optionsChanged(options);
}

export async function StopWatchLaterFpopup() {
	mdui.snackbar({
		message: `已撤销本次 稍后再看 排程。`,
	});
	MessageSwitch.sendMessage('fg', { target: "stopWatchLater", params: {}, InvkSetting: { type: "function" } })
}

/**
 * 启动稍后再看
 */
export async function WatchLaterFpopup() {
	chrome.storage.local.get(['watchLater'], function (items) {
		if (items.watchLater) {
			mdui.snackbar({
				message: `已经启动 稍后再看 排程。`,
			});
			MessageSwitch.sendMessage('fg', { target: "watchLater", params: {}, InvkSetting: { type: "function" } })
		}
	})
}

export async function liveInfo() {
	document.querySelector("#liveRoomInfoPrint").children[0]?.remove();
	document.querySelector("#liveRoomInfoWait").style.display = "block";

	const roomUrl = $("#liveRoomInfo").val();
	if (roomUrl == '') { return }
	let uid = new RegExp("[0-9]+").exec(roomUrl);
	if (uid != null && uid.length) {
		uid=uid[0];
	}

	const szwApi = await import("../../common/modulesLib/sizzwooApis.mjs");
	const result = await szwApi.userApis.detail.get(uid);
	const analysisApi = await szwApi.userApis.analysis.get(uid);
	let raw_data = `
	<div class="mdui-table-fluid">
		<table class="mdui-table">
			<thead>
			<tr>
				<th>#</th>
				<th>Data</th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td>UID</td>
				<td><a target="_blank" href="https://www.sizzwoo.cc/u/${result.data.uid}" title="查看详细信息">${result.data.uid}</a></td>
			</tr>
			<tr>
				<td>本次粉丝团增量</td>
				<td>${result.data.clubCountUp}</td>
			</tr>
			<tr>
				<td>本次粉丝增量</td>
				<td>${result.data.fansCountUp}</td>
			</tr>
			<tr>
				<td>小时粉丝增量</td>
				<td>${result.data.fansCountUpHour}</td>
			</tr>
			<tr>
				<td>月直播付费用户</td>
				<td>${analysisApi.data.data.count.premiumUsers}</td>
			</tr>
			<tr>
				<td>月粉丝增量</td>
				<td>${analysisApi.data.data.fansCountUp}</td>
			</tr>
			<tr>
				<td>月粉丝团成员增量</td>
				<td>${analysisApi.data.data.clubCountUp}</td>
			</tr>
			<tr>
				<td>最高同接</td>
				<td>${result.data.maxOnlineCount}</td>
			</tr>
			</tbody>
		</table>
	</div>
		`;
	$("#liveRoomInfoPrint").append(DOMPurify.sanitize(raw_data, { ADD_ATTR: ['target'] }));
	document.querySelector("#liveRoomInfoWait").style.display = "none";
}

/**
 * 稿件信息查询
 */
export async function fetchDougaInfo() {
	document.querySelector("#dougaInfoPrint").children[0]?.remove();

	let acid = $("#dougaInfoAcid").val();
	if (acid == '') { return }
	let achievement;
	let x = new RegExp("ac([0-9]+)").exec(acid);
	if (x != null && x.length) {
		acid = x[1];
	} else {
		acid = new RegExp("[0-9]+").exec(acid)[0];
	}

	MessageSwitch.sendMessage('fg', { target: "achievementEvent", InvkSetting: { responseRequire: true, asyncWarp: true, type: "function" }, params: { action: "get", url: "https://www.acfun.cn/v/ac" + acid } }, (response) => {
		if (response?.length) {
			achievement = `${new Date(response[0].date).getFullYear()}-${new Date(response[0].date).getMonth() + 1}-${new Date(response[0].date).getDate()} ${response[0].tag}`;
		}
	})
	fetch(acfunApis.video.videoInfo + acid).then((res) => {
		if (res.status == 503) {
			alert("请不要过于频繁地请求。");
		}
		return res.text()
	})
		.then((res) => {
			let x = JSON.parse(res);
			if (x.status != 0) {
				alert("这可能不是一个视频稿件的AcID。");
				return
			}
			x = x.result;
			let qualities = "", tags = "";
			for (let i of x.currentVideoInfo.transcodeInfos) {
				qualities += " " + i.qualityType + " (~" + Math.floor(i.sizeInBytes / 1e6) + "MBytes)<br>"
			}
			if (x.tagList) {
				x.tagList.forEach(e => {
					tags += " " + e.name + " "
				})
			}
			const raw_data = `
    <div class="mdui-table-fluid">
        <table class="mdui-table">
            <thead>
            <tr>
                <th>#</th>
                <th>Data</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>标题</td>
                <td><a href="${x.shareUrl}" target="blank" >${x.title}</a></td>
            </tr>
            <tr>
                <td>播放</td>
                <td>${x.viewCount}</td>
            </tr>
            <tr>
                <td>香蕉</td>
                <td>${x.bananaCount}</td>
            </tr>
            <tr>
                <td>发布</td>
                <td>于 ${getTimeSinceNow(x.createTimeMillis, true)} 过审；于 ${getTimeSinceNow(x.videoList[0].uploadTime, true)} 上传</td>
            </tr>
            <tr>
                <td>弹幕</td>
                <td>${x.danmakuCount}</td>
            </tr>
            <tr>
                <td>收藏</td>
                <td>${x.stowCount}</td>
            </tr>
            <tr>
                <td>简介</td>
                <td>${x.description}</td>
            </tr>
            <tr>
                <td>点赞</td>
                <td>${x.likeCount}</td>
            </tr>
            <tr>
                <td>分享</td>
                <td>${x.shareCount}</td>
            </tr>
            <tr>
                <td>VideoId</td>
                <td>${x.currentVideoId}</td>
            </tr>
            <tr>
                <td>画质</td>
                <td>${qualities}</td>
            </tr>
            <tr>
                <td>其他属性</td>
                <td>持续时长：${Math.floor(x.currentVideoInfo.durationMillis / 1000)}秒<br>
				原创：${x.originalDeclare ? 'Y' : 'N'}<br>
				可见性：${x.videoList[0].visibleType == 1 ? 'Y' : 'N'}<br>
				学院奖励：${x.isRewardSupportted ? 'Y' : 'N'}<br>
				文件名：${x.videoList[0].fileName}<br>
				投稿类型：<a href="https://www.acfun.cn/v/list${x.channel.id}/index.htm" target="blank">${x.channel.name}</a><br>
				子分P数：${x.videoList.length} <br>
				合作稿件：${x.staffContribute ? 'Y' : 'N'}
				${tags ? "<br>Tag：" + tags : ""}
				${achievement ? "<br>成就：" + achievement : ""}
				</td>
            </tr>
            </tbody>
        </table>
        </div>
    `;
			$("#dougaInfoPrint").append(raw_data);
		})
}

/**
 * 个人信息查询
 */
export async function userInfoFetch() {
	let uid = $("#userInfoUid").val();
	if (uid == '') { return }
	if (new RegExp("https://www.acfun.cn/u/").test(uid)) {
		uid = REG.userHome.exec(uid)[2];
	}
	document.querySelector("#UserInfoPrint").children[0]?.remove();

	fetch("https://www.acfun.cn/rest/pc-direct/user/userInfo?userId=" + Number(uid)).then((res) => {
		if (res.status == 503) {
			alert("您操作太过频繁。");
		} return res.text()
	})
		.then(async (res) => {
			let x = JSON.parse(res);
			if (x.result != 0) {
				alert("UID可能存在着某些问题。");
				return
			}
			const extendInfo = JSON.parse(await fetchResult(acfunApis.live.liveInfo + Number(uid)));
			let raw_data = `
		<div class="mdui-table-fluid">
			<table class="mdui-table">
				<thead>
				<tr>
					<th>#</th>
					<th>Data</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>UID</td>
					<td>${x.profile.userId}</td>
				</tr>
				<tr>
					<td>用户名</td>
					<td>${x.profile.name}</td>
				</tr>
				<tr>
					<td>注册</td>
					<td>${getTimeSinceNow(x.profile.registerTime, true)}</td>
				</tr>
				<tr>
					<td>最近登录于</td>
					<td>${getTimeSinceNow(x.profile.lastLoginTime, true)}</td>
				</tr>
				<tr>
					<td>签名</td>
					<td>${(x.profile.signature)}</td>
				</tr>
				<tr>
					<td>认证</td>
					<td>${x.profile.verifiedText}</td>
				</tr>
				<tr>
					<td>关注</td>
					<td>${x.profile.following}</td>
				</tr>
				<tr>
					<td>粉丝</td>
					<td>${extendInfo?.user.fanCountValue ?? x.profile.followed}</td>
				</tr>
				<tr>
					<td>稿件</td>
					<td>${x.profile.contentCount}</td>
				</tr>
				<tr>
					<td>其他信息</td>
					<td>
					${x.profile.likeCount ? "<br>获赞数：" + x.profile.likeCount : ""}
					${x.profile.isContractUp ? "<br>签约Up：" + (x.profile.isContractUp ? "Yes" : "No") : ""}
					${x.profile.liveId ? "直播流id：" + x.profile.liveId : ""}
					</td>
				</tr>
				</tbody>
			</table>
		</div>
			`;
			$("#UserInfoPrint").append(DOMPurify.sanitize(raw_data));
		})

}

export async function topicSearch() {
	let queryString = $("#topicSearch").val();
	if (queryString == '') { return }
	const result = await getRelatedTopic(queryString);
	let elements = "";
	for (let e in result) {
		elements += `<tr>
			<td><a href="${result[e].url}" target="_blank">${result[e].title}</td>
		</tr>`;
	}
	$("#topicSearchResult").append(DOMPurify.sanitize(`
	<div class="mdui-table-fluid">
		<table class="mdui-table">
			<thead>
			<tr>
				<th>结果</th>
			</tr>
			</thead>
			<tbody>
			${elements}
			</tbody>
		</table>
	</div>
	`, { ADD_ATTR: ['target'] }));
}

/**
 * 稿件动态推送列表筛选模式
 */
export function PushListDougaMode() {
	//$('.PushListMode').addClass('active');
	//clearPushListDougaButtonClass();
	let e = document.createElement("style");
	e.type = 'text/css';
	e.id = "PushListDougaModeStyle";
	e.textContent = ""
	document.head.appendChild(e)
	switch ($('.PushListMode')[0].dataset.type) {
		case "all":
			$(".PushListMode")[0].dataset.type = "video";
			document.getElementById("PushListDougaModeStyle").remove();
			e.textContent = `
			.article{display:none}
			`;
			$(".PushListMode")[0].title = "仅查看视频"
			document.head.appendChild(e);
			mdui.snackbar({
				message: `仅查看视频投稿。`,
			});
			break;
		case "video":
			$(".PushListMode")[0].dataset.type = "article";
			document.getElementById("PushListDougaModeStyle").remove()
			e.textContent = ".video{display:none}"
			$(".PushListMode")[0].title = "仅查看文章"
			document.head.appendChild(e);
			mdui.snackbar({
				message: `仅查看文章投稿。`,
			});
			break;
		case "article":
			$(".PushListMode")[0].dataset.type = "all";
			$(".PushListMode")[0].title = "全部投稿"
			document.getElementById("PushListDougaModeStyle").remove();
			mdui.snackbar({
				message: `查看全部类型投稿。`,
			});
			break;
	}
}

export function unreadNum() {
	let x = JSON.parse(localStorage.getItem("UnreadNum"));
	if (x == null) {
		return;
	}
	if (x.comment != 0) {
		document.querySelector("#msg-comment").style.display = 'block'
		document.querySelector("#notification-msg-comment").innerText = DOMPurify.sanitize(x.comment);
	}
	if (x.content_notify != 0) {
		document.querySelector("#msg-sysnotif").style.display = 'block'
		document.querySelector("#notification-msg-sysnotif").innerText = DOMPurify.sanitize(x.content_notify);
	}
	if (x.like != 0) {
		document.querySelector("#msg-likecount").style.display = 'block'
		document.querySelector("#notification-msg-likecount").innerText = DOMPurify.sanitize(x.like);
	}
	if (x.system_notify != 0) {
		document.querySelector("#msg-announce").style.display = 'block'
		document.querySelector("#notification-msg-announce").innerText = DOMPurify.sanitize(x.system_notify);
	}
}

/**
 * 主站标签列队前台调用
 */
export function attentionTabs() {
	chrome.windows.getCurrent({}, function (e) {
		MessageSwitch.sendMessage('fg', { target: "attentionTabs", params: { windowId: e.id }, InvkSetting: { type: "function" } })
	})
}

let timer = null;
function clearPushListDougaButtonClass() {
	timer && clearTimeout(timer);
	timer = setTimeout(() => {
		$('.PushListMode').removeClass('active')
	}, 4500)
}