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

  static ucenterAreaNotice(text, latency = 2500) {
    if (!document.querySelector(".ac-toast")) {
      const e = document.createElement("div");
      e.className = "ac-toast";
      document.querySelector("#app").append(e);
    }
    $(".ac-toast")
      .eq(0)
      .append(DOMPurify.sanitize(
        `<div class="ac-toast-item ac-toast-success ac-motion-fade-slide-down-leave-active ac-motion-fade-slide-down-leave-to" style="opacity: 1;">
          <div class="ac-toast-content">
            <span class="ac-icon ac-toast-icon"><i class="iconfont"></i></span
            ><span>${text}</span>
          </div>
        </div>`)
      );
    let _timer = setTimeout(() => {
      $(".ac-toast").eq(0).children().eq(0).remove();
      clearInterval(_timer);
    }, latency);
  }

  static loadMdui() {
    const linkTar = document.createElement("link");
    linkTar.href = chrome.runtime.getURL("mdui/css/mdui.min.css");
    linkTar.type = "text/css";
    linkTar.rel = "stylesheet";
    (document.head || document.documentElement).appendChild(linkTar);
    const JsTar = document.createElement("script");
    JsTar.src = chrome.runtime.getURL("mdui/js/mdui.min.js");
    JsTar.type = "text/javascript";
    (document.head || document.documentElement).appendChild(JsTar);
  }

  static rememberLastSend(targetTag, definedKeyFunc = false) {
    let lastRecord = "";
    GetAsyncDomUtil.getAsyncDomClassic(targetTag, () => {
      document.querySelector(targetTag).addEventListener("input", (e) => {
        if (e.target.value) {
          lastRecord = e.target.value;
        }
      })
      document.querySelector(targetTag).addEventListener("keydown", (e) => {
        if (definedKeyFunc) {
          definedKeyFunc();
          return;
        }
        if (e.code == "ArrowUp") {
          const tArea = document.querySelector(targetTag);
          (tArea.value == "" && lastRecord != "") && (tArea.value = lastRecord);
        }
      })
    })
  }
  /**
   * 判断现在视频稿件所播放的分P编号
   * @returns {Number} PartNumber
   */
  static judgeActivePart() {
    try {
      let x = document.querySelector("#main-content > div.right-column > div.part > div.fl.part-wrap > ul").children;
      for (let i = 0; i < x.length; i++) {
        if (x[i].classList[1] == "active") {
          return i + 1;
        }
      }
    } catch (error) {
      return REG.videoPartNumByURL.test(window.location.href) ? Number(REG.videoPartNumByURL.exec(window.location.href)[1]) : 1;
    }
  }

  static judgeEditorActiveState() {
    return document.activeElement.hasAttribute("contentEditable");
  }

  /**
   * 判断番剧购买情况（普通视频也会有.hide）
   * @returns {boolean}
   */
  static async isBoughtBangumi() {
    return await GetAsyncDomUtil.getAsyncDomClassic(".setting-panel-content", () => {
      if (document.querySelector(".container-player .pay_bangumi.hide")) {
        return true;
      }
      return false;
    })
  }

}

/**
 * 文章区、用户界面左下角通知
 * @param {string} message 
 * @param {string} level 通知级别：常用 - error success info warning 其他(可以定义图标) - banana ; success ; error ; warning ; logout ; help ; arrow-round-right ; comments ; envelope ; info ; yonghu ; app-phone ; close ; arrow-slim-up ; rank ; arrow-slim-right ; loading ; triangle-right ; eye ; eye-new ; crown ; arrow-round-left ; plus-circle ; history ; upload ; collect ; calendar ; danmu ; danmu-new ; view-player ; view-player-new ; arrow-round-up ; arrow-round-down ; triangle-slim-right ; chevron-left ; th-list2 ; circle-triangle-w ; circle-triangle-e ; label ; th-large1 ; th3 ; th-large ; th-list ; th ; step-forward ; step-backward ; prompt ; helps ; delete ; to-comm ; to-comm-new ; delete1 ; chevron-right ; chuang-zuo-zhong-xin;
 * @param {number} time 通知持续时间
 * @excludePage 主页、分区、用户后台、创作中心、直播站
 * @refer https://cdnfile.aixifan.com/static/common/widget/toast/toast.947ad3aa2604243116b8.js
 */
function LeftBottomNotif(message = "什么都没有发生哦~", level = "info", time = 2000) {
  GetAsyncDomUtil.getAsyncDomClassic("#g-toast", () => {
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

class PlayerUiReact {
  /**
   * 播放器浮动通知气泡
   * @param {string} text 通知文本
   * @param {string} importantText 带有红色的重要通知文本
   * player.emit("showLeftBottomTip", "2333")
   */
  static leftBottomTip(text, importantText = "") {
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
}

class UcenterUiReact {

}

class PlayerMenuSwitchItem {
  /**
   * 播放器开关功能封装
   * @param {*} name 不仅仅是DOM类名
   * @param {*} title 
   * @param {*} describe 
   * @param {*} defaultState 
   * @example
 ```js
  let item = new PlayerMenuSwitchItem("bTest2", "thisA2", "2333", false)
  item.addEventHandler(() => { console.log(true) }, () => { console.log(false) })
  //以下是可选的值变化重载示例
  item.changeRefresh()
  item.name = "bTest"
  ```
   */
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
        (this.trueHandler() ?? true) && (this.menuInst.dataset.bindAttr = true)
      } else if (e.target.dataset.bindKey == this.name && e.target.dataset.bindAttr == "true") {
        this.menuInst.dataset.bindAttr = false;
        (this.falseHandler() ?? true) && (this.menuInst.dataset.bindAttr = false);
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

class StyleSheetManager {
  constructor() {
    this.nameList = [];
    /**@type {CSSStyleSheet[]} */
    this.handlers = {};
    this.initAppend();
  }

  initAppend() {
    document.querySelectorAll("style").forEach(e => {
      (e.id && /^AcFunHelper.*/.test(e.id)) && this.nameList.push(e.id);
      this.handlers[e.id] = document.querySelector("style#" + e.id);
    })
  }

  toggle(name, reqStatus) {
    const target = this.handlers[name];
    if (target) {
      target.disabled = reqStatus ?? !target.disabled;
    }
  }

  disable(name) {
    this.toggle(name, true);
  }

  enable(name) {
    this.toggle(name, false);
  }

  add(content, name) {
    if (document.querySelector("style#" + "AcFunHelper_" + name) == null) {
      StyleSheetManager.createElementStyle(content, document.head, "AcFunHelper_" + name);
      this.nameList.push("AcFunHelper_" + name);
      this.handlers["AcFunHelper_" + name] = document.querySelector("style#" + "AcFunHelper_" + name);
      return true;
    }
    return false;
  }

  delete(name) {
    if (document.querySelector("style#" + "AcFunHelper_" + name) != null) {
      document.querySelector("style#" + "AcFunHelper_" + name).remove();
      return true;
    }
    return false;
  }

  /**
   * 在某个地方（默认为head下）增加一个css的style标签
   * @param {string} cssText CSS样式文本
   * @param {HTMLElement} targetDom 添加于，默认是document.head
   * @param {string} id css标签的ID
   */
  static createElementStyle(cssText, targetDom = document.head, id = null) {
    let target = targetDom;
    let nod = document.createElement("style");
    let str = cssText;
    nod.type = "text/css";
    id ? nod.id = id : null;
    nod.textContent = str;
    target.appendChild(nod);
    return () => {
      target.removeChild(document.getElementById(id));
    }
  }
}