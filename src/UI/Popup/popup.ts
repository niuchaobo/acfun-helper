import { MessageRouter } from "@/Core/CoreLibs/MessageRouter";
import { ExtOptions } from "@/Core/CoreUtils";
import * as Vue from "vue";
import popupApp from "./popup.vue"
import 'mdui/mdui.css';
import 'mdui';
import 'material-design-icons/iconfont/material-icons.css';

(async () => {
    const MsgClient = new MessageRouter.MsgClient({ module: chrome.runtime });
    const EchoMsg = await MsgClient.send("/bg/echo", { "data": "Hi There" })
    const AcFunHelperDevKit = {
        ExtOptions,
    }

    globalThis.AcFunHelperDevKit = AcFunHelperDevKit;

    const app = Vue.createApp(popupApp);
    app.mount("#Main");


    console.log(EchoMsg)
})()



export { };
