async function renderList() {
    let playListObj_raw = await getStorage("MusicPlayList");
    let playListObj = playListObj_raw.MusicPlayList.List;
    // console.log(playListObj)
    let playList = Object.keys(playListObj);
    for (let i = 0; i < playList.length; i++) {
        let x = playListObj[playList[i]];
        let templ = `
        <div class="mdui-col-sm-6 mdui-col-md-4" data-key=${playList[i]} data-index=${i} style="padding-bottom:10px">
            <div class="mdui-card">
                <div class="mdui-card-header">
                    <img class="mdui-card-header-avatar lazyload"
                        src="./images/prpr.jpg" data-src="https://tx-free-imgs.acfun.cn/style/image/defaultAvatar.jpg?imageslim" />
                    <div class="mdui-card-header-title">${x.upName}</div>
                </div>
                <div class="mdui-card-media">
                    <img class="lazyload" src="./images/prpr.jpg" data-src="${x.coverCdnUrls}" />
                </div>
                <div class="mdui-card-content">${x.dougaName}</div>
                <div class="mdui-card-actions">
                    <button class="mdui-btn mdui-ripple itemPlay">播放</button>
                    <button class="mdui-btn mdui-ripple itemDelete">删除</button>
                </div>
            </div>
        </div>
        `
        $("#list").append(templ);
    }
    $(".itemDelete").click(async e => {
        let playListObj_raw = await getStorage("MusicPlayList");
        let playListObj = playListObj_raw.MusicPlayList.List;
        delete playListObj[e.target.parentNode.parentNode.parentNode.dataset.key];
        playListObj_raw.MusicPlayList.List = playListObj;
        chrome.storage.local.set({ "MusicPlayList": playListObj_raw.MusicPlayList });
        e.target.parentNode.parentNode.parentNode.remove();
    });
    $(".itemPlay").click(async e => {
        chrome.runtime.sendMessage({ action: "musicPlayerStart", params: { index: e.target.parentNode.parentNode.parentNode.dataset.index } }, function (response) { });
    });
    $(".purgeListAll").click(async e => {
        var this_flag = confirm("确认清除所有项目吗");
        if (this_flag) {
            let playListObj_raw = await getStorage("MusicPlayList");
            let playListObj = playListObj_raw.MusicPlayList.List;
            playListObj = {};
            playListObj_raw.MusicPlayList.List = playListObj;
            chrome.storage.local.set({ "MusicPlayList": playListObj_raw.MusicPlayList });
            mdui.snackbar({
                message: '全部清除。'
            });
            document.querySelector("#list").style.display = "none";
        }
    })
    $("img.lazyload").lazyload({ threshold: 0.2 });
}

renderList();
