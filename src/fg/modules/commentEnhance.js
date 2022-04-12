/**
 * 评论是本体
 * @description 根据评论ID跳转到相关位置 评论扫描 评论者标记 Up在评论区的标识 评论区稿件ID弹窗 评论区时间播放器跳转 评论区时间快捷键播放器跳转 评论保存为HTML
 */
class CommentEnhance extends AcFunHelperFgFrame {
    constructor() {
        super();
        this.devMode = false;
        this.cache = {};
        this.reg_for_time = new RegExp('[0-9]{1,3}[:分][0-9]{1,2}秒?');
        this.reg_for_time3part = new RegExp('[0-9]{1,3}[:小时][0-9]{1,3}[:分][0-9]{1,2}秒?');
        this.reg_for_part = new RegExp('^p[0-9]{1,2}|^[0-9]{1,2}p', 'i')
        this.easy_time = new RegExp('[0-9]{1,3}分|[0-9]{1,2}秒?')
    }

    onLoad() {
        createElementStyle(
            ".comment-mark-parent{bottom: -80px!important;}" +
            //comment action menu
            "#mark-div{top:50%;left:50%;display:none;position:fixed;z-index:999999}" +
            //user tag
            "span.simple {background-color: #d69acc !important;}" +
            "span.pos {display:inline;font-size: 0.9em;margin: 5px;line-height: 18px;padding: 0px 4px;color: white;border-radius: 14px;}" +
            ".ext-filter-up{display:inline-block;vertical-align:middle;width:30px;height:18px;font-size:13px;line-height:18px;color:#4a8eff;cursor:pointer;margin-left:5px;}" +
            //up tag
            "span.pos.up {background-color: #66ccff !important;}" +
            //staff Tag
            "span.pos.staff {background-color: #c056ff !important;}" +
            "p.crx-guid-p{height: 20px !important;line-height: 20px !important;padding: 7px 12px !important;text-align:center;}" +
            `
            @keyframes achfadeInDownForudd {
                0% {
                  -webkit-transform: translate3d(0, -20%, 0);
                  transform: translate3d(0, -20%, 0);opacity: 0;
                }
                100% {
                  -webkit-transform: none;
                  transform: none;opacity: 1;display:none;
                }
              }          
            `
            , document.head, "AcFunHelper_CommentEnhance");
    }

    /**
     * 从个人中心评论跳转到对应的楼层,不完善(折叠中和非第一页的无法跳转)
     * @param {string} href 
     */
    async jumpToComment(href) {
        let msg_comment = REG.msg_comment;
        let res = msg_comment.exec(href);
        if (res != null && res != undefined && res.length == 4) {
            let cid = res[3];
            let retry = 10;
            while (retry > 0) {
                let node = $('div[data-commentid=' + cid + ']').eq(0);
                let node_offset = node.offset();
                if (node_offset != undefined && node_offset != null) {
                    let top = Number(node_offset.top) - Number(node.height()) - 150;
                    $("html, body").animate({
                        scrollTop: top
                    }, {
                        duration: 500,
                        easing: "swing"
                    });
                    break;
                } else {
                    await mysleep(1000);
                }
                retry--;
            }
        }
    }

    //-------------------------评论区标记功能---------------------------------

    /**
     * 渲染扫描到的用户tag信息
     */
    async renderScan() {
        this.GetUpUid();
        REG.video.test(globalThis.location.href) && await this.GetStaffInfo();
        let timer = setInterval(async () => {
            this.cache["UserMarks"] = await ExtOptions.getValue("UserMarks");
            let nodes = $('.area-comment-title a.name');
            let loading = $('.ac-comment-loading').html();
            if (nodes.length > 0 && loading == '') {
                nodes.each(async (e) => {
                    this.runtime.options.scan && this.renderTag(nodes[e]);
                    this.runtime.options.upHighlight && this.renderUp(nodes[e]);
                    (this.runtime.options.StaffMark && REG.video.test(globalThis.location.href)) && this.renderStaff(nodes[e]);
                });
                clearInterval(timer);
            } else {
                if (!document.querySelector(".ac-comment-root-list").childElementCount) {
                    clearInterval(timer);
                }
            }
        }, 1000);
    }

