/* global odhback, optionsLoad, optionsSave*/

export function openUpdateLog() {
  //window.open("update-log.html","_blank");
  var a = $("<a href='update-log.html' target='_blank'></a>").get(0);
  var e = document.createEvent("MouseEvents");
  e.initEvent("click", true, true);
  a.dispatchEvent(e);
}

export function openIntroduce() {
  //window.open("guide.html","_blank");
  var a = $("<a href='guide.html' target='_blank'></a>").get(0);
  var e = document.createEvent("MouseEvents");
  e.initEvent("click", true, true);
  a.dispatchEvent(e);
}

export function openSetting() {
  //window.open("options.html","_blank");
  var a = $("<a href='options.html' target='_blank'></a>").get(0);
  var e = document.createEvent("MouseEvents");
  e.initEvent("click", true, true);
  a.dispatchEvent(e);
}

export function watchLive() {
  let uid = $("#live-id").val();
  //不输入uid时，跳转到直播首页（以前是404）
  let reg = /^\d{1,}$/;
  let pattern = new RegExp(reg);
  let url = pattern.test(uid)
    ? `http://live.acfun.cn/live/${uid}`
    : `https://live.acfun.cn/`;
  var a = $("<a href='" + url + "' target='_blank'></a>").get(0);
  var e = document.createEvent("MouseEvents");
  e.initEvent("click", true, true);
  a.dispatchEvent(e);
}

export function titleToHome() {
  window.open("https://www.acfun.cn/");
}

export function hideToTopButton() {
  let top = $(".mdui-fab").offset().top;
  if (top < 2000) {
    $(".mdui-fab").css({ opacity: "0" });
  } else {
    $(".mdui-fab").css({ opacity: "1" });
  }
}

export function clickToTop() {
  $("html,body").animate({ scrollTop: "0px" }, 600);
}

export async function onOptionChanged(e) {
    if (!e.originalEvent) return;
    let options = await optionsLoad();
    options.enabled = $("#extends-enbaled").prop("checked");
    let newOptions = await odhback().opt_optionsChanged(options);
    optionsSave(newOptions);
  }
