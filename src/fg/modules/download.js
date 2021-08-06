/**
 * 视频下载,封面下载
 */
class Download {
    constructor() {

    }

    async downloadVideo(params) {
        let activeKey = window.odhfront.options.activeTabKey;
        let { url, title, id, qualityLabel } = params;
        let m3u8 = url;
        let tabId = await getStorage(activeKey).then(result => { return result[activeKey] });
        let fileName = title + "-" + qualityLabel + ".mp4";

        var MyBlobBuilder = function () {
            this.parts = [];
        }
        MyBlobBuilder.prototype.append = function (part) {
            this.parts.push(part);
            this.blob = undefined; // Invalidate the blob
        };

        MyBlobBuilder.prototype.getBlob = function () {
            if (!this.blob) {
                this.blob = new Blob(this.parts, { type: "" });
            }
            return this.blob;
        };
        let reg = new RegExp('https:\\/\\/.*\\.acfun\\.cn\\/.*\\/segment\\/|http:\\/\\/.*\\.acfun\\.cn\\/.*\\/segment\\/');
        let reg_new = new RegExp('https:\\/\\/.*\\.acfun\\.cn\\/.*\\/hls\\/|http:\\/\\/.*\\.acfun\\.cn\\/.*\\/hls\\/');
        var prefix = "";
        fgConsole("Download", "downloadVideo", `M3u8 address is: ${m3u8}`, 1, false)
        if (reg.test(m3u8)) {
            prefix = m3u8.match(reg)[0];
        } else if (reg_new.test(m3u8)) {
            prefix = m3u8.match(reg_new)[0];
        }
        let res = await parseM3u8(m3u8);
        let segments = res.segments;
        let seArr = new Array();
        if (segments.length == 0) {
            chrome.runtime.sendMessage({
                action: 'notice', params: {
                    title: "警告",
                    msg: "视频信息已过期，请刷新当前页面",
                }
            }, function (response) {});
            return;
        } else {
            for (let seg of segments) {
                let uri = prefix + seg.uri;
                //acfun的视频片段路径是不完整的,缺少http:// ,需要补全
                // eg:"EKT8PxpARFg1bzNoUldlcTQ2MU5POWFpVms5cWVDOFl1anVNMzgxV3p3d2pqSkxvMVdhMDBXejJnZ3NGTC1aUE1CbjlkRw.ts?safety_id=AALXcXOtLbPnEichVENCciwF&pkey=AAPvrDb0ntD0obeNv1goe2Rn2rC1sdIAik9UsCzQq_yxTY3W9WNrUlN1eGpSjV-EjVmxl3z99SlX5TCzpithT_DZBDZJL5mAj1f41Be5oIKqNr_qiZ2Xv1OwUCkEyborQJqcBylYF4EpLvIeYh2EWlkfo_ONzw51ohvTuV1bx_9XQcb8nHDciQGrbRNOkym05eDAKVb9_7zd3I4fK5RbscRXsJBO8NLJe4ER9XTyf32L0dSuPhNFzn5ik58aF4Lp1zzOw9sGyCps8tsI10NDewh_K5_Jw5aJclpKhYOjHLnO6A"
                seArr.push(uri);
            }
        }
        let index = 0;
        var myBlobBuilder = new MyBlobBuilder();
        for (let url of seArr) {
            index++;
            var a = null;
            try {
                a = await getVideo(url);
            } catch (e) {
                let action = 'notice';
                let p = {
                    title: "警告",
                    msg: "视频下载失败，请刷新后重试",
                }
                /*chrome.runtime.sendMessage({action:action,params:p}, function(response) {

                });*/
            }

            myBlobBuilder.append(a);

            //计算当前进度
            let progress = parseInt(index / seArr.length * 100);
            //更新storage数据
            var obj = document.getElementById("acfun-popup-helper");
            var frameWindow = obj.contentWindow;
            frameWindow.postMessage({
                action: 'updateProgress',
                params: {
                    progress: progress,
                    id: id,
                }
            }, '*');
            //this.updateStorage(progress,id,tabId);
        }
        if ('download' in document.createElement('a')) {
            let elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(myBlobBuilder.getBlob());
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href);
            document.body.removeChild(elink);
        } else {
            navigator.msSaveBlob(myBlobBuilder.getBlob(), fileName);
        }

    }

    downloadCover(params) {
        let { link_url, type } = params;
        link_url = link_url.replace("https://www.acfun.cn", "");
        $('.home-main-content a,.main a,.tab-content a').each(function () {
            let href = $(this).attr('href');
            if (link_url == href) {
                if ($(this).has('img').length) {
                    let _img = $(this).find('img').eq(0);
                    let img_url = _img.attr('src');
                    let fileName = _img.attr('alt');
                    if (fileName == undefined) {
                        fileName = "cover";
                    }

                    img_url = img_url.replace(/(webp)/, 'gif').replace("http://", "https://");
                    //如果是高清
                    if (type == 'high') {
                        //   /w/320/h/180
                        img_url = img_url.replace(/\/w\/\d+\/h\/\d+/, "").replace(/(\?.*)/, '');
                    }
                    let suffix = img_url.replace(/(.*\.)/, '').replace(/(\?.*)/, '');
                    let reg = new RegExp("jpg|jpeg|gif|bmp|png");
                    if (!reg.test(suffix)) {
                        suffix = 'png';
                    }
                    let filename = fileName + "." + suffix;
                    fetch(img_url) // 返回一个Promise对象
                        .then((res) => {
                            //console.log(res.blob()) // res.blob()是一个Promise对象
                            return res.blob();
                        })
                        .then((res) => {
                            //console.log(res) // res是最终的结果
                            let a = document.createElement('a');
                            let blob = new Blob([res]);
                            let url = window.URL.createObjectURL(blob);
                            a.href = url;
                            a.download = filename;
                            a.click();
                            window.URL.revokeObjectURL(url);
                        });
                    return false;
                }
            }
        })

    }

    async downloadDanmaku(videoInfo) {
        let acid = REG.acVid.exec(window.location.href)[2];
        let pageCount = Math.round(videoInfo.danmakuCount / 200);
        if (pageCount == 0) {
            pageCount = 1;
        }
        let result = [];
        for (let i = 1; i <= pageCount; i++) {
            let rawRes = JSON.parse(await fetchResult("https://www.acfun.cn/rest/pc-direct/new-danmaku/list", "POST", `resourceId=${videoInfo.videoList[0].id}&resourceType=9&enableAdvanced=true&pcursor=${i}&count=200&sortType=1&asc=false`, true));
            result = result.concat(rawRes.danmakus);
        }
        downloadThings(JSON.stringify(result), acid + "-danmaku.json");
    }

}