/**
 * 文章区阅读模式
 * @description 假如做直接操作原结构的方法够难的话，那就到时候做一个直接用新的结构去覆盖在原文章结构的上面算了，而且容易调整一点，这样甚至可以考虑动态地在助手前台页面去调整字号啊或者字距行距等属性，这种方法更加灵活一点，但是感觉一个人做挺难实现的
 * @todo 超过文章的主题部分之外就自动退出阅读模式，或者还可以进入文章部分就进入阅读模式
 * @todo 我觉得在此之前，还需要优化一下助手按钮的样式，光一个矩形还是太粗糙了。
 */
class Reader {
    constructor() {
        this.enableMode = 0;
        this.hasEnabledLightMode = false;
        this.curRotAngle = 0;
    }

    lightReadMode(sw = true) {
        let thisStyle = `
            #header , div.content>div.fr , div.art-title-census , div.comment-area , div#pagelet_footer , section#bd_ad , div#toolbar , div.action-up , div.sharecount{
                display: none !important;
            }
            #main{
                /* background: #c9c9c9; */
                /* background: url(http://www.pptbz.com/d/file/p/201708/a1d07b6201af8f574b6539cb724bbc16.png); */
                background-color: #F7F7F7 !important;
                background-size: cover;
            }
            div.art-title-head{
                border-bottom: 0px solid #eee;
            }
            div.article-content{
                line-height: 30px !important;
            }
            /* #article-up > div.article-content{ */
            #article-content .article-content p,#article-up > div.article-content > div > div{
                justify-content: center;
                transition: all 1s cubic-bezier(.25,1,.39,0.89) .13s;
                font-size: 18px !important;
                color: #000;
            }
        `
        if (!this.hasEnabledLightMode) {
            createElementStyle(thisStyle, document.head, "readMode");
            this.hasEnabledLightMode = true;
        }
        if (sw && this.hasEnabledLightMode == true) {
            document.querySelector("#readMode").disabled = false;
        } else {
            document.querySelector("#readMode").disabled = true;
        }

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
            }else{
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
            document.querySelector("#header").style.display = "block";
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