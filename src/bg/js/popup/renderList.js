var pushListData = {
  index: 1, // 推送当前页码
  innerText: null,
  busy: false, // 当前忙
  firstLoad: true, // 第一次加载推送列表
  arriveEnd: false, // 到达终点
};
export async function renderPushInnerHtml() {
  pushListData.busy = true;
  if (pushListData.index == 1) {
    // chrome.storage.local.get(["AcpushList1"], function (data) {
    //   $("#pop-push").append(data.AcpushList1);
    // });
    try {
      var p1data = await db_getPushListHtml();
    } catch (error) {
      var p1data = [];
    }
    if(p1data.length!=0){
      pushListData.index++;
      $("#pop-push").append(p1data[0].content);
    }
  }
  fetch(
    "https://www.acfun.cn/rest/pc-direct/feed/followFeed?isGroup=0&gid=-1&count=30&pcursor=" +
      pushListData.index
  )
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      let rawdata = JSON.parse(res);
      if (rawdata.feedList.length === 0) {
        pushListData.arriveEnd = true;
        $("#pop-push").append(
          '<p class="push_end" style="text-align: center;margin: 5px 5px 5px 5px;">没有更多数据了</p>'
        );
        return;
      }
      pushListData.innerText = "";
      for (let i = 0; i < rawdata.feedList.length; i++) {
        let data = rawdata.feedList[i];
        let dougaType = data.isArticle?"article":"video";
        let xmlData = '<div class="inner '+dougaType+'" id="';
        xmlData +=
          data.aid +
          '" data-type="'+data.isArticle+'">' +
          '<div class="l"><a target="_blank" href="'; //ctrl加左键打开页面后 仍保留在当前页面(但插件页面仍然消失)
        xmlData += 'https://www.acfun.cn' + data.url + '"';
        xmlData += ' class="thumb thumb-preview"><img class="lazyload preview" data-aid="';
        xmlData +=
          data.aid +
          '" src="' +'./images/prpr.jpg'+'" data-src="'+data.titleImg + '" style="width:100%"> <div class="cover"></div> </a> </div> <div class="r"> <a data-aid="' +data.aid +' "target="_blank" href="' +"https://www.acfun.cn" +
          data.url +
          '" class="title">';
        xmlData +=
          data.title +
          '</a> </p> <div class="info"><a target="_blank" data-uid="';
        xmlData +=
          data.aid +
          '" href="https://www.acfun.cn/u/' +
          data.userId +
          '" class="name"> ';
        xmlData +=
          data.username +
          ' </a><span class="time">' +
          getTimeSinceNow(data.releaseDate,true,false) +
          "发布</span> </div> </div> </div> ";
        pushListData.innerText += xmlData;
      }
      $("#pop-push").append(pushListData.innerText);
      pushListData.index++
      setTimeout(() => {
        pushListData.busy = false;
      }, 0);
      if (pushListData.firstLoad) {
        setTimeout(() => {
          $(window).bind("scroll", (e) => {
            if (pushListData.busy || pushListData.arriveEnd) {
              return;
            }
            pushListData.firstLoad = false;
            let scrollTop = $(window).scrollTop();
            if (scrollTop + 10 > $(document).height() - $(window).height()) {
              pushListData.busy = false;
              renderPushInnerHtml();
            }
          });
        }, 0);
      }
      $("img.lazyload").lazyload({ threshold : 0.2 });
    });
}

