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
