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
	let newOptions = await getBackendInst().opt_optionsChanged(options);
	optionsSave(newOptions);
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

export async function viewHistory() {
	fetch('https://www.acfun.cn/rest/pc-direct/browse/history/list', { method: "POST", credentials: 'include', body: 'pageSize=20&pageNo=1&resourceTypes=', headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }) })
		.then((res => { return res.text() }))
		.then((res) => {
			let x = JSON.parse(res);
			var raw_data = "";
			for (let i = 0; i < x.histories.length - 1; i++) {
				if (x.histories[i].disable == true || x.histories[i].bangumiItemTitle != "") {
					continue;
				}
				var raw_data = raw_data + `
				<tr>
					<td class="dispLimit">${x.histories[i].user.name}<br>于${getTimeSinceNow(x.histories[i].browseTime, true, false)}</td>
					<td><a title="Up: ${x.histories[i].user.name}" href="https://www.acfun.cn/v/ac${x.histories[i].resourceId}" target="_blank">《${x.histories[i].title}》</a> </td>
				</tr>
				`;
			}
			$("#ViewHistory").append(raw_data);
			$("#ViewHistoryAction").hide();
		})
}

/**
 * 个人信息查询
 */
export async function userInfoFetch() {
	let uid = $("#userInfoUid").val();
	if (uid == '') { return }
	fetch("https://www.acfun.cn/rest/pc-direct/user/userInfo?userId=" + Number(uid)).then((res) => {
		if (res.status == 503) {
			MessageSwitch.sendMessage('fg', { target: "notic", params: { title: "AcFun助手", msg: "您操作太过频繁。" }, InvkSetting: { type: "function" } });
		} return res.text()
	})
		.then((res) => {
			let x = JSON.parse(res);
			if (x.result != 0) {
				MessageSwitch.sendMessage('fg', { target: "notic", params: { title: "AcFun助手", msg: "UID可能存在着某些问题。" }, InvkSetting: { type: "function" } });
				return
			}
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
					<td>签名</td>
					<td>${(x.profile.signature)}</td>
				</tr>
				<tr>
					<td>认证</td>
					<td>${x.profile.verifiedText} - ${x.profile.verifiedTypes.indexOf(1) != -1 ? "猴子" : ""} - ${x.profile.isContractUp ? "学院Up" : ""}</td>
				</tr>
				<tr>
					<td>关注</td>
					<td>${x.profile.following}</td>
				</tr>
				<tr>
					<td>粉丝</td>
					<td>${x.profile.followed}</td>
				</tr>
				<tr>
					<td>稿件数</td>
					<td>${x.profile.contentCount}</td>
				</tr>
				</tbody>
			</table>
		</div>
			`;
			$("#UserInfoPrint").append(raw_data);
		})

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
export function LiveWatchTimeLstReact(id, url) {
	chrome.tabs.update(Number(id), {
		'selected': true
	});
}
