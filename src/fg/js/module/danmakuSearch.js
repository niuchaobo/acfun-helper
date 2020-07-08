/* global rangeFromPoint */

class Search {
  constructor() {
    this.searchList = [];
    this.i = 1;
    this.lock = false;
  }
  inject = () => {
    this.searchContent();
    this.searchBind();
  };
  searchBind() {
    $("#acfun-helper-search-input").bind("focus", () => {
      //const danmakuFold = $("#danmaku .danmaku-fold");
      //danmakuFold.hasClass("unfold") ? "" : danmakuFold.click();
      this.lock = true;
      
    });
    $("#acfun-helper-search").bind("click", this.danmakuSearchProgress);
    $("#acfun-helper-search").bind("keypress", this.danmakuSearchProgress);
  }

  danmakuSearchProgress = (e) => {
    let action = e.target.id;
    //const danmakuFold = $("#danmaku .danmaku-fold");
    //danmakuFold.hasClass("unfold") ? "" : danmakuFold.click();
    let range = this.searchList.length;
    if (
      (this.lock && action === "acfun-helper-search-button") ||
      e.keyCode === 13
    ) {
      let text = $("#acfun-helper-search-input").val();
      getAsyncDom(
        "danmaku-item",
        this.danmakuSearch.bind(this, text),
        200
      ).then((res) => {
        this.lock = false;
        this.searchList = res;
        this.danmakuSearchJump(this.searchList, 0);
        $(".danmaku-items").bind(
          "DOMNodeInserted",
          this.debounce(() => {
            //增加监听 移除监听
            console.log('---------("他又刷新了");---------⬆️⬆️');
            $("#danmaku .list-body").scrollTop(0);
            let text = $("#acfun-helper-search-input").val();
            getAsyncDom(
              "danmaku-item",
              this.danmakuSearch.bind(this, text),
              200
            ).then((res) => {
              this.searchList = res;
              this.danmakuSearchJump(this.searchList, this.i);
            });
          }, 500)
        );
      });
    }
    if (action === "acfun-helper-search-next") {
      this.i >= range ? (this.i = 0) : "";
      let target = this.i++;
      this.danmakuSearchJump(this.searchList, target);
    }
    if (action === "acfun-helper-search-last") {
      this.i < 1 ? (this.i = range - 1) : "";
      let target = this.i--;
      this.danmakuSearchJump(this.searchList, target);
    }
  };

  danmakuSearchJump(searchList = [], i = 0) {
    if (searchList == []) {
      return "无结果";
    }
    searchList.forEach((item, index) => {
      if (index !== i) {
        $(searchList[index].item).css({
          background: "#ff00001f",
          color: "#999999",
        });
      } else {
        $(searchList[i].item).css({ background: "red", color: "white" });
        const v_obj = document.getElementsByTagName("video")[0];
        v_obj.currentTime = searchList[i].time;
        $("#danmaku .list-body").scrollTop(searchList[i].offsetTop);
      }
    });
  }
  danmakuSearch(text = "") {
    const danmakuList = [];
    const a = $("#danmaku .danmaku-item").get();
    a.forEach((item, index) => {
      if (text === item.getAttribute("data-message")) {
        danmakuList.push({
          time: item.getAttribute("data-time"),
          offsetTop: $(item).offset().top - $(".list-body").offset().top,
          pageNum: 1,
          item: item,
        });
      }
    });
    return danmakuList;
  }
  searchContent = () => {
    $(`
        <div id='acfun-helper-search'>
            <div class="acfun-helper-search-title">弹幕搜索</div>
            <div class="acfun-helper-search-content" style="display:flex">
                <input id='acfun-helper-search-input' style="flex:1">
                <div id='acfun-helper-search-button' class="acfun-helper-search-button" style="flex:.4">搜索</div>
                <div id='acfun-helper-search-last' class="acfun-helper-search-button" style="flex:.2">
                    <
                </div>
                <div id='acfun-helper-search-next' class="acfun-helper-search-button" style="flex:.2">
                    >
                </div>
            </div>
        </div>
    `).appendTo($(".list-title"));
  };

  debounce = (fn, delay) => {
    let timer = null;
    return function (args) {
      let _this = this;
      let _args = args;
      if (timer) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.call(_this, _args);
        }, delay);
      } else {
        timer = setTimeout(function () {
          fn.call(_this, _args);
        }, delay);
      }
    };
  };
}
