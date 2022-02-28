const ExtensionReloader = require('webpack-extension-reloader');
const path = require('path');

module.exports = {
    mode: 'development',
    watch: true,
    entry: {
        popup: [".\\src\\fg\\popup.js", ".\\src\\fg\\acfunxhr.js", ".\\src\\fg\\frame.js", ".\\src\\fg\\nav.js"],
        div: ".\\src\\fg\\div.js",
        danmakuSearch: ".\\src\\fg\\modules\\danmakuSearch.js",
        block: ".\\src\\fg\\modules\\block.js",
        pageBeautify: ".\\src\\fg\\modules\\pageBeautify.js",
        videoPageBeautify: ".\\src\\fg\\modules\\videoPageBeautify.js",
        livePageBeautify: ".\\src\\fg\\modules\\livepageBeautify.js",
        commentEnhance: ".\\src\\fg\\modules\\commentEnhance.js",
        download: ".\\src\\fg\\modules\\download.js",
        live: ".\\src\\fg\\modules\\live.js",
        danmaku: ".\\src\\fg\\modules\\danmaku.js",
        authInfo: ".\\src\\fg\\modules\\authInfo.js",
        banana: ".\\src\\fg\\modules\\banana.js",
        luckyTurntab: ".\\src\\fg\\modules\\luckyTurntab.js",
        videoSetting: ".\\src\\fg\\modules\\videoSetting.js",
        readMode: ".\\src\\fg\\modules\\readMode.js",
        frontend: ".\\src\\fg\\frontend.js",
        auth: ".\\src\\bg\\modules\\auth.js",
        messager: ".\\src\\bg\\modules\\messager.js",
        omnibox: ".\\src\\bg\\modules\\omnibox.js",
        indexedrv: ".\\src\\bg\\modules\\indexedrv.js",
        watchplan: ".\\src\\bg\\modules\\watchplan.js",
        upgrade: ".\\src\\bg\\modules\\upgrade.js",
        background: ".\\src\\bg\\backend.js",
        utils: [".\\src\\common\\utils.js",
            ".\\src\\common\\consoleProxy.js",
            ".\\src\\common\\encyclopedia.js",
            ".\\src\\common\\uiReact.js",
            ".\\src\\common\\CoreUtils.js",],
        extensionPage: [".\\src\\bg\\pageHandler\\settingPanel.js", ".\\src\\bg\\pageHandler\\pagehandlerLibs.js"],
        sandbox: [".\\src\\bg\\sandbox\\agent.js", ".\\src\\bg\\sandbox\\sandbox.js"],
        bgPopup: [".\\src\\bg\\popup\\index.js", ".\\src\\bg\\popup\\popupEvent.js", ".\\src\\bg\\popup\\renderList.js"]
    },
    plugins: [
        new ExtensionReloader({
            port: 9090,
            reloadPage: true,
            entries: {
                contentScript: ["popup,div,danmakuSearch,block,pageBeautify,videoPageBeautify,livePageBeautify,commentEnhance,download,live,danmaku,authInfo,banana,luckyTurntab,videoSetting,readMode,frontend"],
                background: ["background,auth,messager,omnibox,indexedrv,watchplan,upgrade"],
                extensionPage: ['utils', "extensionPage", "sandbox", "bgPopup"],
            }
        }),
    ],
    module: {
        rules: [
        ],
    },
};
