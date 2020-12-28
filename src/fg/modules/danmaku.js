/**
 * 弹幕处理
 */

class Danmaku {
    constructor() {
        this.devMode = true;
        this.acid = 0;
        this.videoInfo = {};
        this.duration = 10;
        this.danmuMotionList = [];
        this.videoQualitiesRefer = videoQualitiesRefer;
        this.thisVideoQuality = 0;
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

        this.acid = REG.acVid.exec(window.location.href)[2];
        let videoInfo = JSON.parse(await fetchResult(acfunApis.videoInfo + this.acid));
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
                }, body: `resourceId=${videoInfo.videoList[0].id}&resourceType=9&enableAdvanced=true&pcursor=1&count=2000&sortType=1&asc=false`
            })
                .then((res => { return res.text() }))
                .then((res) => {
                    let x = JSON.parse(res);
                    this.devMode ? console.log(x) : ""
                    this.assDanmakuProcess(x.danmakus, x.danmakus.length, false, videoInfo);
                })
        }
    }

    async assDanmakuProcess(danmakuRes, danmakuLength, mode, videoInfo) {
        // let thisVideoQuality = "1080p";
        let thisVideoQuality = document.querySelector(".control-btn.quality").children[0].innerText.toLowerCase();
        this.thisVideoQuality = thisVideoQuality;
        let fontsize = Number(danmakuRes[0].size) + 15;
        // let fontsize = 65;
        // Function refer:https://github.com/orzogc/acfundanmu
        // ass文件的Script Info
        this.devMode ? console.log(thisVideoQuality) : ""
        this.devMode ? console.log(this.videoQualitiesRefer[thisVideoQuality]) : ""
        let scriptInfo = `[Script Info]
; AcVid: ${this.acid}
; StreamName: ${videoInfo.title}
Title: ${this.acid} - ${videoInfo.user.name} - ${videoInfo.title}
Original Script: ${this.acid} - ${videoInfo.user.name} - ${videoInfo.title}
Script Updated By: 使用AcFun助手获取
ScriptType: v4.00+
Collisions: Normal
PlayResX: ${this.videoQualitiesRefer[thisVideoQuality].width}
PlayResY: ${this.videoQualitiesRefer[thisVideoQuality].height}
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

        var startTime, fontTailX, toLeftTime, toLeftVelocity
        //先构建对象运动表
        for (let i = 0; i < danmakuLength; i++) {
            //略过高级弹幕
            if (danmakuRes[i].danmakuType != 0) {
                this.danmuMotionList[i] = { "type": 1 }
                continue;
            }
            //弹幕挂载时间（文本）（弹幕左边界 接触到 视频的右边界）
            startTime = danmakuRes[i].position / 1e3;
            //弹幕的长度
            fontTailX = danmakuRes[i].body.length * fontsize;
            //运动到出界的时间点
            toLeftTime = startTime + this.duration + (this.videoQualitiesRefer[thisVideoQuality].width + fontTailX) / this.videoQualitiesRefer[thisVideoQuality].width;
            //速度
            toLeftVelocity = (this.videoQualitiesRefer[thisVideoQuality].width + fontTailX) / this.duration;

            this.danmuMotionList[i] = { "startTime": startTime, "fontTailX": fontTailX, "toLeftTime": toLeftTime, "toLeftVelocity": toLeftVelocity, "type": 0 }
        }

        let channelNum = Math.floor(1080 / 65);
        // console.log(this.danmuMotionList)
        //逐个击破
        for (let i = 0; i < danmakuLength; i++) {
            if (this.danmuMotionList[i].type != 0) {
                continue;
            }
            if (this.danmakuChannelCheck(i)) {
                let randHeigh = fontsize * randomNum(2, channelNum);
                events += `Dialogue: 0,${this.timeProc(this.danmuMotionList[i].startTime)},${this.timeProc(this.danmuMotionList[i].toLeftTime)},Danmu,${danmakuRes[i].userId},20,20,2,,{\\move(${this.videoQualitiesRefer[thisVideoQuality].width + fontTailX},${randHeigh},${- fontTailX},${randHeigh})}${danmakuRes[i].body}\n`
            } else {
                events += `Dialogue: 0,${this.timeProc(this.danmuMotionList[i].startTime)},${this.timeProc(this.danmuMotionList[i].toLeftTime)},Danmu,${danmakuRes[i].userId},20,20,2,,{\\move(${this.videoQualitiesRefer[thisVideoQuality].width + fontTailX},${fontsize},${- fontTailX},${fontsize})}${danmakuRes[i].body}\n`
            }
        }

        this.devMode ? console.log(this.danmuMotionList) : ""

        let result = scriptInfo + sytles + events;

        this.devMode ? console.log("download danmaku") : ""
        downloadThings(result, `${this.acid} - ${videoInfo.user.name} - ${videoInfo.title}.ass`)
    }

    timeProc(second, offset = 0) {
        var minute, hours;
        second = second + offset//6060
        minute = Math.floor(second / 60);//101
        hours = Math.floor(second / 60 / 60);//1

        minute = minute - hours * 60;
        second = second - hours * 60 * 60 - minute * 60;

        minute = minute.length == 1 ? "0" + minute : minute;
        second = second.length == 1 ? "0" + second : second;
        return hours + ":" + minute + ":" + (second + offset).toFixed(2);
    }

    danmakuChannelCheck(index) {
        // refer:https://www.zhihu.com/question/370464345/answer/1021530502
        const lastBullet = this.danmuMotionList[index - 1];
        const bullet = this.danmuMotionList[index];
        // console.log(this.thisVideoQuality)
        // console.log(this.videoQualitiesRefer[this.thisVideoQuality])
        if (lastBullet) {
            const lastBulletPos = this.videoQualitiesRefer[this.thisVideoQuality].width;

            // 基本公式：s = v * t
            const lastS = this.videoQualitiesRefer[this.thisVideoQuality].width + lastBulletPos.fontTailX;
            const lastV = (this.videoQualitiesRefer[this.thisVideoQuality].width + lastBulletPos.fontTailX) / this.duration;
            const lastT = lastS / lastV;

            const newS = this.videoQualitiesRefer[this.thisVideoQuality].width;
            const newV = (this.videoQualitiesRefer[this.thisVideoQuality].width + bullet.fontTailX) / this.duration;
            const newT = newS / newV;

            if (lastV < newV && lastT > newT) {
                return false;
            }
        }
        return true;
    }

}