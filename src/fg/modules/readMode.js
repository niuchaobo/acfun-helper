class Reader extends AcFunHelperFgFrame {
    constructor() {
        super();
        this.enableMode = 0;
        this.hasEnabledLightMode = false;
        this.curRotAngle = 0;
        this.devMode = false;
    }

    /**
     * 文章区漫画模式图片拖动支持
     * @param rotateSup 启用旋转支持
     * @refer https://www.acfun.cn/a/ac17306571
     * @author 奋不顾身 - https://www.acfun.cn/u/684816
     */
    picDrag(rotateSup) {
        //文章区漫画模式支持拖动
        var mangaNode = document.querySelector('#area-window');
        var mangaOptions = { attributes: false, childList: true, subtree: false, attributeOldValue: false };

        //监听是否点击图片进入了漫画模式
        var mangaObserver = new MutationObserver(() => {
            if (document.querySelector('#box-image-manga')) {
                document.querySelector("#header").style.display = "none";
                this.drag();
                rotateSup && this.picRotate();
            } else {
                document.querySelector("#header").style.display = "block";
            }
        });
        mangaObserver.observe(mangaNode, mangaOptions);
    }

    /**
     * 文章区漫画模式图片拖动支持 - 响应函数
     */
    drag() {
        var isDown = false;
        //弹出左下角通知。
        LeftBottomNotif(" √ 您现在也可以使用鼠标拖动图片了。", "banana");

        var dv = document.querySelector('#box-image-manga');
        var x = 0;
        var y = 0;
        var l = 0;
        var t = 0;
        //鼠标按下事件
        dv.onmousedown = function (e) {
            e.preventDefault();
            //获取x坐标和y坐标
            x = e.clientX;
            y = e.clientY;
            //获取左部和顶部的偏移量
            l = dv.offsetLeft;
            t = dv.offsetTop;
            //开关打开
            isDown = true;
            //设置样式
            dv.style.cursor = 'move';
        }
        //鼠标移动
        window.onmousemove = function (e) {
            if (isDown == false) {
                return;
            }
            //获取x和y
            var nx = e.clientX;
            var ny = e.clientY;
            //计算移动后的左偏移量和顶部的偏移量
            var nl = nx - (x - l);
            var nt = ny - (y - t);

            dv.style.left = nl + 'px';
            dv.style.top = nt + 'px';
        }
        //鼠标抬起事件
        window.onmouseup = function () {
            // document.querySelector("#header").style.display = "block";
            //开关关闭
            isDown = false;
            dv.style.cursor = 'default';
        }
    }

    /**
     * 文章区漫画模式图片旋转支持
     */
    picRotate() {
        addElement({ tag: "a", id: "btn-feedback-manga", classes: "btn primary", thisHTML: `<i class="icon icon-arrow-round-right"></i>旋转45°`, target: document.querySelector("#area-tool-manga"), createMode: "headAppnd" })
        document.querySelector("#btn-feedback-manga").addEventListener('click', () => {
            this.curRotAngle += 45;
            document.querySelector("#box-image-manga > img").style.transform = `rotate(${(this.curRotAngle) % 360}deg)`
        });
    }

}