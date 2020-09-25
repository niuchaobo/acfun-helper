/**
 * 评论区增强 1.用户标记 2.up主评论显示【up主】标记 3.在评论区添加快速跳转至视频对应时间的链接
 */
class CommentEnhance{
    constructor() {
        this.reg_for_time=new RegExp('[0-9]{1,3}[:分][0-9]{1,2}秒?'); 
        this.reg_for_time3part=new RegExp('[0-9]{1,3}[:小时][0-9]{1,3}[:分][0-9]{1,2}秒?'); 
        this.reg_for_part = new RegExp('^p[0-9]{1,2}|^[0-9]{1,2}p','i')
        this.easy_time = new RegExp('[0-9]{1,3}分|[0-9]{1,2}秒?')
    }

    //从个人中心评论跳转到对应的楼层,不完善(折叠中和非第一页的无法跳转)
    async jumpToComment(href){
        let msg_comment = REG.msg_comment;
        let res = msg_comment.exec(href);
        if(res!=null && res!=undefined && res.length==4){
            let cid = res[3];
            let retry = 10;
            while (retry>0){
                let node = $('div[data-commentid='+cid+']').eq(0);
                let node_offset = node.offset();
                if(node_offset!=undefined && node_offset!=null){
                    let top = Number(node_offset.top)-Number(node.height())-150;
                    $("html, body").animate({
                        scrollTop: top
                    }, {
                        duration: 500,
                        easing: "swing"
                    });
                    break;
                }else{
                    await mysleep(1000);
                }
                retry--;
            }
        }
    }

    //-------------------------评论区标记功能---------------------------------

    //渲染扫描到的用户tag信息
    renderScan(){
        var timer = setInterval(function () {
            let nodes = $('.area-comment-title a.name');
            let loading = $('.ac-comment-loading').html();
            if(nodes.length>0 && loading==''){
                nodes.each(async function () {
                    let exists = $(this).parent().find('.pos.simple');
                    if(exists.length==0){
                        let userId = $(this).data('userid');
                        let userName = $(this).text();
                        let tagInfo = await getStorage("AC_"+userId).then(res=>{return res["AC_"+userId]});
                        if(tagInfo!=undefined &&tagInfo.tag!='' && tagInfo.tag!=undefined){
                            if(userName!=tagInfo.name){
                                $(this).after('<span title="'+tagInfo.name+'" class="pos simple">'+tagInfo.tag+'</span>');
                            }else{
                                $(this).after('<span class="pos simple">'+tagInfo.tag+'</span>');
                            }
                        }
                    }
                });
                clearInterval(timer);
            }
        },1000);
    }

    //渲染标记按钮
    renderMark(){
        var timer = setInterval(function () {
            let nodes = $('.area-comm-more');
            let loading = $('.ac-comment-loading').html();
            if(nodes.length>0 && loading == ''){
                nodes.each(function(){
                    let text = $(this).text();
                    if(text.indexOf('标记')==-1){
                        $(this).addClass('comment-mark-parent');
                        $(this).append('<span class="comment-mark">标记</span>');
                        $(this).append('<span class="comment-cap">保存为HTML</span>');
                        $(this).on('click','.comment-cap',function () {
                            let data = `<style>
                            div.area-comment-left > a > img.avatar-bg-2018062102{
                                position: absolute;top: 10px;left: 5px;background-color: transparent;border: none;
                            }
                            div.area-comment-left > a > img.avatar{
                                width: 50px;height: 50px;margin: 0;padding: 0;border: 1px solid #ffffff;box-shadow: 0 0 0 rgba(0, 0, 0, 0);border-radius: 50%;
                            }
                            .ac-comment-list .area-comment-title .name{
                                margin-right: 6px;font-size: 12px;
                            }
                            .area-comm-more,.area-comment-reply,.time_day,.time_times,.acfunAdmin{display: none !important;}
                            .area-comment-sec{
                                margin-left: 100px;margin-right: 100px;
                                background-color: #f7f7f7;
                            }
                            .area-comment-top{
                                margin-left: 10px;
                            }
                            .area-comment-des{
                                margin-left: 50px;
                            }
                            </style><body style="margin: 30px 20px 20px 20px;">
                            `
                            data+=$(this).parent().parent().parent().parent().parent()[0].innerHTML;
                            var blob = new Blob([data], { type: 'application/octet-stream' });
                            var url = window.URL.createObjectURL(blob);
                            var saveas = document.createElement('a');
                            saveas.href = url;
                            saveas.style.display = 'none';
                            document.body.appendChild(saveas);
                            saveas.download = `${window.location.href}.html`;
                            saveas.click();
                            setTimeout(function () { saveas.parentNode.removeChild(saveas); }, 0)
                            document.addEventListener('unload', function(){window.URL.revokeObjectURL(url);});
                        });
                        $(this).on('click','.comment-mark',function () {
                            let userNode = $(this).parent().parent().parent().find('.name').eq(0);
                            let username = userNode.text();
                            let userId = userNode.data("userid");
                            let markCommentId = $(this).parent().parent().parent().parent().parent().data("commentid");
                            let userComment = $(this).parent().parent().parent().find('.area-comment-des-content')[0].innerHTML;
                            let dougaAddr = window.location.href;
                            let title = '为『'+username+'』添加标记，最多10个字符';
                            let tag=prompt(title,"");
                            let title2 = '为『'+username+'』添加更多描述';
                            let describe=prompt(title2,"");
                            let tag_trim = tag.trim();
                            if(tag_trim!='' && tag_trim!=null && tag_trim.length<=10){
                                let key = "AC_"+userId;
                                let value = {name:username,tag:tag,refer:dougaAddr,commentId:markCommentId,evidence:userComment,desc:describe?describe:""};
                                chrome.storage.local.set({[key]:value}, function () {
                                    userNode.parent().find('.pos.simple').remove();
                                    userNode.after('<span class="pos simple">'+tag+'</span>');
                                });
                            }
                        });
                    }
                });
                clearInterval(timer);
            }
        },1000);
    }