    /**@param {HTMLElement} e*/
    renderTag(e) {
        if (!e.parentElement.querySelector("span.pos.simple")) {
            let userId = e.dataset.userid;
            let userName = e.innerText;
            let tagInfo = this.cache["UserMarks"][userId];
            if (tagInfo != undefined && tagInfo.tag != '' && tagInfo.tag != undefined) {
                const elem = document.createElement("span");
                userName != tagInfo.name && (elem.title = tagInfo.name);
                elem.className = "pos simple";
                elem.innerText = tagInfo.tag;
                e.after(elem);
            }
        }
    }

    /**@param {HTMLElement} e*/
    renderUp(e) {
        if (!e.parentElement.querySelector("span.pos.up")) {
            const uid = e.dataset.userid;
            if (uid == this.upId) {
                let elem = document.createElement("span");
                elem.className = "pos up";
                elem.innerText = "Up主";
                e.after(elem);
            }
        }
    }

    /**@param {HTMLElement} e*/
    renderStaff(e) {
        if (!e.parentElement.querySelector("span.pos.staff")) {
            const uid = e.dataset.userid;
            if (this.staffs.includes(String(uid))) {
                let elem = document.createElement("span");
                elem.className = "pos staff";
                elem.innerText = this.staffDetail[uid];
                e.after(elem);
            }
        }

    }

