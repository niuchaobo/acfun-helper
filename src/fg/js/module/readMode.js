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
                line-height: 30px;
            }
            #article-up > div.article-content > div > div{
            /* #article-content .article-content p > div{ */
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

    complexReadModeMain(){
        
    }
}