    //评论区显示up主名字
    renderScanForUp(){
        var timer = setInterval(function () {
            var url = window.location.toString();
            let avr = new RegExp("/v/");
            let aar = new RegExp("/a/");
            let av = avr.exec(url);
            let aa=aar.exec(url);
            if(av!=null && av!=undefined && av.length>=1){
                var up=$('a.up-name').text();
            }else if(aa!=null && aa!=undefined && aa.length>=1){
                var up=$('div.up-name a.upname').text();
            }
            let nodes = $('.area-comment-title a.name');
            let loading = $('.ac-comment-loading').html();
            if(nodes.length>0 && loading==''){
                nodes.each(async function () {
                    let exists = $(this).parent().find('.pos.up');
                    if(exists.length==0){
                        let userName = $(this).text();
                        if(userName==up){
                            $(this).after('<span class="pos up">UP主</span>');
                        }
                    }
                });
                clearInterval(timer);
            }
        },1020);
    }

    renderSubScan(rootCommentId){
        var timer = setInterval(function () {
            let nodes = $("div[data-commentid='"+rootCommentId+"']").find('a.name');
            if(nodes.length>0){
                nodes.each(async function () {
                    let exists = $(this).parent().find('.pos.simple');
                    if(exists.length==0){
                        let userId = $(this).data('userid');
                        let userName = $(this).text();
                        let tagInfo = await getStorage("AC_"+userId).then(res=>{return res["AC_"+userId]});
                        if(tagInfo!=undefined &&tagInfo.tag!='' && tagInfo.tag!=undefined){
                            if(userName!=tagInfo.name){
                                $(this).after('<span title="'+tagInfo.name+'" class="pos simple">'+tagInfo.tag+'</span>');
                            }else{
                                $(this).after('<span class="pos simple">'+tagInfo.tag+'</span>');
                            }
                        }
                    }
                });
                clearInterval(timer);
            }
        },1000);
    }

    //评论区(折叠或翻页中)显示up主名字
    renderSubScanForUp(rootCommentId){
        var timer = setInterval(function () {
            let url = window.location.toString();
            let avr = new RegExp("/v/");
            let aar = new RegExp("/a/");
            let av = avr.exec(url);
            let aa=aar.exec(url);
            let up = '';
            if(av!=null && av!=undefined && av.length>=1){
                up=$('a.up-name').text();
            }else if(aa!=null && aa!=undefined && aa.length>=1){
                up=$('div.up-name a.upname').text();
            }
            let nodes = $("div[data-commentid='"+rootCommentId+"']").find('a.name');
            if(nodes.length>0){
                nodes.each(function () {
                    let exists = $(this).parent().find('.pos.up');
                    if(exists.length==0){
                        let userName = $(this).text();
                        if(userName==up){
                            $(this).after('<span class="pos up">UP主</span>');
                        }
                    }
                });
                clearInterval(timer);
            }
        },1020);
    }

