export async function getUid() {
    let Uid = await getStorage('LocalUserId');
    if (Uid != 0) {
        return Uid.LocalUserId
    } else {
        throw new UserException("Unexpected Uid,Please Navigate to www.acfun.cn First");
    }
}

export async function getResult(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => { return res.text(); })
            .then((res) => {
                let x = res;
                resolve(x);
            })
    });
}

export async function getFollowingNum() {
    return new Promise((resolve, reject) => {
        fetch(`https://www.acfun.cn/rest/pc-direct/user/personalInfo?`).then((res) => { return res.text() })
            .then((res) => {
                let x = JSON.parse(res);
                let followingNum = Number(x.info.following);
                resolve(followingNum)
            });
    });
}

export async function computePageNum() {
    let totalNum = await getFollowingNum();//总数
    let remainNum = totalNum % 100; //剩余
    let comple = totalNum - remainNum;//整
    let multip = (comple / 100) + 1 //页数
    return multip
}

/**
 * 在targetElem中将src所在的markdown文档渲染
 * @param {string} src 
 * @param {HTMLElement} targetElem 
 */
export async function renderMarkdownDoc(src = "", targetElem) {
    var url = src;
    var r = new XMLHttpRequest();
    r.open('get', url);
    r.send();
    r.onload = function () {
        if (r.status == 200) {
            HTMLElement.prototype.htmlContent = function (html) {
                var dom = new DOMParser().parseFromString('<template>' + html + '</template>', 'text/html').head;
                this.appendChild(dom.firstElementChild.content);
            }
            targetElem.htmlContent(marked(r.responseText));
        }
    }
}

export const infoPages = {
    privacy: "隐私协议",
    userAgreement: "用户协议",
    updateLog: "更新日志",
}

export function closeMe() {
    chrome.tabs.getCurrent(e => {
        chrome.tabs.remove(e.id);
    })
}

export class ParticlesAnimation {
    static start(canvasElem, maxRadiusNum) {
        var canvas = canvasElem ?? document.querySelector("#canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var ctx = canvas.getContext("2d");

        /**
         * 屏幕鼠标坐标
         * @type {Object}
         */
        var mouse = {
            x: undefined,
            y: undefined
        }

        /**
         * @param 鼠标移动事件，回调函数，赋值给鼠标坐标}
         * @return {[type]}
         */
        window.addEventListener("mousemove", function (event) {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        /**
         * @param 重新设置窗口大小，使canvas宽高自适应屏幕}
         * @return {[type]}
         */
        window.addEventListener("resize", function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            //初始化canvas
            init();
        })
        //绘制圆的最大半径
        var maxRadius = maxRadiusNum ?? 40;
        // var minRadius = 2;

        //圆的颜色数组
        var colorArray = [
            '#58D68D',
            '#E67F22',
            '#3598DB',
            '#E84C3D',
            '#9A59B5',
            '#27AE61',
            '#D25400',
            '#BEC3C7',
            '#297FB8'
        ]
        /**
         * @param x圆中心的x坐标}
         * @param y圆中心的y坐标}
         * @param dx圆运动的x偏移量}
         * @param dy圆运动的y偏移量}
         * @param radius圆的半径}
         * minRadius圆的最小半径
         * bg圆的背景颜色
         * draw绘制函数
         * update圆运动偏移
         */
        class Circle {
            constructor(x, y, dx, dy, radius) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.radius = radius;
                this.minRadius = radius;
                this.bg = colorArray[Math.floor(Math.random() * colorArray.length)];

                this.draw = function () {
                    ctx.beginPath();
                    ctx.strokeStyle = "#777";
                    ctx.fillStyle = this.bg;
                    ctx.arc(this.x, this.y, this.radius, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
                    // ctx.stroke();
                    ctx.fill();
                };
                this.update = function () {
                    //圆触碰边界时反弹，偏移值为负
                    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                        this.dx = -this.dx;
                    }
                    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                        this.dy = -this.dy;
                    }
                    //刷新绘制时圆的偏移运动
                    this.x += this.dx;
                    this.y += this.dy;
                    //鼠标半径50像素范围内的圆，它们的半径逐步增加到最大值
                    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                        if (this.radius < maxRadius) {
                            this.radius += 1;
                        }
                        //其他的所有圆半径减小到最小值
                    } else if (this.radius > this.minRadius) {
                        this.radius -= 1;
                    }
                    //根据更新的值进行绘制
                    this.draw();

                };
            }
        }

