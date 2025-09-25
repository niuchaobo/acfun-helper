/**
 * 前台接口
 * @description 是已经bind了fgCore实例的MessageSwitch调用这些方法，所以这里的this就是fg
 */
class AcFunHelperFrontendApis extends AcFunHelperFgFrame {
    constructor() {
        super();
    }

    //抽奖
    async lottery(params) {
        let { number, follow } = params;
        let href = window.location.href;
        let reg = /ac(\d+)/;
        let acId = reg.exec(href)[1];
        this.luckyTurntab.RollOut(acId, number, follow);
    }

    async lottery2nd(params) {
        let { number, follow } = params;
        let href = window.location.href;
        let reg = /ac(\d+)/;
        let acId = reg.exec(href)[1];
        await this.luckyTurntab.RollOutExp(acId, number, follow);
    }

    //下载封面
    downloadCover(params) {
        this.download.downloadCover(params);
    }

    //下载弹幕
    downloadDanmaku() {
        this.download.downloadDanmaku(this.runtime.dataset.dougaInfo);
    }

    playerTimeJumpUrlGenDiv() {
        const timeText = document.querySelector(".time-label").children[0].innerText;
        if (timeText) {
            const ResultUrl = FunctionalUrlParam.playerTimeJumpUrlGen(timeText);
            var aux = document.createElement("input");
            aux.setAttribute("value", ResultUrl);
            document.body.appendChild(aux);
            aux.select();
            document.execCommand("copy");
            document.body.removeChild(aux);
            LeftBottomNotif("跳转到现在播放时间的链接已经复制到剪贴板了。")
        }
    }

    assDanmaku() {
        this.danmaku.sanitizeJsonDanmakuToAss(this.runtime.dataset.dougaInfo);
    }

    notice(params) {
        MessageSwitch.sendMessage('fg', { target: "notice", params: params, InvkSetting: { type: "function" } })
    }

    //视频下载
    async download(params) {
        this.download.downloadVideo(params);
    }

    mark(params) {
        let { value } = params;
        this.runtime.options.mark = value;
        ExtOptions.saveAll(this.options);
        if (value) {
            this.ce.renderMark();
        } else {
            this.ce.clearMark();
        }
    }

    timelineDotsMain(params) {
        let { massText, url } = params;
        this.runtime.options.timelineDots && this.videoSetting.timelineDotsMain(massText);
    }

    scan(params) {
        let { value } = params;
        this.runtime.options.scan = value;
        //保存配置信息到插件配置存储
        ExtOptions.saveAll(this.options);
        if (value) {
            this.ce.renderScan();
        } else {
            this.ce.clearScan();
        }
    }

    //直播m3u8 url赋值到前台页面
    async renderLive(params) {
        if (REG.live.test(this.href)) {
            this.live.renderLive(params);
        }
    }

    //评论区折叠部分的标记渲染入口
    renderSub(params) {
        let { url, rootCommentId } = params;
        this.ce.renderSubScan(rootCommentId);
        this.ce.renderSubMark(rootCommentId);
        if (this.runtime.options.PlayerTimeCommentEasyJump) {
            //评论空降
            REG.videoAndBangumi.test(this.href) && this.ce.searchScanForPlayerTime();
        }
    }

    //评论区整体部分的标记渲染入口 ()
    renderList(params) {
        let { url } = params.url;
        this.ce.renderScan();
        this.ce.renderMark();
        if (this.runtime.options.PlayerTimeCommentEasyJump) {
            REG.videoAndBangumi.test(this.href) && this.ce.searchScanForPlayerTime();
        }
        //跳转链接弹框
        this.runtime.options.uddPopUp && this.ce.uddPopUp(Number(this.runtime.options.uddPopUptype));
        if (REG.videoAndBangumi.test(this.href)) {
            //快捷键空降 TODO:全功能快捷键！
            if (this.runtime.options.easySearchScanForPlayerTimesw) {
                GetAsyncDomUtil.getAsyncDomClassic('.ac-pc-comment', () => {
                    this.ce.easySearchScanForPlayerTime(this.runtime.options.custom_easy_jump_keyCode)
                });
            }
        }
    }

}