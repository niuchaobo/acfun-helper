/**
 * 播放器浮动通知气泡
 * @param {string} text 通知文本
 * @param {string} importantText 带有红色的重要通知文本
 * player.emit("showLeftBottomTip", "2333")
 */
function leftBottomTip(text, importantText = "") {
    $(".left-bottom-tip")
        .eq(0)
        .append(
            `<div class="tip-item muted" ><div class="left-bottom-tip-text"><span>${text}</span>&nbsp;&nbsp;<span style='color:red;'>${importantText}</span></div></div>`
        );
    let _timer = setTimeout(() => {
        $(".left-bottom-tip").eq(0).children().eq(0).remove(); //这样写 并不能自定义持续时间
        clearInterval(_timer);
    }, 2500);
}

/**
 * 用户展示中心左下角通知
 * @param {*} msg 
 * @param {*} notifLevel 通知级别（info 蓝色;error 红色;success 绿色;warning 橙色;）
 * @param {*} notifIcon 通知级别符号 banana;success;error;warning;logout;help;arrow-round-right;comments;envelope;info;yonghu;app-phone;close;arrow-slim-up;rank;arrow-slim-right;loading;triangle-right;eye;eye-new;crown;arrow-round-left;plus-circle;history;upload;collect;calendar;danmu;danmu-new;view-player;view-player-new;arrow-round-up;arrow-round-down;triangle-slim-right;chevron-left;th-list2;circle-triangle-w;circle-triangle-e;label;th-large1;th3;th-large;th-list;th;step-forward;step-backward;prompt;helps;delete;to-comm;to-comm-new;delete1;chevron-right;chuang-zuo-zhong-xin;
 * @param {*} time 显示时间
 */
function uCentTip(msg, notifLevel = "success", notifIcon = "success", time = 2500) {
    $("#g-toast").eq(0).append(`
      <p class="info ${notifLevel}" style="left: 0px;"><i class="icon icon-${notifIcon}"></i><span>${msg}</span></p>
    `);
    let _timer = setTimeout(() => {
        $("#g-toast").eq(0).children().eq(1).remove();
        clearInterval(_timer);
    }, time);
}


/**
 * 助手更新状态处理
 * @description 数据从插件存储中取
 */
function updateVersionIcon() {
    chrome.storage.local.get(["Upgradeable"], (data) => {
      if (data.Upgradeable === 1) {
        $('#update-box').css('display', 'inline-block')
        $('.update-letter').html('助手有轻量更新，点击查看')
        $('.head').addClass('lightUpdate')
        $('#update-box').click(() => {
          window.open('https://www.acfun.cn/u/7054138')
        })
        return
      }
      if (data.Upgradeable === 2) {
        $('#update-box').css('display', 'inline-block')
        $('.update-letter').html('助手有重大更新，点击查看')
        $('.update-icon').css('background', 'red')
        $('#update-box').click(() => {
          window.open('https://www.acfun.cn/u/7054138')
        })
        $('.head').addClass('heavyUpdate')
        return
      }
    });
  }
  