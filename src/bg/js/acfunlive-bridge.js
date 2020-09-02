fetch('http://localhost:51880/').catch(error => mdui.alert("连接acfunlive桌面程序失败。"))
liststreamer();
listrecord();
listdanmu();

function liststreamer(){
    fetch('http://localhost:51880/liststreamer').then((res)=>{return res.text()})
    .then((res)=>{
        let x = JSON.parse(res);
        try {
            var livenotifNum = x.length;
        } catch (error) {
            var livenotifNum = 0;
        }
        if(livenotifNum > 0){
            document.getElementById('livenotifSwitch').checked=true;
            for(let i=0;i<x.length;i++){
                console.log(x[i]);
                x[i].Notify?a='checked':a='';x[i].Record?b='checked':b='';x[i].Danmu?c='checked':c='';
                $('ul.livenotiflist').append(`<li class="mdui-list-item mdui-ripple" data-key=${x[i].UID} style="cursor:default"><i class="mdui-list-item-icon mdui-icon material-icons liveFloowingsItems" data-key=${x[i].UID} style="cursor:pointer">delete</i><a href="https://live.acfun.cn/live/${x[i].UID}" target="_blank"><i class="mdui-list-item-icon mdui-icon material-icons liveWatchOrig" data-key=${x[i].UID} style="cursor:pointer">desktop_windows</i></a><div class="mdui-list-item-content">Uid:${x[i].UID}   UserName:${x[i].Name} <br><label class="mdui-checkbox"><input type="checkbox" disabled ${a}/><i class="mdui-checkbox-icon"></i>提醒</label> <label class="mdui-checkbox"><input type="checkbox" disabled ${b}/><i class="mdui-checkbox-icon"></i>自动录像</label> <label class="mdui-checkbox"><input type="checkbox" disabled ${c}/><i class="mdui-checkbox-icon"></i>弹幕录制</label></div></li>`);
            }
        }else if(livenotifNum==null){
            document.getElementById('livenotifSwitch').checked=false;
        }
        $('.liveFloowingsItems').click(function () {
            let this_uid=$(this).data("key");
            $(this).parent().hide();
            fetch('http://localhost:51880/delnotify/'+this_uid).then((res)=>{return res.text()})
            .then((res)=>{
                mdui.snackbar({
                    message: `已移除 ${this_uid}`,
                });
            });
        });
    });
}

function listrecord(){
    fetch('http://localhost:51880/listrecord').then((res)=>{return res.text()})
    .then((res)=>{
        let x = JSON.parse(res);
        try {
            var livenotifNum = x.length;
        } catch (error) {
            var livenotifNum = 0;
        }
        if(livenotifNum > 0){
            document.getElementById('liverecSwitch').checked=true;
            for(let i=0;i<x.length;i++){
                console.log(x[i]);
                $('ul.liverecSwitch').append(`<li class="mdui-list-item mdui-ripple" data-key=${x[i].UID} style="cursor:default"><i class="mdui-list-item-icon mdui-icon material-icons liverecItems" data-key=${x[i].UID} style="cursor:pointer">delete</i><a href="https://live.acfun.cn/live/${x[i].UID}" target="_blank"></a><div class="mdui-list-item-content">Uid:${x[i].UID}   UserName:${x[i].Name}</div></li>`);
            }
        }else if(livenotifNum==null){
            document.getElementById('liverecSwitch').checked=false;
        }
        $('.liverecItems').click(function () {
            let this_uid=$(this).data("key");
            $(this).parent().hide();
            fetch('http://localhost:51880/stoprecord/'+this_uid).then((res)=>{return res.text()})
            .then((res)=>{
                mdui.snackbar({
                    message: `已移除 ${this_uid} 的录制任务`,
                });
            });
        });
    })
}

function listdanmu(){
    fetch('http://localhost:51880/listdanmu').then((res)=>{return res.text()})
    .then((res)=>{
        let x = JSON.parse(res);
        try {
            var livenotifNum = x.length;
        } catch (error) {
            var livenotifNum = 0;
        }
        if(livenotifNum > 0){
            document.getElementById('livedanmurecSwitch').checked=true;
            for(let i=0;i<x.length;i++){
                console.log(x[i]);
                $('ul.livedanmurecSwitch').append(`<li class="mdui-list-item mdui-ripple" data-key=${x[i].UID} style="cursor:default"><i class="mdui-list-item-icon mdui-icon material-icons liverecItems" data-key=${x[i].UID} style="cursor:pointer">delete</i><a href="https://live.acfun.cn/live/${x[i].UID}" target="_blank"></a><div class="mdui-list-item-content">Uid:${x[i].UID}   UserName:${x[i].Name}</div></li>`);
            }
        }else if(livenotifNum==null){
            document.getElementById('livedanmurecSwitch').checked=false;
        }
        $('.liverecItems').click(function () {
            let this_uid=$(this).data("key");
            $(this).parent().hide();
            fetch('http://localhost:51880/stopdanmu/'+this_uid).then((res)=>{return res.text()})
            .then((res)=>{
                mdui.snackbar({
                    message: `已移除 ${this_uid} 的录制任务`,
                });
                document.getElementById('livedanmurecSwitch').checked=false;
            });
        });
    })
}