    renderSubMark(rootCommentId){
        var timer = setInterval(function () {
            let nodes = $("div[data-commentid='"+rootCommentId+"']").find('.area-comm-more');
            if(nodes.length>0){

                nodes.each(function () {
                    let text = $(this).text();
                    if(text.indexOf('标记')==-1){
                        $(this).addClass('comment-mark-parent');
                        $(this).append('<span class="comment-mark">标记</span>');
                        $(this).on('click','.comment-mark',function () {
                            let userNode = $(this).parent().parent().parent().find('.name').eq(0);
                            let username = userNode.text();
                            let userId = userNode.data("userid");
                            let title = '为『'+username+'』添加标记，最多10个字符';
                            let tag=prompt(title,"");
                            let tag_trim = tag.trim();
                            if(tag_trim!='' && tag_trim!=null && tag_trim.length<=10){
                                let key = "AC_"+userId;
                                let value = {name:username,tag:tag};
                                chrome.storage.local.set({[key]:value}, function () {
                                    userNode.parent().find('.pos.simple').remove();
                                    userNode.after('<span class="pos simple">'+tag+'</span>');

                                });
                            }
                        });
                    }
                });
                clearInterval(timer);
            }
        },1000);
    }

    clearMark(){
        //解绑事件
        $('.area-comm-more').off('click','.comment-mark');
        $(".comment-mark").remove();
        $(".area-comm-more").removeClass('comment-mark-parent');
    }

    clearScan(){
        $(".area-comment-title .pos.simple").remove();
    }

    //稿件跳转弹窗
    uddPopUp(){
        this.addUddPopUpStyle()
        getAsyncDom('a.ubb-ac',()=>{
            let ubbBox = $('a.ubb-ac');
            ubbBox.append(`
                    <div class=udd-box>
                        <img class = udd-img>
                        <div class = udd-text>
                            <div class = udd-title></div>
                            <div class = udd-user></div>
                        </div>
                    </div>
                `)
            ubbBox.mouseenter(function(){
                let id = removeAPrefix(ubbBox)
                let _this = this.children[0];
                let imgCover = _this.children[0];
                let title =_this.children[1].children[0];
                let name = _this.children[1].children[1];
                $(_this).css('opacity','1')
                if($(title).text() && $(name).text()){
                    return
                }
                $(title).text('正在获取稿件信息')
                $(name).text('....')
                fetch(`https://mini.pocketword.cn/api/acfun/info?dougaId=${id}`).then(res=>{
                    if(res.status==503){
                        alert("请不要频繁请求。")
                    }
                    return res.text()
                }).then(res=>{
                    let x = JSON.parse(res);
                    if(x.result!=0){alert("无效的视频稿件AcID。");return}
                    $(imgCover).attr('src',x.coverUrl)
                    $(title).text(x.title)
                    $(name).text( 'UP: '+ x.user.name)
                })
                
            })
            ubbBox.mouseleave(function(){
                $(this.children).css('opacity','0')
            })
        })
    }

    addUddPopUpStyle(){
        let cssTest = `
        a.ubb-ac{
            position: relative;
            display: inline-block;
            vertical-align: text-top;
        }

        .udd-box{
            position: absolute;
            top: -50px;
            left: -135px;
            background: #eee;
            height: 36px;
            width: 310px;
            display: flex;
            padding: 4px 10px 4px 20px;
            color: rgb(214, 154, 204);
            border: 1px rgb(179, 179, 179);
            border-radius: 26px;
            font-size: 8px;
            transition-duration: 1s;
            opacity:0
        }
        .udd-img{
            width: 64px;
            height: 36px;
        }
        .udd-text{
            display: flex;
            flex-direction: column;
            flex: 3;
            width: 246px;
        }
        .udd-user{
            text-align: center;
            color: rgba(0, 0, 0, 0.58);
            height:16px
        }
        .udd-title{
            height: 16px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    `
        createElementStyle(cssTest)
    }

