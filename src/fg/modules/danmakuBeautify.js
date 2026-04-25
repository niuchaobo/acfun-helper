/**
 * 弹幕美化模块
 * 功能：自定义弹幕字体、透明度、显示样式（阴影、描边等）
 */
class DanmakuBeautify extends AcFunHelperFgFrame {
    constructor() {
        super();
        this.devMode = false;
        this.styleElement = null;
        this.currentConfig = null;
    }

    /**
     * 初始化弹幕美化
     * @param {object} options 配置选项
     */
    init(options) {
        this.options = options;
        this.config = options.danmakuBeautify;
        
        if (this.config.enabled) {
            this._applyBeautify();
            this._observeDanmakuContainer();
        }
    }

    /**
     * 应用弹幕美化样式
     */
    _applyBeautify() {
        this._removeOldStyles();
        this._createStyleElement();
        
        const css = this._generateCSS();
        this.styleElement.innerHTML = css;
        
        fgConsole("DanmakuBeautify", "_applyBeautify", "弹幕美化样式已应用", 2, false);
    }

    /**
     * 移除旧的样式
     */
    _removeOldStyles() {
        const oldStyles = document.querySelectorAll("style[data-danmaku-beautify]");
        oldStyles.forEach(style => style.remove());
        
        if (this.styleElement) {
            this.styleElement.remove();
            this.styleElement = null;
        }
    }

    /**
     * 创建样式元素
     */
    _createStyleElement() {
        this.styleElement = document.createElement("style");
        this.styleElement.setAttribute("data-danmaku-beautify", "true");
        this.styleElement.id = "acfun-helper-danmaku-beautify";
        document.head.appendChild(this.styleElement);
    }

    /**
     * 生成CSS样式
     * @returns {string} CSS字符串
     */
    _generateCSS() {
        const { fontFamily, fontSize, opacity, shadowEnabled, strokeEnabled, strokeColor, shadowColor, shadowBlur } = this.config;
        
        let css = `
.acdanmaku {
    font-family: '${fontFamily}', sans-serif !important;
    font-size: ${fontSize}px !important;
    opacity: ${opacity} !important;
    transition: all 0.2s ease !important;
}
`;

        if (shadowEnabled) {
            css += `
.acdanmaku {
    text-shadow: 2px 2px ${shadowBlur}px ${shadowColor}, 
                 -2px -2px ${shadowBlur}px ${shadowColor},
                 2px -2px ${shadowBlur}px ${shadowColor},
                 -2px 2px ${shadowBlur}px ${shadowColor} !important;
}
`;
        }

        if (strokeEnabled) {
            css += `
.acdanmaku {
    -webkit-text-stroke: 1px ${strokeColor} !important;
    text-stroke: 1px ${strokeColor} !important;
    paint-order: stroke fill !important;
}
`;
        }

        css += `
.danmaku-item {
    font-family: '${fontFamily}', sans-serif !important;
    opacity: ${opacity} !important;
}

.danmaku-item .danmaku-content {
    font-family: '${fontFamily}', sans-serif !important;
    font-size: ${fontSize}px !important;
}
`;

        if (shadowEnabled) {
            css += `
.danmaku-item .danmaku-content {
    text-shadow: 2px 2px ${shadowBlur}px ${shadowColor}, 
                 -2px -2px ${shadowBlur}px ${shadowColor},
                 2px -2px ${shadowBlur}px ${shadowColor},
                 -2px 2px ${shadowBlur}px ${shadowColor} !important;
}
`;
        }

        return css;
    }

