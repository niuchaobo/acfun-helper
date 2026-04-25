class AITextHelper extends AcFunHelperFgFrame {
    constructor() {
        super();
        this.devMode = false;
        this.cache = {};
        this.isAnalyzing = false;
        this.aiConfig = null;
    }

    onLoad() {
        this.addAIStyles();
        this.initializeConfig();
    }

    async initializeConfig() {
        this.aiConfig = await this.getConfig();
    }

    async getConfig() {
        const defaultConfig = {
            enabled: true,
            apiProvider: 'local',
            apiKey: '',
            apiEndpoint: '',
            summaryLength: 'medium',
            commentAnalysisDepth: 'medium',
            autoAnalyzeOnLoad: false
        };
        
        const savedConfig = await ExtOptions.getValue('AITextHelperConfig');
        return { ...defaultConfig, ...savedConfig };
    }

    async saveConfig(config) {
        this.aiConfig = { ...this.aiConfig, ...config };
        await ExtOptions.setValue('AITextHelperConfig', this.aiConfig);
    }

    addAIStyles() {
        const css = `
            @keyframes ai-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .ai-helper-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 6px 12px;
                margin: 0 4px;
                border-radius: 4px;
                font-size: 13px;
                cursor: pointer;
                transition: all 0.2s ease;
                border: none;
                outline: none;
            }
            
            .ai-helper-btn.primary {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }
            
            .ai-helper-btn.primary:hover {
                background: linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%);
                transform: translateY(-1px);
                box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
            }
            
            .ai-helper-btn.secondary {
                background: #f5f5f5;
                color: #333;
                border: 1px solid #e0e0e0;
            }
            
            .ai-helper-btn.secondary:hover {
                background: #e8e8e8;
            }
            
            .ai-helper-btn:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
            
            .ai-loading-spinner {
                width: 14px;
                height: 14px;
                border: 2px solid rgba(255,255,255,0.3);
                border-top-color: white;
                border-radius: 50%;
                animation: ai-spin 0.8s linear infinite;
                margin-right: 6px;
            }
            
            .ai-result-panel {
                background: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                padding: 16px;
                margin: 12px 0;
                border-left: 4px solid #667eea;
            }
            
            .ai-result-panel.dark {
                background: #1e1e1e;
                color: #e0e0e0;
            }
            
            .ai-result-title {
                font-size: 15px;
                font-weight: 600;
                margin-bottom: 12px;
                color: #333;
                display: flex;
                align-items: center;
            }
            
            .ai-result-title.dark {
                color: #fff;
            }
            
            .ai-result-title::before {
                content: "✨";
                margin-right: 8px;
            }
            
            .ai-result-content {
                font-size: 14px;
                line-height: 1.7;
                color: #555;
            }
            
            .ai-result-content.dark {
                color: #ccc;
            }
            
            .ai-keyword-tag {
                display: inline-block;
                padding: 4px 10px;
                margin: 4px;
                background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
                color: #1565c0;
                border-radius: 16px;
                font-size: 13px;
            }
            
            .ai-keyword-tag.dark {
                background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
                color: #bbdefb;
            }
            
            .ai-comment-summary {
                margin: 8px 0;
                padding: 12px;
                background: #fafafa;
                border-radius: 6px;
            }
            
            .ai-comment-summary.dark {
                background: #2a2a2a;
            }
            
            .ai-comment-type {
                font-weight: 600;
                color: #667eea;
                margin-bottom: 8px;
            }
            
            .ai-float-panel {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                z-index: 100000;
                min-width: 400px;
                max-width: 600px;
                max-height: 80vh;
                overflow: hidden;
            }
            
            .ai-float-panel-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }
            
            .ai-float-panel-title {
                font-size: 16px;
                font-weight: 600;
            }
            
            .ai-float-panel-close {
                width: 28px;
                height: 28px;
                border-radius: 50%;
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                cursor: pointer;
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .ai-float-panel-close:hover {
                background: rgba(255,255,255,0.3);
            }
            
            .ai-float-panel-body {
                padding: 20px;
                max-height: calc(80vh - 70px);
                overflow-y: auto;
            }
            
            .ai-float-panel-footer {
                padding: 12px 20px;
                background: #f5f5f5;
                display: flex;
                justify-content: flex-end;
                gap: 8px;
            }
            
            .ai-progress-bar {
                height: 4px;
                background: #e0e0e0;
                border-radius: 2px;
                overflow: hidden;
                margin: 8px 0;
            }
            
            .ai-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #667eea, #764ba2);
                transition: width 0.3s ease;
            }
            
            .ai-opinion-item {
                padding: 10px;
                margin: 6px 0;
                border-left: 3px solid;
                background: #fafafa;
                border-radius: 0 6px 6px 0;
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
        `;
        createElementStyle(css, document.head, "AcFunHelper_AITextHelper");
    }

    extractTextFromElement(selector) {
        const element = document.querySelector(selector);
        if (!element) return null;
        return element.innerText.trim();
    }

    extractVideoDescription() {
        const descSelectors = [
            '.video-description',
            '.desc-content',
            '.article-content',
            '#area-description'
        ];
        
        for (const selector of descSelectors) {
            const text = this.extractTextFromElement(selector);
            if (text && text.length > 10) {
                return text;
            }
        }
        return null;
    }

    extractArticleContent() {
        const articleSelectors = [
            '.article-content',
            '#area-article',
            '.main-content',
            '.article-detail'
        ];
        
        for (const selector of articleSelectors) {
            const text = this.extractTextFromElement(selector);
            if (text && text.length > 50) {
                return text;
            }
        }
        return null;
    }

    extractVideoTitle() {
        const titleSelectors = [
            '.video-title',
            '.title-content',
            'h1.video-title',
            '.article-title'
        ];
        
        for (const selector of titleSelectors) {
            const text = this.extractTextFromElement(selector);
            if (text) {
                return text;
            }
        }
        return document.title;
    }

    summarizeTextLocal(text, options = {}) {
        const {
            maxSentences = 5,
            minSentenceLength = 10,
            useKeywordWeight = true
        } = options;

        if (!text || text.length < minSentenceLength) {
            return { summary: "文本内容太短，无法生成摘要。", keywords: [], sentences: [] };
        }

        const sentences = this.splitIntoSentences(text);
        
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
            
            if (index === 0) score += 3;
            if (index === sentences.length - 1) score += 1;
            if (index < 3) score += 1;
            
            if (useKeywordWeight) {
                const words = sentence.toLowerCase().split(/\s+|，|。|、|；|：/);
                words.forEach(word => {
                    if (keywordMap[word]) {
                        score += keywordMap[word] * 0.5;
                    }
                });
            }

            const len = sentence.length;
            if (len > 20 && len < 100) score += 1;
            
            const hasQuote = sentence.includes('"') || sentence.includes('"') || sentence.includes("'");
            if (hasQuote) score += 0.5;

            return { sentence, score, index };
        });

        scoredSentences.sort((a, b) => b.score - a.score);
        
        const topSentences = scoredSentences
            .slice(0, maxSentences)
            .sort((a, b) => a.index - b.index)
            .map(s => s.sentence);

        return {
            summary: topSentences.join('。') + '。',
            keywords: keywords.slice(0, 10),
            sentences: sentences,
            allScored: scoredSentences
        };
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
            'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am'
        ]);

        const words = text.toLowerCase().split(/[\s,，.。!！?？;；:：""''""''()（）\[\]【】]+/);
        const wordFreq = {};

        words.forEach(word => {
            if (word.length >= 2 && !stopWords.has(word)) {
                wordFreq[word] = (wordFreq[word] || 0) + 1;
            }
        });

        const chineseRegex = /[\u4e00-\u9fa5]+/;
        const chineseWords = text.match(/[\u4e00-\u9fa5]{2,}/g) || [];
        
        chineseWords.forEach(word => {
            if (word.length >= 2 && !stopWords.has(word)) {
                wordFreq[word] = (wordFreq[word] || 0) + 1;
            }
        });

        const sortedWords = Object.entries(wordFreq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, maxCount)
            .map(([word]) => word);

        return sortedWords;
    }

    analyzeCommentsLocal(comments) {
        if (!comments || comments.length === 0) {
            return {
                total: 0,
                summary: "没有可分析的评论。",
                opinions: [],
                hotTopics: [],
                sentiment: { positive: 0, negative: 0, neutral: 0 }
            };
        }

        const positiveWords = new Set([
            '好', '棒', '优秀', '厉害', '精彩', '喜欢', '爱', '支持', '赞', '不错',
            '完美', '强大', '感谢', '加油', '期待', '开心', '高兴', '满意', '惊喜',
            'awesome', 'great', 'good', 'excellent', 'amazing', 'love', 'like', 'best',
            'wonderful', 'perfect', 'fantastic', 'super', 'cool', 'nice', 'happy'
        ]);

        const negativeWords = new Set([
            '差', '烂', '垃圾', '糟糕', '失望', '讨厌', '烦', '生气', '愤怒', '不好',
            '失望', '可惜', '遗憾', '难过', '伤心', '后悔', '失败', '问题', 'bug',
            'bad', 'terrible', 'awful', 'worst', 'hate', 'dislike', 'sad', 'angry',
            'disappointed', 'poor', 'sucks', 'stupid', 'horrible'
        ]);

        const suggestionWords = new Set([
            '建议', '希望', '应该', '可以', '需要', '能否', '能不能', '请', '最好',
            'suggest', 'hope', 'should', 'could', 'need', 'please', 'maybe'
        ]);

        let positiveCount = 0;
        let negativeCount = 0;
        let neutralCount = 0;
        const opinions = [];
        const hotTopicMap = {};

        comments.forEach((comment, idx) => {
            const text = comment.content || comment;
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

        return {
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
    }

    async analyzeWithAPI(text, type = 'summary') {
        if (!this.aiConfig.apiKey || !this.aiConfig.apiEndpoint) {
            return null;
        }

        try {
            let prompt = '';
            
            switch (type) {
                case 'summary':
                    prompt = `请为以下内容生成一个简洁的摘要，提取核心观点和关键词：\n\n${text}`;
                    break;
                case 'keywords':
                    prompt = `请提取以下内容的核心关键词（最多10个）：\n\n${text}`;
                    break;
                case 'refine':
                    prompt = `请精简以下内容，保留核心信息，使表达更简洁流畅：\n\n${text}`;
                    break;
            }

            const response = await fetch(this.aiConfig.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.aiConfig.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: '你是一个专业的文本分析助手，擅长摘要、关键词提取和内容精简。' },
                        { role: 'user', content: prompt }
                    ],
                    temperature: 0.7,
                    max_tokens: 500
                })
            });

            if (response.ok) {
                const data = await response.json();
                return data.choices?.[0]?.message?.content || null;
            }
        } catch (error) {
            console.log('[AI Text Helper] API analysis failed:', error);
        }
        
        return null;
    }

    collectCommentsFromPage() {
        const comments = [];
        
        try {
            const commentElements = document.querySelectorAll('.area-comment-item, .ac-comment-item');
            
            commentElements.forEach((elem, idx) => {
                try {
                    const contentElem = elem.querySelector('.area-comment-des-content, .comment-content');
                    const userElem = elem.querySelector('a.name, .username');
                    const likeElem = elem.querySelector('.area-comment-like, .like-count');
                    const timeElem = elem.querySelector('.time_times, .comment-time');

                    if (contentElem) {
                        comments.push({
                            content: contentElem.innerText.trim(),
                            username: userElem ? userElem.innerText.trim() : '匿名用户',
                            like: likeElem ? parseInt(likeElem.innerText.replace(/[^0-9]/g, '')) || 0 : 0,
                            time: timeElem ? timeElem.innerText.trim() : '',
                            index: idx
                        });
                    }
                } catch (e) {
                    console.log('[AI Text Helper] Error parsing comment:', e);
                }
            });
        } catch (e) {
            console.log('[AI Text Helper] Error collecting comments:', e);
        }

        return comments;
    }

    showFloatPanel(title, content, options = {}) {
        const existingPanel = document.querySelector('.ai-float-panel');
        if (existingPanel) {
            existingPanel.remove();
        }

        const panel = document.createElement('div');
        panel.className = 'ai-float-panel';
        panel.innerHTML = `
            <div class="ai-float-panel-header">
                <span class="ai-float-panel-title">${title}</span>
                <button class="ai-float-panel-close" id="ai-panel-close">×</button>
            </div>
            <div class="ai-float-panel-body">
                ${content}
            </div>
            ${options.showFooter ? `
            <div class="ai-float-panel-footer">
                <button class="ai-helper-btn secondary" id="ai-panel-copy">复制内容</button>
                <button class="ai-helper-btn primary" id="ai-panel-close-btn">关闭</button>
            </div>
            ` : ''}
        `;

        document.body.appendChild(panel);

        const closePanel = () => {
            panel.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => panel.remove(), 300);
        };

        document.getElementById('ai-panel-close').onclick = closePanel;
        
        if (options.showFooter) {
            document.getElementById('ai-panel-close-btn').onclick = closePanel;
            document.getElementById('ai-panel-copy').onclick = () => {
                const bodyContent = panel.querySelector('.ai-float-panel-body').innerText;
                navigator.clipboard.writeText(bodyContent).then(() => {
                    LeftBottomNotif('内容已复制到剪贴板！', 'success', 2000);
                });
            };
        }

        panel.addEventListener('click', (e) => {
            if (e.target === panel) {
                closePanel();
            }
        });

        return panel;
    }

    createLoadingButton(text = '分析中...') {
        return `
            <button class="ai-helper-btn primary" disabled>
                <span class="ai-loading-spinner"></span>
                ${text}
            </button>
        `;
    }

    renderSummaryResult(result, isDark = false) {
        const darkClass = isDark ? ' dark' : '';
        
        let keywordsHtml = '';
        if (result.keywords && result.keywords.length > 0) {
            keywordsHtml = `
                <div style="margin-top: 16px;">
                    <div style="font-weight: 600; margin-bottom: 8px; color: #667eea;">🏷️ 核心关键词</div>
                    <div>
                        ${result.keywords.map(kw => `<span class="ai-keyword-tag${darkClass}">${kw}</span>`).join('')}
                    </div>
                </div>
            `;
        }

        return `
            <div class="ai-result-panel${darkClass}">
                <div class="ai-result-title${darkClass}">AI 智能摘要</div>
                <div class="ai-result-content${darkClass}">${result.summary}</div>
                ${keywordsHtml}
            </div>
        `;
    }

    renderCommentAnalysisResult(result, isDark = false) {
        const darkClass = isDark ? ' dark' : '';
        
        let opinionsHtml = '';
        if (result.opinions && result.opinions.length > 0) {
            opinionsHtml = `
                <div style="margin-top: 16px;">
                    <div style="font-weight: 600; margin-bottom: 12px; color: #667eea;">💬 代表性观点</div>
                    ${result.opinions.slice(0, 10).map(op => `
                        <div class="ai-opinion-item ${op.type}">
                            <div style="font-size: 12px; color: #888; margin-bottom: 4px;">
                                ${op.username}
                            </div>
                            <div style="font-size: 14px;">${op.content}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        let hotTopicsHtml = '';
        if (result.hotTopics && result.hotTopics.length > 0) {
            hotTopicsHtml = `
                <div style="margin-top: 16px;">
                    <div style="font-weight: 600; margin-bottom: 8px; color: #667eea;">🔥 热门话题</div>
                    <div>
                        ${result.hotTopics.map(t => `
                            <span class="ai-keyword-tag${darkClass}">${t.topic} (${t.count})</span>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        const sentimentPercent = {
            positive: result.total > 0 ? Math.round((result.sentiment.positive / result.total) * 100) : 0,
            negative: result.total > 0 ? Math.round((result.sentiment.negative / result.total) * 100) : 0,
            neutral: result.total > 0 ? Math.round((result.sentiment.neutral / result.total) * 100) : 0
        };

        return `
            <div class="ai-result-panel${darkClass}">
                <div class="ai-result-title${darkClass}">评论区 AI 分析报告</div>
                <div class="ai-result-content${darkClass}">
                    <div style="margin-bottom: 12px;">📊 ${result.summary}</div>
                    
                    <div style="margin-bottom: 16px;">
                        <div style="font-weight: 600; margin-bottom: 8px;">情感分布</div>
                        <div class="ai-progress-bar">
                            <div class="ai-progress-fill" style="width: ${sentimentPercent.positive}%; background: #4caf50;"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 4px;">
                            <span style="color: #4caf50;">正面 ${sentimentPercent.positive}%</span>
                            <span style="color: #9e9e9e;">中性 ${sentimentPercent.neutral}%</span>
                            <span style="color: #f44336;">负面 ${sentimentPercent.negative}%</span>
                        </div>
                    </div>
                    
                    ${opinionsHtml}
                    ${hotTopicsHtml}
                </div>
            </div>
        `;
    }

    async summarizeVideoContent() {
        if (this.isAnalyzing) {
            LeftBottomNotif('正在分析中，请稍候...', 'info', 2000);
            return;
        }

        this.isAnalyzing = true;
        
        try {
            const title = this.extractVideoTitle();
            const description = this.extractVideoDescription();
            const articleContent = this.extractArticleContent();
            
            let contentToAnalyze = '';
            if (articleContent && articleContent.length > description?.length) {
                contentToAnalyze = articleContent;
            } else if (description) {
                contentToAnalyze = description;
            } else {
                LeftBottomNotif('未找到可分析的内容', 'warning', 2000);
                this.isAnalyzing = false;
                return;
            }

            let result;
            
            if (this.aiConfig.apiProvider !== 'local' && this.aiConfig.apiKey) {
                const apiResult = await this.analyzeWithAPI(contentToAnalyze, 'summary');
                if (apiResult) {
                    result = {
                        summary: apiResult,
                        keywords: this.extractKeywords(contentToAnalyze, 10)
                    };
                }
            }
            
            if (!result) {
                const summaryLength = this.aiConfig.summaryLength;
                const maxSentences = summaryLength === 'short' ? 3 : summaryLength === 'long' ? 8 : 5;
                result = this.summarizeTextLocal(contentToAnalyze, { maxSentences });
            }

            const isDark = document.documentElement.classList.contains('dark') || 
                          document.body.classList.contains('dark');
            
            const panelContent = this.renderSummaryResult(result, isDark) + `
                <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #eee;">
                    <div style="font-size: 12px; color: #888; margin-bottom: 8px;">
                        原始内容 (${contentToAnalyze.length} 字符)
                    </div>
                    <div style="max-height: 200px; overflow-y: auto; font-size: 13px; line-height: 1.6; color: #666; background: #fafafa; padding: 12px; border-radius: 6px;">
                        ${contentToAnalyze.substring(0, 1000)}${contentToAnalyze.length > 1000 ? '...' : ''}
                    </div>
                </div>
            `;

            this.showFloatPanel(`✨ ${title} - AI 摘要`, panelContent, { showFooter: true });
            LeftBottomNotif('AI 分析完成！', 'success', 2000);

        } catch (error) {
            console.error('[AI Text Helper] Error:', error);
            LeftBottomNotif('分析过程中出现错误', 'error', 2000);
        } finally {
            this.isAnalyzing = false;
        }
    }

    async analyzeComments() {
        if (this.isAnalyzing) {
            LeftBottomNotif('正在分析中，请稍候...', 'info', 2000);
            return;
        }

        this.isAnalyzing = true;
        
        try {
            const comments = this.collectCommentsFromPage();
            
            if (comments.length === 0) {
                LeftBottomNotif('未找到可分析的评论，请确保评论区已加载', 'warning', 3000);
                this.isAnalyzing = false;
                return;
            }

            const result = this.analyzeCommentsLocal(comments);
            const isDark = document.documentElement.classList.contains('dark') || 
                          document.body.classList.contains('dark');

            this.showFloatPanel(`💬 评论区 AI 分析 (${result.total} 条)`, 
                this.renderCommentAnalysisResult(result, isDark), 
                { showFooter: true });
            
            LeftBottomNotif(`已分析 ${result.total} 条评论！`, 'success', 2000);

        } catch (error) {
            console.error('[AI Text Helper] Error:', error);
            LeftBottomNotif('分析过程中出现错误', 'error', 2000);
        } finally {
            this.isAnalyzing = false;
        }
    }

    async refineContent() {
        if (this.isAnalyzing) {
            LeftBottomNotif('正在处理中，请稍候...', 'info', 2000);
            return;
        }

        const selection = window.getSelection();
        const selectedText = selection.toString().trim();
        
        if (!selectedText) {
            LeftBottomNotif('请先选中要精简的文本内容', 'warning', 2000);
            return;
        }

        this.isAnalyzing = true;
        
        try {
            let result;
            
            if (this.aiConfig.apiProvider !== 'local' && this.aiConfig.apiKey) {
                const apiResult = await this.analyzeWithAPI(selectedText, 'refine');
                if (apiResult) {
                    result = { summary: apiResult, keywords: this.extractKeywords(selectedText, 5) };
                }
            }
            
            if (!result) {
                result = this.summarizeTextLocal(selectedText, { maxSentences: 10 });
            }

            const isDark = document.documentElement.classList.contains('dark') || 
                          document.body.classList.contains('dark');

            const panelContent = `
                <div class="ai-result-panel${isDark ? ' dark' : ''}">
                    <div class="ai-result-title${isDark ? ' dark' : ''}">AI 智能精简</div>
                    <div class="ai-result-content${isDark ? ' dark' : ''}">${result.summary}</div>
                </div>
                <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #eee;">
                    <div style="font-size: 12px; color: #888; margin-bottom: 8px;">
                        原始内容 (${selectedText.length} 字符 → ${result.summary.length} 字符，精简了 ${Math.round((1 - result.summary.length / selectedText.length) * 100)}%)
                    </div>
                    <div style="max-height: 200px; overflow-y: auto; font-size: 13px; line-height: 1.6; color: #666; background: #fafafa; padding: 12px; border-radius: 6px;">
                        ${selectedText}
                    </div>
                </div>
            `;

            this.showFloatPanel('✨ AI 智能精简', panelContent, { showFooter: true });
            LeftBottomNotif('AI 精简完成！', 'success', 2000);

        } catch (error) {
            console.error('[AI Text Helper] Error:', error);
            LeftBottomNotif('处理过程中出现错误', 'error', 2000);
        } finally {
            this.isAnalyzing = false;
        }
    }

    addAIToVideoPage() {
        const self = this;
        
        const addButton = () => {
            const targetAreas = [
                '.video-toolbar',
                '.video-actions',
                '.action-bar',
                '#area-tool'
            ];

            for (const selector of targetAreas) {
                const target = document.querySelector(selector);
                if (target && !target.querySelector('.ai-helper-video-btn')) {
                    const btnContainer = document.createElement('div');
                    btnContainer.style.display = 'inline-flex';
                    btnContainer.style.alignItems = 'center';
                    btnContainer.style.marginLeft = '8px';
                    
                    btnContainer.innerHTML = `
                        <button class="ai-helper-video-btn ai-helper-btn primary" style="font-size: 12px; padding: 4px 10px;">
                            ✨ AI 摘要
                        </button>
                        <button class="ai-helper-refine-btn ai-helper-btn secondary" style="font-size: 12px; padding: 4px 10px; margin-left: 4px;">
                            📝 智能精简
                        </button>
                    `;
                    
                    target.appendChild(btnContainer);
                    
                    btnContainer.querySelector('.ai-helper-video-btn').addEventListener('click', () => {
                        self.summarizeVideoContent();
                    });
                    
                    btnContainer.querySelector('.ai-helper-refine-btn').addEventListener('click', () => {
                        self.refineContent();
                    });
                    
                    return;
                }
            }
        };

        const timer = setInterval(() => {
            addButton();
            if (document.querySelector('.ai-helper-video-btn')) {
                clearInterval(timer);
            }
        }, 1000);

        setTimeout(() => clearInterval(timer), 15000);
    }

    addAIToCommentArea() {
        const self = this;
        
        const addButton = () => {
            const targetAreas = [
                '.area-comment-header',
                '.ac-comment-header',
                '.comment-header'
            ];

            for (const selector of targetAreas) {
                const target = document.querySelector(selector);
                if (target && !target.querySelector('.ai-helper-comment-btn')) {
                    const btnContainer = document.createElement('div');
                    btnContainer.style.display = 'inline-flex';
                    btnContainer.style.alignItems = 'center';
                    btnContainer.style.marginLeft = '12px';
                    
                    btnContainer.innerHTML = `
                        <button class="ai-helper-comment-btn ai-helper-btn primary" style="font-size: 12px; padding: 4px 10px;">
                            🤖 AI 分析评论
                        </button>
                    `;
                    
                    target.appendChild(btnContainer);
                    
                    btnContainer.querySelector('.ai-helper-comment-btn').addEventListener('click', () => {
                        self.analyzeComments();
                    });
                    
                    return;
                }
            }
        };

        const timer = setInterval(() => {
            addButton();
            if (document.querySelector('.ai-helper-comment-btn')) {
                clearInterval(timer);
            }
        }, 1000);

        setTimeout(() => clearInterval(timer), 20000);
    }

    addAIToArticlePage() {
        const self = this;
        
        const addButton = () => {
            const targetAreas = [
                '.article-toolbar',
                '.article-actions',
                '#area-tool',
                '.article-header'
            ];

            for (const selector of targetAreas) {
                const target = document.querySelector(selector);
                if (target && !target.querySelector('.ai-helper-article-btn')) {
                    const btnContainer = document.createElement('div');
                    btnContainer.style.display = 'inline-flex';
                    btnContainer.style.alignItems = 'center';
                    btnContainer.style.marginLeft = '8px';
                    
                    btnContainer.innerHTML = `
                        <button class="ai-helper-article-btn ai-helper-btn primary" style="font-size: 12px; padding: 4px 10px;">
                            ✨ AI 摘要
                        </button>
                        <button class="ai-helper-refine-btn ai-helper-btn secondary" style="font-size: 12px; padding: 4px 10px; margin-left: 4px;">
                            📝 智能精简
                        </button>
                    `;
                    
                    target.appendChild(btnContainer);
                    
                    btnContainer.querySelector('.ai-helper-article-btn').addEventListener('click', () => {
                        self.summarizeVideoContent();
                    });
                    
                    btnContainer.querySelector('.ai-helper-refine-btn').addEventListener('click', () => {
                        self.refineContent();
                    });
                    
                    return;
                }
            }
        };

        const timer = setInterval(() => {
            addButton();
            if (document.querySelector('.ai-helper-article-btn')) {
                clearInterval(timer);
            }
        }, 1000);

        setTimeout(() => clearInterval(timer), 15000);
    }
}
