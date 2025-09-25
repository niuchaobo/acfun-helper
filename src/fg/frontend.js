class AcFunHelperFrontend extends AcFunHelperFgFrame {
	constructor() {
		super();
		globalThis.runtimeData = this.runtimeData;
		/**@type {runtimeDataFg} */
		this.runtime = globalThis.runtimeData;
		this.runtime.href = window.location.href;
		this.href = this.runtime.href;

		this.MessageRouterFg = new MessageSwitch("fg", null, true);
		this.runtime.dataset.core.status.messageSwitch = true;
		this.div = new Div(); //右侧助手
		this.runtime.dataset.core.status.helperFgPop = true;
		this.block = new Block(); //up主过滤
		this.runtime.dataset.core.status.block = true;
		this.pageBeautify = new PageBeautify(); //界面美化
		this.runtime.dataset.core.status.pageBeautify = true;
		this.videoPageBeautify = new videoPageBeautify();//视频页界面美化
		this.runtime.dataset.core.status.videoPageBeautify = true;
		this.livePageBeautify = new LivePageButfy(); //生放送界面美化
		this.runtime.dataset.core.status.livePageBeautify = true;
		this.ce = new CommentEnhance(); //评论区增强
		this.runtime.dataset.core.status.comments = true;
		this.download = new Download(); //下载(视频、封面)
		this.runtime.dataset.core.status.download = true;
		this.live = new Live(); //直播
		this.runtime.dataset.core.status.live = true;
		this.authInfo = new AuthInfoFg(); //必要信息获取
		this.runtime.dataset.core.status.authInfo = true;
		this.banana = new Banana(); //自动投蕉
		this.runtime.dataset.core.status.banana = true;
		this.videoSetting = new VideoSetting(); //视频播放设置：自定义倍速、观影模式等
		this.runtime.dataset.core.status.videoSetting = true;
		this.danmaku = new Danmaku(); //弹幕服务
		this.runtime.dataset.core.status.danmaku = true;
		this.danmusearch = new Search();//弹幕列表搜索
		this.runtime.dataset.core.status.danmakuSearch = true;
		this.luckyTurntab = new LuckyTtab(); //幸运轮盘（抽奖）
		this.runtime.dataset.core.status.luckyTurntab = true;
		this.reader = new Reader(); //文章区阅读模式
		this.runtime.dataset.core.status.readMore = true;
		this.funcUrlParam = new FunctionalUrlParam(); //URLParam指令
		this.runtime.dataset.core.status.urlparams = true;

		chrome.runtime.onMessage.addListener(this.MessageRouterFg.FrontendMessageSwitch.bind(this)); //接收来自后台的消息
		window.addEventListener("message", this.MessageRouterFg.FrontendMsgHandler.bind(this));

		this.loading();
		this.runtime.dataset.core.status.core = true;
		this.Apis = null;
	}

	/**
	 * 全局样式
	 */
	addStyle() {
		let str =
			//<a>标签柔和动画
			"a {transition: color .2s ease, background-color .2s ease;}\n" +
			//AcFun助手-前台Popup按钮样式
			"#acfun-helper-div { font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif; box-shadow: 0px 0px 5px #949494; border-radius: 5px 0px 0px 5px; right: -10px !important; transition: all .2s ease; }" +
			"#acfun-helper-div:hover { transition: all .2s ease; right: 0px !important; }";
		str += this.pageBeautify.globalLiteAnimation();
		createElementStyle(str, document.head, "AcFunHelper_Frontend");
		this.ce.onLoad();
	}

	async loading() {
		this.runtime.options = await optionsLoad();
		this.options = this.runtime.options;
		if (!this.options.enabled || !this.options.permission) {
			return
		}

		this.runtime.dataset.core.browserType = ToolBox.thisBrowser();
		this.Apis = new AcFunHelperFrontendApis(this);

		const XHRProxyLib = document.createElement("script");
		XHRProxyLib.src = chrome.runtime.getURL("common/xhr-proxy.js");
		(document.head || document.documentElement).appendChild(XHRProxyLib);
		XHRProxyLib.addEventListener("load", () => {
			if (this.options.xhrDrv) {
				const xhrDriver = document.createElement("script");
				xhrDriver.src = chrome.runtime.getURL("fg/acfunxhr.js");
				xhrDriver.type = "module";
				(document.head || document.documentElement).appendChild(xhrDriver);
				xhrDriver.addEventListener('load', async () => {
					//就运行一次吧
					const { onceFunction } = await import("../common/modulesLib/Misc.mjs");
					const LoadXhrProxyModules = onceFunction(() => {
						MessageSwitch.sendEventMsgToInject(window, { "target": "AcFunHelperFrontendXHRDriver", source: "ARFP", "InvkSetting": { "type": "function" }, "params": { params: {}, target: "start" } });
						this.block.injectScriptData();
					}, null, this);
					ARFPModsConfName.forEach(async e => {
						//只要有任意一种屏蔽模块启用，那么就应该拉起XHRDriver
						(await ExtOptions.getValue(e)) && LoadXhrProxyModules();
					});
				});
			}
		});
		this.runtime.dataset.core.status.xhrProxy = true;
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
	}

	onACPlayerLoaded(e) {
		if (REG.videoAndBangumi.test(this.href)) {
			let isLogined = false;
			var playerChecker = setInterval(() => {
				let elem = document.querySelector("#ACPlayer .control-bar-top .box-right")
				if (elem != null) {
					if (ToolBox.isLogin("video")) {
						isLogined = true;
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
					this.options.PictureInPictureModeUI && this.videoSetting.PicktureInPictureMode();
					//全局进度条
					this.options.ProgressBarsw && this.videoSetting.flexProgressBar(this.options.ProgressBarStyle);
					//画质策略
					this.videoSetting.videoQuality(isLogined);
					//自动点赞
					this.options.LikeHeart && this.banana.LikeHeartFront("video", isLogined);
					//弹幕操作栏状态
					this.options.hideDanmakuOperator.UI && this.videoSetting.hideDanmakuOperatorUI();
					this.videoSetting.hideDanmakuOperator(this.options.hideDanmakuOperator.defaultMode, this.options.hideDanmakuOperator.maskSw);
					//播放器帧步进
					this.options.frameStepSetting.enabled && this.videoSetting.frameStepFwdMain(this.options.frameStepSetting.controlUI)
					//后台自动暂停
					this.videoSetting.getSomeSleepFront(this.options.sleepPause.defaultMode, this.options.sleepPause.UI);
					clearInterval(playerChecker);
				}
			}, 1000);

			this.onPlayerUrlChange();
		}
		this.deferWorks();
	}

	onDomContentLoaded(e) {
		let href = this.href;
		//添加自定义样式
		this.addStyle();
		this.options.Dev_thinScrollbar && this.pageBeautify.thinScrollBar();
		if (!REG.live.test(href) && !REG.liveIndex.test(href)) {
			//首页个人资料弹框 (未完成)
			this.options.beautify_personal && GetAsyncDomUtil.getAsyncDomClassic('#header .header-guide .guide-item', () => {
				this.pageBeautify.addMouseAnimation()
				this.pageBeautify.personBeautify();
			})
		}
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
			//隐藏ad
			this.options.hideAd && this.pageBeautify.hideAds();
			this.options.playerRecommendHide && this.pageBeautify.simplifiyPlayerRecm();
			//历史排行榜成就
			this.options.videoAchievement && this.videoSetting.historocalAchieve();
			return
		}
		if (REG.liveIndex.test(href) && !REG.live.test(href)) {
			//直播ad屏蔽
			this.options.liveHideAd && this.livePageBeautify.LivehideAds(this.options.liveHideAdType, this.options.liveHideAdMute);
		}
		//直播
		if (REG.live.test(href)) {
			// this.options.liveCommentTimeTag && 
			this.livePageBeautify.onLoad();
			//直播站功能
			if (this.options.livePlayerEnhc) {
				let timer = setInterval(() => {
					let checknode = $('div.box-right');
					if (checknode.length > 0) {
						this.livePageBeautify.appendWidePlayer();
						this.livePageBeautify.simplifyDanmu();
						this.live.liveDanmakuPiPUi();
						if (this.options.LiveWatchTimeRec_popup) {
							this.live.watchTimeRecord();
						}
						clearInterval(timer);
					}
				}, 3000)
			}
			return
		}
		//个人中心首页
		if (REG.userHome.test(href)) {
			this.options.userCenterBeautify && this.pageBeautify.userCenterBeautify();
			this.options.widenUCVideoList && this.pageBeautify.widenUCVideoList();
			this.options.Dev_indexBlurSW && this.pageBeautify.indexBeautify(false, true);
			this.options.pageTransKeyBind && this.pageBeautify.pageTransKeyBind("uc");
			this.options.userPageTimeline && this.pageBeautify.userPageTimeline();
		}
	}

	async onLoad(e) {
		let href = this.href;
		this.authInfo.onLoad();
		//开启屏蔽功能
		this.options.filter && this.block.block();
		if (REG.video.test(href)) {
			if (!this.fetchPageInfo()) {
				return;
			}
			this.runtime.dataset.notes.vid = this.runtime.dataset.dougaInfo.currentVideoId;
			this.runtime.dataset.notes.dougaId = this.runtime.dataset.dougaInfo.dougaId;
			let isUp = adjustVideoUp();
			this.div.show(this.runtime.dataset.dougaInfo, this.options, 'video', isUp);
			this.onCommentAreaLoaded();
			//自动投蕉
			this.options.auto_throw && this.banana.throwBanana({ "key": REG.acVid.exec(href)[2] });
		}
		//视频与番剧页面功能
		if (REG.videoAndBangumi.test(href)) {
			if (!this.fetchPageInfo()) {
				return;
			}
			this.runtime.dataset.notes.vid = this.runtime.dataset.dougaInfo.currentVideoId;
			this.runtime.dataset.notes.dougaId = this.runtime.dataset.dougaInfo.dougaId;
			//弹幕列表
			GetAsyncDomUtil.getAsyncDomClassic('.list-title', () => {
				//弹幕列表搜索
				this.options.PlayerDamakuSearchSw && this.danmusearch.inject()
				//弹幕列表前往Acer个人主页
				this.options.danmuSearchListToUsersw && this.videoSetting.danmuSearchListToUser()
				this.options.wheelToChangeVolume && this.videoSetting.wheelToChangeVolume(true);
			})
			//分P列表扩展
			this.options.multiPartListSpread && this.pageBeautify.multiPartListSpread()
			//倍率扩大音量
			this.options.audioGain && this.videoSetting.audioNodeGain();
			//快捷键评论发送
			this.options.quickCommentSubmit && this.pageBeautify.quickCommentSubmit();
			//MediaSession
			this.options.videoMediaSession && this.videoSetting.videoMediaSession(this.runtime.dataset.dougaInfo);
			//简单CC字幕
			this.options.simpleCC && this.danmaku.simpleCC();
			this.options.videoRememberLastSend && this.videoSetting.rememberLastSend();
			return
		}
		//文章
		if (REG.article.test(href)) {
			let isUp = adjustArticleUp();
			this.div.show(this.runtime.dataset.dougaInfo, this.options, 'article', isUp);
			this.options.picDrag && this.reader.picDrag(this.options.picRotate);
			this.options.LikeHeart && this.banana.LikeHeartFront("article");
			this.options.uddPopUp && this.ce.uddPopUp(Number(this.options.uddPopUptype));
			if (this.options.auto_throw && this.options.articleBanana) {
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
			this.div.show(this.runtime.dataset.dougaInfo, this.options, 'live', '');
			this.options.LiveUserFocus && this.livePageBeautify.followMe();
			this.options.liveMediaSession && this.live.liveMediaSession(href);
			//直播画中画模式
			this.runtime.dataset.core.browserType == "Chrome" && this.livePageBeautify.callPicktureInPictureModeForLive();
			this.options.quickCommentSubmit && this.pageBeautify.quickCommentSubmit("live");
			this.options.liveVolumeMild && this.videoSetting.liveVolumeMild();
			this.options.wheelToChangeVolume && this.videoSetting.wheelToChangeVolume(false);
			this.options.liveRememberLastSend && this.livePageBeautify.rememberLastSend();
			this.options.beautify_personal && GetAsyncDomUtil.getAsyncDomClassic('#header #nav #nav-parent .header-guide .guide-user p', () => {
				this.pageBeautify.addMouseAnimation()
				this.pageBeautify.personBeautify();
			})
			return
		}
		//直播首页
		if (REG.liveIndex.test(href) && !REG.live.test(href)) {
			this.pageBeautify.pageTransKeyBind("depList");
			//直播站主页数量标号
			this.options.liveIndexRankNum && this.livePageBeautify.listCountFront();
			this.options.beautify_personal && GetAsyncDomUtil.getAsyncDomClassic('#header #nav #nav-parent .header-guide .guide-user p', () => {
				this.pageBeautify.addMouseAnimation()
				this.pageBeautify.personBeautify();
			})
			return
		}
		if (REG.userCenter.index.test(href)) {
			this.options.userBatchManage && this.pageBeautify.userBatchManage();
			this.options.pageTransKeyBind && this.pageBeautify.pageTransKeyBind("myFav");
		}
		if (REG.userHome.test(href)) {
			this.options.userTagRender && this.pageBeautify.userTagRender();
		}
		if (REG.arubamu.test(href)) {
			this.options.arubamuBatchToWatchLater && this.videoSetting.arubamuToWatchLater();
		}
	}

	onCommentAreaLoaded(e) {
		GetAsyncDomUtil.getAsyncDomClassic(".ac-pc-comment", () => {
			this.options.commentPageEasyTrans && this.pageBeautify.commentPageEasyTrans();
			this.options.pageTransKeyBind && this.pageBeautify.pageTransKeyBind("depList");
		}, 3000)
	}

	/**
	 * 播放器地址切换监听
	 * @description 换分P、点击推荐等等会让播放器地址会被切换。
	 * @todo 我觉得还是使用URL监听使用的开销少。
	 */
	onPlayerUrlChange() {
		if (REG.bangumi.test(window.location.href) == false) {
			DOMObserver.attrs(document.querySelector("video"), e => {
				/**@type {MutationRecord} */
				const mutations = e[0];
				if (mutations.oldValue != null && mutations.attributeName == "src" && REG.videoPlayerSrc.test(mutations.oldValue)) {
					this.reattachFrontMods();
				}
			})
		}
	}

	/**
	 * 刷新部分前台模块
	 * @description 用于在切换分P或者点击大家都在看、推荐视频之后的模块数据刷新。
	 */
	reattachFrontMods() {
		//切换了分P和投稿
		this.href = window.location.href;
		let isLogined = false;
		const maxRetryNum = 10;
		let retryNum = 0;
		//页面的视频信息刷新与重载钩子被执行有一定的时间间隔
		let _timer = setInterval(() => {
			if (this.runtime.dataset.notes.vid == this.runtime.dataset.dougaInfo.currentVideoId) {
				if (retryNum > maxRetryNum) {
					return false;
				}
				this.fetchPageInfo("video");
				retryNum++;
			} else {
				if (ToolBox.isLogin("video", "cookies")) {
					isLogined = true;
				}
				//切换不同分P
				if (this.runtime.dataset.notes?.vid != this.runtime.dataset.dougaInfo.currentVideoId) {
					//切换投稿
					if (this.runtime.dataset.notes?.dougaId != this.runtime.dataset.dougaInfo.dougaId) {
						this.options.LikeHeart && this.banana.LikeHeartFront("video", isLogined);
						this.options.autoOpenVideoDescsw && this.videoPageBeautify.openVideoDesc();
						this.videoSetting.videoQuality(isLogined);
					}
					this.div.reloadIframe(this.options, this.runtime.dataset.dougaInfo, "video", adjustVideoUp());
				}
				this.videoSetting.mediaSessionReAttach();
				this.runtime.dataset.notes.vid = this.runtime.dataset.dougaInfo.currentVideoId;
				this.runtime.dataset.notes.dougaId = this.runtime.dataset.dougaInfo.dougaId;

				clearInterval(_timer);
				return true;
			}
		}, 982);
	}

	/**
	 * 获取投稿信息
	 * @param {"video"|"article"} pageType 
	 * @returns {Boolean} 投稿信息存放在 this.runtime.dataset
	 */
	fetchPageInfo(pageType = "video") {
		let div = document.createElement('div');
		div.style.display = "none";
		let uuid = uuidBuild();
		let currentDougaInfo;
		this.runtime.dataset.sessionUUID = uuid;
		div.id = uuid;
		document.body.appendChild(div);
		switch (pageType) {
			case "video":
				div.setAttribute('onclick', "document.getElementById('" + uuid + "').innerText=JSON.stringify(window.pageInfo)");
				break;
			case "article":
				div.setAttribute('onclick', "document.getElementById('" + uuid + "').innerText=JSON.stringify(window.articleInfo)");
				break;
		}
		div.click();
		currentDougaInfo = JSON.parse(document.getElementById(uuid).innerText);
		switch (pageType) {
			case "video":
				this.runtime.dataset.dougaInfo = null;
				this.runtime.dataset.dougaInfo = currentDougaInfo;
				break;
			case "article":
				this.runtime.dataset.articleInfo = null;
				this.runtime.dataset.articleInfo = currentDougaInfo;
				break;
		}
		document.body.removeChild(div);
		div = null;
		if (currentDougaInfo == undefined || currentDougaInfo == "" || currentDougaInfo == null) {
			return false;
		}
		return true;
	}

	deferWorks() {
		fgConsole("Frontend", "deferWorks", "Loaded.", 1, false);
		this.funcUrlParam.onLoad();
	}

}

window.AcFunHelperFrontend = new AcFunHelperFrontend();
