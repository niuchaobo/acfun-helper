<p align="center">
<img src="https://i.loli.net/2020/05/28/2k8dPLiGEZNHjny.png" width="120">
</p>
<h1 align="center">AcFun 助手</h1>

# 模块间通信
## 前言
    一般来讲，插件的本体大致分为三个部分：
    1.ContentScript 这部分负责是接近于普通页面却与普通页面有隔离的脚本，是插件中面向页面（这里我们称之为前台）的部分。 Content scripts are files that run in the context of web pages. By using the standard Document Object Model (DOM), they are able to read details of the web pages the browser visits, make changes to them and pass information to their parent extension.
    2.Popup 是插件的弹出窗口，在Chromium内核浏览器的地址栏附近有一栏用于放置它的区块，点击相关的图标按钮即可打开Popup。 
    3.BackgroundScripts 是工作在独立于标签的特殊程序，具有访问所有权限指定的浏览器接口和跨域通信的权限。
    4.Sandbox eval is dangerous inside an extension because the code it executes has access to everything in the extension's high-permission environment. A slew of powerful chrome.* APIs are available that could severely impact a user's security and privacy; simple data exfiltration is the least of our worries. The solution on offer is a sandbox in which eval can execute code without access either to the extension's data or the extension's high-value APIs. No data, no APIs, no problem.The solution on offer is a sandbox in which eval can execute code without access either to the extension's data or the extension's high-value APIs. No data, no APIs, no problem.
## 前台通信
    前台的通信是指以前台作为通信的发起者，向包括了 后台、注入脚本、Popup等模块通信。
## 后台通信
    后台的通信是指以后台程序作为通信的发起者，向包括了 前台（标签页）、Popup、sandBox等模块通信。


### 助手中 前台 与 后台 立即通信 示例：
`
    请求后台的notice函数，发出params里的通知内容
    MessageSwitch.sendMessage('fg', { target: "notice", params: params, InvkSetting: { type: "function" } })
`