/**
 * 弹幕智能过滤模块
 * 功能：低俗过滤、重复过滤、刷屏过滤、无效过滤、自定义关键词过滤
 */
class DanmakuFilter extends AcFunHelperFgFrame {
    constructor() {
        super();
        this.devMode = false;
        this.danmakuHistory = [];
        this.userDanmakuCount = new Map();
        this.vulgarKeywords = [
            "傻逼", "傻比", "傻b", "煞笔", "煞b", "草泥马", "艹尼玛", "操你妈",
            "尼玛", "你妈", "nmsl", "nmnl", "妈的", "妈逼", "妈批", "mmp",
            "傻逼", "辣鸡", "垃圾", "lj", "fw", "废物", "弱智", "rz",
            "脑残", "nc", "智障", "zz", "白痴", "bc", "滚", "滚蛋",
            "去死", "死全家", "孤儿", "杂种", "畜生", "狗东西", "狗比",
            "SB", "CNM", "NMSL", "MMP", "LJ", "FW", "RZ", "NC", "ZZ", "BC"
        ];
        this.invalidPatterns = [
            /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/,
            /^[哈呵嘿哦啊嗯额哦]+$/,
            /^[6666]+$/,
            /^[2333]+$/,
            /^[哈哈哈哈]+$/,
            /^[啊啊啊啊]+$/,
            /^[哦哦哦哦]+$/,
            /^[呵呵呵呵]+$/,
            /^[emoji\s]*$/,
            /^[。。。。]+$/,
            /^[......]+$/,
        ];
    }

    /**
     * 初始化弹幕过滤
     */
    init(options) {
        this.options = options;
        this.config = options.danmakuSmartFilter;
        this.customBlock = options.danmakuCustomBlock;
        this._observeDanmakuContainer();
    }

