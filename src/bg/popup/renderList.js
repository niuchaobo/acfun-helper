var pushListData = {
	index: 1, // 推送当前页码
	innerText: null,
	busy: false, // 当前忙
	firstLoad: true, // 第一次加载推送列表
	arriveEnd: false, // 到达终点
};
var groupPushListData = {
	index: 0,
	innerText: "",
	busy: false,
	firstLoad: true,
	arriveEnd: false,
};

var popupLater = {};

/**
 * 渲染关注分组选单内容
 */
export async function renderFollowGroup() {
	let rawRes = await fetchResult("https://www.acfun.cn/rest/pc-direct/relation/getGroups");
	let Res = JSON.parse(rawRes);
	for (let i = 0; i < Res.groupList.length; i++) {
		$("#followGroups").append(
			`
			<li class="mdui-menu-item">
			<a class="mdui-ripple" data-count="${Res.groupList[i].followingCount}" data-id="${Res.groupList[i].groupId}">${Res.groupList[i].groupName}</a>
			</li>
		`
		);
	}
}

function PharseGroupPushData(res) {
	let xmlData = "";
	for (let i = 0; i < res.feedList.length; i++) {
		let data = res.feedList[i];
		let dougaType = data.isArticle ? "article" : "video";
		xmlData = '<div class="inner ' + dougaType + '" id="';
		xmlData +=
			data.aid +
			'" data-type="' + data.isArticle + '">' +
			'<label title="加入批量打开队列" class="mdui-checkbox popupLater"><input type="checkbox"><i class="mdui-checkbox-icon"></i></label>' +
			'<div class="l"><a target="_blank" href="';
		xmlData += `https://www.acfun.cn${data.isArticle ? "/a/ac" : "/v/ac"}` + data.cid + '"';
		xmlData += ' class="thumb thumb-preview"><img class="lazyload preview" data-aid="';
		xmlData +=
			data.aid +
			//<label title="等下就打开" class="mdui-checkbox popupLater"><input type="checkbox"><i class="mdui-checkbox-icon"></i></label>
			'" src="' + './images/prpr.jpg' + '" data-src="' + data.titleImg + '" style="width:100%"> <div class="cover"></div> </a> </div> <div class="r"> <a data-aid="' + data.aid + ' "target="_blank" href="' + `https://www.acfun.cn${data.isArticle ? "/a/ac" : "/v/ac"}` +
			data.cid +
			'" class="title">';
		xmlData +=
			data.title +
			'</a> </p> <div class="info"><a target="_blank" data-uid="';
		xmlData +=
			data.aid +
			'" href="https://www.acfun.cn/u/' +
			data.userId +
			'" class="name"> ';
		xmlData +=
			data.username +
			' </a><span class="time">' +
			getTimeSinceNow(data.releaseDate, true, false) +
			"发布</span> </div> </div> </div> ";
		groupPushListData.innerText += xmlData;
	}
	$("#pop-groupPush").append(groupPushListData.innerText);
	groupPushListData.innerText = "";
}

/**
 * 渲染分组投稿动态具体内容
 * @param {string} gid 
 */
export async function renderGroupPush(gid) {
	$("#pop-groupPush").empty();
	groupPushListData.innerText = "";
	let raw = await fetchResult(`https://www.acfun.cn/rest/pc-direct/feed/followFeed?isGroup=1&gid=${gid}&count=10&pcursor=1`);
	groupPushListData.index = 1
	let res = JSON.parse(raw);
	PharseGroupPushData(res);
	$("img.lazyload").lazyload({ threshold: 0.2 });
	window.onscroll = () => {
		if (document.querySelector("#tabGroupPushList").classList[1] == "mdui-tab-active") {
			if (
				(getScrollHeight() == Math.floor(getDocumentTop() + getWindowHeight()) ||
					getScrollHeight() == Math.ceil(getDocumentTop() + getWindowHeight()))
			) {
				groupPushListData.index++;
				fetch(`https://www.acfun.cn/rest/pc-direct/feed/followFeed?isGroup=1&gid=${gid}&count=10&pcursor=${groupPushListData.index}`).then((data) => { return data.text() })
					.then((data) => {
						PharseGroupPushData(JSON.parse(data));
						$("img.lazyload").lazyload({ threshold: 0.2 });
					})
			}
		}
	};
	$(".popupLater").click(e => {
		popupLaterHandler(e, ".MultOpen2")
	});

}

/**
 * 稿件动态信息渲染
 */
