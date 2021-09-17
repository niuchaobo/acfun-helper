let AcFunHelperFrontendXHRDriver = (function XHRDriver() {
	let isRightPage = new RegExp("https://*.*.acfun.cn/*").test(window.location.href);
	if (!isRightPage) { return };
	/**
	 * @type {XHRDriverRegistry}
	 */
	let registry = {
		_sys: {
			typesCount: {
				"deny": 0, "requestRPC": 0, "injectedApi": 1, "modify": 0, globalSw: false
			},
			registerdEvents: {
				"deny": [], "requestRPC": [], "injectedApi": ["https://www.acfun.cn/rest/pc-direct/article/feed"], "modify": [],
			},
		},
		"https://www.acfun.cn/rest/pc-direct/article/feed": {
			"name": "example2", "bound": "post", "action": "injectedApi", "condition": { "target": "articleListFilter" }
		}
	}
	window.addEventListener("AcFunHelperFrontend", e => {
		AcFunHelperFrontendEventInvoker(e);
	})
	/**
	 * 调用处理响应函数
	 * @param {MessageSwitchInjectRecievePayload} e 
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
	 * @param {string} url 
	 * @param {string[]} urlsList 
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
		articleFilterUsersUid: [],
		articleFilterEnable: false,
	};
	window.addEventListener("AcFunHelperFrontend", e => {
		AcFunHelperFrontendEventInvoker(e);
	})
	/**
	 * 消息处理
	 * @param {MessageSwitchInjectRecievePayload} e 
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
			ctx.response = { "cursor": raw.cursor, "data": newDataArr, "result": raw.result };
			handler.next(ctx);
		}
	}

	/**
	 * 评论区过滤
	 * @param {import("../../declares/XHRProxy").XhrResponse} ctx 
	 * @param {import("../../declares/XHRProxy").XhrResponseHandler} handler 
	 */
	function commentFilter(ctx, handler) {
		/**
		 * @type {APIs.CommentApi}
		 */
		let rawComment = null;
	}

	function example(e, f) {
		console.log(e, f);
	}

	return { example, datasetWriteIn, articleListFilter };
})();
let {
	example, datasetWriteIn, articleListFilter
} = { ...AcFunHelperFrontendXHRReactor }