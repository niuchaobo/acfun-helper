<template>
  <div class="mdui-container mdui-center" id="_index">
    <img class="mdui-center" v-on:click="devMode" src="../img/icon128.png" />
    <h1 style="text-align: center" class="mdui-center">AcFun助手</h1>
    <p style="text-align: center">
      🎁🎁AcFun-Helper 是一个适用于 AcFun（ acfun.cn ） 的浏览器插件。
    </p>

    <div class="mdui-panel" mdui-panel="{accordion:false}">
      <div class="mdui-panel-item mdui-panel-item">
        <div class="mdui-panel-item-header">
          <div class="mdui-panel-item-title">其他</div>
          <div class="mdui-panel-item-summary">消息</div>
          <i class="mdui-panel-item-arrow mdui-icon material-icons"
            >keyboard_arrow_down</i
          >
        </div>
        <div class="mdui-panel-item-body">
          <div class="mdui-row">
            <div class="mdui-col-sm-6 mdui-col-md-4">
              服务器端依赖项目开源地址：<br />
              1.acfun-helper-synconfig 配置同步服务 @heixiaobai
              <a
                href="https://github.com/heixiaobai/acfun-helper-synconfig"
                target="_blank"
                >Github</a
              ><br />
              2.AcFunContributesInfoApi 稿件信息解析 @Sokwva
              <a
                href="https://gitee.com/sokwva/ac-fun-contributes-info-api"
                target="_blank"
                >Gitee</a
              >
              <br /><br />
              <hr />
            </div>
            <div class="mdui-col-sm-6 mdui-col-md-4">
              免责声明<br /><br />下载的视频版权归视频所有者所有，除非视频所有者同意，否则下载的视频仅限作离线播放用途。任何未经授权的剪辑和再发布等行为均为侵犯版权的行为，请尊重创作者的劳动成果。
              <br /><br />本项目作者对下载者本人因使用此工具下载视频后剪辑、再发布等任何侵权行而产生的法律纠纷概不负责。
              <br /><br />请支持正版，本插件不支持下载任何非用户自行发布的内容（番剧、电影等），望谅解
              <br /><br />
              <br /><br />
              隐私协议
              <br /><br /><a href="/bg/info.html?type=privacy" target="_blank"
                >Privacy</a
              >
              <br /><br />
              用户协议
              <br /><br /><a
                href="/bg/info.html?type=userAgreement"
                target="_blank"
                >UserAgreement</a
              >
            </div>
            <div class="mdui-col-sm-6 mdui-col-md-4">
              <div class="mdui-card">
                <div class="mdui-card-header">
                  <img
                    class="mdui-card-header-avatar"
                    src="images/lalazhuibushang-github.jpg"
                  />
                  <div class="mdui-card-header-title">
                    <a href="https://www.acfun.cn/u/7054138" target="_blank"
                      >啦啦追不上</a
                    >
                  </div>
                  <div class="mdui-card-header-subtitle">主导开发者</div>
                </div>
                <div class="mdui-card-media" id="devSwitch">
                  <div class="mdui-card-primary">
                    <div class="mdui-card-primary-title">AcFun助手</div>
                    <div class="mdui-card-primary-subtitle">浏览器插件</div>
                  </div>
                  <div class="mdui-card-content">
                    是一个适用于AcFun（acfun.cn）的浏览器插件。
                  </div>
                </div>
              </div>

              <br /><br />
              <hr />
              <br /><br />
              <br /><br />
              <br /><br />
              <p style="text-align: center">推荐开源项目</p>

              <div class="mdui-card">
                <div class="mdui-card-header">
                  <img
                    class="mdui-card-header-avatar"
                    src="images/goplayegg-github.jpg"
                  />
                  <div class="mdui-card-header-title">
                    <a href="https://www.acfun.cn/u/923834" target="_blank"
                      >敌军还有30秒到达葬场</a
                    >
                  </div>
                  <div class="mdui-card-header-subtitle">开发者</div>
                </div>
                <div class="mdui-card-media">
                  <div class="mdui-card-primary">
                    <div class="mdui-card-primary-title">
                      <a
                        href="https://github.com/goplayegg/AcfunQml"
                        target="_blank"
                        >AcfunQml</a
                      >
                    </div>
                    <div class="mdui-card-primary-subtitle">
                      Qt Qml based Acfun desktop app
                    </div>
                  </div>
                  <div class="mdui-card-content">AcfunQML是A站第三方客户端</div>
                </div>
              </div>

              <br />

              <div class="mdui-card">
                <div class="mdui-card-header">
                  <img
                    class="mdui-card-header-avatar"
                    src="images/wpscott-github.jpg"
                  />
                  <div class="mdui-card-header-title">
                    <a href="https://www.acfun.cn/u/311509" target="_blank"
                      >財布士醬</a
                    >
                  </div>
                  <div class="mdui-card-header-subtitle">主导开发者</div>
                </div>
                <div class="mdui-card-media">
                  <div class="mdui-card-primary">
                    <div class="mdui-card-primary-title">
                      <a
                        href="https://github.com/wpscott/AcFunDanmaku"
                        target="_blank"
                        >AcFunDanmaku</a
                      >
                    </div>
                    <div class="mdui-card-primary-subtitle">
                      AcFun直播弹幕及评论工具
                    </div>
                  </div>
                  <div class="mdui-card-content">
                    AcFunDanmaku是用C# 和 .Net Core 3.1编写的AcFun直播弹幕工具。
                    该项目分为13个子项目。
                  </div>
                </div>
                <div class="mdui-card-media">
                  <div class="mdui-card-primary">
                    <div class="mdui-card-primary-title">
                      <a
                        href="https://github.com/wpscott/AVUP.Fun"
                        target="_blank"
                        >AVUP.Fun</a
                      >
                    </div>
                    <div class="mdui-card-primary-subtitle">AVUP.Fun</div>
                  </div>
                  <div class="mdui-card-content">
                    基于Confluent Kafka与ClickHouse的数据仓库搭建
                  </div>
                </div>
              </div>

              <br />

              <div class="mdui-card">
                <div class="mdui-card-header">
                  <img
                    class="mdui-card-header-avatar"
                    src="https://tx-free-imgs.acfun.cn/content/2020_10_10/1.602323687477298E9.png?imageMogr2/format/webp/quality/75!/ignore-error/1"
                  />
                  <div class="mdui-card-header-title">
                    <a href="https://www.acfun.cn/u/165288" target="_blank"
                      >星雨漂流</a
                    >
                  </div>
                  <div class="mdui-card-header-subtitle">开发者</div>
                </div>
                <div class="mdui-card-media">
                  <div class="mdui-card-primary">
                    <div class="mdui-card-primary-title">
                      <a
                        href="https://greasyfork.org/zh-CN/scripts/408421-acfun%E7%9B%B4%E6%92%AD%E7%9B%91%E6%8E%A7"
                        target="_blank"
                        >Acfun直播监控-脚本</a
                      >
                    </div>
                    <div class="mdui-card-primary-subtitle">
                      我只制作DD的工具，但我并不是DD
                    </div>
                  </div>
                  <div class="mdui-card-content">帮助dd提高直播观看体验</div>
                </div>
              </div>

              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>