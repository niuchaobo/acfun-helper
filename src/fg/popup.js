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

    renderPopup(pageInfo, type, isUp) {
        let content = '';
        if (type == 'video') {
            let videoInfo = pageInfo.currentVideoInfo;
            let title = pageInfo.title;
            let tmp = videoInfo.ksPlayJson;
            let tmpJson = JSON.parse(tmp);
            let infos = tmpJson.adaptationSet[0].representation;
            if (infos == undefined) {
                return;
            }
            content += `<div class="odh-headsection">
            <span class="odh-expression">弹幕资源</span>
            <span style="margin-left: 20px;color:#d69acc" id="danmaku-sources"></span></div>
            <div class="odh-definition">
            <span id="danmakuDownload" class="pos danmakuDownload" style="cursor:pointer">下载此视频弹幕资源</span>
            <span id="assDanmaku" class="pos assDanmaku" style="cursor:pointer">下载Ass弹幕</span>
            </div>
                <div class="odh-headsection">
                    <span class="odh-expression">视频资源</span>
                </div>`;
            for (const info of infos) {
                let vedioUrl = info.url;
                let id = hex_md5(vedioUrl);
                let barId = id + "-bar";
                let progressText = id + "-text";
                let qualityLabel = info.qualityLabel;
                content += `<div class="odh-definition">
                            <ul class="ec">
                                <li class="ec">
                                    <span id="{id}" data-id="${id}" data-quality="${qualityLabel}" data-title="${title}" data-url="${vedioUrl}" class="pos simple">${qualityLabel}</span>
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
        let { mark, scan, receive, articleReadMode } = this.options;
        let m = mark ? "checked" : "";
        let s = scan ? "checked" : "";
        let r = receive ? "checked" : "";
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
                <!--<div class="odh-definition">
                    <label class="comment-label">是否接收情报</label>
                    <div class="enabled">
                        <input type="checkbox" ${r} id="comment-receive">
                        <label for="comment-receive"></label>
                    </div>
                </div>-->
                `;
        }
        return domString;
    }

    popLottery() {
        let src = chrome.runtime.getURL('/') + "bg/images/copy_link.png";
        let str = "[img=图片]https://imgs.aixifan.com/content/2020_05_25/1.5904184183999112E9.jpg[/img]"
        return `<div class="odh-headsection">
                    <span class="odh-expression">评论区抽奖</span>
                </div>
                <div class="odh-definition basic-grey">
                     <label>
                        <span>抽多少个Acer :</span>
                        <input id="lucy-number" type="text" autocomplete="off" name="number" placeholder="请输入数字"/></label>
                        <!--
                        <label>仅抽选已关注我的Acer：<input id="lucky-follow" style="vertical-align:top" name="follower" type="checkbox" value="" /></label>
                        -->
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

    popupHeader(type) {
        let root = chrome.runtime.getURL('/');
        let fn = () => {
            /*if(type=='live'){
                return `<link rel="stylesheet" href="${root+'lib/video-js.css'}">`;
            }*/
            return '';
        }
        return `
        <html lang="en">
            <head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title></title>
                <style>::-webkit-scrollbar { width: 8px; background-color: #fff;}  ::-webkit-scrollbar-thumb { background-color: #c4c4c4; border-radius: 5px;}</style>
                <link rel="stylesheet" href="${root + 'fg/css/checkbox.css'}">
                <link rel="stylesheet" href="${root + 'fg/css/frame.css'}">
                <link rel="stylesheet" href="${root + 'fg/css/lucy.css'}">
                ${fn()}
            </head>
            <body style="margin:0px;">
            <div class="odh-notes" id="ncb-notes">`;
    }

    popupFooter(type) {
        let root = chrome.runtime.getURL('/');
        let fn = () => {
            /*if(type=='live'){
                return `<script charset="UTF-8" src="${root+'lib/video.js'}"></script>
                        <script charset="UTF-8" src="${root+'lib/videojs-contrib-hls.min.js'}"></script>
                        <script charset="UTF-8" src="${root+'fg/js/live.js'}"></script>
                        `;
            }*/
            return '';
        };
        return `
            </div>
            ${fn()}
            <script charset="UTF-8" src="${root + 'lib/jquery-3.5.1.min.js'}"></script>
            <script charset="UTF-8" src="${root + 'bg/lib/jqueryExtend.js'}"></script>
            <script charset="UTF-8" src="${root + 'fg/frame.js'}"></script>
            </body>
        </html>`;
    }

    inject(options) {
        this.options = options;
        if (this.popup !== null) {
            return;

            //document.getElementById("ncb-wapper").innerHTML="";
        }
        //this.wapper = document.createElement("div");
        //this.wapper.id="ncb-wapper";

        this.popup = document.createElement('iframe');
        this.popup.id = 'acfun-popup-helper';
        this.popup.addEventListener('mousedown', (e) => e.stopPropagation());
        this.popup.addEventListener('scroll', (e) => e.stopPropagation(), false);

        //this.wapper.appendChild(this.popup);

        window.addEventListener('scroll', (e) => e.stopPropagation(), { passive: true });
        let root = document.body;
        root.appendChild(this.popup);
    }
}
