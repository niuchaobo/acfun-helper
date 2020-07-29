export default function unKnownCode(){
function populateDictionary(dicts) {
    $("#dict").empty();
    dicts.forEach((item) =>
      $("#dict").append(
        $("<option>", { value: item.objectname, text: item.displayname })
      )
    );
  }
  
  async function onWxOptionChanged(e) {
    if (!e.originalEvent) return;
  
    let options = await optionsLoad();
    options.wxenabled = $("#wxenabled").prop("checked");
    if (options.wxenabled) {
      //获取ticket
      let wx_ticket = "";
      let ticket = await getTicketFromBackend().then((value) => {
        if (value != null) {
          wx_ticket = value["ticket"];
        }
      });
      if (wx_ticket != "") {
        options.qr_ticket = wx_ticket;
        $("#qrcode img").attr(
          "src",
          "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + wx_ticket
        );
        $("#qrcode").wxshow();
      }
    } else {
      $("#qrcode").wxhide();
    }
    let newOptions = await odhback().opt_optionsChanged(options);
    optionsSave(newOptions);
  }
  
  function onMoreOptions() {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL("options.html"));
    }
  }
  
  function updateWxenabled(options) {
    options.wxenabled = $("#wxenabled").prop("checked");
    if (options.wxenabled) {
      $("#qrcode").wxshow();
    } else {
      $("#qrcode").wxhide();
    }
  }
  
  async function adjustWxenabled(options) {
    let userKey = options.userkey;
    if (userKey == "") {
      updateWxenabled(options);
      $("#wxenabled").change(onWxOptionChanged);
    } else {
      /*let userKeyDb = await getKeyFromDb();
            if(userKey == userKeyDb){
                $("#wxdiv").hide();
            }else{
                updateWxenabled(options);
                $("#wxenabled").change(onWxOptionChanged);
            }*/
      if (options.wxenabled) {
        options.wxenabled = false;
        optionsSave(options);
      }
      $("#wxhead")[0].src = options.headimage;
      $("#wxhead").show();
      $("#wxdiv").hide();
    }
  }
  
  async function qrcodeListen() {
    var MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver; //浏览器兼容
    var config = { attributes: true }; //配置对象
    $("#qrcode img").each(function () {
      var _this = $(this);
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (record) {
          if (record.type == "attributes") {
            //监听属性
            let num = 0;
            let interval = setInterval(async function () {
              num++;
              if (num >= 30) {
                clearInterval(interval);
                $("#ncb-shade-timeout img")[0].src = `${chrome.runtime.getURL(
                  "fg/img/timeout.png"
                )}`;
                $("#ncb-shade-timeout").show();
              }
              let img_src = _this[0].src;
              //console.log(ticket);
              if (img_src != "") {
                let ticket = "";
                var reg = /^http.*\?ticket=(.*)/;
                if (reg.test(img_src)) {
                  let res = img_src.match(reg);
                  ticket = res[1];
                }
                if (ticket != "") {
                  let user = await getKeyFromDb(ticket);
                  if (user != null && user != "") {
                    //let userObj = JSON.parse(user);
                    let userKey = user["openid"];
                    if (userKey != "") {
                      let options = await optionsLoad();
                      options.userkey = userKey;
                      options.headimage = user["headimgurl"];
                      options.nickName = user["nickname"];
                      let newOptions = await odhback().opt_optionsChanged(
                        options
                      );
                      optionsSave(newOptions);
                      $("#wxhead")[0].src = options.headimage;
                      $("#wxhead").show();
                      $("#ncb-shade img")[0].src = `${chrome.runtime.getURL(
                        "fg/img/ok.png"
                      )}`;
                      $("#ncb-shade").show();
                      setTimeout(function () {
                        $("#qrcode").hide();
                      }, 2000);
                      clearInterval(interval);
                    }
                  }
                }
              }
            }, 1000);
          }
        });
      });
      observer.observe(_this[0], config);
    });
  }
  
  function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
        if (callback) callback(response);
      });
    });
  }
  
  async function tabQuery(option) {
    return new Promise((resolve, reject) => {
      chrome.tabs.query(option, (res) => {
        resolve(res);
      });
    });
  }
}