/**
 * 后台音乐播放器
 */
class MusicPlayer {
    constructor() {
        this.PageLocation0 = "https://www.acfun.cn/v/ac"
        this.PageLocation1 = "https://www.acfun.cn/player/ac"
        this.playerPage = {};
        this.playerWindow = { windowId: -1 };
        this.playInfo = {
            "Playing": -1,
            "Status": "",
            "playList_raw": "",
            "windowSetting": {},
            "playListObj": {},
            "playList": {},
            "playerMode": 0,
        }
        this.PlayerSign = "";
    }

    onLoad() {
        console.log("Register MusicPlayer Mod.");
    }

    async addItem(link) {
        let playList_raw = await getStorage("MusicPlayList");

        if (playList_raw.MusicPlayList == null) {
            playList_raw["MusicPlayList"] = {};
            chrome.storage.local.set({ "MusicPlayList": playList_raw });
        }
        if (playList_raw.MusicPlayList.List == null) {
            playList_raw.MusicPlayList["List"] = {};
            chrome.storage.local.set({ "MusicPlayList": playList_raw.MusicPlayList });
        }
        let this_list = playList_raw.MusicPlayList.List
        if (link != null && link != undefined) {
            if (REG.acVid.test) {
                let acvid = REG.acVid.exec(link)
                let this_dougaInfo = JSON.parse(await fetchResult("https://mini.pocketword.cn/api/acfun/info?dougaId=" + acvid[2]));
                // console.log(this_dougaInfo);
                this_list[acvid[2]] = { "upName": this_dougaInfo.user.name, "dougaName": this_dougaInfo.title, "uploadTime": this_dougaInfo.createTime, "viewCount": this_dougaInfo.viewCount, "coverCdnUrls": this_dougaInfo.coverCdnUrls[0].url }
            }
        }
        playList_raw.MusicPlayList.List = this_list;
        chrome.storage.local.set({ "MusicPlayList": playList_raw.MusicPlayList });
    }

    async cleanTask(playList, playListObj) {
        // console.log("clean")
        // playList=["1","2"]
        // playListObj={"1":1,"2":2,"3":3,"4":4};
        var originData = await getStorage("MusicPlayList");
        if (playList.length == 0) {
            originData.MusicPlayList.List = {};
        } else {
            let x = Object.keys(playListObj);
            for (let i = 0; i < x.length; i++) {
                if (playList.indexOf(x[i]) == -1) {
                    delete this.playListObj[x[i]];
                    delete originData.MusicPlayList.List[x[i]];
                }
            }
        }
        // console.log(originData.MusicPlayList)
        chrome.storage.local.set({ "MusicPlayList": originData.MusicPlayList });
    }

    setSign(sign) {
        this.PlayerSign = sign;
    }

    doneSigntask() {
        this.PlayerSign = null;
    }

    async createPlayerWindow(acid) {
        if (this.playInfo.windowSetting.left != undefined) {
            var left = this.playInfo.windowSetting.left;
            var top = this.playInfo.windowSetting.top;
            var width = this.playInfo.windowSetting.width;
            var height = this.playInfo.windowSetting.height;
        } else {
            var left = 139;
            var top = 32;
            var width = 980;
            var height = 590;
        }

        var features = 'location=0,toolbar=0,menubar=0,status=0';
        features += ',left=' + left;
        features += ',top=' + top;
        features += ',width=' + width;
        features += ',height=' + height;
        let x = await getStorage("MusicPlayList");
        this.playInfo.playerMode = Number(x.MusicPlayList.playerMode);
        
        let pageUrl = this.playInfo.playerMode == 0 ? this.PageLocation0 : this.PageLocation1;

        this.playerPage = window.open(pageUrl + acid, 'AcFunMusicPlayer', features);
        this.playerWindow.windowId = 1;
    }

    async startPlayer(startIndex) {
        if (this.PlayerSign == "firstPlay") {

            this.playInfo.playList_raw = await getStorage("MusicPlayList");
            // console.log(this.playInfo.playList_raw);
            if (JSON.stringify(this.playInfo.playList_raw.MusicPlayList.List) == '{}') {
                this.PlayerSign = "stop";
                return;
            }

            this.playInfo.playListObj = this.playInfo.playList_raw.MusicPlayList.List;
            this.playInfo.playList = Object.keys(this.playInfo.playList_raw.MusicPlayList.List);
            this.playInfo.Playing = Number(startIndex);
            this.playInfo.Status = true;

            this.createPlayerWindow(this.playInfo.playList[this.playInfo.Playing]);
            this.doneSigntask();
        } else if (this.PlayerSign == "deleteThis") {
            let oldInfo = this.playInfo.Playing;
            this.playInfo.playList.shift(oldInfo);
            delete this.playInfo.playListObj[oldInfo];

            this.doneSigntask();
        } else if (this.PlayerSign == "next") {

            this.playInfo.Playing++;
            this.playInfo.Status = true;

            if (this.playInfo.Playing >= this.playInfo.playList.length) {
                this.PlayerSign = "stop";
                return;
            }
            this.playerPage.location = this.playInfo.playerMode == 0 ? this.PageLocation0 + this.playInfo.playList[this.playInfo.Playing] : this.PageLocation1 + this.playInfo.playList[this.playInfo.Playing];

            this.doneSigntask();
        } else if (this.PlayerSign == "last") {
            this.playInfo.Playing--;
            this.playInfo.Status = true;

            this.playerPage.location = this.playInfo.playerMode == 0 ? this.PageLocation0 + this.playInfo.playList[this.playInfo.Playing] : this.PageLocation1 + this.playInfo.playList[this.playInfo.Playing];
            this.doneSigntask();
        }
    }

    focusPlayer() {
        if (this.playInfo.Status) {
            this.playerPage.focus();
        }
    }

    main(startIndex = 0) {
        let playerTask = setInterval(() => {
            this.startPlayer(startIndex);
            let windowclosed = this.playerPage.closed;
            if (this.PlayerSign == "stop" || windowclosed) {
                try {
                    this.playerPage.close();
                } catch (error) {
                    // console.log("err to close window");
                }
                this.playInfo.Playing = -1;
                this.playerWindow.windowId = -1;
                this.playInfo.Status = false;

                notice("AcFun助手", `${!windowclosed ? "音乐播放器任务队列全部完成。" : "播放器已关闭。"}`);
                this.doneSigntask();
                clearInterval(playerTask);
            }
        }, 2000)
    }

}