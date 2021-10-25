/**
 * 评论是本体
 * @description 根据评论ID跳转到相关位置 评论扫描 评论者标记 Up在评论区的标识 评论区稿件ID弹窗 评论区时间播放器跳转 评论区时间快捷键播放器跳转 评论保存为HTML
 */
class CommentEnhance {
    constructor() {
        this.devMode = false;
        this.preDep = false;
        this.reg_for_time = new RegExp('[0-9]{1,3}[:分][0-9]{1,2}秒?');
        this.reg_for_time3part = new RegExp('[0-9]{1,3}[:小时][0-9]{1,3}[:分][0-9]{1,2}秒?');
        this.reg_for_part = new RegExp('^p[0-9]{1,2}|^[0-9]{1,2}p', 'i')
        this.easy_time = new RegExp('[0-9]{1,3}分|[0-9]{1,2}秒?')
        this.loadCover = 'data:image/png;base64,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'
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
    renderScan() {
        if (!this.preDep) {
            return;
        }
        var timer = setInterval(function () {
            let nodes = $('.area-comment-title a.name');
            let loading = $('.ac-comment-loading').html();
            if (nodes.length > 0 && loading == '') {
                nodes.each(async function () {
                    let UserMarks = await getStorage("UserMarks");
                    let exists = $(this).parent().find('.pos.simple');
                    if (exists.length == 0) {
                        let userId = $(this).data('userid');
                        let userName = $(this).text();
                        let tagInfo = UserMarks.UserMarks[userId];
                        if (tagInfo != undefined && tagInfo.tag != '' && tagInfo.tag != undefined) {
                            if (userName != tagInfo.name) {
                                $(this).after('<span title="' + tagInfo.name + '" class="pos simple">' + tagInfo.tag + '</span>');
                            } else {
                                $(this).after('<span class="pos simple">' + tagInfo.tag + '</span>');
                            }
                        }
                    }
                });
                clearInterval(timer);
            }
        }, 1000);
    }

    /**
     * 渲染标记、评论保存为HTML（包括其处理函数）按钮
     */
    renderMark(commentNumber) {
        if (commentNumber) {
            this.preDep = true;
        } else {
            return;
        }
        var timer = setInterval(function () {
            let nodes = $('.area-comm-more');
            let loading = $('.ac-comment-loading').html();
            if (nodes.length > 0 && loading == '') {
                nodes.each(function () {
                    let text = $(this).text();
                    if (text.indexOf('标记') == -1) {
                        $(this).addClass('comment-mark-parent');
                        $(this).append(DOMPurify.sanitize('<span class="comment-mark">标记PO</span>'));
                        $(this).append(DOMPurify.sanitize('<span class="comment-jumpLink">复制楼层链接</span>'));
                        $(this).append(DOMPurify.sanitize('<span class="comment-cap">保存为HTML</span>'));
                        $(this).on('click', '.comment-cap', function () {
                            let data = `<style>
                            html {
                                background-color: #222;
                              }
                              body {
                                width: 900px;
                                margin: 0 auto;
                                box-sizing: border-box;
                                padding: 60px;
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
                                height: 25px;
                                line-height: 25px;
                                padding-left: 20px;
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
                                margin-left: 100px;
                                margin-right: 100px;
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
                                width: 550px;
                                padding-top: 10px;
                                line-height: 150%;
                                text-indent: 1rem;
                              }
                              .area-comment-right {
                                width: 660px;
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
                            </style><body>
                            `
                            data += $(this).parent().parent().parent().parent().parent()[0].innerHTML;
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
                        });
                        $(this).on('click', '.comment-jumpLink', async function (e) {
                            var aux = document.createElement("input");
                            aux.setAttribute("value", window.location.href + "#ncid=" + e.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.commentid);
                            document.body.appendChild(aux);
                            aux.select();
                            document.execCommand("copy");
                            document.body.removeChild(aux);
                            LeftBottomNotif("AcFun助手：评论楼层分析的跳转连接已经复制！", "info", 1500);
                        })
                        $(this).on('click', '.comment-mark', async function () {
                            let userNode = $(this).parent().parent().parent().find('.name').eq(0);
                            let username = userNode.text();
                            let userId = userNode.data("userid");
                            let markCommentId = $(this).parent().parent().parent().parent().parent().data("commentid");
                            let userComment = $(this).parent().parent().parent().find('.area-comment-des-content')[0].innerHTML;
                            let x = new RegExp("(.*)#.*");
                            let y = x.exec(window.location.href)
                            let dougaAddr = y ? y[1] : window.location.href;
                            let tag = prompt('为『' + username + '』添加标记，最多10个字符', "");
                            let describe = prompt('为『' + username + '』添加更多描述（可选）', "");
                            let tag_trim = tag.trim();
                            if (tag_trim != '' && tag_trim != null && tag_trim.length <= 10) {
                                let raw = await getStorage("UserMarks");
                                raw.UserMarks[userId] = { name: username, tag: tag, refer: dougaAddr, commentId: markCommentId, evidence: userComment, desc: describe ? describe : "" };
                                chrome.storage.local.set({ "UserMarks": raw.UserMarks }, function () {
                                    userNode.parent().find('.pos.simple').remove();
                                    userNode.after('<span class="pos simple">' + tag + '</span>');
                                });
                            }
                        });
                    }
                });
                clearInterval(timer);
            }
        }, 1000);
    }

    /**
     * 评论区显示up主名字
     */
    renderScanForUp() {
        if (!this.preDep) {
            return;
        }
        var timer = setInterval(async function () {
            var url = window.location.toString();
            /**@type {string[]} */
            let staffs = [];
            let staffDetail = {}
            try {
                /**@type {APIs.ContributionInfo.StaffInfos} */
                let staffApi = await acfunApis.Staff.getStaffInfo(REG.acVid.exec(window.location.href)[2]);
                staffApi.staffInfos.forEach(e => {
                    staffs.push(e["name"]);
                    staffDetail[e.name] = e["staffRoleName"];
                })
                console.log(staffs, staffDetail)
            } catch (error) {
                console.log(error)
            }
            let avr = new RegExp("/v/");
            let aar = new RegExp("/a/");
            let av = avr.exec(url);
            let aa = aar.exec(url);
            if (av != null && av != undefined && av.length >= 1) {
                var up = $('a.up-name').text();
            } else if (aa != null && aa != undefined && aa.length >= 1) {
                var up = $('div.up-name a.upname').text();
            }
            let nodes = $('.area-comment-title a.name');
            let loading = $('.ac-comment-loading').html();
            if (nodes.length > 0 && loading == '') {
                nodes.each(async function () {
                    let exists = $(this).parent().find('.pos.up');
                    if (exists.length == 0) {
                        let userName = $(this).text();
                        if (userName == up) {
                            $(this).after('<span class="pos up">UP主</span>');
                        }
                        if (staffs.length) {
                            if (staffs.includes(userName)) {
                                $(this).after(`<span class="pos staff">${staffDetail[userName]}</span>`);
                            }
                        }
                    }
                });
                clearInterval(timer);
            }
        }, 1020);
    }

    renderSubScan(rootCommentId) {
        if (!this.preDep) {
            return;
        }
        var timer = setInterval(function () {
            let nodes = $("div[data-commentid='" + rootCommentId + "']").find('a.name');
            if (nodes.length > 0) {
                nodes.each(async function () {
                    let exists = $(this).parent().find('.pos.simple');
                    let UserMarks = await getStorage("UserMarks");
                    if (exists.length == 0) {
                        let userId = $(this).data('userid');
                        let userName = $(this).text();
                        let tagInfo = UserMarks.UserMarks[userId];
                        if (tagInfo != undefined && tagInfo.tag != '' && tagInfo.tag != undefined) {
                            if (userName != tagInfo.name) {
                                $(this).after('<span title="' + tagInfo.name + '" class="pos simple">' + tagInfo.tag + '</span>');
                            } else {
                                $(this).after('<span class="pos simple">' + tagInfo.tag + '</span>');
                            }
                        }
                    }
                });
                clearInterval(timer);
            }
        }, 1000);
    }

    /**
     * 评论区(折叠或翻页中)显示up主名字
     * @param {string} rootCommentId 
     */
    renderSubScanForUp(rootCommentId) {
        if (!this.preDep) {
            return;
        }
        var timer = setInterval(async function () {
            /**@type {string[]} */
            let staffs = [];
            let staffDetail = {}
            try {
                /**@type {APIs.ContributionInfo.StaffInfos} */
                let staffApi = await acfunApis.Staff.getStaffInfo(REG.acVid.exec(window.location.href)[2]);
                staffApi.staffInfos.forEach(e => {
                    staffs.push(e["name"]);
                    staffDetail[e.name] = e["staffRoleName"];
                })
                console.log(staffs, staffDetail)
            } catch (error) {
                console.log(error)
            }
            let url = window.location.toString();
            let avr = new RegExp("/v/");
            let aar = new RegExp("/a/");
            let av = avr.exec(url);
            let aa = aar.exec(url);
            let up = '';
            if (av != null && av != undefined && av.length >= 1) {
                up = $('a.up-name').text();
            } else if (aa != null && aa != undefined && aa.length >= 1) {
                up = $('div.up-name a.upname').text();
            }
            let nodes = $("div[data-commentid='" + rootCommentId + "']").find('a.name');
            if (nodes.length > 0) {
                nodes.each(function () {
                    let exists = $(this).parent().find('.pos.up');
                    if (exists.length == 0) {
                        let userName = $(this).text();
                        if (userName == up) {
                            $(this).after('<span class="pos up">UP主</span>');
                        }
                        if (staffs.length) {
                            if (staffs.includes(userName)) {
                                $(this).after(`<span class="pos staff">${staffDetail[userName]}</span>`);
                            }
                        }
                    }
                });
                clearInterval(timer);
            }
        }, 1020);
    }

    renderSubMark(rootCommentId) {
        if (!this.preDep) {
            return;
        }
        var timer = setInterval(function () {
            let nodes = $("div[data-commentid='" + rootCommentId + "']").find('.area-comm-more');
            if (nodes.length > 0) {
                nodes.each(function () {
                    let text = $(this).text();
                    if (text.indexOf('标记') == -1) {
                        $(this).addClass('comment-mark-parent');
                        $(this).append(DOMPurify.sanitize('<span class="comment-mark">标记</span>'));
                        $(this).on('click', '.comment-mark', async function () {
                            let userNode = $(this).parent().parent().parent().find('.name').eq(0);
                            let username = userNode.text();
                            let userId = userNode.data("userid");
                            let tag = prompt('为『' + username + '』添加标记，最多10个字符', "");
                            let tag_trim = tag.trim();
                            let markCommentId = $(this).parent().parent().parent().parent().parent().data("commentid");
                            let userComment = $(this).parent().parent().parent().find('.area-comment-des-content')[0].innerHTML;
                            let x = new RegExp("(.*)#.*");
                            let y = x.exec(window.location.href)
                            let dougaAddr = y ? y[1] : window.location.href;
                            let describe = prompt('为『' + username + '』添加更多描述（可选）', "");
                            if (tag_trim != '' && tag_trim != null && tag_trim.length <= 10) {
                                let raw = await getStorage("UserMarks");
                                raw.UserMarks[userId] = { name: username, tag: tag_trim, refer: dougaAddr, commentId: markCommentId, evidence: userComment, desc: describe ? describe : "" };
                                chrome.storage.local.set({ "UserMarks": raw.UserMarks }, function () {
                                    userNode.parent().find('.pos.simple').remove();
                                    userNode.after('<span class="pos simple">' + tag + '</span>');
                                });
                            }
                        });
                    }
                });
                clearInterval(timer);
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
        _fthis.addUddPopUpStyle(target)
        getAsyncDom(target, () => {
            let ubbBox = $(target);
            let html = ` 
            <div class=${type ? 'udd-box' : 'udd-box2'}>
                ${type ? `<img class = udd-img style='width: 36px; height: 36px; background:white;margin:0px;' src = ${this.loadCover}>` : ''}
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
                    fetch(`https://mini.pocketword.cn/api/acfun/info?dougaId=${id}`).then(res => res.text()).then(res => {
                        let x = JSON.parse(res);
                        type && $(this).find('img').css({ opacity: '1' })
                        if (x.result == 0) {
                            innerContent.articleCover = x.coverUrl;
                            innerContent.titleText = x.title;
                            innerContent.descriptionText = `UP: ${x.user.name}  播放: ${x.viewCountShow}`
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
                $(ubbac).find('img').css({ border: '1px #0c0c0c69 solid', width: '64px', opacity: '0' })
            } else {
                $(ubbac.children[0]).css({ display: 'flex', opacity: '1' });
            }
        } else if (handle === 'out') {
            if (type) {
                $(ubbac.children).css({ display: 'none', opacity: '0', width: '36px', height: '36px', padding: '0px', transform: 'translate(150px,9px)' })
                $(ubbac).find('img').css({ border: '0px' })
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
            width: 256px;
            height: 144px;
            background-size: 100% 100%;
            z-index: 1001;
            position: absolute;
            top: -150px;
            display: flex;
            color: rgb(255 255 255);
            border: 1px #0c0c0c69 solid;
            border-radius: 10px;
            font-size: 8px;
            transition-duration: 1s;
            opacity: 0;
            display: none;
            overflow: hidden;
            box-shadow: -2px 5px 5px #bababa;
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
        createElementStyle(cssTest)
    }

    // 
    /**
     * 评论区时间播放器跳转
     * @description 在评论区添加快速跳转至视频对应时间的链接
     */
    searchScanForPlayerTime() {
        if (!this.preDep) {
            return;
        }
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
                                after_html = after_html + `<a class='quickJump' onclick="quickJump('${timeTarget3p}',${partTarrgetNum && partTarrgetNum})">${partTarrget ? partTarrget[0] + ' ' : ' '} ${timeTarget3p}</a>`;
                            } else if (timeTarget) {
                                if (partTarrget) {
                                    partTarrgetNum = partTarrget[0].replace(/[^1-9]/ig, "")
                                }
                                timeTarget ? timeTarget = timeTarget[0].replace(/分/, ':').replace(/秒/, '') : ''
                                after_html = after_html + `<a class='quickJump' onclick="quickJump('${timeTarget}',${partTarrgetNum && partTarrgetNum})">${partTarrget ? partTarrget[0] + ' ' : ' '} ${timeTarget}</a>`;
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