    async GetStaffInfo() {
        /**@type {string[]} */
        this.staffs = [];
        this.staffDetail = {}
        try {
            if (REG.video.test(globalThis.location.href)) {
                /**@type {APIs.ContributionInfo.StaffInfos} */
                let staffApi = await acfunApis.video.Staff.getStaffInfo(REG.acVid.exec(window.location.href)[2]);
                staffApi.staffInfos.forEach(e => {
                    this.staffs.push(e["id"]);
                    this.staffDetail[e.id] = e["staffRoleName"];
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    async GetUpUid() {
        await GetAsyncDomUtil.getAsyncDomClassic(".up-name", () => {
            if (/\/v\//.test(globalThis.location.href)) {
                try {
                    this.upId = document.querySelector('a.up-name').href.match(/[0-9]+/)[0];
                } catch (error) {
                    let href = document.querySelector('a.up-name')["attributes"]["href-disabled"].nodeValue
                    this.upId = href.match(/[0-9]+/)[0];
                }
            }
            if (/\/a\//.test(globalThis.location.href)) {
                try {
                    this.upId = document.querySelector('div.up-name a.upname').href.match(/[0-9]+/)[0];
                } catch (error) {
                    let href=document.querySelector('div.up-name a.upname')["attributes"]["href-disabled"].nodeValue
                    this.upId = href.match(/[0-9]+/)[0];
                }
            }
        })
    }

    /**
     * 渲染标记、评论保存为HTML（包括其处理函数）按钮
     */
    async renderMark() {
        let timer = setInterval(async () => {
            let nodes = $('.area-comm-more');
            let loading = $('.ac-comment-loading').html();
            if (nodes.length > 0 && loading == '') {
                nodes.each(async (e) => {
                    nodes[e].classList.toggle("comment-mark-parent");
                    this.runtime.options.mark && this.markMenu(nodes[e]);
                    this.jumpLinkMenu(nodes[e]);
                    this.saveHtmlMenu(nodes[e]);
                });
                clearInterval(timer);
            } else {
                if (!document.querySelector(".ac-comment-root-list").childElementCount) {
                    clearInterval(timer);
                }
            }
        }, 1000);
    }

    jumpLink(e) {
        var aux = document.createElement("input");
        aux.setAttribute("value", window.location.href + "#ncid=" + e.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.commentid);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
        LeftBottomNotif("AcFun助手：评论楼层分析的跳转连接已经复制！", "info", 1500);
    }

    /**@param {Event} e*/
    async markUser(e) {
        let headerNode = e.target.offsetParent.offsetParent.offsetParent
        let topNode = headerNode.offsetParent.offsetParent;
        let userNode = headerNode.querySelector("a.name");
        let username = userNode.innerText;
        let userId = userNode.dataset.userid;
        let markCommentId = topNode.dataset.commentid;
        let userComment = headerNode.querySelector('.area-comment-des-content').innerHTML;
        let y = /(.*)#.*/.exec(window.location.href)
        let dougaAddr = y ? y[1] : window.location.href;
        let tag = prompt('为『' + username + '』添加标记，最多10个字符', "");
        let describe = prompt('为『' + username + '』添加更多描述（可选）', "");
        let tag_trim = tag.trim();
        if (tag_trim != '' && tag_trim != null && tag_trim.length <= 10) {
            let raw = await ExtOptions.getValue("UserMarks");
            let cover = false;
            if (userId in raw) {
                cover = confirm("标记已经存在，需要覆盖吗？")
                if (cover == false) {
                    return;
                }
            }

            raw[userId] = { name: username, tag: tag, refer: dougaAddr, commentId: markCommentId, evidence: userComment, desc: describe ? describe : "" };
            ExtOptions.setValue("UserMarks", raw).then(() => {
                if (cover) {
                    userNode.offsetParent.querySelector(".pos.simple").remove();
                }
                const elem = document.createElement("span");
                elem.className = "pos simple";
                elem.innerText = tag;
                userNode.after(elem);
            })
        }
    }

    saveToHtml(e) {
        let data = `<style>
        html {
            background-color: #222;
          }
          body {
            margin: 0 auto;
            box-sizing: border-box;
            padding: 30px;
            background-color: #fff;
            animation: slideInDown 0.6s;
            animation-fill-mode: both;
          }
          a {
            text-decoration: none;
          }
          p {
            margin: 0;
            padding: 0;
          }
          ${document.querySelector("#AcFunHelper_CommentEnhance").innerText}
          @keyframes slideInDown {
            from {
              transform: translateY(-50%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .area-comment-first {
            display: flex;
          }
          div.area-comment-title > a {
            display: block;
            color: #fd4c5c;
          }
          div.area-comment-title > a:hover {
            color: #fd4c5c;
          }
          div.area-comment-title > a:visited {
            color: #fd4c5c;
          }
          div.area-comment-left > a > img.avatar-bg-2018062102 {
            position: absolute;
            top: 10px;
            left: 5px;
            background-color: transparent;
            border: none;
          }
          div.area-comment-left > a > img.avatar {
            width: 50px;
            height: 50px;
            margin: 0;
            padding: 0;
            border: 1px solid #ffffff;
            box-shadow: 0 0 0 rgba(0, 0, 0, 0);
            border-radius: 50%;
          }
          .area-comment-title {
            padding-left: 20px;
            height: 20px;
            line-height: 25px;
            display: flex;
            align-items: center;
          }
          .area-comment-left .thumb {
            display: block;
            width: 50px;
            height: 50px;
            position: relative;
          }
          .area-comment-left .thumb img:nth-of-type(2) {
            top: -16px !important;
            left: -14px !important;
          }
          .ac-comment-list .area-comment-title .name {
            margin-right: 6px;
            font-size: 12px;
          }
          .area-comm-more,
          .area-comment-reply,
          .time_day,
          .time_times,
          .acfunAdmin {
            display: none !important;
          }
          .area-comment-sec {
            margin-left: 60px;
            margin-right: 250px;
            background-color: #f7f7f7;
            padding: 12px 10px;
          }
          .area-comment-top {
            margin-left: 10px;
          }
          .area-comment-des {
            padding-left: 20px;
          }
          .area-comment-des-content {
            padding: 10px 0px 10px 0px;
          }
          .area-comment-right {
          }
          .area-sec-list .area-comment-des-content {
            width: 440px;
          }
          .area-comment-tool {
            height: 30px;
            color: #aaa;
            font-size: 13px;
            padding-left: 20px;
            padding-top: 4px;
          }
          .area-comment-tool span{
            margin-right: 10px;
          }
          .deviceModel {
            color: #aaa;
          }
          .origin{
            width: 44px;
            position: fixed;
            right: 0;
            bottom: 50px;
            z-index: 1;
            background-color: #fff;
            border-radius: 3px 0 0 3px;
            box-shadow: 0 2px 5px 0 rgb(0 0 0 / 30%);
            opacity: .5;
          }
        </style><body><div class="origin"><a href="${globalThis.location.href}">原地址</a></div>
        `
        data += e.target.parentElement.parentElement.parentElement.parentElement.parentElement.innerHTML;
        var blob = new Blob([data], { type: 'application/octet-stream' });
        var url = window.URL.createObjectURL(blob);
        var saveas = document.createElement('a');
        saveas.href = url;
        saveas.style.display = 'none';
        document.body.appendChild(saveas);
        saveas.download = `${window.location.href}.html`;
        saveas.click();
        setTimeout(function () { saveas.parentNode.removeChild(saveas); }, 0)
        document.addEventListener('unload', function () { window.URL.revokeObjectURL(url); });
    }

    markMenu(e) {
        if (!e.querySelector(".comment-mark")) {
            let elem = document.createElement("span");
            elem.className = "comment-mark";
            elem.innerText = "标记PO";
            elem.addEventListener("click", this.markUser);
            e.appendChild(elem);
        }
    }

    jumpLinkMenu(e) {
        if (!e.querySelector(".comment-jumpLink")) {
            let elem = document.createElement("span");
            elem.className = "comment-jumpLink";
            elem.innerText = "复制楼层链接";
            elem.addEventListener("click", this.jumpLink);
            e.appendChild(elem);
        }
    }

    saveHtmlMenu(e) {
        if (!e.querySelector(".comment-cap")) {
            let elem = document.createElement("span");
            elem.className = "comment-cap";
            elem.innerText = "保存为HTML";
            elem.addEventListener("click", this.saveToHtml);
            e.appendChild(elem);
        }
    }

    async renderSubScan(rootCommentId) {
        let timer = setInterval(async () => {
            this.cache["UserMarks"] = await ExtOptions.getValue("UserMarks");
            let nodes = $("div[data-commentid='" + rootCommentId + "']").find('a.name');
            let loading = $('.ac-comment-loading').html();
            if (nodes.length > 0 && loading == '') {
                nodes.each(async (e) => {
                    this.runtime.options.scan && this.renderTag(nodes[e]);
                    this.runtime.options.upHighlight && this.renderUp(nodes[e]);
                    this.runtime.options.StaffMark && this.renderStaff(nodes[e]);
                });
                clearInterval(timer);
            } else {
                if (!document.querySelector(".ac-comment-root-list").childElementCount) {
                    clearInterval(timer);
                }
            }
        }, 1000);
    }

    renderSubMark(rootCommentId) {
        let timer = setInterval(async () => {
            let nodes = $("div[data-commentid='" + rootCommentId + "']").find('.area-comm-more');
            if (nodes.length > 0) {
                nodes.each(async (e) => {
                    this.runtime.options.mark && this.markMenu(nodes[e]);
                });
                clearInterval(timer);
            } else {
                if (!document.querySelector(".ac-comment-root-list").childElementCount) {
                    clearInterval(timer);
                }
            }
        }, 1000);
    }

    clearMark() {
        //解绑事件
        $('.area-comm-more').off('click', '.comment-mark');
        $(".comment-mark").remove();
        $(".area-comm-more").removeClass('comment-mark-parent');
    }

    clearScan() {
        $(".area-comment-title .pos.simple").remove();
    }

    /**
     * 稿件跳转弹窗
     * @param {number} type 
     * @param {boolean} isArticle 
     */
    uddPopUp(type = 0) {
        let _fthis = this;
        let target = 'a.ubb-ac';
        const loadCover = 'data:image/png;base64,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'
        _fthis.addUddPopUpStyle(target)
        GetAsyncDomUtil.getAsyncDomClassic(target, () => {
            let ubbBox = $(target);
            let html = ` 
            <div class=${type ? 'udd-box' : 'udd-box2'}>
                ${type ? `<img class = udd-img style='width: 36px; height: 36px; background:white;margin:0px;' src = ${loadCover}>` : ''}
                <div class=${type ? 'udd-text' : 'udd-text2'}>
                    <div class = udd-title></div>
                    <div class = udd-user></div>
                </div>
            </div>
            `

            ubbBox.append(DOMPurify.sanitize(html));
            let timer = null;
            ubbBox.mouseenter(function () {
                timer && clearTimeout(timer)
                function removeAPrefix(_$targetDom) {
                    let acid = _$targetDom[0].getAttribute("data-aid");
                    if (acid == '') { return }
                    return acid
                }

                let id = removeAPrefix($(this));
                let _this = this.children[0];
                let imgCover = type && _this.children[0];
                let title = _this.children[type].children[0];
                let name = _this.children[type].children[1];
                let target = { _this, imgCover, title, name };
                let articleCover = 'http://cdn.aixifan.com/dotnet/20120923/style/image/cover.png';
                let titleText = '';
                let descriptionText = '';
                let innerContent = { articleCover, titleText, descriptionText }
                type && $(_this).css({ display: 'flex', opacity: '1' });
                timer = setTimeout(() => {
                    _fthis.changeUddPopUpCssStyle('in', type, this)
                    if ($(title).text() || $(name).text()) {
                        type && $(this).find('img').css({ opacity: '1' })
                        return
                    }
                    fetch(`https://mini.pocketword.cn/api/acfun/dougaInfo?acid=${id}`).then(res => res.text()).then(res => {
                        let x = JSON.parse(res);
                        type && $(this).find('img').css({ opacity: '1' })
                        if (x.status == 0) {
                            x = x.result;
                            innerContent.articleCover = x.coverUrl;
                            innerContent.titleText = x.title;
                            innerContent.descriptionText = `UP : ${x.user.name}  播放 : ${x.viewCountShow}`
                        } else {
                            innerContent.titleText = '文章区适配';
                            innerContent.descriptionText = '           敬请期待！咕'
                        }
                        _fthis.changeUddPopUpText(target, innerContent)
                        timer && clearTimeout(timer)
                    }).catch(rej => {
                        console.log(rej)
                        _fthis.changeUddPopUpText(target, innerContent)
                    })
                }, 1000)
            })
            ubbBox.mouseleave(function () {
                _fthis.changeUddPopUpCssStyle('out', type, this)
                timer && clearTimeout(timer)
            })
        }, 1000, false)
    }

    changeUddPopUpText(target, innerContent) {
        let { _this, imgCover, title, name } = target;
        let { articleCover, titleText, descriptionText } = innerContent
        imgCover ? $(imgCover).attr('src', articleCover) : $(_this).css('background-image', `url(${articleCover})`);
        $(title).text(titleText)
        $(name).text(descriptionText)
    }

    changeUddPopUpCssStyle(handle, type, ubbac) {
        if (handle === 'in') {
            if (type) {
                $(ubbac.children[0]).css({ height: '38px', width: '310px', padding: '4px 10px 4px 20px', transform: 'translate(70px,0px)' })
            } else {
                $(ubbac.children[0]).css({ display: 'flex', opacity: '1' });
            }
        } else if (handle === 'out') {
            if (type) {
                $(ubbac.children).css({ display: 'none', opacity: '0', width: '36px', height: '36px', padding: '0px', transform: 'translate(150px,9px)' })
            } else {
                $(ubbac.children).css({ display: 'none', opacity: '0' })
            }
        }
    }
    addUddPopUpStyle(target) {
        let cssTest = `
        ${target}{
            position: relative;
            display: inline-block;
            vertical-align: text-top;
        }
        .udd-box{
            z-index:1001;
            position: absolute;
            top: -50px;
            left: -90px;
            background: #ce3232db;
            overflow: hidden;
            transform: translate(150px,9px);
            height: 36px;
            width:36px;
            padding:0px;
            color: rgb(255 255 255);
            border: 1px #0c0c0c69 solid;
            border-radius: 26px;
            font-size: 8px;
            transition-duration: 1s;
            opacity: 0;
            display: none;
        }
        .udd-img{
            width: 64px; 
            height: 36px;
            transition-duration: .5s;
        }
        .udd-text{
            display: flex;
            flex-direction: column;
            flex: 3;
            width: 246px;
            text-align: center;
            padding-left: 4px;
            justify-content: space-around;
        }
        .udd-user{
            text-align: initial;
            color: #fff;
            height:16px;
            line-height:16px;
        }
        .udd-title{
            height: 16px;
            width: 99%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 16px;
        }
        .udd-box2{
            flex-flow: wrap-reverse;
            width: 300px;
            height: 180px;
            background-size: 100% 100%;
            z-index: 1001;
            position: absolute;
            top: -180px;
            display: flex;
            color: rgb(255 255 255);
            border-radius: 3px;
            font-size: 8px;
            transition-duration: 1s;
            opacity: 0;
            display: none;
            overflow: hidden;
            box-shadow: 0px 0px 5px #b1b1b1;
            animation: 0.2s cubic-bezier(0, 0, 0, 1) 0s 1 normal none running achfadeInDown;
        }
        .udd-text2{
            background: #000000ad;
            height: 42px;
            display: flex;
            flex-direction: column;
            flex: 3;
            width: 246px;
            text-align: center;
            padding-left: 4px;
            justify-content: space-around;
        }
    `
        createElementStyle(cssTest, document.head, "AcFunHelper_UddPopUpStyle")
    }

    /**
     * 评论区时间播放器跳转
     * @description 在评论区添加快速跳转至视频对应时间的链接
     */
    searchScanForPlayerTime() {
        var timer = setInterval(() => {
            let nodes = $('.area-comment-des-content:not(:has(.quickJump))');
            let loading = $('.ac-comment-loading').html();
            let reg_for_time = this.reg_for_time;
            let reg_for_3partime = this.reg_for_time3part;
            let reg_for_part = this.reg_for_part;
            let reg_for_mtline = new RegExp('<br>')
            if (nodes.length > 0 && loading == '') {
                nodes.each(async function () {
                    let comment_content = $(this)[0].innerText.toString();
                    let comment_html = $(this)[0].innerHTML.toString();
                    let if_matchTime = reg_for_time.exec(comment_content);
                    //let if_mtline=reg_for_mtline.exec(comment_html);  单行就跑多行方法的1遍
                    if (if_matchTime) {
                        let a = comment_html.split('<br>')
                        let after_html_out = '';
                        let after_html = '';
                        let partTarrgetNum = 0;
                        for (let i = 0; i <= (a.length - 1); i++) {
                            let timeTarget = reg_for_time.exec(a[i]);
                            let timeTarget3p = reg_for_3partime.exec(a[i]);
                            let partTarrget = reg_for_part.exec(a[i]);
                            partTarrgetNum = 0
                            if (timeTarget3p) {
                                if (partTarrget) {
                                    partTarrgetNum = partTarrget[0].replace(/[^1-9]/ig, "")
                                }
                                timeTarget3p ? timeTarget3p = timeTarget3p[0].replace(/分/, ':').replace(/秒/, '') : ''
                                after_html = after_html + `<a class='quickJump' onclick="VideoInject.quickJump('${timeTarget3p}',${partTarrgetNum && partTarrgetNum})">${partTarrget ? partTarrget[0] + ' ' : ' '} ${timeTarget3p}</a>`;
                            } else if (timeTarget) {
                                if (partTarrget) {
                                    partTarrgetNum = partTarrget[0].replace(/[^1-9]/ig, "")
                                }
                                timeTarget ? timeTarget = timeTarget[0].replace(/分/, ':').replace(/秒/, '') : ''
                                after_html = after_html + `<a class='quickJump' onclick="VideoInject.quickJump('${timeTarget}',${partTarrgetNum && partTarrgetNum})">${partTarrget ? partTarrget[0] + ' ' : ' '} ${timeTarget}</a>`;
                            }
                            after_html = after_html + ' ' + a[i] + "<br>";
                        }
                        after_html_out = after_html_out + after_html;
                        $(this).html(after_html_out);
                    }
                }
                );
                clearInterval(timer);
            }
        }, 1000);
        /**
         * ref:https://cssanimation.rocks/animating-links/
         */
        createElementStyle(`
        .ac-comment-list .area-comment-des a.quickJump:hover:after {
            right: 0;
            transition: right .4s cubic-bezier(0, .5, 0, 1);
        }
        .ac-comment-list .area-comment-des a.quickJump:after {
            border-radius: 1em;
            border-top: 1px solid #409BEF;
            content: "";
            position: absolute;
            right: 100%;
            bottom: -1px;
            left: 0;
            transition: right .4s cubic-bezier(0, .5, 0, 1);
        }
        `, document.head, "AcFunHelper_searchScanForPlayerTimeSty")
    }

    /**
     * 选中时间 按shift+A 跳转 开关依赖评论区空降功能
     * @todo 与倍速快捷键一样都绑定到了document上 正则未做严格匹配(你甚至能让iphone8跳转到8s)
     * @param {Int16Array} settingKeyCode 
     */
    easySearchScanForPlayerTime(settingKeyCode) {
        document.onkeypress = (e) => {
            if (e.shiftKey && e.keyCode === settingKeyCode[0]) {
                let txt = window.getSelection().toString().trim();
                let time = this.easy_time.exec(txt)[0];
                time ? document.getElementsByTagName("video")[0].currentTime = this.setVideoTime(time) : ''
            }
        }
    }

    setVideoTime(time) {
        let str = time;
        let seconds = str.search("分") === -1 ? str.split('秒')[0] : str.split('分')[0] * 60
        // console.log(`[LOG]Frontend-CommentEnhance>easySearchScanForPlayerTime: 跳转到[${seconds}]秒！！ gogogo！`)
        return seconds;
    }

}

