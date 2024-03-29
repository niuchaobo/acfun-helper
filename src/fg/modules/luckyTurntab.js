/**
 * 幸运抽奖
 */
class LuckyTtab extends AcFunHelperFgFrame {
    constructor() {
        super();
        this.messageFormat = "https://message.acfun.cn/im?targetId={userId}";
        this.hasBeenChosen = [];
        this.devMode = false;
    }

    genNum(mode, num = 0, min = 0, max) {
        //输出随机数或随机数列表
        if (mode == 1) {
            //输出一个数字
            return Math.floor(Math.random() * (max - min)) + min;
        } else if (mode == 2) {
            //输出一个不重复的字典
            let result = {};
            for (let i = 0; i <= num - 1; i++) {
                let a = Math.floor(Math.random() * Math.floor(max)) + min;
                result[a] = a;
            }
            while (Object.keys(result).length < num) {
                let need = num - Object.keys(result).length;
                for (let i = 0; i <= need - 1; i++) {
                    let a = Math.floor(Math.random() * Math.floor(max)) + min;
                    result[a] = a;
                }
            }
            return result
        } else if (mode == 3) {
            //输出可能重复的列表
            let result = [];
            for (let i = 0; i <= num - 1; i++) {
                result.push(Math.floor(Math.random() * Math.floor(max)) + min);
            }
            return result
        }
    }

