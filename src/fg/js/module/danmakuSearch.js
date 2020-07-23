/* global rangeFromPoint */
//视频播放页面弹幕列表搜索功能
class Search {
  constructor() {
    this.searchList = [];
    this.i = 0;
    this.lock = true;
    this.pageNum = 1;
    this.otherColor = { background: "#ff00001f", color: "#999999" };
    this.selectColor = { background: "red", color: "white" };
    this.content = `
    <div id='acfun-helper-search'>
        <div id="acfun-helper-search-title">弹幕搜索</div>
        <div class="acfun-helper-search-content" style="display:flex">
            <input id='acfun-helper-search-input' style="flex:1">
            <div id='acfun-helper-search-button' class="acfun-helper-search-button" style="flex:.4">⏎</div>
            <div id='acfun-helper-search-last' class="acfun-helper-search-button" style="flex:.2;display:none">
                △
            </div>
            <div id='acfun-helper-search-next' class="acfun-helper-search-button" style="flex:.2;display:none">
                ▽
            </div>
            <div id='acfun-helper-search-close' class="acfun-helper-search-button" style="flex:.2;font-weight:bold">
                ✕
            </div>
        </div>
    </div>`;

  }

  inject() {
    $(this.content).appendTo($(".list-title"));
    this.searchBind();
  }

  searchBind() {
    $("#acfun-helper-search-input").bind("focus", () => {
      this.lock = true;
      this.buttonStatusChange(true);
    });
    $("#acfun-helper-search").bind("click", throttle(this.danmakuSearchProgress, 200).bind(this)
    );
    $("#acfun-helper-search").bind("keypress", this.danmakuSearchProgress.bind(this));
    $(".danmaku-page").bind("click", (e) => {
      if (
        $(e.target).hasClass("last-page") || $(e.target).hasClass("next-page")
      ) {
        this.pageNum = $(".cur-page span:first").text().trim().slice(1, -1);
      }
      if ($(e.target).attr("data-page")) {
        this.pageNum = e.target.innerText.slice(1, -1);
      }
    });
  }

  buttonStatusChange(von) {
    if (von) {
      $("#acfun-helper-search-button").css("display", "inline-block");
      $("#acfun-helper-search-last").css("display", "none");
      $("#acfun-helper-search-next").css("display", "none");
    } else {
      $("#acfun-helper-search-button").css("display", "none");
      $("#acfun-helper-search-last").css("display", "inline-block");
      $("#acfun-helper-search-next").css("display", "inline-block");
    }
  }

  startSearch() {
    let input = $("#acfun-helper-search-input");
    let text = input.val();
    if (!text) return;
    $('#danmaku').bind('mouseleave',()=>{
            $('#acfun-helper-search-close').trigger('click')
    })
    input.blur();
    this.firstSearchInit();
    getAsyncDom("danmaku-item", this.danmakuSearch.bind(this, text), 200).then(
      (res) => {
        this.lock = false;
        this.buttonStatusChange(false);
        this.searchList = res;
        this.danmakuSearchJump(this.searchList, this.i);
        this.searchCounterReload();
      }
    );
  }

    danmakuSearchProgress(e){
      let action = e.target.id;
      if (action === "acfun-helper-search-title") {
        $("#acfun-helper-search>div").addClass("search-hidden");
      }
      if (action === "acfun-helper-search-button" || e.keyCode === 13) {
        if (!this.lock) return;
        this.startSearch();
      }
      if (action === "acfun-helper-search-next") {
        this.searchNext()
      }
      if (action === "acfun-helper-search-last") {
        this.searchLast()
      }
      if (action === "acfun-helper-search-close") {
        this.searchClose()
      }
    };

  searchNext(){
    let changePage = !$(".next-page").hasClass("disabled");
    this.i = this.i + 1;
    if (this.i == this.searchList.length || this.searchList.length === 0) {
      if (changePage) {
        $(".next-page").click();
        this.pageNum++;
        this.i = 0;
        return;
      } else {
        this.i = 0;
      }
    }
    let target = this.i;
    this.danmakuSearchJump(this.searchList, target);
  }

  searchLast(){
    let changePage = !$(".last-page").hasClass("disabled");
    this.i = this.i - 1;
    if (this.i === -1 || this.searchList.length === 0) {
      if (changePage) {
        $(".last-page").click();
        this.pageNum--;
        this.i = "end";
        return;
      } else {
        this.i = this.searchList.length - 1;
      }
    }
    let target = this.i;
    this.danmakuSearchJump(this.searchList, target);
  }
  searchClose(){
    this.buttonStatusChange(true);
    $("#acfun-helper-search-input").val("");
    $("#acfun-helper-search>div").removeClass("search-hidden");
    $(".danmaku-items").unbind("DOMNodeInserted");
    $("#danmaku").unbind('mouseleave')
    this.searchList.forEach((item, index) => {
      $(item.item).css({ background: "", color: "" });
    });
    this.searchList = [];
    this.i = 0;
  }

  danmakuSearchJump(searchList = [], i) {
    if (searchList == []) {
      return "无结果";
    }
    if (i === "end") {
      i = searchList.length - 1;
      this.i = i;
    }
    searchList.forEach((item, index) => {
      if (index !== i) {
        $(searchList[index].item).css(this.otherColor);
      } else {
        $(searchList[i].item).css(this.selectColor);
        const v_obj = document.getElementsByTagName("video")[0];
        v_obj.currentTime = searchList[i].time;
        $("#danmaku .list-body").scrollTop(searchList[i].offsetTop);
      }
    });
    this.pageNum = $(".cur-page").text().trim().slice(1, -1);
  }

  searchCounterReload() {
    $(".danmaku-items").unbind("DOMNodeInserted");
    $(".danmaku-items").bind(
      "DOMNodeInserted",
      debounce(() => {
          this.pageChange(this.pageNum)
          this.buttonStatusChange(true);
          $("#danmaku .list-body").scrollTop(0);
          let text = $("#acfun-helper-search-input").val();
          getAsyncDom(
            "danmaku-item",
            this.danmakuSearch.bind(this, text),
            200
          ).then((res) => {
            this.searchList = res;
            this.danmakuSearchJump(this.searchList, this.i);
            this.buttonStatusChange(false);
          });
      }, 500)
    );
  }

  pageChange(pageNum) {
    let nowPageNum = $(".cur-page").text().trim().slice(1, -1); //获取当前页数
    let distance = pageNum - nowPageNum;
    let range = Math.abs(distance);
    if (distance > 0) {
      for (let i = 0; i < range; i++) {
        $(".next-page").click();
      }
    }
    if (distance < 0) {
      for (let i = 0; i < range; i++) {
        $(".last-page").click();
      }
    }
  }

  danmakuSearch(text) {
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

  firstSearchInit() {
    this.searchList.forEach((item, index) => {
      $(item.item).css({ background: "", color: "" });
    });
    this.searchList = [];
    this.i = 0;
    $("#danmaku .list-body").scrollTop(0);
  }
}
