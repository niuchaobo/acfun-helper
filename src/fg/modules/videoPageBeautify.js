/**
 * 页面美化
 */
class videoPageBeautify {
  constructor() {

  }

  openVideoDesc() {
    getAsyncDom(".desc-operate", () => {
      document.getElementsByClassName("desc-operate")[0].click();
    });
  }  
}