        //圆的对象数组
        var circleArray = [];

        /**
         * 初始化函数，制造800个随机坐标、偏移速度和半径的圆，加入到对象数组
         * @return {[type]}
         */
        function init() {
            circleArray = []
            for (var i = 0; i < 40; i++) {
                var x = Math.random() * window.innerWidth;
                var y = Math.random() * window.innerHeight;
                var dx = (Math.random() - 0.5) * 2;
                var dy = (Math.random() - 0.5) * 2;
                var radius = Math.random() * 3 + 1;
                circleArray.push(new Circle(x, y, dx, dy, radius));
            }
        }

        /**
         * 动画函数
         * @return {[type]}
         */
        function animate() {
            //更新前清除画布
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            requestAnimationFrame(animate);
            //每个圆都调用update()方法
            for (var i = 0; i < circleArray.length; i++) {
                circleArray[i].update();
            }
        }

        init();
        animate();
    }
}

export function getRelatedTopic(name) {
    return new Promise((resolve) => {
        let queryText = encodeURI(`Acfun${name} 话题,快来参与`);
        MessageSwitch.sendMessage('fg', { target: "BkFetch", InvkSetting: { responseRequire: true, asyncWarp: true, type: "function" }, params: { url: `https://www.baidu.com/s?wd=${queryText}&pn=0&rn=2&tn=json` } }, function (resp) {
            /**
             * @type {{feed:{category:{label:string,value:string},entry:[{abs:string,pn:number,relate:number,time:number,title:string,url:string,urlEnc:string},],updated:string,resultnum:number}}}
             */
            let x = JSON.parse(resp);
            let result = {};
            x.feed.entry.forEach(element => {
                let isTopic = REG.topicCircle.test(element.url);
                let isMoment = REG.momentContent.test(element.url);
                if (isTopic || isMoment) {
                    result[element.pn] = element;
                }
            });
            resolve(result);
        })
    })
}

export async function batchOprtSwitches(targets) {
    for (let i = 0; i < targets.length; i++) {
        let element = targets[i].key;
        if (!element) {
            continue;
        }
        if (element.includes("-")) {
            let newE = element.split("-");
            const sw = await ExtOptions.getValue(newE[0]);
            document.querySelector("input#" + element).checked = sw[newE[1]];
        } else {
            const sw = await ExtOptions.getValue(element);
            document.querySelector("input#" + element).checked = sw;
        }
    }
}

export async function panelSwitchesHandler(e) {
    /**@type {HTMLElement} */
    let target = e?.target;
    if (!target) {
        return;
    }
    if (target.id.includes("-")) {
        let id = target.id.split("-");
        let raw = await ExtOptions.getValue(id[0]);
        raw[id[1]] = !raw[id[1]];
        ExtOptions.setValue(id[0], raw);
        return
    }
    let raw = await ExtOptions.getValue(target.id)
    ExtOptions.setValue(target.id, !raw);
}

export async function panelSelectsHandler(name, list, devMode) {
    const conf = await ExtOptions.getValue(name);
    const index = list.indexOf(conf);
    devMode ? (console.log(name, list, conf, index)) : ""
    if (index == -1) {
        return;
    }
    document.querySelector("#" + name).parentElement.children[1].children[1].children[index].click();
    document.querySelector("#" + name).addEventListener("close.mdui.select", (e) => {
        ExtOptions.setValue(name, e.detail.inst.value);
    });
}

export const saveConfromIndexDic = (list) => {
    let result = []
    for (let i in list) {
        result.push(list[i])
    }
    ExtOptions.setValue("to_special_items", result);
}