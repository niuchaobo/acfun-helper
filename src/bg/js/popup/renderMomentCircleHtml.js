export default  function renderMomentCircleHtml() {
    chrome.storage.local.get(["AcMomentCircle1"], function (data) {
      $("#pop-push-momentcircle").append(data.AcMomentCircle1);
    });
  }
  