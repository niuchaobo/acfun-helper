/* global rangeFromPoint */

class Popup {
    constructor() {
        this.popup = null;
        this.wapper = null;
        this.offset = 5;
    }

    showAt(pos) {
        let status = this.popup.style.visibility;
        if (status == 'visible') {
            this.hide();
            return;
        }
        var obj = document.getElementById("acfun-popup-helper");
        let h = obj.contentWindow.document.body.scrollHeight;
        let margin = 2;
        var total = h + margin * 2;
        this.popup.style.height = total + "px";
        this.popup.style.right = pos.x + 'px';
        this.popup.style.top = pos.y + 'px';
        this.popup.style.visibility = 'visible';
        this.popup.style.opacity = '1';
        this.popup.style.transition = '.5s';
        this.popup.style.resize = 'none';//iframe禁止拉伸
    }

    showNextTo(point, content) {

        this.inject();
        this.popup.setAttribute("x", point.x);
        this.popup.setAttribute("y", point.y);
        const elementRect = this.getRangeRect(point);
        const popupRect = this.popup.getBoundingClientRect();

        var posX = elementRect.left;
        if (posX + popupRect.width >= window.innerWidth) {
            posX = window.innerWidth - popupRect.width;
        }

        var posY = elementRect.bottom + this.offset;
        if (posY + popupRect.height >= window.innerHeight) {
            posY = elementRect.top - popupRect.height - this.offset;
        }

        posX = (posX < 0) ? 0 : posX;
        posY = (posY < 0) ? 0 : posY;

        this.showAt({ x: posX, y: posY }, content);
    }

    hide() {
        this.popup.style.visibility = 'hidden';
        this.popup.style.opacity = '0';
    }

    setContent(content) {
        if (this.popup === null) {
            return;
        }
        this.popup.contentWindow.scrollTo(0, 0);
        const doc = this.popup;
        doc.srcdoc = content;
    }

    getRangeRect(point) {
        return rangeFromPoint(point).getBoundingClientRect();
    }

    sendMessage(action, params, callback) {
        if (this.popup !== null) {
            this.popup.contentWindow.postMessage({ action, params }, '*');
        }
    }

    /**
     * @param {APIs.AcFunPageInfo} pageInfo 
     * @param {"video"|"live"} type 
     * @param {0|1|2} isUp 
     */
    renderPopup(pageInfo, type, isUp) {
        let content = '';
        if (type == 'video') {
            const videoInfo = pageInfo.currentVideoInfo;
            const title = pageInfo.title;
            /**@type {APIs.KsPlayJson} */
            const tmpJson = JSON.parse(videoInfo.ksPlayJson);
            const infos = tmpJson.adaptationSet[0].representation;
            if (infos == undefined) {
                alert("[AcFun助手]：并没有检测到视频下载资源。")
                return;
            }
            let transcodeInfos = {};
            pageInfo.currentVideoInfo.transcodeInfos.map(e => {
                transcodeInfos[e.qualityType] = e.sizeInBytes;
            });
            let btnIndex = 0;
            content += `<div class="odh-headsection">
            <span class="odh-expression">弹幕资源</span>
            <span style="margin-left: 20px;color:#d69acc" id="danmaku-sources"></span></div>
            <div class="odh-definition">
            <span id="danmakuDownload" class="pos danmakuDownload" style="cursor:pointer">下载此视频弹幕资源</span>
            <span id="assDanmaku" class="pos assDanmaku" style="cursor:pointer">下载Ass弹幕</span>
            <div class="odh-headsection">
            <span class="odh-expression">其他</span>
            <span style="margin-left: 20px;color:#d69acc" id="utils"></span></div>
            <div class="odh-definition">
            <span id="playerTimeJumpUrlGen" class="pos playerTimeJumpUrlGen" style="cursor:pointer">复制跳转到此时间的链接</span>
            </div>
            <div class="odh-headsection">
                <span class="odh-expression">视频资源</span>
            </div>`;
            for (const info of infos) {
                const videoUrl = info.url;
                let id = btnIndex++;
                let barId = id + "-bar";
                let progressText = id + "-text";
                const qualityLabel = info.qualityLabel;
                /**@type {number} */
                const sizeInMegaByte = (transcodeInfos[info.qualityType]) / 1e6;
                content += `<div class="odh-definition">
                            <ul class="ec">
                                <li class="ec">
                                    <span id="{id}" data-id="${id}" data-quality="${info.qualityType}" data-title="${title}" data-url="${videoUrl}" title="${info.comment}; AvgBitrate:${info.avgBitrate}; MaxBitrate:${info.maxBitrate}; HDR:${info.hdrType ? "Yes" : "No"}" class="pos simple">下载${qualityLabel} (~${sizeInMegaByte.toFixed(1)}MB) </span>
                                    <span class="addressCopySrc" style="background-color: #fd4c5c !important;cursor: pointer;color:white;border-radius:3px;font-size:0.9em; margin-right:5px; padding:2px 4px;" data-id="${id}" data-quality="${qualityLabel}" data-title="${title}" data-url="${videoUrl}">复制M3U8地址</span>
                                    <span id="${progressText}" class="ec_chn"></span>
                                </li>
                            </ul>
                        </div>
                        <div class="progress-warp">
                            <div id="${barId}"  class="progress-bar"></div>
                        </div>`;
            }
        }
        if (type == 'live') {
            //直播测试
            let src = chrome.runtime.getURL('/') + "bg/images/copy_link.png";
            content += `
            <div class="odh-headsection">
                    <span class="odh-expression">网页端直播</span>
                    <span style="margin-left: 20px;color:#d69acc" id="live-msg"></span>
                </div>
                <div class="odh-definition">
                    <p style="margin: 0px">获取url地址
                         <img id="copy-link-super" title="点击复制链接" style="cursor: pointer;vertical-align: middle" width="16px" height="16px" src="${src}"/>
                    </p>
                    <div style="min-height: 50px" class="">
                        <span style="min-height: 30px" id="live-url-super"></span>
                    </div>
                </div>
                `;
        }
        let html = this.popupHeader(type) + content;
        if (type != 'live') {
            html += this.popComment(type);
        }
        //抽奖部分
        if (isUp == 1) {
            html += this.popLottery();
        }
        html += this.popupFooter(type);
        this.setContent(html);
    }

