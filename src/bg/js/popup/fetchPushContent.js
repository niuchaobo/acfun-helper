export default function fetchPushContent() {
    chrome.storage.local.get(["AcpushList"], function (data) {
      console.log(data);
      $("#pop-push").append(data.AcpushList);
    });
  }