    // 在评论区添加快速跳转至视频对应时间的链接
    searchScanForPlayerTime(){
        var timer = setInterval( () => {
            let nodes = $('.area-comment-des-content');
            let loading = $('.ac-comment-loading').html();
            let reg_for_time=this.reg_for_time;
            let reg_for_3partime=this.reg_for_time3part;
            let reg_for_part = this.reg_for_part;
            let reg_for_mtline=new RegExp('<br>')
            if(nodes.length>0 && loading==''){
                nodes.each(async function () {
                        let comment_content = $(this)[0].innerText.toString();
                        let comment_html = $(this)[0].innerHTML.toString();
                        let if_matchTime=reg_for_time.exec(comment_content);
                        //let if_mtline=reg_for_mtline.exec(comment_html);  单行就跑多行方法的1遍
                        if(if_matchTime){
                            let a=comment_html.split('<br>')
                            let after_html_out='';
                            let after_html = '';
                            let partTarrgetNum = 0;
                            for(let i=0;i<=(a.length-1);i++){
                                let timeTarget = reg_for_time.exec(a[i]);
                                let timeTarget3p = reg_for_3partime.exec(a[i]);
                                let partTarrget = reg_for_part.exec(a[i]);
                                partTarrgetNum = 0
                                if(timeTarget3p){
                                    if (partTarrget){
                                        partTarrgetNum = partTarrget[0].replace(/[^1-9]/ig,"")
                                    }
                                    timeTarget3p ? timeTarget3p = timeTarget3p[0].replace(/分/,':').replace(/秒/,'') : ''
                                    after_html=after_html+`<a id='quickJump' onclick="quickJump('${timeTarget3p}',${partTarrgetNum && partTarrgetNum })">${partTarrget ? partTarrget[0] + ' ' : ' '} ${timeTarget3p}</a>`; 
                                }else if (timeTarget){
                                    if (partTarrget){
                                        partTarrgetNum = partTarrget[0].replace(/[^1-9]/ig,"")
                                    }
                                    timeTarget ? timeTarget = timeTarget[0].replace(/分/,':').replace(/秒/,'') : ''
                                    after_html=after_html+`<a id='quickJump' onclick="quickJump('${timeTarget}',${partTarrgetNum && partTarrgetNum })">${partTarrget ? partTarrget[0] + ' ' : ' '} ${timeTarget}</a>`; 
                                }
                                after_html=after_html+' '+a[i]+"<br>";
                            }
                            after_html_out=after_html_out+after_html;
                            $(this).html(after_html_out);
                        }
                    }
                );
                clearInterval(timer);
            }
        },1000);

    }

    immedComt(){
        let ConfKey = 'yeKfnoCtnemmoCeQ'
        var curKeyName = ConfKey.split("").reverse().join("");
        console.log(curKeyName)
        chrome.storage.local.get([curKeyName], function (data) {
            for(let z in data){
                console.log(data[z]);
                var P0st = data[z];
            };
            let url = window.location.toString();
            let videoPage = new RegExp("http(s)?://www.acfun.cn/v/ac(.*)");
            let acVid = videoPage.exec(url)[2];
            let commt = encodeURI(`sourceId=${acVid}&sourceType=3&content=${P0st}&replyToCommentId=`)
            fetch('https://www.acfun.cn/rest/pc-direct/comment/add',{method:"POST",headers: {'Content-Type': 'application/x-www-form-urlencoded','Accept':"accept: application/json, text/plain, */*"},credentials: 'include',body:commt})
            .then((res)=>{return res.text();})
            .then((res)=>{
            });
            // console.log(`sourceId=${acVid}&sourceType=3&content=${P0st}&replyToCommentId=`)
            // console.log(commt);
        });
    }

    //选中时间 按shift+A 跳转 开关依赖评论区空降功能  TODO:与倍速快捷键一样都绑定到了document上 正则未做严格匹配(你甚至能让iphone8跳转到8s)
    easySearchScanForPlayerTime(settingKeyCode){ 
        document.onkeypress = (e)=>{
            if(e.shiftKey && e.keyCode === settingKeyCode[0] ){
                let txt = window.getSelection().toString().trim();
                let time = this.easy_time.exec(txt)[0];
                time ? document.getElementsByTagName("video")[0].currentTime = this.setVideoTime(time) : ''
            }
        }
    }
    
    setVideoTime(time){
        let str = time;
        let seconds = str.search("分") === -1 ?  str.split('秒')[0] : str.split('分')[0]*60
        // console.log(`[LOG]Frontend-CommentEnhance>easySearchScanForPlayerTime: 跳转到[${seconds}]秒！！ gogogo！`)
        return seconds;
    }

    commentLayoutSave(){

    }
}