    popComment(type) {
        let { mark, scan, articleReadMode } = this.options;
        let m = mark ? "checked" : "";
        let s = scan ? "checked" : "";
        let t = articleReadMode ? "checked" : "";

        let domString = `<div class="odh-headsection">
                    <span class="odh-expression">评论才是本体</span>
                </div>
                <div class="odh-definition">
                    <label class="comment-label">开启人物扫描</label>
                    <div class="enabled">
                        <input type="checkbox" ${s} id="comment-scan">
                        <label for="comment-scan"></label>
                    </div>
                </div>
                <div class="odh-definition">
                    <label class="comment-label">开启人物标记</label>
                    <div class="enabled">
                        <input type="checkbox" ${m} id="comment-mark">
                        <label for="comment-mark"></label>
                    </div>
                </div>`
        if (type != 'video') {
            domString +=
                `
                <div class="odh-definition">
                    <label class="readmode">手动阅读模式</label>
                    <div class="enabled">
                        <input type="checkbox" ${t} id="readmode">
                        <label for="readmode"></label>
                    </div>
                </div>
                `;
        }
        return domString;
    }

    popLottery() {
        return `<div class="odh-headsection">
                    <span class="odh-expression">评论区抽奖</span>
                </div>
                <div class="odh-definition basic-grey">
                     <label>
                        <span>抽多少个Acer :</span>
                        <input id="lucy-number" type="text" autocomplete="off" name="number" placeholder="请输入数字"/></label>
                        <label>仅抽选已关注我的Acer：<input id="lucky-follow" style="vertical-align:top" name="follower" type="checkbox" value="" /></label>
                        <!--<label>
                        <span>是否需要关注Up主 :</span> 
                        <input id="lucy-follow" type="checkbox" name="uniq" />
                        </label> -->
                        <label id=lucy-result-label style="display:none">
                        <span >抽奖结果 :</span> 
                        
                        </label> 
                        <div id=lucy-result></div>
                        
                        <span>&nbsp;</span> 
                        <input type="button"  id="lucy-chou" class="button" value="独立抽奖" /></label>
                        <input type="button"  id="lucy-chouAgain" class="button" value="排除上次结果抽奖" /></label>
                </div>
                `;
    }

    popupHeader() {
        let root = chrome.runtime.getURL('/');
        return `
        <html lang="en">
            <head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title></title>
                <style>::-webkit-scrollbar { width: 8px; background-color: #fff;}  ::-webkit-scrollbar-thumb { background-color: #c4c4c4; border-radius: 5px;}</style>
                <link rel="stylesheet" href="${root + 'fg/css/checkbox.css'}">
                <link rel="stylesheet" href="${root + 'fg/css/frame.css'}">
                <link rel="stylesheet" href="${root + 'fg/css/lucy.css'}">
            </head>
            <body style="margin:0px;">
            <div class="odh-notes" id="ncb-notes">`;
    }

    popupFooter() {
        let root = chrome.runtime.getURL('/');
        return `
            </div>
            <script charset="UTF-8" src="${root + 'lib/jquery-3.6.0.min.js'}"></script>
            <script charset="UTF-8" src="${root + 'bg/lib/jqueryExtend.js'}"></script>
            <script charset="UTF-8" src="${root + 'bg/lib/purify.min.js'}"></script>
            <script charset="UTF-8" src="${root + 'fg/frame.js'}"></script>
            </body>
        </html>`;
    }

    inject(options) {
        this.options = options;
        if (this.popup !== null) {
            return;
        }

        this.popup = document.createElement('iframe');
        this.popup.id = 'acfun-popup-helper';
        this.popup.addEventListener('mousedown', (e) => e.stopPropagation());
        this.popup.addEventListener('scroll', (e) => e.stopPropagation(), false);

        window.addEventListener('scroll', (e) => e.stopPropagation(), { passive: true });
        let root = document.body;
        root.appendChild(this.popup);
    }
}
