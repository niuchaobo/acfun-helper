class UIReactor {
  constructor(devMode) {
    this.devMode = devMode;
  }

  static commentAreaNotice(text) {
    $(".ac-comment-toast")
      .eq(0)
      .append(DOMPurify.sanitize(
        `<div class="area-comm-toast">${text}</div>`)
      );
    let _timer = setTimeout(() => {
      $(".ac-comment-toast").eq(0).children().eq(0).remove(); //这样写 并不能自定义持续时间
      clearInterval(_timer);
    }, 2500);
  }

}

/**
 * 播放器浮动通知气泡
 * @param {string} text 通知文本
 * @param {string} importantText 带有红色的重要通知文本
 * player.emit("showLeftBottomTip", "2333")
 */
function leftBottomTip(text, importantText = "") {
  $(".left-bottom-tip")
    .eq(0)
    .append(DOMPurify.sanitize(
      `<div class="tip-item muted" ><div class="left-bottom-tip-text"><span>${text}</span>&nbsp;&nbsp;<span style='color:red;'>${importantText}</span></div></div>`)
    );
  let _timer = setTimeout(() => {
    $(".left-bottom-tip").eq(0).children().eq(0).remove(); //这样写 并不能自定义持续时间
    clearInterval(_timer);
  }, 2500);
}

/**
 * 文章区、用户中心左下角通知
 * @param {string} message 
 * @param {string} level 通知级别：常用 - error success info warning 其他(可以定义图标) - banana ; success ; error ; warning ; logout ; help ; arrow-round-right ; comments ; envelope ; info ; yonghu ; app-phone ; close ; arrow-slim-up ; rank ; arrow-slim-right ; loading ; triangle-right ; eye ; eye-new ; crown ; arrow-round-left ; plus-circle ; history ; upload ; collect ; calendar ; danmu ; danmu-new ; view-player ; view-player-new ; arrow-round-up ; arrow-round-down ; triangle-slim-right ; chevron-left ; th-list2 ; circle-triangle-w ; circle-triangle-e ; label ; th-large1 ; th3 ; th-large ; th-list ; th ; step-forward ; step-backward ; prompt ; helps ; delete ; to-comm ; to-comm-new ; delete1 ; chevron-right ; chuang-zuo-zhong-xin;
 * @param {number} time 通知持续时间
 * @excludePage 主页、分区、用户后台、创作中心、直播站
 * @refer https://cdnfile.aixifan.com/static/common/widget/toast/toast.947ad3aa2604243116b8.js
 */
function LeftBottomNotif(message = "什么都没有发生哦~", level = "info", time = 2000) {
  getAsyncDom("#g-toast", () => {
    var parentContainer = document.querySelector("#g-toast"),
      obj = document.createElement("p");
    obj.innerHTML = DOMPurify.sanitize("<i class='icon icon-" + level + "'></i><span>" + message + "</span>"),
      obj.classList.add("info"),
      obj.classList.add(level),
      parentContainer.appendChild(obj);
    var a = $(obj);
    return a.animate({
      left: 0
    }, 300),
      setTimeout((function () {
        a.animate({
          left: "-100%"
        }, 300, (function () {
          a.remove()
        }
        ))
      }
      ), time)
  }, 800)
}

/**
 * 助手更新状态处理
 * @description 数据从插件存储中取
 */
function updateVersionIcon() {
  chrome.storage.local.get(["Upgradeable"], (data) => {
    if (data.Upgradeable === 1) {
      $('#update-box').css('display', 'inline-block')
      $('.update-letter').html('助手有轻量更新')
      $('.head').addClass('lightUpdate')
      $('#update-box').click(() => {
        window.open('https://www.acfun.cn/u/7054138')
      })
      return
    }
    if (data.Upgradeable === 2) {
      $('#update-box').css('display', 'inline-block')
      $('.update-letter').html('助手有重大更新')
      $('.update-icon').css('background', 'red')
      $('#update-box').click(() => {
        window.open('https://www.acfun.cn/u/7054138')
      })
      $('.head').addClass('heavyUpdate')
      return
    }
  });
}

class PlayerMenuSwitchItem extends UIReactor {
  constructor(name, title, describe, defaultState = false) {
    this.menuInst = null;
    this.parentInst = null;
    this.name = name;
    this.title = title;
    this.describe = describe;
    this.defaultState = defaultState;
    this.trueHandler = null;
    this.falseHandler = null;
    this.firstInit = true;
    this.initDOM();
  }

  addEventHandler(tf, ff) {
    if (tf && ff && typeof (tf) == "function" && typeof (ff) == "function") {
      this.trueHandler = tf;
      this.falseHandler = ff;
      this.startEventHook();
    }
  }

  initDOM() {
    let htmlUi = `
    <div>
      <label>${this.title}</label>
      <div class="control-checkbox ${this.name}" data-bind-key="${this.name}" ${this.describe ? "title=\"" + this.describe + "\" " : ""}data-bind-attr="${this.defaultState}"></div>
    </div>
    `;
    try {
      $(".setting-panel>.setting-panel-content").append(DOMPurify.sanitize(htmlUi));
      this.menuInst = document.querySelector("." + this.name);
      this.parentInst = this.menuInst.parentElement;
      this.firstInit = false;
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  reloadDOM(newName) {
    const newInnerSwItem = document.createElement("div");
    newInnerSwItem.dataset.bindAttr = this.defaultState;
    newInnerSwItem.dataset.bindKey = newName;
    this.describe ? newInnerSwItem.title = this.describe : "";
    newInnerSwItem.className = `control-checkbox ${newName}`;
    this.parentInst.append(DOMPurify.sanitize(newInnerSwItem));
    this.menuInst = document.querySelector("." + newName);
    this.parentInst = this.menuInst.parentElement;
  }

  startEventHook() {
    $(".setting-panel-content").on("click", (e) => {
      if (e.target.dataset.bindKey == this.name && e.target.dataset.bindAttr == "false") {
        this.menuInst.dataset.bindAttr = true;
        this.trueHandler();
      } else if (e.target.dataset.bindKey == this.name && e.target.dataset.bindAttr == "true") {
        this.menuInst.dataset.bindAttr = false;
        this.falseHandler();
      }
    })
  }

  changeRefresh() {
    ToolBox.addRefTypeValueListener(this, (f) => {
      if (this.firstInit) {
        return;
      }
      this.menuInst.remove();
      this.firstInit = true;
      this.reloadDOM(f);
      this.trueHandler ? $(".setting-panel-content").off("click") && this.addEventHandler(this.trueHandler, this.falseHandler) : "";
    }, ["name"]);
    ToolBox.addRefTypeValueListener(this, (f) => {
      this.menuInst.parentElement.children[0].innerText = f;
    }, ["title"])
    ToolBox.addRefTypeValueListener(this, (f) => {
      this.menuInst.title = f;
    }, ["describe"])
  }

  unload() {
    this.parentInst, remove();
    delete this;
  }

}

// let item = new PlayerMenuSwitchItem("bTest2","thisA2","2333",false)
// item.addEventHandler(()=>{console.log(true)},()=>{console.log(false)})
// item.changeRefresh()
// item.name="bTest"