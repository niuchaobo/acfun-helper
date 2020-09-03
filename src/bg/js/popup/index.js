/* global odhback, localizeHtmlPage, utilAsync, optionsLoad, optionsSave updateVersionIcon*/
import {
  renderPushInnerHtml,
  renderLives
} from "./renderList.js";
import {
  openUpdateLog,
  openIntroduce,
  openSetting,
  watchLive,
  onOptionChanged,
  titleToHome,
  clickToTop,
  hideToTopButton,
  fetchDougaInfo,
  viewHistory,
  WatchLaterFpopup,
  WatchLaterFOpenList,
  MomentSquareFpop
} from "./popupEvent.js";

async function onReady() {
  localizeHtmlPage(); //global function
  updateVersionIcon(); //更新提醒
  let options = await optionsLoad(); //global function
  //fetchPushContent();
  renderPushInnerHtml(); //稿件动态列表加载
  renderLives(); //生放送列表加载
  $("#extends-enbaled").prop("checked", options.enabled);
  $("#extends-enbaled").change(onOptionChanged);
  $("#pop-update-log").click(openUpdateLog);
  $("#pop-introduce").click(openIntroduce);
  $("#pop-setting").click(openSetting);
  $("#go-live").click(watchLive);
  $("#pop-title .letter").click(titleToHome);
  $(document).scroll(hideToTopButton);
  $(".toTop").click(clickToTop);
  $("#dougaInfoAcidbtn").click(fetchDougaInfo);
  $("#ViewHistoryAction").click(viewHistory);
  $("#WatchLaterFpopup").click(WatchLaterFpopup);
  $("#WatchLaterFOpenList").click(WatchLaterFOpenList);
  $("#MomentSquareFpop").click(MomentSquareFpop);
}

document.addEventListener("DOMContentLoaded", function (e) {
  //处理pop页面宽度
  let browser = myBrowser();
  if (browser == "FF") {
    document.getElementById("pop-push").style.width = "95%";
  }
});

$(document).ready(utilAsync(onReady));

//==============Common Functions================//
// 将时间转为最近
function getTimeSinceNow(date) {
  let currentDate = new Date();
  let publishTime = new Date(date);
  let oneDay = 3600 * 24 * 1000;
  let oneWeek = oneDay * 7;
  let oneMinute = 60 * 1000;
  let oneHour = oneMinute * 60;
  let during = currentDate.getTime() - publishTime.getTime();
  if (during < oneMinute) {
    return Math.floor(during / 1000) + "秒前";
  } else if (during >= oneMinute && during < oneHour) {
    return Math.floor(during / oneMinute) + "分前";
  } else if (during > oneHour && during < oneDay) {
    return Math.floor(during / oneHour) + "小时前";
  } else if (during >= oneDay && during < oneWeek) {
    return Math.floor(during / oneDay) + "天前";
  } else if (during >= oneWeek) {
    return `于${publishTime.getFullYear()}-${
      publishTime.getMonth + 1
    }-${publishTime.getDate()}`;
  }
}

