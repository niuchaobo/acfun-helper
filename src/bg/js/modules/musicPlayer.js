/**
 * 后台音乐播放器
 */
class MusicPlayer {
    constructor() {
        this.PageLocation = "https://www.acfun.cn/player/ac"
        this.playerPage = {};
        this.playerWindow = { windowId: -1 };
        this.playInfo = {
            "Playing": -1,
            "Status": "",
            "playList_raw": "",
            "windowSetting": {},
            "playListObj": {},
            "playList": {}
        }
        this.PlayerSign = "";
    }

    onLoad() {
        console.log("Register MusicPlayer Mod.");
    }

    async addItem(link) {
        let playList_raw = await getStorage("MusicPlayList");
        console.log(playList_raw)
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
                console.log(this_dougaInfo);
                this_list[acvid[2]] = { "upName": this_dougaInfo.user.name, "dougaName": this_dougaInfo.title, "uploadTime": this_dougaInfo.createTime, "viewCount": this_dougaInfo.viewCount }
            }
        }
        playList_raw.MusicPlayList.List = this_list;
        chrome.storage.local.set({ "MusicPlayList": playList_raw.MusicPlayList });
    }

    async cleanTask(playList, playListObj) {
        console.log("clean")
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
        console.log(originData.MusicPlayList)
        chrome.storage.local.set({ "MusicPlayList": originData.MusicPlayList });
    }

    setSign(sign) {
        this.PlayerSign = sign;
    }

    doneSigntask() {
        this.PlayerSign = null;
    }

    createPlayerWindow(acid) {
        console.log(acid);
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

        console.log(features)
        this.playerPage = window.open(this.PageLocation + acid, 'AcFunMusicPlayer', features);
        console.log(this.playerPage)
        this.playerWindow.windowId = 1;
    }

    async startPlayer() {
        if (this.PlayerSign == "firstPlay") {

            this.playInfo.playList_raw = await getStorage("MusicPlayList");
            console.log(this.playInfo.playList_raw);
            if (JSON.stringify(this.playInfo.playList_raw.MusicPlayList.List) == '{}') {
                console.log("dict empty");
                this.PlayerSign = "exit";
                return;
            }

            this.playInfo.playListObj = this.playInfo.playList_raw.MusicPlayList.List;
            this.playInfo.playList = Object.keys(this.playInfo.playList_raw.MusicPlayList.List);

            this.playInfo.Playing = 0;
            this.playInfo.Status = true;

            this.createPlayerWindow(this.playInfo.playList[this.playInfo.Playing]);

            // let watchDone = this.playInfo.playList.shift();
            // delete this.playInfo.playListObj[watchDone];
            this.doneSigntask();

        } else if (this.PlayerSign == "deleteThis") {
            let oldInfo = this.playInfo.Playing;
            this.playInfo.playList.shift(oldInfo);
            delete this.playInfo.playListObj[oldInfo];

            this.doneSigntask();
        } else if (this.PlayerSign == "focusPlayerWindow") {
            this.playerPage.focus();
            this.doneSigntask();
        } else if (this.PlayerSign == "next") {
            console.log("next");

            this.playInfo.Playing++;
            this.playInfo.Status = true;

            if (this.playInfo.Playing >= this.playInfo.playList.length) {
                this.PlayerSign = "stop";
                return;
            }
            this.playerPage.location = this.PageLocation + this.playInfo.playList[this.playInfo.Playing];

            console.log("changed page");
            this.doneSigntask();
        } else if (this.PlayerSign == "last") {
            this.playInfo.Playing--;
            this.playInfo.Status = true;

            this.playerPage.location = this.PageLocation + this.playInfo.playList[this.playInfo.Playing];
            this.doneSigntask();
        } else {
            console.log(`Player Status: ${this.playInfo.playList.length ? "Playing" : "Will Soon Stop"}`);
        }
    }

    main() {
        let playerTask = setInterval(() => {
            this.startPlayer();
            console.log(this.playInfo)
            console.log(this.PlayerSign);
            if (this.PlayerSign == "stop") {
                try {
                    this.playerPage.close();
                } catch (error) {
                    console.log("err to close window");
                }
                this.playInfo.Playing = -1;
                this.playerWindow.windowId = -1;
                this.playInfo.Status = false;

                console.log("stoped");
                notice("2333", "end");
                this.doneSigntask();
                clearInterval(playerTask);
            }
        }, 2000)
    }

}