    async getResult(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then((res) => { return res.text(); })
                .then((res) => {
                    let x = res;
                    resolve(x);
                })
        });
    }

    async getTotalPageNum(acid) {
        //输出投稿对应的评论总页数
        return new Promise((resolve, reject) => {
            let acCommentApi = 'https://www.acfun.cn/rest/pc-direct/comment/list?sourceId=' + acid + '&sourceType=3&page=1';
            fetch(acCommentApi)
                .then((res) => { return res.text(); })
                .then((res) => {
                    let x = JSON.parse(res);
                    resolve(x.totalPage);
                })
        });
    }

    async getMaxFloorNum(acid) {
        //返回投稿楼层数（请勿与评论数混淆，楼层只是主楼层）
        let totalPageNum = await this.getTotalPageNum(acid).then((res) => { return res });
        let acCommentApi = 'https://www.acfun.cn/rest/pc-direct/comment/list?sourceId=' + acid + '&sourceType=3&page=' + totalPageNum;
        let floorNum = (totalPageNum - 1) * 50
        return new Promise((resolve, reject) => {
            fetch(acCommentApi)
                .then((res) => { return res.text(); })
                .then((res) => {
                    let x = JSON.parse(res);
                    let lastPageFloorNum = x.rootComments.length;
                    resolve(floorNum + lastPageFloorNum);
                });
        })
    }

    async getVCdetailCommentData(acid, follow = false) {
        let acCommentApi = 'https://www.acfun.cn/rest/pc-direct/comment/list?sourceId=' + acid + '&sourceType=3&page=';
        let totalPageNum = await this.getTotalPageNum(acid).then((res) => { return res });
        let Comm_data = {};
        let Comm_data_UIDList = [];
        let Comm_data_byUID = {};
        if (totalPageNum && totalPageNum >= 1) {
            //循环获取分页下的评论
            for (let i = 1; i <= totalPageNum; i++) {
                let jsonfy_comment = JSON.parse(await this.getResult(acCommentApi + i).then((res) => { return res }));
                for (let j = 0; j < jsonfy_comment.rootComments.length; j++) {
                    let obj = jsonfy_comment.rootComments[j];
                    //跳过up主自己
                    if (obj.isUp) {
                        continue;
                    }
                    //是否需要关注up主
                    if (follow) {
                        let isFollow = await this.isFollowed(obj.userId);
                        if (!isFollow) {
                            continue;
                        }
                    }
                    if (Comm_data_UIDList.indexOf(obj.userId) > -1) {
                        continue;
                    }
                    Comm_data_UIDList.push(obj.userId);
                    Comm_data_byUID[obj.userId] = obj;
                }
            }
        }
        Comm_data['Comm_data_UIDList'] = Comm_data_UIDList;
        Comm_data['Comm_data_byUID'] = Comm_data_byUID;
        return Comm_data;
    }

    async isFollowed(QueryUserId) {
        let checkResult
        try {
            checkResult = JSON.parse(await fetchResult("https://www.acfun.cn/rest/pc-direct/user/userInfo?userId=" + String(QueryUserId)));
        } catch (error) {
            throw TypeError();
        }
        return checkResult.profile.isFollowed;
    }

    liveRoll(num) {
        //直播间抽奖（抽取最新的num个文本弹幕，假设有重复，会使得res的键列表的长度小于num的需求，此时我们可以知道res键列表长与需求长的差，然后扩大需求值往上取用户弹幕信息，直到键列表长==需求长。）
        let w = document.getElementsByClassName("comment")
        let x = w.length - 1 //最大的索引
        let y = x - num;
        var res = new Object();
        while (Object.keys(res).length < num) {
            for (let i = x; i > y; i--) {
                if (w[i].children[0].children[1].classList == "manage-icon icon-ks") {
                    res[w[i].children[0].children[2].dataset.userId] = w[i].children[0].children[2].dataset.comment
                } else {
                    res[w[i].children[0].children[1].dataset.userId] = w[i].children[0].children[1].dataset.comment
                }
            }
            if (Object.keys(res).length < num) {
                if (y == 0 || y < 0) { return {} }
                x = y
                y = y - 1
            }
        }
        return res
    }

    async RollOut(acid, num, follow = false) {
        //主函数
        let y = await this.getVCdetailCommentData(acid, follow).then((res) => { return res });
        let max = y['Comm_data_UIDList'].length;
        if (num > max) {
            num = max;
        }
        var arr = new Array();
        let min = 0;
        while (arr.length < num) {
            let i = Math.floor(Math.random() * (max - min)) + min;
            let userId = y['Comm_data_UIDList'][i];
            this.hasBeenChosen.push(userId);
            let commentInfo = y['Comm_data_byUID'][userId];
            let url = this.messageFormat.replace("{userId}", userId);
            let lucyUser = {
                name: commentInfo.userName,
                url: url,
                comment: commentInfo.content,
                floor: commentInfo.floor,
            };
            arr.push(lucyUser);
            y['Comm_data_UIDList'].splice(i, 1);
            max--;
        }

        var obj = document.getElementById("acfun-popup-helper");
        var frameWindow = obj.contentWindow;
        frameWindow.postMessage({
            action: 'showLucyResult',
            params: {
                arr: JSON.stringify(arr),
            }
        }, '*');
        return arr;
    }

    async RollOutExp(acid, num, follow = false) {
        //排除上次执行的结果的主函数
        let y = await this.getVCdetailCommentData(acid, follow).then((res) => { return res });
        let max = y['Comm_data_UIDList'].length;
        if (num > max) {
            num = max;
        }
        var arr = new Array();
        let min = 0;
        var tryNum = 0;
        while (arr.length < num) {
            //获取随机下标
            //let i = Math.floor(Math.random() * (max - min)) + min;
            let i = Math.floor(Math.random() * (max - min)) + min;
            let userId = y['Comm_data_UIDList'][i];

            if (this.hasBeenChosen.indexOf(userId) != -1) {
                tryNum++;
                if (tryNum <= 10) {
                    continue;
                } else {
                    let lucyUser = {
                        name: "已经没有可以在评论中抽选的Acer了",
                        url: "/",
                        comment: "评论池已经被榨干了",
                        floor: "∞",
                    };
                    arr.push(lucyUser);
                    break;
                }
            }
            this.hasBeenChosen.push(userId);
            let commentInfo = y['Comm_data_byUID'][userId];
            let url = this.messageFormat.replace("{userId}", userId);
            let lucyUser = {
                name: commentInfo.userName,
                url: url,
                comment: commentInfo.content,
                floor: commentInfo.floor,
            };
            arr.push(lucyUser);
            y['Comm_data_UIDList'].splice(i, 1);
            max--;
        }

        /*for(let i in x){
            let userId = y['Comm_data_UIDList'][i];
            let commentInfo = y['Comm_data_byUID'][userId];
            let url = this.messageFormat.replace("{userId}",userId);
            let lucyUser = {
                name : commentInfo.userName,
                url : url,
                comment : commentInfo.content,
                floor: commentInfo.floor,
            }
            arr.push(lucyUser);
        }*/
        //显示抽奖结果
        var obj = document.getElementById("acfun-popup-helper");
        var frameWindow = obj.contentWindow;
        frameWindow.postMessage({
            action: 'showLucyResult',
            params: {
                arr: JSON.stringify(arr),
            }
        }, '*');
        return arr;
    }

    async RollOutExcDb(acid, num, follow = false) {
        //读取上次抽中、并且被Up主标记到数据库中的已中用户Uid列表，以便从本次抽奖结果中排除
        let y = await this.getVCdetailCommentData(acid, follow).then((res) => { return res });
        chrome.runtime.sendMessage({ action: "getLuckyHistory", params: { responseRequire: true, asyncWarp: true } }, (response) => {
            console.log(response)
        });
    }

}