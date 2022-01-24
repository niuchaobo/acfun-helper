/**
 * @description 此组件由AcFunHelperFrontend在loading阶段发起注册，函数注册在window下后，将会执行start函数，
 */
let AcFunHelperFrontendXHRDriver = (function XHRDriver() {
	let isRightPage = new RegExp("https://*.*.acfun.cn/*").test(window.location.href);
	if (!isRightPage) { return };
	/**
	 * @type {XHRDriverRegistry}
	 * @description 首先在这里注册下过滤器的描述信息，首先自增操作类型typescount，然后将对应的URL写入对应类型的registeredEvent中，最后写入具体条目到registry中
	 */
	let registry = {
		_sys: {
			typesCount: {
				"deny": 0, "requestRPC": 0, "injectedApi": 2, "modify": 0, globalSw: false
			},
			registerdEvents: {
				"deny": [], "requestRPC": [], "injectedApi": ["https://www.acfun.cn/rest/pc-direct/article/feed", "https://www.acfun.cn/rest/pc-direct/comment/list"], "modify": [],
			},
		},
		"https://www.acfun.cn/rest/pc-direct/article/feed": {
			"name": "example2", "bound": "post", "action": "injectedApi", "condition": { "target": "articleListFilter" }
		},
		"https://www.acfun.cn/rest/pc-direct/comment/list": {
			"name": "example3", "bound": "post", "action": "injectedApi", "condition": { "target": "commentFilter" }
		},
	}
	window.addEventListener("AcFunHelperFrontend", e => {
		AcFunHelperFrontendEventInvoker(e);
	})
	/**
	 * 调用处理响应函数
	 * @param {MessageSwitchStructs.InjectRecievePayload} e 
	 */
	function AcFunHelperFrontendEventInvoker(e) {
		if (e.detail.target != "AcFunHelperFrontendXHRDriver") {
			return;
		}
		switch (e.detail.InvkSetting.type) {
			case "function":
				if (!typeof (AcFunHelperFrontendXHRDriver[e.detail.target]) === 'function') {
					return
				}
				AcFunHelperFrontendXHRDriver[e.detail.params.target].call({}, e.detail.params.params);
				break;
			case "echo":
				console.log(e.detail.params);
				break;
			default:
				//添加规则
				if (e.detail.params instanceof Object) {
					if (!registry._sys.registerdEvents[e.detail.params.type].includes(e.detail.params.urlExp)) {
						return;
					}
					registry._sys.registerdEvents[e.detail.params.type].push(e.detail.params.rule)
					registry._sys.typesCount[e.detail.params.type]++;
					registry[e.detail.params.rule.urlExp] = e.detail.params.rule;
				}
				break;
		}
	}

	/**
	 * 判断url是否匹配注册字典中的规则URL
	 * @param {string} rouType 请求管理阶段 Pre or Post
	 * @param {string} url 输入的URL
	 * @param {Array<string>} urlsList 操作的目标URL列表
	 * @returns {Array<string>} 
	 */
	function urlMatch(rouType, url, urlsList) {
		let resultExp = []
		urlsList.forEach(e => {
			if (new RegExp(e).test(window.location.origin + url)) {
				if (registry[e].bound == rouType) {
					resultExp.push(e);
				}
			}
		})
		// resultExp.length && console.log(resultExp)
		return resultExp;
	}

	/**
	 * 主函数
	 * @description 定义回调，并从规则注册字典中获取所有注册的目标操作URL，如果请求满足注册字典中的规则，则执行注册字典中的写在AcFunHelperFrontendXHRReactor 的回调(所以要求所有回调都传入ctx并执行handler.next(ctx);)
	 */
	function start() {
		var urls = [];
		for (let types in registry._sys.registerdEvents) {
			registry._sys.registerdEvents[types].forEach(rulesUrl => {
				urls.push(rulesUrl);
			})
		}
		/**
		 * 请求就绪
		 * @param {import("../../declares/XHRProxy").XhrRequestConfig} ctx 
		 * @param {import("../../declares/XHRProxy").XhrRequestHandler} handler 
		 */
		function preRouting(ctx, handler) {
			if (ctx.method == "GET") {
				const shouldRun = urlMatch("pre", ctx.url, urls);
				if (shouldRun.length) {
					shouldRun.forEach(e => {
						AcFunHelperFrontendXHRReactor[registry[e].condition.target].call(this, ctx, handler);
					})
					return true;
				}
			}
			return false;
		}
		/**
		 * 请求已回复
		 * @param {import("../../declares/XHRProxy").XhrResponse} ctx 
		 * @param {import("../../declares/XHRProxy").XhrResponseHandler} handler 
		 */
		function postRouting(ctx, handler) {
			// console.log(ctx.response)
			const postShouldRun = urlMatch("post", ctx.config.url, urls);
			if (postShouldRun.length) {
				postShouldRun.forEach(e => {
					AcFunHelperFrontendXHRReactor[registry[e].condition.target].call(this, ctx, handler);
				})
				return true;
			}
			return false;
		}
		/**
		 * @description 注册钩子，如果没有匹配到的规则，则直接执行请求，如果匹配到了规则，则先执行AcFunHelperFrontendXHRReactor 中的回调，然后再执行请求
		 */
		XHRProxy.proxy({
			onRequest: (xhr, handler) => {
				!preRouting(xhr, handler) && handler.next(xhr);
			},
			onResponse: (response, handler) => {
				!postRouting(response, handler) && handler.next(response);
			}
		})
	}

	function stop() {
		XHRProxy.unProxy();
	}

	return {
		start, stop
	}
})();
let {
	start, stop
} = { ...AcFunHelperFrontendXHRDriver }