    /**
     * 监听弹幕容器变化
     */
    _observeDanmakuContainer() {
        if (!this.config.enabled) return;

        GetAsyncDomUtil.getAsyncDomClassic(".danmaku-container", () => {
            const container = document.querySelector(".danmaku-container");
            if (container) {
                DOMObserver.childs(container, (mutations) => {
                    mutations.forEach(mutation => {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                this._applyBeautifyToElement(node);
                            }
                        });
                    });
                }, true);
                
                this._applyBeautifyToExisting();
            }
        }, 1000);
    }

    /**
     * 对单个元素应用美化
     * @param {HTMLElement} element 弹幕元素
     */
    _applyBeautifyToElement(element) {
        if (!this.config.enabled) return;

        const { fontFamily, fontSize, opacity, shadowEnabled, strokeEnabled, strokeColor, shadowColor, shadowBlur } = this.config;

        const danmakuElements = element.querySelectorAll ? 
            element.querySelectorAll(".acdanmaku, .danmaku-item, .danmaku-content") : [];
        
        if (element.classList && (
            element.classList.contains("acdanmaku") || 
            element.classList.contains("danmaku-item") ||
            element.classList.contains("danmaku-content")
        )) {
            danmakuElements.push(element);
        }

        danmakuElements.forEach(elem => {
            elem.style.fontFamily = `'${fontFamily}', sans-serif`;
            elem.style.fontSize = `${fontSize}px`;
            elem.style.opacity = opacity;

            if (shadowEnabled) {
                elem.style.textShadow = `2px 2px ${shadowBlur}px ${shadowColor}, -2px -2px ${shadowBlur}px ${shadowColor}, 2px -2px ${shadowBlur}px ${shadowColor}, -2px 2px ${shadowBlur}px ${shadowColor}`;
            } else {
                elem.style.textShadow = "none";
            }

            if (strokeEnabled) {
                elem.style.webkitTextStroke = `1px ${strokeColor}`;
                elem.style.textStroke = `1px ${strokeColor}`;
                elem.style.paintOrder = "stroke fill";
            } else {
                elem.style.webkitTextStroke = "none";
                elem.style.textStroke = "none";
            }
        });
    }

    /**
     * 对已存在的弹幕应用美化
     */
    _applyBeautifyToExisting() {
        const existingDanmaku = document.querySelectorAll(".acdanmaku, .danmaku-item, .danmaku-content");
        existingDanmaku.forEach(elem => this._applyBeautifyToElement(elem));
    }

    /**
     * 更新配置并重新应用
     * @param {object} newConfig 新配置
     */
    async updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        await ExtOptions.setValue("danmakuBeautify", this.config);
        
        if (this.config.enabled) {
            this._applyBeautify();
            this._applyBeautifyToExisting();
        } else {
            this._removeOldStyles();
        }
    }

    /**
     * 启用弹幕美化
     */
    enable() {
        this.config.enabled = true;
        this._applyBeautify();
        this._observeDanmakuContainer();
    }

    /**
     * 禁用弹幕美化
     */
    disable() {
        this.config.enabled = false;
        this._removeOldStyles();
    }

    /**
     * 设置字体
     * @param {string} fontFamily 字体名称
     */
    async setFontFamily(fontFamily) {
        await this.updateConfig({ fontFamily });
    }

    /**
     * 设置字体大小
     * @param {number} fontSize 字体大小（像素）
     */
    async setFontSize(fontSize) {
        if (fontSize >= 12 && fontSize <= 60) {
            await this.updateConfig({ fontSize });
        }
    }

    /**
     * 设置透明度
     * @param {number} opacity 透明度（0-1）
     */
    async setOpacity(opacity) {
        if (opacity >= 0.1 && opacity <= 1) {
            await this.updateConfig({ opacity });
        }
    }

    /**
     * 启用/禁用阴影
     * @param {boolean} enabled 是否启用
     */
    async setShadowEnabled(enabled) {
        await this.updateConfig({ shadowEnabled: enabled });
    }

    /**
     * 设置阴影颜色
     * @param {string} color 颜色值（如 #000000）
     */
    async setShadowColor(color) {
        await this.updateConfig({ shadowColor: color });
    }

    /**
     * 设置阴影模糊程度
     * @param {number} blur 模糊值
     */
    async setShadowBlur(blur) {
        if (blur >= 0 && blur <= 10) {
            await this.updateConfig({ shadowBlur: blur });
        }
    }

    /**
     * 启用/禁用描边
     * @param {boolean} enabled 是否启用
     */
    async setStrokeEnabled(enabled) {
        await this.updateConfig({ strokeEnabled: enabled });
    }

    /**
     * 设置描边颜色
     * @param {string} color 颜色值
     */
    async setStrokeColor(color) {
        await this.updateConfig({ strokeColor: color });
    }

    /**
     * 获取当前配置
     * @returns {object} 当前配置
     */
    getCurrentConfig() {
        return { ...this.config };
    }

    /**
     * 获取可用字体列表
     * @returns {string[]} 常用字体列表
     */
    getAvailableFonts() {
        return [
            "Microsoft YaHei",
            "SimHei",
            "SimSun",
            "KaiTi",
            "FangSong",
            "Arial",
            "Helvetica",
            "Times New Roman",
            "Courier New",
            "Georgia",
            "Verdana",
        ];
    }

    /**
     * 预览字体效果
     * @param {string} fontFamily 字体名称
     * @param {string} sampleText 示例文本
     * @returns {HTMLElement} 预览元素
     */
    createFontPreview(fontFamily, sampleText = "这是一条示例弹幕") {
        const preview = document.createElement("div");
        preview.style.fontFamily = `'${fontFamily}', sans-serif`;
        preview.style.fontSize = "24px";
        preview.style.padding = "10px";
        preview.style.backgroundColor = "rgba(0,0,0,0.8)";
        preview.style.color = "white";
        preview.style.display = "inline-block";
        preview.style.textShadow = "1px 1px 2px black";
        preview.innerText = sampleText;
        
        return preview;
    }
}
