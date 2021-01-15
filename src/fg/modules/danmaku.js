/**
 * 弹幕处理
 */

class Danmaku {
    constructor() {
        this.devMode = false;
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

    /**
     * 获取弹幕信息格式化为Ass格式的弹幕（待完善）
     * @todo 没有解决好弹幕重叠问题
     */
    async sanitizeJsonDanmakuToAss() {
        this.devMode ? console.log("loaded") : ""

        this.acid = REG.acVid.exec(window.location.href)[2];
        let videoInfo = JSON.parse(await fetchResult(acfunApis.videoInfo + this.acid));
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

    /**
     * Json2Ass弹幕处理核心逻辑
     * @param {*} danmakuRes JSON格式弹幕
     * @param {*} danmakuLength 弹幕数据长度
     * @param {*} mode 模式（废弃，原本是有备用方案使用本地的window.player.danmaku的内容，但是常常获取不到）
     * @param {*} videoInfo 视频信息
     * @todo 多分P、弹幕重叠问题
     * @refer 处理逻辑参考：https://github.com/orzogc/acfundanmu
     * @refer UTF8 to UTF8-BOM参考：https://www.itranslater.com/qa/details/2583765774754120704
     */
    async assDanmakuProcess(danmakuRes, danmakuLength, mode, videoInfo) {
        let thisVideoQuality = document.querySelector(".control-btn.quality").children[0].innerText.toLowerCase();
        this.thisVideoQuality = thisVideoQuality;
        let fontsize = Number(danmakuRes[0].size) + 15;
        // let fontsize = 65;

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
        //内容整合
        let result = scriptInfo + sytles + events;

        this.devMode ? console.log("download danmaku") : ""
        //下载的时候，文件编码需要转化为UTF8-BOM
        var blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), result], { type: "text/plain;charset=utf-8" })
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

    timeProc(second, offset = 0) {
        var minute, hours;
        second = second + offset//6060
        minute = Math.floor(second / 60);//101
        hours = Math.floor(second / 60 / 60);//1

        minute = minute - hours * 60;
        second = second - hours * 60 * 60 - minute * 60;

        return hours + ":" + this.paddingNum(minute, 2) + ":" + this.paddingNum((second + offset).toFixed(2));
    }

    /**
     * 加0
     * @param {number} num 时间-小数
     * @param {*} len 预留位数
     */
    paddingNum = function (num, len) {
        if (num - Number(num).toFixed() != 0) {
            let remain = String(num - Number(num).toFixed()).split(".");
            remain = remain[1];
            remain = remain.split("");
            remain = remain[0] + remain[1];
            num = Number(num).toFixed();
            num = '' + num;
            while (num.length < len) num = '0' + num;
            return num + String("." + remain);
        } else {
            num = '' + num;
            while (num.length < len) num = '0' + num;
            return num;
        }
    }

    /**
     * 检查此条弹幕是否可能与上一条弹幕重叠
     * @param {Number} index 此条弹幕在弹幕运动信息列表中的索引
     * @description 弹幕不重叠——核心诉求
                    场景简单——弹幕匀速运动
                    性能较好——避免密集的实时弹幕位置计算

                    对于典型的弹幕场景，每个弹幕元素作水平直线运动，竖直方向（即纵向）的速度分量为0。这就意味着：弹幕元素彼此之间在竖直方向没有发生相对运动，因此弹幕在纵向的间距可通过对容器划分「轨道」进行隔离。

                    在上面的讨论中，通过引入轨道的概念，避免了竖直方向上&不同轨道之间的弹幕重叠干扰。
                    对于水平方向的分析，我们不妨先从简单的单个弹幕元素看起来。每个弹幕元素会经历这样三个阶段：出生在容器右侧——挂载进入到容器中——运动完全离开容器——移除;每一条默默划过的弹幕，实际上包含空间和时间两个维度的描述：空间维度：包括弹幕君的一些包括宽高、相对位置等几何属性；时间维度：startTime 通常用于记录用户生成该弹幕的时刻，这是一个相对开始播放的时间偏移量。该属性指导了弹幕元素的默认出现时机，以及在候选队列中的出场次序。duration，弹幕在容器中飘过的持续时间。由于弹幕场景中每个弹幕元素的水平位移量是固定的，因此 duration 也间接决定了弹幕的运动速度。
                    left和top指定了弹幕元素的出生点位；width和height标识了弹幕元素的高矮胖瘦；startTime和duration则分别决定了弹幕元素在候选列表中的顺序和展示时长。同一轨道中所有弹幕元素从右向左&同向匀速运动；在展示期间，轨道中所有弹幕元素均不发生重叠。
                    不难想到，「轨道中所有弹幕元素均不发生重叠」的问题可以归约为：「如何避免轨道中前后两个相邻弹幕弹幕元素之间的重叠」。
                    我们成功地将一系列弹幕间的运动关系，降维到了相邻弹幕元素的两两关系。
                    追及问题
                    判断两个弹幕在水平方向上是否发生重叠，实质就是就是对追及问题进行讨论了。基于红领巾时代掌握的知识，我们知道：对于两个对象的匀速直线运动，通过公式路程差 / 速度差 = 追及时间来判断对象是否会相遇（追及时间是否大于0）。这里的「相遇」，与弹幕场景中「重叠」的概念不谋而合。实际操作中，对于一个寻求某条合适轨道的弹幕元素，只需要将其与轨道中最后加入的弹幕元素（即轨道中最右侧的弹幕元素）进行比较，通过两者的追及问题计算，便可判断该轨道是否满足当前候选弹幕的插入条件。
                    经过上面checkChannel()的计算，如果返回true则表示当前轨道可以接受候选弹幕的挂载。
        @refer https://www.zhihu.com/question/370464345/answer/1021530502
        @todo 貌似我并没有理解好这个函数的原理，没有利用好，弹幕还是会有很多重叠的问题，看看以后还有机会完善吧。
     */
    danmakuChannelCheck(index) {
        const lastBullet = this.danmuMotionList[index - 1];
        const bullet = this.danmuMotionList[index];
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