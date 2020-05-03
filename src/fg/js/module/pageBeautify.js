/**
 * 页面美化
 */

class PageBeautify{
    constructor() {
        this.personInfo = "https://www.acfun.cn/rest/pc-direct/user/personalInfo";

    }
//--------------------------------------------------导航--------------------------------------------------------------------
    navBeautify(){
        this.addRightNav();
        var length = $('.home-main-content>div').length;
        $(document).scroll(function(){
            for(let i =0;i<length;i++){
                let top = $('.home-main-content>div').eq(i).offset().top;//获取当前元素离顶部的距离
                let scrop = $(document).scrollTop();//获取页面滚动条离顶部的距离
                if(scrop>top){
                    $('.rightnav>div').eq(i).css({'background-color':'#fd4c5d',"color":'#fff'});
                    $('.rightnav>div').eq(i).siblings().css({'background-color':'',"color":''});
                }
            }
        })
    }

    addRightNav(){
        //右侧导航样式
        let style_link = document.createElement("link");
        style_link.href = chrome.extension.getURL("fg/css/home_nav.css");
        style_link.type="text/css";
        style_link.real="stylesheet";
        (document.head || document.documentElement).appendChild(style_link);



        $("#back-top").css({"font-size": "12px","background-color": "rgb(250, 249, 249)","line-height": "30px","border": "1px solid rgb(235, 233, 233)","color": "rgb(182, 170, 170)","height":"auto"});
        //右侧导航html
        let root = chrome.runtime.getURL('/');
        let fn = ()=>{
            return `<script charset="UTF-8" src="${root+'fg/js/nav.js'}"></script>`;
        }
        let content = `
                        ${fn()}
                        <div class="rightnav none">
                            <div onclick="scrollToTop(event);" data-id="pagelet_monkey_recommend">
                                推荐
                            </div>
                            <div onclick="scrollToTop(event);" data-id="pagelet_list_banana">
                                香蕉榜
                            </div>
                            <div onclick="scrollToTop(event);" data-id="pagelet_douga">
                                动画
                            </div>
                            <div onclick="scrollToTop(event);" data-id="pagelet_game">
                                游戏
                            </div>
                            <div onclick="scrollToTop(event);" data-id="pagelet_amusement">
                                娱乐
                            </div>
                            <div onclick="scrollToTop(event);" data-id="pagelet_bangumi_list">
                                番剧
                            </div>   
                            <div onclick="scrollToTop(event);" data-id="pagelet_life">
                                生活
                            </div>   
                            <div onclick="scrollToTop(event);" data-id="pagelet_tech">
                                科技
                            </div>  
                            <div onclick="scrollToTop(event);" data-id="pagelet_dance">
                                舞蹈
                            </div>
                            <div onclick="scrollToTop(event);" data-id="pagelet_music">
                                音乐
                            </div> 
                            <div onclick="scrollToTop(event);" data-id="pagelet_film">
                                影视
                            </div> 
                            <div onclick="scrollToTop(event);" data-id="pagelet_fishpond">
                                鱼塘
                            </div> 
                            <div onclick="scrollToTop(event);" data-id="pagelet_sport">
                                体育
                            </div>        
                            
                        </div>`;
        $("#back-top").prepend(content);
    }


    //-------------------------------------------------个人中心-----------------------------------------------------------------------

    async personBeautify(){
        fetch(this.personInfo)
            .then((res) => {
                return res.text();
            })
            .then((res) => {
                let a = JSON.parse(res);
                var url = window.location.toString();
                let member = new RegExp("https://www.acfun.cn/member/.?")
                let memberRes = member.exec(url);
                if(memberRes){
                    let node = $('#win-info-guide>div').find('a').eq(0);
                    if(node){
                        node.after('<p class="crx-member-p">UID: '+a.info.userId+'</p>');
                        node.after('<p class="crx-member-p">金香蕉: '+a.info.goldBanana+'</p>');
                        node.after('<p class="crx-member-p">香蕉: '+a.info.banana+'</p>');
                        node.after('<p class="crx-member-p">听众: '+a.info.followed+'</p>');
                        node.after('<p class="crx-member-p">注册时间: '+formatDate(new Date(a.info.registerTime))+'</p>');
                    }
                }else{
                    let node = $('#header-guide .guide-item-con').find('p').eq(0);
                    if(node){
                        node.after('<p class="crx-guid-p">UID: '+a.info.userId+'</p>');
                        node.after('<p class="crx-guid-p">金香蕉: '+a.info.goldBanana+'</p>');
                        node.after('<p class="crx-guid-p">香蕉: '+a.info.banana+'</p>');
                        node.after('<p class="crx-guid-p">听众: '+a.info.followed+'</p>');
                        node.after('<p class="crx-guid-p">注册时间: '+formatDate(new Date(a.info.registerTime))+'</p>');
                    }
                }
            });
    }


}


