export default function renderLives() {
    chrome.storage.local.get(["broadcastingUIDlist"], function (data) {
      console.log(data);
      let No_data = "";
      let is_blank = true;
      let list_num = 0;
      console.log(data.broadcastingUIDlist)
      for (let item in data.broadcastingUIDlist) {
        list_num++;
        data.broadcastingUIDlist[item] ? (is_blank = false) : "";
      }
      No_data =
        list_num === 0
          ? '<a href = "options.html" target = "_blank" style="color:black"> <center style="padding:5px">前往助手添加你的第一个关注吧</center></a>'
          : '<a href = "https://live.acfun.cn/" target = "_blank" style="color:black"> <center style="padding:5px">主播正在路上,去直播首页逛逛吧</center></a>';
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
  }