export  function renderLives() {
    chrome.storage.local.get(["broadcastingUIDlist"], function (data) {
      let No_data = "";
      let is_blank = true;
      let list_num = 0;
      for (let item in data.broadcastingUIDlist) {
        list_num++;
        data.broadcastingUIDlist[item] ? (is_blank = false) : "";
      }
      No_data =
        list_num === 0
          ? '<a href = "options.html" target = "_blank" style="color:black"> <center style="padding:5px">前往助手添加你的第一个关注吧</center></a>'
          : '<a href = "https://live.acfun.cn/" target = "_blank" style="color:#aaa"> <center style="padding:5px">主播正在路上,去直播首页逛逛吧</center></a>';
      is_blank ? $("#pop-push-lives").append(No_data) : "";
      for (let i in data.broadcastingUIDlist) {
        if (data.broadcastingUIDlist[i] == true) {
          fetch("https://live.acfun.cn/api/live/info?authorId=" + i)
            .then((res) => {
              return res.text();
            })
            .then((res) => {
              let live_Data = "";
              let livedata = JSON.parse(res).liveInfo;
              let livexmlData = '<div class="inner" id="';
              livexmlData +=
                livedata.authorId +
                '">' +
                '<div class="l"><a target="_blank" href="';
              livexmlData +=
                "https://live.acfun.cn/live/" + livedata.authorId + '"';
              livexmlData += ' class="thumb thumb-preview"><img data-aid="';
              livexmlData +=
                livedata.authorId +
                '" src="' +
                livedata.coverUrls[0] +
                '" class="preview"> <div class="cover"></div> </a> </div> <div class="r"> <a data-aid="' +
                livedata.authorId +
                ' "target="_blank" href="' +
                "https://live.acfun.cn/live/" +
                livedata.authorId +
                '" class="title">';
              livexmlData +=
                livedata.title +
                '</a> </p> <div class="info"><a target="_blank" data-uid="';
              livexmlData +=
                livedata.authorId +
                '" href="https://www.acfun.cn/u/' +
                livedata.authorId +
                '" class="name">';
              livexmlData += livedata.user.name + " </a></div> </div> </div> ";
              live_Data += livexmlData;
              $("#pop-push-lives").append(live_Data);
            });
        }
      }
    });
    chrome.storage.local.get(["broadcastingUIDlistFollowing"], function (data) {
      let x = data.broadcastingUIDlistFollowing;
      let y =Object.keys(data.broadcastingUIDlistFollowing);
      for(let i=0;i<=y.length-1;i++){
        if(x[y[i]]){
          fetch("https://live.acfun.cn/api/live/info?authorId="+y[i])
          .then((res)=>{return res.text()})
          .then((res)=>{
            let live_Data = "";
            let livedata = JSON.parse(res).liveInfo;
            let livexmlData = '<div class="inner" id="';
            livexmlData +=
              livedata.authorId +
              '">' +
              '<div class="l"><a target="_blank" href="';
            livexmlData +=
              "https://live.acfun.cn/live/" + livedata.authorId + '"';
            livexmlData += ' class="thumb thumb-preview"><img data-aid="';
            livexmlData +=
              livedata.authorId +
              '" src="' +
              livedata.coverUrls[0] +
              '" class="preview"> <div class="cover"></div> </a> </div> <div class="r"> <a data-aid="' +
              livedata.authorId +
              ' "target="_blank" href="' +
              "https://live.acfun.cn/live/" +
              livedata.authorId +
              '" class="title">';
            livexmlData +=
              livedata.title +
              '</a> </p> <div class="info"><a target="_blank" data-uid="';
            livexmlData +=
              livedata.authorId +
              '" href="https://www.acfun.cn/u/' +
              livedata.authorId +
              '" class="name">';
            livexmlData += livedata.user.name + " </a></div> </div> </div> ";
            live_Data += livexmlData;
            $("#pop-push-lives2").append(live_Data);
          })
        }
      }
    })
  }

export async function renderLiveWatchTimeLst(){
  let x = await getStorage("LiveWatchTimeRec_popup");
  if(!x.LiveWatchTimeRec_popup){return}
  chrome.runtime.sendMessage({action:"updateLiveWatchTimeListItem",params:{responseRequire:true,asyncWarp:true}},function(resp0){
    if(resp0.data==true){
      chrome.runtime.sendMessage({action:"getLiveWatchTimeList",params:{responseRequire:true,asyncWarp:false}},function(resp){
        var raw_data = "";
        let lwList = Object.keys(resp.data)
        for(let i in lwList){
          var raw_data =raw_data+ `
            <tr>
                <td><a class="liveWatchListItem" data-key="${[lwList[i]]}" title="切换到标签页"  href="${resp.data[lwList[i]].url}">[切换]</a> ${resp.data[lwList[i]].title}</td>
                <td>${getTimeSinceNow(resp.data[lwList[i]].startTime,true,true,'h')}</td>
            </tr>
          `;
        }
        $("#livePageWatchTimeRecList").append(raw_data);
      })    
    }
  })
}