let AcFunHelperFrontendXHRReactor = (function XHRReactor() {
	const dataset = {
		/**@description 文章区列表屏蔽中，默认的覆盖显示条目 */
		articleFilterEmptyFill: {
			allowed_add_tag: false,
			attitudes: [],
			banana_count: 0,
			big_cover_image: "",
			channel_id: 110,
			channel_name: "综合",
			channel_path: "a",
			comment_count: 0,
			contribute_time: 1588857632000,
			cover_image: "https://imgs.aixifan.com/FvHGj3sOzp9d2jsjlBfqFFuUgBAJ",
			description: "",
			essense: false,
			favorite_count: 6,
			id: 15387968,
			isSignedUpCollege: false,
			latest_active_time: 1588861593000,
			latest_comment_time: 1588861593000,
			like_count: 0,
			link: "",
			parent_channel_id: 63,
			parent_channel_name: "文章",
			parent_realm_id: 0,
			realm_id: 5,
			realm_name: "杂谈",
			recommended: false,
			status: 2,
			title: "下一页内容已全部屏蔽",
			top_level: false,
			tudou_domain: false,
			type_id: 1,
			user_avatar: "",
			user_id: 7054138,
			username: "acfun助手",
			view_count: 0,
			view_only: true,
		},
		/**@description 新版文章区列表屏蔽中，默认的覆盖显示条目 */
		newArticleFilterEmptyFill: {
			articleId: 15387968,
			commentCount: 999,
			coverImgInfo: {
				width: 1600, height: 900, size: 265343, type: 1, thumbnailImage: { cdnUrls: [{ freeTrafficCdn: true, url: "https://imgs.aixifan.com/FvHGj3sOzp9d2jsjlBfqFFuUgBAJ", freeTrafficProductAbbreviation: "" }] }
			},
			createTime: 1588857632000,
			description: "",
			formatCommentCount: "999",
			formatViewCount: "999",
			isOriginal: true,
			realmId: 4,
			realmName: "爱稀饭助手",
			title: "下一页内容已全部屏蔽",
			userId: 7054138,
			userName: "爱稀饭助手-说",
		},
		/**@description  文章区列表过滤的用户ID*/
		articleFilterUsersUid: [],
		/**@description  评论区过滤的UID*/
		commentAreaBanUsersId: [6100823,],
		/**@description  文章区过滤开关*/
		articleFilterEnable: false,
		/**@description  评论区用户过滤开关*/
		commentAreaBanUsersEnable: false,
	};
	window.addEventListener("AcFunHelperFrontend", e => {
		AcFunHelperFrontendEventInvoker(e);
	})
	/**
	 * 消息处理
	 * @param {MessageSwitchStructs.InjectRecievePayload} e 
	 */
	function AcFunHelperFrontendEventInvoker(e) {
		if (e.detail.target != "AcFunHelperFrontendXHRReactor") {
			return;
		}
		switch (e.detail.InvkSetting.type) {
			case "function":
				if (!typeof (AcFunHelperFrontendXHRReactor[e.detail.params.target]) === 'function') {
					return
				}
				AcFunHelperFrontendXHRReactor[e.detail.params.target].call({}, e.detail.params.params);
				break;
		}
	}

	function datasetWriteIn(e) {
		const { k, v } = e;
		dataset[k] = v;
	}

	/**
	 * 文章区Feed过滤
	 * @param {import("../../declares/XHRProxy").XhrResponse} ctx 
	 * @param {import("../../declares/XHRProxy").XhrResponseHandler} handler 
	 */
	function articleListFilter(ctx, handler) {
		if (dataset["articleFilterEnable"]) {
			/**
			 * @type {Array}
			 */
			const banUids = dataset["articleFilterUsersUid"];
			/**
			 * @type {APIs.ArticlePart}
			 */
			let raw = JSON.parse(ctx.response);
			let newDataArr = [];
			raw.data.forEach(e => {
				if (!banUids.includes(e.userId)) {
					// console.log(e.userName)
					newDataArr.push(e);
				}
			})
			if (!newDataArr.length) {
				newDataArr.push(dataset.newArticleFilterEmptyFill);
			}
			/**@description 重新构造请求 */
			ctx.response = { "cursor": raw.cursor, "data": newDataArr, "result": raw.result };
			handler.next(ctx);
		}
	}

	/**
	 * 评论区过滤
	 * @param {import("../../declares/XHRProxy").XhrResponse} ctx 
	 * @param {import("../../declares/XHRProxy").XhrResponseHandler} handler 
	 * @todo 完善置顶评论过滤
	 */
	function commentFilter(ctx, handler) {
		if (!dataset["commentAreaBanUsersEnable"]) {
			return;
		}
		/**
		 * @type {APIs.CommentApi}
		 */
		let rawComment = JSON.parse(ctx.response);
		const banUids = dataset["commentAreaBanUsersId"];
		let hots = [], root = [], srcMap = {}, sticky = {};
		hots = rawComment.hotComments.filter(e => !banUids.includes(e.userId));
		root = rawComment.rootComments.filter(e => !banUids.includes(e.userId));
		if (Object.keys(rawComment.subCommentsMap).length) {
			for (let e in rawComment.subCommentsMap) {
				srcMap[e] = {
					subComments: rawComment.subCommentsMap[e].subComments.filter(e => !banUids.includes(e.userId)),
					pcursor: rawComment.subCommentsMap[e].pcursor
				}
			}

		}
		// if (Object.keys(rawComment.stickyComments).length) {
		// 	for (let e in rawComment.stickyComments) {
		// 		srcMap[e] = rawComment.stickyComments[e].filter(e => !banUids.includes(e.userId));
		// 	}
		// }
		const afterProcess = {
			commentCount: rawComment.commentCount,
			contentUbbVersion: rawComment.contentUbbVersion,
			curPage: rawComment.curPage,
			godComments: [],
			['host-name']: rawComment["host-name"],
			isUp: rawComment.isUp,
			pageSize: rawComment.pageSize,
			pcursor: rawComment.pcursor,
			result: rawComment.result,
			sourceType: rawComment.sourceType,
			stickyComments: rawComment.stickyComments,
			totalPage: rawComment.totalPage,
			rootComments: root,
			hotComments: hots,
			stickyComments: sticky,
			subCommentsMap: srcMap,
		}
		ctx.response = JSON.stringify(afterProcess)
		handler.next(ctx);
	}

	function example(e, f) {
		console.log(e, f);
	}

	return { example, datasetWriteIn, articleListFilter, commentFilter };
})();
let {
	example, datasetWriteIn, articleListFilter, commentFilter
} = { ...AcFunHelperFrontendXHRReactor }