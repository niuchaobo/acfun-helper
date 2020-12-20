/**
 * 弹幕处理
 */

class Danmaku {
    constructor() {
        this.devMode = true;
        this.acid = 0;
    }

    /**
     * 将弹幕信息转存到sessionStorage
     */
    cacheStore() {
        window.addEventListener('message', function (e) {
            if (e.data.to == 'frame_danmaku') {
                sessionStorage.setItem("danmakuCache", `${JSON.stringify(e.data)}`);
            }
        })
    }

    async sanitizeJsonDanmakuToAss() {
        this.devMode ? console.log("loaded") : ""

        let danmakuResRaw = JSON.parse(sessionStorage.getItem("danmakuCache"));
        let danmakuRes = danmakuResRaw.msg
        this.devMode ? console.log("get danmaku") : ""
        this.devMode ? console.log(danmakuRes) : ""
        let danmakuLength = JSON.parse(danmakuRes).length;
        this.devMode ? console.log(danmakuLength) : ""
        if (danmakuLength == 0) {
            this.devMode ? console.log("danmaku empty") : ""
            fetch('https://www.acfun.cn/rest/pc-direct/new-danmaku/list', {
                method: "POST", credentials: 'include', headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', 'Accept': "accept: application/json, text/plain, */*"
                }, body: `resourceId=${this.acid}&resourceType=9&enableAdvanced=true&pcursor=1&count=2000&sortType=1&asc=false`
            })
                .then((res => { return res.text() }))
                .then((res) => {
                    let x = JSON.parse(res);
                    this.devMode ? console.log(x) : ""
                    this.assDanmakuProcess(x.danmakus, x.danmakus.length);
                })
        }
        this.assDanmakuProcess(danmakuRes, danmakuLength);
    }

    async assDanmakuProcess(danmakuRes, danmakuLength, mode) {
        this.acid = REG.acVid.exec(window.location.href)[2];
        let thisVideoQuality = document.querySelector(".control-btn.quality").children[0].innerText.toLowerCase();
        let videoInfo = JSON.parse(await fetchResult(acfunApis.videoInfo + this.acid));
        let fontsize = 65;
        // Function refer:https://github.com/orzogc/acfundanmu
        // ass文件的Script Info
        console.log(thisVideoQuality)
        console.log(videoQualitiesRefer[thisVideoQuality])
        let scriptInfo = `[Script Info]
; AcVid: ${this.acid}
; StreamName: ${videoInfo.title}
Title: ${this.acid} - ${videoInfo.user.name} - ${videoInfo.title}
Original Script: ${this.acid} - ${videoInfo.user.name} - ${videoInfo.title}
Script Updated By: 使用AcFun助手获取
ScriptType: v4.00+
Collisions: Normal
PlayResX: ${videoQualitiesRefer[thisVideoQuality].width}
PlayResY: ${videoQualitiesRefer[thisVideoQuality].height}
`

        // ass文件的V4+ Styles
        let sytles = `
[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Danmu,Microsoft YaHei,${fontsize},&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,1,0,2,20,20,2,0\n`

        // ass文件的Events
        let events = `
[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n`
        this.devMode ? console.log("process danmaku") : ""

        if (mode) {
            for (let i = 0; i < danmakuLength; i++) {
                let startTime = this.timeProc(Number(danmakuRes[i].time))
                let fontTailX = danmakuRes[i].message.length * fontsize;
                events += `Dialogue: 0,${startTime},${startTime + 10},Danmu,${danmakuRes[i].user},20,20,2,,{\move(${videoQualitiesRefer[thisVideoQuality].width + fontTailX},${fontsize},${0 - fontTailX},${fontsize})}${danmakuRes[i].message}${danmakuRes[i].repeatNum > 1 ? " x" + danmakuRes[i].repeatNum : ""}\n`
            }
        } else {
            for (let i = 0; i < danmakuLength; i++) {
                let startTime = this.timeProc(danmakuRes[i].position / 1e3)
                let fontTailX = danmakuRes[i].body.length * fontsize;
                events += `Dialogue: 0,${startTime},${this.timeProc(danmakuRes[i].position / 1e3,10)},Danmu,${danmakuRes[i].userId},20,20,2,,{\move(${videoQualitiesRefer[thisVideoQuality].width + fontTailX},${fontsize},${0 - fontTailX},${fontsize})}${danmakuRes[i].body}\n`
            }


            let result = scriptInfo + sytles + events;

            this.devMode ? console.log("download danmaku") : ""

            var blob = new Blob([result], { type: 'application/octet-stream' });
            var url = window.URL.createObjectURL(blob);
            var saveas = document.createElement('a');
            saveas.href = url;
            saveas.style.display = 'none';
            document.body.appendChild(saveas);
            saveas.download = `${this.acid} - ${videoInfo.user.name} - ${videoInfo.title}.ass`;
            saveas.click();
            setTimeout(function () { saveas.parentNode.removeChild(saveas); }, 0)
            document.addEventListener('unload', function () { window.URL.revokeObjectURL(url); });
        }
    }


    timeProc(second, offset = 0) {
        var minute,hours;
        second = second + offset//6060
        minute = Math.floor(second / 60);//101
        hours = Math.floor(second / 60 / 60);//1

        minute = minute - hours * 60;
        second = second - hours * 60 * 60 - minute * 60;

        minute = minute.length == 1 ? "0" + minute : minute;
        second = second.length == 1 ? "0" + second : second;
        return hours + ":" + minute + ":" + second+offset;
    }
}