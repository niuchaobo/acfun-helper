/**
 * 页面美化
 */
class videoPageBeautify {
  constructor() {
    this.devMode = false;
  }

  openVideoDesc() {
    getAsyncDom(".desc-operate", () => {
      document.getElementsByClassName("desc-operate")[0].click();
    });
  }  
}
