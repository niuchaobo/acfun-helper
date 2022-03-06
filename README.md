# AcFun-Helper

<p align="center">
<img src="https://i.loli.net/2020/05/28/2k8dPLiGEZNHjny.png" width="120">
</p>
<h1 align="center">AcFun 助手</h1>

## 介绍

AcFun-Helper 是一个适用于 AcFun（ acfun.cn ） 的浏览器插件。

> 🍰
> AcFun-Helper is an open source, and extensible Web Browser Extension for acfun.cn.

![Mozilla Add-on](https://img.shields.io/amo/users/acfun%25E5%258A%25A9%25E6%2589%258B?color=red&label=FireFox%20Users&style=flat-square) ![Mozilla Add-on](https://img.shields.io/amo/dw/acfun%25E5%258A%25A9%25E6%2589%258B?color=red&label=FireFox%20Download&style=flat-square) ![Chrome Web Store](https://img.shields.io/chrome-web-store/users/jmpmiaajjammeafdklfobkfaobinefef?label=Chrome%20Users&style=flat-square) ![GitHub commit activity](https://img.shields.io/github/commit-activity/y/niuchaobo/acfun-helper?label=Commit%20Activity&style=flat-square)

## 公告

> 1. 评论抽奖已经完善。（2020-08-09 12：08 排除上次抽奖结果的功能已加入，到底需不需要迁移随机数生成方案@wpscott 在[#issue70](https://github.com/niuchaobo/acfun-helper/issues/70) 已经给出了说明。）

---

## 主要功能

<br>

## 界面增强

1. 首页增加**右侧导航栏**，方便快速跳转至目标分区。
2. **个人中心入口增强**，显示你的听众、香蕉、金香蕉、UID、直播间入口、收藏夹入口等信息。
3. **评论区标记**,在评论区给 Up 添加一个蓝色标记；给用户特殊的标记，以紫红色的标签显示出来；在合作稿件下，给 Staff 成员以深紫色的标签显示。
4. 主页的顶栏、滚动条的美化。
5. 个人中心视频稿件列表优化。
6. 隐藏播放器推荐宫格、首页 App 推荐

## 主站

#### 播放器

>1. **自定义倍速 和 视频帧步进**
>2. **画中画**
>3. **AB 回放**功能。（两点循环播放，左右反复横跳！）
>4. **“上次观看到”时间跳转**。（暂时只支持 1P 的视频投稿，并且不支持番剧）
>5. **全局进度条**，在播放页面底下显示一个进度条。
>6. **快捷键切换倍速** Shift + ↑/↓
>7. **弹幕搜索及跳转**,弹幕发送者主页跳转。
>8. 播放器**画质策略**。（观看 60 帧视频卡顿的用户需求）
>9. 进入页面**自动进入全屏**。（观影模式或网页全屏）
>10. 播放完毕**自动退出全屏**。(网页全屏或宽屏模式)
>11. 视频稿件**简介自动展开**
>12. 通过点击**评论区时间跳转**到视频指定位置、或者选中评论区的一大段时间和标记评论在时间轴上添加**时间轴章节标记**。
>13. 自动播放下一个推荐视频。（“大家都在看”列表播放）
>14. 视频、直播 MediaSession 支持
>15. 音量放大！
>16. 隐藏弹幕操作菜单
>17. 标签在后台时暂停视频
>18. 网页全屏时滚轮在音量图标上滚动调整音量
>19. 简单 CC 字幕。【版本要求：^1.2.13.1226】
>20. 播放器时间跳转链接【[ 例子 ](https://www.acfun.cn/v/ac31673115#acfunhelper=%7B%22jump%22:%2201:04:41%22%7D) （要求助手版本在 1.2.13.1226 以上，并且复制方和使用方都安装了助手本体。）】。

#### 小功能
>1. **视频下载、弹幕下载、弹幕以 ass 字幕格式下载**。（**_注意，插件不支持下载番剧_**）
>2. **自动投蕉、自动点赞**，并显示通知，或者加上老版 App 的投蕉声。
>3. 文章区 阅读模式、漫画模式旋转和拖动支持
>4. 多页评论页面、用户页面使用快捷键（Shift + PageUp/PageDown）翻页
>5. **评论区抽奖!!!**。【自己的稿件内打开网页右侧“助手”按钮界面，自定义抽奖人数 + 随机 + 去重（单个页面内独立的一次结果是不重复的），且助手会直接给出私信中奖 Acer 的链接，并且会详细告知楼层信息 !!!!(**注意一下**，其中“独立抽奖”是指每次抽奖的结果都是单独的，每次抽奖的用户都是单独的；而“排除上次结果抽奖”是指上次抽中的用户是从本次抽奖中排除的，上次抽奖的用户不会放到本次抽奖中。)】
>6. 评论区快捷翻页、弹幕和评论快捷发送（Ctrl+Enter）
>7. 个人中心快捷键翻页。
>8. 为视频稿件下评论区中的指向视频的 ac 号增加信息弹窗。
>9. 隐藏播放后视频推荐。
>10. 主站 **评论、点赞、礼物** 信息通知。
>11. 记录打开的稿件站内排行。
>12. 关注列表批量管理。

## 直播站

1. **Up 开播提醒**。【可以自定义关注直播（自定义列表的关注直播可选开播直接打开直播间），同时也可以打开“主站关注 Up 的直播”提醒开关关注在主站关注的 Up 的直播】
2. **宽屏模式**。（#感谢@Sinyupl）
3. **屏蔽礼物**，右侧弹幕列表中的礼物、关注、点赞、进场、礼物动画、粉丝团消息、红包信息。（#感谢@Sinyupl）
4. **m3u8 直链**看 A 站直播。
5. **增加时间 Tag**
6. **画中画**功能。
7. **自动暂停直播站首页的播放器** 或者 直接将其隐藏
8. **点击用户弹窗，临时标记相同用户在此之前的直播弹幕**
9. 在直播站主页给直播间标号
10. 标签在后台时，减小音量声音

## 浏览器

1. 点击插件图标弹出**快捷个人动态栏**。【关注 Up 投稿列表、关注分组 Up 投稿动态、直播开播列表、未读提醒，还有直播计时板、用户/稿件/直播信息查询】
2. 主站右键**下载视频/文章封面**。
3. **右键 AC搜索。**
4. 浏览器**地址栏直接搜索**主站相关关键字。
5. 稍后再看（单独实现）
6. 直播观看计时
7. 一键整理当前窗口中所有主站标签到新窗口中

### 其他

1. 配置文件导入导出。
2. 一键清除插件配置。  
3. 可选提前加载助手前台模块

---

## 插件本体获取

- [FireFox 插件商店](https://addons.mozilla.org/zh-CN/firefox/addon/acfun%E5%8A%A9%E6%89%8B/)
- [FireFox 插件商店 Beta](https://addons.mozilla.org/zh-CN/firefox/addon/acfun%E5%8A%A9%E6%89%8Bpre/)
- <del>[Chrome 扩展商店](https://chrome.google.com/webstore/detail/acfun%E5%8A%A9%E6%89%8B/jmpmiaajjammeafdklfobkfaobinefef)</del>
- [Edge Chromium Addons 商店](https://microsoftedge.microsoft.com/addons/detail/acfun%E5%8A%A9%E6%89%8B/lbnimimllmcdmojehbgndnebjafgnjfk?hl=zh-CN)
- [Edge Chromium Addons 商店 2 号](https://microsoftedge.microsoft.com/addons/detail/acfun%E5%8A%A9%E6%89%8B/hkbnoipklegggkiifgbjlcfdjmjjodio?hl=zh-CN)
- 群文件 & 公众号 <sup><a href="#connect">点击查看</a>

---

## 安装方法

假如你能直接连接到扩展/插件商店，则直接安装；

否则，打开 Chrome 浏览器（或者同为 Chromium 内核的浏览器），打开插件管理的“开发人员模式”(或者“开发者模式”)；  
然后将 .crx 的文件的扩展名改为 .zip，并解压到指定的文件夹（这个文件夹不能删除！！！！【而且更新的时候你可以关掉浏览器再删掉内容再覆盖新版本的文件；注意只有在关闭浏览器的时候才能删除哦，这样就不会丢失配置文件了，或者使用配置导出。】）；  
例如解压到了 test 文件夹，打开浏览器，地址栏输入 chrome://extensions/ （进入扩展管理页面）；  
点击'加载已解压的扩展程序'，选择到你刚刚.zip 文件解压出来的的 test 文件夹(如果是从 GitHub 上面下载的 zip 文件，请将其定位到文件夹中的 src 子文件夹)，点击确定。  
扩展程序列表随即出现你导入的扩展程序，并在地址栏旁的工具栏会显示一个红色的‘A’字母图标，即为成功。

---

### 如何食用地址栏搜索 <a id="searchBar"></a>

首先我们点击地址栏，然后输入 ac ，按下 tab 键（包括火狐浏览器是都可以直接按一个空格），接下来就可以直接搜索了

1. 输入关键字，插件将会请求主站搜索关键字 API，我们可以在地址栏项目的返回中选择对应的条目；或者直接回车查看主站与此条目的相关搜索结果。
2. 输入 ac 号（例如 ac16240438 ）我们就能直接得到稿件的搜索结果了（一般都是唯一一个结果，我们可以直接点击进入）。
3. 输入 - （<=对，这就是一个减号），然后直接接 ac 号，跳转【注意，番剧的 ac 号还没有做适配，所以番剧跳转是没有的哦】;例如：-ac16240438
   [返回功能介绍](#searchBarBack)

---

<a id='connect'></a>

## 联系我们

[![用户 QQ 群 296107184](https://img.shields.io/badge/QQ-296107184-blue)](https://shang.qq.com/wpa/qunwpa?idkey=fe451dc2e5c33980a1f92725370f80a21048ca5fe2e325b3e0c15f494a8001e3)
[![微信公众号 AcFun 助手](https://img.shields.io/badge/%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7-AcFun%20%E5%8A%A9%E6%89%8B-blue)](https://mp.weixin.qq.com/s/-XjELn35hDd856kiMMQyvA)

## 开源许可证

    Released under the MPL-2.0 License.

## 提要

<details>
  <summary>库</summary>

    * jquery 3.6.0
    * mdui 0.4.3
    * dexie 3.0.3
    * markd 3.0.0
    * m3u8-parser 4.3.0
    * m3u8-parser 4.3.0
    * vue 3.2.31

    * esbuild 0.11.23
    * gulp 4.0.2

</details>

<details>
  <summary>服务器端应用</summary>

    助手配置同步服务: @heixiaobai - [acfun-helper-synconfig]  https://github.com/heixiaobai/acfun-helper-synconfig

</details>

---

[AcFun 第三方相关开源项目](./docs/OPENSRC.md)

---

## 致谢

    * @Sinyupl https://github.com/Sinyupl
    * @wpscott https://github.com/wpscott
    * @orzogc https://github.com/orzogc
    * @condy0919 https://github.com/condy0919

---

#### 来点香蕉来点Star来点Issue。![阿部高和脸](https://js2.a.yximgs.com/bs2/emotion/1587040895463third_party_b35465999.png)

<h1 align="center">缺~ 逼~ 乐~</h1>
