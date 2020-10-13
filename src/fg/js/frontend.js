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

		chrome.runtime.onMessage.addListener(this.onBgMessage.bind(this)); //接收来自后台的消息
		window.addEventListener("message", (e) => this.onFrameMessage(e)); //接收来自iframe的消息

		this.loading()

		//监听storage变化,可用于数据云同步
		chrome.storage.onChanged.addListener(function (changes, areaName) {
			// console.log('11111111111111111')
			// console.log(document.cookie);
		});
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
			"";
		let headDom = document.getElementsByTagName("head")[0]
		createElementStyle(str, headDom)
	}

	addNightStyle() {
		let div = document.createElement("div");
		div.id = "acfun_night_conver";
		div.style =
			"width: 100%; height: 100%; transition: -webkit-transform 10s ease-in-out 0s; z-index: 2147483647; opacity: 0.25; position: fixed !important; left: 0px !important; bottom: 0px !important; overflow: hidden !important; background: rgb(0, 0, 0) !important; pointer-events: none !important;";
		//let cover = '<div id="__nightingale_view_cover" ' +
		//  'style="width: 100%; height: 100%; transition: -webkit-transform 10s ease-in-out 0s; z-index: 2147483647; opacity: 0.25; position: fixed !important; left: 0px !important; bottom: 0px !important; overflow: hidden !important; background: rgb(0, 0, 0) !important; pointer-events: none !important;"></div>';
		document.body.appendChild(div);
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
			this.onLoad(e)
			if (this.options.krnl_videossEarly == false) {
				this.onACPlayerLoaded(e)
			}
		});
		//Dom 渲染完即可执行 此时图片视频还可能没加载完
		document.addEventListener("DOMContentLoaded", (e) => {
			this.onDomContentLoaded(e);
			if (this.options.krnl_videossEarly == true) {
				this.onACPlayerLoaded(e)
			}
		});
	}

	onACPlayerLoaded(e) {
		let href = this.href;
		if (REG.videoAndBangumi.test(href)) {
			getAsyncDom('#ACPlayer .control-bar-top .box-right', () => {
				//在视频播放页面监听播放器状态(是否全屏)，控制助手按钮是否显示
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
			}, 200)
		}
	}

	onDomContentLoaded(e) {
		// console.log("options",this.options);
		//历史观看记录-本地获取
		// this.authInfo.historyView();
		let href = this.href;
		//添加自定义样式
		this.addStyle();
		//屏蔽功能
		this.options.filter && this.block.injectScript();
		//夜间模式
		this.options.night && this.addNightStyle();
		//首页
		if (REG.index.test(href)) {
			//开启右侧导航
			this.options.beautify_nav && this.pageBeautify.navBeautify();
			//隐藏ad
			this.options.hideAd && this.pageBeautify.hideAds();
			//首页nav高斯模糊
			this.options.Dev_indexBlurSW && this.pageBeautify.indexBeautify(false);
		}
		//分区首页
		if (REG.partIndex.test(href) || REG.articleDetail.test(href)) {
			this.options.articlePartIndexDarken && this.pageBeautify.darkenArticlePartIndex();
			//隐藏ad
			this.options.hideAd && this.pageBeautify.hideAds();
			//分区首页nav高斯模糊
			this.options.Dev_indexBlurSW && this.pageBeautify.indexBeautify(true);
		}
		//视频与番剧
		if (REG.videoAndBangumi.test(href)) {
			//播放器画质策略
			this.videoSetting.videoQuality();
		}
		//视频
		if (REG.video.test(href)) {
			//播放器和弹幕功能
			this.options.autoOpenVideoDescsw && this.videoPageBeautify.openVideoDesc();
			this.danmaku.cacheStore();
			this.options.autoJumpLastWatchSw && this.videoSetting.jumpLastWatchTime();
			//隐藏ad
			this.options.hideAd && this.pageBeautify.hideAds();
		}
		//直播
		if (REG.live.test(href)) {
			this.options.liveCommentTimeTag && this.livePageBeautify.commentTimeTag();
		}
		//直播站功能
		if (REG.live.test(href) && this.options.livePlayerEnhc) {
			let timer = setInterval(() => {
				let checknode = $('div.box-right');
				if (checknode.length > 0) {
					this.livePageBeautify.appendWidePlayer();
					this.livePageBeautify.simplifyDanmu();
					if (this.options.LiveWatchTimeRec_popup) {
						this.livePageBeautify.watchTimeRecord();
					}
					clearInterval(timer);
				}
			}, 3000)
		}
		//直播首页及页面优化
		if (!REG.live.test(href) && !REG.liveIndex.test(href)) {
			//首页个人资料弹框 (未完成)
			this.options.beautify_personal && getAsyncDom('#header .header-guide .guide-item', () => {
				this.pageBeautify.addMouseAnimation()
				this.pageBeautify.personBeautify();
			})
		}
		//个人中心首页
		if (REG.userHome.test(href) && this.options.userHomeMoment) {
			this.pageBeautify.userMoment(href);
			this.options.Dev_indexBlurSW && this.pageBeautify.indexBeautify(false);
		}
	}

	onLoad(e) {
		//tab页创建时会从bg发消息过来写入options数据,但可能存在延迟
		//根据cookie判断当前登录用户是不是up
		//let is_up = this.adjuatUp();
		let href = this.href;
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
		}
		//文章
		if (REG.article.test(href)) {
			let isUp = adjustArticleUp();
			this.div.show(pageInfo, this.options, 'article', isUp);
			this.options.uddPopUp && this.ce.uddPopUp(Number(this.options.uddPopUptype), true);
		}
		//直播
		if (REG.live.test(href)) {
			$(".open-app-confirm").hide();
			this.div.show(pageInfo, this.options, 'live', '');
			this.options.LiveUserFocus && this.livePageBeautify.followMe();
			//直播画中画模式
			this.livePageBeautify.callPicktureInPictureModeForLive()
		}
		//直播首页
		if (REG.liveIndex.test(href) && !REG.live.test(href)) {
			//直播ad屏蔽
			this.options.liveHideAd && this.livePageBeautify.LivehideAds(this.options.liveHideAdType);
			//直播站首页用户屏蔽
			this.options.liveBansw && this.block.liveUserBlock();
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
		}
		this.authInfo.cookInfo();
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
	api_setFrontendOptions(params) {
		let { options, callback } = params;
		this.options = options;
		callback();
	}
	//视频下载
	async api_download(params) {
		if (this.options == null) {
			this.options = await optionsLoad();
		}
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
	api_scan(params) {
		let { value } = params;
		this.options.scan = value;
		optionsSave(this.options);
		if (value) {
			this.ce.renderScan();
			this.ce.renderScanForUp();
		} else {
			this.ce.clearScan();
		}
	}
	//直播m3u8 url赋值到前台页面
	async api_renderLive(params) {
		if (!REG.liveIndex.test(this.href)) {
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
			this.ce.searchScanForPlayerTime();
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
			this.ce.searchScanForPlayerTime();
		}
		//跳转链接弹框
		this.options.uddPopUp && this.ce.uddPopUp(Number(this.options.uddPopUptype));
		let href = this.href;
		if (REG.videoAndBangumi.test(href)) {
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