    /**
     * 监听弹幕容器
     */
    _observeDanmakuContainer() {
        if (!this.config.enabled && !this.customBlock.enabled) {
            return;
        }

        GetAsyncDomUtil.getAsyncDomClassic(".danmaku-container", () => {
            const container = document.querySelector(".danmaku-container");
            if (container) {
                DOMObserver.childs(container, (mutations) => {
                    mutations.forEach(mutation => {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains("danmaku-item")) {
                                this._filterDanmaku(node);
                            }
                        });
                    });
                }, true);
            }
        }, 1000);
    }

    /**
     * 过滤单条弹幕
     * @param {HTMLElement} danmakuElement 弹幕元素
     */
    _filterDanmaku(danmakuElement) {
        const text = danmakuElement.getAttribute("data-message") || danmakuElement.innerText || "";
        const userId = danmakuElement.getAttribute("data-user-id") || "";
        const time = parseFloat(danmakuElement.getAttribute("data-time")) || 0;

        let shouldBlock = false;
        let blockReason = "";

        if (this.config.enabled) {
            if (this.config.filterVulgar && this._isVulgar(text)) {
                shouldBlock = true;
                blockReason = "vulgar";
            } else if (this.config.filterRepeat && this._isRepeat(text, userId)) {
                shouldBlock = true;
                blockReason = "repeat";
            } else if (this.config.filterSpam && this._isSpam(userId, time)) {
                shouldBlock = true;
                blockReason = "spam";
            } else if (this.config.filterInvalid && this._isInvalid(text)) {
                shouldBlock = true;
                blockReason = "invalid";
            }
        }

        if (this.customBlock.enabled && !shouldBlock) {
            if (this._matchCustomBlock(text)) {
                shouldBlock = true;
                blockReason = "custom";
            }
        }

        if (shouldBlock) {
            this._blockDanmaku(danmakuElement, blockReason);
        }

        this._addToHistory(text, userId, time);
    }

    /**
     * 检查是否为低俗弹幕
     * @param {string} text 弹幕文本
     * @returns {boolean}
     */
    _isVulgar(text) {
        return this.vulgarKeywords.some(keyword => 
            text.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    /**
     * 检查是否为重复弹幕
     * @param {string} text 弹幕文本
     * @param {string} userId 用户ID
     * @returns {boolean}
     */
    _isRepeat(text, userId) {
        const recentSameText = this.danmakuHistory.filter(
            item => item.text === text && 
                    (userId ? item.userId === userId : true)
        );
        return recentSameText.length >= this.config.repeatThreshold;
    }

    /**
     * 检查是否为刷屏弹幕
     * @param {string} userId 用户ID
     * @param {number} time 当前时间
     * @returns {boolean}
     */
    _isSpam(userId, time) {
        if (!userId) return false;

        const userHistory = this.danmakuHistory.filter(item => item.userId === userId);
        const windowStart = time - (this.config.spamTimeWindow / 1000);
        const recentCount = userHistory.filter(item => item.time >= windowStart).length;

        return recentCount >= this.config.spamThreshold;
    }

    /**
     * 检查是否为无效弹幕
     * @param {string} text 弹幕文本
     * @returns {boolean}
     */
    _isInvalid(text) {
        if (!text || text.trim().length === 0) return true;
        
        return this.invalidPatterns.some(pattern => pattern.test(text));
    }

    /**
     * 检查是否匹配自定义屏蔽规则
     * @param {string} text 弹幕文本
     * @returns {boolean}
     */
    _matchCustomBlock(text) {
        if (this.customBlock.keywords && this.customBlock.keywords.length > 0) {
            for (const keyword of this.customBlock.keywords) {
                if (text.includes(keyword)) {
                    return true;
                }
            }
        }

        if (this.customBlock.regexPatterns && this.customBlock.regexPatterns.length > 0) {
            for (const pattern of this.customBlock.regexPatterns) {
                try {
                    const regex = new RegExp(pattern);
                    if (regex.test(text)) {
                        return true;
                    }
                } catch (e) {
                    continue;
                }
            }
        }

        return false;
    }

    /**
     * 屏蔽弹幕
     * @param {HTMLElement} element 弹幕元素
     * @param {string} reason 屏蔽原因
     */
    _blockDanmaku(element, reason) {
        element.style.display = "none";
        element.setAttribute("data-blocked", "true");
        element.setAttribute("data-block-reason", reason);
        
        fgConsole("DanmakuFilter", "_blockDanmaku", `屏蔽弹幕: "${element.innerText}" (原因: ${reason})`, 2, false);
    }

    /**
     * 添加到历史记录
     * @param {string} text 弹幕文本
     * @param {string} userId 用户ID
     * @param {number} time 时间
     */
    _addToHistory(text, userId, time) {
        this.danmakuHistory.push({ text, userId, time, timestamp: Date.now() });
        
        const maxHistory = 200;
        if (this.danmakuHistory.length > maxHistory) {
            this.danmakuHistory = this.danmakuHistory.slice(-maxHistory);
        }

        if (userId) {
            const count = this.userDanmakuCount.get(userId) || 0;
            this.userDanmakuCount.set(userId, count + 1);
        }
    }

    /**
     * 添加低俗关键词
     * @param {string} keyword 关键词
     */
    addVulgarKeyword(keyword) {
        if (!this.vulgarKeywords.includes(keyword)) {
            this.vulgarKeywords.push(keyword);
            return true;
        }
        return false;
    }

    /**
     * 移除低俗关键词
     * @param {string} keyword 关键词
     */
    removeVulgarKeyword(keyword) {
        const index = this.vulgarKeywords.indexOf(keyword);
        if (index > -1) {
            this.vulgarKeywords.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * 获取当前低俗关键词列表
     * @returns {string[]}
     */
    getVulgarKeywords() {
        return [...this.vulgarKeywords];
    }

    /**
     * 添加自定义屏蔽关键词
     * @param {string} keyword 关键词
     */
    async addCustomKeyword(keyword) {
        if (!this.customBlock.keywords) {
            this.customBlock.keywords = [];
        }
        if (!this.customBlock.keywords.includes(keyword)) {
            this.customBlock.keywords.push(keyword);
            await ExtOptions.setValue("danmakuCustomBlock", this.customBlock);
            return true;
        }
        return false;
    }

    /**
     * 移除自定义屏蔽关键词
     * @param {string} keyword 关键词
     */
    async removeCustomKeyword(keyword) {
        if (!this.customBlock.keywords) return false;
        const index = this.customBlock.keywords.indexOf(keyword);
        if (index > -1) {
            this.customBlock.keywords.splice(index, 1);
            await ExtOptions.setValue("danmakuCustomBlock", this.customBlock);
            return true;
        }
        return false;
    }

    /**
     * 添加自定义屏蔽正则表达式
     * @param {string} pattern 正则表达式字符串
     */
    async addCustomRegex(pattern) {
        if (!this.customBlock.regexPatterns) {
            this.customBlock.regexPatterns = [];
        }
        if (!this.customBlock.regexPatterns.includes(pattern)) {
            this.customBlock.regexPatterns.push(pattern);
            await ExtOptions.setValue("danmakuCustomBlock", this.customBlock);
            return true;
        }
        return false;
    }

    /**
     * 移除自定义屏蔽正则表达式
     * @param {string} pattern 正则表达式字符串
     */
    async removeCustomRegex(pattern) {
        if (!this.customBlock.regexPatterns) return false;
        const index = this.customBlock.regexPatterns.indexOf(pattern);
        if (index > -1) {
            this.customBlock.regexPatterns.splice(index, 1);
            await ExtOptions.setValue("danmakuCustomBlock", this.customBlock);
            return true;
        }
        return false;
    }

    /**
     * 清空弹幕历史记录
     */
    clearHistory() {
        this.danmakuHistory = [];
        this.userDanmakuCount.clear();
    }
}
