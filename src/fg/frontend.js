class ODHFront {
	constructor() {
		this.options = null;
		this.href = null;
		this.div = new Div(); //右侧助手
		this.block = new Block(); //up主过滤
		this.pageBeautify = new PageBeautify(); //界面美化
		this.videoPageBeautify = new videoPageBeautify();//视频页界面美化
		this.livePageBeautify = new LivePageButfy(); //生放送界面美化
		this.ce = new CommentEnhance(); //评论区增强
		this.download = new Download(); //下载(视频、封面)
		this.live = new Live(); //直播
		this.authInfo = new AuthInfo(); //必要信息获取
		this.banana = new Banana(); //自动投蕉
		this.videoSetting = new VideoSetting(); //视频播放设置：自定义倍速、观影模式等
		this.danmaku = new Danmaku(); //弹幕服务
		this.danmusearch = new Search();//弹幕列表搜索
		this.luckyTurntab = new LuckyTtab(); //幸运轮盘（抽奖）
		this.reader = new Reader(); //文章区阅读模式
		this.musicPlayerFront = new musicPlayerFront();

		chrome.runtime.onMessage.addListener(this.onBgMessage.bind(this)); //接收来自后台的消息
		window.addEventListener("message", (e) => this.onFrameMessage(e)); //接收来自iframe的消息

		this.loading()

		//监听storage变化,可用于数据云同步
		// chrome.storage.onChanged.addListener(function (changes, areaName) {
		// 	console.log('11111111111111111')
		// 	console.log(document.cookie);
		// });
	}

	onBgMessage(request, sender, callback) {
		const { action, params } = request;
		const method = this["api_" + action];
		if (typeof method === "function") {
			params.callback = callback;
			method.call(this, params);
		}
		callback();
	}

	onFrameMessage(e) {
		const { action, params } = e.data;
		const method = this["api_" + action];
		if (typeof method === "function") {
			method.call(this, params);
		}
	}

	/**
	 * 全局样式
	 */
	addStyle() {
		let str =
			".comment-mark-parent{bottom: -80px!important;}" +
			"#mark-div{top:50%;left:50%;display:none;position:fixed;z-index:999999}" +
			"span.simple {background-color: #d69acc !important;}" +
			"span.pos {display:inline;font-size: 0.9em;margin: 5px;line-height: 18px;padding: 0px 4px;color: white;border-radius: 14px;}" +
			".ext-filter-up{display:inline-block;vertical-align:middle;width:30px;height:18px;font-size:13px;line-height:18px;color:#4a8eff;cursor:pointer;margin-left:5px;}" +
			"span.pos.up {background-color: #66ccff !important;}" +
			"p.crx-guid-p{height: 20px !important;line-height: 20px !important;padding: 7px 12px !important;text-align:center;}" +
			"p.crx-member-p{height: 20px !important;line-height: 20px !important;}" +
			//<a>标签柔和动画
			"a {transition: color .2s ease, background-color .2s ease;}" +
			"";
		createElementStyle(str);
	}

	async loading() {
		this.options = await optionsLoad()
		if (!this.options.enabled) {
			return
		}
		this.href = window.location.href;
		//页面未加载完成式执行的方法 (提前注入的css/dom..)
		//this.unLoad()
		//页面的全部资源加载完后才会执行 包括 图片 视频等
		window.addEventListener("load", (e) => {
			this.onLoad(e);
			!this.options.krnl_videossEarly && this.onACPlayerLoaded(e);
		});
		//Dom 渲染完即可执行 此时图片视频还可能没加载完
		document.addEventListener("DOMContentLoaded", (e) => {
			this.onDomContentLoaded(e);
			this.options.krnl_videossEarly && this.onACPlayerLoaded(e);
		});
		//整个页面URL改变之后的方法
		// window.addEventListener("popstate", function(e){
		// 	this.onPagechanged();
		// });

		//Uid获取
		try {
			var UidInCookies = document.cookie.match("auth_key=(.*); ac_username")[1];
		} catch (TypeError) {
			var UidInCookies = 0;
		}
		chrome.storage.local.set({ LocalUserId: `${UidInCookies}` });
	}

	onACPlayerLoaded(e) {
		if (REG.videoAndBangumi.test(this.href)) {
			let isLogin = false;
			getAsyncDom('#ACPlayer .control-bar-top .box-right', () => {
				if (isLoginByUi(false)) {
					isLogin = true;
				}
				//在视频播放页面监听播放器状态(是否全屏)，控制助手按钮是否显示
				//FIXME:页面onload执行前打开全屏，导致助手按钮首次显示不会被隐藏
				this.videoSetting.monitorFullScreen();
				//自定义倍速
				this.options.custom_rate && this.videoSetting.customPlaybackRate();
				//倍速切换的快捷键
				this.options.PlaybackRateKeysw && this.videoSetting.PlaybackRateKeyCode(this.options.custom_rate_keyCode)
				//AB回放
				this.options.ABPlaysw && this.videoSetting.addABPlayUI();
				//画中画
				this.videoSetting.callPicktureInPictureMode();
				//全局进度条
				this.options.ProgressBarsw && this.videoSetting.flexProgressBar(this.options.ProgressBarStyle);
				//画质策略
				this.videoSetting.videoQuality(isLogin);
				//自动点赞
				this.options.LikeHeart && this.banana.LikeHeartFront("video", isLogin);
			}, 200)
			this.onPlayerUrlChange();
		}
	}

	onDomContentLoaded(e) {
		// console.log("options",this.options);
		//历史观看记录-本地获取
		// this.authInfo.historyView();
		let href = this.href;
		//添加自定义样式
		this.addStyle();
		this.options.Dev_thinScrollbar && this.pageBeautify.thinScrollBar();
		//屏蔽功能
		this.options.filter && this.block.injectScript();
		//首页
		if (REG.index.test(href)) {
			window.onload = () => {
				//开启右侧导航
				this.options.beautify_nav && this.pageBeautify.navBeautify();
			}
			//隐藏ad
			this.options.hideAd && this.pageBeautify.hideAds();
			//首页nav高斯模糊
			this.options.Dev_indexBlurSW && this.pageBeautify.indexBeautify(false);
			return
		}
		//分区首页
		if (REG.partIndex.test(href) || REG.articleDetail.test(href)) {
			this.options.articlePartIndexDarken && this.pageBeautify.darkenArticlePartIndex();
			//隐藏ad
			this.options.hideAd && this.pageBeautify.hideAds();
			//分区首页nav高斯模糊
			this.options.Dev_indexBlurSW && this.pageBeautify.indexBeautify(true);
			//快捷键翻页
			this.options.pageTransKeyBind && this.pageBeautify.pageTransKeyBind("depList");
			return
		}
		//视频
		if (REG.video.test(href)) {
			//播放器和弹幕功能
			this.options.autoOpenVideoDescsw && this.videoPageBeautify.openVideoDesc();
			this.options.autoJumpLastWatchSw && this.videoSetting.jumpLastWatchTime();
			//音乐播放器监听
			this.musicPlayerFront.main();
			//隐藏ad
			this.options.hideAd && this.pageBeautify.hideAds();
			this.options.playerRecommendHide && this.pageBeautify.simplifiyPlayerRecm();
			return
		}
		//直播
		if (REG.live.test(href)) {
			this.options.liveCommentTimeTag && this.livePageBeautify.commentTimeTag();
			return
		}
		//直播站功能
		if (REG.live.test(href) && this.options.livePlayerEnhc) {
			let timer = setInterval(() => {
				let checknode = $('div.box-right');
				if (checknode.length > 0) {
					this.livePageBeautify.appendWidePlayer();
					this.livePageBeautify.simplifyDanmu();
					if (this.options.LiveWatchTimeRec_popup) {
						this.live.watchTimeRecord();
					}
					clearInterval(timer);
				}
			}, 3000)
		}
		if (!REG.live.test(href) && !REG.liveIndex.test(href)) {
			//首页个人资料弹框 (未完成)
			this.options.beautify_personal && getAsyncDom('#header .header-guide .guide-item', () => {
				this.pageBeautify.addMouseAnimation()
				this.pageBeautify.personBeautify();
			})
		}
		//个人中心首页
		if (REG.userHome.test(href)) {
			this.options.userHomeMoment && this.pageBeautify.userMoment(href);
			this.options.userCenterBeautify && this.pageBeautify.userCenterBeautify();
			this.options.widenUCVideoList && this.pageBeautify.widenUCVideoList();
			this.options.Dev_indexBlurSW && this.pageBeautify.indexBeautify(false, true);
			this.options.pageTransKeyBind && this.pageBeautify.pageTransKeyBind("uc");
		}
	}

	onLoad(e) {
		//根据cookie判断当前登录用户是不是up
		//let is_up = this.adjuatUp();
		let href = this.href;
		this.authInfo.cookInfo();
		//音乐播放器
		if (REG.player.test(href)) {
			this.musicPlayerFront.hookListener();
			return;
		}
		//开启屏蔽功能
		this.options.filter && this.block.block();
		var pageInfo = null;
		//视频 TODO:这玩意儿到底是个啥！？
		if (REG.video.test(href)) {
			var div = document.createElement('div');
			div.style.display = "none";
			let uuid = uuidBuild();
			div.id = uuid;
			document.body.appendChild(div);
			div.setAttribute('onclick', "document.getElementById('" + uuid + "').innerText=JSON.stringify(window.pageInfo)");
			div.click();
			pageInfo = JSON.parse(document.getElementById(uuid).innerText);
			document.body.removeChild(div);
			let currentVideoInfo = pageInfo.currentVideoInfo;
			let title = pageInfo.title;
			if (currentVideoInfo == undefined || currentVideoInfo == "" || currentVideoInfo == null) {
				return;
			}
			let isUp = adjustVideoUp();
			this.div.show(pageInfo, this.options, 'video', isUp);
			let ConfKey = 'wsyeKfnoCtnemmoCeQ'
			var curKeyName = ConfKey.split("").reverse().join("");
			if (this.options[curKeyName]) {
				this.ce.immedComt();
			}
			this.options.commentPageEasyTrans && this.onCommentAreaLoaded();
		}
		//文章
		if (REG.article.test(href)) {
			let isUp = adjustArticleUp();
			this.div.show(pageInfo, this.options, 'article', isUp);
			this.options.picDrag && this.reader.picDrag(this.options.picRotate);
			this.options.LikeHeart && this.banana.LikeHeartFront("article");
			this.options.uddPopUp && this.ce.uddPopUp(Number(this.options.uddPopUptype), true);
			this.options.articleReadMode && this.reader.lightReadMode();
			if (this.options.articleBanana) {
				setTimeout(() => {
					this.banana.articleBanana({ key: REG.acAid.exec(href)[2] })
				}, 1000);
			}
			this.options.commentPageEasyTrans && this.onCommentAreaLoaded();
			this.options.pageTransKeyBind && this.pageBeautify.pageTransKeyBind("depList");
			this.options.quickCommentSubmit && this.pageBeautify.quickCommentSubmit();
			return
		}
		//直播
		if (REG.live.test(href)) {
			$(".open-app-confirm").hide();
			this.div.show(pageInfo, this.options, 'live', '');
			this.options.LiveUserFocus && this.livePageBeautify.followMe();
			this.options.liveMediaSession && this.live.liveMediaSession(href);
			//直播画中画模式
			this.livePageBeautify.callPicktureInPictureModeForLive()
			this.options.quickCommentSubmit && this.pageBeautify.quickCommentSubmit("live");
			return
		}
		//直播首页
		if (REG.liveIndex.test(href) && !REG.live.test(href)) {
			//直播ad屏蔽
			this.options.liveHideAd && this.livePageBeautify.LivehideAds(this.options.liveHideAdType, this.options.liveHideAdMute);
			//直播站首页用户屏蔽
			this.options.liveBansw && this.block.liveUserBlock();
			//直播站主页数量标号
			this.options.liveIndexRankNum && this.livePageBeautify.listCountFront();
			return
		}
		//视频与番剧页面功能
		if (REG.videoAndBangumi.test(href)) {
			//弹幕列表
			getAsyncDom('.list-title', () => {
				//弹幕列表搜索
				this.options.PlayerDamakuSearchSw && this.danmusearch.inject()
				//弹幕列表前往Acer个人主页
				this.options.danmuSearchListToUsersw && this.videoSetting.danmuSearchListToUser()
			})
			//分P列表扩展
			this.options.multiPartListSpread && this.pageBeautify.multiPartListSpread()
			//播放器帧步进
			this.options.frameStepSetting.enabled && this.videoSetting.frameStepFwdMain(this.options.frameStepSetting.controlUI)
			//倍率扩大音量
			this.options.audioGain && this.videoSetting.audioNodeGain();
			//快捷键评论发送
			this.options.quickCommentSubmit && this.pageBeautify.quickCommentSubmit();
			//MediaSession
			this.options.videoMediaSession && this.videoSetting.videoMediaSession();
		}
	}

	onCommentAreaLoaded(e) {
		getAsyncDom(".ac-pc-comment", () => {
			this.options.commentPageEasyTrans && this.pageBeautify.commentPageEasyTrans();
		}, 3000)
	}

	/**
	 * 播放器地址切换监听
	 * @description 换分P、点击推荐等等会让播放器地址会被切换。
	 * @todo 我觉得还是使用URL监听使用的开销少。
	 * @config childList：子节点的变动（指新增，删除或者更改）。
		attributes：属性的变动。
		characterData：节点内容或节点文本的变动。
		subtree：布尔值，表示是否将该观察器应用于该节点的所有后代节点。
		attributeOldValue ：布尔值，表示观察attributes变动时，是否需要记录变动前的属性值。
		characterDataOldValue：布尔值，表示观察characterData变动时，是否需要记录变动前的值。
		attributeFilter：数组，表示需要观察的特定属性（比如['class','src']）。
	 */
	onPlayerUrlChange() {
		//观察器的配置
		var config = { attributes: true, attributeOldValue: true };
		//观察对象
		var playerUrlChangeObserver = document.querySelector("video");
		//观察器
		var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
		//观察器回调
		var obsrvcall = (mutations) => {
			if (mutations[0].oldValue != null && REG.videoPlayerSrc.test(mutations[0].oldValue)) {
				// console.log(mutations)
				this.reattachFrontMods();
			}
		}
		//给观察器绑定回调
		var observer = new MutationObserver(obsrvcall);
		//开始观察
		observer.observe(playerUrlChangeObserver, config);
	}

	/**
	 * 刷新部分前台模块
	 * @description 用于在切换分P或者点击大家都在看、推荐视频之后的模块数据刷新。
	 */
	reattachFrontMods() {
		if (this.videoSetting.mediaSessionJudgeChangeVideo()) {
			let isLogin = false;
			if (isLoginByUi(false)) {
				isLogin = true;
			}
			this.videoSetting.mediaSessionReAttach();
			this.options.autoJumpLastWatchSw && this.videoSetting.jumpLastWatchTime();
			this.videoSetting.videoQuality(isLogin);
			this.options.LikeHeart && this.banana.LikeHeartFront("video", isLogin);
			this.options.autoOpenVideoDescsw && this.videoPageBeautify.openVideoDesc();
		}
	}

	//抽奖
	api_lottery(params) {
		let { number, follow } = params;
		let href = window.location.href;
		let reg = /ac(\d+)/;
		let acId = reg.exec(href)[1];
		console.log(this.luckyTurntab.RollOut(acId, number, follow));
	}
	api_lottery2nd(params) {
		let { number, follow } = params;
		let href = window.location.href;
		let reg = /ac(\d+)/;
		let acId = reg.exec(href)[1];
		console.log(this.luckyTurntab.RollOutExp(acId, number, follow));
	}
	//下载封面
	api_downloadCover(params) {
		this.download.downloadCover(params);
	}
	//下载弹幕
	api_downloadDanmaku(params) {
		this.download.downloadDanmaku(params);
	}
	api_assDanmaku() {
		this.danmaku.sanitizeJsonDanmakuToAss();
	}
	//自动投蕉
	async api_throwBanana(params) {
		if (!this.options.enabled) {
			return;
		}
		this.banana.throwBanana(params);
	}
	api_notice(params) {
		let action = "notice";
		chrome.runtime.sendMessage({ action: action, params: params }, function (
			response
		) { });
	}
	//视频下载
	async api_download(params) {
		this.download.downloadVideo(params);
	}
	api_mark(params) {
		let { value } = params;
		this.options.mark = value;
		optionsSave(this.options);
		if (value) {
			this.ce.renderMark();
		} else {
			this.ce.clearMark();
		}
	}
	api_timelineDotsMain(params) {
		let { massText, url } = params;
		this.options.timelineDots && this.videoSetting.timelineDotsMain(massText);
	}
	api_scan(params) {
		let { value } = params;
		this.options.scan = value;
		//保存配置信息到插件配置存储
		optionsSave(this.options);
		if (value) {
			this.ce.renderScan();
			this.ce.renderScanForUp();
		} else {
			this.ce.clearScan();
		}
	}
	api_lightReadMode(params) {
		let { value } = params;
		this.options.articleReadMode = value;
		if (value) {
			this.reader.lightReadMode(true);
		} else {
			this.reader.lightReadMode(false);
		}
	}
	//直播m3u8 url赋值到前台页面
	async api_renderLive(params) {
		if (REG.live.test(this.href)) {
			this.live.renderLive(params);
		}
	}
	//评论区折叠部分的标记渲染入口
	api_renderSub(params) {
		let { url, rootCommentId } = params;
		if (this.options.mark) {
			this.ce.renderSubMark(rootCommentId);
		}
		if (this.options.scan) {
			this.ce.renderSubScan(rootCommentId);
		}
		if (this.options.upHighlight) {
			this.ce.renderSubScanForUp(rootCommentId);
		}
		if (this.options.PlayerTimeCommentEasyJump) {
			//评论空降
			REG.videoAndBangumi.test(this.href) && this.ce.searchScanForPlayerTime();
		}
	}
	//评论区整体部分的标记渲染入口 ()
	api_renderList(params) {
		let { url } = params.url;
		if (this.options.mark) {
			this.ce.renderMark();
		}
		if (this.options.scan) {
			this.ce.renderScan();
		}
		if (this.options.upHighlight) {
			this.ce.renderScanForUp();
		}
		if (this.options.PlayerTimeCommentEasyJump) {
			REG.videoAndBangumi.test(this.href) && this.ce.searchScanForPlayerTime();
		}
		//跳转链接弹框
		this.options.uddPopUp && this.ce.uddPopUp(Number(this.options.uddPopUptype));
		if (REG.videoAndBangumi.test(this.href)) {
			//快捷键空降 TODO:全功能快捷键！
			if (this.options.easySearchScanForPlayerTimesw) {
				getAsyncDom('.ac-pc-comment', () => {
					this.ce.easySearchScanForPlayerTime(this.options.custom_easy_jump_keyCode)
				});
			}
		}
	}

}

window.odhfront = new ODHFront();
