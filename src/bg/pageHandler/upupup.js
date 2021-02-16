import {
    getFollowings, getResult, getFollowingNum
} from "./pagehandlerLibs.js"
import moment from "https://cdn.jsdelivr.net/npm/moment@2.29.1/dist/moment.js"

var datasets = { "followList": {}, "videoUpdate": {}, "articleUpdate": {}, "feedUpdate": {}, "raw": [], "totalNum": 0, "work": 0, "percentUnit": 0.0 };

function dayDiff(time) {
    var now = moment();
    var ago = moment(time);
    return now.diff(ago, 'days');
}

function sortInfo() {
    datasets.raw.forEach(element => {
        element.forEach(async (e) => {
            datasets.followList[e.userId] = { "name": e.userName, "headImg": e.userImg }
        })
    })
}

async function updates() {
    datasets.raw.forEach(element => {
        element.forEach(async (e) => {
            if (datasets.work > 50) {
                throw TypeError;
            }
            datasets.work++;
            let percent = (datasets.work / datasets.percentUnit).toFixed(2);
            document.querySelector("#progress").style.width = `${percent}%`;

            let vcontributes = JSON.parse(await getResult(`https://api-new.app.acfun.cn/rest/app/user/resource/query?count=1&authorId=${e.userId}&resourceType=2&sortType=3&status=1&pcursor=0`));
            let articles = JSON.parse(await getResult(`https://api-new.app.acfun.cn/rest/app/user/resource/query?count=1&authorId=${e.userId}&resourceType=3&sortType=3&status=1&pcursor=0`));
            let feeds = JSON.parse(await getResult(`https://api-new.app.acfun.cn/rest/app/feed/profile?pcursor=0&userId=${e.userId}&count=1`))

            if (vcontributes.totalNum == 0 && articles.totalNum == 0 && feeds.feedList.length == 0) {
                $("ul.noContributs").append(`<div class="mdui-list-item-avatar"><img src="${datasets.followList[e.userId].headImg}"/></div> <div class="mdui-list-item-content"><a href="https://www.acfun.cn/u/${e.userId}" target="_blank"> </a> (关注：${e.followingCount} 粉丝：${e.fanCount} 来自于分组：${e.groupName} 学院Up：${e.isSignedUpCollege ? "Y" : "N"} )</div>`);
                document.querySelector("#noContributsLink").innerText = `空空如也 ${document.querySelector("#noContributsLink").children[0].children[0].childElementCount}`
            }

            let vdayDiffNum, adayDiffNum, fdayDiffNum

            try {
                vdayDiffNum = dayDiff(vcontributes.feed[0].createTimeMillis)
            } catch (error) {
                vdayDiffNum = 65532
            }
            try {
                adayDiffNum = dayDiff(articles.feed[0].contributeTime)
            } catch (error) {
                adayDiffNum = 65532
            }
            try {
                fdayDiffNum = dayDiff(feeds.feedList[0].createTime)
            } catch (error) {
                fdayDiffNum = 65532
            }
            // console.log("vaf", vdayDiffNum, adayDiffNum, fdayDiffNum)

            if (vdayDiffNum <= 7 || adayDiffNum <= 7 || fdayDiffNum <= 7) {
                //一周内
                $("ul#latest").append(`<li class="mdui-list-item mdui-ripple"> <div class="mdui-list-item-avatar"><img src="${datasets.followList[e.userId].headImg}"/></div> <div class="mdui-list-item-content"><a href="https://www.acfun.cn/u/${e.userId}" target="_blank">${e.userName} (关注：${e.followingCount} 粉丝：${e.fanCount} 来自于分组：${e.groupName} 学院Up：${e.isSignedUpCollege ? "Y" : "N"} )</a></div> </li>`);
                document.querySelector("#latestLink").innerText = `最近 ${document.querySelector("#latestTab").children[0].children[0].childElementCount}`

            } else if ((vdayDiffNum > 7 && vdayDiffNum <= 30) || (adayDiffNum > 7 && adayDiffNum <= 30) || (fdayDiffNum > 7 && fdayDiffNum <= 30)) {
                //一周外一月内
                $("ul#oneWeekAgo").append(`<li class="mdui-list-item mdui-ripple"> <div class="mdui-list-item-avatar"><img src="${datasets.followList[e.userId].headImg}"/></div> <div class="mdui-list-item-content"><a href="https://www.acfun.cn/u/${e.userId}" target="_blank">${e.userName} (关注：${e.followingCount} 粉丝：${e.fanCount} 来自于分组：${e.groupName} 学院Up：${e.isSignedUpCollege ? "Y" : "N"} )</a></div> </li>`);
                document.querySelector("#oneWeekAgoLink").innerText = `一周前 ${document.querySelector("#oneWeekAgoTab").children[0].children[0].childElementCount}`

            } else if ((vdayDiffNum > 30 && vdayDiffNum <= 90) || (adayDiffNum > 30 && adayDiffNum <= 90) || (fdayDiffNum > 30 && fdayDiffNum <= 90)) {
                //三月内一月外
                $("ul#oneMonthAgo").append(`<li class="mdui-list-item mdui-ripple"> <div class="mdui-list-item-avatar"><img src="${datasets.followList[e.userId].headImg}"/></div> <div class="mdui-list-item-content"><a href="https://www.acfun.cn/u/${e.userId}" target="_blank">${e.userName} (关注：${e.followingCount} 粉丝：${e.fanCount} 来自于分组：${e.groupName} 学院Up：${e.isSignedUpCollege ? "Y" : "N"} )</a></div> </li>`);
                document.querySelector("#oneMonthAgoLink").innerText = `一月前 ${document.querySelector("#oneMonthAgoTab").children[0].children[0].childElementCount}`

            } else if ((vdayDiffNum > 90 && vdayDiffNum <= 179) || (adayDiffNum > 90 && adayDiffNum <= 179) || (fdayDiffNum > 90 && fdayDiffNum <= 179)) {
                $("ul#threeMonthAgo").append(`<li class="mdui-list-item mdui-ripple"> <div class="mdui-list-item-avatar"><img src="${datasets.followList[e.userId].headImg}"/></div> <div class="mdui-list-item-content"><a href="https://www.acfun.cn/u/${e.userId}" target="_blank">${e.userName} (关注：${e.followingCount} 粉丝：${e.fanCount} 来自于分组：${e.groupName} 学院Up：${e.isSignedUpCollege ? "Y" : "N"} )</a></div> </li>`);
                document.querySelector("#threeMonthAgoLink").innerText = `三月前 ${document.querySelector("#threeMonthAgoTab").children[0].children[0].childElementCount}`

            } else if ((vdayDiffNum > 179 && vdayDiffNum <= 356) || (adayDiffNum > 179 && adayDiffNum <= 356) || (fdayDiffNum > 179 && fdayDiffNum <= 356)) {
                $("ul#halfYearAgo").append(`<li class="mdui-list-item mdui-ripple"> <div class="mdui-list-item-avatar"><img src="${datasets.followList[e.userId].headImg}"/></div> <div class="mdui-list-item-content"><a href="https://www.acfun.cn/u/${e.userId}" target="_blank">${e.userName} (关注：${e.followingCount} 粉丝：${e.fanCount} 来自于分组：${e.groupName} 学院Up：${e.isSignedUpCollege ? "Y" : "N"} )</a></div> </li>`);
                document.querySelector("#halfYearAgoLink").innerText = `半年前 ${document.querySelector("#halfYearAgoTab").children[0].children[0].childElementCount}`

            } else if (fdayDiffNum > 356 || adayDiffNum > 356 || vdayDiffNum > 356) {
                $("ul#oneYearAgo").append(`<li class="mdui-list-item mdui-ripple"> <div class="mdui-list-item-avatar"><img src="${datasets.followList[e.userId].headImg}"/></div> <div class="mdui-list-item-content"><a href="https://www.acfun.cn/u/${e.userId}" target="_blank">${e.userName} (关注：${e.followingCount} 粉丝：${e.fanCount} 来自于分组：${e.groupName} 学院Up：${e.isSignedUpCollege ? "Y" : "N"} )</a></div> </li>`);
                document.querySelector("#oneYearAgoLink").innerText = `一年前 ${document.querySelector("#oneYearAgoTab").children[0].children[0].childElementCount}`

            }
        })
    })

}


window.addEventListener('load', e => onLoad(e));
async function onLoad() {
    mdui.snackbar({
        message: '加载速度取决于你的关注数量，可能需要一定时间，卡住请等待一段时间之后再刷新（请求数量过多可能会导致服务器拒绝连接），如果条目多，请使用Ctrl+F查找。',
        position: 'right-top',
        timeout: 0,
        closeOnOutsideClick: true,
    });
    datasets.raw = await getFollowings();
    datasets.totalNum = await getFollowingNum();
    datasets.percentUnit = datasets.totalNum / 1e2;
    // console.log(datasets)
    sortInfo()
    updates()
}
