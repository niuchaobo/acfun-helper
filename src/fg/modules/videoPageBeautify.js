/**
 * 页面美化
 */
class videoPageBeautify extends AcFunHelperFgFrame{
  constructor() {
    super();
    this.devMode = false;
  }

  openVideoDesc() {
    GetAsyncDomUtil.getAsyncDomClassic(".desc-operate", () => {
      document.getElementsByClassName("desc-operate")[0].click();
    });
  }  
}