export async function renderPushInnerHtml() {
	pushListData.busy = true;
	if (pushListData.index == 1) {
		try {
			var p1data = await db_getPushListHtml();
		} catch (error) {
			var p1data = [];
		}
		if (p1data.length != 0) {
			pushListData.index++;
			$("#pop-push").append(p1data[0].content);
		}
	}
	fetch(
		"https://www.acfun.cn/rest/pc-direct/feed/followFeed?isGroup=0&gid=-1&count=30&pcursor=" +
		pushListData.index
	)
		.then((res) => {
			return res.text();
		})
		.then((res) => {
			let rawdata = JSON.parse(res);
			if (rawdata.feedList.length === 0) {
				pushListData.arriveEnd = true;
				$("#pop-push").append(
					'<p class="push_end" style="text-align: center;margin: 5px 5px 5px 5px;">没有更多数据了</p>'
				);
				return;
			}
			pushListData.innerText = "";
			for (let i = 0; i < rawdata.feedList.length; i++) {
				let data = rawdata.feedList[i];
				let xmlDataTemplateString = `<div class="inner ${data.isArticle ? "article" : "video"}" id="${data.aid}" data-type="${data.isArticle}" >
                    <label title="稍后打开" class="mdui-checkbox popupLater">
                        <input type="checkbox">
                        <i class="mdui-checkbox-icon"></i>
                    </label> 
                    <div class="l">
                        <a target="_blank" href="https://www.acfun.cn${data.isArticle ? '/a/ac' : '/v/ac'}${data.cid}" class="thumb thumb-preview">
                            <img class="lazyload preview" data-aid=${data.aid} src = './images/prpr.jpg' data-src = ${data.titleImg} style='width:100%'>
                            <div class="cover"></div> 
                        </a> 
                    </div> 
                    <div class="r"> 
                        <a data-aid=${data.aid} target="_blank" href="https://www.acfun.cn${data.isArticle ? "/a/ac" : "/v/ac"}${data.cid}" class="title">
                            ${data.title}
                        </a> 
                        <div class="info">
                            <a target="_blank" data-uid=${data.aid} href="https://www.acfun.cn/u/${data.userId}" class="name">
                                ${data.username}
                            </a>
                            <span class="time">
                                ${getTimeSinceNow(data.releaseDate, true, false)}发布
                            </span>
                        </div>
                    </div>          
                </div>`
				pushListData.innerText += xmlDataTemplateString;
			}
			$("#pop-push").append(pushListData.innerText);
			pushListData.index++
			setTimeout(() => {
				pushListData.busy = false;
			}, 0);
			if (pushListData.firstLoad) {
				setTimeout(() => {
					$(window).bind("scroll", (e) => {
						if (document.querySelector("#tabPushList").classList[1] == "mdui-tab-active") {
							if (pushListData.busy || pushListData.arriveEnd) {
								return;
							}
							pushListData.firstLoad = false;
							let scrollTop = $(window).scrollTop();
							if (scrollTop + 10 > $(document).height() - $(window).height()) {
								pushListData.busy = false;
								renderPushInnerHtml();
							}
						}
					});
				}, 0);
			}
			$("img.lazyload").lazyload({ threshold: 0.2 });
			$(".popupLater").click(e => {
				popupLaterHandler(e)
			});
		});
}

function popupLaterHandler(e, buttonClassName = ".MultOpen") {
	if (e.target.type != 'checkbox') {
		return
	}
	let targetID, targetUrl;
	targetID = e.target.offsetParent.offsetParent.id;
	targetUrl = e.target.offsetParent.offsetParent.children[1].children[0].href;
	e.target.checked ? popupLater[targetID] = targetUrl : delete popupLater[targetID];
	Object.keys(popupLater).length ? $(buttonClassName).show() : $(buttonClassName).hide();
}

/**
 * 渲染直播开播的直播间信息
 */
