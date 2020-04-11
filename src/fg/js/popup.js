/* global rangeFromPoint */

class Popup {
    constructor() {
        this.popup = null;
        this.wapper = null;
        this.offset = 5;
    }

    showAt(pos) {
        let status = this.popup.style.visibility;
        if(status=='visible'){
            this.hide();
            return;
        }
        var obj = document.getElementById("acfun-popup-helper");
        let h = obj.contentWindow.document.body.scrollHeight;
        let margin = 2;
        var total = h+margin*2;
        this.popup.style.height = total+"px";
        this.popup.style.right = pos.x + 'px';
        this.popup.style.top = pos.y + 'px';
        this.popup.style.visibility = 'visible';
    }

    showNextTo(point, content) {

        this.inject();
        this.popup.setAttribute("x",point.x);
        this.popup.setAttribute("y",point.y);
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

    renderPopup(pageInfo,type) {
        let content = '';
        if(type=='video'){
            let videoInfo =  pageInfo.currentVideoInfo;
            let title = pageInfo.title;
            let tmp = videoInfo.ksPlayJson;
            let tmpJson = JSON.parse(tmp);
            let infos = tmpJson.adaptationSet.representation;
            if(infos==undefined){
                return;
            }
            content += `
                <div class="odh-headsection">
                    <span class="odh-expression">视频资源</span>
                </div>`;
            for(const info of infos){
                let vedioUrl = info.url;
                let id = hex_md5(vedioUrl);
                let barId = id+"-bar";
                let progressText = id+"-text";
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
        let html = this.popupHeader() + content+ this.popComment() + this.popupFooter();
        this.setContent(html);
    }

    popComment(){
        let {mark,scan,receive} = this.options;
        let m = mark?"checked":"";
        let s = scan?"checked":"";
        let r = receive?"checked":"";

        return `<div class="odh-headsection">
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


    popupHeader() {
        let root = chrome.runtime.getURL('/');
        return `
        <html lang="en">
            <head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title></title>
                <link rel="stylesheet" href="${root+'fg/css/checkbox.css'}">
                <link rel="stylesheet" href="${root+'fg/css/frame.css'}">
                
            </head>
            <body style="margin:0px;">
            <div class="odh-notes" id="ncb-notes">`;
    }

    popupFooter() {
        let root = chrome.runtime.getURL('/');
        let services = this.options ? this.options.services : '';
        let image = (services == 'ankiconnect') ? 'plus.png' : 'cloud.png';
        let button = chrome.runtime.getURL('fg/img/' + image);
        let monolingual = this.options ? (this.options.monolingual == '1' ? 1 : 0) : 0;

        return `
            </div>
            <script charset="UTF-8" src="${root+'lib/jquery-2.2.2.min.js'}"></script>
            <script charset="UTF-8" src="${root+'fg/js/frame.js'}"></script>
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
        this.popup.addEventListener('scroll', (e) => e.stopPropagation(),false);

        //this.wapper.appendChild(this.popup);

        window.addEventListener('scroll', (e) => e.stopPropagation(),{ passive: true });
        let root =  document.body;
        root.appendChild(this.popup);
    }
}
