/* global odhback, localizeHtmlPage, utilAsync, optionsLoad, optionsSave */
import renderLives from "./renderLives.js";
import toTopButton from "./toTopButton.js";
import renderMomentCircleHtml from "./renderMomentCircleHtml.js";
import renderPushInnerHtml from "./renderPushInnerHtml.js";
import updateVersionIcon from "./updateVersionIcon.js";
import {
  openUpdateLog,
  openIntroduce,
  openSetting,
  watchLive,
} from "./popupEvent.js";
import onOptionChanged from './onOptionChanged.js'
import unKnownCode from './unKnownCode.js'
import fetchPushContent from "./fetchPushContent.js";

unKnownCode() //不明代码

async function onReady() {
  localizeHtmlPage(); //global function
  updateVersionIcon(); //更新提醒
  let options = await optionsLoad(); //global function
  //fetchPushContent();
  renderPushInnerHtml();//稿件动态列表加载
  renderMomentCircleHtml(); //更多数据
  toTopButton(); //回到顶部按钮
  renderLives(); //生放送列表加载
  $("#extends-enbaled").prop("checked", options.enabled);
  $("#extends-enbaled").change(onOptionChanged);
  $("#pop-update-log").click(openUpdateLog);
  $("#pop-introduce").click(openIntroduce);
  $("#pop-setting").click(openSetting);
  $("#go-live").click(watchLive);
  $('#pop-title .letter').click(()=>{
    window.open("https://www.acfun.cn/")
  })
  
}

document.addEventListener("DOMContentLoaded", function (e) {
  //处理pop页面宽度
  let browser = myBrowser();
  if (browser == "FF") {
    document.getElementById("pop-push").style.width = "95%";
  }
});

$(document).ready(utilAsync(onReady));
