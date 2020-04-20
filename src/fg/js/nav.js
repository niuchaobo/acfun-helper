function scrollToTop(event) {
    event.stopPropagation();
    let id = event.target.getAttribute("data-id");
    ScrollToControl(id);
}


function elementPosition(obj) {
    var curleft = 0,
        curtop = 0;
    if (obj.offsetParent) {
        curleft = obj.offsetLeft;
        curtop = obj.offsetTop;
        while (obj = obj.offsetParent) {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        }
    }
    return {
        x: curleft,
        y: curtop
    };
}


function ScrollToControl(id) {
    var elem = document.getElementById(id);
    //47为首页横向导航条的高度,40为每个分区title的高度
    var scrollPos = elementPosition(elem).y-47-40;
    console.log("y:"+scrollPos);
    scrollPos = scrollPos - document.documentElement.scrollTop;

    var remainder = scrollPos % 100;
    var step = 100;
    if(remainder<0){
        step = -100;
    }
    var repeatTimes = Math.abs((scrollPos - remainder) / 100);
    console.log("remainder:"+remainder+",repeatTimes:"+repeatTimes);
    ScrollSmoothly(scrollPos, repeatTimes,step);
    window.scrollBy(0, remainder);
}
var repeatCount = 0;
var cTimeout;

function ScrollSmoothly(scrollPos, repeatTimes,step) {
    if (repeatCount < repeatTimes) {
        window.scrollBy(0, step);
    } else {
        repeatCount = 0;
        clearTimeout(cTimeout);
        return;
    }
    repeatCount++;
    cTimeout = setTimeout("ScrollSmoothly('" + scrollPos + "','" + repeatTimes +  "','" + step +"')", 10);
    //cTimeout = setTimeout(ScrollSmoothly,10);
}

function onDomContentLoaded(){


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

document.addEventListener('DOMContentLoaded', onDomContentLoaded, false);
