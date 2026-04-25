class AITextHelper extends AcFunHelperFgFrame {
    constructor() {
        super();
        this.devMode = false;
        this.isAnalyzing = false;
        this.aiButtonsAdded = {
            video: false,
            article: false,
            comment: false
        };
        console.log('[AI Text Helper] 模块已初始化');
    }

    onLoad() {
        console.log('[AI Text Helper] onLoad 被调用');
        this.addGlobalStyles();
        this.injectFloatingButton();
        LeftBottomNotif('AI 文本助手已加载！', 'info', 2000);
    }

    addGlobalStyles() {
        const css = `
            @keyframes ai-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes ai-pulse {
                0% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4); }
                70% { box-shadow: 0 0 0 10px rgba(102, 126, 234, 0); }
                100% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0); }
            }
            
            @keyframes ai-slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes ai-fadeIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
            
            .ai-float-btn-container {
                position: fixed;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                z-index: 99999;
                display: flex;
                flex-direction: column;
                gap: 8px;
                animation: ai-slideIn 0.5s ease;
            }
            
            .ai-float-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 48px;
                height: 48px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 8px 0 0 8px;
                cursor: pointer;
                font-size: 20px;
                box-shadow: -2px 2px 10px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
                position: relative;
                animation: ai-pulse 2s infinite;
            }
            
            .ai-float-btn:hover {
                width: 140px;
                background: linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%);
                box-shadow: -4px 4px 15px rgba(0,0,0,0.3);
            }
            
            .ai-float-btn:hover .ai-btn-text {
                display: inline;
            }
            
            .ai-btn-text {
                display: none;
                margin-left: 8px;
                font-size: 13px;
                white-space: nowrap;
            }
            
            .ai-float-btn:active {
                transform: scale(0.95);
            }
            
            .ai-float-btn.summary::before { content: "✨"; }
            .ai-float-btn.comment::before { content: "🤖"; }
            .ai-float-btn.refine::before { content: "📝"; }
            
            .ai-panel-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: ai-fadeIn 0.3s ease;
            }
            
            .ai-panel-container {
                background: white;
                border-radius: 12px;
                width: 90%;
                max-width: 600px;
                max-height: 80vh;
                display: flex;
                flex-direction: column;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                overflow: hidden;
                animation: ai-fadeIn 0.3s ease;
            }
            
            .ai-panel-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }
            
            .ai-panel-title {
                font-size: 16px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .ai-panel-close {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                cursor: pointer;
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s ease;
            }
            
            .ai-panel-close:hover {
                background: rgba(255,255,255,0.3);
            }
            
            .ai-panel-body {
                padding: 20px;
                overflow-y: auto;
                flex: 1;
            }
            
            .ai-panel-footer {
                padding: 12px 20px;
                background: #f5f5f5;
                display: flex;
                justify-content: flex-end;
                gap: 10px;
            }
            
            .ai-btn {
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 14px;
                cursor: pointer;
                border: none;
                transition: all 0.2s ease;
            }
            
            .ai-btn-primary {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }
            
            .ai-btn-primary:hover {
                background: linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%);
            }
            
            .ai-btn-secondary {
                background: #e0e0e0;
                color: #333;
            }
            
            .ai-btn-secondary:hover {
                background: #d0d0d0;
            }
            
            .ai-btn:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
            
            .ai-loading {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 40px;
                flex-direction: column;
                gap: 16px;
            }
            
            .ai-loading-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid rgba(102, 126, 234, 0.2);
                border-top-color: #667eea;
                border-radius: 50%;
                animation: ai-spin 1s linear infinite;
            }
            
            .ai-loading-text {
                color: #666;
                font-size: 14px;
            }
            
            .ai-result-section {
                margin-bottom: 20px;
            }
            
            .ai-result-title {
                font-size: 15px;
                font-weight: 600;
                color: #667eea;
                margin-bottom: 12px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .ai-result-content {
                background: #f8f9fa;
                padding: 16px;
                border-radius: 8px;
                line-height: 1.7;
                color: #333;
                font-size: 14px;
            }
            
            .ai-keywords-container {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 8px;
            }
            
            .ai-keyword-tag {
                padding: 4px 12px;
                background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
                color: #1565c0;
                border-radius: 16px;
                font-size: 13px;
            }
            
            .ai-sentiment-bar {
                display: flex;
                height: 24px;
                border-radius: 12px;
                overflow: hidden;
                margin-bottom: 8px;
            }
            
            .ai-sentiment-positive {
                background: #4caf50;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 12px;
                font-weight: 600;
                min-width: 30px;
            }
            
            .ai-sentiment-neutral {
                background: #9e9e9e;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 12px;
                font-weight: 600;
                min-width: 30px;
            }
            
            .ai-sentiment-negative {
                background: #f44336;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 12px;
                font-weight: 600;
                min-width: 30px;
            }
            
            .ai-sentiment-labels {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                color: #666;
            }
            
            .ai-opinion-item {
                padding: 12px;
                margin-bottom: 8px;
                border-radius: 8px;
                border-left: 3px solid;
            }
            
            .ai-opinion-item.positive {
                border-color: #4caf50;
                background: #e8f5e9;
            }
            
            .ai-opinion-item.negative {
                border-color: #f44336;
                background: #ffebee;
            }
            
            .ai-opinion-item.neutral {
                border-color: #9e9e9e;
                background: #fafafa;
            }
            
            .ai-opinion-item.suggestion {
                border-color: #ff9800;
                background: #fff3e0;
            }
            
            .ai-opinion-user {
                font-size: 12px;
                color: #888;
                margin-bottom: 4px;
            }
            
            .ai-opinion-content {
                font-size: 14px;
                color: #333;
                line-height: 1.6;
            }
            
            .ai-inline-btn {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 6px 14px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 6px;
                font-size: 13px;
                cursor: pointer;
                margin: 0 8px;
                border: none;
                transition: all 0.2s ease;
                z-index: 9999;
            }
            
            .ai-inline-btn:hover {
                background: linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%);
                transform: translateY(-1px);
                box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
            }
            
            .ai-stats-box {
                display: flex;
                justify-content: space-around;
                padding: 16px;
                background: #f8f9fa;
                border-radius: 8px;
                margin-bottom: 20px;
            }
            
            .ai-stat-item {
                text-align: center;
            }
            
            .ai-stat-number {
                font-size: 24px;
                font-weight: 700;
                color: #667eea;
            }
            
            .ai-stat-label {
                font-size: 12px;
                color: #666;
                margin-top: 4px;
            }
            
            .ai-empty-state {
                text-align: center;
                padding: 40px;
                color: #888;
            }
            
            .ai-empty-icon {
                font-size: 48px;
                margin-bottom: 16px;
            }
        `;
        
        const styleId = 'AcFunHelper_AITextHelper_Styles';
        const existingStyle = document.getElementById(styleId);
        if (existingStyle) {
            existingStyle.remove();
        }
        
        createElementStyle(css, document.head, styleId);
        console.log('[AI Text Helper] 全局样式已添加');
    }

    injectFloatingButton() {
        console.log('[AI Text Helper] 开始注入浮动按钮');
        
        const existingContainer = document.querySelector('.ai-float-btn-container');
        if (existingContainer) {
            console.log('[AI Text Helper] 浮动按钮已存在，跳过');
            return;
        }

        const container = document.createElement('div');
        container.className = 'ai-float-btn-container';
        container.id = 'ai-float-btn-container';
        
        const currentUrl = window.location.href;
        const isVideoPage = /\/v\/ac\d+/.test(currentUrl);
        const isArticlePage = /\/a\/ac\d+/.test(currentUrl);
        
        console.log('[AI Text Helper] 当前页面:', currentUrl);
        console.log('[AI Text Helper] 是视频页面:', isVideoPage);
        console.log('[AI Text Helper] 是文章页面:', isArticlePage);
        
        if (isVideoPage || isArticlePage) {
            const summaryBtn = document.createElement('div');
            summaryBtn.className = 'ai-float-btn summary';
            summaryBtn.title = 'AI 智能摘要';
            summaryBtn.innerHTML = '<span class="ai-btn-text">AI 摘要</span>';
            summaryBtn.onclick = () => {
                console.log('[AI Text Helper] 摘要按钮被点击');
                this.summarizeContent();
            };
            container.appendChild(summaryBtn);
            
            const refineBtn = document.createElement('div');
            refineBtn.className = 'ai-float-btn refine';
            refineBtn.title = '智能精简（选中文本后使用）';
            refineBtn.innerHTML = '<span class="ai-btn-text">智能精简</span>';
            refineBtn.onclick = () => {
                console.log('[AI Text Helper] 精简按钮被点击');
                this.refineSelectedText();
            };
            container.appendChild(refineBtn);
        }
        
        const commentBtn = document.createElement('div');
        commentBtn.className = 'ai-float-btn comment';
        commentBtn.title = 'AI 评论分析';
        commentBtn.innerHTML = '<span class="ai-btn-text">评论分析</span>';
        commentBtn.onclick = () => {
            console.log('[AI Text Helper] 评论分析按钮被点击');
            this.analyzePageComments();
        };
        container.appendChild(commentBtn);
        
        document.body.appendChild(container);
        console.log('[AI Text Helper] 浮动按钮已添加到页面');
        console.log('[AI Text Helper] 容器元素:', container);
    }

    showPanel(title, content, options = {}) {
        console.log('[AI Text Helper] 显示面板:', title);
        
        const existingOverlay = document.querySelector('.ai-panel-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }

        const overlay = document.createElement('div');
        overlay.className = 'ai-panel-overlay';
        overlay.id = 'ai-panel-overlay';
        
        const panel = document.createElement('div');
        panel.className = 'ai-panel-container';
        
        panel.innerHTML = `
            <div class="ai-panel-header">
                <div class="ai-panel-title">${title}</div>
                <button class="ai-panel-close" id="ai-panel-close">×</button>
            </div>
            <div class="ai-panel-body" id="ai-panel-body">
                ${content}
            </div>
            ${options.showFooter ? `
            <div class="ai-panel-footer">
                <button class="ai-btn ai-btn-secondary" id="ai-panel-copy">复制内容</button>
                <button class="ai-btn ai-btn-primary" id="ai-panel-close-btn">关闭</button>
            </div>
            ` : ''}
        `;
        
        overlay.appendChild(panel);
        document.body.appendChild(overlay);
        
        const closePanel = () => {
            overlay.style.animation = 'ai-fadeIn 0.3s ease reverse';
            setTimeout(() => overlay.remove(), 300);
        };
        
        document.getElementById('ai-panel-close').onclick = closePanel;
        
        if (options.showFooter) {
            document.getElementById('ai-panel-close-btn').onclick = closePanel;
            document.getElementById('ai-panel-copy').onclick = () => {
                const bodyContent = document.getElementById('ai-panel-body').innerText;
                navigator.clipboard.writeText(bodyContent).then(() => {
                    LeftBottomNotif('内容已复制到剪贴板！', 'success', 2000);
                }).catch((err) => {
                    console.error('[AI Text Helper] 复制失败:', err);
                    LeftBottomNotif('复制失败，请手动复制', 'error', 2000);
                });
            };
        }
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closePanel();
            }
        });
        
        console.log('[AI Text Helper] 面板已显示');
    }

    showLoadingPanel(message = 'AI 正在分析中...') {
        this.showPanel('✨ AI 分析中', `
            <div class="ai-loading">
                <div class="ai-loading-spinner"></div>
                <div class="ai-loading-text">${message}</div>
            </div>
        `);
    }

    extractPageContent() {
        console.log('[AI Text Helper] 开始提取页面内容');
        
        let content = '';
        let title = document.title;
        
        const videoDescSelectors = [
            '.desc-content',
            '.video-description',
            '#area-description',
            '.description-content',
            '.article-content',
            '#area-article'
        ];
        
        for (const selector of videoDescSelectors) {
            const elem = document.querySelector(selector);
            if (elem) {
                const text = elem.innerText.trim();
                if (text.length > 20) {
                    content = text;
                    console.log('[AI Text Helper] 使用选择器找到内容:', selector, '长度:', text.length);
                    break;
                }
            }
        }
        
        const titleSelectors = [
            'h1.video-title',
            '.video-title',
            'h1.article-title',
            '.article-title',
            '.title-content'
        ];
        
        for (const selector of titleSelectors) {
            const elem = document.querySelector(selector);
            if (elem) {
                const text = elem.innerText.trim();
                if (text.length > 0) {
                    title = text;
                    console.log('[AI Text Helper] 使用选择器找到标题:', selector);
                    break;
                }
            }
        }
        
        if (!content || content.length < 20) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                content = metaDesc.getAttribute('content') || '';
                console.log('[AI Text Helper] 使用 meta description');
            }
        }
        
        console.log('[AI Text Helper] 提取结果 - 标题:', title.substring(0, 50));
        console.log('[AI Text Helper] 提取结果 - 内容长度:', content ? content.length : 0);
        
        return { title, content };
    }

    summarizeTextLocal(text, options = {}) {
        const { maxSentences = 5 } = options;
        
        console.log('[AI Text Helper] 本地摘要算法 - 输入长度:', text.length);
        
        if (!text || text.length < 20) {
            return {
                summary: '文本内容太短，无法生成有效的摘要。',
                keywords: [],
                sentences: []
            };
        }

        const sentences = this.splitIntoSentences(text);
        
        console.log('[AI Text Helper] 分割句子数:', sentences.length);
        
        if (sentences.length <= maxSentences) {
            return {
                summary: text,
                keywords: this.extractKeywords(text, 10),
                sentences: sentences
            };
        }

        const keywords = this.extractKeywords(text, 20);
        const keywordMap = {};
        keywords.forEach((kw, idx) => {
            keywordMap[kw.toLowerCase()] = keywords.length - idx;
        });

        const scoredSentences = sentences.map((sentence, index) => {
            let score = 0;
            
            if (index === 0) score += 5;
            if (index === 1) score += 3;
            if (index === sentences.length - 1) score += 2;
            
            const lowerSentence = sentence.toLowerCase();
            Object.keys(keywordMap).forEach(kw => {
                if (lowerSentence.includes(kw)) {
                    score += keywordMap[kw] * 0.5;
                }
            });

            const len = sentence.length;
            if (len > 15 && len < 150) score += 1;
            
            if (sentence.includes('"') || sentence.includes('"')) score += 1;
            
            const importantWords = ['重要', '关键', '核心', '主要', '首先', '其次', '最后', '总之', '因此', '所以'];
            importantWords.forEach(word => {
                if (sentence.includes(word)) score += 1;
            });

            return { sentence, score, index };
        });

        scoredSentences.sort((a, b) => b.score - a.score);
        
        const topSentences = scoredSentences
            .slice(0, maxSentences)
            .sort((a, b) => a.index - b.index)
            .map(s => s.sentence);

        const result = {
            summary: topSentences.join('。') + '。',
            keywords: keywords.slice(0, 10),
            sentences: sentences,
            scoredCount: scoredSentences.length
        };
        
        console.log('[AI Text Helper] 本地摘要算法 - 结果摘要长度:', result.summary.length);
        console.log('[AI Text Helper] 本地摘要算法 - 关键词:', result.keywords);
        
        return result;
    }

    splitIntoSentences(text) {
        const cleanedText = text
            .replace(/\n+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        
        const sentences = cleanedText.split(/([。！？.!?]+)/);
        const result = [];
        
        for (let i = 0; i < sentences.length; i += 2) {
            const sentence = sentences[i] ? sentences[i].trim() : '';
            const punctuation = sentences[i + 1] || '';
            
            if (sentence.length > 2) {
                result.push(sentence + punctuation);
            }
        }
        
        return result;
    }

    extractKeywords(text, maxCount = 10) {
        const stopWords = new Set([
            '的', '了', '是', '在', '我', '有', '和', '就', '不', '人', '都', '一', '一个',
            '上', '也', '很', '到', '说', '要', '去', '你', '会', '着', '没有', '看', '好',
            '自己', '这', '那', '他', '她', '它', '们', '这个', '那个', '什么', '怎么',
            '为什么', '哪', '谁', '多少', '几', '啊', '吧', '呢', '吗', '呀', '哦', '嗯',
            'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
            'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
            'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare',
            'and', 'or', 'but', 'if', 'because', 'as', 'until', 'while', 'of',
            'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into',
            'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from',
            'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again',
            'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why',
            'how', 'all', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
            'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
            's', 't', 'just', 'don', 'now', 'i', 'me', 'my', 'myself', 'we', 'our',
            'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves',
            'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it',
            'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what',
            'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am',
            '可以', '我们', '他们', '它们', '还是', '或者', '但是', '因为', '所以',
            '如果', '那么', '虽然', '但是', '而且', '并且', '或者', '以及', '等',
            '等等', '一下', '一些', '很多', '有点', '非常', '特别', '比较', '相当'
        ]);

        const wordFreq = {};

        const chineseWords = text.match(/[\u4e00-\u9fa5]{2,}/g) || [];
        
        chineseWords.forEach(word => {
            if (word.length >= 2 && !stopWords.has(word)) {
                wordFreq[word] = (wordFreq[word] || 0) + 1;
            }
        });

        const singleChars = text.split('');
        let currentWord = '';
        singleChars.forEach(char => {
            if (/[\u4e00-\u9fa5]/.test(char)) {
                currentWord += char;
            } else {
                if (currentWord.length >= 2 && !stopWords.has(currentWord)) {
                    wordFreq[currentWord] = (wordFreq[currentWord] || 0) + 1;
                }
                currentWord = '';
            }
        });
        if (currentWord.length >= 2 && !stopWords.has(currentWord)) {
            wordFreq[currentWord] = (wordFreq[currentWord] || 0) + 1;
        }

        const sortedWords = Object.entries(wordFreq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, maxCount)
            .map(([word]) => word);

        return sortedWords;
    }

    collectCommentsFromPage() {
        console.log('[AI Text Helper] 开始收集评论');
        
        const comments = [];
        
        const commentSelectors = [
            '.area-comment-item',
            '.ac-comment-item',
            '.comment-item',
            '.comment-list-item',
            '.ac-pc-comment .area-comment-item'
        ];
        
        let commentElements = [];
        
        for (const selector of commentSelectors) {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                commentElements = Array.from(elements);
                console.log('[AI Text Helper] 使用选择器找到评论:', selector, '数量:', elements.length);
                break;
            }
        }
        
        if (commentElements.length === 0) {
            const allDivs = document.querySelectorAll('div');
            allDivs.forEach(div => {
                if (div.classList.length > 0) {
                    const classNames = Array.from(div.classList).join(' ');
                    if (classNames.includes('comment') || classNames.includes('area-comment')) {
                        const contentElem = div.querySelector('.area-comment-des-content, .comment-content, [class*="content"]');
                        if (contentElem && contentElem.innerText.trim().length > 5) {
                            commentElements.push(div);
                        }
                    }
                }
            });
            console.log('[AI Text Helper] 通过类名模糊匹配找到评论:', commentElements.length);
        }
        
        commentElements.forEach((elem, idx) => {
            try {
                const contentSelectors = [
                    '.area-comment-des-content',
                    '.comment-content',
                    '[class*="content"]',
                    'p'
                ];
                
                let contentElem = null;
                for (const selector of contentSelectors) {
                    const found = elem.querySelector(selector);
                    if (found && found.innerText.trim().length > 5) {
                        contentElem = found;
                        break;
                    }
                }
                
                if (!contentElem) {
                    return;
                }
                
                const userSelectors = [
                    'a.name',
                    '.username',
                    '.user-name',
                    '[class*="name"] a',
                    '[class*="user"]'
                ];
                
                let userElem = null;
                for (const selector of userSelectors) {
                    const found = elem.querySelector(selector);
                    if (found && found.innerText.trim().length > 0) {
                        userElem = found;
                        break;
                    }
                }
                
                const likeSelectors = [
                    '.area-comment-like',
                    '.like-count',
                    '[class*="like"]'
                ];
                
                let likeElem = null;
                for (const selector of likeSelectors) {
                    const found = elem.querySelector(selector);
                    if (found) {
                        likeElem = found;
                        break;
                    }
                }
                
                comments.push({
                    content: contentElem.innerText.trim(),
                    username: userElem ? userElem.innerText.trim() : '匿名用户',
                    like: likeElem ? parseInt(likeElem.innerText.replace(/[^0-9]/g, '')) || 0 : 0,
                    index: idx
                });
            } catch (e) {
                console.log('[AI Text Helper] 解析评论出错:', e);
            }
        });
        
        console.log('[AI Text Helper] 收集到评论总数:', comments.length);
        return comments;
    }

    analyzeCommentsLocal(comments) {
        console.log('[AI Text Helper] 开始分析评论，数量:', comments.length);
        
        if (!comments || comments.length === 0) {
            return {
                total: 0,
                summary: '没有可分析的评论，请确保评论区已加载完成。',
                opinions: [],
                hotTopics: [],
                sentiment: { positive: 0, negative: 0, neutral: 0 }
            };
        }

        const positiveWords = new Set([
            '好', '棒', '优秀', '厉害', '精彩', '喜欢', '爱', '支持', '赞', '不错',
            '完美', '强大', '感谢', '加油', '期待', '开心', '高兴', '满意', '惊喜',
            '可爱', '漂亮', '帅气', '美丽', '好听', '好看', '精彩', '经典', '神作',
            '推荐', '必须', '一定', '绝对', '超棒', '太棒', '真好', '太好', '喜欢',
            'awesome', 'great', 'good', 'excellent', 'amazing', 'love', 'like', 'best',
            'wonderful', 'perfect', 'fantastic', 'super', 'cool', 'nice', 'happy',
            '哈哈', '233', '笑死', '有趣', '有意思', '搞笑', '逗', '萌', '可爱',
            '感谢', '谢谢', '多谢', '感激', '支持', '顶', 'up', 'UP', '好样'
        ]);

        const negativeWords = new Set([
            '差', '烂', '垃圾', '糟糕', '失望', '讨厌', '烦', '生气', '愤怒', '不好',
            '可惜', '遗憾', '难过', '伤心', '后悔', '失败', '问题', 'bug', '错误',
            '难看', '难听', '无聊', '没劲', '浪费', '坑', '骗', '坑爹', '无语',
            'bad', 'terrible', 'awful', 'worst', 'hate', 'dislike', 'sad', 'angry',
            'disappointed', 'poor', 'sucks', 'stupid', 'horrible', 'shit', 'fuck',
            '唉', '哎', '唉', '无语', '醉了', '服了', '够了', '算了', '失望',
            '不行', '不能', '不会', '不要', '别', '没有', '没', '无', '不'
        ]);

        const suggestionWords = new Set([
            '建议', '希望', '应该', '可以', '需要', '能否', '能不能', '请', '最好',
            '要是', '如果', '假如', '建议', '提议', '推荐', '认为', '觉得',
            'suggest', 'hope', 'should', 'could', 'need', 'please', 'maybe', 'wish'
        ]);

        let positiveCount = 0;
        let negativeCount = 0;
        let neutralCount = 0;
        const opinions = [];
        const hotTopicMap = {};

        comments.forEach((comment, idx) => {
            const text = comment.content;
            const lowerText = text.toLowerCase();
            
            let sentiment = 'neutral';
            let score = 0;

            positiveWords.forEach(word => {
                if (lowerText.includes(word)) score += 1;
            });

            negativeWords.forEach(word => {
                if (lowerText.includes(word)) score -= 1;
            });

            let isSuggestion = false;
            suggestionWords.forEach(word => {
                if (lowerText.includes(word)) isSuggestion = true;
            });

            if (score > 0) {
                sentiment = 'positive';
                positiveCount++;
            } else if (score < 0) {
                sentiment = 'negative';
                negativeCount++;
            } else {
                neutralCount++;
            }

            if (isSuggestion) {
                opinions.push({
                    type: 'suggestion',
                    content: text,
                    index: idx,
                    username: comment.username || '匿名用户'
                });
            } else if (text.length > 10) {
                opinions.push({
                    type: sentiment,
                    content: text,
                    index: idx,
                    username: comment.username || '匿名用户'
                });
            }

            const keywords = this.extractKeywords(text, 5);
            keywords.forEach(kw => {
                hotTopicMap[kw] = (hotTopicMap[kw] || 0) + 1;
            });
        });

        const hotTopics = Object.entries(hotTopicMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([topic, count]) => ({ topic, count }));

        const total = comments.length;
        let summary = `共分析了 ${total} 条评论。`;
        
        if (total > 0) {
            const posPercent = Math.round((positiveCount / total) * 100);
            const negPercent = Math.round((negativeCount / total) * 100);
            const neuPercent = Math.round((neutralCount / total) * 100);
            
            summary += `其中正面评价 ${positiveCount} 条(${posPercent}%)，负面评价 ${negativeCount} 条(${negPercent}%)，中性评价 ${neutralCount} 条(${neuPercent}%)。`;
        }

        const result = {
            total,
            summary,
            opinions: opinions.slice(0, 20),
            hotTopics,
            sentiment: {
                positive: positiveCount,
                negative: negativeCount,
                neutral: neutralCount
            }
        };
        
        console.log('[AI Text Helper] 评论分析结果:', result);
        return result;
    }

    async summarizeContent() {
        console.log('[AI Text Helper] summarizeContent 被调用');
        
        if (this.isAnalyzing) {
            LeftBottomNotif('正在分析中，请稍候...', 'info', 2000);
            return;
        }

        this.isAnalyzing = true;
        this.showLoadingPanel('AI 正在分析内容，请稍候...');
        
        try {
            const { title, content } = this.extractPageContent();
            
            console.log('[AI Text Helper] 提取的内容:', { title, contentLength: content.length });
            
            if (!content || content.length < 20) {
                document.getElementById('ai-panel-body').innerHTML = `
                    <div class="ai-empty-state">
                        <div class="ai-empty-icon">📄</div>
                        <div style="font-size: 16px; margin-bottom: 8px;">未找到可分析的内容</div>
                        <div style="color: #888; font-size: 14px;">
                            请确保页面已完全加载，或者尝试选中部分文本后使用"智能精简"功能
                        </div>
                    </div>
                `;
                this.isAnalyzing = false;
                return;
            }

            const result = this.summarizeTextLocal(content, { maxSentences: 5 });
            
            console.log('[AI Text Helper] 分析结果:', result);
            
            const keywordsHtml = result.keywords.length > 0 ? `
                <div class="ai-result-section">
                    <div class="ai-result-title">🏷️ 核心关键词</div>
                    <div class="ai-keywords-container">
                        ${result.keywords.map(kw => `<span class="ai-keyword-tag">${kw}</span>`).join('')}
                    </div>
                </div>
            ` : '';

            document.getElementById('ai-panel-body').innerHTML = `
                <div class="ai-result-section">
                    <div class="ai-result-title">✨ AI 智能摘要</div>
                    <div class="ai-result-content">${result.summary}</div>
                </div>
                ${keywordsHtml}
                <div class="ai-result-section">
                    <div class="ai-result-title">📊 分析统计</div>
                    <div class="ai-stats-box">
                        <div class="ai-stat-item">
                            <div class="ai-stat-number">${result.sentences.length}</div>
                            <div class="ai-stat-label">原文句子数</div>
                        </div>
                        <div class="ai-stat-item">
                            <div class="ai-stat-number">${content.length}</div>
                            <div class="ai-stat-label">原文字符数</div>
                        </div>
                        <div class="ai-stat-item">
                            <div class="ai-stat-number">${result.summary.length}</div>
                            <div class="ai-stat-label">摘要字符数</div>
                        </div>
                        <div class="ai-stat-item">
                            <div class="ai-stat-number">${Math.round((1 - result.summary.length / content.length) * 100)}%</div>
                            <div class="ai-stat-label">精简率</div>
                        </div>
                    </div>
                </div>
            `;
            
            const footer = document.createElement('div');
            footer.className = 'ai-panel-footer';
            footer.innerHTML = `
                <button class="ai-btn ai-btn-secondary" id="ai-panel-copy">复制内容</button>
                <button class="ai-btn ai-btn-primary" id="ai-panel-close-btn">关闭</button>
            `;
            
            const panel = document.querySelector('.ai-panel-container');
            if (panel && !panel.querySelector('.ai-panel-footer')) {
                panel.appendChild(footer);
                
                document.getElementById('ai-panel-close-btn').onclick = () => {
                    document.getElementById('ai-panel-overlay').remove();
                };
                
                document.getElementById('ai-panel-copy').onclick = () => {
                    const textToCopy = `标题：${title}\n\n摘要：${result.summary}\n\n关键词：${result.keywords.join('、')}`;
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        LeftBottomNotif('内容已复制到剪贴板！', 'success', 2000);
                    });
                };
            }
            
            LeftBottomNotif('AI 分析完成！', 'success', 2000);

        } catch (error) {
            console.error('[AI Text Helper] 分析错误:', error);
            document.getElementById('ai-panel-body').innerHTML = `
                <div class="ai-empty-state">
                    <div class="ai-empty-icon">❌</div>
                    <div style="font-size: 16px; margin-bottom: 8px;">分析过程中出现错误</div>
                    <div style="color: #888; font-size: 14px;">${error.message || '未知错误'}</div>
                </div>
            `;
            LeftBottomNotif('分析过程中出现错误', 'error', 2000);
        } finally {
            this.isAnalyzing = false;
        }
    }

    async analyzePageComments() {
        console.log('[AI Text Helper] analyzePageComments 被调用');
        
        if (this.isAnalyzing) {
            LeftBottomNotif('正在分析中，请稍候...', 'info', 2000);
            return;
        }

        this.isAnalyzing = true;
        this.showLoadingPanel('AI 正在分析评论，请稍候...');
        
        try {
            const comments = this.collectCommentsFromPage();
            
            console.log('[AI Text Helper] 收集到评论:', comments.length);
            
            if (comments.length === 0) {
                document.getElementById('ai-panel-body').innerHTML = `
                    <div class="ai-empty-state">
                        <div class="ai-empty-icon">💬</div>
                        <div style="font-size: 16px; margin-bottom: 8px;">未找到可分析的评论</div>
                        <div style="color: #888; font-size: 14px;">
                            请滚动到评论区，确保评论已完全加载后再试
                        </div>
                    </div>
                `;
                this.isAnalyzing = false;
                return;
            }

            const result = this.analyzeCommentsLocal(comments);
            
            console.log('[AI Text Helper] 评论分析结果:', result);
            
            const sentimentPercent = {
                positive: result.total > 0 ? Math.round((result.sentiment.positive / result.total) * 100) : 0,
                negative: result.total > 0 ? Math.round((result.sentiment.negative / result.total) * 100) : 0,
                neutral: result.total > 0 ? Math.round((result.sentiment.neutral / result.total) * 100) : 0
            };

            let opinionsHtml = '';
            if (result.opinions && result.opinions.length > 0) {
                opinionsHtml = `
                    <div class="ai-result-section">
                        <div class="ai-result-title">💬 代表性观点</div>
                        ${result.opinions.slice(0, 8).map(op => `
                            <div class="ai-opinion-item ${op.type}">
                                <div class="ai-opinion-user">${op.username} ${op.type === 'positive' ? '👍 正面' : op.type === 'negative' ? '👎 负面' : op.type === 'suggestion' ? '💡 建议' : '😐 中性'}</div>
                                <div class="ai-opinion-content">${op.content}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            let hotTopicsHtml = '';
            if (result.hotTopics && result.hotTopics.length > 0) {
                hotTopicsHtml = `
                    <div class="ai-result-section">
                        <div class="ai-result-title">🔥 热门话题</div>
                        <div class="ai-keywords-container">
                            ${result.hotTopics.map(t => `<span class="ai-keyword-tag">${t.topic} (${t.count})</span>`).join('')}
                        </div>
                    </div>
                `;
            }

            document.getElementById('ai-panel-body').innerHTML = `
                <div class="ai-result-section">
                    <div class="ai-result-title">📊 评论区 AI 分析报告</div>
                    <div class="ai-stats-box">
                        <div class="ai-stat-item">
                            <div class="ai-stat-number">${result.total}</div>
                            <div class="ai-stat-label">评论总数</div>
                        </div>
                        <div class="ai-stat-item">
                            <div class="ai-stat-number" style="color: #4caf50;">${result.sentiment.positive}</div>
                            <div class="ai-stat-label">正面评价</div>
                        </div>
                        <div class="ai-stat-item">
                            <div class="ai-stat-number" style="color: #9e9e9e;">${result.sentiment.neutral}</div>
                            <div class="ai-stat-label">中性评价</div>
                        </div>
                        <div class="ai-stat-item">
                            <div class="ai-stat-number" style="color: #f44336;">${result.sentiment.negative}</div>
                            <div class="ai-stat-label">负面评价</div>
                        </div>
                    </div>
                </div>
                
                <div class="ai-result-section">
                    <div class="ai-result-title">📈 情感分布</div>
                    <div class="ai-sentiment-bar">
                        <div class="ai-sentiment-positive" style="width: ${sentimentPercent.positive}%;">
                            ${sentimentPercent.positive > 10 ? sentimentPercent.positive + '%' : ''}
                        </div>
                        <div class="ai-sentiment-neutral" style="width: ${sentimentPercent.neutral}%;">
                            ${sentimentPercent.neutral > 10 ? sentimentPercent.neutral + '%' : ''}
                        </div>
                        <div class="ai-sentiment-negative" style="width: ${sentimentPercent.negative}%;">
                            ${sentimentPercent.negative > 10 ? sentimentPercent.negative + '%' : ''}
                        </div>
                    </div>
                    <div class="ai-sentiment-labels">
                        <span style="color: #4caf50;">正面 ${sentimentPercent.positive}%</span>
                        <span style="color: #9e9e9e;">中性 ${sentimentPercent.neutral}%</span>
                        <span style="color: #f44336;">负面 ${sentimentPercent.negative}%</span>
                    </div>
                </div>
                
                ${hotTopicsHtml}
                ${opinionsHtml}
            `;
            
            const footer = document.createElement('div');
            footer.className = 'ai-panel-footer';
            footer.innerHTML = `
                <button class="ai-btn ai-btn-secondary" id="ai-panel-copy">复制报告</button>
                <button class="ai-btn ai-btn-primary" id="ai-panel-close-btn">关闭</button>
            `;
            
            const panel = document.querySelector('.ai-panel-container');
            if (panel && !panel.querySelector('.ai-panel-footer')) {
                panel.appendChild(footer);
                
                document.getElementById('ai-panel-close-btn').onclick = () => {
                    document.getElementById('ai-panel-overlay').remove();
                };
                
                document.getElementById('ai-panel-copy').onclick = () => {
                    const textToCopy = `评论区 AI 分析报告\n\n${result.summary}\n\n正面评价: ${result.sentiment.positive}条\n中性评价: ${result.sentiment.neutral}条\n负面评价: ${result.sentiment.negative}条\n\n热门话题: ${result.hotTopics.map(t => t.topic).join('、')}`;
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        LeftBottomNotif('报告已复制到剪贴板！', 'success', 2000);
                    });
                };
            }
            
            LeftBottomNotif(`已分析 ${result.total} 条评论！`, 'success', 2000);

        } catch (error) {
            console.error('[AI Text Helper] 评论分析错误:', error);
            document.getElementById('ai-panel-body').innerHTML = `
                <div class="ai-empty-state">
                    <div class="ai-empty-icon">❌</div>
                    <div style="font-size: 16px; margin-bottom: 8px;">分析过程中出现错误</div>
                    <div style="color: #888; font-size: 14px;">${error.message || '未知错误'}</div>
                </div>
            `;
            LeftBottomNotif('分析过程中出现错误', 'error', 2000);
        } finally {
            this.isAnalyzing = false;
        }
    }

    async refineSelectedText() {
        console.log('[AI Text Helper] refineSelectedText 被调用');
        
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();
        
        console.log('[AI Text Helper] 选中的文本:', selectedText ? selectedText.substring(0, 50) : '空');
        
        if (!selectedText || selectedText.length < 10) {
            LeftBottomNotif('请先选中要精简的文本内容（至少10个字符）', 'warning', 3000);
            
            this.showPanel('📝 智能精简使用说明', `
                <div style="padding: 20px;">
                    <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #667eea;">如何使用智能精简功能</div>
                    
                    <div style="margin-bottom: 20px;">
                        <div style="font-weight: 600; margin-bottom: 8px;">步骤：</div>
                        <ol style="margin: 0; padding-left: 20px; line-height: 2;">
                            <li>在页面上用鼠标选中要精简的文本内容</li>
                            <li>点击右侧浮动栏的"智能精简"按钮</li>
                            <li>AI 会自动提取核心内容，生成精简版</li>
                        </ol>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 16px; border-radius: 8px;">
                        <div style="font-weight: 600; margin-bottom: 8px; color: #667eea;">💡 提示</div>
                        <div style="color: #666; font-size: 14px; line-height: 1.6;">
                            智能精简功能会自动提取选中内容的核心观点和重要信息，去除冗余表达，保留精华内容。适合用于快速阅读长文本、提取核心观点等场景。
                        </div>
                    </div>
                </div>
            `, { showFooter: true });
            
            return;
        }

        this.isAnalyzing = true;
        this.showLoadingPanel('AI 正在精简文本，请稍候...');
        
        try {
            const result = this.summarizeTextLocal(selectedText, { maxSentences: 10 });
            
            const reductionRate = Math.round((1 - result.summary.length / selectedText.length) * 100);
            
            document.getElementById('ai-panel-body').innerHTML = `
                <div class="ai-result-section">
                    <div class="ai-result-title">✨ AI 智能精简结果</div>
                    <div class="ai-result-content">${result.summary}</div>
                </div>
                
                <div class="ai-result-section">
                    <div class="ai-result-title">📊 精简统计</div>
                    <div class="ai-stats-box">
                        <div class="ai-stat-item">
                            <div class="ai-stat-number">${selectedText.length}</div>
                            <div class="ai-stat-label">原文字符</div>
                        </div>
                        <div class="ai-stat-item">
                            <div class="ai-stat-number">${result.summary.length}</div>
                            <div class="ai-stat-label">精简后字符</div>
                        </div>
                        <div class="ai-stat-item">
                            <div class="ai-stat-number" style="color: #4caf50;">${reductionRate}%</div>
                            <div class="ai-stat-label">精简率</div>
                        </div>
                    </div>
                </div>
                
                <div class="ai-result-section">
                    <div class="ai-result-title">📄 原始内容</div>
                    <div style="max-height: 200px; overflow-y: auto; padding: 16px; background: #fafafa; border-radius: 8px; font-size: 13px; line-height: 1.7; color: #666;">
                        ${selectedText}
                    </div>
                </div>
            `;
            
            const footer = document.createElement('div');
            footer.className = 'ai-panel-footer';
            footer.innerHTML = `
                <button class="ai-btn ai-btn-secondary" id="ai-panel-copy">复制精简结果</button>
                <button class="ai-btn ai-btn-primary" id="ai-panel-close-btn">关闭</button>
            `;
            
            const panel = document.querySelector('.ai-panel-container');
            if (panel && !panel.querySelector('.ai-panel-footer')) {
                panel.appendChild(footer);
                
                document.getElementById('ai-panel-close-btn').onclick = () => {
                    document.getElementById('ai-panel-overlay').remove();
                };
                
                document.getElementById('ai-panel-copy').onclick = () => {
                    navigator.clipboard.writeText(result.summary).then(() => {
                        LeftBottomNotif('精简结果已复制到剪贴板！', 'success', 2000);
                    });
                };
            }
            
            LeftBottomNotif(`AI 精简完成！精简率 ${reductionRate}%`, 'success', 2000);

        } catch (error) {
            console.error('[AI Text Helper] 精简错误:', error);
            document.getElementById('ai-panel-body').innerHTML = `
                <div class="ai-empty-state">
                    <div class="ai-empty-icon">❌</div>
                    <div style="font-size: 16px; margin-bottom: 8px;">处理过程中出现错误</div>
                    <div style="color: #888; font-size: 14px;">${error.message || '未知错误'}</div>
                </div>
            `;
            LeftBottomNotif('处理过程中出现错误', 'error', 2000);
        } finally {
            this.isAnalyzing = false;
        }
    }

    addInlineButtons() {
        console.log('[AI Text Helper] 尝试添加入口按钮到页面');
        
        const currentUrl = window.location.href;
        const isVideoPage = /\/v\/ac\d+/.test(currentUrl);
        const isArticlePage = /\/a\/ac\d+/.test(currentUrl);
        
        console.log('[AI Text Helper] 当前页面类型:', { isVideoPage, isArticlePage });
        
        if (isVideoPage) {
            this.addVideoPageButtons();
        }
        
        if (isArticlePage) {
            this.addArticlePageButtons();
        }
        
        this.addCommentAreaButton();
    }

    addVideoPageButtons() {
        console.log('[AI Text Helper] 添加视频页面按钮');
        
        if (this.aiButtonsAdded.video) {
            console.log('[AI Text Helper] 视频页面按钮已添加，跳过');
            return;
        }

        const tryAddButton = () => {
            console.log('[AI Text Helper] 尝试查找视频页面按钮位置');
            
            const targetSelectors = [
                '.desc-operate',
                '.video-toolbar',
                '.action-bar',
                '#area-tool',
                '.video-actions',
                '.operate-area',
                '[class*="operate"]',
                '[class*="toolbar"]'
            ];
            
            for (const selector of targetSelectors) {
                const target = document.querySelector(selector);
                if (target) {
                    console.log('[AI Text Helper] 找到目标位置:', selector);
                    
                    if (target.querySelector('.ai-inline-btn')) {
                        console.log('[AI Text Helper] 按钮已存在');
                        this.aiButtonsAdded.video = true;
                        return true;
                    }
                    
                    const btnContainer = document.createElement('span');
                    btnContainer.style.display = 'inline-flex';
                    btnContainer.style.alignItems = 'center';
                    btnContainer.style.gap = '8px';
                    btnContainer.style.marginLeft = '12px';
                    btnContainer.style.zIndex = '9999';
                    
                    const summaryBtn = document.createElement('button');
                    summaryBtn.className = 'ai-inline-btn';
                    summaryBtn.innerHTML = '✨ AI 摘要';
                    summaryBtn.onclick = (e) => {
                        e.stopPropagation();
                        console.log('[AI Text Helper] 视频页面摘要按钮点击');
                        this.summarizeContent();
                    };
                    
                    const refineBtn = document.createElement('button');
                    refineBtn.className = 'ai-inline-btn';
                    refineBtn.style.background = '#f5f5f5';
                    refineBtn.style.color = '#333';
                    refineBtn.style.border = '1px solid #e0e0e0';
                    refineBtn.innerHTML = '📝 智能精简';
                    refineBtn.onclick = (e) => {
                        e.stopPropagation();
                        console.log('[AI Text Helper] 视频页面精简按钮点击');
                        this.refineSelectedText();
                    };
                    
                    btnContainer.appendChild(summaryBtn);
                    btnContainer.appendChild(refineBtn);
                    target.appendChild(btnContainer);
                    
                    console.log('[AI Text Helper] 视频页面按钮已添加');
                    this.aiButtonsAdded.video = true;
                    LeftBottomNotif('AI 功能按钮已添加！', 'info', 2000);
                    return true;
                }
            }
            
            console.log('[AI Text Helper] 未找到目标位置，继续等待...');
            return false;
        };

        const timer = setInterval(() => {
            if (tryAddButton()) {
                clearInterval(timer);
            }
        }, 1000);

        setTimeout(() => {
            clearInterval(timer);
            if (!this.aiButtonsAdded.video) {
                console.log('[AI Text Helper] 视频页面按钮添加超时，使用浮动按钮');
            }
        }, 30000);
    }

    addArticlePageButtons() {
        console.log('[AI Text Helper] 添加文章页面按钮');
        
        if (this.aiButtonsAdded.article) {
            console.log('[AI Text Helper] 文章页面按钮已添加，跳过');
            return;
        }

        const tryAddButton = () => {
            console.log('[AI Text Helper] 尝试查找文章页面按钮位置');
            
            const targetSelectors = [
                '.article-toolbar',
                '.article-actions',
                '#area-tool',
                '.article-header',
                '.operate-area',
                '[class*="operate"]',
                '[class*="toolbar"]'
            ];
            
            for (const selector of targetSelectors) {
                const target = document.querySelector(selector);
                if (target) {
                    console.log('[AI Text Helper] 找到目标位置:', selector);
                    
                    if (target.querySelector('.ai-inline-btn')) {
                        console.log('[AI Text Helper] 按钮已存在');
                        this.aiButtonsAdded.article = true;
                        return true;
                    }
                    
                    const btnContainer = document.createElement('span');
                    btnContainer.style.display = 'inline-flex';
                    btnContainer.style.alignItems = 'center';
                    btnContainer.style.gap = '8px';
                    btnContainer.style.marginLeft = '12px';
                    btnContainer.style.zIndex = '9999';
                    
                    const summaryBtn = document.createElement('button');
                    summaryBtn.className = 'ai-inline-btn';
                    summaryBtn.innerHTML = '✨ AI 摘要';
                    summaryBtn.onclick = (e) => {
                        e.stopPropagation();
                        console.log('[AI Text Helper] 文章页面摘要按钮点击');
                        this.summarizeContent();
                    };
                    
                    const refineBtn = document.createElement('button');
                    refineBtn.className = 'ai-inline-btn';
                    refineBtn.style.background = '#f5f5f5';
                    refineBtn.style.color = '#333';
                    refineBtn.style.border = '1px solid #e0e0e0';
                    refineBtn.innerHTML = '📝 智能精简';
                    refineBtn.onclick = (e) => {
                        e.stopPropagation();
                        console.log('[AI Text Helper] 文章页面精简按钮点击');
                        this.refineSelectedText();
                    };
                    
                    btnContainer.appendChild(summaryBtn);
                    btnContainer.appendChild(refineBtn);
                    target.appendChild(btnContainer);
                    
                    console.log('[AI Text Helper] 文章页面按钮已添加');
                    this.aiButtonsAdded.article = true;
                    return true;
                }
            }
            
            console.log('[AI Text Helper] 未找到目标位置，继续等待...');
            return false;
        };

        const timer = setInterval(() => {
            if (tryAddButton()) {
                clearInterval(timer);
            }
        }, 1000);

        setTimeout(() => {
            clearInterval(timer);
            if (!this.aiButtonsAdded.article) {
                console.log('[AI Text Helper] 文章页面按钮添加超时，使用浮动按钮');
            }
        }, 30000);
    }

    addCommentAreaButton() {
        console.log('[AI Text Helper] 添加评论区按钮');
        
        if (this.aiButtonsAdded.comment) {
            console.log('[AI Text Helper] 评论区按钮已添加，跳过');
            return;
        }

        const tryAddButton = () => {
            console.log('[AI Text Helper] 尝试查找评论区按钮位置');
            
            const targetSelectors = [
                '.area-comment-header',
                '.ac-comment-header',
                '.comment-header',
                '.ac-pc-comment .area-comment-title',
                '[class*="comment-header"]',
                '[class*="comment-title"]'
            ];
            
            for (const selector of targetSelectors) {
                const target = document.querySelector(selector);
                if (target) {
                    console.log('[AI Text Helper] 找到目标位置:', selector);
                    
                    if (target.querySelector('.ai-inline-btn')) {
                        console.log('[AI Text Helper] 按钮已存在');
                        this.aiButtonsAdded.comment = true;
                        return true;
                    }
                    
                    const analyzeBtn = document.createElement('button');
                    analyzeBtn.className = 'ai-inline-btn';
                    analyzeBtn.innerHTML = '🤖 AI 分析评论';
                    analyzeBtn.onclick = (e) => {
                        e.stopPropagation();
                        console.log('[AI Text Helper] 评论区分析按钮点击');
                        this.analyzePageComments();
                    };
                    
                    target.appendChild(analyzeBtn);
                    
                    console.log('[AI Text Helper] 评论区按钮已添加');
                    this.aiButtonsAdded.comment = true;
                    return true;
                }
            }
            
            console.log('[AI Text Helper] 未找到目标位置，继续等待...');
            return false;
        };

        const timer = setInterval(() => {
            if (tryAddButton()) {
                clearInterval(timer);
            }
        }, 1000);

        setTimeout(() => {
            clearInterval(timer);
            if (!this.aiButtonsAdded.comment) {
                console.log('[AI Text Helper] 评论区按钮添加超时，使用浮动按钮');
            }
        }, 30000);
    }
}

console.log('[AI Text Helper] 类定义完成');

if (typeof AITextHelper !== 'undefined') {
    console.log('[AI Text Helper] AITextHelper 类已成功定义');
} else {
    console.error('[AI Text Helper] AITextHelper 类定义失败');
}