export function renderLives() {
	chrome.storage.local.get(["broadcastingUIDlist"], function (data) {
		let No_data = "";
		let is_blank = true;
		let list_num = 0;
		for (let item in data.broadcastingUIDlist) {
			list_num++;
			data.broadcastingUIDlist[item] ? (is_blank = false) : "";
		}
		No_data =
			list_num === 0
				? '<a href = "options.html" target = "_blank" style="color:black"> <center style="padding:5px">前往助手添加你的第一个关注吧</center></a>'
				: '<a href = "https://live.acfun.cn/" target = "_blank" style="color:#aaa"> <center style="padding:5px">主播正在路上,去直播首页逛逛吧</center></a>';
		is_blank ? $("#pop-push-lives").append(No_data) : "";
		for (let i in data.broadcastingUIDlist) {
			if (data.broadcastingUIDlist[i] == true) {
				fetch("https://live.acfun.cn/api/live/info?authorId=" + i)
					.then((res) => {
						return res.text();
					})
					.then((res) => {
						let live_Data = "";
						let livedata = JSON.parse(res);
						let livexmlData = '<div class="inner" id="';
						livexmlData +=
							livedata.user.id +
							'">' +
							'<label title="稍后打开" class="mdui-checkbox popupLater"><input type="checkbox"><i class="mdui-checkbox-icon"></i></label>' +
							'<div class="l"><a target="_blank" href="';
						livexmlData +=
							"https://live.acfun.cn/live/" + livedata.user.id + '"';
						livexmlData += ' class="thumb thumb-preview"><img data-aid="';
						livexmlData +=
							livedata.user.id +
							'" src="' +
							livedata.coverUrls[0] +
							'" class="preview"> <div class="cover"></div> </a> </div> <div class="r"> <a data-aid="' +
							livedata.user.id +
							' "target="_blank" href="' +
							"https://live.acfun.cn/live/" +
							livedata.user.id +
							'" class="title">';
						livexmlData +=
							livedata.title +
							'</a> </p> <div class="info"><a target="_blank" data-uid="';
						livexmlData +=
							livedata.user.id +
							'" href="https://www.acfun.cn/u/' +
							livedata.user.id +
							'" class="name">';
						livexmlData += livedata.user.name + " </a></div> </div> </div> ";
						live_Data += livexmlData;
						$("#pop-push-lives").append(live_Data);
					});
			}
		}
	});
	chrome.storage.local.get(["broadcastingUIDlistFollowing"], function (data) {
		let x = data.broadcastingUIDlistFollowing;
		let y = Object.keys(data.broadcastingUIDlistFollowing);
		for (let i = 0; i <= y.length - 1; i++) {
			if (x[y[i]]) {
				fetch("https://live.acfun.cn/api/live/info?authorId=" + y[i])
					.then((res) => { return res.text() })
					.then((res) => {
						let live_Data = "";
						let livedata = JSON.parse(res);
						let livexmlData = '<div class="inner" id="';
						livexmlData +=
							livedata.user.id +
							'">' +
							'<div class="l"><a target="_blank" href="';
						livexmlData +=
							"https://live.acfun.cn/live/" + livedata.user.id + '"';
						livexmlData += ' class="thumb thumb-preview"><img data-aid="';
						livexmlData +=
							livedata.user.id +
							'" src="' +
							livedata.coverUrls[0] +
							'" class="preview"> <div class="cover"></div> </a> </div> <div class="r"> <a data-aid="' +
							livedata.user.id +
							' "target="_blank" href="' +
							"https://live.acfun.cn/live/" +
							livedata.user.id +
							'" class="title">';
						livexmlData +=
							livedata.title +
							'</a> </p> <div class="info"><a target="_blank" data-uid="';
						livexmlData +=
							livedata.user.id +
							'" href="https://www.acfun.cn/u/' +
							livedata.user.id +
							'" class="name">';
						livexmlData += livedata.user.name + " </a></div> </div> </div> ";
						live_Data += livexmlData;
						$("#pop-push-lives2").append(live_Data);
					})
			}
		}
	})
}

export function PopupLater() {
	let x = Object.keys(popupLater);
	for (let i = 0; i < x.length; i++) {
		chrome.tabs.create({ url: popupLater[x[i]] });
	}
}

/**
 * 渲染直播观看时间计分板
 */
export async function renderLiveWatchTimeLst() {
	let x = await getStorage("LiveWatchTimeRec_popup");
	if (!x.LiveWatchTimeRec_popup) { return }
	chrome.runtime.sendMessage({ action: "updateLiveWatchTimeListItem", params: { responseRequire: true, asyncWarp: true } }, function (resp0) {
		if (resp0.data == true) {
			chrome.runtime.sendMessage({ action: "getLiveWatchTimeList", params: { responseRequire: true, asyncWarp: false } }, function (resp) {
				var raw_data = "";
				let lwList = Object.keys(resp.data)
				for (let i in lwList) {
					var raw_data = raw_data + `
            <tr>
                <td><a class="liveWatchListItem" data-key="${[lwList[i]]}" title="切换到标签页"  href="${resp.data[lwList[i]].url}">[切换]</a> ${resp.data[lwList[i]].title}</td>
                <td>${getTimeSinceNow(resp.data[lwList[i]].startTime, true, true, 'h')}</td>
            </tr>
          `;
				}
				$("#livePageWatchTimeRecList").append(raw_data);
			})
		}
	})
}

export async function customCss() {
	let x = await getStorage("custom_css");
	if (!x.custom_css) { return }
	chrome.storage.local.get(['custom_css_style'], function (i) {
		try {
			createElementStyle(i.custom_css_style);
		} catch (error) {
			console.log(error);
		}
	})
}